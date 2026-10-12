/**
 * Pruebas del módulo hiperrealista: construcción de prompts, seeds deterministas,
 * payloads por proveedor y fallback de simulación Zero Config.
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  PROVIDERS,
  buildHyperrealPrompt,
  deriveSeed,
  generateMedia,
  providerMatrix,
} from "./generator.js";
import { encodePng, renderPreview } from "./png.js";

describe("buildHyperrealPrompt", () => {
  it("inyecta lenguaje técnico de cámara y estilo para vídeo", () => {
    const prompt = buildHyperrealPrompt({
      kind: "video",
      prompt: "dron sobre una costa al amanecer",
      style: "cinematic-anamorphic",
      cameraMotion: "crane-up",
    });
    assert.equal(prompt.styleProfile, "cinematic-anamorphic");
    assert.match(prompt.positive, /crane rising vertically/);
    assert.match(prompt.positive, /anamorphic/i);
    assert.match(prompt.negative, /cgi|cartoon/i);
  });

  it("es determinista para entradas idénticas", () => {
    const request = { kind: "image" as const, prompt: "retrato editorial" };
    assert.equal(buildHyperrealPrompt(request).positive, buildHyperrealPrompt(request).positive);
  });

  it("trunca prompts desmesurados manteniéndolos válidos", () => {
    const prompt = buildHyperrealPrompt({ kind: "image", prompt: "x".repeat(5_000) });
    assert.ok(prompt.positive.length <= 1_800);
  });
});

describe("deriveSeed", () => {
  it("es estable y distinto por tipo de medio", () => {
    assert.equal(deriveSeed("mismo texto", "image"), deriveSeed("mismo texto", "image"));
    assert.notEqual(deriveSeed("mismo texto", "image"), deriveSeed("mismo texto", "video"));
    assert.ok(deriveSeed("mismo texto", "image") >= 0);
  });
});

describe("payloads de proveedores", () => {
  it("todos los proveedores producen un payload JSON serializable con endpoint https", () => {
    for (const provider of Object.values(PROVIDERS)) {
      const prompt = buildHyperrealPrompt({ kind: provider.kind, prompt: "sujeto de prueba" });
      const body = provider.build({
        request: { kind: provider.kind, prompt: "sujeto de prueba", durationSeconds: 8 },
        prompt,
        seed: 42,
        ratio: "16:9",
      });
      assert.ok(provider.endpoint.startsWith("https://"), `${provider.id} sin endpoint https`);
      assert.doesNotThrow(() => JSON.stringify(body), `${provider.id} no serializa`);
      assert.ok(Object.keys(body).length > 0, `${provider.id} genera payload vacío`);
    }
  });

  it("la matriz de proveedores refleja el estado de credenciales", () => {
    const matrix = providerMatrix();
    assert.equal(matrix.length, Object.keys(PROVIDERS).length);
    assert.ok(matrix.every((provider) => provider.envKeys.length > 0));
  });
});

describe("generateMedia (Zero Config)", () => {
  it("cae a simulación sin API Key y escribe un PNG válido", async () => {
    const result = await generateMedia(
      { kind: "image", prompt: "prueba automática de simulación", aspectRatio: "1:1" },
      { simulate: true, outputDir: "output/test-media" },
    );
    assert.equal(result.mode, "simulation");
    assert.equal(result.status, "prepared");
    assert.equal(result.assets.length, 1);
    assert.equal(result.assets[0]?.mimeType, "image/png");
    assert.ok(result.manifestPath, "debe escribir el manifiesto con el payload real");
    assert.ok(result.payload.body, "el payload debe quedar documentado para producción");
  });

  it("genera un storyboard para vídeo", async () => {
    const result = await generateMedia(
      { kind: "video", prompt: "prueba de vídeo", cameraMotion: "orbit-left", durationSeconds: 8 },
      { simulate: true, outputDir: "output/test-media" },
    );
    assert.equal(result.kind, "video");
    assert.equal(result.assets[0]?.mimeType, "text/markdown");
    assert.match(String(result.assets[0]?.localPath), /storyboard\.md$/);
  });
});

describe("codificador PNG", () => {
  it("emite la firma PNG y el tamaño esperado de píxeles", () => {
    const image = renderPreview({ width: 32, height: 16, seed: 7 });
    assert.equal(image.pixels.length, 32 * 16 * 3);
    const png = encodePng(image);
    assert.deepEqual([...png.subarray(0, 8)], [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    assert.ok(png.includes(Buffer.from("IHDR", "ascii")));
    assert.ok(png.includes(Buffer.from("IEND", "ascii")));
  });
});
