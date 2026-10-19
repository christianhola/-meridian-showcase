import type { PermissionRequest, RiskLevel, ToolCall, ToolName } from "../engine/types";
export type PermissionDecision = "APPROVED" | "REJECTED";
type Pending = {
  request: PermissionRequest;
  resolve: (decision: PermissionDecision) => void;
  timer: ReturnType<typeof setTimeout>;
};
/** In-memory single-run approval broker. Replace with authenticated server sessions for production. */
export class PermissionGate {
  private readonly pending = new Map<string, Pending>();
  constructor(private readonly timeoutMs = 45_000) {}

  create(call: ToolCall, identity: { sessionId: string; userId: string }, risk: RiskLevel): PermissionRequest {
    // Allow only JSON values with bounded argument size; freeze a detached snapshot
    const serial = JSON.stringify(call.arguments);
    if (!serial || serial.length > 8_192) throw new Error("Approval payload is too large");
    const snapshot = Object.freeze(JSON.parse(serial) as Record<string, unknown>);
    return Object.freeze({
      id: call.id,
      sessionId: identity.sessionId,
      userId: identity.userId,
      tool: call.name as ToolName,
      risk,
      arguments: snapshot,
      expiresAt: Date.now() + this.timeoutMs,
    });
  }

  wait(request: PermissionRequest, signal?: AbortSignal): Promise<PermissionDecision> {
    if (this.pending.has(request.id)) throw new Error("Duplicate approval request");
    if (signal?.aborted || Date.now() >= request.expiresAt) return Promise.resolve("REJECTED");
    return new Promise<PermissionDecision>((resolve) => {
      let onAbort = () => {};
      const settle = (decision: PermissionDecision) => {
        const current = this.pending.get(request.id);
        if (!current) return;
        this.pending.delete(request.id);
        clearTimeout(current.timer);
        signal?.removeEventListener("abort", onAbort);
        resolve(decision);
      };
      const timer = setTimeout(() => settle("REJECTED"), Math.max(0, request.expiresAt - Date.now()));
      this.pending.set(request.id, { request, resolve: settle, timer });
      onAbort = () => settle("REJECTED");
      signal?.addEventListener("abort", onAbort, { once: true });
    });
  }

  /** Must be invoked by a trusted user action, never by an LLM-generated call. */
  decide(identity: { sessionId: string; userId: string }, requestId: string, decision: PermissionDecision): boolean {
    const entry = this.pending.get(requestId);
    if (!entry || (decision !== "APPROVED" && decision !== "REJECTED")) return false;
    if (entry.request.userId !== identity.userId || entry.request.sessionId !== identity.sessionId ||
        Date.now() >= entry.request.expiresAt) {
      entry.resolve("REJECTED");
      return false;
    }
    entry.resolve(decision);
    return true;
  }
  cancelAll(): void {
    for (const entry of Array.from(this.pending.values())) entry.resolve("REJECTED");
  }
  size(): number { return this.pending.size; }
}
