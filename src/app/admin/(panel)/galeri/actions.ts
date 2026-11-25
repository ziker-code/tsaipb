"use server";

import { updateTag } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import { str } from "@/lib/admin/utils";
import { removeStoredImage } from "@/lib/admin/media";
import { SUPABASE_URL } from "@/lib/supabase/env";
import { isImageKitUrl } from "@/lib/imagekit-config";
import { tags } from "@/lib/data";

type NewItem = { image_url: string };

export async function addGalleryItems(
  items: NewItem[],
  meta: { caption: string; division_id: string; program_id: string },
): Promise<{ error?: string }> {
  const { supabase } = await requireAdmin();

  // Hanya terima URL dari ImageKit kita (atau Supabase Storage lama), bukan URL sembarang.
  const supabasePrefix = `${SUPABASE_URL}/storage/v1/object/public/media/`;
  const valid = items.filter((i) => typeof i.image_url === "string" && (isImageKitUrl(i.image_url) || i.image_url.startsWith(supabasePrefix)));
  if (!valid.length) return { error: "Tidak ada gambar yang valid." };

  const caption = meta.caption.trim().slice(0, 300) || null;
  const rows = valid.map((i) => ({
    image_url: i.image_url,
    caption,
    alt: caption ?? "Dokumentasi kegiatan TSA IPB",
    division_id: meta.division_id || null,
    program_id: meta.program_id || null,
  }));

  const { error } = await supabase.from("gallery").insert(rows);
  if (error) return { error: `Gagal menyimpan: ${error.message}` };

  updateTag(tags.gallery);
  return {};
}

export async function deleteGalleryItem(fd: FormData) {
  const { supabase } = await requireAdmin();
  const id = str(fd, "id");
  const { data } = await supabase.from("gallery").select("image_url").eq("id", id).maybeSingle();
  await supabase.from("gallery").delete().eq("id", id);
  await removeStoredImage(supabase, data?.image_url);
  updateTag(tags.gallery);
}
