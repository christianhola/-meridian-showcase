/**
 * Módulo de generación de activos HIPERREALISTAS (imagen + vídeo cinemático).
 *
 * Filosofía Zero Config:
 *  - Construye el payload exacto de cada proveedor (Flux / fal.ai / Replicate,
 *    Runway Gen-3, Luma Dream Machine, Sora-style HTTP) SIN llamar a ninguna API.
 *  - Si no hay credenciales => `mode: "simulation"`: escribe artefactos reales
 *    (PNG procedural + manifiesto JSON + storyboard) y termina con éxito.
 *  - Si hay credenciales => `mode: "live"`: envía la petición real con reintentos
 *    exponenciales y cancelación por `AbortSignal`.
 *
 * Ejecutable directo:
 *   npm run test:media
 *   npm run test:media -- --provider=fal-flux-ultra --prompt="..." --ratio=21:9
 *   npm run test:media -- --video --provider=runway-gen3 --duration=8
 */

import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { createLogger } from "../core/logger.js";
import { DEFAULT_MEDIA_DIR, ensureDir, hasFlag, parseFlags, readEnv } from "../core/config.js";
import { isAbortError, withRetry } from "../core/retry.js";
import { renderPreviewPng } from "./png.js";

export type MediaKind = "image" | "video";
export type AspectRatio = "16:9" | "21:9" | "9:16" | "4:5" | "1:1";
export type CameraMotion =
  | "static"
  | "slow-push-in"
  | "dolly-out"
  | "orbit-left"
  | "orbit-right"
  | "crane-up"
  | "handheld-follow"
  | "dolly-zoom";

export type HyperrealStyle =
  | "documentary-35mm"
  | "editorial-catalog"
  | "cinematic-anamorphic"
  | "product-studio"
  | "golden-hour-lifestyle"
  | "macro-detail";

const STYLE_PROFILES: Record<HyperrealStyle, { image: string[]; video: string[] }> = {
  "documentary-35mm": {
    image: ["shot on 35mm film", "natural light", "visible micro-detail", "shallow depth of field", "editorial realism"],
    video: ["handheld 35mm", "natural practical lighting", "subtle film grain", "authentic motion blur"],
  },
  "editorial-catalog": {
    image: ["high-end e-commerce photography", "seamless backdrop", "softbox key light", "true-to-life color science", "8k detail"],
    video: ["locked-off studio camera", "turntable motion", "precise product focus rack", "clean background"],
  },
  "cinematic-anamorphic": {
    image: ["anamorphic lens", "teal and amber color grading", "volumetric light", "blockbuster key art", "photoreal skin texture"],
    video: ["anamorphic 2.39:1", "volumetric haze", "dramatic rim light", "cinematic camera move", "24fps motion cadence"],
  },
  "product-studio": {
    image: ["studio product shot", "controlled reflections", "gradient backdrop", "macro-level material fidelity", "commercial retouch"],
    video: ["motorized slider", "clean reveal", "specular highlights in motion", "stable product hero framing"],
  },
  "golden-hour-lifestyle": {
    image: ["golden hour backlight", "lens flare", "candid human emotion", "authentic skin pores", "warm color grading"],
    video: ["golden hour sun flare", "slow motion 120fps", "candid subject behavior", "atmospheric dust particles"],
  },
  "macro-detail": {
    image: ["extreme macro", "focus stacking", "micro-texture", "studio strobe", "scientific realism"],
    video: ["macro probe lens", "ultra slow rack focus", "micro dust particles", "hyper-detail surface glide"],
  },
};

const CAMERA_LANGUAGE: Record<CameraMotion, string> = {
  static: "camera locked on tripod, no movement",
  "slow-push-in": "slow dolly push-in, smooth and stabilized",
  "dolly-out": "slow dolly out revealing the environment",
  "orbit-left": "smooth orbit to the left around the subject",
  "orbit-right": "smooth orbit to the right around the subject",
  "crane-up": "crane rising vertically, grand reveal",
  "handheld-follow": "handheld follow shot, organic micro-shake",
  "dolly-zoom": "vertigo dolly zoom with background compression",
};

const NEGATIVE_PROMPT_BASE = [
  "cartoon",
  "cgi plastic look",
  "illustration",
  "painting",
  "waxy skin",
  "extra fingers",
  "deformed hands",
  "blurry",
  "low resolution",
  "jpeg artifacts",
  "text artifacts",
  "watermark",
  "over-saturated hdr",
  "duplicated limbs",
];

export interface MediaRequest {
  kind: MediaKind;
  prompt: string;
  negativePrompt?: string;
  aspectRatio?: AspectRatio;
  style?: HyperrealStyle;
  seed?: number;
  /** Difusión (Flux): pasos de inferencia. */
  steps?: number;
  /** Difusión (Flux): escala de guía CFG. */
  guidance?: number;
  /** Vídeo: duración en segundos. */
  durationSeconds?: number;
  cameraMotion?: CameraMotion;
  /** Vídeo: intensidad del movimiento, 0..1. */
  motionIntensity?: number;
  /** FPS objetivo del vídeo. */
  fps?: number;
  /** Ruta de salida del artefacto principal. */
  outputPath?: string;
  /** Contexto opcional derivado del grafo de memoria MCP. */
  memoryContext?: string[];
}

export interface HyperrealPrompt {
  positive: string;
  negative: string;
  camera: string;
  styleProfile: HyperrealStyle;
  tokens: string[];
}

export interface ProviderPayload {
  provider: string;
  endpoint: string;
  method: "POST";
  headers: Record<string, string>;
  body: Record<string, unknown>;
  /** Documentación del payload para auditoría. */
  notes: string[];
}

export interface MediaAsset {
  type: "image" | "video";
  localPath?: string;
  url?: string;
  mimeType: string;
  bytes?: number;
}

export interface MediaResult {
  provider: string;
  kind: MediaKind;
  mode: "live" | "simulation";
  status: "succeeded" | "failed" | "prepared";
  jobId: string;
  latencyMs: number;
  prompt: HyperrealPrompt;
  payload: ProviderPayload;
  assets: MediaAsset[];
  manifestPath?: string;
  storyboardPath?: string;
  notes: string[];
  error?: string;
}

export interface ProviderBuildInput {
  request: MediaRequest;
  prompt: HyperrealPrompt;
  seed: number;
  ratio: AspectRatio;
}

export interface MediaProvider {
  id: string;
  label: string;
  kind: MediaKind;
  /** Variables de entorno aceptadas (la primera presente gana). */
  envKeys: string[];
  docs: string;
  /** Endpoint REST real que se usaría en modo live. */
  endpoint: string;
  /** Cómo se inyecta la credencial. */
  auth: (key: string) => Record<string, string>;
  /** Payload específico del proveedor, ya enriquecido con el prompt hiperrealista. */
  build: (input: ProviderBuildInput) => Record<string, unknown>;
  /** Extrae las URLs de los activos de la respuesta del proveedor. */
  parseAssets?: (response: unknown) => MediaAsset[];
}

export const PROVIDERS: Record<string, MediaProvider> = {
  "fal-flux-ultra": {
    id: "fal-flux-ultra",
    label: "fal.ai · FLUX 1.1 Pro Ultra (súper realista)",
    kind: "image",
    envKeys: ["FAL_KEY", "FAL_API_KEY"],
    docs: "https://fal.ai/models/fal-ai/flux-pro/v1.1-ultra/api",
    endpoint: "https://fal.run/fal-ai/flux-pro/v1.1-ultra",
    auth: (key) => ({ authorization: `Key ${key}`, "content-type": "application/json" }),
    build: ({ request, prompt, seed, ratio }) => ({
      prompt: prompt.positive,
      negative_prompt: prompt.negative,
      aspect_ratio: ratio,
      seed,
      num_images: 1,
      output_format: "jpeg",
      raw: false,
      safety_tolerance: "2",
      ...(request.steps ? { num_inference_steps: request.steps } : {}),
      ...(request.guidance ? { guidance_scale: request.guidance } : {}),
    }),
    parseAssets: (response) => {
      const images = (response as { images?: Array<{ url?: string; content_type?: string }> } | undefined)?.images ?? [];
      return images
        .filter((image) => typeof image.url === "string")
        .map((image) => ({ type: "image", url: image.url!, mimeType: image.content_type ?? "image/jpeg" }));
    },
  },

  "replicate-flux-pro": {
    id: "replicate-flux-pro",
    label: "Replicate · black-forest-labs/flux-1.1-pro",
    kind: "image",
    envKeys: ["REPLICATE_API_TOKEN"],
    docs: "https://replicate.com/black-forest-labs/flux-1.1-pro/api",
    endpoint: "https://api.replicate.com/v1/models/black-forest-labs/flux-1.1-pro/predictions",
    auth: (key) => ({
      authorization: `Bearer ${key}`,
      "content-type": "application/json",
      prefer: "wait=60",
    }),
    build: ({ request, prompt, seed, ratio }) => ({
      input: {
        prompt: prompt.positive,
        aspect_ratio: ratio,
        seed,
        output_format: "jpg",
        safety_tolerance: 2,
        ...(request.steps ? { num_inference_steps: request.steps } : {}),
        ...(request.guidance ? { guidance: request.guidance } : {}),
      },
    }),
    parseAssets: (response) => {
      const output = (response as { output?: string | string[] } | undefined)?.output;
      const urls = Array.isArray(output) ? output : output ? [output] : [];
      return urls
        .filter((url): url is string => typeof url === "string")
        .map((url) => ({ type: "image", url, mimeType: "image/jpeg" }));
    },
  },

  "runway-gen3": {
    id: "runway-gen3",
    label: "Runway · Gen-3 Alpha Turbo (vídeo cinemático)",
    kind: "video",
    envKeys: ["RUNWAY_API_KEY", "RUNWAYML_API_SECRET"],
    docs: "https://docs.dev.runwayml.com/api-details/endpoints/text-to-video/",
    endpoint: "https://api.dev.runwayml.com/v1/text_to_video",
    auth: (key) => ({
      authorization: `Bearer ${key}`,
      "content-type": "application/json",
      "x-runway-version": "2024-11-06",
    }),
    build: ({ request, prompt, seed, ratio }) => ({
      model: readEnv("RUNWAY_MODEL") ?? "gen3a_turbo",
      promptText: `${prompt.positive}${request.cameraMotion ? ` | camera: ${CAMERA_LANGUAGE[request.cameraMotion]}` : ""}`,
      ratio: ratio === "9:16" ? "768:1280" : ratio === "1:1" ? "768:768" : "1280:768",
      duration: (request.durationSeconds ?? 5) > 5 ? 10 : 5,
      seed,
      watermark: false,
    }),
  },

  "luma-dream-machine": {
    id: "luma-dream-machine",
    label: "Luma · Dream Machine / Ray (vídeo cinemático)",
    kind: "video",
    envKeys: ["LUMAAI_API_KEY", "LUMAAI_API_SECRET", "LUMA_API_KEY"],
    docs: "https://docs.lumalabs.ai/docs/api",
    endpoint: "https://api.lumalabs.ai/dream-machine/v1/generations",
    auth: (key) => ({ authorization: `Bearer ${key}`, "content-type": "application/json" }),
    build: ({ request, prompt, ratio }) => ({
      model: readEnv("LUMA_MODEL") ?? "ray-2",
      prompt: prompt.positive,
      aspect_ratio: ratio,
      duration: `${(request.durationSeconds ?? 5) > 5 ? 9 : 5}s`,
      loop: false,
      ...(request.cameraMotion
        ? { keyframes: { frame0: { type: "prompt", prompt: CAMERA_LANGUAGE[request.cameraMotion] } } }
        : {}),
    }),
  },
};

/** Paleta de acento por proveedor: hace que cada PNG de simulación sea reconocible. */
const ACCENTS: Record<string, [number, number, number]> = {
  "fal-flux-ultra": [255, 138, 61],
  "replicate-flux-pro": [88, 166, 255],
  "runway-gen3": [45, 212, 191],
  "luma-dream-machine": [167, 139, 250],
};

/** Construye el prompt hiperrealista final combinando sujeto + estilo + cámara. */
export function buildHyperrealPrompt(request: MediaRequest): HyperrealPrompt {
  const style = request.style ?? (request.kind === "video" ? "cinematic-anamorphic" : "documentary-35mm");
  const profile = STYLE_PROFILES[style];
  const camera = CAMERA_LANGUAGE[request.cameraMotion ?? (request.kind === "video" ? "slow-push-in" : "static")];

  const technical =
    request.kind === "video"
      ? [
          profile.video.join(", "),
          camera,
          `${request.fps ?? 24}fps`,
          `${request.durationSeconds ?? 5}s continuous take`,
          request.motionIntensity !== undefined ? `motion intensity ${request.motionIntensity.toFixed(2)}` : "natural motion",
          "photoreal, no cgi artifacts",
        ]
      : [
          profile.image.join(", "),
          camera,
          "photorealistic",
          "ultra-detailed",
          "sharp focus",
          "physically accurate lighting",
          "high dynamic range without halos",
        ];

  const memoryContext = request.memoryContext?.filter(Boolean) ?? [];
  const tokens = [request.prompt.trim(), ...technical, ...memoryContext].filter((token) => token.length > 0);
  const positive = tokens.join(", ").replace(/\s+/g, " ").slice(0, 1_800);
  const negative = [request.negativePrompt, ...NEGATIVE_PROMPT_BASE].filter(Boolean).join(", ");

  return { positive, negative, camera, styleProfile: style, tokens };
}

/** Determinismo: mismo prompt => mismo seed (si no se especifica). */
export function deriveSeed(prompt: string, kind: MediaKind): number {
  let hash = 2166136261;
  for (const char of `${kind}:${prompt}`) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash) % 2_147_483_647;
}

export function detectCredentials(provider: MediaProvider): string | undefined {
  return readEnv(...provider.envKeys);
}

export interface GenerateOptions {
  signal?: AbortSignal;
  retries?: number;
  timeoutMs?: number;
  /** Fuerza simulación aunque existan credenciales. */
  simulate?: boolean;
  /** Directorio de artefactos. */
  outputDir?: string;
  persist?: boolean;
}

function ratioToDimensions(ratio: AspectRatio, base = 1024): { width: number; height: number } {
  const [w, h] = ratio.split(":").map(Number) as [number, number];
  if (ratio === "21:9") return { width: base + 256, height: Math.round((base + 256) * (h / w)) };
  return { width: base, height: Math.round((base * h) / w) };
}

/**
 * Genera (o prepara) un activo hiperrealista.
 * Nunca lanza excepción por falta de credenciales: cae a simulación limpia.
 */
export async function generateMedia(request: MediaRequest, options: GenerateOptions = {}): Promise<MediaResult> {
  const logger = createLogger("media:generator");
  const kind = request.kind ?? "image";
  const providerId =
    (kind === "video" ? readEnv("MERIDIAN_VIDEO_PROVIDER") ?? "runway-gen3" : readEnv("MERIDIAN_IMAGE_PROVIDER") ?? "fal-flux-ultra");
  const provider = PROVIDERS[providerId] ?? PROVIDERS[kind === "video" ? "runway-gen3" : "fal-flux-ultra"]!;
  const ratio: AspectRatio = request.aspectRatio ?? (kind === "video" ? "16:9" : "4:5");
  const seed = request.seed ?? deriveSeed(request.prompt, kind);
  const prompt = buildHyperrealPrompt({ ...request, kind });
  const apiKey = options.simulate ? undefined : detectCredentials(provider);
  const mode: MediaResult["mode"] = apiKey ? "live" : "simulation";
  const payload: ProviderPayload = {
    provider: provider.id,
    endpoint: provider.endpoint,
    method: "POST",
    headers: { ...provider.auth(apiKey ?? "<API_KEY_OPCIONAL>"), ...(apiKey ? {} : { "x-meridian-mode": "simulation" }) },
    body: provider.build({ request: { ...request, kind }, prompt, seed, ratio }),
    notes: [
      `Autenticación: ${provider.envKeys.join(" | ")}`,
      `Doc: ${provider.docs}`,
      `Modo: ${mode}`,
      "El payload es 100% válido: al inyectar una API Key se envía tal cual.",
    ],
  };

  const outputDir = ensureDir(options.outputDir ?? DEFAULT_MEDIA_DIR);
  const jobId = `${provider.id}-${seed.toString(36)}-${Date.now().toString(36)}`;
  const startedAt = Date.now();

  logger.step("preparando activo hiperrealista", { provider: provider.id, kind, mode, ratio, seed });
  logger.debug("prompt hiperrealista", { positive: prompt.positive.slice(0, 200), negative: prompt.negative.slice(0, 120), camera: prompt.camera });

  const baseResult: MediaResult = {
    provider: provider.id,
    kind,
    mode,
    status: mode === "live" ? "failed" : "prepared",
    jobId,
    latencyMs: 0,
    prompt,
    payload,
    assets: [],
    notes: payload.notes,
  };

  if (mode === "simulation") {
    const result = await simulateGeneration(baseResult, { ...request, kind }, { outputDir, seed, ratio, logger });
    result.latencyMs = Date.now() - startedAt;
    return result;
  }

  // ── MODO LIVE: petición real con backoff exponencial y cancelación ────────
  try {
    const response = await withRetry(
      async ({ signal }) => {
        const res = await fetch(provider.endpoint, {
          method: "POST",
          headers: payload.headers,
          body: JSON.stringify(payload.body),
          signal,
        });
        if (!res.ok) {
          const detail = await res.text().catch(() => "");
          const retryable = res.status >= 500 || res.status === 429;
          const error = new Error(`${provider.id} respondió ${res.status}: ${detail.slice(0, 200)}`);
          (error as Error & { retryable?: boolean }).retryable = retryable;
          throw error;
        }
        return (await res.json()) as unknown;
      },
      {
        retries: options.retries ?? 3,
        baseDelayMs: 600,
        maxDelayMs: 8_000,
        timeoutMs: options.timeoutMs ?? 120_000,
        signal: options.signal,
        label: `generate ${provider.id}`,
        shouldRetry: (error) => (error as { retryable?: boolean }).retryable !== false,
        onRetry: (info) =>
          logger.warn("reintentando generación (backoff exponencial)", {
            attempt: info.attempt,
            delayMs: info.delayMs,
            reason: (info.error as Error).message.slice(0, 120),
          }),
      },
    );

    const assets = provider.parseAssets?.(response) ?? [];
    const result: MediaResult = {
      ...baseResult,
      status: "succeeded",
      latencyMs: Date.now() - startedAt,
      assets,
      jobId: (response as { id?: string; request_id?: string }).id ?? (response as { request_id?: string }).request_id ?? jobId,
      notes: [...payload.notes, `Activos remotos: ${assets.length}`],
    };
    const manifestPath = await persistManifest(result, outputDir, logger);
    result.manifestPath = manifestPath;
    logger.success("activo remoto generado", { provider: provider.id, assets: assets.length, ms: result.latencyMs });
    return result;
  } catch (error) {
    if (isAbortError(error)) throw error;
    const result: MediaResult = {
      ...baseResult,
      status: "failed",
      latencyMs: Date.now() - startedAt,
      error: (error as Error).message,
      notes: [...payload.notes, "Fallo en modo live: usa simulación (sin API Key) para el flujo Zero Config."],
    };
    await persistManifest(result, outputDir, logger).catch(() => undefined);
    logger.warn("generación live fallida; el payload queda documentado", { error: (error as Error).message });
    return result;
  }
}

interface SimulationContext {
  outputDir: string;
  seed: number;
  ratio: AspectRatio;
  logger: ReturnType<typeof createLogger>;
}

/** Simulación limpia: artefactos reales en disco + payload listo para producción. */
async function simulateGeneration(
  base: MediaResult,
  request: MediaRequest,
  context: SimulationContext,
): Promise<MediaResult> {
  const { outputDir, seed, ratio, logger } = context;
  const notes = [...base.notes, "Modo simulación: no se consumió ninguna API de pago."];
  const assets: MediaAsset[] = [];
  let storyboardPath: string | undefined;

  if (base.kind === "image") {
    const dimensions = ratioToDimensions(ratio);
    const png = renderPreviewPng({
      width: dimensions.width,
      height: dimensions.height,
      seed,
      accent: ACCENTS[base.provider] ?? [255, 138, 61],
      label: request.prompt,
    });
    const localPath = join(outputDir, `${base.jobId}.png`);
    await writeFile(localPath, png);
    assets.push({ type: "image", localPath, mimeType: "image/png", bytes: png.byteLength });
    logger.info("vista previa procedural generada", { path: localPath, kb: Math.round(png.byteLength / 1024), dimensions: `${dimensions.width}x${dimensions.height}` });
  } else {
    storyboardPath = join(outputDir, `${base.jobId}.storyboard.md`);
    const storyboard = buildStoryboard(base, request);
    await writeFile(storyboardPath, storyboard, "utf8");
    assets.push({
      type: "video",
      localPath: storyboardPath,
      mimeType: "text/markdown",
      bytes: Buffer.byteLength(storyboard),
    });
    logger.info("storyboard cinemático generado", { path: storyboardPath });
  }

  const result: MediaResult = { ...base, status: "prepared", assets, notes, storyboardPath };
  result.manifestPath = await persistManifest(result, outputDir, logger);
  return result;
}

function buildStoryboard(result: MediaResult, request: MediaRequest): string {
  const shots = [
    ["00:00–00:01", "Establecimiento", "Plano general del sujeto con luz ambiental; el espectador entiende el contexto."],
    ["00:01–00:03", result.prompt.camera, "Movimiento de cámara principal con foco continuo sobre el sujeto."],
    ["00:03–00:04", "Detalle macro", "Inserción de micro-textura: poros, fibras o reflejos especulares."],
    [request.durationSeconds && request.durationSeconds > 5 ? "00:04–00:08" : "00:04–00:05", "Resolución", "El movimiento desacelera y cierra con composición limpia."],
  ];

  return [
    `# Storyboard cinemático · ${result.provider}`,
    "",
    `- **Job:** \`${result.jobId}\``,
    `- **Proveedor objetivo:** ${result.provider} (${result.mode === "simulation" ? "modo simulación" : "modo live"})`,
    `- **Duración:** ${request.durationSeconds ?? 5}s · **FPS:** ${request.fps ?? 24} · **Formato:** ${request.aspectRatio ?? "16:9"}`,
    `- **Movimiento de cámara:** ${request.cameraMotion ?? "slow-push-in"}`,
    "",
    "## Prompt positivo (listo para producir)",
    "",
    "```text",
    result.prompt.positive,
    "```",
    "",
    "## Prompt negativo",
    "",
    "```text",
    result.prompt.negative,
    "```",
    "",
    "## Planos",
    "",
    "| Tiempo | Plano | Acción |",
    "| --- | --- | --- |",
    ...shots.map(([time, shot, action]) => `| ${time} | ${shot} | ${action} |`),
    "",
    "## Notas de producción",
    "",
    ...result.notes.map((note) => `- ${note}`),
    "",
  ].join("\n");
}

async function persistManifest(result: MediaResult, outputDir: string, logger: ReturnType<typeof createLogger>): Promise<string> {
  const path = join(outputDir, `${result.jobId}.manifest.json`);
  const manifest = {
    ...result,
    generatedAt: new Date().toISOString(),
    zeroConfigNotice:
      result.mode === "simulation"
        ? "Sin API Key: se documentó el payload y se generó un artefacto local determinista."
        : "Petición enviada a la API real.",
  };
  await writeFile(path, JSON.stringify(manifest, null, 2), "utf8");
  logger.debug("manifiesto escrito", { path });
  return path;
}

/** Matriz de proveedores: qué está configurado y qué no (para reportes y CLI). */
export function providerMatrix(): Array<{ id: string; label: string; kind: MediaKind; configured: boolean; envKeys: string[]; docs: string }> {
  return Object.values(PROVIDERS).map((provider) => ({
    id: provider.id,
    label: provider.label,
    kind: provider.kind,
    configured: Boolean(detectCredentials(provider)),
    envKeys: provider.envKeys,
    docs: provider.docs,
  }));
}

/** Paquete de demostración: 1 imagen hiperrealista + 1 vídeo cinemático. */
export async function runMediaDemo(argv: readonly string[] = process.argv.slice(2)): Promise<MediaResult[]> {
  const flags = parseFlags(argv);
  const customPrompt = typeof flags["prompt"] === "string" ? (flags["prompt"] as string) : undefined;
  const ratio = (typeof flags["ratio"] === "string" ? (flags["ratio"] as string) : "4:5") as AspectRatio;
  const duration = typeof flags["duration"] === "string" ? Number(flags["duration"]) : 8;
  const results: MediaResult[] = [];

  const imageRequest: MediaRequest = {
    kind: "image",
    prompt:
      customPrompt ??
      "retrato editorial de un ingeniero de software en su estudio a medianoche, luz práctica de monitor mezclada con tungsteno cálido, sudor sutil en la piel, textura de poros visible",
    aspectRatio: ratio,
    style: "documentary-35mm",
    memoryContext: ["Meridian MCP Sandbox", "resolución 8k", "sin artefactos de IA"],
  };

  const videoRequest: MediaRequest = {
    kind: "video",
    prompt:
      customPrompt ??
      "dron cinematográfico sobre una ciudad costera al amanecer, niebla baja entre rascacielos, luz volumétrica atravesando el vapor marino, olas rompiendo con espuma detallada",
    aspectRatio: "16:9",
    style: "cinematic-anamorphic",
    cameraMotion: "crane-up",
    durationSeconds: Number.isFinite(duration) ? duration : 8,
    fps: 24,
    motionIntensity: 0.35,
  };

  if (!hasFlag(flags, "video-only")) results.push(await generateMedia(imageRequest, { simulate: hasFlag(flags, "simulate") }));
  if (!hasFlag(flags, "image-only")) results.push(await generateMedia(videoRequest, { simulate: hasFlag(flags, "simulate") }));
  return results;
}

async function main(): Promise<void> {
  const logger = createLogger("media:cli");
  const flags = parseFlags();
  const explicitProvider = typeof flags["provider"] === "string" ? (flags["provider"] as string) : undefined;

  process.stdout.write(`\nMeridian Media Studio · proveedores disponibles\n`);
  for (const provider of providerMatrix()) {
    const mark = provider.configured ? "● live" : "○ simulación";
    process.stdout.write(`  ${mark.padEnd(14)} ${provider.id.padEnd(24)} ${provider.kind.padEnd(5)} ${provider.label}\n`);
  }

  if (explicitProvider) {
    process.env[PROVIDERS[explicitProvider]?.kind === "video" ? "MERIDIAN_VIDEO_PROVIDER" : "MERIDIAN_IMAGE_PROVIDER"] = explicitProvider;
  }

  const results = await runMediaDemo();
  process.stdout.write(`\nResultados\n`);
  for (const result of results) {
    process.stdout.write(
      `  ${result.status === "prepared" ? "✔" : result.status === "succeeded" ? "✔" : "✖"} ${result.provider} · ${result.kind} · modo=${result.mode} · ${result.latencyMs}ms\n`,
    );
    for (const asset of result.assets) {
      process.stdout.write(`      ↳ ${asset.localPath ?? asset.url} (${asset.mimeType}${asset.bytes ? `, ${Math.round(asset.bytes / 1024)} KB` : ""})\n`);
    }
    if (result.error) process.stdout.write(`      ! ${result.error}\n`);
  }

  const configured = providerMatrix().filter((provider) => provider.configured).length;
  logger.success("demo de medios completada", {
    generados: results.length,
    proveedoresLive: configured,
    modo: configured > 0 ? "live disponible" : "simulación (sin API Keys: correcto en Zero Config)",
  });
}

const invokedDirectly = process.argv[1] ? /generator\.(ts|js|mjs)$/.test(process.argv[1]) : false;
if (invokedDirectly) {
  await main();
}
