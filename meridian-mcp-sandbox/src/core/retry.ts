/**
 * Meridian MCP Sandbox — resiliencia: reintentos con backoff exponencial
 * + jitter y cancelación cooperativa vía `AbortSignal`.
 *
 * Diseño:
 *  - `withRetry` es agnóstico: sirve para MCP (npx), Playwright, HTTP o IO de disco.
 *  - Cada intento puede tener su propio timeout (`timeoutMs`) que se combina con
 *    el `signal` externo mediante `AbortSignal.any`.
 *  - El delay es exponencial (`base * factor^(n-1)`) acotado por `maxDelayMs`,
 *    con "full jitter" opcional para evitar tormentas de reintentos.
 *  - Ningún `sleep` ignora el aborto: la señal corta la espera al instante,
 *    así no quedan procesos colgados.
 */

export interface AttemptContext {
  /** Número de intento, empezando en 1. */
  attempt: number;
  /** Señal combinada (externa + timeout del intento). */
  signal: AbortSignal;
}

export interface RetryInfo {
  attempt: number;
  maxAttempts: number;
  delayMs: number;
  error: unknown;
  label: string;
}

export interface RetryOptions {
  /** Reintentos ADICIONALES al primer intento. `retries: 3` => hasta 4 intentos. */
  retries?: number;
  /** Delay base del primer backoff, en ms. */
  baseDelayMs?: number;
  /** Cota superior del delay, en ms. */
  maxDelayMs?: number;
  /** Factor multiplicador del backoff exponencial. */
  factor?: number;
  /** `true` (default) aplica full jitter: rand(0, delay). `false` lo desactiva. */
  jitter?: boolean;
  /** Timeout por intento, en ms. */
  timeoutMs?: number;
  /** Señal de cancelación externa. */
  signal?: AbortSignal;
  /** Etiqueta para logs y errores. */
  label?: string;
  /** Callback invocado antes de cada espera de reintento. */
  onRetry?: (info: RetryInfo) => void;
  /** Decide si un error es reintentable. Por defecto: todo menos abortos. */
  shouldRetry?: (error: unknown, attempt: number) => boolean;
}

export class AbortExecutionError extends Error {
  override readonly name = "AbortError";
  constructor(message = "Operación cancelada por AbortSignal", readonly reason?: unknown) {
    super(message);
  }
}

export class TimeoutExecutionError extends Error {
  override readonly name = "TimeoutError";
  constructor(
    message: string,
    readonly timeoutMs: number,
  ) {
    super(message);
  }
}

export class RetryExhaustedError extends Error {
  override readonly name = "RetryExhaustedError";
  constructor(
    readonly label: string,
    readonly attempts: number,
    readonly lastError: unknown,
    readonly history: unknown[],
  ) {
    super(
      `"${label}" falló tras ${attempts} intento(s): ${lastError instanceof Error ? lastError.message : String(lastError)}`,
    );
  }
}

export const DEFAULT_RETRY: Required<Pick<RetryOptions, "retries" | "baseDelayMs" | "maxDelayMs" | "factor" | "jitter" | "timeoutMs">> = {
  retries: 3,
  baseDelayMs: 400,
  maxDelayMs: 8_000,
  factor: 2,
  jitter: true,
  timeoutMs: 20_000,
};

export function isAbortError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const candidate = error as { name?: string; code?: string; message?: string };
  return (
    candidate.name === "AbortError" ||
    candidate.name === "TimeoutError" ||
    candidate.code === "ABORT_ERR" ||
    candidate.code === "UND_ERR_ABORTED" ||
    (typeof candidate.message === "string" && /aborted|abort|cancell?ed/i.test(candidate.message))
  );
}

export function toError(value: unknown): Error {
  if (value instanceof Error) return value;
  if (typeof value === "string") return new Error(value);
  try {
    return new Error(JSON.stringify(value));
  } catch {
    return new Error(String(value));
  }
}

/** Lanza inmediatamente si la señal ya está abortada. */
export function throwIfAborted(signal?: AbortSignal): void {
  if (signal?.aborted) {
    throw new AbortExecutionError("Operación cancelada antes de comenzar", signal.reason);
  }
}

/** Crea una señal combinada compatible con Node >= 18 sin depender de `AbortSignal.any`. */
export function combineSignals(signals: Array<AbortSignal | undefined>): AbortSignal {
  const active = signals.filter((signal): signal is AbortSignal => Boolean(signal));
  if (active.length === 0) return new AbortController().signal;
  if (active.length === 1) return active[0]!;

  const anyFn = (AbortSignal as unknown as { any?: (s: AbortSignal[]) => AbortSignal }).any;
  if (typeof anyFn === "function") return anyFn.call(AbortSignal, active);

  const controller = new AbortController();
  for (const signal of active) {
    if (signal.aborted) {
      controller.abort(signal.reason);
      break;
    }
    signal.addEventListener("abort", () => controller.abort(signal.reason), { once: true });
  }
  return controller.signal;
}

/**
 * Carrera entre una promesa y una señal.
 *
 * Garantiza que un timeout por intento o una cancelación externa devuelvan el
 * control INMEDIATAMENTE, aunque la operación subyacente ignore la señal
 * (el `signal` sigue propagándose para que el código cooperativo se detenga).
 */
function raceWithSignal<T>(promise: Promise<T>, signal: AbortSignal, label: string): Promise<T> {
  if (signal.aborted) {
    return Promise.reject(
      signal.reason instanceof Error ? signal.reason : new AbortExecutionError(`${label} cancelada`, signal.reason),
    );
  }

  return new Promise<T>((resolve, reject) => {
    const onAbort = () => {
      const reason = signal.reason;
      if (reason instanceof Error) reject(reason);
      else reject(new AbortExecutionError(`${label} cancelada`, reason));
    };
    signal.addEventListener("abort", onAbort, { once: true });
    promise.then(
      (value) => {
        signal.removeEventListener("abort", onAbort);
        resolve(value);
      },
      (error: unknown) => {
        signal.removeEventListener("abort", onAbort);
        reject(error instanceof Error ? error : toError(error));
      },
    );
  });
}

/** Espera cancelable: si la señal se aborta, rechaza al instante. */
export function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  if (ms <= 0) return Promise.resolve();
  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(new AbortExecutionError("Espera cancelada", signal.reason));
      return;
    }
    const timer = setTimeout(() => {
      cleanup();
      resolve();
    }, ms);
    const onAbort = () => {
      clearTimeout(timer);
      cleanup();
      reject(new AbortExecutionError("Espera cancelada", signal?.reason));
    };
    const cleanup = () => signal?.removeEventListener("abort", onAbort);
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

/** Cálculo puro del backoff exponencial (exportado para tests y trazabilidad). */
export function computeBackoff(
  attempt: number,
  options: Pick<RetryOptions, "baseDelayMs" | "maxDelayMs" | "factor" | "jitter"> = {},
): number {
  const base = options.baseDelayMs ?? DEFAULT_RETRY.baseDelayMs;
  const factor = options.factor ?? DEFAULT_RETRY.factor;
  const max = options.maxDelayMs ?? DEFAULT_RETRY.maxDelayMs;
  const jitter = options.jitter ?? DEFAULT_RETRY.jitter;
  const raw = Math.min(base * factor ** Math.max(0, attempt - 1), max);
  return jitter ? Math.round(Math.random() * raw) : Math.round(raw);
}

/**
 * Ejecuta `fn` con reintentos exponenciales.
 *
 * ```ts
 * const html = await withRetry(({ signal }) => fetchHtml(url, { signal }), {
 *   label: `GET ${url}`,
 *   retries: 3,
 *   signal: controller.signal,
 * });
 * ```
 */
export async function withRetry<T>(
  fn: (context: AttemptContext) => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const retries = options.retries ?? DEFAULT_RETRY.retries;
  const maxAttempts = Math.max(1, retries + 1);
  const label = options.label ?? "operación";
  const history: unknown[] = [];

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    throwIfAborted(options.signal);

    const attemptController = new AbortController();
    const timer =
      options.timeoutMs && options.timeoutMs > 0
        ? setTimeout(() => attemptController.abort(new TimeoutExecutionError(`${label} excedió ${options.timeoutMs}ms`, options.timeoutMs!)), options.timeoutMs)
        : undefined;
    const signal = combineSignals([options.signal, attemptController.signal]);

    try {
      const result = await raceWithSignal(fn({ attempt, signal }), signal, label);
      if (timer) clearTimeout(timer);
      return result;
    } catch (error) {
      if (timer) clearTimeout(timer);
      history.push(error);

      // Cancelación explícita del consumidor: nunca se reintenta.
      if (options.signal?.aborted) {
        throw new AbortExecutionError(`${label} cancelada`, options.signal.reason);
      }

      const isUserAbort = isAbortError(error) && !(error instanceof TimeoutExecutionError);
      const retryable = !isUserAbort && (options.shouldRetry ? options.shouldRetry(error, attempt) : true);
      const isLast = attempt >= maxAttempts;

      // Los timeouts por intento sí se reintentan; los abortos del usuario no.
      if (!retryable || isLast) {
        if (history.length === 1) throw toError(error);
        throw new RetryExhaustedError(label, attempt, error, history);
      }

      const delayMs = computeBackoff(attempt, options);
      options.onRetry?.({ attempt, maxAttempts, delayMs, error, label });
      await sleep(delayMs, options.signal);
    }
  }

  throw new RetryExhaustedError(label, maxAttempts, history.at(-1), history);
}

/** Ejecuta `fn` con un timeout y soporte de cancelación, sin reintentos. */
export async function withTimeout<T>(
  fn: (signal: AbortSignal) => Promise<T>,
  timeoutMs: number,
  label = "operación",
  signal?: AbortSignal,
): Promise<T> {
  return withRetry(({ signal: attemptSignal }) => fn(attemptSignal), { retries: 0, timeoutMs, label, signal });
}
