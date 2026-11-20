import type { Metadata } from "next";
import { getDivisions, getGallery } from "@/lib/data";
import { Container, EmptyState, PageHero } from "@/components/ui";
import { GalleryGrid } from "./gallery-grid";

export const metadata: Metadata = {
  title: "Galeri",
  description: "Dokumentasi kegiatan TSA IPB.",
};

export default async function GalleryPage() {
  const [items, divisions] = await Promise.all([getGallery(), getDivisions()]);
  return (
    <>
      <PageHero title="Galeri Dokumentasi" />
      <section className="py-16">
        <Container>
          {items.length ? (
            <GalleryGrid items={items} divisions={divisions.filter((d) => items.some((i) => i.division_id === d.id))} />
          ) : (
            <EmptyState title="Galeri masih kosong" description="Dokumentasi kegiatan akan segera diunggah." />
          )}
        </Container>
      </section>
    </>
  );
}
