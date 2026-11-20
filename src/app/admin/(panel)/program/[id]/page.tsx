import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { requireAdmin } from "@/lib/admin/auth";
import { AdminPageHeader } from "@/components/admin/page-header";
import type { Division } from "@/lib/types";
import { ProgramForm } from "../program-form";

export const metadata = { title: "Edit program" };

export default async function EditProgramPage({ params }: PageProps<"/admin/program/[id]">) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const [{ data: program }, { data: divisions }] = await Promise.all([
    supabase.from("programs").select("*").eq("id", id).maybeSingle(),
    supabase.from("divisions").select("*").order("sort_order"),
  ]);
  if (!program) notFound();

  return (
    <>
      <AdminPageHeader
        title={`Edit: ${program.title}`}
        back={{ href: "/admin/program", label: "Kembali ke daftar" }}
        actions={
          <Link href={`/program/${program.slug}`} target="_blank" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:underline">
            <ExternalLink className="size-4" aria-hidden="true" /> Lihat di website
          </Link>
        }
      />
      <ProgramForm program={program} divisions={(divisions ?? []) as Division[]} />
    </>
  );
}

// Halaman admin selalu memuat data terbaru per request (boleh memblokir navigasi).
export const instant = false;
