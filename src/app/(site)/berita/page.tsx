import type { Metadata } from "next";
import { getPosts } from "@/lib/data";
import { PostCard } from "@/components/cards";
import { Container, EmptyState, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Berita & Blog",
  description: "Berita kegiatan, publikasi, dan cerita inspirasi dari TSA IPB.",
};

export default async function NewsPage() {
  const posts = await getPosts();
  return (
    <>
      <PageHero title="Berita, Blog & Publikasi" />
      <section className="py-16">
        <Container>
          {posts.length ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <li key={p.id}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title="Belum ada berita" description="Cerita kegiatan TSA IPB akan segera hadir di sini." />
          )}
        </Container>
      </section>
    </>
  );
}
