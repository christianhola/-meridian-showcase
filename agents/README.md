# Meridian Agent Studio · Reference architecture

## Scope and reality check

The public showcase is a **local configuration demo**, not a live agent executor. It ships six role profiles with original SKILL.md files. All privileged execution belongs to a backend. No provider keys should be placed in this public repository.

The independently hosted `christianhola/meridian-model` repository has an initial FastAPI router at `/api/v1/agents` and `/api/v1/agents/execute`. The current gateway supports a safe plan response and explicit opt-in to a limited existing runtime tool. It does **not** yet implement LLM orchestration or streaming. Do not confuse `meridian-model` with the Vercel-hosted `meridian-api`.

## Target request flow

```text
User -> Authenticated browser -> API gateway (authorization)
     -> Tenant/project context (fresh, scoped)
     -> Role + skill registry
     -> Model provider adapter (not implemented)
     -> Permissioned tools / MCP (approval)
     -> Observation + verification + audit log
     -> JSON/streaming response (streaming not implemented)
```

## Roles

| Role | Initial tool allowlist | Responsibility |
| --- | --- | --- |
| architect | none | Architecture and interfaces |
| coder | none | Implementation plans and tests |
| researcher | web_search with approval | Evidence and video-to-skill preparation |
| growth | web_search with approval | Customer discovery and strategy |
| browser | none | Browser QA plans |
| reviewer | none | Security and release gates |

Do not attach unrestricted shell, browser, GitHub write, deployment, or financial tools to any role. Implement server-side authorization, human approval, audit logging and verification before enabling privileged tools.

## Source research queue

The following are **research references**, not claims that all videos or full transcriptions have been processed:

- [Y Combinator](https://www.youtube.com/@ycombinator) — customer interviews, product-market fit; confirmed video: [How To Talk To Users](https://www.youtube.com/watch?v=z1iF1c8w5Lg).
- [Lex Fridman](https://www.youtube.com/@lexfridman) — long-form technology interviews.
- [a16z](https://www.youtube.com/@a16z) — AI product, strategy and investing.
- [CrewAI](https://github.com/crewAIInc/crewAI) — crews and flows.
- [Agno](https://github.com/agno-agi/agno) — agent-platform runtime patterns.
- [browser-use](https://github.com/browser-use/browser-use) — browser agents.
- [VoltAgent awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) — skill discovery; entries are not security-audited.
- [Microsoft AutoGen](https://github.com/microsoft/autogen) — historical reference; maintenance mode, prefer evaluating Microsoft Agent Framework for new builds.
- [awesome-agent-learning](https://github.com/artnitolog/awesome-agent-learning) and [awesome-ai-agents-2026](https://github.com/caramaschiHG/awesome-ai-agents-2026) — directories, verify each linked project.

## Next integration milestones

1. Build a provider-neutral model adapter with explicit timeout, cost, and model routing.
2. Persist per-workspace role definitions, skill versions and approval receipts.
3. Implement MCP tool discovery, scoped execution and error normalization on the server.
4. Add citation-backed transcription ingestion only for accessible/licensed transcripts, plus provenance and deduplication.
5. Define agent evaluation scenarios for authorization, prompt-injection defenses, hallucinations, outages and quality.
6. Add SSE / structured streaming and connect frontend only after integration tests.
7. Run local build/tests, authorization review, and preview QA before releasing.

No external project source code is vendored wholesale. Audit licenses, provenance and security before installing any third-party skills or scripts.
