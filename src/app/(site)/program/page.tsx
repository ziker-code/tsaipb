import type { Metadata } from "next";
import { getDivisions, getPrograms } from "@/lib/data";
import { Container, PageHero } from "@/components/ui";
import { ProgramBrowser } from "./program-browser";

export const metadata: Metadata = {
  title: "Program Kerja",
  description: "Program kerja TSA IPB 2026 dari Executive Board dan kelima divisi.",
};

export default async function ProgramsPage() {
  const [divisions, programs] = await Promise.all([getDivisions(), getPrograms()]);
  return (
    <>
      <PageHero title="Program Kerja" />
      <section className="py-16">
        <Container>
          <ProgramBrowser divisions={divisions} programs={programs} />
        </Container>
      </section>
    </>
  );
}
