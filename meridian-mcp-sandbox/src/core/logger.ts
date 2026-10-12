/**
 * Meridian MCP Sandbox — logger estructurado.
 *
 * Características:
 *  - Cero dependencias externas (solo `node:*`).
 *  - Salida legible para humanos en TTY y JSON-lines si `MERIDIAN_LOG_FORMAT=json`.
 *  - Respeta `NO_COLOR` y `FORCE_COLOR` (estándares de facto).
 *  - Scopes por módulo: `createLogger("mcp:memory")`.
 */

export type LogLevel = "debug" | "info" | "step" | "success" | "warn" | "error";

const LEVEL_WEIGHT: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  step: 30,
  success: 30,
  warn: 40,
  error: 50,
};

const LEVEL_LABEL: Record<LogLevel, string> = {
  debug: "DEBUG",
  info: "INFO ",
  step: "STEP ",
  success: " OK  ",
  warn: "WARN ",
  error: "ERROR",
};

const COLOR: Record<LogLevel, string> = {
  debug: "\u001b[90m",
  info: "\u001b[36m",
  step: "\u001b[35m",
  success: "\u001b[32m",
  warn: "\u001b[33m",
  error: "\u001b[31m",
};

export const ANSI = {
  reset: "\u001b[0m",
  bold: "\u001b[1m",
  dim: "\u001b[2m",
  cyan: "\u001b[36m",
  green: "\u001b[32m",
  yellow: "\u001b[33m",
  red: "\u001b[31m",
  magenta: "\u001b[35m",
  blue: "\u001b[34m",
  gray: "\u001b[90m",
} as const;

function supportsColor(stream: NodeJS.WriteStream): boolean {
  if (process.env.NO_COLOR) return false;
  if (process.env.FORCE_COLOR && process.env.FORCE_COLOR !== "0") return true;
  if (process.env.TERM === "dumb") return false;
  return Boolean(stream.isTTY);
}

const JSON_MODE = (process.env.MERIDIAN_LOG_FORMAT ?? "").toLowerCase() === "json";
const MIN_LEVEL: LogLevel = normaliseLevel(process.env.MERIDIAN_LOG_LEVEL ?? "info");

function normaliseLevel(raw: string): LogLevel {
  const value = raw.toLowerCase();
  return (["debug", "info", "step", "success", "warn", "error"] as const).includes(value as LogLevel)
    ? (value as LogLevel)
    : "info";
}

export function colorize(text: string, ...codes: string[]): string {
  if (!supportsColor(process.stdout)) return text;
  return `${codes.join("")}${text}${ANSI.reset}`;
}

function stamp(): string {
  const now = new Date();
  const pad = (n: number, size = 2) => String(n).padStart(size, "0");
  return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}.${pad(now.getMilliseconds(), 3)}`;
}

function serialize(meta: Record<string, unknown>): string {
  const entries = Object.entries(meta).filter(([, value]) => value !== undefined);
  if (entries.length === 0) return "";
  return entries
    .map(([key, value]) => `${key}=${typeof value === "string" ? value : safeJson(value)}`)
    .join(" ");
}

function safeJson(value: unknown): string {
  try {
    return JSON.stringify(value) ?? String(value);
  } catch {
    return String(value);
  }
}

export interface LogMeta {
  [key: string]: unknown;
}

export class Logger {
  constructor(
    private readonly scope: string,
    private readonly bindings: LogMeta = {},
  ) {}

  child(scope: string, bindings: LogMeta = {}): Logger {
    return new Logger(scope, { ...this.bindings, ...bindings });
  }

  private emit(level: LogLevel, message: string, meta: LogMeta = {}): void {
    if (LEVEL_WEIGHT[level] < LEVEL_WEIGHT[MIN_LEVEL]) return;
    const payload = { ...this.bindings, ...meta };

    if (JSON_MODE) {
      const line = JSON.stringify({
        ts: new Date().toISOString(),
        level,
        scope: this.scope,
        message,
        ...payload,
      });
      process.stdout.write(
        level === "error" || level === "warn" ? `${line}\n` : `${line}\n`,
      );
      return;
    }

    const head = colorize(`${LEVEL_LABEL[level]}`, COLOR[level], ANSI.bold);
    const scope = colorize(`[${this.scope}]`, ANSI.dim);
    const tail = serialize(payload);
    const line = `${colorize(stamp(), ANSI.gray)} ${head} ${scope} ${message}${tail ? ` ${colorize(tail, ANSI.dim)}` : ""}`;
    if (level === "error") process.stderr.write(`${line}\n`);
    else process.stdout.write(`${line}\n`);
  }

  debug(message: string, meta: LogMeta = {}): void {
    this.emit("debug", message, meta);
  }

  info(message: string, meta: LogMeta = {}): void {
    this.emit("info", message, meta);
  }

  step(message: string, meta: LogMeta = {}): void {
    this.emit("step", message, meta);
  }

  success(message: string, meta: LogMeta = {}): void {
    this.emit("success", message, meta);
  }

  warn(message: string, meta: LogMeta = {}): void {
    this.emit("warn", message, meta);
  }

  error(message: string, meta: LogMeta = {}): void {
    const error = meta.error;
    const rest: LogMeta = { ...meta };
    delete rest.error;
    this.emit("error", message, rest);
    if (error instanceof Error && LEVEL_WEIGHT.debug >= 0 && (process.env.MERIDIAN_STACKS === "1" || MIN_LEVEL === "debug")) {
      process.stderr.write(colorize(`${error.stack ?? ""}\n`, ANSI.gray));
    }
  }
}

export function createLogger(scope: string, bindings: LogMeta = {}): Logger {
  return new Logger(scope, bindings);
}

export const log: Logger = createLogger("meridian");

export function isDebugEnabled(): boolean {
  return LEVEL_WEIGHT[MIN_LEVEL] <= LEVEL_WEIGHT.debug;
}
