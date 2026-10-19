# Meridian Agent Framework — Tool Lab v0.1 (safe experimental branch)

## Status and scope

This work extends the existing Vite + React + TypeScript Community application. It does
**not** replace `meridian-agents-v2`, deploy to Railway, install Python/terminal agents,
change model APIs, write to GitHub repositories or attach credentials to static JavaScript.

The public Tool Lab is a **simulation environment**. The TypeScript loop actually emits
events, can await a human-clicked approval, and calls the temporary, memory-backed
workspace tools. Sample browser output is explicitly simulated. There is no secret
model reasoning, shell access, external navigation, or durable server storage.

The User can reject a proposed action. Approval is scoped to an exact request ID,
the user and session, its displayed arguments, and a short expiration period.
Production approval must be authenticated and verified by a backend; the public
demo alone is **not** a security boundary.

## Five implemented modules

| Module | File | Scope now |
| --- | --- | --- |
| Strict tool registry | `src/engine/types.ts`, `src/services/toolRegistry.ts` | Typed schema, risk rating, validation, safe virtual files, CRITICAL shell disabled |
| Human-in-the-loop | `src/services/permissionGate.ts` | Expiring, single-use, user/session scoped decision broker |
| Agentic browser | `src/services/browserAgent.ts` | Server-driver contract, HTTPS host allowlist, redirect validation, bounded screenshots; requires isolated worker later |
| Project memory | `src/services/agentMemory.ts` | Bounded session state and tenant-scoped KV driver interface; durable persistence needs authenticated backend adapter |
| SSE + agent loop | `src/engine/runAgentLoop.ts`, `src/components/LiveDemoPanel.tsx` | Bounded async agent loop and typed events; browser demonstration only |

### Tool risk policy

- `execute_bash`: CRITICAL, cannot execute. Approval does not enable it.
- `read_file`: LOW; virtual project workspace only.
- `write_file`: MEDIUM, explicit human approval; virtual workspace only.
- `browser_navigate`: MEDIUM, explicit approval; simulated in UI.
- `browser_click`: HIGH, explicit approval; simulated in UI.

Event protocol: `agent:thought` (public progress summary, **never** private reasoning),
`agent:tool_call`, `agent:permission_request`, `agent:tool_result`,
`agent:memory_update`, plus completion and sanitized errors.

### Integration contract for real execution (NOT installed)

1. Backend authenticates the user and project for **every** run and approval.
2. Server creates a tool definition allowlist and validates arguments again.
3. Use an isolated, quota-bound worker for each project (never the Railway host shell).
4. Browser worker must enforce HTTPS allowlists, DNS/IP restrictions and redirects,
   forbid private-network access, block downloads and sensitive form submissions,
   and isolate browser profiles for every user.
5. A backend adapter for Supabase/Redis writes decisions only on explicit consent;
   enforce tenant isolation using user-scoped policies. No service-role key in Vite.
6. Persist immutable approval/audit records on the server, correlate SSE run IDs with
   the authenticated session and reject replay/expired approval.
7. Keep model-proposed commands, repository content, webpages and screenshots
   untrusted; treat them as **data** without elevating instructions.
8. Run security and rollback tests before considering real capabilities enabled.

## Upstream research and adoption decisions

No upstream source trees or third-party licenses were silently vendored. This is an
original Meridian implementation informed by the sources below.

| Repository | What it actually covers | Meridian choice |
| --- | --- | --- |
| [vibe-coding-toolkit](https://github.com/soumatheusgomes/vibe-coding-toolkit) | Existing-project adaptation, subagent scope, quality gates, context files and clear verification | Adopt progressive, scoped changes and documented evidence; **not** its machine installation scripts or Next.js bootstrap |
| [Anthropic interactive prompt tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial) | Official nine-chapter training in role instructions, separating data from instructions, examples, output formats and avoiding unsupported claims; user's original URL was misspelled | Apply role/goal/context separation and keep untrusted text out of tool permissions; do not copy course text |
| [vllm](https://github.com/vllm-project/vllm) | LLM inference serving and throughput | Not installed: no local GPU serving requirement for the existing OpenRouter stack |
| [aider](https://github.com/Aider-AI/aider) | Terminal-based assisted coding and Git editing | Adopt reversible edits and tests conceptually; do not enable terminal or Git writes in public website |
| [Fabric](https://github.com/danielmiessler/Fabric) | Task-focused community prompt patterns | Adapt modular skill selection without importing prompts |
| [awesome-chatgpt-prompts](https://github.com/f/awesome-chatgpt-prompts) | Community role/prompt examples | Reference only: Meridian role prompts retain project constraints |
| [AutoGen](https://github.com/microsoft/autogen) | Multi-agent framework; README warns it is archived/unmaintained | Use orchestration pattern as history; do not install for production |
| [CrewAI](https://github.com/crewAIInc/crewAI) | Role-based crews and explicit workflows | Adopt bounded specialist handoff concepts |
| [LlamaAgents](https://github.com/run-llama/llama-agents) | Async, event-driven document workflows | Adopt typed events and bounded steps |
| [Professional Programming](https://github.com/charlax/professional-programming) | Engineering reading/checklist references | Adopt design, testing and review checklist framing |
| [MindsDB](https://github.com/mindsdb/mindsdb) | AI database/data integration | Not installed: would introduce external data access and auth work |
| [Browser Use](https://github.com/browser-use/browser-use) | Browser automation frameworks | Adapt tool boundaries; do not install a browser worker in Railway |

These are **research references, not executable integrations**. Before importing
any actual third-party files, verify versions, attribution, licenses, dependency
compatibility, and review source code for tool/credential access.

## Validation

```text
npm ci
npm run check
npm test
npm run build
```

Inspect `scripts/agent-framework.test.mjs` for behavioral checks:
permission replay, refusal, shell blocking, file sandbox boundaries,
browser allowlists and memory isolation.

## Future release gates

- Full server-side auth and permission enforcement with idempotent approvals.
- Durable memory, retention policy and export/delete UI.
- Tenant-isolated browser worker and screenshot transport; no internal networks.
- Audited file tools in a disposable container, if ever enabled.
- Tested model tool-calling loop with clear per-user budgets.
- End-to-end QA, logging redaction, rate limits and rollback before deployment.
