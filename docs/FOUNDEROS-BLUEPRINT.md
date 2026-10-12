# Meridian FounderOS

FounderOS es un copiloto empresarial orientado a decisiones: ayuda a convertir una idea en hipótesis, investigación, arquitectura, experimentos y acciones verificables. No es un chatbot genérico. Su unidad principal es un **decision loop**:

`Brief → Research → Challenge → Plan → Execute → Verify → Learn`

## Núcleo local entregado

`meridian-mcp-sandbox/src/startup-school/` incluye:

- `PitchCoachBot`: evalúa problema, segmento, solución, evidencia y monetización.
- `TechArchitectBot`: propone stack, módulos, límites MCP y controles de seguridad.
- `GrowthBot`: crea embudo, north-star metric, experimentos y guardrails.
- `simulateTraction`: proyecta visitantes, activación, retención, pago e ingreso con supuestos explícitos.

Todo funciona en `simulation` sin API keys. Esto permite enseñar, probar y ejecutar evaluaciones de contrato antes de conectar servicios reales.

## MCPs recomendados por fase

1. **Investigación:** Exa o Firecrawl para búsqueda y extracción; Playwright/Browserbase para tareas web autorizadas.
2. **Contexto técnico:** GitHub, DeepWiki, Context7 y Next.js DevTools.
3. **Datos:** Supabase y Google/NotebookLM según la fuente de verdad.
4. **Operaciones:** Notion, Atlassian, Lark y Granola.
5. **Mercado:** Alpha Vantage para señales financieras; no usarlo como asesoría de inversión.
6. **Entrega:** Vercel, Railway o Cloudflare, siempre con dry-run y permisos mínimos.
7. **Growth:** Headcount Labs para datos de empleo y conectores de marketing solo con consentimiento.
8. **Media:** MiniMax, Blender y proveedores de imagen/video cuando el caso lo justifique.

La comparación completa, con capacidades, riesgos, costes implícitos y nombres de
credenciales, está en [`FOUNDEROS-MCP-RESEARCH.md`](./FOUNDEROS-MCP-RESEARCH.md).
La regla de producto es empezar con **read-only**, añadir una sola fuente de
verdad por dominio y exigir aprobación humana para cualquier write externo.

## Arquitectura de producción

- Frontend: Next.js App Router, TypeScript, Tailwind y panel de trazas.
- Backend: Supabase/Neon con multi-tenancy, RLS y auditoría.
- Agente: Vercel AI SDK + router de herramientas MCP con allowlist por workspace.
- Memoria: hechos, decisiones, fuentes, tareas y feedback; no guardar secretos en prompts.
- Seguridad: OAuth donde exista, vault para claves, redacción de PII, scopes mínimos, tool budgets y aprobación humana para writes.

## APIs / claves que podrían hacer falta

No hace falta enviarme ninguna clave para probar el módulo local. Para modo real, se necesitarían de forma opcional y solo en variables de entorno del servidor:

- `OPENAI_API_KEY` o proveedor LLM equivalente.
- `EXA_API_KEY` y/o `FIRECRAWL_API_KEY` para investigación.
- `GITHUB_TOKEN` para repositorios privados o acciones autenticadas.
- Credenciales OAuth de Google, Notion, Atlassian, Slack/Lark según el workspace.
- `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` únicamente en backend protegido.
- `VERCEL_TOKEN`, `RAILWAY_TOKEN` o Cloudflare credentials para despliegue.
- `ALPHAVANTAGE_API_KEY` para datos de mercado.
- `STRIPE_RESTRICTED_API_KEY` y `STRIPE_WEBHOOK_SIGNING_SECRET` para billing en sandbox.
- `HEADCOUNTLABS_API_KEY`, credenciales Meta/Instagram y `GEOAPIFY_API_KEY` para growth.
- `MINIMAX_API_KEY` para media generativa.

**Nunca** pegues claves en el chat, en el frontend, en issues o en el repositorio. Las añadiremos después mediante `.env` local o el gestor de secretos del despliegue.

## Criterio de éxito

FounderOS debe producir una decisión mejor, no solo una respuesta bonita. Cada recomendación necesita fuente, supuesto, nivel de confianza y siguiente acción. Toda acción externa debe mostrar preview, permisos y resultado verificable.

Fuentes públicas investigadas: [mcpservers.org](https://mcpservers.org/es/), documentación oficial de MCP y páginas oficiales de los conectores seleccionados.
