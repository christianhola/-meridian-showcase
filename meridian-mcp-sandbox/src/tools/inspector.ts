/**
 * Inspector de servidores MCP.
 *
 * Descubre y documenta lo que expone cualquier servidor MCP: herramientas
 * (con su JSON Schema), recursos y prompts. Sirve tanto de librería
 * (`inspectServer`) como de CLI:
 *
 *   npm run test:tools                       # inspecciona el servidor Memory (cero config)
 *   npm run test:tools -- --server=everything
 *   npm run test:tools -- --server=github --json
 */

import { createLogger, type Logger, ANSI, colorize } from "../core/logger.js";
import { McpServerSession, PUBLIC_SERVERS, getServer, listServers, readinessMatrix, type ServerId } from "../mcp/public-servers.js";
import { MemoryClient } from "../mcp/memory-client.js";
import { hasFlag, parseFlags, type CliFlags } from "../core/config.js";
import { toError } from "../core/retry.js";

export interface ToolParameter {
  name: string;
  type: string;
  required: boolean;
  description?: string;
}

export interface ToolSummary {
  name: string;
  title?: string;
  description: string;
  parameters: ToolParameter[];
  required: string[];
  readOnly?: boolean;
  destructive?: boolean;
  idempotent?: boolean;
  openWorld?: boolean;
  hasOutputSchema: boolean;
}

export interface InspectionReport {
  serverId: ServerId;
  label: string;
  zeroConfig: boolean;
  serverName: string;
  serverVersion: string;
  protocolVersion: string;
  pid: number | null;
  commandLine: string;
  durationMs: number;
  tools: ToolSummary[];
  resources: Array<{ uri: string; name?: string; mimeType?: string }>;
  prompts: Array<{ name: string; description?: string }>;
  warnings: string[];
}

interface JsonSchemaLike {
  type?: string;
  properties?: Record<string, { type?: string; description?: string; enum?: unknown[]; items?: { type?: string } }>;
  required?: string[];
}

const MAX_DESCRIPTION = 118;

function truncate(text: string, max = MAX_DESCRIPTION): string {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max - 1)}…` : clean;
}

/** Convierte el JSON Schema de entrada de una herramienta MCP en algo legible. */
export function summarizeTool(tool: {
  name: string;
  title?: string;
  description?: string;
  inputSchema?: unknown;
  annotations?: unknown;
  outputSchema?: unknown;
}): ToolSummary {
  const schema = (tool.inputSchema ?? {}) as JsonSchemaLike;
  const required = Array.isArray(schema.required) ? schema.required : [];
  const parameters: ToolParameter[] = Object.entries(schema.properties ?? {}).map(([name, property]) => ({
    name,
    type: property.items?.type ? `array<${property.items.type}>` : property.enum ? `enum(${property.enum.length})` : property.type ?? "unknown",
    required: required.includes(name),
    description: property.description ? truncate(property.description, 70) : undefined,
  }));

  const annotations = (tool.annotations ?? {}) as Record<string, unknown>;
  return {
    name: tool.name,
    title: typeof tool.title === "string" ? tool.title : undefined,
    description: truncate(tool.description ?? "(sin descripción)"),
    parameters,
    required,
    readOnly: typeof annotations["readOnlyHint"] === "boolean" ? (annotations["readOnlyHint"] as boolean) : undefined,
    destructive: typeof annotations["destructiveHint"] === "boolean" ? (annotations["destructiveHint"] as boolean) : undefined,
    idempotent: typeof annotations["idempotentHint"] === "boolean" ? (annotations["idempotentHint"] as boolean) : undefined,
    openWorld: typeof annotations["openWorldHint"] === "boolean" ? (annotations["openWorldHint"] as boolean) : undefined,
    hasOutputSchema: Boolean(tool.outputSchema),
  };
}

export function summarizeTools(
  tools: Array<{ name: string; title?: string; description?: string; inputSchema?: unknown; annotations?: unknown; outputSchema?: unknown }>,
): ToolSummary[] {
  return tools.map(summarizeTool);
}

export function renderToolTable(summaries: ToolSummary[]): string {
  if (summaries.length === 0) return "  (el servidor no expone herramientas)";
  const width = Math.max(...summaries.map((summary) => summary.name.length), 12);
  const lines: string[] = [];
  for (const summary of summaries) {
    const flags: string[] = [];
    if (summary.readOnly) flags.push("read-only");
    if (summary.destructive) flags.push("destructivo");
    if (summary.idempotent) flags.push("idempotente");
    if (summary.openWorld) flags.push("open-world");
    lines.push(`  ${summary.name.padEnd(width)}  ${summary.description}`);
    if (summary.parameters.length > 0) {
      const params = summary.parameters
        .map((parameter) => `${parameter.name}${parameter.required ? "" : "?"}:${parameter.type}`)
        .join(", ");
      lines.push(`  ${" ".repeat(width)}  ↳ params: ${colorize(params, ANSI.gray)}`);
    }
    if (flags.length > 0) {
      lines.push(`  ${" ".repeat(width)}  ↳ hints: ${colorize(flags.join(", "), ANSI.dim)}`);
    }
  }
  return lines.join("\n");
}

/** Inspecciona un servidor MCP: handshake + tools + resources + prompts. */
export async function inspectServer(
  id: ServerId = "memory",
  options: { logger?: Logger; connectTimeoutMs?: number; callTimeoutMs?: number } = {},
): Promise<InspectionReport> {
  const logger = (options.logger ?? createLogger("tools:inspector")).child(`tools:${id}`);
  const definition = getServer(id);
  const startedAt = Date.now();
  const warnings: string[] = [];

  if (id === "memory") {
    // El servidor de memoria usa nuestro cliente cero-configuración dedicado.
    const client = new MemoryClient({
      logger,
      connectTimeoutMs: options.connectTimeoutMs,
      callTimeoutMs: options.callTimeoutMs,
    });
    try {
      const info = await client.connect();
      const tools = summarizeTools(await client.listTools());
      const resources = await client.listResources().catch(() => {
        warnings.push("El servidor Memory no expone `resources` (comportamiento esperado: solo publica herramientas).");
        return [];
      });

      return {
        serverId: id,
        label: definition.label,
        zeroConfig: definition.zeroConfig,
        serverName: info.serverName,
        serverVersion: info.serverVersion,
        protocolVersion: info.protocolVersion,
        pid: info.pid,
        commandLine: info.commandLine,
        durationMs: Date.now() - startedAt,
        tools,
        resources,
        prompts: [],
        warnings,
      };
    } finally {
      await client.close();
    }
  }

  const session = await McpServerSession.open(id, { logger, connectTimeoutMs: options.connectTimeoutMs, callTimeoutMs: options.callTimeoutMs });
  try {
    const tools = summarizeTools(await session.listTools());
    const resources = await session
      .listResources()
      .catch(() => {
        warnings.push("El servidor no implementa `resources/list`.");
        return [];
      });
    const prompts = await session
      .listPrompts()
      .catch(() => {
        warnings.push("El servidor no implementa `prompts/list`.");
        return [];
      });

    return {
      serverId: id,
      label: definition.label,
      zeroConfig: definition.zeroConfig,
      serverName: definition.id,
      serverVersion: "desconocida",
      protocolVersion: "negociado",
      pid: null,
      commandLine: [definition.command, ...definition.args].join(" "),
      durationMs: Date.now() - startedAt,
      tools,
      resources,
      prompts,
      warnings,
    };
  } finally {
    await session.close();
  }
}

export function renderInspection(report: InspectionReport): string {
  const lines: string[] = [];
  lines.push("");
  lines.push(colorize(`MCP Inspector · ${report.label}`, ANSI.cyan, ANSI.bold));
  lines.push(`  servidor      ${report.serverName} v${report.serverVersion} (protocolo SDK ${report.protocolVersion})`);
  lines.push(`  transporte    stdio · ${report.commandLine}`);
  lines.push(`  cero-config   ${report.zeroConfig ? "sí" : "no (requiere credenciales)"}`);
  lines.push(`  handshake     ${report.durationMs}ms${report.pid ? ` · pid ${report.pid}` : ""}`);
  lines.push("");
  lines.push(`  HERRAMIENTAS (${report.tools.length})`);
  lines.push(renderToolTable(report.tools));
  lines.push("");
  lines.push(`  RECURSOS (${report.resources.length})`);
  lines.push(
    report.resources.length === 0
      ? colorize("  (ninguno)", ANSI.gray)
      : report.resources.map((resource) => `  ${resource.uri}  ${resource.name ?? ""}`).join("\n"),
  );
  lines.push("");
  lines.push(`  PROMPTS (${report.prompts.length})`);
  lines.push(
    report.prompts.length === 0
      ? colorize("  (ninguno)", ANSI.gray)
      : report.prompts.map((prompt) => `  ${prompt.name}  ${truncate(prompt.description ?? "", 60)}`).join("\n"),
  );
  if (report.warnings.length > 0) {
    lines.push("");
    lines.push(`  AVISOS`);
    lines.push(...report.warnings.map((warning) => colorize(`  • ${warning}`, ANSI.yellow)));
  }
  return lines.join("\n");
}

/** Matriz legible de todos los conectores soportados. */
export function renderServerMatrix(): string {
  const rows = readinessMatrix();
  const width = Math.max(...rows.map((row) => row.id.length), 10);
  const lines = rows.map((row) => {
    const badge = row.ready
      ? row.zeroConfig
        ? colorize("● cero-config", ANSI.green)
        : colorize("● credenciales OK", ANSI.green)
      : colorize("○ falta credencial", ANSI.yellow);
    const env = Object.entries(row.env)
      .map(([key, value]) => `${key}=${value}`)
      .join(",");
    return `  ${row.id.padEnd(width)}  ${badge}  ${row.command}${env ? colorize(`  [${env}]`, ANSI.dim) : ""}`;
  });
  return [`  Conectores MCP soportados (${rows.length})`, ...lines].join("\n");
}

async function main(): Promise<void> {
  const flags: CliFlags = parseFlags();
  const serverId = (typeof flags["server"] === "string" ? (flags["server"] as string) : "memory") as ServerId;
  const logger = createLogger("tools:inspector");

  if (!PUBLIC_SERVERS[serverId]) {
    logger.error("servidor desconocido", { server: serverId, disponibles: listServers().map((server) => server.id).join(", ") });
    process.exitCode = 1;
    return;
  }

  process.stdout.write(`\n${renderServerMatrix()}\n`);

  try {
    const report = await inspectServer(serverId, { logger });
    if (hasFlag(flags, "json")) {
      process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    } else {
      process.stdout.write(`${renderInspection(report)}\n`);
    }
  } catch (error) {
    const message = toError(error).message;
    // La falta de credenciales o de runtime no debe romper el sandbox.
    logger.warn("inspección no completada (el sandbox sigue operativo)", { server: serverId, motivo: message.slice(0, 180) });
    process.exitCode = hasFlag(flags, "strict") ? 1 : 0;
  }
}

const invokedDirectly = process.argv[1] ? /inspector\.(ts|js|mjs)$/.test(process.argv[1]) : false;
if (invokedDirectly) {
  await main();
}
