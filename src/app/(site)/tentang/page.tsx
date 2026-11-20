import type { Metadata } from "next";
import { Flame, HandHeart, Lightbulb, Rocket, ShieldCheck, Sprout, Users } from "lucide-react";
import { Container, PageHero, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Mengenal perjalanan, visi, misi, dan nilai Tanoto Scholars Association IPB.",
};

const missions = [
  "Membangun lingkungan yang inklusif dan suportif bagi seluruh anggota TSA IPB agar merasa dihargai dan termotivasi untuk berkembang.",
  "Menciptakan suasana penuh rasa hormat, kepercayaan, dan komunikasi yang terbuka.",
  "Memfasilitasi pertumbuhan dengan menyediakan kesempatan untuk belajar, memimpin, dan berkembang baik sebagai individu maupun sebagai tim.",
  "Menetapkan identitas organisasi yang kuat melalui branding yang konsisten dan kemitraan yang bermakna.",
];

// Core values dari PPT Benchmarking. Ganti dengan "8 Nilai TELADAN" setelah materinya tersedia.
const values = [
  { name: "Integrity", desc: "Jujur, konsisten, dan bertanggung jawab dalam setiap amanah.", Icon: ShieldCheck },
  { name: "Driven", desc: "Bergerak dengan semangat dan orientasi pada hasil.", Icon: Rocket },
  { name: "Empower Others", desc: "Tumbuh bersama dengan menguatkan orang di sekitar.", Icon: Users },
  { name: "Continuous Learning", desc: "Selalu belajar dan meng-upgrade diri.", Icon: Lightbulb },
  { name: "Care for Others", desc: "Peduli pada sesama anggota dan masyarakat.", Icon: HandHeart },
  { name: "Entrepreneurial Spirits", desc: "Kreatif, inovatif, dan berani mengambil inisiatif.", Icon: Flame },
];

export default function AboutPage() {
  return (
    <>
      <PageHero title="Tentang Kami" subtitle="Mengenal Perjalanan, Visi, dan Nilai Tanoto Scholars" />

      <section className="py-20">
        <Container className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <SectionHeading eyebrow="Siapa Kami" title="Tanoto Scholars Association IPB" />
            <div className="mt-5 space-y-4 leading-relaxed text-muted">
              <p>
                Tanoto Scholars Association (TSA) IPB adalah organisasi yang mewadahi mahasiswa penerima beasiswa Tanoto
                Foundation di IPB University. TSA IPB beranggotakan <strong className="text-ink">42 pengurus aktif</strong>; posisi
                leader diisi oleh angkatan 2025, dengan mayoritas pengurus berasal dari TELADAN 2026.
              </p>
              <p>
                Kami berfokus pada pembentukan kepemimpinan yang merata melalui penugasan setiap anggota sebagai penanggung
                jawab kegiatan, sehingga seluruh pengurus memiliki kesempatan dan tanggung jawab nyata untuk memimpin program
                kerja secara langsung.
              </p>
              <p>TSA IPB juga mengedepankan rasa kekeluargaan yang disertai profesionalitas.</p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[var(--radius-card)] bg-brand-700 p-8 text-white shadow-xl">
            <Sprout className="size-10 text-gold-300" aria-hidden="true" />
            <p className="mt-4 font-display text-3xl font-extrabold leading-tight">
              Berdaya,
              <br />
              Berkarya,
              <br />
              <span className="text-gold-300">Digdaya.</span>
            </p>
            <p className="mt-4 text-sm text-white/80">Tagline TSA IPB 2026</p>
          </div>
        </Container>
      </section>

      <section className="bg-canvas py-20">
        <Container className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="rounded-[var(--radius-card)] bg-brand-700 p-8 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-300">Visi</p>
            <p className="mt-4 font-display text-xl font-bold leading-relaxed">
              Menjadikan TSA IPB sebagai ruang yang menyenangkan untuk tumbuh dan berekspresi, yang memberikan dampak positif
              bagi individu maupun masyarakat, melalui perpaduan antara kehangatan keluarga dan profesionalisme.
            </p>
          </div>
          <div className="rounded-[var(--radius-card)] bg-white p-8 ring-1 ring-brand-100">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">Misi</p>
            <ol className="mt-4 space-y-4">
              {missions.map((m, i) => (
                <li key={i} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gold-100 font-display font-bold text-gold-600">{i + 1}</span>
                  <p className="leading-relaxed text-muted">{m}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Core Values" title="Nilai-Nilai Kami" description="Nilai yang menjadi pegangan setiap divisi dalam berkarya." align="center" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(({ name, desc, Icon }) => (
              <li key={name} className="rounded-[var(--radius-card)] bg-white p-6 shadow-sm ring-1 ring-brand-100">
                <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-brand-800">{name}</h3>
                <p className="mt-1 text-sm text-muted">{desc}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
