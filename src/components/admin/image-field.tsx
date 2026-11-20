"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { uploadImage } from "@/lib/admin/image";

/** Upload satu gambar (cover). URL hasil upload disimpan di hidden input `name`. */
export function ImageField({ name, label, defaultValue, folder }: { name: string; label: string; defaultValue?: string | null; folder: "posts" | "programs" }) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function onFile(file?: File) {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      setUrl(await uploadImage(file, folder));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload gagal");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="text-sm font-semibold text-ink">
      {label}
      <input type="hidden" name={name} value={url} />
      <div className="mt-1.5 overflow-hidden rounded-xl border border-dashed border-brand-100 bg-canvas">
        {url ? (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element -- pratinjau admin */}
            <img src={url} alt="" className="aspect-video w-full object-cover" />
            <div className="absolute right-2 top-2 flex gap-2">
              <button type="button" onClick={() => inputRef.current?.click()} className="rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold text-brand-800 shadow">
                Ganti
              </button>
              <button type="button" onClick={() => setUrl("")} aria-label="Hapus gambar" className="grid size-8 place-items-center rounded-lg bg-white/90 text-red-600 shadow">
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ) : (
          <button type="button" onClick={() => inputRef.current?.click()} disabled={busy} className="flex aspect-video w-full flex-col items-center justify-center gap-2 text-muted hover:bg-brand-50">
            {busy ? <Loader2 className="size-6 animate-spin" /> : <ImagePlus className="size-6" />}
            <span className="text-xs font-normal">{busy ? "Mengunggah…" : "Klik untuk unggah gambar (otomatis dikompres)"}</span>
          </button>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
      {error && <span className="mt-1 block text-xs font-normal text-red-600">{error}</span>}
    </div>
  );
}
