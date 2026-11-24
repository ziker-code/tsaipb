import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { Icon } from "@/components/icon";
import { EmptyState } from "@/components/ui";
import type { Testimonial } from "@/lib/types";
import { cn } from "@/lib/cn";
import { deleteTestimonial, toggleTestimonial } from "./actions";

export const metadata = { title: "Cerita Mereka" };

export default async function AdminStoriesPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("testimonials").select("*").order("sort_order").order("created_at", { ascending: false });
  const items = (data ?? []) as Testimonial[];

  return (
    <>
      <AdminPageHeader
        title="Cerita Mereka"
        description="Testimoni yang tampil di carousel Beranda. Hanya cerita yang ditandai tampil yang terlihat publik."
        actions={
          <Link href="/admin/cerita/baru" className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800">
            <Icon name="add" className="size-4" /> Cerita baru
          </Link>
        }
      />

      {!items.length ? (
        <EmptyState title="Belum ada cerita" description="Tambahkan cerita anggota, alumni, atau mitra yang sudah bersedia ditampilkan." />
      ) : (
        <ul className="divide-y divide-brand-50 overflow-hidden rounded-[var(--radius-card)] bg-white ring-1 ring-brand-100">
          {items.map((t) => (
            <li key={t.id} className="flex flex-wrap items-start gap-4 px-5 py-4">
              <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-gold-100 text-sm font-semibold text-gold-600">
                {t.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element -- thumbnail admin
                  <img src={t.photo_url} alt="" className="size-full object-cover" />
                ) : (
                  t.name.slice(0, 1).toUpperCase()
                )}
              </span>
              <div className="min-w-0 flex-1">
                <Link href={`/admin/cerita/${t.id}`} className="font-semibold text-brand-800 hover:underline">
                  {t.name}
                </Link>
                <span className="ml-2 text-xs text-muted">{[t.batch, t.role].filter(Boolean).join(", ")}</span>
                <p className="mt-1 line-clamp-2 text-sm text-muted">{t.quote}</p>
              </div>
              <div className="flex items-center gap-1">
                <form action={toggleTestimonial}>
                  <input type="hidden" name="id" value={t.id} />
                  <input type="hidden" name="next" value={String(!t.is_visible)} />
                  <button
                    type="submit"
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-semibold",
                      t.is_visible ? "bg-brand-50 text-brand-700 hover:bg-brand-100" : "bg-canvas text-muted hover:bg-brand-50",
                    )}
                  >
                    {t.is_visible ? "Tampil" : "Disembunyikan"}
                  </button>
                </form>
                <Link href={`/admin/cerita/${t.id}`} aria-label={`Edit cerita ${t.name}`} className="rounded-lg p-2 text-brand-700 hover:bg-brand-50">
                  <Icon name="create-outline" className="size-4" />
                </Link>
                <DeleteButton action={deleteTestimonial} id={t.id} confirmText={`Hapus cerita dari ${t.name}?`} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export const instant = false;
