import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Play, Quote } from "lucide-react";
import { getDivisions, getFeaturedPrograms, getLatestPosts, getSettings, getTestimonials } from "@/lib/data";
import { youtubeThumb } from "@/lib/format";
import { PostCard, ProgramCard } from "@/components/cards";
import { IndonesiaMap } from "@/components/home/indonesia-map";
import { Container, Contours, SectionHeading } from "@/components/ui";

export default async function HomePage() {
  const [settings, divisions, featured, posts, testimonials] = await Promise.all([
    getSettings(),
    getDivisions(),
    getFeaturedPrograms(3),
    getLatestPosts(4),
    getTestimonials(),
  ]);
  const divisionById = new Map(divisions.map((d) => [d.id, d]));
  const videoThumb = youtubeThumb(settings.profile_video_url);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-700 pb-28 pt-36 text-white sm:pt-44">
        <Contours />
        <Container className="relative">
          <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.1] sm:text-6xl">
            Berkarya, Berdaya, <span className="text-gold-300">DIGDAYA!</span>
          </h1>
          <p className="mt-4 font-display text-xl font-bold text-gold-300">TSA IPB 2026</p>
          <p className="mt-5 max-w-xl text-white/85">
            Wadah kolaborasi dan pengembangan diri mahasiswa penerima beasiswa Tanoto Foundation di IPB University
            untuk tumbuh, berekspresi, dan menghadirkan dampak positif bagi masyarakat.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/tentang" className="rounded-xl border border-white/60 px-5 py-3 text-sm font-semibold hover:bg-white/10">
              Kenali Kami Lebih Jauh
            </Link>
            <Link href="/program" className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-800 hover:bg-brand-50">
              Program Kami
            </Link>
          </div>
        </Container>
      </section>

      {/* Statistik */}
      <section aria-label="Statistik" className="relative -mt-14">
        <Container>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {settings.stats.map((s) => (
              <li key={s.label} className="rounded-[var(--radius-card)] bg-white p-5 text-center shadow-lg shadow-brand-950/10 ring-1 ring-brand-100">
                <p className="font-display text-3xl font-extrabold text-brand-700 sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm text-muted">{s.label}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Lebih dekat */}
      <section className="py-20">
        <Container className="grid items-center gap-10 md:grid-cols-2">
          <a
            href={settings.profile_video_url || undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!settings.profile_video_url}
            className="group relative block aspect-video overflow-hidden rounded-[var(--radius-card)] bg-brand-950 shadow-xl aria-disabled:pointer-events-none"
          >
            {videoThumb && <Image src={videoThumb} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-70 transition group-hover:opacity-90" />}
            <span className="absolute inset-0 grid place-items-center text-center text-white">
              <span>
                <span className="text-xs uppercase tracking-[0.2em] text-white/70">Mengenal Lebih Dekat</span>
                <span className="mt-1 block font-display text-lg font-bold">
                  {settings.profile_video_url ? "Tonton Video Profil Kami" : "Video profil segera hadir"}
                </span>
                {settings.profile_video_url && (
                  <span className="mx-auto mt-3 grid size-12 place-items-center rounded-full bg-brand-500 transition group-hover:scale-110">
                    <Play className="size-5 fill-white" aria-hidden="true" />
                  </span>
                )}
              </span>
            </span>
          </a>
          <div>
            <SectionHeading eyebrow="Tentang TSA IPB" title="Lebih dekat dengan TSA IPB!" />
            <p className="mt-4 leading-relaxed text-muted">
              TSA IPB beranggotakan 42 pengurus aktif. Posisi leader diisi oleh angkatan 2025, dengan mayoritas pengurus
              berasal dari TELADAN 2026. Kami berfokus pada pembentukan kepemimpinan yang merata: setiap anggota menjadi
              penanggung jawab kegiatan sehingga seluruh pengurus punya kesempatan nyata untuk memimpin.
            </p>
            <p className="mt-3 leading-relaxed text-muted">TSA IPB mengedepankan rasa kekeluargaan yang disertai profesionalitas.</p>
            <Link href="/tentang" className="mt-6 inline-flex items-center gap-1 font-semibold text-brand-600 hover:gap-2">
              Selengkapnya tentang kami <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Lokasi */}
      <section className="relative overflow-hidden bg-brand-700 py-16 text-white">
        <Contours />
        <Container className="relative">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-300">Berbasis di</p>
              <h2 className="mt-1 font-display text-2xl font-extrabold sm:text-3xl">Bogor, Jawa Barat</h2>
            </div>
            <p className="flex items-center gap-2 text-sm text-white/80">
              <MapPin className="size-4 text-gold-300" aria-hidden="true" /> IPB University, Dramaga
            </p>
          </div>
          <div className="mt-8">
            <IndonesiaMap />
          </div>
          <p className="mt-4 text-right text-[10px] text-white/50">
            Peta: <a className="underline" href="https://github.com/VictorCazanave/svg-maps" target="_blank" rel="noopener noreferrer">svg-maps</a> (CC BY 4.0)
          </p>
        </Container>
      </section>

      {/* Program unggulan */}
      {featured.length > 0 && (
        <section className="py-20">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Program Kerja" title="Program Unggulan" description="Dampak nyata yang kami ciptakan untuk anggota dan masyarakat." />
              <Link href="/program" className="rounded-xl bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800">
                Lihat semua
              </Link>
            </div>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {featured.map((p) => (
                <li key={p.id}>
                  <ProgramCard program={p} division={divisionById.get(p.division_id)} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* Testimoni */}
      {testimonials.length > 0 && (
        <section className="bg-canvas py-20">
          <Container>
            <SectionHeading eyebrow="Testimoni" title="Apa kata mereka tentang TSA?" description="Cerita dari anggota, alumni, dan mitra TSA IPB." />
          </Container>
          <ul className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]">
            {testimonials.map((t) => (
              <li key={t.id} className="w-[85%] max-w-md shrink-0 snap-start rounded-[var(--radius-card)] bg-gold-500 p-6 text-white shadow-md sm:w-[28rem]">
                <Quote className="size-6 text-white/60" aria-hidden="true" />
                <blockquote className="mt-3 leading-relaxed">“{t.quote}”</blockquote>
                <p className="mt-5 font-display font-bold">{t.name}</p>
                {t.role && <p className="text-sm text-white/80">{t.role}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Berita terbaru */}
      {posts.length > 0 && (
        <section className="py-20">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Berita & Cerita Inspirasi" title="Kabar Terbaru" description="Cerita kegiatan dan inspirasi dari keluarga TSA IPB." />
              <Link href="/berita" className="rounded-xl bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800">
                Lihat semua
              </Link>
            </div>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {posts.map((p) => (
                <li key={p.id}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="relative pb-0 pt-10">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-brand-800" aria-hidden="true" />
        <Container className="relative">
          <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-gold-500 px-6 py-12 text-white shadow-xl sm:px-12">
            <Contours className="opacity-20" />
            <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
                  Mari Berkolaborasi
                  <br />
                  untuk negeri!
                </h2>
                <p className="mt-2 max-w-md text-white/90">Terbuka untuk kemitraan, sponsorship, media partner, dan kolaborasi program sosial.</p>
              </div>
              <Link href="/kontak#form" className="self-start rounded-xl bg-white px-6 py-3 font-semibold text-brand-800 shadow hover:bg-brand-50 md:self-auto">
                Hubungi Kami
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
