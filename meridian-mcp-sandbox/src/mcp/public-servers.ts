/**
 * Conectores preconfigurados para servidores MCP "globales".
 *
 * Cada conector declara:
 *  - cómo se lanza (`command` + `args`, transporte stdio),
 *  - si es cero-configuración o necesita credenciales,
 *  - qué variables de entorno opcionales consume.
 *
 * `connectServer(id)` devuelve una sesión MCP lista para `callTool`/`listTools`,
 * con cierre garantizado y cancelación por `AbortSignal`.
 *
 * Ejemplo:
 * ```ts
 * const session = await connectServer("everything");
 * console.log(await session.listToolNames());
 * await session.close();
 * ```
 */

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport, getDefaultEnvironment } from "@modelcontextprotocol/sdk/client/stdio.js";
import type { StdioServerParameters } from "@modelcontextprotocol/sdk/client/stdio.js";
import { createLogger, type Logger } from "../core/logger.js";
import { withTimeout } from "../core/retry.js";
import { readEnv, SANDBOX_ROOT } from "../core/config.js";

export type ServerId = "memory" | "fetch" | "everything" | "puppeteer" | "github" | "playwright";

export interface McpServerDefinition {
  id: ServerId;
  label: string;
  description: string;
  /** Comando base (npx/uvx). */
  command: string;
  args: string[];
  /** Variables de entorno que el servidor "necesita" para funcionar (opcionales salvo `requiredEnv`). */
  envKeys: string[];
  /** Si tiene valores, el servidor NO arranca sin esas variables. */
  requiredEnv?: string[];
  /** `true` si funciona sin ninguna credencial. */
  zeroConfig: boolean;
  transport: "stdio";
  docs: string;
}

const npx = process.platform === "win32" ? "npx.cmd" : "npx";

/** Catálogo de servidores MCP soportados, listos para alternar con una línea. */
export const PUBLIC_SERVERS: Record<ServerId, McpServerDefinition> = {
  memory: {
    id: "memory",
    label: "Memory (grafo de conocimiento persistente)",
    description: "Servidor oficial de memoria: entidades, relaciones y observaciones persistidas en JSON.",
    command: npx,
    args: ["-y", "@modelcontextprotocol/server-memory"],
    envKeys: ["MEMORY_FILE_PATH"],
    zeroConfig: true,
    transport: "stdio",
    docs: "https://github.com/modelcontextprotocol/servers/tree/main/src/memory",
  },
  fetch: {
    id: "fetch",
    label: "Fetch (HTTP -> Markdown para LLMs)",
    description: "Servidor oficial en Python: descarga URLs y las convierte a Markdown limpio. Requiere `uv` instalado.",
    command: "uvx",
    args: ["mcp-server-fetch"],
    envKeys: [],
    zeroConfig: true,
    transport: "stdio",
    docs: "https://github.com/modelcontextprotocol/servers/tree/main/src/fetch",
  },
  everything: {
    id: "everything",
    label: "Everything (servidor de referencia completo)",
    description: "Ejercita TODAS las capacidades MCP: tools, resources, prompts, sampling, elicitation y logging. Ideal para pruebas de conformidad.",
    command: npx,
    args: ["-y", "@modelcontextprotocol/server-everything"],
    envKeys: [],
    zeroConfig: true,
    transport: "stdio",
    docs: "https://github.com/modelcontextprotocol/servers/tree/main/src/everything",
  },
  puppeteer: {
    id: "puppeteer",
    label: "Puppeteer (automatización de navegador)",
    description: "Navegación, screenshots y ejecución de JS arbitrario con Puppeteer. Alternativa a nuestro motor Playwright.",
    command: npx,
    args: ["-y", "@modelcontextprotocol/server-puppeteer"],
    envKeys: ["PUPPETEER_LAUNCH_OPTIONS", "ALLOW_DANGEROUS"],
    zeroConfig: true,
    transport: "stdio",
    docs: "https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer",
  },
  github: {
    id: "github",
    label: "GitHub (repos, issues, PRs, code search)",
    description: "Gestiona repositorios, issues, pull requests y búsquedas de código. REQUIERE token personal.",
    command: npx,
    args: ["-y", "@modelcontextprotocol/server-github"],
    envKeys: ["GITHUB_PERSONAL_ACCESS_TOKEN"],
    requiredEnv: ["GITHUB_PERSONAL_ACCESS_TOKEN"],
    zeroConfig: false,
    transport: "stdio",
    docs: "https://github.com/modelcontextprotocol/servers/tree/main/src/github",
  },
  playwright: {
    id: "playwright",
    label: "Playwright MCP (navegador accesible por agentes)",
    description: "Servidor oficial de Playwright: controla el navegador mediante snapshots de accesibilidad. Cero configuración.",
    command: npx,
    args: ["-y", "@playwright/mcp@latest"],
    envKeys: [
      "PLAYWRIGHT_BROWSERS_PATH",
      "PLAYWRIGHT_MCP_HEADLESS",
      "PLAYWRIGHT_MCP_BROWSER",
      "PLAYWRIGHT_MCP_DEVICE",
      "PLAYWRIGHT_MCP_OUTPUT_DIR",
    ],
    zeroConfig: true,
    transport: "stdio",
    docs: "https://github.com/microsoft/playwright-mcp",
  },
};

export function listServers(): McpServerDefinition[] {
  return Object.values(PUBLIC_SERVERS);
}

export function getServer(id: ServerId): McpServerDefinition {
  const definition = PUBLIC_SERVERS[id];
  if (!definition) {
    throw new Error(`Servidor MCP desconocido: "${id}". Disponibles: ${Object.keys(PUBLIC_SERVERS).join(", ")}`);
  }
  return definition;
}

/** Variables de entorno relevantes que están presentes ahora mismo. */
export function detectEnv(definition: McpServerDefinition): Record<string, string> {
  const present: Record<string, string> = {};
  for (const key of definition.envKeys) {
    const value = readEnv(key);
    if (value) present[key] = value.length > 12 ? `${value.slice(0, 6)}…${value.slice(-4)}` : "•••";
  }
  return present;
}

export function isServerReady(definition: McpServerDefinition): boolean {
  return (definition.requiredEnv ?? []).every((key) => Boolean(readEnv(key)));
}

export interface ResolveOptions {
  /** Directorio de trabajo del proceso hijo. */
  cwd?: string;
  /** Variables extra (se suman al entorno mínimo heredado). */
  env?: Record<string, string>;
}

/**
 * Construye los parámetros del proceso hijo.
 * Importante: pasamos solo el entorno mínimo heredado + lo explícito, nunca `process.env` completo,
 * para que ninguna credencial acabe dentro de un `npx` de terceros.
 */
export function resolveServerParameters(id: ServerId, options: ResolveOptions = {}): StdioServerParameters {
  const definition = getServer(id);
  if (!isServerReady(definition)) {
    throw new Error(
      `El servidor MCP "${id}" requiere ${definition.requiredEnv!.join(", ")}. ` +
        `Cópialo a .env (ver .env.example) o ejecuta con otro conector.`,
    );
  }
  return {
    command: definition.command,
    args: definition.args,
    env: { ...getDefaultEnvironment(), ...(options.env ?? {}) },
    cwd: options.cwd ?? SANDBOX_ROOT,
    stderr: "pipe",
  };
}

/** Convierte errores de proceso (ENOENT/EACCES) en instrucciones accionables. */
function explainRuntimeError(definition: McpServerDefinition, error: unknown): Error {
  const candidate = error as { code?: string; message?: string };
  if (candidate?.code === "ENOENT") {
    const runtime = definition.command.replace(/\.cmd$/, "");
    const install =
      runtime === "uvx"
        ? "Instala uv (incluye uvx): https://docs.astral.sh/uv/getting-started/installation/"
        : runtime === "npx"
          ? "Asegúrate de tener Node.js >= 20 con npm en el PATH."
          : `Instala el ejecutable "${runtime}" y vuelve a intentarlo.`;
    return new Error(`No se encontró el ejecutable "${runtime}" para el servidor MCP "${definition.id}". ${install}`);
  }
  if (candidate?.code === "EACCES") {
    return new Error(`Sin permisos de ejecución para "${definition.command}" (servidor MCP "${definition.id}").`);
  }
  return error instanceof Error ? error : new Error(String(error));
}

export interface McpServerSessionOptions extends ResolveOptions {
  clientName?: string;
  connectTimeoutMs?: number;
  callTimeoutMs?: number;
  /** Timeout por intento para la petición de handshake. */
  logger?: Logger;
}

/**
 * Sesión MCP de corta vida contra un servidor público.
 * `close()` está garantizado incluso si el handshake falla.
 */
export class McpServerSession {
  private client?: Client;
  private transport?: StdioClientTransport;
  private constructor(
    readonly definition: McpServerDefinition,
    private readonly options: McpServerSessionOptions,
    private readonly logger: Logger,
  ) {}

  static async open(id: ServerId, options: McpServerSessionOptions = {}): Promise<McpServerSession> {
    const definition = getServer(id);
    const logger = (options.logger ?? createLogger("mcp:public")).child(`mcp:${id}`);
    const session = new McpServerSession(definition, options, logger);
    await session.start();
    return session;
  }

  private async start(): Promise<void> {
    const params = resolveServerParameters(this.definition.id, this.options);
    const commandLine = [params.command, ...(params.args ?? [])].join(" ");
    this.logger.info("lanzando servidor MCP", { command: commandLine, zeroConfig: this.definition.zeroConfig });

    const transport = new StdioClientTransport(params);
    this.transport = transport;
    const stderr = transport.stderr;
    if (stderr && "on" in stderr) {
      (stderr as unknown as NodeJS.ReadableStream).on("data", (chunk: Buffer | string) => {
        const text = String(chunk).trim();
        if (text) this.logger.debug("stderr", { line: text.slice(0, 200) });
      });
    }

    const client = new Client(
      { name: this.options.clientName ?? "meridian-mcp-sandbox", version: "1.0.0" },
      { capabilities: {} },
    );

    try {
      await withTimeout(
        async () => {
          await client.connect(transport);
          return true;
        },
        this.options.connectTimeoutMs ?? 60_000,
        `initialize ${this.definition.id}`,
      );
    } catch (error) {
      await transport.close().catch(() => undefined);
      throw explainRuntimeError(this.definition, error);
    }

    this.client = client;
    const version = client.getServerVersion();
    this.logger.success("servidor MCP conectado", {
      server: `${version?.name ?? this.definition.id}@${version?.version ?? "?"}`,
      pid: transport.pid ?? null,
    });
  }

  private require(): Client {
    if (!this.client) throw new Error(`La sesión MCP "${this.definition.id}" está cerrada.`);
    return this.client;
  }

  async listTools(): Promise<Array<{ name: string; title?: string; description?: string; inputSchema?: unknown; annotations?: unknown }>> {
    const response = await this.require().listTools(undefined, { timeout: this.options.callTimeoutMs ?? 30_000 });
    return response.tools as Array<{ name: string; title?: string; description?: string; inputSchema?: unknown }>;
  }

  async listToolNames(): Promise<string[]> {
    return (await this.listTools()).map((tool) => tool.name);
  }

  async callTool<T = unknown>(name: string, args: Record<string, unknown> = {}): Promise<T> {
    const result = await this.require().callTool({ name, arguments: args }, undefined, {
      timeout: this.options.callTimeoutMs ?? 60_000,
    });
    return result as T;
  }

  async listResources(): Promise<Array<{ uri: string; name?: string; mimeType?: string }>> {
    const response = await this.require().listResources(undefined, { timeout: this.options.callTimeoutMs ?? 30_000 });
    return response.resources as Array<{ uri: string; name?: string; mimeType?: string }>;
  }

  async listPrompts(): Promise<Array<{ name: string; description?: string }>> {
    const response = await this.require().listPrompts(undefined, { timeout: this.options.callTimeoutMs ?? 30_000 });
    return response.prompts as Array<{ name: string; description?: string }>;
  }

  async close(): Promise<void> {
    const transport = this.transport;
    this.client = undefined;
    this.transport = undefined;
    if (!transport) return;
    await transport.close().catch((error: unknown) => {
      this.logger.warn("cierre del transporte MCP con incidencias", { error });
    });
  }

  async [Symbol.asyncDispose](): Promise<void> {
    await this.close();
  }
}

/** Helper de una línea: abre, usa y cierra. */
export async function withServer<T>(
  id: ServerId,
  fn: (session: McpServerSession) => Promise<T>,
  options: McpServerSessionOptions = {},
): Promise<T> {
  const session = await McpServerSession.open(id, options);
  try {
    return await fn(session);
  } finally {
    await session.close();
  }
}

export interface ServerMatrixRow {
  id: ServerId;
  label: string;
  zeroConfig: boolean;
  ready: boolean;
  env: Record<string, string>;
  command: string;
}

/** Matriz de disponibilidad para reportes y CLI. */
export function readinessMatrix(): ServerMatrixRow[] {
  return listServers().map((definition) => ({
    id: definition.id,
    label: definition.label,
    zeroConfig: definition.zeroConfig,
    ready: isServerReady(definition),
    env: detectEnv(definition),
    command: [definition.command, ...definition.args].join(" "),
  }));
}
