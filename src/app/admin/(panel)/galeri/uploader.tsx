"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Upload } from "lucide-react";
import { Field, inputCls } from "@/components/admin/form";
import { uploadImage } from "@/lib/admin/image";
import type { Division, Program } from "@/lib/types";
import { addGalleryItems } from "./actions";

type Status = { done: number; total: number; failed: string[] } | null;

export function GalleryUploader({ divisions, programs }: { divisions: Division[]; programs: Program[] }) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [divisionId, setDivisionId] = useState("");
  const [programId, setProgramId] = useState("");
  const [caption, setCaption] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const [error, setError] = useState("");

  const programOptions = divisionId ? programs.filter((p) => p.division_id === divisionId) : programs;

  async function upload() {
    if (!files.length) return;
    setBusy(true);
    setError("");
    const urls: string[] = [];
    const failed: string[] = [];
    setStatus({ done: 0, total: files.length, failed });

    // Upload 3 file sekaligus
    const queue = [...files];
    await Promise.all(
      Array.from({ length: Math.min(3, queue.length) }, async () => {
        for (let f = queue.shift(); f; f = queue.shift()) {
          try {
            urls.push(await uploadImage(f, "gallery"));
          } catch {
            failed.push(f.name);
          }
          setStatus({ done: urls.length + failed.length, total: files.length, failed: [...failed] });
        }
      }),
    );

    if (urls.length) {
      const res = await addGalleryItems(
        urls.map((image_url) => ({ image_url })),
        { caption, division_id: divisionId, program_id: programId },
      );
      if (res.error) setError(res.error);
    }

    setBusy(false);
    setFiles([]);
    if (fileRef.current) fileRef.current.value = "";
    router.refresh();
  }

  return (
    <div className="rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-brand-100">
      <h2 className="font-display font-bold text-brand-800">Unggah foto</h2>
      <p className="mt-1 text-sm text-muted">Pilih banyak foto sekaligus. Foto otomatis diperkecil (maks. 1600px, WebP) sebelum diunggah.</p>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <Field label="Divisi">
          <select
            value={divisionId}
            onChange={(e) => {
              setDivisionId(e.target.value);
              setProgramId("");
            }}
            className={inputCls}
          >
            <option value="">— Tanpa divisi —</option>
            {divisions.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Program kerja" hint="Foto juga tampil di halaman detail program ini.">
          <select value={programId} onChange={(e) => setProgramId(e.target.value)} className={inputCls}>
            <option value="">— Tanpa program —</option>
            {programOptions.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Keterangan foto" hint="Dipakai untuk semua foto di unggahan ini.">
          <input value={caption} onChange={(e) => setCaption(e.target.value)} maxLength={300} placeholder="mis. TSA-DAY 2026 di Dramaga" className={inputCls} />
        </Field>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-brand-100 bg-canvas px-4 py-2.5 text-sm font-semibold text-brand-800 hover:bg-brand-50">
          <Upload className="size-4" aria-hidden="true" />
          {files.length ? `${files.length} foto dipilih` : "Pilih foto"}
          <input ref={fileRef} type="file" accept="image/*" multiple className="sr-only" onChange={(e) => setFiles(Array.from(e.target.files ?? []))} />
        </label>
        <button
          type="button"
          onClick={upload}
          disabled={!files.length || busy}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-50"
        >
          {busy && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          {busy ? `Mengunggah ${status?.done ?? 0}/${status?.total ?? 0}…` : "Unggah"}
        </button>
      </div>

      <div aria-live="polite" className="mt-3 text-sm">
        {!busy && status && status.done > 0 && (
          <p className="flex items-center gap-2 text-brand-700">
            <CheckCircle2 className="size-4" aria-hidden="true" /> {status.done - status.failed.length} foto berhasil diunggah.
          </p>
        )}
        {status?.failed.length ? <p className="text-red-600">Gagal: {status.failed.join(", ")}</p> : null}
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </div>
  );
}
