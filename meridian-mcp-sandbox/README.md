# Meridian MCP Sandbox

**Sandbox/playground independiente: Model Context Protocol + automatización web resiliente con Playwright + generación de medios hiperrealistas.**

> Estado: **READY**. `npm run dev` funciona con Node.js 20+ sin `.env`, sin claves de API y sin servicios de pago.
> El sandbox degrada con elegancia (nunca revienta) cuando falta red, credenciales o binarios de navegador.

```text
  ███  MERIDIAN · MCP SANDBOX
  Playground ejecutable: MCP + Playwright + medios hiperrealistas
  Zero Config · Zero ENV obligatorio · npm run dev
```

---

## 1. Quickstart (Plug & Play)

```bash
git clone <url-de-este-repositorio> meridian-mcp-sandbox
cd meridian-mcp-sandbox
npm install
npm run dev            # ⬅️ arranca el sandbox y ejecuta la prueba MCP completa
```

Requisito único: **Node.js ≥ 20.11** (probado en Node 22 LTS). Nada más.

Salida esperada (resumen):

```text
  Handshake MCP (initialize + tools/list)                ✔
  Escritura en el grafo de conocimiento                  ✔
  Lectura y búsqueda del grafo                           ✔
  Inspección de herramientas (tools/list + JSON Schema)  ✔
  MERIDIAN MCP SANDBOX · READY
```

| Script | Qué hace | ¿Necesita red? | ¿Necesita claves? |
| --- | --- | --- | --- |
| `npm run dev` | Prueba MCP completa (memoria + descubrimiento + informe) | No (solo si falta el paquete local) | No |
| `npm test` | 20 pruebas del núcleo (backoff, aborto, payloads, PNG) | No | No |
| `npm run test:media` | Genera payloads y artefactos de imagen/vídeo | No (modo simulación) | Solo para modo live |
| `npm run test:web` | Automatización Playwright con backoff y aborto | No (fixture local) | No |
| `npm run test:tools -- --server=everything` | Inspecciona cualquier servidor MCP | Sí (`npx`) | Solo GitHub |
| `npm run setup:browsers` | Instala Chromium para el motor Playwright | Sí | No |
| `npm run typecheck` / `npm run build` | Verificación de tipos / compilación a `dist/` | No | No |

---

## 2. Arquitectura

```text
meridian-mcp-sandbox/
├── .env.example                 # Todas las variables OPCIONALES documentadas
├── .gitignore
├── package.json                 # type: module · scripts dev/test:web/test:media/build
├── tsconfig.json                # ESNext + NodeNext + strict (sin `any` sueltos)
├── .github/workflows/ci.yml     # CI listo para el repositorio independiente
├── docs/
│   ├── MCP-CLIENTS.md           # Cómo enchufar estos servidores a Claude/Cursor/VS Code
│   └── PUBLISHING.md            # Cómo publicar este sandbox como repo independiente
└── src/
    ├── core/
    │   ├── logger.ts            # Log estructurado (pretty/JSON, sin dependencias)
    │   ├── retry.ts             # ⭐ Exponential backoff + AbortSignal + timeouts por intento
    │   ├── config.ts            # Zero-config: flags, .env opcional, rutas, detección de navegador
    │   └── retry.test.ts        # Pruebas del núcleo de resiliencia
    ├── mcp/
    │   ├── memory-client.ts     # Cliente MCP local cero-configuración (StdioClientTransport)
    │   └── public-servers.ts    # Conectores: Memory, Fetch, Everything, Puppeteer, GitHub, Playwright
    ├── automation/
    │   ├── playwright-agent.ts  # Motor "My Browser": navegación, extracción declarativa, artefactos
    │   └── runner.ts            # Demo ejecutable (fixture local + backoff + aborto + sitio público)
    ├── media/
    │   ├── generator.ts         # Payloads Flux/Runway/Luma + fallback de simulación
    │   ├── png.ts               # Codificador PNG en Node puro (artefactos reales sin API)
    │   └── generator.test.ts    # Pruebas de prompts, seeds, payloads y PNG
    ├── tools/
    │   └── inspector.ts         # Inspección de herramientas/recursos/prompts MCP
    └── index.ts                 # Entry point: prueba MCP completa + informe "READY"
```

Flujo de `npm run dev`:

```text
index.ts
  ├─ runtimeInfo()               → entorno, .env opcional
  ├─ MemoryClient.connect()      → StdioClientTransport → npx -y @modelcontextprotocol/server-memory
  ├─ createEntities/Relations    → escritura real en el grafo de conocimiento
  ├─ readGraph/searchNodes       → verificación de persistencia
  ├─ inspectServer("memory")     → tools/list + JSON Schema + hints de anotaciones
  ├─ providerMatrix()            → qué proveedores de medios están en live vs simulación
  ├─ detectBrowserAvailability() → estado del motor web
  └─ output/artifacts/*.json     → informe auditable + estado READY / READY_WITH_SETUP / DEGRADED
```

---

## 3. Los tres pilares

### 3.1 MCP: cliente local cero-configuración

`src/mcp/memory-client.ts` habla JSON-RPC por `stdio` con el servidor oficial de memoria:

```ts
import { MemoryClient, withMemoryClient } from "./mcp/memory-client.js";

// Ciclo de vida garantizado: conecta, usa y SIEMPRE cierra el proceso hijo.
const graph = await withMemoryClient(async (memory) => {
  await memory.createEntities([
    { name: "Meridian", entityType: "plataforma", observations: ["CRM + automatización con IA"] },
  ]);
  return memory.readGraph();
});
```

- **Resolución de comando**: `@modelcontextprotocol/server-memory` viene declarado en `devDependencies`, así que se usa el binario local (handshake en ~200 ms, funciona offline); si el paquete no estuviera presente, se cae automáticamente a `npx -y @modelcontextprotocol/server-memory`.
- **Persistencia**: `MEMORY_FILE_PATH` (por defecto `output/memory/meridian-memory.json`).
- **Sin fugas de credenciales**: solo se hereda el entorno mínimo (`HOME`, `PATH`, `SHELL`, …), nunca `process.env` completo.
- **Sin procesos zombies**: `close()` mata el proceso hijo; `withMemoryClient` lo hace incluso si hay excepción.

`src/mcp/public-servers.ts` expone seis conectores listos para alternar:

| id | Servidor oficial | Cero-config | Credenciales |
| --- | --- | --- | --- |
| `memory` | `@modelcontextprotocol/server-memory` | ✅ | — |
| `fetch` | `uvx mcp-server-fetch` (requiere `uv`) | ✅ | — |
| `everything` | `@modelcontextprotocol/server-everything` | ✅ | — |
| `puppeteer` | `@modelcontextprotocol/server-puppeteer` | ✅ | — |
| `github` | `@modelcontextprotocol/server-github` | ❌ | `GITHUB_PERSONAL_ACCESS_TOKEN` |
| `playwright` | `@playwright/mcp` (Microsoft) | ✅ | — |

```ts
import { withServer } from "./mcp/public-servers.js";

const tools = await withServer("everything", (session) => session.listToolNames());
```

### 3.2 Automatización web: AbortController + Exponential Backoff

`src/automation/playwright-agent.ts` implementa el motor *My Browser*:

- **`AbortController` de extremo a extremo**: `navigate()`, `extract()`, `scrape()`, `evaluate()` aceptan `signal?: AbortSignal`.
  Un aborto corta la operación **al instante** (carrera señal/promesa), cierra la página y no deja procesos de Chromium colgados.
- **Exponential Backoff** (`withRetry`): `delay = base · factor^(n-1)`, acotado por `maxDelayMs` y con *full jitter* opcional.
  Cada intento puede tener su propio `timeoutMs`; los timeouts se reintentan, los abortos del usuario no.
- **Extracción declarativa**: reglas `{ key, selector, attribute, all, fallback }` que devuelven datos tipados más el detalle por campo.
- **Degradación elegante**: si Chromium no está instalado, se lanza `BrowserNotInstalledError` con el comando exacto (`npm run setup:browsers`) en lugar de un stack crudo.

```ts
import { BrowserAgent } from "./automation/playwright-agent.js";

const agent = new BrowserAgent({ retries: 3 });
const controller = new AbortController();
setTimeout(() => controller.abort(), 5_000);           // ⏱️ corta todo a los 5 s

try {
  await agent.navigate("https://example.com", { signal: controller.signal, captureHtml: true });
  const { data } = await agent.extract([
    { key: "titulo", selector: "h1" },
    { key: "enlaces", selector: "a", attribute: "href", all: true },
  ], { signal: controller.signal });
  console.log(data);
} finally {
  await agent.close();                                  // 🧹 sin procesos colgados
}
```

`src/automation/runner.ts` demuestra las tres garantías sin depender de internet:

1. **Scraping declarativo** contra un fixture HTTP efímero servido por el propio sandbox.
2. **Backoff real**: la ruta `/flaky` responde `503` la primera vez y `200` después; se registran los delays.
3. **Aborto real**: la ruta `/slow` tarda 30 s; el `AbortController` la corta en ~250 ms.
4. **Sitio público opcional** (`--live` o `--url=`), tolerante a entornos sin salida a internet.

```bash
npm run test:web                    # demo 100% local
npm run test:web -- --live          # + https://example.com
npm run test:web -- --url=https://meridian.example --strict
```

### 3.3 Medios hiperrealistas (imagen + vídeo)

`src/media/generator.ts` construye el **payload exacto** de cada proveedor y lo documenta, sin gastar un céntimo si no hay claves:

| Proveedor | Tipo | Endpoint real | Variable |
| --- | --- | --- | --- |
| `fal-flux-ultra` | imagen | `https://fal.run/fal-ai/flux-pro/v1.1-ultra` | `FAL_KEY` |
| `replicate-flux-pro` | imagen | `https://api.replicate.com/v1/models/black-forest-labs/flux-1.1-pro/predictions` | `REPLICATE_API_TOKEN` |
| `runway-gen3` | vídeo | `https://api.dev.runwayml.com/v1/text_to_video` | `RUNWAY_API_KEY` |
| `luma-dream-machine` | vídeo | `https://api.lumalabs.ai/dream-machine/v1/generations` | `LUMAAI_API_KEY` |

- **Ingeniería de prompt**: estilos (`documentary-35mm`, `cinematic-anamorphic`, `product-studio`…), lenguaje de cámara (`crane-up`, `dolly-zoom`, `orbit-left`…), negativos anti-artefactos y seeds deterministas por prompt.
- **Modo live** (con clave): petición real con reintentos y cancelación; `429`/`5xx` se reintentan, `4xx` no.
- **Modo simulación** (sin clave): escribe artefactos **reales** en `output/media/`
  — un PNG procedural determinista (`src/media/png.ts`, codificador PNG en Node puro) y/o un storyboard cinemático en Markdown —
  más el `*.manifest.json` con el payload listo para producción.

```bash
npm run test:media
npm run test:media -- --video-only --provider=luma-dream-machine --duration=12 --prompt="ciudad costera al amanecer"
npm run test:media -- --image-only --ratio=21:9 --simulate
```

---

## 4. Inspección de herramientas MCP

```bash
npm run test:tools                                # servidor Memory (cero config)
npm run test:tools -- --server=everything         # 20+ herramientas, 7 recursos, 4 prompts
npm run test:tools -- --server=memory --json      # informe estructurado
```

Salida típica para `memory`:

```text
  create_entities   Create multiple new entities in the knowledge graph…
                    ↳ params: entities:array<object>
  read_graph        Read the entire knowledge graph
  search_nodes      Search for nodes in the knowledge graph based on a query
                    ↳ params: query:string
                    ↳ hints: read-only, idempotente
```

`--json` emite un informe con parámetros, obligatoriedad y *hints* de anotaciones (`readOnlyHint`, `destructiveHint`, `idempotentHint`, `openWorldHint`).

---

## 5. Configuración opcional

Copia `.env.example` a `.env` **solo si** quieres activar el modo live. Nada de esto es obligatorio:

| Variable | Efecto | Por defecto |
| --- | --- | --- |
| `MERIDIAN_MODE` | `live` para forzar el envío real a las APIs | `simulation` |
| `MERIDIAN_LOG_LEVEL` | `debug` · `info` · `step` · `success` · `warn` · `error` | `info` |
| `MERIDIAN_LOG_FORMAT` | `json` para logs estructurados | pretty |
| `MEMORY_FILE_PATH` | Ruta del grafo MCP | `output/memory/meridian-memory.json` |
| `MERIDIAN_HEADLESS` | `false` para ver el navegador | `true` |
| `FAL_KEY` / `REPLICATE_API_TOKEN` | Imágenes FLUX | — |
| `RUNWAY_API_KEY` / `LUMAAI_API_KEY` | Vídeo cinemático | — |
| `GITHUB_PERSONAL_ACCESS_TOKEN` | Conector MCP de GitHub | — |

---

## 6. Artefactos generados

Todo se escribe bajo `output/` (ignorado por git, nunca se sube nada):

```text
output/
├── artifacts/sandbox-readiness-YYYY-MM-DD.json   # informe del arranque
├── memory/meridian-memory.json                   # grafo de conocimiento persistido
├── media/*.png · *.storyboard.md · *.manifest.json
└── screenshots/*.png                             # capturas del motor Playwright
```

---

## 7. Decisiones de ingeniería (y sus garantías)

| Decisión | Motivo |
| --- | --- |
| `npx -y` para el servidor de memoria (con atajo a `node_modules` si existe) | Cero instalación, sin registrar nada; y arranque offline cuando el paquete ya está cacheado. |
| `withRetry` propio en lugar de una librería | Cancelación cooperativa real, timeouts por intento combinables y cero dependencias extra. |
| Carrera señal/promesa en cada intento | Un timeout o un aborto devuelven el control de inmediato aunque la operación subyacente ignore la señal. |
| Entorno mínimo heredado en los procesos hijos | Ninguna credencial del sandbox se filtra a servidores MCP de terceros lanzados con `npx`. |
| Simulación con artefactos reales (PNG/storyboard) | El flujo es verificable sin gastar API y el payload queda listo para producción. |
| Fallos de red como `SKIPPED`/`DEGRADED`, no como excepción | La promesa Zero Config se mantiene en cualquier entorno (CI, contenedor sin red, portátil). |

---

## 8. Roadmap del sandbox

- [ ] Transporte HTTP/SSE además de `stdio` para servidores MCP remotos.
- [ ] Modo `--stream` del runner: extracción incremental con `page.on("response")`.
- [ ] Persistencia opcional del grafo de memoria en SQLite.
- [ ] Adaptador `image-to-video` (Runway/Luma reciben imagen generada por FLUX).
- [ ] Exportar informes de inspección a Markdown para documentación automática.

---

## 9. Publicar como repositorio independiente

Este directorio está diseñado para ser su propio repositorio. Instrucciones exactas en [`docs/PUBLISHING.md`](./docs/PUBLISHING.md):

```bash
cd meridian-mcp-sandbox
git init -b main && git add -A && git commit -m "feat: meridian-mcp-sandbox v1.0.0"
gh repo create christianhola/meridian-mcp-sandbox --public --source=. --remote=origin --push
```

---

## 10. Licencia y marcas

MIT (sujeto a la confirmación de derechos del propietario). Las marcas "Meridian" se rigen por lo indicado en el repositorio principal de Meridian Community. Los servidores MCP referenciados pertenecen a sus respectivos proyectos (Model Context Protocol / Anthropic, Microsoft, fal.ai, Replicate, Runway, Luma) y se invocan vía `npx`/`uvx` sin redistribuir su código.
