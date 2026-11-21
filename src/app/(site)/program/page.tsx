import type { Metadata } from "next";
import { Suspense } from "react";
import { getDivisions, getPrograms } from "@/lib/data";
import { Container, PageHero } from "@/components/ui";
import { ProgramBrowser, ProgramBrowserFromParams } from "./program-browser";

export const metadata: Metadata = {
  title: "Program Kerja",
  description: "Program kerja TSA IPB 2026 dari Executive Board dan kelima divisi.",
};

export default async function ProgramsPage() {
  const [divisions, programs] = await Promise.all([getDivisions(), getPrograms()]);
  return (
    <>
      <PageHero title="Program yang menumbuhkan." subtitle="Program Kerja" />
      <section className="py-20 sm:py-24">
        <Container>
          <Suspense fallback={<ProgramBrowser divisions={divisions} programs={programs} />}>
            <ProgramBrowserFromParams divisions={divisions} programs={programs} />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
