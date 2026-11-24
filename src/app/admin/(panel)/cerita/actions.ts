"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { optStr, storagePathFromUrl, str } from "@/lib/admin/utils";
import { tags } from "@/lib/data";

export type FormState = { error?: string };

export async function saveTestimonial(_prev: FormState, fd: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();

  const id = str(fd, "id");
  const name = str(fd, "name");
  const quote = str(fd, "quote");
  const sortRaw = Number(str(fd, "sort_order"));

  if (!name) return { error: "Nama wajib diisi." };
  if (quote.length < 20) return { error: "Cerita minimal 20 karakter." };
  if (quote.length > 400) return { error: "Cerita maksimal 400 karakter agar muat di kartu." };

  const row = {
    name,
    quote,
    batch: str(fd, "batch"),
    role: str(fd, "role"),
    photo_url: optStr(fd, "photo_url"),
    is_visible: fd.get("is_visible") === "on",
    sort_order: Number.isFinite(sortRaw) ? Math.trunc(sortRaw) : 0,
  };

  const { error } = id ? await supabase.from("testimonials").update(row).eq("id", id) : await supabase.from("testimonials").insert(row);
  if (error) {
    if (/batch|photo_url/.test(error.message)) {
      return { error: "Kolom angkatan/foto belum ada. Jalankan supabase/migrations/0002_testimonials_batch_photo.sql di SQL Editor Supabase." };
    }
    return { error: `Gagal menyimpan: ${error.message}` };
  }

  updateTag(tags.testimonials);
  redirect("/admin/cerita?saved=1");
}

export async function deleteTestimonial(fd: FormData) {
  const { supabase } = await requireAdmin();
  const id = str(fd, "id");
  const { data } = await supabase.from("testimonials").select("*").eq("id", id).maybeSingle();
  await supabase.from("testimonials").delete().eq("id", id);
  const path = storagePathFromUrl((data as { photo_url?: string | null } | null)?.photo_url);
  if (path) await supabase.storage.from("media").remove([path]);
  updateTag(tags.testimonials);
  redirect("/admin/cerita");
}

export async function toggleTestimonial(fd: FormData) {
  const { supabase } = await requireAdmin();
  const id = str(fd, "id");
  const next = str(fd, "next") === "true";
  await supabase.from("testimonials").update({ is_visible: next }).eq("id", id);
  updateTag(tags.testimonials);
  redirect("/admin/cerita");
}
