// Proses logo dari folder logo/ → public/brand/*.webp (latar putih → transparan, trim, resize)
// Jalankan: node scripts/process-logos.mjs
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const SRC = new URL("../logo/", import.meta.url);
const OUT = new URL("../public/brand/", import.meta.url);
mkdirSync(OUT, { recursive: true });

/** "Color to alpha" terhadap putih: piksel putih → transparan, bayangan abu → semi-transparan (tanpa halo). */
async function whiteToAlpha(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const a = Math.max(255 - r, 255 - g, 255 - b) / 255; // seberapa jauh dari putih
    if (a < 0.02) {
      data[i + 3] = 0;
      continue;
    }
    // un-premultiply terhadap putih agar warna tetap pekat
    data[i] = Math.round((r - 255 * (1 - a)) / a);
    data[i + 1] = Math.round((g - 255 * (1 - a)) / a);
    data[i + 2] = Math.round((b - 255 * (1 - a)) / a);
    data[i + 3] = Math.round(a * (data[i + 3] / 255) * 255);
  }
  return sharp(data, { raw: info });
}

async function save(img, name, maxSide) {
  const buf = await img.png().toBuffer();
  const trimmed = sharp(buf).trim({ threshold: 1 });
  const meta = await trimmed.clone().png().toBuffer({ resolveWithObject: true });
  await sharp(meta.data)
    .resize({ width: maxSide, height: maxSide, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 90, alphaQuality: 100, effort: 6 })
    .toFile(new URL(name, OUT).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
  const out = await sharp(new URL(name, OUT).pathname.replace(/^\/([A-Za-z]:)/, "$1")).metadata();
  console.log(`✓ ${name} ${out.width}x${out.height}`);
}

const p = (f) => decodeURIComponent(new URL(f, SRC).pathname).replace(/^\/([A-Za-z]:)/, "$1");

// Logo divisi
for (const code of ["EB", "TI", "TE", "BE", "MD", "SP"]) {
  await save(await whiteToAlpha(p(`${code}.png`)), `div-${code.toLowerCase()}.webp`, 400);
}

// Logo utama (lengkap) + mark saja (bagian daun, ±45% kiri)
const full = await whiteToAlpha(p("Logo TSA IPB.png"));
const fullPng = await full.png().toBuffer();
await save(sharp(fullPng), "logo-tsa.webp", 1200);
const { width, height } = await sharp(fullPng).metadata();
await save(sharp(fullPng).extract({ left: 0, top: 0, width: Math.round(width * 0.42), height }), "logo-mark.webp", 600);

// Logo pendukung
await save(await whiteToAlpha(p("Copy of Tanoto logo-green.png")), "logo-tanoto.webp", 600);
await save(sharp(p("Copy of 1TELADAN - WHITE.png")), "logo-teladan-white.webp", 600);
