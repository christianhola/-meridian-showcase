import { test } from "node:test";
import { strict as assert } from "node:assert";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";
import { getBuildingBlock } from "../catalog.mjs";

test("catalog is safe and rejects unknown identifiers", () => {
  assert.equal(getBuildingBlock("mcp").name, "MCP server");
  assert.equal(getBuildingBlock("__proto__"), null);
  assert.equal(getBuildingBlock("secret"), null);
});

test("MCP stdio handshake, tools/list and tools/call work using the official SDK", async () => {
  const program = fileURLToPath(new URL("../server.mjs", import.meta.url));
  const client = new Client({ name: "meridian-test-client", version: "0.1.0" });
  await client.connect(new StdioClientTransport({ command: process.execPath, args: [program] }));
  try {
    const response = await client.listTools();
    const names = response.tools.map(tool => tool.name);
    assert.deepEqual(names, ["get_building_block"]);
    const result = await client.callTool({
      name: "get_building_block",
      arguments: { type: "starter" },
    });
    assert.equal(result.isError, undefined);
    assert.equal(result.content?.[0]?.type, "text");
    const value = JSON.parse(result.content[0].text);
    assert.equal(value.type, "starter");
    assert.ok(value.safety.includes("fake example data"));
  } finally {
    await client.close();
  }
});
