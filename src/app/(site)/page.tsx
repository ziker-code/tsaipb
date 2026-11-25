import Image from "next/image";
import { getDivisions, getFeaturedPrograms, getGallery, getPosts, getSettings, getTestimonials } from "@/lib/data";
import { youtubeThumb } from "@/lib/format";
import { brandOf } from "@/lib/divisions";
import { faqs } from "@/lib/faq";
import { NewsFeature, NewsFeatureSkeleton, NewsRow, NewsRowSkeleton, ProgramTile, StoryCard, StorySkeleton } from "@/components/cards";
import { TestimonialCarousel } from "@/components/home/testimonial-carousel";
import { IndonesiaMap } from "@/components/home/indonesia-map";
import { Icon } from "@/components/icon";
import { Accordion } from "@/components/motion/accordion";
import { Carousel } from "@/components/motion/carousel";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { LineReveal, ScrollHighlight, WordsReveal } from "@/components/motion/text";
import { ButtonLink, Container, SectionHeading } from "@/components/ui";
import { ExpandOnScroll, PhotoHero, RiseOnScroll, ScrollRows } from "@/components/motion/scroll";
import heroBg from "@/assets/hero-bg.webp";

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
      {/* ───────────── Hero (foto bersama + overlay 50%) ───────────── */}
      <PhotoHero image={heroBg} className="flex min-h-[100svh] flex-col justify-end pb-24 pt-40 sm:pb-32">
        <Container>
          <h1 className="max-w-4xl text-5xl font-light leading-[1.05] sm:text-7xl lg:text-8xl">
            <LineReveal lines={["Berdaya, Berkarya,", <span key="d" className="font-semibold text-gold-300">DIGDAYA!</span>]} delay={0.15} />
          </h1>
          <div className="mt-8 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <Reveal delay={0.5} className="max-w-2xl">
              <p className="text-lg font-light leading-relaxed text-white/85">
                Bersama TSA IPB, penerima beasiswa Tanoto Foundation berkarya melalui kolaborasi, tumbuh menjadi pribadi berdaya, dan
                mengabdi untuk membawa perubahan bagi masyarakat.
              </p>
            </Reveal>
            <Reveal delay={0.65} className="flex flex-wrap gap-3">
              <ButtonLink href="/program" variant="light">
                Program Kami
              </ButtonLink>
              <ButtonLink href="/tentang" variant="outline">
                Kenali TSA IPB
              </ButtonLink>
            </Reveal>
          </div>
        </Container>
      </PhotoHero>

      {/* ───────────── Kenali lebih dekat: video lebar menempel ke tepi kiri ───────────── */}
      <section className="py-24 sm:py-32">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,58fr)_minmax(0,42fr)] lg:gap-16">
          <Reveal>
            <a
              href={settings.profile_video_url || undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!settings.profile_video_url}
              className="group relative block aspect-video overflow-hidden bg-brand-950 aria-disabled:pointer-events-none lg:rounded-r-[2rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
            >
              {videoThumb ? (
                <Image src={videoThumb} alt="" fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover opacity-70 transition-[opacity,transform] duration-700 motion-reduce:transition-none group-hover:scale-105 group-hover:opacity-90" />
              ) : (
                <Image src={heroBg} alt="" fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover opacity-40" />
              )}
              <span className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-950/20 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 text-white sm:p-10">
                <span>
                  <span className="block text-sm text-white/70">Profil TSA IPB</span>
                  <span className="mt-1 block text-2xl font-light sm:text-3xl">{settings.profile_video_url ? "Tonton video profil kami" : "Video profil segera hadir"}</span>
                </span>
                {settings.profile_video_url && (
                  <span className="grid size-16 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur transition-[transform,background-color,color] duration-500 motion-reduce:transition-none group-hover:scale-110 group-hover:bg-gold-300 group-hover:text-brand-950">
                    <Icon name="play" className="ml-0.5 size-6" />
                  </span>
                )}
              </span>
            </a>
          </Reveal>
          <div className="px-4 sm:px-6 lg:pl-0 lg:pr-6">
            <SectionHeading size="md" title="Kenali Lebih Dekat TSA IPB" />
            <ScrollHighlight
              className="mt-6 text-xl font-light leading-relaxed text-brand-900 sm:text-2xl"
              text="Tanoto Scholars Association (TSA) IPB adalah komunitas penerima beasiswa TELADAN dari Tanoto Foundation di IPB University. Kami hadir sebagai ruang untuk belajar, bertumbuh, dan berkolaborasi, mengubah semangat berkarya menjadi kontribusi yang bermakna."
            />
            <Reveal className="mt-8">
              <ButtonLink href="/tentang" variant="ghost">
                Selengkapnya tentang kami
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── Pita sorotan: dua baris bergerak berlawanan mengikuti scroll ───────────── */}
      <section aria-label="Sorotan" className="relative overflow-hidden bg-canvas py-16">
        <ScrollRows
          rows={[0, 1].map((row) =>
            Array.from({ length: 3 }).flatMap((_, rep) =>
              photos.length >= 4
                ? photos.map((g, i) => (
                    <div key={`${row}-${rep}-${g.id}`} aria-hidden={rep > 0 || row > 0} className="relative h-52 w-80 shrink-0 overflow-hidden rounded-[var(--radius-card)] sm:h-64 sm:w-[26rem]">
                      <Image src={photos[(i + row * 3) % photos.length].image_url} alt={rep === 0 && row === 0 ? g.alt : ""} fill sizes="416px" className="object-cover" />
                    </div>
                  ))
                : divisions.map((_, i) => {
                    const d = divisions[(i + row * 3) % divisions.length];
                    const b = brandOf(d.slug);
                    return (
                      <div key={`${row}-${rep}-${d.id}`} aria-hidden={rep > 0 || row > 0} className="flex h-36 w-80 shrink-0 items-center gap-5 rounded-[var(--radius-card)] bg-white px-7 ring-1 ring-line sm:h-40 sm:w-96">
                        <Image src={b.logo} alt="" width={64} height={64} className="size-14 object-contain" />
                        <span>
                          <span className="block text-xs font-medium" style={{ color: b.color }}>
                            {b.code || "TSA"}
                          </span>
                          <span className="mt-1 block text-lg font-light text-brand-900">{d.name}</span>
                        </span>
                      </div>
                    );
                  }),
            ),
          )}
        />
        <Container className="mt-10 flex justify-end">
          <ButtonLink href="/galeri" variant="ghost">
            Jelajahi Galeri
            <Icon name="arrow-forward" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </ButtonLink>
        </Container>
      </section>

      {/* ───────────── TSA IPB Berdampak ───────────── */}
      <ExpandOnScroll className="relative overflow-hidden bg-brand-700 py-24 text-white sm:py-32">
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
      </ExpandOnScroll>

      {/* ───────────── Cerita Mereka (kartu lebar ala referensi) ───────────── */}
      <section className="overflow-x-clip py-24 sm:py-28">
        <Container>
          <SectionHeading size="md" title="Cerita Mereka tentang TSA IPB" description="Pengalaman belajar, bertumbuh, dan berkontribusi bersama TSA IPB." />
        </Container>
        <div className="mt-10">
          <TestimonialCarousel items={testimonials} />
        </div>
      </section>

      {/* ───────────── Program TSA IPB ───────────── */}
      {featured.length > 0 && (
        <section className="py-16 sm:py-20">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading size="md" title="Program TSA IPB" description="Jelajahi ruang belajar, kolaborasi, dan pengabdian bersama TSA IPB." />
              <Reveal>
                <ButtonLink href="/program" variant="ghost">
                  Semua program
                </ButtonLink>
              </Reveal>
            </div>
            <Stagger as="ul" className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-[repeat(3,minmax(0,1fr))]">
              {featured.map((p) => (
                <StaggerItem as="li" key={p.id}>
                  <ProgramTile program={p} division={divisionById.get(p.division_id)} />
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </section>
      )}

      {/* ───────────── Kisah Inspiratif (selalu tampil; kerangka bila belum ada) ───────────── */}
      <section className="overflow-x-clip py-16 sm:py-20">
        <Container>
          <Carousel
            label="Kisah inspiratif"
            header={<SectionHeading size="md" title="Kisah Inspiratif" description="Temukan inspirasi dari perjalanan dan semangat para Tanoto Scholars." />}
            actions={
              <ButtonLink href="/berita" className="mr-2 px-4 py-2">
                Lihat Semua
              </ButtonLink>
            }
          >
            {stories.length
              ? stories.map((p) => (
                  <li key={p.id} className="w-[78%] shrink-0 snap-start sm:w-[18.75rem]">
                    <StoryCard post={p} />
                  </li>
                ))
              : [0, 1, 2, 3, 4].map((i) => (
                  <li key={i} className="w-[78%] shrink-0 snap-start sm:w-[18.75rem]">
                    <StorySkeleton label={i === 0 ? "Kisah pertama segera hadir" : undefined} />
                  </li>
                ))}
          </Carousel>
        </Container>
      </section>

      {/* ───────────── Kabar Terbaru (selalu tampil; kerangka bila belum ada) ───────────── */}
      <section className="pb-24 pt-8 sm:pb-28">
        <Container>
          <SectionHeading size="md" title="Kabar Terbaru" description="Ikuti kabar kegiatan, kolaborasi, dan perkembangan terkini TSA IPB." />
          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
            <Reveal className="min-w-0">{headline ? <NewsFeature post={headline} /> : <NewsFeatureSkeleton label="Kabar pertama segera hadir" />}</Reveal>
            <Stagger as="ul" className="grid content-start gap-3">
              {(moreNews.length ? moreNews : [null, null, null]).map((p, i) => (
                <StaggerItem as="li" key={p?.id ?? i}>
                  {p ? <NewsRow post={p} /> : <NewsRowSkeleton />}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      {/* ───────────── FAQ (gaya referensi) ───────────── */}
      <section className="px-3 sm:px-6">
        <RiseOnScroll className="mx-auto max-w-[96rem] rounded-[2rem] bg-brand-950 py-20 text-white sm:py-28">
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
        </RiseOnScroll>
      </section>

      {/* ───────────── CTA ───────────── */}
      <section className="relative pt-24">
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-brand-800" />
        <Container className="relative">
          <RiseOnScroll>
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
          </RiseOnScroll>
        </Container>
      </section>
    </>
  );
}
