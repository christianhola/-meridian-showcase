/**
 * Cliente MCP local CERO CONFIGURACIÓN para `@modelcontextprotocol/server-memory`.
 *
 * ¿Por qué `npx -y`? Porque el requisito es Plug & Play: no hay que instalar ni
 * registrar nada en el proyecto. Si el paquete ya está resuelto en `node_modules`
 * usamos ese binario (arranque más rápido y funciona offline); si no, caemos a
 * `npx -y @modelcontextprotocol/server-memory`.
 *
 * Garantías:
 *  - Transporte `StdioClientTransport` real (JSON-RPC por stdin/stdout).
 *  - El grafo de conocimiento se persiste en `<sandbox>/output/memory/*.json`.
 *  - `close()` siempre mata el proceso hijo => nunca queda un `npx` colgado.
 */

import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport, getDefaultEnvironment } from "@modelcontextprotocol/sdk/client/stdio.js";
import type { StdioServerParameters } from "@modelcontextprotocol/sdk/client/stdio.js";
import { LATEST_PROTOCOL_VERSION } from "@modelcontextprotocol/sdk/types.js";
import { createLogger, type Logger } from "../core/logger.js";
import { withTimeout } from "../core/retry.js";
import { DEFAULT_MEMORY_FILE, SANDBOX_ROOT, ensureDir } from "../core/config.js";

export const MEMORY_PACKAGE = "@modelcontextprotocol/server-memory";

export interface EntityInput {
  name: string;
  entityType: string;
  observations: string[];
}

export interface RelationInput {
  from: string;
  to: string;
  relationType: string;
}

export interface ObservationInput {
  entityName: string;
  contents: string[];
}

export interface KnowledgeGraph {
  entities: EntityInput[];
  relations: RelationInput[];
}

export interface MemoryClientOptions {
  /** Ruta del archivo JSON que usa el servidor (equivale a `MEMORY_FILE_PATH`). */
  memoryFilePath?: string;
  /** Comando base. Default: resolución local o `npx`. */
  command?: string;
  args?: string[];
  cwd?: string;
  /** Timeout de handshake + `initialize`. El primer `npx` puede tardar. */
  connectTimeoutMs?: number;
  /** Timeout por llamada de herramienta. */
  callTimeoutMs?: number;
  logger?: Logger;
  /** Entorno extra para el proceso hijo (nunca se filtran secretos por defecto). */
  env?: Record<string, string>;
}

export interface MemoryConnectionInfo {
  serverName: string;
  serverVersion: string;
  protocolVersion: string;
  capabilities: string[];
  pid: number | null;
  commandLine: string;
  memoryFilePath: string;
  transport: "stdio";
}

/**
 * Resuelve cómo lanzar el servidor de memoria:
 * 1. `command`/`args` explícitos.
 * 2. Binario local en `node_modules/@modelcontextprotocol/server-memory` (offline friendly).
 * 3. `npx -y @modelcontextprotocol/server-memory` (cero configuración, spec oficial).
 */
export function resolveMemoryServer(options: MemoryClientOptions = {}): StdioServerParameters {
  const memoryFilePath =
    options.memoryFilePath ?? process.env.MEMORY_FILE_PATH ?? DEFAULT_MEMORY_FILE;
  ensureDir(dirname(memoryFilePath));

  const baseEnv: Record<string, string> = {
    ...getDefaultEnvironment(),
    MEMORY_FILE_PATH: memoryFilePath,
    ...options.env,
  };

  if (options.command) {
    return { command: options.command, args: options.args ?? [], env: baseEnv, cwd: options.cwd ?? SANDBOX_ROOT, stderr: "pipe" };
  }

  const localEntry = join(SANDBOX_ROOT, "node_modules", MEMORY_PACKAGE, "dist", "index.js");
  if (existsSync(localEntry)) {
    return { command: process.execPath, args: [localEntry], env: baseEnv, cwd: SANDBOX_ROOT, stderr: "pipe" };
  }

  const npx = process.platform === "win32" ? "npx.cmd" : "npx";
  return { command: npx, args: ["-y", MEMORY_PACKAGE], env: baseEnv, cwd: SANDBOX_ROOT, stderr: "pipe" };
}

/**
 * Envuelve un servidor MCP de memoria. Uso:
 *
 * ```ts
 * const memory = new MemoryClient();
 * const info = await memory.connect();
 * await memory.createEntities([...]);
 * const graph = await memory.readGraph();
 * await memory.close();
 * ```
 */
export class MemoryClient {
  private client?: Client;
  private transport?: StdioClientTransport;
  private readonly logger: Logger;
  private readonly options: MemoryClientOptions;
  private stderrBuffer: string[] = [];
  private connectionInfo?: MemoryConnectionInfo;

  constructor(options: MemoryClientOptions = {}) {
    this.options = options;
    this.logger = (options.logger ?? createLogger("mcp:memory")).child("mcp:memory");
  }

  get info(): MemoryConnectionInfo | undefined {
    return this.connectionInfo;
  }

  get connected(): boolean {
    return Boolean(this.client) && Boolean(this.connectionInfo);
  }

  /** Arranca el proceso hijo, hace `initialize` y devuelve los datos del handshake. */
  async connect(): Promise<MemoryConnectionInfo> {
    if (this.connectionInfo) return this.connectionInfo;

    const params = resolveMemoryServer(this.options);
    const commandLine = [params.command, ...(params.args ?? [])].join(" ");
    const connectTimeoutMs = this.options.connectTimeoutMs ?? 90_000;

    this.logger.info("conectando servidor MCP local", {
      transport: "stdio",
      command: commandLine,
      memoryFilePath: params.env?.MEMORY_FILE_PATH,
      package: MEMORY_PACKAGE,
    });

    const transport = new StdioClientTransport(params);
    this.transport = transport;

    // Capturamos stderr del hijo (npx imprime ahí) para no ensuciar la salida y poder diagnosticar.
    const stderrStream = transport.stderr;
    if (stderrStream && "on" in stderrStream) {
      (stderrStream as unknown as NodeJS.ReadableStream).on("data", (chunk: Buffer | string) => {
        const text = String(chunk).trim();
        if (!text) return;
        this.stderrBuffer.push(text);
        if (this.stderrBuffer.length > 40) this.stderrBuffer.shift();
        this.logger.debug("stderr del servidor memory", { line: text.slice(0, 200) });
      });
    }

    const client = new Client(
      { name: "meridian-mcp-sandbox", version: "1.0.0" },
      { capabilities: {} },
    );

    try {
      await withTimeout(async () => {
        await client.connect(transport);
        return true;
      }, connectTimeoutMs, `initialize ${MEMORY_PACKAGE}`, undefined);
    } catch (error) {
      await transport.close().catch(() => undefined);
      const candidate = error as { code?: string; message?: string };
      if (candidate?.code === "ENOENT") {
        throw new Error(
          `No se encontró "${params.command}" en el PATH: el servidor MCP de memoria no pudo arrancar. ` +
            "Instala Node.js >= 20 (incluye npx) y vuelve a intentarlo.",
        );
      }
      const hint = this.stderrBuffer.slice(-3).join(" | ");
      throw new Error(
        `Fallo al inicializar ${MEMORY_PACKAGE}: ${candidate?.message ?? String(error)}${hint ? ` · stderr: ${hint}` : ""}`,
      );
    }

    const serverVersion = client.getServerVersion();
    const capabilities = Object.keys(client.getServerCapabilities() ?? {});

    this.client = client;
    this.connectionInfo = {
      serverName: serverVersion?.name ?? "memory",
      serverVersion: serverVersion?.version ?? "unknown",
      protocolVersion: LATEST_PROTOCOL_VERSION,
      capabilities,
      pid: transport.pid ?? null,
      commandLine,
      memoryFilePath: params.env?.MEMORY_FILE_PATH ?? "(default del servidor)",
      transport: "stdio",
    };

    this.logger.success("servidor MCP de memoria listo", {
      server: `${this.connectionInfo.serverName}@${this.connectionInfo.serverVersion}`,
      pid: this.connectionInfo.pid,
      capabilities: this.connectionInfo.capabilities.join(",") || "(tools por defecto)",
    });
    return this.connectionInfo;
  }

  private require(): Client {
    if (!this.client) throw new Error("MemoryClient no está conectado: llama a connect() primero.");
    return this.client;
  }

  /** Invoca una herramienta y devuelve su resultado crudo (union narrowing incluido). */
  async callTool<T = unknown>(name: string, args: Record<string, unknown> = {}): Promise<T> {
    const client = this.require();
    const result = (await client.callTool({ name, arguments: args }, undefined, {
      timeout: this.options.callTimeoutMs ?? 30_000,
    })) as Record<string, unknown>;

    if (result["isError"] === true) {
      const content = Array.isArray(result["content"]) ? result["content"] : [];
      const text = content
        .map((item) => (item && typeof item === "object" && "text" in item ? String((item as { text: unknown }).text) : ""))
        .join(" ")
        .trim();
      throw new Error(`La herramienta MCP "${name}" devolvió error: ${text || "sin detalle"}`);
    }
    return result as T;
  }

  /** Ejecuta una herramienta y devuelve el JSON parseado del primer bloque de texto. */
  async callToolJson<T = unknown>(name: string, args: Record<string, unknown> = {}): Promise<T> {
    const raw = await this.callTool<{ content?: Array<{ type?: string; text?: string }> }>(name, args);
    const text = (raw.content ?? [])
      .filter((block) => block.type === "text" && typeof block.text === "string")
      .map((block) => block.text!)
      .join("\n")
      .trim();
    if (!text) return undefined as T;
    try {
      return JSON.parse(text) as T;
    } catch {
      return text as unknown as T;
    }
  }

  async listTools(): Promise<Array<{ name: string; description?: string; inputSchema?: unknown }>> {
    const client = this.require();
    const response = await client.listTools(undefined, { timeout: this.options.callTimeoutMs ?? 30_000 });
    return response.tools as Array<{ name: string; description?: string; inputSchema?: unknown }>;
  }

  // ---- Operaciones de alto nivel sobre el grafo de conocimiento ----

  async listResources(): Promise<Array<{ uri: string; name?: string; mimeType?: string }>> {
    const response = await this.require().listResources(undefined, { timeout: this.options.callTimeoutMs ?? 30_000 });
    return response.resources as Array<{ uri: string; name?: string; mimeType?: string }>;
  }

  async createEntities(entities: EntityInput[]): Promise<unknown> {
    return this.callToolJson("create_entities", { entities });
  }

  async createRelations(relations: RelationInput[]): Promise<unknown> {
    return this.callToolJson("create_relations", { relations });
  }

  async addObservations(observations: ObservationInput[]): Promise<unknown> {
    return this.callToolJson("add_observations", { observations });
  }

  async readGraph(): Promise<KnowledgeGraph> {
    const graph = await this.callToolJson<Partial<KnowledgeGraph>>("read_graph", {});
    return {
      entities: Array.isArray(graph?.entities) ? graph.entities : [],
      relations: Array.isArray(graph?.relations) ? graph.relations : [],
    };
  }

  async searchNodes(query: string): Promise<KnowledgeGraph> {
    const graph = await this.callToolJson<Partial<KnowledgeGraph>>("search_nodes", { query });
    return {
      entities: Array.isArray(graph?.entities) ? graph.entities : [],
      relations: Array.isArray(graph?.relations) ? graph.relations : [],
    };
  }

  async openNodes(names: string[]): Promise<KnowledgeGraph> {
    const graph = await this.callToolJson<Partial<KnowledgeGraph>>("open_nodes", { names });
    return {
      entities: Array.isArray(graph?.entities) ? graph.entities : [],
      relations: Array.isArray(graph?.relations) ? graph.relations : [],
    };
  }

  /** Cierra el cliente y asegura que el proceso hijo muere (sin zombies). */
  async close(): Promise<void> {
    const transport = this.transport;
    this.client = undefined;
    this.transport = undefined;
    this.connectionInfo = undefined;
    if (!transport) return;
    try {
      await transport.close();
      this.logger.debug("proceso del servidor MCP finalizado");
    } catch (error) {
      this.logger.warn("no se pudo cerrar el transporte MCP limpiamente", { error });
    }
  }

  /** Últimas líneas de stderr del servidor (útil cuando algo falla). */
  get diagnostics(): string[] {
    return [...this.stderrBuffer];
  }

  async [Symbol.asyncDispose](): Promise<void> {
    await this.close();
  }
}

/**
 * Azúcar sintáctico a prueba de fugas: conecta, ejecuta y SIEMPRE cierra.
 *
 * ```ts
 * const graph = await withMemoryClient(client => client.readGraph());
 * ```
 */
export async function withMemoryClient<T>(
  fn: (client: MemoryClient) => Promise<T>,
  options: MemoryClientOptions = {},
): Promise<T> {
  const client = new MemoryClient(options);
  try {
    await client.connect();
    return await fn(client);
  } finally {
    await client.close();
  }
}
