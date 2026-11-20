import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { AdminPageHeader } from "@/components/admin/page-header";
import { PostForm } from "../post-form";

export const metadata = { title: "Edit artikel" };

export default async function EditPostPage({ params }: PageProps<"/admin/berita/[id]">) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { data: post } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
  if (!post) notFound();

  return (
    <>
      <AdminPageHeader title="Edit artikel" back={{ href: "/admin/berita", label: "Kembali ke daftar" }} />
      <PostForm post={post} />
    </>
  );
}

// Halaman admin selalu memuat data terbaru per request (boleh memblokir navigasi).
export const instant = false;
