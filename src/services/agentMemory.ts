import type { ExecutionContext } from "../engine/types";
export type MemoryEntry = Readonly<{
  kind: "preference" | "decision" | "project_note";
  value: string;
  createdAt: string;
}>;
export interface MemoryKV {
  get(key: string): Promise<readonly MemoryEntry[] | undefined>;
  set(key: string, entries: readonly MemoryEntry[]): Promise<void>;
}

/** Test/demo adapter. This does NOT persist after reload or server restart. */
export class InMemoryKV implements MemoryKV {
  private readonly records = new Map<string, readonly MemoryEntry[]>();
  async get(key: string) { return this.records.get(key); }
  async set(key: string, value: readonly MemoryEntry[]) { this.records.set(key, [...value]); }
}

/** A server-owned adapter can persist this interface through authenticated Supabase/Redis.
 * Never use a service-role key or bearer token in the public Vite client.
 */
export class AgentMemory {
  private readonly sessions = new Map<string, string[]>();
  constructor(private readonly store: MemoryKV = new InMemoryKV()) { }

  private key(ctx: ExecutionContext): string {
    if (![ctx.userId, ctx.projectId].every(value =>
      /^[a-zA-Z0-9_-]{1,100}$/.test(value))) throw new Error("Invalid memory identity");
    return JSON.stringify(["meridian-agent-memory-v1", ctx.userId, ctx.projectId]);
  }
  addSession(ctx: ExecutionContext, summary: string): void {
    if (summary.length > 1200) throw new Error("Session event too large");
    const key = JSON.stringify([this.key(ctx), ctx.sessionId]);
    const entries = this.sessions.get(key) ?? [];
    entries.push(summary);
    this.sessions.set(key, entries.slice(-24));
  }
  session(ctx: ExecutionContext): readonly string[] {
    return [...(this.sessions.get(JSON.stringify([this.key(ctx), ctx.sessionId])) ?? [])];
  }
  async list(ctx: ExecutionContext): Promise<readonly MemoryEntry[]> {
    return (await this.store.get(this.key(ctx))) ?? [];
  }
  async remember(ctx: ExecutionContext, entry: MemoryEntry, explicitConsent: boolean): Promise<boolean> {
    if (!explicitConsent) return false;
    if (entry.value.length > 1800 || !entry.value.trim()) throw new Error("Invalid memory content");
    if (!["preference", "decision", "project_note"].includes(entry.kind) ||
        !Number.isFinite(Date.parse(entry.createdAt))) throw new Error("Invalid memory entry");
    const existing = await this.list(ctx);
    await this.store.set(this.key(ctx), [...existing.slice(-49), entry]);
    return true;
  }
  async clear(ctx: ExecutionContext, explicitConsent: boolean): Promise<boolean> {
    if (!explicitConsent) return false;
    await this.store.set(this.key(ctx), []);
    this.sessions.delete(JSON.stringify([this.key(ctx), ctx.sessionId]));
    return true;
  }
}
