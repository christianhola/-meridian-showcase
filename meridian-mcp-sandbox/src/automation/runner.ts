/**
 * Runner ejecutable del motor Playwright ("My Browser").
 *
 *   npm run test:web                     # demo completo, 100% offline
 *   npm run test:web -- --live           # además intenta un sitio público real
 *   npm run test:web -- --url=https://example.com
 *
 * Qué demuestra:
 *  1. Scraping declarativo contra un sitio local efímero (determinista, sin red).
 *  2. Exponential backoff real: la 1ª carga de una ruta "flaky" falla y se reintenta.
 *  3. AbortController: una ruta lenta se cancela a los ~250 ms sin dejar Chromium colgado.
 *  4. Navegación a un sitio público ligero (opcional y tolerante a fallos de red).
 */

import { createServer, type Server } from "node:http";
import { once } from "node:events";
import { join } from "node:path";
import { BrowserAgent, BrowserNotInstalledError, type ExtractionRule } from "./playwright-agent.js";
import { createLogger, ANSI, colorize } from "../core/logger.js";
import { ensureDir, DEFAULT_SCREENSHOT_DIR, hasFlag, parseFlags, readEnv } from "../core/config.js";
import { isAbortError } from "../core/retry.js";

const logger = createLogger("web:runner");

const FIXTURE_HTML = (attemptLabel: string) => `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <title>Meridian · Fixture local de automatización</title>
  </head>
  <body>
    <header><h1 id="headline">Meridian MCP Sandbox · Motor de automatización</h1></header>
    <main>
      <p id="summary">Esta página la sirve un servidor HTTP efímero del propio sandbox (${attemptLabel}).</p>
      <ul id="capabilities">
        <li class="capability">Navegación resiliente con exponential backoff</li>
        <li class="capability">Cancelación inmediata con AbortController</li>
        <li class="capability">Extracción declarativa de datos tipados</li>
      </ul>
      <a id="cta" href="/docs" data-role="primary-action">Documentación local</a>
      <span class="metric" data-value="42">42</span>
      <span class="metric" data-value="7">7</span>
    </main>
  </body>
</html>`;

const RULES: ExtractionRule[] = [
  { key: "headline", selector: "#headline" },
  { key: "summary", selector: "#summary" },
  { key: "capabilities", selector: ".capability", all: true },
  { key: "primaryAction", selector: "#cta", attribute: "href" },
  { key: "metrics", selector: ".metric", attribute: "data-value", all: true },
  { key: "inexistente", selector: "#no-existe", fallback: "(no encontrado)" },
];

interface FixtureServer {
  server: Server;
  origin: string;
  close: () => Promise<void>;
}

/** Servidor HTTP efímero: hermetismo total, cero dependencia de internet. */
async function startFixtureServer(): Promise<FixtureServer> {
  let flakyHits = 0;
  const server = createServer((request, response) => {
    const url = request.url ?? "/";

    if (url.startsWith("/slow")) {
      // Respuesta deliberadamente lenta: únicamente sirve para demostrar el aborto.
      setTimeout(() => {
        if (!response.writableEnded) {
          response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
          response.end(FIXTURE_HTML("respuesta lenta"));
        }
      }, 30_000);
      return;
    }

    if (url.startsWith("/flaky")) {
      flakyHits += 1;
      if (flakyHits === 1) {
        // Primer intento: el servidor rompe la conexión para forzar el backoff.
        response.writeHead(503, { "content-type": "text/plain; charset=utf-8" });
        response.end("Servicio no disponible (fallo simulado #1)");
        return;
      }
      response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
      response.end(FIXTURE_HTML(`reintento #${flakyHits} tras backoff`));
      return;
    }

    response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    response.end(FIXTURE_HTML("primer intento"));
  });

  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  const port = typeof address === "object" && address ? address.port : 0;

  return {
    server,
    origin: `http://127.0.0.1:${port}`,
    close: () =>
      new Promise<void>((resolve) => {
        server.closeAllConnections?.();
        server.close(() => resolve());
      }),
  };
}

function banner(title: string): void {
  const line = "─".repeat(Math.max(12, 68 - title.length));
  process.stdout.write(`\n${colorize(`── ${title} ${line}`, ANSI.cyan, ANSI.bold)}\n`);
}

export interface RunnerSummary {
  status: "READY" | "SKIPPED" | "FAILED";
  steps: Array<{ name: string; ok: boolean; detail: string; ms: number }>;
}

export async function runBrowserDemo(argv: readonly string[] = process.argv.slice(2)): Promise<RunnerSummary> {
  const flags = parseFlags(argv);
  const wantLive = hasFlag(flags, "live");
  const liveUrl = typeof flags["url"] === "string" ? (flags["url"] as string) : readEnv("MERIDIAN_DEMO_URL") ?? "https://example.com";
  const steps: RunnerSummary["steps"] = [];

  banner("MERIDIAN · My Browser / Playwright Automation");
  logger.info("iniciando demo de automatización web", {
    headless: readEnv("MERIDIAN_HEADLESS") !== "false",
    red: wantLive ? "sí (--live)" : "no (demo 100% local)",
  });

  const fixture = await startFixtureServer();
  const screenshotDir = ensureDir(DEFAULT_SCREENSHOT_DIR);
  const agent = new BrowserAgent({ headless: readEnv("MERIDIAN_HEADLESS") !== "false" });

  try {
    // ── Paso 1: scraping declarativo del fixture local ───────────────────────
    {
      const startedAt = Date.now();
      const navigation = await agent.navigate(`${fixture.origin}/`, {
        captureHtml: true,
        screenshotPath: join(screenshotDir, "fixture-home.png"),
        artifactName: "fixture-home",
        waitUntil: "domcontentloaded",
      });
      const extraction = await agent.extract(RULES);

      steps.push({
        name: "scraping declarativo (fixture local)",
        ok: extraction.matchedCount >= 5,
        detail: `${extraction.matchedCount}/${RULES.length} campos · title="${navigation.title}" · status=${navigation.status}`,
        ms: Date.now() - startedAt,
      });

      logger.info("datos extraídos", {});
      process.stdout.write(`${JSON.stringify(extraction.data, null, 2)}\n`);
      logger.debug("artefactos", { html: navigation.htmlPath, screenshot: navigation.screenshotPath });
    }

    // ── Paso 2: exponential backoff sobre ruta inestable ────────────────────
    {
      const startedAt = Date.now();
      const navigation = await agent.navigate(`${fixture.origin}/flaky`, { waitUntil: "domcontentloaded", retries: 3 });
      const recovered = navigation.attempts > 1;
      steps.push({
        name: "exponential backoff (ruta flaky 503 -> 200)",
        ok: recovered && navigation.status === 200,
        detail: `intentos=${navigation.attempts} · delays=[${navigation.backoffDelaysMs.join(", ")}]ms · status=${navigation.status}`,
        ms: Date.now() - startedAt,
      });
    }

    // ── Paso 3: AbortController sobre ruta lenta ────────────────────────────
    {
      const startedAt = Date.now();
      const controller = new AbortController();
      const abortTimer = setTimeout(() => controller.abort(new Error("cancelación solicitada por el sandbox")), 250);

      let aborted = false;
      let detail = "";
      try {
        await agent.navigate(`${fixture.origin}/slow`, {
          signal: controller.signal,
          timeoutMs: 20_000,
          retries: 0,
          waitUntil: "load",
        });
        detail = "la navegación terminó antes del aborto (inesperado)";
      } catch (error) {
        aborted = isAbortError(error);
        detail = aborted ? "cancelada vía AbortSignal" : `error inesperado: ${(error as Error).message}`;
      } finally {
        clearTimeout(abortTimer);
      }

      const elapsed = Date.now() - startedAt;
      steps.push({
        name: "AbortController (corte inmediato < 2s)",
        ok: aborted && elapsed < 2_000,
        detail: `${detail} en ${elapsed}ms (sin procesos colgados)`,
        ms: elapsed,
      });
    }

    // ── Paso 4: navegación a un sitio público (opcional / tolerante) ────────
    {
      const startedAt = Date.now();
      try {
        const navigation = await agent.navigate(liveUrl, {
          waitUntil: "domcontentloaded",
          timeoutMs: 15_000,
          retries: 1,
          captureHtml: true,
          artifactName: "public-site",
          screenshotPath: join(screenshotDir, "public-site.png"),
        });
        const extraction = await agent.extract([
          { key: "h1", selector: "h1", fallback: "(sin h1)" },
          { key: "paragraph", selector: "p", fallback: "(sin párrafo)" },
        ]);
        steps.push({
          name: `navegación pública (${liveUrl})`,
          ok: true,
          detail: `status=${navigation.status} · title="${navigation.title}" · h1="${String(extraction.data["h1"]).slice(0, 60)}"`,
          ms: Date.now() - startedAt,
        });
      } catch (error) {
        const message = (error as Error).message.slice(0, 160);
        // En un sandbox sin salida a internet esto NO es un fallo del código.
        steps.push({
          name: `navegación pública (${liveUrl})`,
          ok: false,
          detail: `omitida: ${message}`,
          ms: Date.now() - startedAt,
        });
        logger.warn("sitio público no alcanzable (normal en entornos sin internet)", { error: message });
      }
    }
  } finally {
    await agent.close();
    await fixture.close();
  }

  const hardSteps = steps.filter((step) => !step.name.startsWith("navegación pública"));
  const failed = hardSteps.filter((step) => !step.ok);
  const status: RunnerSummary["status"] = failed.length === 0 ? "READY" : "FAILED";

  banner("Resumen My Browser");
  for (const step of steps) {
    const mark = step.ok ? colorize("✔", ANSI.green) : colorize("•", ANSI.yellow);
    process.stdout.write(`${mark} ${step.name.padEnd(46)} ${colorize(`${step.ms}ms`, ANSI.gray)}  ${step.detail}\n`);
  }
  logger.info("artefactos guardados", { screenshots: screenshotDir });

  return { status, steps };
}

async function main(): Promise<void> {
  try {
    const summary = await runBrowserDemo();
    if (summary.status === "READY") {
      logger.success("demo de automatización completada", { status: summary.status });
    } else {
      logger.error("demo de automatización con fallos", { status: summary.status });
      if (hasFlag(parseFlags(), "strict")) process.exitCode = 1;
    }
  } catch (error) {
    if (error instanceof BrowserNotInstalledError) {
      // Zero Config: no rompemos la ejecución, indicamos exactamente qué falta.
      process.stdout.write(
        [
          "",
          colorize("SETUP REQUIRED · Chromium no está instalado", ANSI.yellow, ANSI.bold),
          `  Buscado en: ${error.cachePath}`,
          `  Solución:   ${colorize(error.hint, ANSI.cyan)}`,
          "  Alternativa sin navegador: `npm run dev` y `npm run test:media` funcionan igual.",
          "",
        ].join("\n"),
      );
      process.exitCode = hasFlag(parseFlags(), "strict") ? 1 : 0;
      return;
    }
    logger.error("la demo de navegador falló", { error });
    process.exitCode = 1;
  } finally {
    // Los artefactos ya están en disco: no dejamos que un proceso hijo de
    // Chromium retenga el event loop (evita ejecuciones "colgadas" en CI).
    process.exit(process.exitCode ?? 0);
  }
}

const invokedDirectly = process.argv[1] ? /runner\.(ts|js|mjs)$/.test(process.argv[1]) : false;
if (invokedDirectly) {
  await main();
}
