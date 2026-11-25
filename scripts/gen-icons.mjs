// Ambil ikon yang dipakai dari set Famicons (Iconify) → src/components/icons.generated.ts
// Jalankan: node scripts/gen-icons.mjs   (setelah menambah nama ikon di daftar ICONS)
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const set = JSON.parse(readFileSync(require.resolve("@iconify-json/famicons/icons.json"), "utf8"));

const ICONS = [
  "menu", "close", "arrow-forward", "arrow-back", "arrow-up", "arrow-forward-outline", "chevron-down",
  "chevron-forward", "chevron-back", "add", "remove", "play", "location-outline", "calendar-outline",
  "person-outline", "mail-outline", "call-outline", "globe-outline", "logo-instagram", "logo-linkedin",
  "logo-tiktok", "logo-whatsapp", "link-outline", "checkmark", "checkmark-circle", "open-outline",
  "images-outline", "newspaper-outline", "folder-outline", "log-out-outline", "log-in-outline",
  "create-outline", "trash-outline", "star", "eye-off-outline", "cloud-upload-outline", "image-outline",
  "shield-checkmark-outline", "rocket-outline", "people-outline", "bulb-outline", "heart-outline",
  "flame-outline", "leaf-outline", "send", "sync", "share-social-outline", "chatbubble-ellipses-outline",
  "settings-outline", "logo-youtube",
];

const out = {};
for (const name of ICONS) {
  const icon = set.icons[name];
  if (!icon) throw new Error(`Ikon tidak ditemukan di Famicons: ${name}`);
  out[name] = { body: icon.body, w: icon.width ?? set.width ?? 512, h: icon.height ?? set.height ?? 512 };
}

const ts = `// AUTO-GENERATED oleh scripts/gen-icons.mjs dari @iconify-json/famicons (MIT). Jangan edit manual.
export const icons = ${JSON.stringify(out, null, 0)} as const;
export type IconName = keyof typeof icons;
`;
writeFileSync(new URL("../src/components/icons.generated.ts", import.meta.url), ts);
console.log(`✓ ${ICONS.length} ikon ditulis`);
