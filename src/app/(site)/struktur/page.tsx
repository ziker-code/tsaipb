import type { Metadata } from "next";
import { getDivisions, getMembers } from "@/lib/data";
import type { Division, Member } from "@/lib/types";
import { Container, PageHero, Pill, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Struktur Organisasi",
  description: "Struktur kepengurusan TSA IPB 2026: Executive Board dan lima divisi.",
};

const ebRoles = [["President"], ["Vice President"], ["Secretary 1", "Secretary 2", "Treasurer 1", "Treasurer 2"]];

const coordination = [
  { step: "Project / Program Kerja", desc: "Setiap proker memiliki PIC dari anggota." },
  { step: "Executive Board", desc: "Mengoordinasikan dan mengawasi jalannya organisasi." },
  { step: "Director, Secretary & Treasurer", desc: "Memimpin divisi bersama sekretaris dan bendahara divisi." },
  { step: "PIC & Lead Divisi", desc: "Menjalankan proker dan memberi instruksi." },
  { step: "Member", desc: "Berkoordinasi dan mengeksekusi kegiatan." },
];

function MemberList({ members }: { members: Member[] }) {
  if (!members.length) return <p className="mt-4 text-sm italic text-muted">Daftar pengurus segera diumumkan.</p>;
  return (
    <ul className="mt-4 grid gap-2">
      {members.map((m) => (
        <li key={m.id} className="flex items-baseline justify-between gap-3 border-b border-brand-50 pb-2 last:border-0">
          <span className="font-semibold text-ink">{m.name}</span>
          <span className="shrink-0 text-xs text-muted">{m.position}</span>
        </li>
      ))}
    </ul>
  );
}

function DivisionCard({ division, members }: { division: Division; members: Member[] }) {
  return (
    <article className="flex flex-col rounded-[var(--radius-card)] bg-white p-6 shadow-sm ring-1 ring-brand-100">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-xl bg-brand-700 font-display text-sm font-extrabold text-white">{division.short_name}</span>
        <h3 className="font-display text-lg font-bold text-brand-800">{division.name}</h3>
      </div>
      <p className="mt-3 text-sm text-muted">{division.description}</p>
      <MemberList members={members} />
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
      <PageHero title="Struktur Organisasi" />

      {/* Bagan */}
      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Bagan" title="Kepengurusan TSA IPB 2026" align="center" />
          <div className="mt-10 flex flex-col items-center gap-3">
            {ebRoles.map((row, i) => (
              <div key={i} className="flex flex-wrap justify-center gap-3">
                {row.map((role) => (
                  <span
                    key={role}
                    className={i === 0 ? "rounded-xl bg-brand-700 px-6 py-3 font-display font-bold text-white" : "rounded-xl bg-brand-50 px-5 py-2.5 text-sm font-semibold text-brand-800 ring-1 ring-brand-100"}
                  >
                    {role}
                  </span>
                ))}
              </div>
            ))}
            <Pill className="mt-1">Executive Board</Pill>
            <span className="h-8 w-px bg-brand-100" aria-hidden="true" />
            <ul className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {others.map((d) => (
                <li key={d.id} className="rounded-xl bg-white p-4 text-center shadow-sm ring-1 ring-brand-100">
                  <p className="font-display font-bold text-brand-800">{d.name}</p>
                  <p className="mt-1 text-xs text-muted">Director · Secretary · Treasurer · Staff</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Pengurus per divisi */}
      <section className="bg-canvas py-20">
        <Container>
          <SectionHeading eyebrow="Pengurus" title="Mengenal Para Pengurus" description="42 pengurus aktif yang tersebar di Executive Board dan lima divisi." />
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {eb && <DivisionCard division={eb} members={byDivision(eb.id)} />}
            {others.map((d) => (
              <DivisionCard key={d.id} division={d} members={byDivision(d.id)} />
            ))}
          </div>
        </Container>
      </section>

      {/* Alur koordinasi */}
      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Cara Kami Bekerja" title="Alur Koordinasi" description="Setiap anggota mendapat kesempatan memimpin sebagai PIC program kerja." />
          <ol className="mt-8 grid gap-4 md:grid-cols-5">
            {coordination.map((c, i) => (
              <li key={c.step} className="relative rounded-[var(--radius-card)] bg-white p-5 ring-1 ring-brand-100">
                <span className="font-display text-3xl font-extrabold text-gold-500">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 font-display font-bold text-brand-800">{c.step}</p>
                <p className="mt-1 text-sm text-muted">{c.desc}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
