import { requireAdmin } from "@/lib/admin/auth";
import { AdminPageHeader } from "@/components/admin/page-header";
import { PostForm } from "../post-form";

export const metadata = { title: "Artikel baru" };

export default async function NewPostPage() {
  await requireAdmin();
  return (
    <>
      <AdminPageHeader title="Artikel baru" back={{ href: "/admin/berita", label: "Kembali ke daftar" }} />
      <PostForm />
    </>
  );
}

// Halaman admin selalu memuat data terbaru per request (boleh memblokir navigasi).
export const instant = false;
