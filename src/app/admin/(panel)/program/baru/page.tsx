import { requireAdmin } from "@/lib/admin/auth";
import { AdminPageHeader } from "@/components/admin/page-header";
import type { Division } from "@/lib/types";
import { ProgramForm } from "../program-form";

export const metadata = { title: "Program baru" };

export default async function NewProgramPage({ searchParams }: PageProps<"/admin/program/baru">) {
  const { supabase } = await requireAdmin();
  const sp = await searchParams;
  const { data: divisions } = await supabase.from("divisions").select("*").order("sort_order");
  return (
    <>
      <AdminPageHeader title="Program baru" back={{ href: "/admin/program", label: "Kembali ke daftar" }} />
      <ProgramForm divisions={(divisions ?? []) as Division[]} defaultDivision={typeof sp.divisi === "string" ? sp.divisi : undefined} />
    </>
  );
}

// Halaman admin selalu memuat data terbaru per request (boleh memblokir navigasi).
export const instant = false;
