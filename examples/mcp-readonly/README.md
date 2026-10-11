# Read-only MCP Example — Meridian Community

**Status: local demonstration for developers, not a production integration.**

This is a small, auditable MCP server built with the official [Model Context Protocol TypeScript SDK v2](https://github.com/modelcontextprotocol/typescript-sdk). It speaks stdio, exposes one tool, validates requests with Zod and returns only a fixed public catalog. It does not require tokens or external network access at runtime.

## Run in 3 steps

1. Install **Node.js 20+**.
2. From this directory, run `npm install`.
3. Run `npm start`. The process waits for an MCP host to connect through stdio; it does not serve a webpage.

## Test the complete MCP connection

```bash
npm test
```

The test starts the server as a child process, negotiates the protocol, requests `tools/list`, and calls `get_building_block` via the official SDK client.

## Tool

`get_building_block`: accepts one enum value among `plugin`, `mcp`, and `starter`; returns a short JSON description with a security boundary.

The tool has **no side effects**: no GitHub writes, no filesystem access, no process execution, no network calls and no credential access. Output goes to stdout exclusively through the MCP protocol; stderr is reserved for diagnostics.

## Host integration

Configure a trusted MCP host to launch `node /absolute/path/to/examples/mcp-readonly/server.mjs`. Use the host's local MCP server configuration. Review the host's capabilities and permissions before connecting other MCP tools.

Do not place SDK tokens in a public repository. A real service integration will need auth, scopes, rate limits, cancellation, error handling, human confirmation of sensitive actions and security review.

This example and the [agent-response starter](../agent-response-starter/README.md) are separate: one demonstrates a true MCP transport, the other demonstrates browser UI with deterministic data.
