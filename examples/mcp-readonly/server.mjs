import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import * as z from "zod/v4";
import { getBuildingBlock } from "./catalog.mjs";

// The MCP SDK owns the stdio stream. Never log ordinary output to stdout.
serveStdio(() => {
  const server = new McpServer({ name: "meridian-community-readonly-example", version: "0.1.0" });
  server.registerTool(
    "get_building_block",
    {
      description: "Look up one of three fixed, public developer building blocks. Read-only; no network access.",
      inputSchema: z.object({ type: z.enum(["plugin", "mcp", "starter"]) }),
    },
    async ({ type }) => {
      const entry = getBuildingBlock(type);
      return { content: [{ type: "text", text: JSON.stringify({ type, ...entry }) }] };
    },
  );
  return server;
});
