import { requireAdmin } from "@/lib/admin/auth";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { EmptyState } from "@/components/ui";
import type { Division, GalleryItem, Program } from "@/lib/types";
import { deleteGalleryItem } from "./actions";
import { GalleryUploader } from "./uploader";

export const metadata = { title: "Galeri" };

export default async function AdminGalleryPage() {
  const { supabase } = await requireAdmin();
  const [{ data: items }, { data: divisions }, { data: programs }] = await Promise.all([
    supabase.from("gallery").select("*").order("created_at", { ascending: false }),
    supabase.from("divisions").select("*").order("sort_order"),
    supabase.from("programs").select("id, title, division_id").order("sort_order"),
  ]);

  const gallery = (items ?? []) as GalleryItem[];
  const divisionName = new Map(((divisions ?? []) as Division[]).map((d) => [d.id, d.short_name]));
  const programName = new Map((programs ?? []).map((p) => [p.id, p.title]));

  return (
    <>
      <AdminPageHeader title="Galeri" description={`${gallery.length} foto. Foto baru tampil paling atas di halaman Galeri.`} />
      <GalleryUploader divisions={(divisions ?? []) as Division[]} programs={(programs ?? []) as Program[]} />

      <div className="mt-8">
        {gallery.length ? (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
            {gallery.map((g) => (
              <li key={g.id} className="overflow-hidden rounded-xl bg-white ring-1 ring-brand-100">
                {/* eslint-disable-next-line @next/next/no-img-element -- thumbnail admin */}
                <img src={g.image_url} alt={g.alt} loading="lazy" className="aspect-square w-full object-cover" />
                <div className="flex items-start gap-1 p-2.5">
                  <div className="min-w-0 flex-1 text-xs">
                    <p className="truncate font-semibold text-ink">{g.caption || "Tanpa keterangan"}</p>
                    <p className="truncate text-muted">
                      {[g.division_id && divisionName.get(g.division_id), g.program_id && programName.get(g.program_id)].filter(Boolean).join(" · ") || "—"}
                    </p>
                  </div>
                  <DeleteButton action={deleteGalleryItem} id={g.id} confirmText="Hapus foto ini dari galeri dan penyimpanan?" className="px-1.5" />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title="Belum ada foto" description="Unggah dokumentasi kegiatan dari folder Drive masing-masing divisi." />
        )}
      </div>
    </>
  );
}

// Halaman admin selalu memuat data terbaru per request (boleh memblokir navigasi).
export const instant = false;
