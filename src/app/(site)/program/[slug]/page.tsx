import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { getDivisions, getGallery, getProgram, getPrograms } from "@/lib/data";
import { youtubeThumb } from "@/lib/format";
import { Markdown } from "@/components/markdown";
import { ProgramCard } from "@/components/cards";
import { Container, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { LineReveal } from "@/components/motion/text";
import { brandOf } from "@/lib/divisions";

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
  const brand = brandOf(division?.slug);

  return (
    <>
      <section className="relative overflow-hidden rounded-b-[2.5rem] bg-brand-700 pb-16 pt-36 text-white sm:pb-20 sm:pt-44">
        <span aria-hidden="true" className="absolute inset-0 opacity-25" style={{ background: `radial-gradient(60% 80% at 85% 20%, ${brand.color}, transparent 70%)` }} />
        <Image src={brand.logo} alt="" aria-hidden="true" width={260} height={260} className="pointer-events-none absolute -right-8 top-24 hidden h-64 w-auto object-contain opacity-90 drop-shadow-2xl md:block lg:right-16" />
        <Container className="relative">
          <Link href="/program" className="group inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
            <Icon name="arrow-back" className="size-4 transition-transform group-hover:-translate-x-0.5" /> Semua program
          </Link>
          {division && (
            <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 py-1 pl-1 pr-3 text-xs text-white/85 backdrop-blur">
              <span className="grid size-6 place-items-center rounded-full bg-white">
                <Image src={brand.logo} alt="" width={16} height={16} className="size-4 object-contain" />
              </span>
              {division.name}
            </p>
          )}
          <h1 className="mt-5 max-w-3xl text-4xl font-light leading-[1.05] sm:text-6xl">
            <LineReveal lines={[program.title]} />
          </h1>
          {program.summary && (
            <Reveal delay={0.3}>
              <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/80">{program.summary}</p>
            </Reveal>
          )}
          {program.period && (
            <p className="mt-6 flex items-center gap-2 text-sm text-gold-300">
              <Icon name="calendar-outline" className="size-4" /> {program.period}
            </p>
          )}
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-[1fr_20rem]">
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
                <h2 className="text-2xl font-light text-brand-900">Dokumentasi</h2>
                <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {photos.map((g) => (
                    <li key={g.id} className="group relative aspect-square overflow-hidden rounded-2xl bg-brand-50">
                      <Image src={g.image_url} alt={g.alt || g.caption || program.title} fill sizes="(min-width: 640px) 33vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
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
                  <span className="grid size-14 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition duration-500 group-hover:scale-110 group-hover:bg-gold-300 group-hover:text-brand-950">
                    <Icon name="play" className="size-5" aria-hidden="true" />
                  </span>
                </span>
                <span className="sr-only">Tonton video {program.title} di YouTube</span>
              </a>
            )}
            {division && (
              <div className="rounded-[var(--radius-card)] p-6" style={{ backgroundColor: brand.soft }}>
                <Image src={brand.logo} alt="" width={48} height={48} className="size-10 object-contain" />
                <p className="mt-4 text-xs uppercase tracking-[0.2em]" style={{ color: brand.color }}>Divisi</p>
                <p className="mt-1 text-lg font-medium text-brand-900">{division.name}</p>
                <p className="mt-2 text-sm text-muted">{division.description}</p>
              </div>
            )}
          </aside>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-canvas py-20 sm:py-24">
          <Container>
            <SectionHeading title={`Program lain dari ${division?.name ?? "divisi ini"}`} />
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <li key={p.id}>
                  <ProgramCard program={p} division={division} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
