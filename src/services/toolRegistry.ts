import type { ExecutionContext, PermissionRequest, ToolCall, ToolDefinition, ToolExecutionResult, ToolName, ToolSchema } from "../engine/types";
import { failed } from "../engine/types";

export function validateArguments(schema: ToolSchema, input: Readonly<Record<string, unknown>>): string | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return "Expected a JSON object";
  for (const key of schema.required) if (!(key in input)) return "Missing argument: " + key;
  for (const [key, value] of Object.entries(input)) {
    const expected = schema.properties[key];
    if (!expected) return "Unexpected argument: " + key;
    if (typeof value !== expected.type) return "Invalid argument type: " + key;
    if (typeof value === "string" && expected.maxLength && value.length > expected.maxLength) {
      return "Argument too long: " + key;
    }
  }
  return null;
}

export class ToolRegistry {
  private readonly tools = new Map<ToolName, ToolDefinition>();
  register(definition: ToolDefinition): void {
    if (this.tools.has(definition.name)) throw new Error("Duplicate tool: " + definition.name);
    this.tools.set(definition.name, definition);
  }
  get(name: ToolName): ToolDefinition | undefined { return this.tools.get(name); }
  catalog(): ReadonlyArray<Pick<ToolDefinition, "name" | "description" | "risk" | "schema" | "requiresApproval">> {
    return Array.from(this.tools.values(), ({ name, description, risk, schema, requiresApproval }) =>
      ({ name, description, risk, schema, requiresApproval }));
  }
  async executeAuthorized(context: ExecutionContext, call: ToolCall, authorized: boolean): Promise<ToolExecutionResult> {
    const definition = this.tools.get(call.name);
    if (!definition) return failed("UNAVAILABLE", "Tool not registered");
    const error = validateArguments(definition.schema, call.arguments);
    if (error) return failed("INVALID_ARGUMENTS", error);
    if (definition.requiresApproval && !authorized) return failed("DENIED", "User approval required");
    if (context.signal?.aborted) return failed("TIMEOUT", "Cancelled");
    try { return await definition.execute(context, call.arguments); }
    catch { return failed("FAILED", "Tool execution failed without exposing internal details"); }
  }
}

const schema = (fields: Record<string, number>): ToolSchema => ({
  type: "object", required: Object.keys(fields),
  properties: Object.fromEntries(Object.entries(fields).map(([name, maxLength]) => [
    name, { type: "string" as const, maxLength }
  ])), additionalProperties: false,
});

/** This is an in-memory project sandbox, NOT the user's actual filesystem. */
export class VirtualWorkspace {
  private readonly files = new Map<string, string>();
  private key(context: ExecutionContext, path: string): string | null {
    if (!/^[a-zA-Z0-9_./-]{1,180}$/.test(path) || path.startsWith("/") ||
        path.split("/").some(segment => segment === "." || segment === ".." || !segment) ||
        path.includes("\\")) return null;
    return JSON.stringify([context.userId, context.projectId, path]);
  }
  read(context: ExecutionContext, path: string): ToolExecutionResult {
    const key = this.key(context, path);
    if (!key) return failed("INVALID_ARGUMENTS", "Invalid project-relative path");
    const value = this.files.get(key);
    return value === undefined ? failed("UNAVAILABLE", "File not found in demonstration workspace")
      : { ok: true, code: "OK", output: value };
  }
  write(context: ExecutionContext, path: string, content: string): ToolExecutionResult {
    const key = this.key(context, path);
    if (!key || content.length > 32000) return failed("INVALID_ARGUMENTS", "Invalid path or file exceeds 32 KB");
    this.files.set(key, content);
    return { ok: true, code: "OK", output: "Saved to temporary virtual workspace: " + path };
  }
}

export interface BrowserAdapter {
  navigate(url: string): Promise<ToolExecutionResult>;
  click(selector: string): Promise<ToolExecutionResult>;
}

export function createToolRegistry(options: {
  workspace: VirtualWorkspace;
  browser?: BrowserAdapter;
}): ToolRegistry {
  const registry = new ToolRegistry();
  registry.register({
    name: "execute_bash", description: "Privileged shell (disabled in this environment)",
    risk: "CRITICAL", requiresApproval: true,
    schema: schema({ command: 500 }),
    execute: async () => failed("UNAVAILABLE", "Shell execution is intentionally disabled"),
  });
  registry.register({
    name: "read_file", description: "Read a file from a temporary project-scoped workspace",
    risk: "LOW", requiresApproval: false,
    schema: schema({ path: 180 }),
    execute: async (ctx, args) => options.workspace.read(ctx, args.path as string),
  });
  registry.register({
    name: "write_file", description: "Write to a temporary project-scoped workspace only",
    risk: "MEDIUM", requiresApproval: true,
    schema: schema({ path: 180, content: 32000 }),
    execute: async (ctx, args) => options.workspace.write(ctx, args.path as string, args.content as string),
  });
  registry.register({
    name: "browser_navigate", description: "Navigate a scoped, isolated browser adapter",
    risk: "MEDIUM", requiresApproval: true,
    schema: schema({ url: 2048 }),
    execute: async (_ctx, args) => options.browser
      ? options.browser.navigate(args.url as string)
      : failed("UNAVAILABLE", "Browser worker not installed"),
  });
  registry.register({
    name: "browser_click", description: "Click after approval in a scoped browser",
    risk: "HIGH", requiresApproval: true,
    schema: schema({ selector: 240 }),
    execute: async (_ctx, args) => options.browser
      ? options.browser.click(args.selector as string)
      : failed("UNAVAILABLE", "Browser worker not installed"),
  });
  return registry;
}
