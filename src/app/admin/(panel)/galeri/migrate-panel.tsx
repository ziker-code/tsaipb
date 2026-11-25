"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Icon } from "@/components/icon";
import { migrateLegacyImages, type MigrateResult } from "./migrate-actions";

/** Panel sekali pakai: pindahkan gambar lama dari Supabase Storage ke ImageKit. */
export function MigratePanel({ count }: { count: number }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [result, setResult] = useState<MigrateResult | null>(null);

  return (
    <div className="mb-6 rounded-[var(--radius-card)] border border-gold-300 bg-gold-100 p-5">
      <p className="font-semibold text-brand-900">{count} gambar lama masih tersimpan di Supabase Storage</p>
      <p className="mt-1 text-sm text-muted">Pindahkan ke ImageKit agar semua gambar dikirim dari CDN ImageKit. URL di database diperbarui otomatis dan file lama dihapus.</p>
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          start(async () => {
            const r = await migrateLegacyImages();
            setResult(r);
            router.refresh();
          })
        }
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
      >
        {pending && <Icon name="sync" className="size-4 animate-spin" />}
        {pending ? "Memindahkan…" : "Pindahkan ke ImageKit"}
      </button>
      <div aria-live="polite" className="mt-3 text-sm">
        {result?.error && <p className="text-red-700">{result.error}</p>}
        {result && !result.error && <p className="text-brand-700">{result.moved} gambar berhasil dipindahkan.</p>}
        {result?.failed.length ? <p className="text-red-700">Gagal: {result.failed.join("; ")}</p> : null}
      </div>
    </div>
  );
}
