import Link from "next/link";
import { EyeOff, Pencil, Plus, Star } from "lucide-react";
import { requireAdmin } from "@/lib/admin/auth";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import type { Division, Program } from "@/lib/types";
import { deleteProgram } from "./actions";

export const metadata = { title: "Program Kerja" };

export default async function AdminProgramsPage() {
  const { supabase } = await requireAdmin();
  const [{ data: divisions }, { data: programs }] = await Promise.all([
    supabase.from("divisions").select("*").order("sort_order"),
    supabase.from("programs").select("*").order("sort_order"),
  ]);

  const list = (programs ?? []) as Program[];
  const featuredCount = list.filter((p) => p.is_featured).length;

  return (
    <>
      <AdminPageHeader
        title="Program Kerja"
        description={`${list.length} program · ${featuredCount} unggulan (Beranda menampilkan maks. 3). Program tanpa deskripsi ditandai “perlu deskripsi”.`}
        actions={
          <Link href="/admin/program/baru" className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800">
            <Plus className="size-4" aria-hidden="true" /> Program baru
          </Link>
        }
      />

      <div className="grid gap-6">
        {((divisions ?? []) as Division[]).map((d) => {
          const items = list.filter((p) => p.division_id === d.id);
          return (
            <section key={d.id} className="overflow-hidden rounded-[var(--radius-card)] bg-white ring-1 ring-brand-100">
              <header className="flex items-center justify-between gap-3 border-b border-brand-50 bg-brand-50/60 px-5 py-3">
                <h2 className="font-display font-bold text-brand-800">
                  {d.name} <span className="text-sm font-normal text-muted">({items.length})</span>
                </h2>
                <Link href={`/admin/program/baru?divisi=${d.id}`} className="text-sm font-semibold text-brand-600 hover:underline">
                  + Tambah
                </Link>
              </header>
              <ul className="divide-y divide-brand-50">
                {items.map((p) => (
                  <li key={p.id} className="flex flex-wrap items-center gap-2 px-5 py-3">
                    <Link href={`/admin/program/${p.id}`} className="min-w-0 flex-1 font-semibold text-ink hover:text-brand-700 hover:underline">
                      {p.title}
                    </Link>
                    {p.is_featured && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gold-100 px-2.5 py-0.5 text-xs font-semibold text-gold-600">
                        <Star className="size-3" aria-hidden="true" /> Unggulan
                      </span>
                    )}
                    {!p.is_published && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-canvas px-2.5 py-0.5 text-xs font-semibold text-muted">
                        <EyeOff className="size-3" aria-hidden="true" /> Disembunyikan
                      </span>
                    )}
                    {!p.content && <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-600">perlu deskripsi</span>}
                    <Link href={`/admin/program/${p.id}`} aria-label={`Edit ${p.title}`} className="rounded-lg p-2 text-brand-700 hover:bg-brand-50">
                      <Pencil className="size-4" />
                    </Link>
                    <DeleteButton action={deleteProgram} id={p.id} confirmText={`Hapus program "${p.title}"? Foto galeri yang ditandai ke program ini tetap ada.`} />
                  </li>
                ))}
                {!items.length && <li className="px-5 py-4 text-sm text-muted">Belum ada program.</li>}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}

// Halaman admin selalu memuat data terbaru per request (boleh memblokir navigasi).
export const instant = false;
