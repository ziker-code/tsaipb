import { requireAdmin } from "@/lib/admin/auth";
import { AdminPageHeader } from "@/components/admin/page-header";
import { TestimonialForm } from "../testimonial-form";

export const metadata = { title: "Cerita baru" };

export default async function NewStoryPage() {
  await requireAdmin();
  return (
    <>
      <AdminPageHeader title="Cerita baru" back={{ href: "/admin/cerita", label: "Kembali ke daftar" }} />
      <TestimonialForm />
    </>
  );
}

export const instant = false;
