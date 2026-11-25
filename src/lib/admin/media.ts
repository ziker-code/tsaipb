import "server-only";
import ImageKit from "@imagekit/nodejs";
import type { SupabaseClient } from "@supabase/supabase-js";
import { IMAGEKIT_URL_ENDPOINT, isImageKitUrl } from "@/lib/imagekit-config";
import { storagePathFromUrl } from "./utils";

let client: ImageKit | null = null;

/** Klien ImageKit server (memakai IMAGEKIT_PRIVATE_KEY). Null bila belum dikonfigurasi. */
export function imagekitServer() {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  if (!privateKey || !IMAGEKIT_URL_ENDPOINT) return null;
  client ??= new ImageKit({ privateKey });
  return client;
}

/** Hapus satu file ImageKit berdasarkan URL publiknya (cari fileId lewat folder + nama). */
export async function deleteImageKitFileByUrl(url: string) {
  const ik = imagekitServer();
  if (!ik || !isImageKitUrl(url)) return;
  const filePath = decodeURIComponent(new URL(url).pathname.replace(new URL(IMAGEKIT_URL_ENDPOINT).pathname, ""));
  const folder = filePath.slice(0, filePath.lastIndexOf("/") + 1) || "/";
  const name = filePath.slice(filePath.lastIndexOf("/") + 1);
  try {
    const found = await ik.assets.list({ path: folder, searchQuery: `name = "${name.replace(/"/g, "")}"`, limit: 5 });
    for (const asset of found as unknown as { type?: string; fileId?: string; filePath?: string }[]) {
      if (asset.fileId && asset.filePath === filePath) await ik.files.delete(asset.fileId);
    }
  } catch (e) {
    console.error("[imagekit] gagal menghapus", filePath, e);
  }
}

/** Hapus gambar yang tersimpan di mana pun (ImageKit atau Supabase Storage lama). */
export async function removeStoredImage(supabase: SupabaseClient, url: string | null | undefined) {
  if (!url) return;
  if (isImageKitUrl(url)) return deleteImageKitFileByUrl(url);
  const path = storagePathFromUrl(url);
  if (path) await supabase.storage.from("media").remove([path]);
}
