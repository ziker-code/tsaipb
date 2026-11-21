import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDivisions, getMembers } from "@/lib/data";
import { brandOf } from "@/lib/divisions";
import type { Division, Member } from "@/lib/types";
import { Icon } from "@/components/icon";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Container, PageHero, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Struktur Organisasi",
  description: "Struktur kepengurusan TSA IPB 2026: Executive Board dan lima divisi.",
};

const ebRoles = [["President"], ["Vice President"], ["Secretary 1", "Secretary 2", "Treasurer 1", "Treasurer 2"]];

const coordination = [
  { step: "Program Kerja", desc: "Setiap proker memiliki PIC dari anggota." },
  { step: "Executive Board", desc: "Mengoordinasikan dan mengawasi jalannya organisasi." },
  { step: "Director, Secretary & Treasurer", desc: "Memimpin divisi bersama sekretaris dan bendahara divisi." },
  { step: "PIC & Lead Divisi", desc: "Menjalankan proker dan memberi arahan." },
  { step: "Member", desc: "Berkoordinasi dan mengeksekusi kegiatan." },
];

function DivisionCard({ division, members }: { division: Division; members: Member[] }) {
  const b = brandOf(division.slug);
  return (
    <article className="group flex h-full flex-col rounded-[var(--radius-card)] bg-white p-7 ring-1 ring-line transition-shadow duration-500 hover:shadow-[0_24px_60px_-28px_rgba(5,58,38,0.35)]">
      <div className="flex items-center gap-4">
        <span className="grid size-14 place-items-center rounded-2xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105" style={{ backgroundColor: b.soft }}>
          <Image src={b.logo} alt={`Logo ${division.name}`} width={48} height={48} className="size-9 object-contain" />
        </span>
        <div>
          <p className="text-xs tracking-[0.2em]" style={{ color: b.color }}>
            {b.code}
          </p>
          <h3 className="text-lg font-medium text-brand-900">{division.name}</h3>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted">{division.description}</p>
      {members.length ? (
        <ul className="mt-6 grid gap-2.5 border-t border-line pt-5">
          {members.map((m) => (
            <li key={m.id} className="flex items-baseline justify-between gap-3 text-sm">
              <span className="text-ink">{m.name}</span>
              <span className="shrink-0 text-xs text-muted">{m.position}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 border-t border-line pt-5 text-sm italic text-muted">Daftar pengurus segera diumumkan.</p>
      )}
      <Link href={`/program?divisi=${division.slug}`} className="mt-auto inline-flex items-center gap-2 pt-6 text-sm text-brand-700">
        Program divisi <Icon name="arrow-forward" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </article>
  );
}

export default async function StructurePage() {
  const [divisions, members] = await Promise.all([getDivisions(), getMembers()]);
  const byDivision = (id: string) => members.filter((m) => m.division_id === id);
  const eb = divisions.find((d) => d.slug === "executive-board");
  const others = divisions.filter((d) => d.slug !== "executive-board");

  return (
    <>
      <PageHero title="Satu keluarga, enam pilar." subtitle="Struktur Organisasi" />

      {/* Bagan */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading align="center" eyebrow="Bagan" title="Kepengurusan TSA IPB 2026" />
          <div className="mt-14 flex flex-col items-center">
            <Stagger className="flex flex-col items-center gap-3">
              {ebRoles.map((row, i) => (
                <StaggerItem key={i} className="flex flex-wrap justify-center gap-3">
                  {row.map((role) => (
                    <span
                      key={role}
                      className={
                        i === 0
                          ? "rounded-full bg-brand-700 px-7 py-3 font-medium text-white"
                          : "rounded-full px-5 py-2.5 text-sm text-brand-900 ring-1 ring-line"
                      }
                    >
                      {role}
                    </span>
                  ))}
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold-600">
              {eb && <Image src={brandOf(eb.slug).logo} alt="" width={20} height={20} className="size-5 object-contain" />}
              Executive Board
            </Reveal>
            <span className="my-6 h-12 w-px bg-gradient-to-b from-line to-brand-700/40" aria-hidden="true" />
            <Stagger as="ul" className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {others.map((d) => {
                const b = brandOf(d.slug);
                return (
                  <StaggerItem as="li" key={d.id}>
                    <a href={`#${d.slug}`} className="group block rounded-[var(--radius-card)] p-5 text-center ring-1 ring-line transition-colors duration-500 hover:ring-transparent" style={{ ["--c" as string]: b.soft }}>
                      <span className="mx-auto grid size-16 place-items-center rounded-2xl transition-colors duration-500 group-hover:bg-[var(--c)]">
                        <Image src={b.logo} alt="" width={56} height={56} className="size-11 object-contain transition-transform duration-500 group-hover:scale-110" />
                      </span>
                      <p className="mt-3 text-sm font-medium text-brand-900">{d.name}</p>
                      <p className="mt-1 text-[11px] text-muted">Director · Secretary · Treasurer · Staff</p>
                    </a>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </Container>
      </section>

      {/* Pengurus per divisi */}
      <section className="bg-canvas py-24 sm:py-32">
        <Container>
          <SectionHeading eyebrow="Pengurus" title="Mengenal para pengurus" description="42 pengurus aktif di Executive Board dan lima divisi." />
          <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[eb, ...others].filter(Boolean).map((d) => (
              <StaggerItem key={d!.id} className="scroll-mt-28" >
                <div id={d!.slug}>
                  <DivisionCard division={d!} members={byDivision(d!.id)} />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Alur koordinasi */}
      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading eyebrow="Cara Kami Bekerja" title="Alur koordinasi" description="Setiap anggota mendapat kesempatan memimpin sebagai PIC program kerja." />
          <Stagger as="ol" className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-line md:grid-cols-5">
            {coordination.map((c, i) => (
              <StaggerItem as="li" key={c.step} className="bg-white p-6">
                <span className="text-sm tabular-nums text-gold-600">0{i + 1}</span>
                <p className="mt-6 font-medium text-brand-900">{c.step}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.desc}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
    </>
  );
}
