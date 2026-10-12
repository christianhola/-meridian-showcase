/**
 * Pruebas del núcleo de resiliencia (sin navegador, sin red, sin claves).
 * Ejecuta: npm test
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  AbortExecutionError,
  RetryExhaustedError,
  computeBackoff,
  isAbortError,
  sleep,
  withRetry,
  withTimeout,
} from "./retry.js";

describe("computeBackoff", () => {
  it("crece exponencialmente con factor 2 sin jitter", () => {
    const delays = [1, 2, 3, 4].map((attempt) =>
      computeBackoff(attempt, { baseDelayMs: 100, factor: 2, maxDelayMs: 10_000, jitter: false }),
    );
    assert.deepEqual(delays, [100, 200, 400, 800]);
  });

  it("respeta el techo maxDelayMs", () => {
    const delay = computeBackoff(10, { baseDelayMs: 100, factor: 4, maxDelayMs: 1_500, jitter: false });
    assert.equal(delay, 1_500);
  });

  it("con jitter permanece dentro de [0, delay]", () => {
    for (let i = 0; i < 50; i += 1) {
      const delay = computeBackoff(3, { baseDelayMs: 200, factor: 2, maxDelayMs: 10_000, jitter: true });
      assert.ok(delay >= 0 && delay <= 800, `delay fuera de rango: ${delay}`);
    }
  });
});

describe("withRetry", () => {
  it("reintenta hasta tener éxito y reporta el número de intentos", async () => {
    let attempts = 0;
    const result = await withRetry(
      async () => {
        attempts += 1;
        if (attempts < 3) throw new Error(`fallo #${attempts}`);
        return "ok";
      },
      { retries: 3, baseDelayMs: 1, jitter: false },
    );
    assert.equal(result, "ok");
    assert.equal(attempts, 3);
  });

  it("lanza RetryExhaustedError cuando se agotan los intentos", async () => {
    await assert.rejects(
      () => withRetry(async () => Promise.reject(new Error("siempre falla")), { retries: 2, baseDelayMs: 1 }),
      (error: unknown) => {
        assert.ok(error instanceof RetryExhaustedError);
        assert.equal(error.attempts, 3);
        assert.match(error.message, /siempre falla/);
        return true;
      },
    );
  });

  it("cancela de inmediato con AbortSignal y no reintenta", async () => {
    const controller = new AbortController();
    let attempts = 0;
    const started = Date.now();

    const promise = withRetry(
      async ({ signal }) => {
        attempts += 1;
        // Simula una operación larga cancelable.
        await new Promise<void>((resolve, reject) => {
          const timer = setTimeout(resolve, 5_000);
          signal.addEventListener("abort", () => {
            clearTimeout(timer);
            reject(new AbortExecutionError("cancelado"));
          }, { once: true });
        });
        return "nunca";
      },
      { retries: 5, baseDelayMs: 100, signal: controller.signal, label: "prueba de aborto" },
    );

    setTimeout(() => controller.abort(new Error("el usuario canceló")), 60);
    await assert.rejects(promise, (error: unknown) => {
      assert.ok(isAbortError(error), `se esperaba AbortError, se obtuvo ${String(error)}`);
      return true;
    });
    assert.equal(attempts, 1, "un aborto no debe reintentarse");
    assert.ok(Date.now() - started < 1_000, "el aborto debe cortar la ejecución al instante");
  });

  it("no arranca si la señal ya está abortada", async () => {
    const controller = new AbortController();
    controller.abort();
    let executed = false;
    await assert.rejects(
      () => withRetry(async () => { executed = true; return 1; }, { signal: controller.signal }),
      (error: unknown) => isAbortError(error),
    );
    assert.equal(executed, false);
  });

  it("respeta shouldRetry para errores no reintentables", async () => {
    let attempts = 0;
    await assert.rejects(
      () =>
        withRetry(
          async () => {
            attempts += 1;
            throw new Error("400 bad request");
          },
          { retries: 5, baseDelayMs: 1, shouldRetry: () => false },
        ),
    );
    assert.equal(attempts, 1);
  });

  it("aplica timeout por intento y reintenta", async () => {
    let attempts = 0;
    await assert.rejects(
      () =>
        withRetry(
          async () => {
            attempts += 1;
            await sleep(200);
            return "tarde";
          },
          { retries: 1, timeoutMs: 30, baseDelayMs: 1 },
        ),
    );
    assert.equal(attempts, 2, "un timeout por intento sí debe reintentarse");
  });
});

describe("withTimeout", () => {
  it("propaga la señal combinada al callback", async () => {
    const result = await withTimeout(async (signal) => (signal.aborted ? "abortado" : "ok"), 1_000);
    assert.equal(result, "ok");
  });
});

describe("sleep", () => {
  it("se cancela al abortar", async () => {
    const controller = new AbortController();
    const started = Date.now();
    setTimeout(() => controller.abort(), 30);
    await assert.rejects(() => sleep(5_000, controller.signal));
    assert.ok(Date.now() - started < 500);
  });
});
