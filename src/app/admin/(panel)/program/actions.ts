"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { optStr, slugify, str } from "@/lib/admin/utils";
import { removeStoredImage } from "@/lib/admin/media";
import { youtubeId } from "@/lib/format";
import { tags } from "@/lib/data";

export type FormState = { error?: string };

export async function saveProgram(_prev: FormState, fd: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();

  const id = str(fd, "id");
  const title = str(fd, "title");
  const slug = slugify(str(fd, "slug") || title);
  const division_id = str(fd, "division_id");
  const youtube_url = optStr(fd, "youtube_url");
  const sortRaw = Number(str(fd, "sort_order"));

  if (!title) return { error: "Judul wajib diisi." };
  if (!slug) return { error: "Slug tidak valid." };
  if (!division_id) return { error: "Pilih divisi." };
  if (youtube_url && !youtubeId(youtube_url)) return { error: "Link YouTube tidak dikenali. Gunakan link video YouTube (youtube.com/watch?v=… atau youtu.be/…)." };

  const row = {
    title,
    slug,
    division_id,
    summary: str(fd, "summary"),
    content: str(fd, "content"),
    period: optStr(fd, "period"),
    youtube_url,
    cover_url: optStr(fd, "cover_url"),
    is_featured: fd.get("is_featured") === "on",
    is_published: fd.get("is_published") === "on",
    sort_order: Number.isFinite(sortRaw) ? Math.trunc(sortRaw) : 0,
  };

  const { error } = id ? await supabase.from("programs").update(row).eq("id", id) : await supabase.from("programs").insert(row);
  if (error) {
    if (error.code === "23505") return { error: `Slug "${slug}" sudah dipakai program lain. Ganti slug-nya.` };
    return { error: `Gagal menyimpan: ${error.message}` };
  }

  updateTag(tags.programs);
  redirect("/admin/program?saved=1");
}

export async function deleteProgram(fd: FormData) {
  const { supabase } = await requireAdmin();
  const id = str(fd, "id");
  const { data } = await supabase.from("programs").select("cover_url").eq("id", id).maybeSingle();
  await supabase.from("programs").delete().eq("id", id);
  await removeStoredImage(supabase, data?.cover_url);
  updateTag(tags.programs);
  updateTag(tags.gallery);
  redirect("/admin/program");
}
