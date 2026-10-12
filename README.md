# Meridian Community

**Build beyond the platform.**

An evolving developer community for reproducible agent interfaces, portable skills, documented contracts, and contributions around the Meridian / Nexviro ecosystem.

> **Launch status:** PRIVATE REPOSITORY · COMMUNITY PREVIEW. The independent GitHub organization, public domain and Discord have not been verified or created. Do not treat demo results as live agent execution.

## Start here

[English & Español — Getting started](./docs/GETTING-STARTED.md) · [Contribute](./CONTRIBUTING.md) · [Code of Conduct](./CODE_OF_CONDUCT.md) · [Security](./SECURITY.md) · [License](./LICENSE)

### Run the first real starter

Requires Node.js 20+. Uses only built-in Node modules — **no API keys, npm packages or external services**.

```bash
node --test examples/agent-response-starter/test/*.test.mjs
node examples/agent-response-starter/server.mjs
```

Open `http://127.0.0.1:4173`. Switch between sample responses delivered by a local HTTP endpoint. Everything is deterministic; no model provider calls.

[Starter source and documentation](./examples/agent-response-starter/README.md) · [Design references: 21st.dev](./docs/DESIGN-REFERENCES-21ST.md)

### Run the read-only MCP server

Official [MCP TypeScript SDK v2](https://github.com/modelcontextprotocol/typescript-sdk), a single permission-free tool and an end-to-end protocol test:

```bash
npm install --prefix examples/mcp-readonly
npm test --prefix examples/mcp-readonly
npm start --prefix examples/mcp-readonly
```

Its `stdio` transport waits for an MCP host. This is not an HTTP API or an LLM. See the [MCP example docs](./examples/mcp-readonly/README.md).

### Run the MCP + automation sandbox

[`meridian-mcp-sandbox`](./meridian-mcp-sandbox/README.md) is a self-contained playground: MCP memory client, resilient browser automation with Playwright (AbortController + exponential backoff) and hyperrealistic media payloads (FLUX / Runway / Luma). Requires Node.js 20+ and **no API keys** — without credentials everything runs in simulation mode and writes real local artifacts.

```bash
npm install --prefix meridian-mcp-sandbox
npm run dev --prefix meridian-mcp-sandbox        # MCP memory + tool discovery => READY
npm run test:media --prefix meridian-mcp-sandbox # simulation artifacts in output/media
npm run test:web --prefix meridian-mcp-sandbox   # needs: npm run setup:browsers --prefix meridian-mcp-sandbox
```

### Run the community site

```bash
npm install
npm run check
npm run evals
npm run community:check
npm run test
npm run starter:test
npm run security:check
npm run build
npm run dev
```

The community portal uses React 19, Vite and TypeScript. The local starter is separate and dependency-free. **A committed lockfile is still pending**; the current root install is not yet fully reproducible.

## Ecosystem tracks

| Area | Purpose | Release status |
| --- | --- | --- |
| `plugin-*` | Extensible capabilities | Contract proposals |
| `mcp-*` | Secure Model Context Protocol server integrations | Read-only local example included; no external integration published |
| `template-*` / `starter-*` | Reusable, runnable starters | Local agent-response starter available in this repo |
| `sdk-*` | Public API client libraries | Awaiting stable public API contracts |
| `integrations-*` | Third-party service connectors | Planned |
| `meridian-mcp-sandbox/` | Zero-config playground: MCP, Playwright resilience and hyperrealistic media | Runnable in this repo (`npm install && npm run dev`); independent repository pending publication |
| Built with Meridian | Curated developer projects | No verified external submissions yet |

The [community registry](./community/registry.json) intentionally starts empty. It only lists **reviewed public projects**, never placeholder packages.

## Architecture, governance and moderation

- [Manifesto](./docs/COMMUNITY-MANIFESTO.md)
- [Repository naming](./docs/REPOSITORY-NAMING.md)
- [Plugin contract proposal](./docs/PLUGIN-CONTRACT.md)
- [Governance](./docs/GOVERNANCE.md)
- [Security and moderation plan](./docs/DISCORD-BLUEPRINT.md)
- [GitHub organization profile blueprint](./blueprints/organization-github/profile/README.md)
- [Organization launch checklist](./docs/ORG-LAUNCH-CHECKLIST.md)
- [Release readiness / **public launch blockers**](./docs/LAUNCH-READINESS.md)

The private Meridian backend and its production credentials are **not** part of this community project. Historical technical docs in this repository must be reviewed for sensitivity before public visibility is enabled.

## License

MIT (subject to owner confirmation of rights to all included materials prior to public publication). Brand names and logos are covered separately by [TRADEMARKS.md](./TRADEMARKS.md). See [LICENSE](./LICENSE).

## Contributing

Start small: report a reproducible issue, improve documentation, run the starter, or add tests. Share only code and data you have permission to publish. Never put API keys or private infrastructure details into issues or PRs.

**Meridian Community is under development.** External URLs and community participation claims will be added only after verification.
