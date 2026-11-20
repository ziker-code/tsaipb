import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Play } from "lucide-react";
import { getDivisions, getGallery, getProgram, getPrograms } from "@/lib/data";
import { youtubeThumb } from "@/lib/format";
import { Markdown } from "@/components/markdown";
import { ProgramCard } from "@/components/cards";
import { Container, Contours, Pill, SectionHeading } from "@/components/ui";

export async function generateStaticParams() {
  const programs = await getPrograms();
  // Cache Components butuh minimal satu param; slug placeholder akan menghasilkan 404.
  return programs.length ? programs.map((p) => ({ slug: p.slug })) : [{ slug: "_" }];
}

export async function generateMetadata({ params }: PageProps<"/program/[slug]">): Promise<Metadata> {
  const program = await getProgram((await params).slug);
  if (!program) return {};
  return {
    title: program.title,
    description: program.summary || `Program kerja ${program.title} TSA IPB.`,
    openGraph: program.cover_url ? { images: [program.cover_url] } : undefined,
  };
}

export default async function ProgramDetailPage({ params }: PageProps<"/program/[slug]">) {
  const { slug } = await params;
  const [program, divisions, programs, gallery] = await Promise.all([getProgram(slug), getDivisions(), getPrograms(), getGallery()]);
  if (!program) notFound();

  const division = divisions.find((d) => d.id === program.division_id);
  const photos = gallery.filter((g) => g.program_id === program.id);
  const related = programs.filter((p) => p.division_id === program.division_id && p.id !== program.id).slice(0, 3);
  const thumb = youtubeThumb(program.youtube_url);

  return (
    <>
      <section className="relative overflow-hidden bg-brand-700 pb-16 pt-32 text-white sm:pt-36">
        <Contours />
        <Container className="relative">
          <Link href="/program" className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white">
            <ArrowLeft className="size-4" aria-hidden="true" /> Semua program
          </Link>
          {division && (
            <div className="mt-6">
              <Pill className="bg-white/15 text-gold-300">{division.name}</Pill>
            </div>
          )}
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-extrabold leading-tight sm:text-5xl">{program.title}</h1>
          {program.summary && <p className="mt-4 max-w-2xl text-lg text-white/85">{program.summary}</p>}
          {program.period && (
            <p className="mt-4 flex items-center gap-2 text-sm text-gold-300">
              <CalendarDays className="size-4" aria-hidden="true" /> {program.period}
            </p>
          )}
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-[1fr_20rem]">
          <div>
            {program.cover_url && (
              <div className="relative mb-8 aspect-video overflow-hidden rounded-[var(--radius-card)]">
                <Image src={program.cover_url} alt={program.title} fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" priority />
              </div>
            )}
            {program.content ? (
              <Markdown>{program.content}</Markdown>
            ) : (
              <p className="text-muted">Deskripsi lengkap program ini akan segera diperbarui.</p>
            )}

            {photos.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-xl font-extrabold text-brand-800">Dokumentasi</h2>
                <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {photos.map((g) => (
                    <li key={g.id} className="relative aspect-square overflow-hidden rounded-xl bg-brand-50">
                      <Image src={g.image_url} alt={g.alt || g.caption || program.title} fill sizes="(min-width: 640px) 33vw, 50vw" className="object-cover" />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            {program.youtube_url && (
              <a href={program.youtube_url} target="_blank" rel="noopener noreferrer" className="group relative block aspect-video overflow-hidden rounded-[var(--radius-card)] bg-brand-950">
                {thumb && <Image src={thumb} alt="" fill sizes="320px" className="object-cover opacity-70 group-hover:opacity-90" />}
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid size-12 place-items-center rounded-full bg-brand-500 text-white transition group-hover:scale-110">
                    <Play className="size-5 fill-white" aria-hidden="true" />
                  </span>
                </span>
                <span className="sr-only">Tonton video {program.title} di YouTube</span>
              </a>
            )}
            {division && (
              <div className="rounded-[var(--radius-card)] bg-canvas p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-gold-600">Divisi</p>
                <p className="mt-1 font-display text-lg font-bold text-brand-800">{division.name}</p>
                <p className="mt-2 text-sm text-muted">{division.description}</p>
              </div>
            )}
          </aside>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-canvas py-16">
          <Container>
            <SectionHeading title={`Program lain dari ${division?.name ?? "divisi ini"}`} />
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <li key={p.id}>
                  <ProgramCard program={p} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
