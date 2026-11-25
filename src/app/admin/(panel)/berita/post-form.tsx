"use client";

import { useActionState } from "react";
import { Field, FormError, inputCls, MarkdownEditor, SubmitButton, useKeepValuesSubmit } from "@/components/admin/form";
import { ImageField } from "@/components/admin/image-field";
import { POST_CATEGORIES } from "@/lib/admin/utils";
import type { Post } from "@/lib/types";
import { savePost, type FormState } from "./actions";

const toDateInput = (iso: string | null | undefined) =>
  iso ? new Date(new Date(iso).getTime() + 7 * 3600_000).toISOString().slice(0, 10) : "";

export function PostForm({ post }: { post?: Post }) {
  const [state, action, pending] = useActionState<FormState, FormData>(savePost, {});
  const onSubmit = useKeepValuesSubmit(action);

  return (
    <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-[1fr_20rem]">
      {post && <input type="hidden" name="id" value={post.id} />}

      <div className="grid content-start gap-5 rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-brand-100">
        <Field label="Judul *">
          <input name="title" required defaultValue={post?.title} className={inputCls} />
        </Field>
        <Field label="Slug (URL)" hint="Kosongkan agar dibuat otomatis dari judul. Contoh: tsa-day-2026">
          <input name="slug" defaultValue={post?.slug} className={inputCls} />
        </Field>
        <Field label="Ringkasan" hint="Tampil di kartu berita dan hasil pencarian Google (1–2 kalimat).">
          <textarea name="excerpt" rows={2} maxLength={300} defaultValue={post?.excerpt} className={inputCls} />
        </Field>
        <div className="text-sm font-semibold text-ink">
          Isi artikel
          <MarkdownEditor name="content" defaultValue={post?.content} />
        </div>
      </div>

      <div className="grid content-start gap-5">
        <div className="grid gap-5 rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-brand-100">
          <Field label="Status">
            <select name="status" defaultValue={post?.status ?? "draft"} className={inputCls}>
              <option value="draft">Draft (tidak tampil)</option>
              <option value="published">Terbit</option>
            </select>
          </Field>
          <Field label="Tanggal terbit" hint="Kosongkan = hari ini saat diterbitkan.">
            <input type="date" name="published_at" defaultValue={toDateInput(post?.published_at)} className={inputCls} />
          </Field>
          <Field label="Kategori" hint="Cerita Inspirasi tampil di Kisah Inspiratif. Berita & Publikasi tampil di Kabar Terbaru (Beranda). Semua tampil di halaman Berita & Blog.">
            <select name="category" defaultValue={post?.category ?? "Berita"} className={inputCls}>
              {POST_CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Penulis">
            <input name="author" defaultValue={post?.author ?? ""} placeholder="mis. Divisi BE" className={inputCls} />
          </Field>
        </div>
        <div className="rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-brand-100">
          <ImageField name="cover_url" label="Gambar cover" defaultValue={post?.cover_url} folder="posts" />
        </div>
        <FormError message={state.error} />
        <SubmitButton pending={pending} className="w-full py-3">{post ? "Simpan perubahan" : "Simpan artikel"}</SubmitButton>
      </div>
    </form>
  );
}
