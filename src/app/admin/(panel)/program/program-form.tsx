"use client";

import { useActionState } from "react";
import { Field, FormError, inputCls, MarkdownEditor, SubmitButton, useKeepValuesSubmit } from "@/components/admin/form";
import { ImageField } from "@/components/admin/image-field";
import type { Division, Program } from "@/lib/types";
import { saveProgram, type FormState } from "./actions";

export function ProgramForm({ program, divisions, defaultDivision }: { program?: Program; divisions: Division[]; defaultDivision?: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveProgram, {});
  const onSubmit = useKeepValuesSubmit(action);

  return (
    <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-[1fr_20rem]">
      {program && <input type="hidden" name="id" value={program.id} />}

      <div className="grid content-start gap-5 rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-brand-100">
        <Field label="Nama program *">
          <input name="title" required defaultValue={program?.title} className={inputCls} />
        </Field>
        <Field label="Slug (URL)" hint="Kosongkan agar dibuat otomatis dari nama program.">
          <input name="slug" defaultValue={program?.slug} className={inputCls} />
        </Field>
        <Field label="Ringkasan" hint="1–2 kalimat, tampil di kartu program dan bagian atas halaman detail.">
          <textarea name="summary" rows={2} maxLength={300} defaultValue={program?.summary} className={inputCls} />
        </Field>
        <div className="text-sm font-semibold text-ink">
          Deskripsi lengkap
          <span className="mt-1 block text-xs font-normal text-muted">Latar belakang, tujuan, rangkaian kegiatan, dampak. Salin dari dokumen “Deskripsi Program Kerja” di Drive.</span>
          <MarkdownEditor name="content" defaultValue={program?.content} rows={18} />
        </div>
      </div>

      <div className="grid content-start gap-5">
        <div className="grid gap-5 rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-brand-100">
          <Field label="Divisi *">
            <select name="division_id" required defaultValue={program?.division_id ?? defaultDivision ?? ""} className={inputCls}>
              <option value="" disabled>
                Pilih divisi
              </option>
              {divisions.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Waktu pelaksanaan" hint="Bebas, mis. “Maret – Mei 2026” atau “Setiap bulan”.">
            <input name="period" defaultValue={program?.period ?? ""} className={inputCls} />
          </Field>
          <Field label="Link video YouTube">
            <input name="youtube_url" type="url" defaultValue={program?.youtube_url ?? ""} placeholder="https://youtu.be/…" className={inputCls} />
          </Field>
          <Field label="Urutan tampil" hint="Angka kecil tampil lebih dulu.">
            <input name="sort_order" type="number" defaultValue={program?.sort_order ?? 0} className={inputCls} />
          </Field>
          <label className="flex items-center gap-3 text-sm font-semibold">
            <input type="checkbox" name="is_featured" defaultChecked={program?.is_featured} className="size-4 accent-brand-700" />
            Program unggulan (tampil di Beranda)
          </label>
          <label className="flex items-center gap-3 text-sm font-semibold">
            <input type="checkbox" name="is_published" defaultChecked={program?.is_published ?? true} className="size-4 accent-brand-700" />
            Tampilkan di website
          </label>
        </div>
        <div className="rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-brand-100">
          <ImageField name="cover_url" label="Gambar cover" defaultValue={program?.cover_url} folder="programs" />
        </div>
        <FormError message={state.error} />
        <SubmitButton pending={pending} className="w-full py-3">{program ? "Simpan perubahan" : "Simpan program"}</SubmitButton>
      </div>
    </form>
  );
}
