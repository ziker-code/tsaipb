"use client";

import { upload } from "@imagekit/next";
import { IMAGEKIT_ROOT } from "@/lib/imagekit-config";

const MAX_SIDE = 1600;
const QUALITY = 0.82;

/** Perkecil gambar ke maks 1600px dan ubah ke WebP di browser sebelum upload. */
export async function compressImage(file: File): Promise<Blob> {
  if (!file.type.startsWith("image/") || file.type === "image/gif" || file.type === "image/svg+xml") return file;
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();
  const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/webp", QUALITY));
  return blob && blob.size < file.size ? blob : file;
}

type Folder = "posts" | "programs" | "gallery" | "stories";

/**
 * Kompres lalu upload ke ImageKit (folder /tsaipb/<folder>), kembalikan URL publik.
 * Tanda tangan upload diminta ke /api/imagekit/auth (khusus admin); kunci privat tidak pernah ke browser.
 */
export async function uploadImage(file: File, folder: Folder): Promise<string> {
  const blob = await compressImage(file);
  const ext = blob.type === "image/webp" ? "webp" : (file.name.split(".").pop() || "jpg").toLowerCase();
  const fileName = `${new Date().toISOString().slice(0, 10)}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

  const authRes = await fetch("/api/imagekit/auth", { cache: "no-store" });
  const auth = await authRes.json();
  if (!authRes.ok) throw new Error(auth.error ?? "Gagal meminta izin upload.");

  const res = await upload({
    file: blob,
    fileName,
    folder: `${IMAGEKIT_ROOT}/${folder}`,
    useUniqueFileName: false,
    token: auth.token,
    expire: auth.expire,
    signature: auth.signature,
    publicKey: auth.publicKey,
  });
  if (!res.url) throw new Error("Upload ke ImageKit tidak mengembalikan URL.");
  return res.url;
}
