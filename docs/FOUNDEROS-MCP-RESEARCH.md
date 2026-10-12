# Investigación MCP para Meridian FounderOS

**Fecha de snapshot:** 2026-10-12  
**Método:** revisión de `mcpservers.org/es/`, fichas públicas y documentación oficial de los proveedores. Las recomendaciones son de arquitectura, no asesoría legal, financiera ni de seguridad.

## Decisión de producto

FounderOS debe comenzar con un **router MCP por capacidades**, no con una conexión indiscriminada a todos los servidores. La secuencia recomendada es:

1. **Read-only research:** Exa + Firecrawl + Playwright local.
2. **Code context:** GitHub + Context7; DeepWiki para repositorios complejos.
3. **Operational memory:** Supabase + Notion.
4. **Decision loop:** Pitch Coach, Tech Architect y Growth Bot locales.
5. **Human-approved writes:** despliegue, CRM, publicaciones y billing.

Esta composición permite que el producto funcione sin claves en simulación y que cada conexión real tenga alcance, coste y riesgo explícitos.

## Familias evaluadas

### Investigación web y scraping
**Recomendación:** Exa descubre; Firecrawl convierte páginas en Markdown/JSON y rastrea sitios; Playwright interactúa localmente; Browserbase aporta sesiones cloud cuando se necesite escala o replay.

**Claves potenciales:** `EXA_API_KEY`, `FIRECRAWL_API_KEY`, `BROWSERBASE_API_KEY`, `BROWSERBASE_PROJECT_ID`.

**Riesgos:** términos de uso, robots, privacidad, cookies autenticadas, anti-bot, coste por crédito, 429 y cambios de DOM. La ficha de Browserbase revisada advierte que un repositorio listado está archivado; usar endpoints oficiales y fijar versiones.

### Código y repositorios
**Recomendación:** GitHub es el plano de control; DeepWiki entiende el mapa semántico; Context7 entrega documentación versionada; Next.js DevTools verifica logs, rutas y errores en desarrollo.

**Claves potenciales:** `GITHUB_PERSONAL_ACCESS_TOKEN`, `GITHUB_OAUTH_TOKEN`, `GITHUB_APP_PRIVATE_KEY`, `DEEPWIKI_API_KEY`, `CONTEXT7_API_KEY`.

**Riesgos:** PATs demasiado amplios, prompt injection dentro de issues o código, contexto comunitario incompleto y exposición de logs. GitHub debe iniciar en solo lectura; Next.js DevTools se limita a local/dev.

### Datos y base de datos
**Recomendación:** Supabase como Postgres principal con RLS, Auth y MCP oficial limitado por proyecto; Google MCP Toolbox solo si hacen falta BigQuery, AlloyDB, Cloud SQL, Spanner o Firestore. NotebookLM queda como investigación documental opcional, no como base transaccional.

**Claves potenciales:** `SUPABASE_ACCESS_TOKEN`, `SUPABASE_PROJECT_REF`, `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY`, credenciales OAuth/servicio de Google.

**Riesgos:** DDL o escrituras destructivas, prompt injection desde filas/documentos, service accounts expuestas y dependencia comunitaria/no oficial de NotebookLM.

### Productividad y CRM
**Recomendación:** Notion + Granola como primera pareja: conocimiento/CRM y reuniones. Atlassian entra cuando el delivery vive en Jira/Confluence. Lark es alternativa de suite unificada; no duplicar sistemas maestros sin reglas de sincronización.

**Claves potenciales:** `NOTION_TOKEN`, OAuth de Notion/Atlassian, `ATLASSIAN_API_TOKEN`, `LARK_APP_ID`, `LARK_APP_SECRET`, `GRANOLA_API_KEY`.

**Riesgos:** transcripciones y datos de clientes, permisos de escritura, divergencia entre sistemas y requisitos de privacidad/consentimiento de reuniones.

### Finanzas y mercado
**Recomendación:** Alpha Vantage para datos de mercado, ISO 20022 para semántica de mensajería y Stripe para billing. Solo lectura para señales; sandbox y aprobación humana para pagos, reembolsos y cambios de suscripción.

**Claves potenciales:** `ALPHAVANTAGE_API_KEY`, claves restringidas/de agente de Stripe y `STRIPE_WEBHOOK_SIGNING_SECRET`.

**Riesgos:** límites y licencias de mercado, datos con retraso, perfiles ISO 20022 incompatibles y operaciones monetarias no reversibles. FounderOS no debe presentar señales como asesoría de inversión.

### Infraestructura y despliegue
**Recomendación:** Railway como plataforma inicial para servicios; Vercel para frontend Next.js y previews; Cloudflare para edge, DNS, Workers y seguridad avanzada.

**Claves potenciales:** `VERCEL_OAUTH_ACCESS_TOKEN`, `RAILWAY_OAUTH_TOKEN`, `CLOUDFLARE_API_TOKEN`.

**Riesgos:** redeploys o borrados, superficie de API amplia en Cloudflare, capacidades beta/variables de Vercel y coste duplicado multi-plataforma. Todo write necesita preview, confirmación y rollback.

### Growth, empleo y marketing
**Recomendación:** Headcount Labs para señales de contratación; Instagram para contenido y métricas de cuentas autorizadas; Geoapify para decisión territorial. Iniciar en lectura y aprobar publicaciones/DMs/moderación.

**Claves potenciales:** `HEADCOUNTLABS_API_KEY`, credenciales Meta/Instagram y `GEOAPIFY_API_KEY`.

**Riesgos:** deduplicación y frescura de ofertas, permisos Meta/App Review, datos personales, cuotas y precisión geoespacial.

### Media, video y creativo
**Recomendación:** MiniMax para imagen/video/audio; Blender MCP para escenas 3D reproducibles. Mantener revisión humana, presupuestos y derechos de referencia.

**Claves potenciales:** `MINIMAX_API_KEY`, `MINIMAX_API_HOST` y la credencial del cliente MCP elegido.

**Riesgos:** Blender puede ejecutar Python generado por el modelo, coste y asincronía de video, derechos de voz/imagen y variabilidad de outputs.

## Regla de activación de FounderOS

Cada conector debe declarar:

- `capability`: qué puede hacer.
- `scopes`: qué datos puede leer/escribir.
- `cost`: cuota o coste estimado.
- `approval`: si requiere aprobación humana.
- `retention`: cuánto tiempo se conserva el resultado.
- `evidence`: fuente, timestamp y nivel de confianza.

**Nunca** introducir claves por chat. Para activar el modo real se usarán variables de entorno locales o el gestor de secretos del despliegue.

## Fuentes

- [1]: https://mcpservers.org/es/ "Awesome MCP Servers en español"
- [2]: https://exa.ai/docs/reference/search "Exa Search API"
- [3]: https://docs.firecrawl.dev/api-reference/introduction "Firecrawl API"
- [4]: https://playwright.dev/docs/library "Playwright Library"
- [5]: https://github.com/github/github-mcp-server "GitHub MCP Server"
- [6]: https://context7.com/docs/installation "Context7 installation"
- [7]: https://nextjs.org/docs/app/guides/mcp "Next.js MCP guide"
- [8]: https://supabase.com/docs/guides/ai-tools/mcp "Supabase MCP"
- [9]: https://developers.notion.so/ "Notion Developers"
- [10]: https://developer.atlassian.com/cloud/ "Atlassian Cloud Developer"
- [11]: https://docs.stripe.com/mcp "Stripe MCP"
- [12]: https://docs.railway.com/ai/mcp-server "Railway MCP Server"
- [13]: https://developers.cloudflare.com/agents/model-context-protocol/cloudflare/servers-for-cloudflare/ "Cloudflare MCP servers"
- [14]: https://www.geoapify.com/mcp/ "Geoapify MCP"
- [15]: https://platform.minimax.io/docs/guides/video-generation "MiniMax video generation"
- [16]: https://www.blender.org/lab/mcp-server/ "Blender MCP Server"
