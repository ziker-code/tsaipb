"use client";

import { createBrowserSupabase } from "@/lib/supabase/browser";

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

/** Kompres + upload ke bucket `media`, kembalikan URL publik. */
export async function uploadImage(file: File, folder: "posts" | "programs" | "gallery" | "stories"): Promise<string> {
  const supabase = createBrowserSupabase();
  const blob = await compressImage(file);
  const ext = blob.type === "image/webp" ? "webp" : (file.name.split(".").pop() || "jpg").toLowerCase();
  const path = `${folder}/${new Date().toISOString().slice(0, 10)}-${crypto.randomUUID().slice(0, 8)}.${ext}`;
  const { error } = await supabase.storage.from("media").upload(path, blob, { contentType: blob.type || file.type, cacheControl: "31536000", upsert: false });
  if (error) throw new Error(error.message);
  return supabase.storage.from("media").getPublicUrl(path).data.publicUrl;
}
