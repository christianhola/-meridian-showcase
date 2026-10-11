# Meridian Agent Response Starter

**Status: functional local example, not a connected AI agent or stable platform SDK.**

A lightweight browser UI inspired by common AI response interface patterns, with a real local HTTP server and a deterministic `/api/demo` endpoint. Written using **Node.js built-ins and plain HTML/CSS/JavaScript**. No npm packages, API keys, accounts or network services are required.

## Get started (3 steps)

1. Clone the repository, then enter its directory.
2. Run `node examples/agent-response-starter/server.mjs` using Node.js **20 or later**.
3. Open [http://127.0.0.1:4173](http://127.0.0.1:4173) and switch between the Starter, Permissions and Security scenarios.

## Tests

```bash
node --test examples/agent-response-starter/test/*.test.mjs
```

You can choose another local port with `PORT=5180 node examples/agent-response-starter/server.mjs` in a Unix-like shell. This sample listens only on `127.0.0.1`. Do not expose this development example publicly as a network service.

## API

- `GET /api/demo?scenario=starter`
- `GET /api/demo?scenario=permissions`
- `GET /api/demo?scenario=security`

Unknown scenario IDs return HTTP 400. The server serves only a fixed allowlist of static files and applies a restrictive Content Security Policy. Browser rendering uses `textContent` and DOM creation instead of untrusted HTML.

## Boundaries

This is **not** a live LLM, production-ready auth server, MCP implementation or Meridian private API client. Use `docs/PLUGIN-CONTRACT.md` as a proposal for future permission-scoped integrations, and `skills/wilenny/SKILL.md` for a documented portable skill.
