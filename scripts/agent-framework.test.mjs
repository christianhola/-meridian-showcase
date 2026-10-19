import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const temp = mkdtempSync(path.join(tmpdir(), "meridian-agent-test-"));
const sourceFiles = [
  "src/engine/types.ts", "src/services/toolRegistry.ts", "src/services/permissionGate.ts",
  "src/services/browserAgent.ts", "src/services/agentMemory.ts", "src/engine/runAgentLoop.ts",
];
for (const filename of sourceFiles) {
  const content = readFileSync(path.join(root, filename), "utf8");
  const relative = filename.replace(/\.ts$/, ".js");
  const dest = path.join(temp, relative);
  mkdirSync(path.dirname(dest), { recursive: true });
  writeFileSync(dest, ts.transpileModule(content, { compilerOptions: {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true,
  } }).outputText);
}
const req = createRequire(path.join(temp, "loader.cjs"));
const load = file => req(path.join(temp, file));
const { createToolRegistry, VirtualWorkspace } = load("src/services/toolRegistry.js");
const { PermissionGate } = load("src/services/permissionGate.js");
const { BrowserAgent } = load("src/services/browserAgent.js");
const { AgentMemory, InMemoryKV } = load("src/services/agentMemory.js");
const { runAgentLoop, toSSE } = load("src/engine/runAgentLoop.js");
const ctx = { userId: "alice", projectId: "demo", sessionId: "session1" };
process.on("exit", () => rmSync(temp, { recursive: true, force: true }));

test("shell tools are always disabled even after a simulated approval", async () => {
  const registry = createToolRegistry({ workspace: new VirtualWorkspace() });
  const definition = registry.get("execute_bash");
  assert.equal(definition.risk, "CRITICAL");
  assert.equal(definition.requiresApproval, true);
  const result = await registry.executeAuthorized(ctx, {
    id: "1", name: "execute_bash", arguments: { command: "echo no-execution" },
  }, true);
  assert.equal(result.code, "UNAVAILABLE");
});

test("virtual project files require explicit approval and cannot traverse scope", async () => {
  const registry = createToolRegistry({ workspace: new VirtualWorkspace() });
  const write = { id: "2", name: "write_file", arguments: { path: "index.html", content: "Hello" } };
  assert.equal((await registry.executeAuthorized(ctx, write, false)).code, "DENIED");
  assert.equal((await registry.executeAuthorized(ctx, write, true)).code, "OK");
  const read = { id: "3", name: "read_file", arguments: { path: "index.html" } };
  assert.equal((await registry.executeAuthorized(ctx, read, false)).output, "Hello");
  assert.equal((await registry.executeAuthorized({ ...ctx, userId: "other" }, read, false)).code, "UNAVAILABLE");
  assert.equal((await registry.executeAuthorized(ctx, { id:"4", name: "write_file",
    arguments: { path: "../outside", content: "Forbidden" } }, true)).code, "INVALID_ARGUMENTS");
});

test("approval is bound to the session and cannot be replayed", async () => {
  const gate = new PermissionGate(2000);
  const req_ = gate.create({ id: "approval-1", name: "write_file",
    arguments: { path: "demo.txt", content: "hello" } }, ctx, "MEDIUM");
  const response = gate.wait(req_);
  assert.equal(gate.decide({ ...ctx, sessionId: "someone-else" }, req_.id, "APPROVED"), false);
  assert.equal(await response, "REJECTED");
  const req2 = gate.create({ id: "approval-2", name: "write_file",
    arguments: { path: "demo.txt", content: "hello" } }, ctx, "MEDIUM");
  const response2 = gate.wait(req2);
  assert.equal(gate.decide(ctx, req2.id, "APPROVED"), true);
  assert.equal(await response2, "APPROVED");
  assert.equal(gate.decide(ctx, req2.id, "APPROVED"), false);
});

test("browser agent enforces allowed hosts and refuses redirected pages", async () => {
  let visited = 0;
  const driver = {
    navigate: async (url) => { visited++; return { finalUrl: url, visibleText: "Example text" }; },
    click: async () => ({ finalUrl: "https://unapproved.example", visibleText: "No" }),
  };
  const browser = new BrowserAgent(driver, new Set(["example.org"]));
  assert.equal((await browser.navigate("http://example.org")).code, "DENIED");
  assert.equal((await browser.navigate("https://127.0.0.1/")).code, "DENIED");
  assert.equal((await browser.navigate("https://example.org/")).code, "OK");
  assert.equal(visited, 1);
  assert.equal((await browser.click("a.next")).code, "DENIED");
});

test("user consent controls long-term memory and session scope is bounded", async () => {
  const kv = new InMemoryKV();
  const memory = new AgentMemory(kv);
  memory.addSession(ctx, "A private conversation summary");
  assert.equal(memory.session(ctx).length, 1);
  assert.equal(memory.session({ ...ctx, sessionId: "other" }).length, 0);
  const entry = { kind: "decision", value: "Use strict TypeScript", createdAt: new Date().toISOString() };
  assert.equal(await memory.remember(ctx, entry, false), false);
  assert.equal((await memory.list(ctx)).length, 0);
  assert.equal(await memory.remember(ctx, entry, true), true);
  assert.equal((await memory.list(ctx)).length, 1);
  assert.equal((await memory.list({ ...ctx, userId: "other" })).length, 0);
  assert.equal(await memory.clear(ctx, false), false);
});

test("agent tool calling actually waits for a user's permission decision", async () => {
  const workspace = new VirtualWorkspace();
  const registry = createToolRegistry({ workspace });
  const gate = new PermissionGate();
  const events = [];
  const planner = async ({ previous }) => previous.length
    ? { kind: "answer", text: "Done inside a demo workspace" }
    : { kind: "tool", tool: "write_file", arguments: { path: "demo.txt", content: "Hi" } };
  for await (const event of runAgentLoop({
    runId: "run1", context: ctx, request: "Create a demo note",
    role: "Coder", planner, registry, permissions: gate, memory: new AgentMemory(), maxSteps: 2,
  })) {
    events.push(event);
    if (event.type === "agent:permission_request") {
      assert.deepEqual(event.request.arguments, { path: "demo.txt", content: "Hi" });
      assert.equal(gate.decide(ctx, event.request.id, "APPROVED"), true);
    }
  }
  assert.ok(events.some(e => e.type === "agent:tool_call"));
  assert.ok(events.some(e => e.type === "agent:permission_request"));
  assert.ok(events.some(e => e.type === "agent:tool_result" && e.result.ok));
  assert.ok(events.some(e => e.type === "agent:completed"));
  assert.equal(workspace.read(ctx, "demo.txt").output, "Hi");
  assert.match(toSSE(events[0]), /^event: agent:thought\ndata:/);
});

test("denial closes the loop without writing anything", async () => {
  const workspace = new VirtualWorkspace();
  const gate = new PermissionGate();
  const events = [];
  for await (const event of runAgentLoop({
    runId: "run2", context: ctx, request: "Create demo file",
    role: "Coder", planner: async () => ({ kind: "tool", tool: "write_file",
      arguments: { path: "demo.txt", content: "Not allowed" } }),
    registry: createToolRegistry({ workspace }), permissions: gate,
    memory: new AgentMemory(), maxSteps: 2,
  })) {
    events.push(event);
    if (event.type === "agent:permission_request") gate.decide(ctx, event.request.id, "REJECTED");
  }
  assert.equal(workspace.read(ctx, "demo.txt").code, "UNAVAILABLE");
  assert.ok(events.some(e => e.type === "agent:tool_result" && e.result.code === "DENIED"));
});
