/**
 * Meridian MCP Sandbox — configuración Zero Config.
 *
 * Reglas de oro:
 *  1. `npm run dev` funciona sin `.env`, sin claves y sin servicios externos.
 *  2. Cualquier credencial es OPCIONAL y se lee de `.env` / variables de entorno.
 *  3. Todos los artefactos se escriben dentro de `<sandbox>/output` (ignorado por git).
 */

import { existsSync, mkdirSync, readFileSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/** Raíz del sandbox: `<repo>/meridian-mcp-sandbox`. */
export const SANDBOX_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

export const OUTPUT_DIR = join(SANDBOX_ROOT, "output");
export const DEFAULT_MEMORY_FILE = join(OUTPUT_DIR, "memory", "meridian-memory.json");
export const DEFAULT_ARTIFACT_DIR = join(OUTPUT_DIR, "artifacts");
export const DEFAULT_MEDIA_DIR = join(OUTPUT_DIR, "media");
export const DEFAULT_SCREENSHOT_DIR = join(OUTPUT_DIR, "screenshots");

export interface CliFlags {
  readonly [key: string]: string | boolean;
}

/** Parser minimalista de flags: `--url=https://x` | `--strict` | `-h`. */
export function parseFlags(argv: readonly string[] = process.argv.slice(2)): CliFlags {
  const flags: Record<string, string | boolean> = {};
  for (const raw of argv) {
    if (!raw.startsWith("-")) continue;
    const trimmed = raw.replace(/^--?/, "");
    const eq = trimmed.indexOf("=");
    if (eq === -1) {
      flags[trimmed] = true;
    } else {
      flags[trimmed.slice(0, eq)] = trimmed.slice(eq + 1);
    }
  }
  return flags;
}

export function flagValue(flags: CliFlags, key: string): string | undefined {
  const value = flags[key];
  return typeof value === "string" ? value : undefined;
}

export function hasFlag(flags: CliFlags, ...keys: string[]): boolean {
  return keys.some((key) => {
    const value = flags[key];
    return value === true || (typeof value === "string" && value !== "false" && value !== "0");
  });
}

/**
 * Carga `.env` de forma opcional y silenciosa.
 * Usa `process.loadEnvFile` (Node >= 20.12). Si el archivo no existe, no pasa nada.
 */
export function loadOptionalEnv(explicitPath?: string): { loaded: boolean; path: string } {
  const candidate = explicitPath ?? process.env.MERIDIAN_ENV_FILE ?? join(SANDBOX_ROOT, ".env");
  const path = isAbsolute(candidate) ? candidate : resolve(SANDBOX_ROOT, candidate);
  if (!existsSync(path)) return { loaded: false, path };

  const loader = (process as unknown as { loadEnvFile?: (path?: string) => void }).loadEnvFile;
  if (typeof loader === "function") {
    try {
      loader.call(process, path);
      return { loaded: true, path };
    } catch {
      // Fallback manual abajo.
    }
  }

  try {
    const content = readFileSync(path, "utf8");
    for (const line of content.split(/\r?\n/)) {
      const match = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/.exec(line);
      if (!match) continue;
      const [, key, rawValue] = match;
      if (process.env[key!] !== undefined) continue;
      process.env[key!] = rawValue!.replace(/^["']|["']$/g, "");
    }
    return { loaded: true, path };
  } catch {
    return { loaded: false, path };
  }
}

/** Primer valor no vacío entre varios nombres de variable. */
export function readEnv(...names: string[]): string | undefined {
  for (const name of names) {
    const value = process.env[name];
    if (typeof value === "string" && value.trim().length > 0) return value.trim();
  }
  return undefined;
}

export function ensureDir(dir: string): string {
  mkdirSync(dir, { recursive: true });
  return dir;
}

/** Ubicación real de la caché de navegadores de Playwright según el SO. */
export function playwrightBrowsersPath(): string {
  const override = readEnv("PLAYWRIGHT_BROWSERS_PATH");
  if (override && override !== "0") return override;
  switch (process.platform) {
    case "darwin":
      return join(homedir(), "Library", "Caches", "ms-playwright");
    case "win32":
      return join(readEnv("LOCALAPPDATA") ?? join(homedir(), "AppData", "Local"), "ms-playwright");
    default:
      return join(homedir(), ".cache", "ms-playwright");
  }
}

export interface BrowserAvailability {
  installed: boolean;
  cachePath: string;
  detected: string[];
  hint: string;
}

/** Detecta si hay binarios de Chromium descargados, sin lanzar excepciones. */
export function detectBrowserAvailability(): BrowserAvailability {
  const cachePath = playwrightBrowsersPath();
  const detected: string[] = [];
  try {
    if (existsSync(cachePath)) {
      for (const entry of readdirSync(cachePath)) {
        if (/^chromium/i.test(entry)) detected.push(entry);
      }
    }
  } catch {
    // silencio: la detección es best-effort
  }
  return {
    installed: detected.length > 0,
    cachePath,
    detected,
    hint: "npx playwright install chromium --with-deps   # o: npm run setup:browsers",
  };
}

export interface RuntimeInfo {
  nodeVersion: string;
  platform: NodeJS.Platform;
  arch: string;
  sandboxRoot: string;
  envFile: { loaded: boolean; path: string };
  flags: CliFlags;
}

export function runtimeInfo(flags: CliFlags = {}): RuntimeInfo {
  return {
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    sandboxRoot: SANDBOX_ROOT,
    envFile: loadOptionalEnv(),
    flags,
  };
}

/** Modo de ejecución global: `live` si hay credenciales, `simulation` si no. */
export function executionMode(): "live" | "simulation" {
  return readEnv("MERIDIAN_MODE") === "live" ? "live" : "simulation";
}
