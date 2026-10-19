import type {
  AgentEvent, AgentPlanner, AgentRole, ExecutionContext, ToolCall, ToolExecutionResult,
} from "./types";
import { failed } from "./types";
import { PermissionGate } from "../services/permissionGate";
import { ToolRegistry, validateArguments } from "../services/toolRegistry";
import { AgentMemory } from "../services/agentMemory";

export type AgentRunConfig = Readonly<{
  runId: string;
  context: ExecutionContext;
  role: AgentRole;
  request: string;
  registry: ToolRegistry;
  permissions: PermissionGate;
  memory: AgentMemory;
  planner: AgentPlanner;
  maxSteps?: number;
}>;

/** Public progress messages; never return raw, private chain-of-thought. */
export async function* runAgentLoop(config: AgentRunConfig): AsyncGenerator<AgentEvent> {
  const { runId, context, role, request, registry, permissions, memory, planner } = config;
  const completed: Array<{ call: ToolCall; result: ToolExecutionResult }> = [];
  const maxSteps = Math.min(8, Math.max(1, config.maxSteps ?? 4));
  if (!request.trim() || request.length > 4000) {
    yield { type: "agent:error", runId, code: "INVALID_REQUEST", message: "Invalid agent request" };
    return;
  }
  memory.addSession(context, "User submitted a task to " + role);
  yield { type: "agent:thought", runId, message: "Revisando el objetivo y los permisos disponibles" };
  yield { type: "agent:memory_update", runId, projectId: context.projectId, kind: "session", saved: true };
  for (let step = 0; step < maxSteps; step++) {
    if (context.signal?.aborted) {
      yield { type: "agent:error", runId, code: "CANCELLED", message: "Task cancelled" };
      return;
    }
    let next: Awaited<ReturnType<AgentPlanner>>;
    try {
      next = await planner({ role, request, previous: completed, step });
    } catch {
      yield { type: "agent:error", runId, code: "PLAN_FAILED", message: "Unable to plan the next step" };
      return;
    }
    if (next.kind === "answer") {
      yield { type: "agent:completed", runId, message: next.text.slice(0, 6000) };
      return;
    }
    const definition = registry.get(next.tool);
    if (!definition) {
      yield { type: "agent:error", runId, code: "UNKNOWN_TOOL", message: "Tool not registered" };
      return;
    }
    let args: Record<string, unknown>;
    try {
      const serialized = JSON.stringify(next.arguments);
      if (!serialized || serialized.length > 8192) throw Error("Invalid size");
      args = Object.freeze(JSON.parse(serialized) as Record<string, unknown>);
    } catch {
      yield { type: "agent:error", runId, code: "INVALID_TOOL_ARGS", message: "Invalid tool arguments" };
      return;
    }
    const error = validateArguments(definition.schema, args);
    if (error) {
      yield { type: "agent:error", runId, code: "INVALID_TOOL_ARGS", message: error };
      return;
    }
    const call: ToolCall = Object.freeze({ id: runId + "-" + step, name: next.tool, arguments: args });
    yield { type: "agent:tool_call", runId, call, risk: definition.risk };
    const needsApproval = definition.requiresApproval ||
      definition.risk === "HIGH" || definition.risk === "CRITICAL";
    let authorized = !needsApproval;
    if (needsApproval) {
      const permission = permissions.create(call, context, definition.risk);
      yield { type: "agent:permission_request", runId, request: permission };
      authorized = (await permissions.wait(permission, context.signal)) === "APPROVED";
      if (!authorized) {
        yield { type: "agent:tool_result", runId, callId: call.id,
          result: failed("DENIED", "Action denied or permission expired") };
        yield { type: "agent:completed", runId, message: "Acción cancelada. No se ejecutó la herramienta." };
        return;
      }
    }
    const result = await registry.executeAuthorized(context, call, authorized);
    completed.push({ call, result });
    yield { type: "agent:tool_result", runId, callId: call.id, result };
    if (!result.ok) {
      yield { type: "agent:completed", runId,
        message: "La herramienta no pudo completar la tarea: " + result.output };
      return;
    }
    yield { type: "agent:thought", runId, message: "Comprobando el resultado de la herramienta" };
  }
  yield { type: "agent:completed", runId, message: "Se alcanzó el límite de pasos del agente." };
}

/** Server endpoints may send these typed events over SSE after authenticating the session.
 * No executable endpoint is registered in this static frontend.
 */
export function toSSE(event: AgentEvent): string {
  return "event: " + event.type + "\ndata: " + JSON.stringify(event) + "\n\n";
}
