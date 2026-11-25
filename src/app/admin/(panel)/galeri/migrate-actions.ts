"use server";

import { toFile } from "@imagekit/nodejs";
import { updateTag } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import { imagekitServer } from "@/lib/admin/media";
import { storagePathFromUrl } from "@/lib/admin/utils";
import { IMAGEKIT_ROOT } from "@/lib/imagekit-config";
import { tags } from "@/lib/data";

/** Kolom berisi URL gambar yang mungkin masih menunjuk ke Supabase Storage. */
const TARGETS = [
  { table: "posts", column: "cover_url", folder: "posts", tag: tags.posts },
  { table: "programs", column: "cover_url", folder: "programs", tag: tags.programs },
  { table: "gallery", column: "image_url", folder: "gallery", tag: tags.gallery },
  { table: "testimonials", column: "photo_url", folder: "stories", tag: tags.testimonials },
] as const;

export type MigrateResult = { moved: number; failed: string[]; error?: string };

/**
 * Pindahkan semua gambar lama (Supabase Storage) ke ImageKit:
 * unduh → upload ke /tsaipb/<folder> → perbarui URL di database → hapus file lama.
 * Aman diulang: baris yang sudah memakai ImageKit dilewati.
 */
export async function migrateLegacyImages(): Promise<MigrateResult> {
  const { supabase } = await requireAdmin();
  const ik = imagekitServer();
  if (!ik) return { moved: 0, failed: [], error: "ImageKit belum dikonfigurasi (.env.local / Vercel env)." };

  let moved = 0;
  const failed: string[] = [];

  for (const t of TARGETS) {
    const { data: rows } = await supabase.from(t.table).select(`id, ${t.column}`).like(t.column, "%/storage/v1/object/public/media/%");
    for (const row of (rows ?? []) as unknown as Record<string, string>[]) {
      const oldUrl = row[t.column];
      const path = storagePathFromUrl(oldUrl);
      if (!path) continue;
      try {
        const res = await fetch(oldUrl);
        if (!res.ok) throw new Error(`unduh gagal (${res.status})`);
        const name = path.split("/").pop()!;
        const uploaded = await ik.files.upload({
          file: await toFile(Buffer.from(await res.arrayBuffer()), name),
          fileName: name,
          folder: `${IMAGEKIT_ROOT}/${t.folder}`,
          useUniqueFileName: false,
        });
        if (!uploaded.url) throw new Error("upload tanpa URL");
        const { error } = await supabase.from(t.table).update({ [t.column]: uploaded.url }).eq("id", row.id);
        if (error) throw new Error(error.message);
        await supabase.storage.from("media").remove([path]);
        moved++;
      } catch (e) {
        failed.push(`${t.table}/${row.id}: ${e instanceof Error ? e.message : String(e)}`);
      }
    }
    updateTag(t.tag);
  }
  return { moved, failed };
}

/** Jumlah gambar yang masih di Supabase Storage (untuk menampilkan tombol migrasi). */
export async function countLegacyImages(): Promise<number> {
  const { supabase } = await requireAdmin();
  let total = 0;
  for (const t of TARGETS) {
    const { count } = await supabase.from(t.table).select("id", { count: "exact", head: true }).like(t.column, "%/storage/v1/object/public/media/%");
    total += count ?? 0;
  }
  return total;
}
