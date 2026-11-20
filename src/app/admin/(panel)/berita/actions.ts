"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { optStr, POST_CATEGORIES, slugify, storagePathFromUrl, str } from "@/lib/admin/utils";
import { tags } from "@/lib/data";

export type FormState = { error?: string };

export async function savePost(_prev: FormState, fd: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();

  const id = str(fd, "id");
  const title = str(fd, "title");
  const slug = slugify(str(fd, "slug") || title);
  const category = str(fd, "category");
  const status = str(fd, "status") === "published" ? "published" : "draft";
  const dateInput = str(fd, "published_at");

  if (!title) return { error: "Judul wajib diisi." };
  if (!slug) return { error: "Slug tidak valid." };
  if (!POST_CATEGORIES.includes(category as (typeof POST_CATEGORIES)[number])) return { error: "Kategori tidak valid." };

  const published_at = dateInput ? new Date(`${dateInput}T08:00:00+07:00`).toISOString() : status === "published" ? new Date().toISOString() : null;

  const row = {
    title,
    slug,
    category,
    status,
    published_at,
    excerpt: str(fd, "excerpt"),
    content: str(fd, "content"),
    author: optStr(fd, "author"),
    cover_url: optStr(fd, "cover_url"),
  };

  const { error } = id ? await supabase.from("posts").update(row).eq("id", id) : await supabase.from("posts").insert(row);
  if (error) {
    if (error.code === "23505") return { error: `Slug "${slug}" sudah dipakai artikel lain. Ganti slug-nya.` };
    return { error: `Gagal menyimpan: ${error.message}` };
  }

  updateTag(tags.posts);
  redirect("/admin/berita?saved=1");
}

export async function deletePost(fd: FormData) {
  const { supabase } = await requireAdmin();
  const id = str(fd, "id");
  const { data } = await supabase.from("posts").select("cover_url").eq("id", id).maybeSingle();
  await supabase.from("posts").delete().eq("id", id);
  const path = storagePathFromUrl(data?.cover_url);
  if (path) await supabase.storage.from("media").remove([path]);
  updateTag(tags.posts);
  redirect("/admin/berita");
}
