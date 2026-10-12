/**
 * Codificador PNG mínimo (sin dependencias) usado por el modo simulación.
 *
 * Permite que `npm run test:media` genere artefactos visuales REALES
 * (una "hoja de contacto" procedural) aunque no exista ninguna API Key,
 * manteniendo la promesa Zero Config.
 */

import { deflateSync } from "node:zlib";

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buffer: Uint8Array): number {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = CRC_TABLE[(crc ^ byte) & 0xff]! ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type: string, data: Uint8Array): Buffer {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const typeBytes = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBytes, data])), 0);
  return Buffer.concat([length, typeBytes, Buffer.from(data), crc]);
}

export interface RgbImage {
  width: number;
  height: number;
  /** Buffer RGB (3 bytes por píxel, longitud = width * height * 3). */
  pixels: Uint8Array;
}

/** Codifica una imagen RGB a PNG (color type 2, 8 bits por canal). */
export function encodePng(image: RgbImage): Buffer {
  const { width, height, pixels } = image;
  const stride = width * 3;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y += 1) {
    raw[y * (stride + 1)] = 0; // filtro "None"
    Buffer.from(pixels.buffer, pixels.byteOffset + y * stride, stride).copy(raw, y * (stride + 1) + 1);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // profundidad de bits
  ihdr[9] = 2; // color type: truecolor
  ihdr[10] = 0; // compresión deflate
  ihdr[11] = 0; // filtro estándar
  ihdr[12] = 0; // sin entrelazado

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", new Uint8Array(0)),
  ]);
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface PreviewOptions {
  width?: number;
  height?: number;
  seed?: number;
  /** Título textual quemado como "bandas" (no hay renderizado de fuentes). */
  accent?: [number, number, number];
  label?: string;
}

/**
 * Genera una vista previa procedural determinista: un gradiente cinemático
 * con bandas horizontales que codifican el hash del prompt. Determinista por seed.
 */
export function renderPreview(options: PreviewOptions = {}): RgbImage {
  const width = options.width ?? 768;
  const height = options.height ?? 432;
  const seed = options.seed ?? 42;
  const random = mulberry32(seed);
  const accent = options.accent ?? [255, 138, 61];

  const label = options.label ?? "";
  const bands: Array<{ y: number; h: number }> = [];
  const bandCount = 5;
  for (let i = 0; i < bandCount; i += 1) {
    const h = 2 + Math.floor(random() * 6);
    bands.push({ y: Math.floor(((i + 0.5) / bandCount) * height), h });
  }
  const labelBits = Array.from(label).map((char) => char.charCodeAt(0));

  const pixels = new Uint8Array(width * height * 3);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const nx = x / width;
      const ny = y / height;
      const vignette = 1 - 0.55 * Math.hypot(nx - 0.5, ny - 0.5) * 2;
      const light = Math.pow(vignette, 1.4);
      const horizon = Math.exp(-Math.pow((ny - 0.62) * 5.5, 2));
      // Grano de bajo consumo entrópico: patrón determinista (mejor compresión PNG).
      const grain = ((x * 7 + y * 13) % 5) - 2;

      const r = 18 + light * 46 + horizon * accent[0] * 0.45 + nx * 26 + grain;
      const g = 22 + light * 40 + horizon * accent[1] * 0.3 + nx * 12 + grain;
      const b = 34 + light * 58 + horizon * accent[2] * 0.18 + (1 - nx) * 34 + grain;

      const index = (y * width + x) * 3;
      pixels[index] = Math.max(0, Math.min(255, Math.round(r)));
      pixels[index + 1] = Math.max(0, Math.min(255, Math.round(g)));
      pixels[index + 2] = Math.max(0, Math.min(255, Math.round(b)));
    }
  }

  // "Bandas" de datos: codifican el hash del prompt/seed como una firma visual reproducible.
  bands.forEach((band, bandIndex) => {
    const depth = 30 + ((seed >> (bandIndex * 3)) & 0x3f);
    for (let y = band.y; y < Math.min(height, band.y + band.h); y += 1) {
      for (let x = 0; x < width; x += 1) {
        const index = (y * width + x) * 3;
        pixels[index] = Math.min(255, pixels[index]! + depth);
        pixels[index + 1] = Math.min(255, pixels[index + 1]! + Math.round(depth * 0.6));
        pixels[index + 2] = Math.max(0, pixels[index + 2]! - 12);
      }
    }
  });

  // Marca discreta en la esquina: barras verticales derivadas del texto.
  labelBits.slice(0, 32).forEach((code, position) => {
    const barHeight = 6 + (code % 24);
    const x = 12 + position * 8;
    for (let y = height - 14 - barHeight; y < height - 14; y += 1) {
      if (x >= width) continue;
      const index = (y * width + x) * 3;
      pixels[index] = 236;
      pixels[index + 1] = 238;
      pixels[index + 2] = 242;
    }
  });

  return { width, height, pixels };
}

/** PNG de vista previa listo para escribir a disco. */
export function renderPreviewPng(options: PreviewOptions = {}): Buffer {
  return encodePng(renderPreview(options));
}
