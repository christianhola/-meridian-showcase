/**
 * MERIDIAN MCP SANDBOX — Entry point principal.
 *
 * `npm run dev` ejecuta, sin claves ni configuración previa:
 *   1. Handshake con el servidor MCP local de memoria (`npx -y @modelcontextprotocol/server-memory`).
 *   2. Descubrimiento de herramientas expuestas por el servidor (inspector).
 *   3. Escritura real en el grafo de conocimiento (entidades + relaciones + observaciones).
 *   4. Lectura y búsqueda de vuelta para verificar la persistencia.
 *   5. Matriz de capacidades: MCP, automatización web y medios hiperrealistas.
 *   6. Estado final "READY" del sandbox.
 *
 * Si el entorno no tiene red (no puede resolverse `npx`), el sandbox NO falla:
 * degrada a modo local y reporta exactamente qué falta.
 */

import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { createLogger, ANSI, colorize } from "./core/logger.js";
import { MemoryClient, MEMORY_PACKAGE, type EntityInput, type KnowledgeGraph, type RelationInput } from "./mcp/memory-client.js";
import { readinessMatrix } from "./mcp/public-servers.js";
import { inspectServer, renderInspection, renderServerMatrix, summarizeTools, type InspectionReport, type ToolSummary } from "./tools/inspector.js";
import { providerMatrix } from "./media/generator.js";
import { GrowthBot, PitchCoachBot, TechArchitectBot, simulateTraction } from "./startup-school/index.js";
import { detectBrowserAvailability, ensureDir, hasFlag, parseFlags, readEnv, runtimeInfo, DEFAULT_ARTIFACT_DIR } from "./core/config.js";
import { isAbortError, toError } from "./core/retry.js";

const logger = createLogger("meridian");

const SANDBOX_ENTITIES: EntityInput[] = [
  {
    name: "Meridian MCP Sandbox",
    entityType: "proyecto",
    observations: [
      "Repositorio playground independiente, ejecutable con `npm run dev` sin configuración.",
      "Conecta el servidor MCP oficial de memoria mediante StdioClientTransport.",
      "Incluye motor Playwright resiliente con AbortController y exponential backoff.",
      "Incluye generador de medios hiperrealistas con fallback de simulación si no hay API Key.",
    ],
  },
  {
    name: "MCP (Model Context Protocol)",
    entityType: "protocolo",
    observations: [
      "Protocolo abierto de Anthropic para conectar modelos con herramientas y datos.",
      "SDK oficial de TypeScript: @modelcontextprotocol/sdk.",
      "Transporte usado en este sandbox: stdio (JSON-RPC sobre stdin/stdout).",
    ],
  },
  {
    name: "Playwright",
    entityType: "tecnología",
    observations: [
      "Automatización de navegador cross-browser mantenida por Microsoft.",
      "Soporta AbortSignal nativo en operaciones de página desde 1.4x.",
      "Usado aquí para navegación resilientemente reintentada y scraping declarativo.",
    ],
  },
  {
    name: "FLUX / Runway / Luma",
    entityType: "proveedores-de-medios",
    observations: [
      "FLUX (fal.ai, Replicate) para imágenes fotorrealistas de alta fidelidad.",
      "Runway Gen-3 y Luma Dream Machine para vídeo cinemático texto-a-vídeo.",
      "El sandbox construye el payload exacto y solo envía si existe API Key.",
    ],
  },
];

const SANDBOX_RELATIONS: RelationInput[] = [
  { from: "Meridian MCP Sandbox", to: "MCP (Model Context Protocol)", relationType: "implementa" },
  { from: "Meridian MCP Sandbox", to: "Playwright", relationType: "usa" },
  { from: "Playwright", to: "MCP (Model Context Protocol)", relationType: "se-expone-como-servidor" },
  { from: "Meridian MCP Sandbox", to: "FLUX / Runway / Luma", relationType: "integra" },
];

function rule(width = 74): string {
  return colorize("─".repeat(width), ANSI.gray);
}

function heading(text: string): string {
  return `${colorize("▌", ANSI.magenta)} ${colorize(text, ANSI.bold)}`;
}

function banner(): void {
  const lines = [
    "",
    colorize("  ███  MERIDIAN · MCP SANDBOX", ANSI.cyan, ANSI.bold),
    colorize("  Playground ejecutable: MCP + Playwright + medios hiperrealistas", ANSI.gray),
    colorize("  Zero Config · Zero ENV obligatorio · npm run dev", ANSI.gray),
    "",
  ];
  process.stdout.write(lines.join("\n"));
}

function table(rows: Array<[string, string, string?]>): string {
  const width = Math.max(...rows.map(([label]) => label.length));
  return rows
    .map(([label, value, color]) => `  ${label.padEnd(width)}  ${color ? colorize(value, color) : value}`)
    .join("\n");
}

interface StepResult {
  name: string;
  status: "ok" | "warn" | "skipped";
  detail: string;
  ms: number;
}

export interface SandboxReport {
  status: "READY" | "READY_WITH_SETUP" | "DEGRADED";
  steps: StepResult[];
  graph: KnowledgeGraph;
  inspection?: InspectionReport;
  tools: ToolSummary[];
  artifactPath?: string;
}

async function main(): Promise<void> {
  const flags = parseFlags();
  const info = runtimeInfo(flags);
  banner();

  const steps: StepResult[] = [];
  const memory = new MemoryClient();
  let inspection: InspectionReport | undefined;
  let memoryFilePath: string | undefined;
  let graph: KnowledgeGraph = { entities: [], relations: [] };
  let tools: ToolSummary[] = [];

  const record = async (name: string, fn: () => Promise<{ status: StepResult["status"]; detail: string }>): Promise<void> => {
    const startedAt = Date.now();
    try {
      const { status, detail } = await fn();
      steps.push({ name, status, detail, ms: Date.now() - startedAt });
      logger.success(`✔ ${name}`, { ms: Date.now() - startedAt });
    } catch (error) {
      const detail = toError(error).message;
      steps.push({ name, status: "warn", detail, ms: Date.now() - startedAt });
      logger.warn(`• ${name} (degradado)`, { motivo: detail.slice(0, 200) });
    }
  };

  // ── 0. Entorno ───────────────────────────────────────────────────────────
  process.stdout.write(`${heading("Entorno")}\n`);
  process.stdout.write(
    `${table([
      ["node", `${info.nodeVersion} (${info.platform}/${info.arch})`],
      ["sandbox", info.sandboxRoot],
      [".env", info.envFile.loaded ? `cargado desde ${info.envFile.path}` : "ausente (opcional, no requerido)"],
      ["modo", readEnv("MERIDIAN_MODE") ?? "simulation (por defecto)"],
    ])}\n\n`,
  );

  // ── 1..4: ciclo MCP completo ─────────────────────────────────────────────
  process.stdout.write(`${heading("1) Prueba MCP: memoria local cero-configuración")}\n`);

  await record("Handshake MCP (initialize + tools/list)", async () => {
    const connection = await memory.connect();
    memoryFilePath = connection.memoryFilePath;
    tools = summarizeTools(await memory.listTools());
    return {
      status: "ok",
      detail: `${connection.serverName} v${connection.serverVersion} · ${tools.length} herramientas · pid ${connection.pid} · ${connection.protocolVersion}`,
    };
  });

  await record("Escritura en el grafo de conocimiento", async () => {
    await memory.createEntities(SANDBOX_ENTITIES);
    await memory.createRelations(SANDBOX_RELATIONS);
    await memory.addObservations([
      {
        entityName: "Meridian MCP Sandbox",
        contents: [`Verificado por el arranque automático el ${new Date().toISOString()}`],
      },
    ]);
    return {
      status: "ok",
      detail: `${SANDBOX_ENTITIES.length} entidades · ${SANDBOX_RELATIONS.length} relaciones · 1 observación añadida`,
    };
  });

  await record("Lectura y búsqueda del grafo", async () => {
    graph = await memory.readGraph();
    const search = await memory.searchNodes("MCP");
    return {
      status: "ok",
      detail: `read_graph: ${graph.entities.length} entidades / ${graph.relations.length} relaciones · search_nodes("MCP"): ${search.entities.length} coincidencias`,
    };
  });

  // ── 5. Descubrimiento de herramientas ────────────────────────────────────
  process.stdout.write(`\n${heading("2) Herramientas expuestas por el servidor MCP")}\n`);
  await record("Inspección de herramientas (tools/list + JSON Schema)", async () => {
    inspection = await inspectServer("memory", { logger });
    tools = inspection.tools;
    return {
      status: "ok",
      detail: `${inspection.tools.length} herramientas documentadas en ${inspection.durationMs}ms`,
    };
  });

  if (inspection) {
    process.stdout.write(`${renderInspection(inspection)}\n`);
  } else if (tools.length > 0) {
    process.stdout.write(
      `\n  ${tools
        .map((tool) => tool.name)
        .join(", ")}\n`,
    );
  }

  await memory.close();

  // ── 6. Datos descubiertos ────────────────────────────────────────────────
  process.stdout.write(`\n${heading("3) Conocimiento persistido (datos descubiertos)")}\n`);
  if (graph.entities.length === 0) {
    process.stdout.write(colorize("  (el grafo está vacío: la persistencia se reintentará en el próximo arranque)\n", ANSI.yellow));
  } else {
    for (const entity of graph.entities) {
      process.stdout.write(`  ${colorize(entity.name, ANSI.cyan)} ${colorize(`[${entity.entityType}]`, ANSI.dim)}\n`);
      for (const observation of entity.observations.slice(0, 3)) {
        process.stdout.write(`      · ${observation}\n`);
      }
    }
    process.stdout.write(`\n  Relaciones:\n`);
    for (const relation of graph.relations) {
      process.stdout.write(`      ${relation.from} ${colorize(`--${relation.relationType}-->`, ANSI.magenta)} ${relation.to}\n`);
    }
  }

  // ── 7. Matriz de capacidades ─────────────────────────────────────────────
  process.stdout.write(`\n${heading("4) Capacidades del sandbox")}\n`);
  const browsers = detectBrowserAvailability();
  const providers = providerMatrix();
  const liveProviders = providers.filter((provider) => provider.configured);
  const startupSchool = {
    pitch: new PitchCoachBot().evaluateIdea({
      name: "Meridian FounderOS",
      problem: "Los fundadores pierden tiempo saltando entre investigación, decisiones y herramientas desconectadas.",
      solution: "Un decision loop con mentores locales y conectores MCP con permisos explícitos.",
      targetAudience: "Fundadores y equipos pequeños que necesitan validar y ejecutar con menos fricción.",
      evidence: ["MCP sandbox local con pruebas deterministas"],
      businessModel: "Suscripción por workspace con conectores opcionales.",
    }),
    architecture: new TechArchitectBot().advise({
      product: "Meridian FounderOS",
      users: "fundadores y equipos pequeños",
      coreWorkflow: "investigar, decidir, ejecutar y verificar",
      sensitivity: "internal",
    }),
    growth: new GrowthBot().plan({ product: "Meridian FounderOS", audience: "fundadores", goal: "activation" }),
    traction: simulateTraction({ visitors: 1000, activationRate: 0.35, retentionRate: 0.45, conversionRate: 0.08, months: 6 }),
  };

  process.stdout.write(
    `${table([
      ["MCP Core", `● ${tools.length} herramientas`, ANSI.green],
      ["Memoria MCP", memoryFilePath ? `● ${MEMORY_PACKAGE}` : "○ degradada (sin red para npx)", memoryFilePath ? ANSI.green : ANSI.yellow],
      [
        "Automatización web",
        browsers.installed ? `● Chromium detectado (${browsers.detected.length})` : `○ setup: ${browsers.hint}`,
        browsers.installed ? ANSI.green : ANSI.yellow,
      ],
      [
        "Medios hiperrealistas",
        `${liveProviders.length}/${providers.length} proveedores live · ${providers.length - liveProviders.length} en simulación`,
        liveProviders.length > 0 ? ANSI.green : ANSI.cyan,
      ],
    ])}\n`,
  );

  process.stdout.write(`\n${renderServerMatrix()}\n`);

  // ── 8. Informe persistido ────────────────────────────────────────────────
  const artifactDir = ensureDir(DEFAULT_ARTIFACT_DIR);
  const artifactPath = join(artifactDir, `sandbox-readiness-${new Date().toISOString().slice(0, 10)}.json`);
  const status: SandboxReport["status"] = steps.some((step) => step.status === "warn")
    ? "DEGRADED"
    : browsers.installed
      ? "READY"
      : "READY_WITH_SETUP";

  const report: SandboxReport = { status, steps, graph, inspection, tools, artifactPath };
  await writeFile(
    artifactPath,
    JSON.stringify(
      {
        ...report,
        generatedAt: new Date().toISOString(),
        status,
        runtime: {
          node: info.nodeVersion,
          platform: info.platform,
          arch: info.arch,
          sandboxRoot: info.sandboxRoot,
          envLoaded: info.envFile.loaded,
        },
        steps,
        mcp: {
          server: inspection
            ? {
                name: inspection.serverName,
                version: inspection.serverVersion,
                protocolVersion: inspection.protocolVersion,
                commandLine: inspection.commandLine,
                memoryFilePath: memoryFilePath ?? null,
              }
            : null,
          tools: inspection?.tools ?? tools,
          graph,
        },
        capabilities: {
          browsers,
          mediaProviders: providers,
          mcpServers: readinessMatrix(),
          startupSchool,
        },
      },
      null,
      2,
    ),
    "utf8",
  );

  // ── 9. Estado final ──────────────────────────────────────────────────────
  process.stdout.write(`\n${rule()}\n`);
  process.stdout.write(`${heading("Estado del sandbox")}\n\n`);
  for (const step of steps) {
    const mark = step.status === "ok" ? colorize("✔", ANSI.green) : colorize("•", ANSI.yellow);
    process.stdout.write(`  ${mark} ${step.name.padEnd(52)} ${colorize(`${step.ms}ms`, ANSI.gray)}\n`);
  }
  process.stdout.write(`\n  informe: ${artifactPath}\n`);
  process.stdout.write(`  grafo:   ${memoryFilePath ?? process.env.MEMORY_FILE_PATH ?? "(ver manifiesto)"}\n`);

  process.stdout.write(`\n${rule()}\n`);
  const badge =
    status === "READY"
      ? colorize("  MERIDIAN MCP SANDBOX · READY  ", ANSI.green + ANSI.bold)
      : status === "READY_WITH_SETUP"
        ? colorize("  READY (con setup opcional pendiente)  ", ANSI.cyan + ANSI.bold)
        : colorize("  DEGRADED (revisa los pasos marcados)  ", ANSI.yellow + ANSI.bold);
  process.stdout.write(`${badge}\n`);
  process.stdout.write(`  Siguientes pasos:\n`);
  process.stdout.write(`    npm run test:web      → automatización Playwright (My Browser)\n`);
  process.stdout.write(`    npm run test:media    → activos hiperrealistas (imagen + vídeo)\n`);
  process.stdout.write(`    npm run test:tools -- --server=everything   → inspeccionar otro MCP\n`);
  process.stdout.write(`${rule()}\n\n`);

  if (hasFlag(flags, "strict") && status !== "READY") process.exitCode = 1;
}

try {
  await main();
} catch (error) {
  if (isAbortError(error)) {
    logger.warn("ejecución cancelada", { motivo: toError(error).message });
  } else {
    logger.error("arranque del sandbox fallido", { error });
    process.exitCode = 1;
  }
}
