/** Public contracts for Meridian Agent Framework, independent of model providers. */
export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type ToolName = "execute_bash" | "write_file" | "read_file" | "browser_navigate" | "browser_click";
export type AgentRole = "Architect" | "Coder" | "Researcher" | "Growth" | "Browser" | "Reviewer";

export type ToolArguments = Readonly<Record<string, unknown>>;

export type ToolSchema = Readonly<{
  type: "object";
  required: readonly string[];
  properties: Readonly<Record<string, Readonly<{ type: "string"; maxLength?: number }>>>;
  additionalProperties: false;
}>;

export type ToolExecutionResult = Readonly<{
  ok: boolean;
  code: "OK" | "UNAVAILABLE" | "DENIED" | "INVALID_ARGUMENTS" | "TIMEOUT" | "FAILED";
  output: string;
  artifacts?: readonly Readonly<{
    kind: "screenshot" | "file" | "text";
    mediaType: string;
    data?: string;
    name?: string;
  }>[];
}>;

export type ToolDefinition = Readonly<{
  name: ToolName;
  description: string;
  schema: ToolSchema;
  risk: RiskLevel;
  requiresApproval: boolean;
  execute: (context: ExecutionContext, arguments_: ToolArguments) => Promise<ToolExecutionResult>;
}>;

export type ExecutionContext = Readonly<{
  userId: string;
  projectId: string;
  sessionId: string;
  signal?: AbortSignal;
}>;

export type ToolCall = Readonly<{
  id: string;
  name: ToolName;
  arguments: ToolArguments;
}>;

export type PermissionRequest = Readonly<{
  id: string;
  sessionId: string;
  userId: string;
  tool: ToolName;
  risk: RiskLevel;
  arguments: ToolArguments;
  expiresAt: number;
}>;

export type AgentEvent =
  | Readonly<{ type: "agent:thought"; runId: string; message: string }>
  | Readonly<{ type: "agent:tool_call"; runId: string; call: ToolCall; risk: RiskLevel }>
  | Readonly<{ type: "agent:permission_request"; runId: string; request: PermissionRequest }>
  | Readonly<{ type: "agent:tool_result"; runId: string; callId: string; result: ToolExecutionResult }>
  | Readonly<{ type: "agent:memory_update"; runId: string; projectId: string; kind: "session" | "decision"; saved: boolean }>
  | Readonly<{ type: "agent:completed"; runId: string; message: string }>
  | Readonly<{ type: "agent:error"; runId: string; code: string; message: string }>;

export type AgentNextStep =
  | Readonly<{ kind: "answer"; text: string }>
  | Readonly<{ kind: "tool"; tool: ToolName; arguments: ToolArguments }>;

export type AgentPlanner = (context: Readonly<{
  role: AgentRole;
  request: string;
  previous: readonly Readonly<{ call: ToolCall; result: ToolExecutionResult }>[];
  step: number;
}>) => Promise<AgentNextStep>;

export const failed = (code: ToolExecutionResult["code"], output: string): ToolExecutionResult =>
  ({ ok: false, code, output });
