import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { AdminPageHeader } from "@/components/admin/page-header";
import type { Testimonial } from "@/lib/types";
import { TestimonialForm } from "../testimonial-form";

export const metadata = { title: "Edit cerita" };

export default async function EditStoryPage({ params }: PageProps<"/admin/cerita/[id]">) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("testimonials").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  return (
    <>
      <AdminPageHeader title={`Edit cerita: ${data.name}`} back={{ href: "/admin/cerita", label: "Kembali ke daftar" }} />
      <TestimonialForm item={data as Testimonial} />
    </>
  );
}

export const instant = false;
