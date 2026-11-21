import type { Metadata } from "next";
import { Icon, type IconName } from "@/components/icon";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ScrollHighlight, WordsReveal } from "@/components/motion/text";
import { Container, PageHero, SectionHeading } from "@/components/ui";
import { FilosofiLogo } from "./filosofi-logo";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Mengenal perjalanan, visi, misi, nilai, dan filosofi logo Tanoto Scholars Association IPB.",
};

const missions = [
  "Membangun lingkungan yang inklusif dan suportif bagi seluruh anggota TSA IPB agar merasa dihargai dan termotivasi untuk berkembang.",
  "Menciptakan suasana penuh rasa hormat, kepercayaan, dan komunikasi yang terbuka.",
  "Memfasilitasi pertumbuhan dengan menyediakan kesempatan untuk belajar, memimpin, dan berkembang baik sebagai individu maupun sebagai tim.",
  "Menetapkan identitas organisasi yang kuat melalui branding yang konsisten dan kemitraan yang bermakna.",
];

// Core values dari PPT Benchmarking.
const values: { name: string; desc: string; icon: IconName }[] = [
  { name: "Integrity", desc: "Jujur, konsisten, dan bertanggung jawab dalam setiap amanah.", icon: "shield-checkmark-outline" },
  { name: "Driven", desc: "Bergerak dengan semangat dan orientasi pada hasil.", icon: "rocket-outline" },
  { name: "Empower Others", desc: "Tumbuh bersama dengan menguatkan orang di sekitar.", icon: "people-outline" },
  { name: "Continuous Learning", desc: "Selalu belajar dan meningkatkan diri.", icon: "bulb-outline" },
  { name: "Care for Others", desc: "Peduli pada sesama anggota dan masyarakat.", icon: "heart-outline" },
  { name: "Entrepreneurial Spirits", desc: "Kreatif, inovatif, dan berani mengambil inisiatif.", icon: "flame-outline" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero title="Ruang untuk tumbuh dan berekspresi." subtitle="Tentang Kami" />

      {/* Siapa kami */}
      <section className="py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-[16rem_1fr]">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-600">Siapa Kami</p>
          </Reveal>
          <div>
            <ScrollHighlight
              className="text-2xl font-light leading-snug text-brand-900 sm:text-[2rem]"
              text="TSA IPB beranggotakan 42 pengurus aktif. Posisi leader diisi angkatan 2025, dengan mayoritas pengurus dari TELADAN 2026. Kami percaya kepemimpinan harus merata — setiap anggota menjadi penanggung jawab kegiatan, sehingga semua punya kesempatan nyata untuk memimpin."
            />
            <Reveal className="mt-8">
              <p className="max-w-2xl leading-relaxed text-muted">
                Tanoto Scholars Association (TSA) IPB adalah organisasi penerima beasiswa TELADAN dari Tanoto Foundation di IPB University.
                Kami mengedepankan rasa kekeluargaan yang disertai profesionalitas.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Visi & misi */}
      <section className="bg-canvas py-24 sm:py-32">
        <Container>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-600">Visi</p>
          </Reveal>
          <p className="mt-5 max-w-4xl text-3xl font-light leading-snug text-brand-900 sm:text-[2.6rem]">
            <WordsReveal text="Menjadikan TSA IPB ruang yang menyenangkan untuk tumbuh dan berekspresi — memberi dampak positif bagi individu dan masyarakat melalui kehangatan keluarga dan profesionalisme." />
          </p>

          <div className="mt-20 grid gap-10 lg:grid-cols-[16rem_1fr]">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-600">Misi</p>
            </Reveal>
            <Stagger as="ol" className="divide-y divide-line border-y border-line">
              {missions.map((m, i) => (
                <StaggerItem as="li" key={i} className="grid grid-cols-[3rem_1fr] gap-4 py-6">
                  <span className="text-sm tabular-nums text-gold-600">0{i + 1}</span>
                  <p className="text-lg font-light leading-relaxed text-brand-900">{m}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      {/* Filosofi logo */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading align="center" eyebrow="Filosofi Logo" title="Makna di balik setiap bentuk" description="Arahkan kursor atau ketuk salah satu makna untuk menyorot bagian logonya." />
          <div className="mt-16">
            <FilosofiLogo />
          </div>
        </Container>
      </section>

      {/* Nilai */}
      <section className="bg-brand-700 py-24 text-white sm:py-32">
        <Container>
          <SectionHeading tone="light" eyebrow="Core Values" title="Nilai yang kami pegang" description="Menjadi pegangan setiap divisi dalam berkarya." />
          <Stagger as="ul" className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <StaggerItem as="li" key={v.name} className="group bg-brand-700 p-8 transition-colors duration-500 hover:bg-brand-800">
                <Icon name={v.icon} className="size-7 text-gold-300 transition-transform duration-500 group-hover:-translate-y-1" />
                <h3 className="mt-6 text-lg font-medium">{v.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{v.desc}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
    </>
  );
}
