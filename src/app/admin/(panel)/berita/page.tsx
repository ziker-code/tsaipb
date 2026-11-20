import Link from "next/link";
import { ExternalLink, Pencil, Plus } from "lucide-react";
import { requireAdmin } from "@/lib/admin/auth";
import { formatDate } from "@/lib/format";
import { AdminPageHeader } from "@/components/admin/page-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { EmptyState } from "@/components/ui";
import { cn } from "@/lib/cn";
import { deletePost } from "./actions";

export const metadata = { title: "Berita" };

export default async function AdminPostsPage() {
  const { supabase } = await requireAdmin();
  const { data: posts } = await supabase
    .from("posts")
    .select("id, slug, title, category, status, published_at, updated_at")
    .order("updated_at", { ascending: false });

  return (
    <>
      <AdminPageHeader
        title="Berita & Blog"
        description="Artikel berstatus Terbit langsung tampil di website."
        actions={
          <Link href="/admin/berita/baru" className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800">
            <Plus className="size-4" aria-hidden="true" /> Artikel baru
          </Link>
        }
      />

      {!posts?.length ? (
        <EmptyState title="Belum ada artikel" description="Klik “Artikel baru” untuk menulis berita pertama." />
      ) : (
        <ul className="divide-y divide-brand-50 overflow-hidden rounded-[var(--radius-card)] bg-white ring-1 ring-brand-100">
          {posts.map((p) => (
            <li key={p.id} className="flex flex-wrap items-center gap-3 px-5 py-4">
              <div className="min-w-0 flex-1">
                <Link href={`/admin/berita/${p.id}`} className="font-semibold text-brand-800 hover:underline">
                  {p.title}
                </Link>
                <p className="mt-0.5 text-xs text-muted">
                  {p.category} · {p.published_at ? formatDate(p.published_at) : "belum diterbitkan"}
                </p>
              </div>
              <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", p.status === "published" ? "bg-brand-50 text-brand-700" : "bg-gold-100 text-gold-600")}>
                {p.status === "published" ? "Terbit" : "Draft"}
              </span>
              <div className="flex items-center">
                {p.status === "published" && (
                  <Link href={`/berita/${p.slug}`} target="_blank" aria-label="Lihat di website" className="rounded-lg p-2 text-muted hover:bg-brand-50">
                    <ExternalLink className="size-4" />
                  </Link>
                )}
                <Link href={`/admin/berita/${p.id}`} aria-label="Edit" className="rounded-lg p-2 text-brand-700 hover:bg-brand-50">
                  <Pencil className="size-4" />
                </Link>
                <DeleteButton action={deletePost} id={p.id} confirmText={`Hapus artikel "${p.title}"? Tindakan ini tidak bisa dibatalkan.`} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

// Halaman admin selalu memuat data terbaru per request (boleh memblokir navigasi).
export const instant = false;
