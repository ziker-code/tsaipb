import Image from "next/image";
import Link from "next/link";
import { getDivisions, getFeaturedPrograms, getGallery, getPosts, getSettings, getTestimonials } from "@/lib/data";
import { youtubeThumb } from "@/lib/format";
import { brandOf } from "@/lib/divisions";
import { faqs } from "@/lib/faq";
import { formatDate } from "@/lib/format";
import { PostCard, ProgramCard, StoryCard } from "@/components/cards";
import { IndonesiaMap } from "@/components/home/indonesia-map";
import { Icon } from "@/components/icon";
import { Accordion } from "@/components/motion/accordion";
import { Carousel } from "@/components/motion/carousel";
import { CountUp } from "@/components/motion/count-up";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { LineReveal, ScrollHighlight, WordsReveal } from "@/components/motion/text";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";

export default async function HomePage() {
  const [settings, divisions, featured, posts, testimonials, gallery] = await Promise.all([
    getSettings(),
    getDivisions(),
    getFeaturedPrograms(3),
    getPosts(),
    getTestimonials(),
    getGallery(),
  ]);
  const divisionById = new Map(divisions.map((d) => [d.id, d]));
  const videoThumb = youtubeThumb(settings.profile_video_url);
  const stories = posts.filter((p) => p.category === "Cerita Inspirasi").slice(0, 8);
  const news = posts.filter((p) => p.category !== "Cerita Inspirasi").slice(0, 4);
  const [headline, ...moreNews] = news;
  const photos = gallery.slice(0, 12);

  return (
    <>
      {/* ───────────── Hero ───────────── */}
      <section className="relative overflow-hidden bg-brand-700 pb-40 pt-36 text-white sm:pb-48 sm:pt-44">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-1/2 hidden -translate-y-1/2 lg:block">
          <div className="animate-float">
            <Image src="/brand/logo-mark.webp" alt="" width={320} height={600} priority className="h-[520px] w-auto opacity-95 drop-shadow-[0_40px_60px_rgba(0,0,0,0.25)]" />
          </div>
        </div>
        <Container className="relative">
          <Reveal y={12}>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs tracking-wide text-white/80">
              <span className="size-1.5 rounded-full bg-gold-300" /> Tanoto Scholars Association · IPB University
            </p>
          </Reveal>
          <h1 className="mt-6 max-w-3xl text-5xl font-light leading-[1.02] sm:text-7xl">
            <LineReveal lines={["Berkarya, Berdaya,", <span key="d" className="font-semibold text-gold-300">DIGDAYA!</span>]} delay={0.1} />
          </h1>
          <Reveal delay={0.45} className="mt-7 max-w-lg">
            <p className="text-lg font-light leading-relaxed text-white/80">
              Bersama TSA IPB, penerima beasiswa Tanoto Foundation berkarya melalui kolaborasi, tumbuh menjadi pribadi berdaya, dan
              mengabdi untuk membawa perubahan bagi masyarakat.
            </p>
          </Reveal>
          <Reveal delay={0.6} className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/program" variant="light">
              Program Kami
              <Icon name="arrow-forward" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href="/tentang" variant="outline">
              Kenali TSA IPB
            </ButtonLink>
          </Reveal>
        </Container>
        {/* lengkung bawah sesuai desain */}
        <svg aria-hidden="true" viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute inset-x-0 -bottom-px h-16 w-full fill-white sm:h-24">
          <path d="M0 120V60C240 10 480 0 720 30s480 70 720 20v70Z" />
        </svg>
      </section>

      {/* ───────────── Statistik ───────────── */}
      <section aria-label="Statistik" className="relative -mt-28 sm:-mt-32">
        <Container>
          <Stagger as="ul" className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {settings.stats.map((s) => (
              <StaggerItem as="li" key={s.label} className="rounded-[var(--radius-card)] bg-white p-6 text-center shadow-[0_20px_50px_-24px_rgba(5,58,38,0.35)] ring-1 ring-line">
                <CountUp value={s.value} className="block text-4xl font-light text-brand-700 sm:text-5xl" />
                <p className="mt-2 text-sm text-muted">{s.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ───────────── Kenali lebih dekat ───────────── */}
      <section className="py-24 sm:py-32">
        <Container className="grid items-center gap-12 md:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <a
              href={settings.profile_video_url || undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!settings.profile_video_url}
              className="group relative block aspect-video overflow-hidden rounded-[var(--radius-card)] bg-brand-950 aria-disabled:pointer-events-none"
            >
              {videoThumb ? (
                <Image src={videoThumb} alt="" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-80" />
              ) : (
                <Image src="/brand/logo-mark.webp" alt="" width={80} height={150} className="absolute right-6 top-6 h-24 w-auto opacity-20" />
              )}
              <span className="absolute inset-0 flex flex-col items-start justify-end p-6 text-white">
                <span className="text-xs uppercase tracking-[0.25em] text-white/60">Profil TSA IPB</span>
                <span className="mt-1 text-lg font-light">{settings.profile_video_url ? "Tonton video profil kami" : "Video profil segera hadir"}</span>
              </span>
              {settings.profile_video_url && (
                <span className="absolute right-6 top-6 grid size-14 place-items-center rounded-full bg-white/15 backdrop-blur transition-all duration-500 group-hover:scale-110 group-hover:bg-gold-300 group-hover:text-brand-950">
                  <Icon name="play" className="ml-0.5 size-5" />
                </span>
              )}
            </a>
          </Reveal>
          <div>
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-600">Kenali Lebih Dekat</p>
            </Reveal>
            <ScrollHighlight
              className="mt-5 text-2xl font-light leading-snug text-brand-900 sm:text-[1.85rem]"
              text="Tanoto Scholars Association (TSA) IPB adalah komunitas penerima beasiswa TELADAN dari Tanoto Foundation di IPB University. Kami hadir sebagai ruang untuk belajar, bertumbuh, dan berkolaborasi — mengubah semangat berkarya menjadi kontribusi yang bermakna."
            />
            <Reveal className="mt-8">
              <ButtonLink href="/tentang" variant="ghost">
                Selengkapnya tentang kami
                <Icon name="arrow-forward" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </ButtonLink>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ───────────── Pita galeri / divisi ───────────── */}
      <section aria-label="Sorotan" className="relative overflow-hidden bg-canvas py-12">
        <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused] [--marquee-duration:55s]">
          {[0, 1].map((dup) =>
            photos.length >= 4
              ? photos.map((g) => (
                  <div key={`${dup}-${g.id}`} aria-hidden={dup === 1} className="relative h-56 w-80 shrink-0 overflow-hidden rounded-[var(--radius-card)] sm:h-64 sm:w-96">
                    <Image src={g.image_url} alt={dup === 0 ? g.alt : ""} fill sizes="384px" className="object-cover" />
                  </div>
                ))
              : divisions.map((d) => {
                  const b = brandOf(d.slug);
                  return (
                    <div key={`${dup}-${d.id}`} aria-hidden={dup === 1} className="flex h-40 w-72 shrink-0 items-center gap-5 rounded-[var(--radius-card)] bg-white px-7 ring-1 ring-line">
                      <Image src={b.logo} alt="" width={64} height={64} className="size-14 object-contain" />
                      <span>
                        <span className="block text-xs uppercase tracking-[0.2em]" style={{ color: b.color }}>
                          {b.code || "TSA"}
                        </span>
                        <span className="mt-1 block font-medium text-brand-900">{d.name}</span>
                      </span>
                    </div>
                  );
                }),
          )}
        </div>
        <Container className="mt-8 flex justify-end">
          <ButtonLink href="/galeri" variant="ghost">
            Jelajahi Galeri
            <Icon name="arrow-forward" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </ButtonLink>
        </Container>
      </section>

      {/* ───────────── TSA IPB Berdampak ───────────── */}
      <section className="relative overflow-hidden bg-brand-700 py-24 text-white sm:py-28">
        <Container className="relative">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading tone="light" eyebrow="Berbasis di Bogor, Jawa Barat" title="TSA IPB Berdampak" description="Dari IPB, bergerak bersama untuk membawa perubahan bagi negeri." />
            <Reveal>
              <p className="flex items-center gap-2 text-sm text-white/70">
                <Icon name="location-outline" className="size-4 text-gold-300" /> IPB University, Dramaga
              </p>
            </Reveal>
          </div>
          <Reveal className="mt-12" y={40}>
            <IndonesiaMap />
          </Reveal>
          <p className="mt-4 text-right text-[10px] text-white/40">
            Peta:{" "}
            <a className="underline" href="https://github.com/VictorCazanave/svg-maps" target="_blank" rel="noopener noreferrer">
              svg-maps
            </a>{" "}
            (CC BY 4.0)
          </p>
        </Container>
      </section>

      {/* ───────────── Testimoni ───────────── */}
      {testimonials.length > 0 && (
        <section className="overflow-hidden py-24 sm:py-32">
          <Container>
            <SectionHeading eyebrow="Testimoni" title="Cerita Mereka tentang TSA IPB" description="Pengalaman belajar, bertumbuh, dan berkontribusi bersama TSA IPB." />
            <Carousel label="Testimoni" className="sm:-mt-12" controlsClassName="hidden sm:flex">
              {testimonials.map((t) => (
                <li key={t.id} className="w-[85%] shrink-0 snap-start sm:w-[30rem]">
                  <figure className="flex h-full flex-col rounded-[var(--radius-card)] bg-gold-500 p-8 text-white">
                    <Icon name="chatbubble-ellipses-outline" className="size-6 text-white/60" />
                    <blockquote className="mt-5 flex-1 text-lg font-light leading-relaxed">“{t.quote}”</blockquote>
                    <figcaption className="mt-8 border-t border-white/25 pt-5">
                      <span className="block font-medium">{t.name}</span>
                      {t.role && <span className="text-sm text-white/75">{t.role}</span>}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </Carousel>
          </Container>
        </section>
      )}

      {/* ───────────── Program ───────────── */}
      {featured.length > 0 && (
        <section className="bg-canvas py-24 sm:py-32">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading eyebrow="Program TSA IPB" title="Ruang belajar, kolaborasi, dan pengabdian" />
              <Reveal>
                <ButtonLink href="/program" variant="ghost">
                  Semua program
                  <Icon name="arrow-forward" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </ButtonLink>
              </Reveal>
            </div>
            <Stagger as="ul" className="mt-12 grid gap-6 md:grid-cols-3">
              {featured.map((p) => (
                <StaggerItem as="li" key={p.id}>
                  <ProgramCard program={p} division={divisionById.get(p.division_id)} tall />
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </section>
      )}

      {/* ───────────── Kisah Inspiratif ───────────── */}
      {stories.length > 0 && (
        <section className="py-24 sm:py-32">
          <Container>
            <SectionHeading eyebrow="Kisah Inspiratif" title="Semangat para Tanoto Scholars" description="Temukan inspirasi dari perjalanan anggota TSA IPB." />
            <Carousel label="Kisah inspiratif" className="sm:-mt-12" controlsClassName="hidden sm:flex">
              {stories.map((p) => (
                <li key={p.id} className="w-[78%] shrink-0 snap-start sm:w-[18rem]">
                  <StoryCard post={p} />
                </li>
              ))}
            </Carousel>
          </Container>
        </section>
      )}

      {/* ───────────── Kabar Terbaru ───────────── */}
      {headline && (
        <section className={stories.length ? "pb-24 sm:pb-32" : "py-24 sm:py-32"}>
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading eyebrow="Kabar Terbaru" title="Kegiatan & kolaborasi terkini" />
              <Reveal>
                <ButtonLink href="/berita" variant="ghost">
                  Semua berita
                  <Icon name="arrow-forward" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </ButtonLink>
              </Reveal>
            </div>
            <div className="mt-12 grid gap-10 lg:grid-cols-[1.25fr_1fr]">
              <Reveal>
                <PostCard post={headline} />
              </Reveal>
              {moreNews.length > 0 && (
                <Stagger as="ul" className="grid content-start gap-4">
                  {moreNews.map((p) => (
                    <StaggerItem as="li" key={p.id}>
                      <Link href={`/berita/${p.slug}`} className="group flex gap-5 rounded-2xl p-2 transition-colors hover:bg-canvas">
                        <span className="relative aspect-[4/3] w-32 shrink-0 overflow-hidden rounded-xl bg-brand-100">
                          {p.cover_url && <Image src={p.cover_url} alt="" fill sizes="128px" className="object-cover transition-transform duration-700 group-hover:scale-105" />}
                        </span>
                        <span className="py-1">
                          <span className="line-clamp-2 font-medium leading-snug text-brand-900">{p.title}</span>
                          <span className="mt-2 block text-xs text-muted">{formatDate(p.published_at)}</span>
                        </span>
                      </Link>
                    </StaggerItem>
                  ))}
                </Stagger>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* ───────────── FAQ (gaya referensi) ───────────── */}
      <section className="px-3 sm:px-6">
        <div className="mx-auto max-w-[88rem] rounded-[2rem] bg-brand-950 py-20 text-white sm:py-28">
          <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <h2 className="text-4xl font-light leading-[1.08] text-gold-300 sm:text-5xl">
                <WordsReveal text="Pertanyaan yang Sering Diajukan" />
              </h2>
              <Reveal delay={0.2}>
                <p className="mt-5 max-w-sm leading-relaxed text-white/60">Jawaban singkat seputar TSA IPB, keanggotaan, dan peluang kolaborasi.</p>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <Accordion items={faqs} />
            </Reveal>
          </Container>
        </div>
      </section>

      {/* ───────────── CTA ───────────── */}
      <section className="relative pt-24">
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-brand-800" />
        <Container className="relative">
          <Reveal y={40}>
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-gold-300 via-gold-500 to-gold-600 px-8 py-14 sm:px-14 sm:py-16">
              <Image src="/brand/logo-mark.webp" alt="" aria-hidden="true" width={200} height={375} className="pointer-events-none absolute -right-6 -top-10 h-[140%] w-auto opacity-15 mix-blend-multiply" />
              <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-end">
                <h2 className="max-w-lg text-4xl font-light leading-[1.05] text-brand-950 sm:text-5xl">
                  Mari berkolaborasi <span className="font-semibold">untuk negeri.</span>
                </h2>
                <div className="max-w-xs">
                  <p className="text-sm leading-relaxed text-brand-950/75">Terbuka untuk kemitraan, sponsorship, media partner, dan program sosial bersama.</p>
                  <ButtonLink href="/kontak#form" className="mt-5 bg-brand-950 text-white hover:bg-brand-800">
                    Hubungi Kami
                    <Icon name="arrow-forward" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
