/**
 * Motor de automatización web "My Browser" — Playwright resiliente.
 *
 * Pilares de diseño:
 *  1. `AbortController` de primera clase: TODAS las operaciones aceptan `signal?`.
 *     Al abortar se cierra la página/contexto y la promesa se rechaza al instante,
 *     sin dejar procesos de Chromium colgados.
 *  2. Exponential Backoff con jitter (`withRetry`) para navegación y extracción.
 *  3. Degradación elegante: si no hay binarios de Chromium, se lanza
 *     `BrowserNotInstalledError` con instrucciones exactas en lugar de un stack crudo.
 *  4. Extracción declarativa: un "plan" de scraping devuelve datos tipados + errores por campo.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright";
import type { Browser, BrowserContext, Page } from "playwright";
import { createLogger, type Logger } from "../core/logger.js";
import {
  AbortExecutionError,
  combineSignals,
  isAbortError,
  throwIfAborted,
  toError,
  withRetry,
  type RetryInfo,
} from "../core/retry.js";
import { DEFAULT_ARTIFACT_DIR, DEFAULT_SCREENSHOT_DIR, detectBrowserAvailability, ensureDir, readEnv } from "../core/config.js";

export class BrowserNotInstalledError extends Error {
  override readonly name = "BrowserNotInstalledError";
  constructor(readonly cachePath: string, readonly hint: string, cause?: unknown) {
    super(
      `No hay binarios de Chromium instalados (buscado en ${cachePath}). ` +
        `Ejecuta primero: ${hint}`,
      { cause },
    );
  }
}

export class NavigationAbortedError extends Error {
  override readonly name = "AbortError";
  constructor(
    message: string,
    readonly url: string,
  ) {
    super(message);
  }
}

export type WaitUntil = "commit" | "domcontentloaded" | "load" | "networkidle";

export interface BrowserAgentOptions {
  headless?: boolean;
  /** Timeout por defecto de las operaciones de página. */
  defaultTimeoutMs?: number;
  /** Viewport del contexto. */
  viewport?: { width: number; height: number };
  userAgent?: string;
  locale?: string;
  timezoneId?: string;
  /** Reintentos adicionales para navegación/extracción. */
  retries?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  /** Directorio de artefactos (HTML, PNG, JSON). Default `<sandbox>/output`. */
  artifactDir?: string;
  logger?: Logger;
  /** Argumentos extra de lanzamiento de Chromium. */
  launchArgs?: string[];
}

export interface NavigateOptions {
  signal?: AbortSignal;
  waitUntil?: WaitUntil;
  /** Timeout del intento, en ms. */
  timeoutMs?: number;
  retries?: number;
  /** Guarda el HTML final del documento. */
  captureHtml?: boolean;
  /** Guarda un screenshot full-page. */
  screenshotPath?: string;
  /** Nombre estable del artefacto (sin extensión). */
  artifactName?: string;
}

export interface NavigationResult {
  url: string;
  finalUrl: string;
  title: string;
  status: number | null;
  attempts: number;
  durationMs: number;
  html?: string;
  htmlPath?: string;
  screenshotPath?: string;
  backoffDelaysMs: number[];
}

export interface ExtractionRule {
  /** Clave del objeto resultado. */
  key: string;
  /** Selector CSS. */
  selector: string;
  /** Qué extraer del nodo. */
  attribute?: string;
  /** `false` (default) toma el primer match; `true` recoge todos. */
  all?: boolean;
  /** Valor de reserva si no se encuentra. */
  fallback?: string;
  /** `true` (default) limpia y colapsa espacios. */
  normalize?: boolean;
}

export interface ExtractionFieldResult {
  key: string;
  selector: string;
  value: string | string[] | null;
  matched: boolean;
  durationMs: number;
  error?: string;
}

export interface ExtractionResult {
  fields: ExtractionFieldResult[];
  data: Record<string, string | string[] | null>;
  matchedCount: number;
  missing: string[];
  durationMs: number;
}

export interface ScrapeTarget {
  url: string;
  rules: ExtractionRule[];
}

export interface ScrapeReport {
  startedAt: string;
  finishedAt: string;
  durationMs: number;
  results: Array<{ url: string; ok: boolean; title?: string; data?: Record<string, string | string[] | null>; missing?: string[]; error?: string }>;
  succeeded: number;
  failed: number;
  screenshot?: string;
  reportPath?: string;
}

const DEFAULT_VIEWPORT = { width: 1280, height: 720 };

function normalizeText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export class BrowserAgent {
  private browser?: Browser;
  private context?: BrowserContext;
  private page?: Page;
  private readonly logger: Logger;
  private readonly options: Required<Pick<BrowserAgentOptions, "headless" | "defaultTimeoutMs" | "retries" | "baseDelayMs" | "maxDelayMs" | "artifactDir" | "viewport">> &
    BrowserAgentOptions;

  constructor(options: BrowserAgentOptions = {}) {
    this.options = {
      headless: options.headless ?? readEnv("MERIDIAN_HEADLESS") !== "false",
      defaultTimeoutMs: options.defaultTimeoutMs ?? 30_000,
      retries: options.retries ?? 2,
      baseDelayMs: options.baseDelayMs ?? 350,
      maxDelayMs: options.maxDelayMs ?? 4_000,
      artifactDir: options.artifactDir ?? DEFAULT_ARTIFACT_DIR,
      viewport: options.viewport ?? DEFAULT_VIEWPORT,
      ...options,
    };
    this.logger = (options.logger ?? createLogger("web:playwright")).child("web:playwright");
  }

  get currentPage(): Page | undefined {
    return this.page;
  }

  /** Lanza Chromium (una sola vez). Idempotente. */
  async launch(signal?: AbortSignal): Promise<void> {
    if (this.browser?.isConnected()) return;
    throwIfAborted(signal);

    const availability = detectBrowserAvailability();
    this.logger.step("lanzando Chromium", {
      headless: this.options.headless,
      cache: availability.cachePath,
      browsers: availability.detected.join(",") || "(ninguno detectado)",
    });

    try {
      this.browser = await chromium.launch({
        headless: this.options.headless,
        args: this.options.launchArgs ?? ["--no-sandbox", "--disable-dev-shm-usage"],
      });
    } catch (error) {
      const message = toError(error).message;
      if (/Executable doesn't exist|browserType\.launch|please run the following command|playwright install/i.test(message)) {
        throw new BrowserNotInstalledError(availability.cachePath, availability.hint, error);
      }
      throw error;
    }

    this.context = await this.browser.newContext({
      viewport: this.options.viewport,
      userAgent: this.options.userAgent,
      locale: this.options.locale ?? "es-ES",
      timezoneId: this.options.timezoneId,
      ignoreHTTPSErrors: true,
    });
    this.context.setDefaultTimeout(this.options.defaultTimeoutMs);
    this.context.setDefaultNavigationTimeout(this.options.defaultTimeoutMs);
    this.page = await this.context.newPage();
    this.page.on("pageerror", (error) => this.logger.debug("error de página", { message: error.message }));
    this.logger.success("navegador listo", { version: this.browser.version() });
  }

  private async requirePage(): Promise<Page> {
    if (!this.page) await this.launch();
    if (!this.page) throw new Error("No se pudo inicializar la página de Playwright.");
    return this.page;
  }

  /**
   * Navega con reintentos + cancelación.
   *
   * El bucle de reintentos está delegado a `withRetry`: cada intento usa un
   * timeout propio, y si el `signal` externo se aborta, la navegación se corta
   * inmediatamente (`page.goto` rechaza con AbortError) y la página se limpia.
   */
  async navigate(url: string, options: NavigateOptions = {}): Promise<NavigationResult> {
    const page = await this.requirePage();
    const startedAt = Date.now();
    const backoffDelaysMs: number[] = [];

    const result = await withRetry<{ status: number | null; attempts: number }>(
      async ({ attempt, signal }) => {
        if (attempt > 1) this.logger.warn("reintentando navegación", { url, attempt });
        const response = await page.goto(url, {
          waitUntil: options.waitUntil ?? "domcontentloaded",
          timeout: options.timeoutMs ?? this.options.defaultTimeoutMs,
          // Playwright no acepta AbortSignal nativamente: lo conectamos manualmente.
          signal,
        }).catch((error: unknown) => {
          if (isAbortError(error) || signal.aborted) {
            throw new NavigationAbortedError(`Navegación a ${url} cancelada por AbortSignal`, url);
          }
          throw error;
        });
        return { status: response ? response.status() : null, attempts: attempt };
      },
      {
        retries: options.retries ?? this.options.retries,
        baseDelayMs: this.options.baseDelayMs,
        maxDelayMs: this.options.maxDelayMs,
        signal: options.signal,
        label: `goto ${url}`,
        onRetry: (info: RetryInfo) => {
          backoffDelaysMs.push(info.delayMs);
          this.logger.warn("fallo de navegación, backoff exponencial", {
            attempt: info.attempt,
            maxAttempts: info.maxAttempts,
            delayMs: info.delayMs,
            reason: toError(info.error).message.slice(0, 140),
          });
        },
      },
    );

    const title = await page.title().catch(() => "");
    const finalUrl = page.url();
    const capture = await this.capture(page, options);

    const navigation: NavigationResult = {
      url,
      finalUrl,
      title,
      status: result.status,
      attempts: result.attempts,
      durationMs: Date.now() - startedAt,
      backoffDelaysMs,
      ...capture,
    };

    this.logger.success("navegación completada", {
      url: finalUrl,
      status: navigation.status ?? "n/a",
      title: title.slice(0, 80),
      attempts: navigation.attempts,
      ms: navigation.durationMs,
    });
    return navigation;
  }

  private async capture(page: Page, options: NavigateOptions): Promise<Partial<NavigationResult>> {
    const captured: Partial<NavigationResult> = {};
    if (options.captureHtml) {
      const html = await page.content();
      captured.html = html;
      const target = join(
        ensureDir(options.screenshotPath ? join(options.screenshotPath, "..") : this.options.artifactDir),
        `${options.artifactName ?? "page"}.html`,
      );
      await writeFile(target, html, "utf8");
      captured.htmlPath = target;
      this.logger.debug("HTML capturado", { path: target, bytes: html.length });
    }
    if (options.screenshotPath) {
      const target = options.screenshotPath;
      await mkdir(join(target, ".."), { recursive: true });
      await page.screenshot({ path: target, fullPage: true });
      captured.screenshotPath = target;
      this.logger.debug("screenshot guardado", { path: target });
    }
    return captured;
  }

  /** Extrae campos declarativos de la página actual (o de `url` si se indica). */
  async extract(
    rules: ExtractionRule[],
    options: { url?: string; signal?: AbortSignal; retries?: number; waitForSelector?: string } = {},
  ): Promise<ExtractionResult> {
    if (options.url) {
      await this.navigate(options.url, { signal: options.signal, retries: options.retries });
    }
    const page = await this.requirePage();
    throwIfAborted(options.signal);

    if (options.waitForSelector) {
      await page.waitForSelector(options.waitForSelector, { timeout: this.options.defaultTimeoutMs, signal: options.signal }).catch((error: unknown) => {
        this.logger.debug("waitForSelector no resuelto", { selector: options.waitForSelector, error: toError(error).message });
      });
    }

    const startedAt = Date.now();
    const fields: ExtractionFieldResult[] = [];
    const data: Record<string, string | string[] | null> = {};

    for (const rule of rules) {
      const fieldStart = Date.now();
      throwIfAborted(options.signal);
      try {
        const value = await withRetry<string | string[] | null>(
          async () => {
            if (rule.all) {
              const handles = await page.$$(rule.selector);
              if (handles.length === 0) throw new Error(`Sin coincidencias para "${rule.selector}"`);
              const values: string[] = [];
              for (const handle of handles) {
                const raw = rule.attribute
                  ? await handle.getAttribute(rule.attribute)
                  : await handle.innerText();
                if (raw) values.push(rule.normalize === false ? raw : normalizeText(raw));
              }
              return values;
            }
            const handle = await page.$(rule.selector);
            if (!handle) throw new Error(`Sin coincidencias para "${rule.selector}"`);
            const raw = rule.attribute ? await handle.getAttribute(rule.attribute) : await handle.innerText();
            if (raw === null || raw === undefined) throw new Error(`Atributo "${rule.attribute}" vacío`);
            return rule.normalize === false ? raw : normalizeText(raw);
          },
          {
            retries: options.retries ?? 1,
            baseDelayMs: 150,
            maxDelayMs: 1_200,
            timeoutMs: Math.min(this.options.defaultTimeoutMs, 12_000),
            signal: options.signal,
            label: `extract ${rule.key}`,
          },
        );

        data[rule.key] = value;
        fields.push({
          key: rule.key,
          selector: rule.selector,
          value,
          matched: value !== null && (!Array.isArray(value) || value.length > 0),
          durationMs: Date.now() - fieldStart,
        });
      } catch (error) {
        if (isAbortError(error) && options.signal?.aborted) {
          throw new AbortExecutionError(`Extracción cancelada en el campo "${rule.key}"`, options.signal.reason);
        }
        const fallback = rule.fallback ?? null;
        data[rule.key] = fallback;
        fields.push({
          key: rule.key,
          selector: rule.selector,
          value: fallback,
          matched: false,
          durationMs: Date.now() - fieldStart,
          error: toError(error).message,
        });
        this.logger.debug("campo no extraído", { key: rule.key, selector: rule.selector, error: toError(error).message });
      }
    }

    const matchedCount = fields.filter((field) => field.matched).length;
    const result: ExtractionResult = {
      fields,
      data,
      matchedCount,
      missing: fields.filter((field) => !field.matched).map((field) => field.key),
      durationMs: Date.now() - startedAt,
    };
    this.logger.info("extracción completada", {
      campos: `${matchedCount}/${fields.length}`,
      faltantes: result.missing.join(",") || "(ninguno)",
      ms: result.durationMs,
    });
    return result;
  }

  /** Ejecuta un plan de scraping multi-URL con aislamiento de fallos por URL. */
  async scrape(targets: ScrapeTarget[], options: { signal?: AbortSignal; screenshot?: boolean } = {}): Promise<ScrapeReport> {
    const startedAt = new Date();
    const results: ScrapeReport["results"] = [];
    let screenshotPath: string | undefined;

    for (const target of targets) {
      throwIfAborted(options.signal);
      try {
        const navigation = await this.navigate(target.url, {
          signal: options.signal,
          captureHtml: true,
          artifactName: `scrape-${new URL(target.url).hostname.replace(/\W+/g, "-")}`,
        });
        const extraction = await this.extract(target.rules, { signal: options.signal });
        results.push({
          url: navigation.finalUrl,
          ok: true,
          title: navigation.title,
          data: extraction.data,
          missing: extraction.missing,
        });
      } catch (error) {
        if (isAbortError(error) && options.signal?.aborted) {
          throw new AbortExecutionError(`Plan de scraping cancelado en ${target.url}`, options.signal.reason);
        }
        results.push({ url: target.url, ok: false, error: toError(error).message });
        this.logger.warn("objetivo fallido en el plan de scraping", { url: target.url, error: toError(error).message });
      }
    }

    if (options.screenshot && this.page) {
      const dir = ensureDir(DEFAULT_SCREENSHOT_DIR);
      screenshotPath = join(dir, `scrape-report-${startedAt.getTime()}.png`);
      await this.page.screenshot({ path: screenshotPath, fullPage: false }).catch(() => undefined);
    }

    const finishedAt = new Date();
    const report: ScrapeReport = {
      startedAt: startedAt.toISOString(),
      finishedAt: finishedAt.toISOString(),
      durationMs: finishedAt.getTime() - startedAt.getTime(),
      results,
      succeeded: results.filter((item) => item.ok).length,
      failed: results.filter((item) => !item.ok).length,
      screenshot: screenshotPath,
    };

    const reportPath = join(ensureDir(this.options.artifactDir), `scrape-report-${startedAt.getTime()}.json`);
    await writeFile(reportPath, JSON.stringify(report, null, 2), "utf8");
    report.reportPath = reportPath;
    return report;
  }

  /** Ejecuta código dentro de la página (equivalente a `page.evaluate`) con aborto cooperativo. */
  async evaluate<T>(script: string, args: Record<string, unknown> = {}, options: { signal?: AbortSignal } = {}): Promise<T> {
    const page = await this.requirePage();
    throwIfAborted(options.signal);
    try {
      return (await page.evaluate(script, args)) as T;
    } finally {
      throwIfAborted(options.signal);
    }
  }

  /** Cierra todo lo que esté abierto. Seguro de llamar múltiples veces. */
  async close(): Promise<void> {
    const page = this.page;
    const context = this.context;
    const browser = this.browser;
    this.page = undefined;
    this.context = undefined;
    this.browser = undefined;
    await page?.close().catch(() => undefined);
    await context?.close().catch(() => undefined);
    await browser?.close().catch(() => undefined);
    this.logger.debug("navegador cerrado");
  }

  async [Symbol.asyncDispose](): Promise<void> {
    await this.close();
  }
}

/**
 * Ejecuta una sesión de automatización completa con ciclo de vida garantizado:
 * `launch -> fn -> close` y cancelación global por timeout o Ctrl+C.
 */
export async function runBrowserSession<T>(
  fn: (agent: BrowserAgent) => Promise<T>,
  options: BrowserAgentOptions & { timeoutMs?: number } = {},
): Promise<T> {
  const agent = new BrowserAgent(options);
  const controller = new AbortController();
  const globalTimeout = options.timeoutMs
    ? setTimeout(() => controller.abort(new Error(`Sesión de navegador excedió ${options.timeoutMs}ms`)), options.timeoutMs)
    : undefined;

  try {
    await agent.launch(controller.signal);
    return await fn(agent);
  } finally {
    if (globalTimeout) clearTimeout(globalTimeout);
    await agent.close();
  }
}

/** Señal combinada (externo + timeout) reutilizable por consumidores del agente. */
export function linkSignals(signals: Array<AbortSignal | undefined>): AbortSignal {
  return combineSignals(signals);
}
