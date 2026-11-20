import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, UserRound } from "lucide-react";
import { getLatestPosts, getPost, getPosts } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { Markdown } from "@/components/markdown";
import { PostCard } from "@/components/cards";
import { Container, Contours, Pill, SectionHeading } from "@/components/ui";
import { ShareButtons } from "./share-buttons";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  const posts = await getPosts();
  // Cache Components butuh minimal satu param; slug placeholder akan menghasilkan 404.
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "_" }];
}

export async function generateMetadata({ params }: PageProps<"/berita/[slug]">): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article", publishedTime: post.published_at ?? undefined, images: post.cover_url ? [post.cover_url] : undefined },
  };
}

export default async function PostPage({ params }: PageProps<"/berita/[slug]">) {
  const { slug } = await params;
  const [post, latest] = await Promise.all([getPost(slug), getLatestPosts(4)]);
  if (!post) notFound();
  const others = latest.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-brand-700 pb-14 pt-32 text-white sm:pt-36">
        <Contours />
        <Container className="relative max-w-3xl">
          <Link href="/berita" className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white">
            <ArrowLeft className="size-4" aria-hidden="true" /> Semua berita
          </Link>
          <div className="mt-6">
            <Pill className="bg-white/15 text-gold-300">{post.category}</Pill>
          </div>
          <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight sm:text-4xl">{post.title}</h1>
          <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-white/80">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-4" aria-hidden="true" /> {formatDate(post.published_at)}
            </span>
            {post.author && (
              <span className="inline-flex items-center gap-1.5">
                <UserRound className="size-4" aria-hidden="true" /> {post.author}
              </span>
            )}
          </p>
        </Container>
      </section>

      <article className="py-14">
        <Container className="max-w-3xl">
          {post.cover_url && (
            <div className="relative mb-10 aspect-video overflow-hidden rounded-[var(--radius-card)]">
              <Image src={post.cover_url} alt={post.title} fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" priority />
            </div>
          )}
          <Markdown>{post.content}</Markdown>
          <div className="mt-12 border-t border-brand-100 pt-6">
            <ShareButtons url={`${site.url}/berita/${post.slug}`} title={post.title} />
          </div>
        </Container>
      </article>

      {others.length > 0 && (
        <section className="bg-canvas py-16">
          <Container>
            <SectionHeading title="Baca juga" />
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {others.map((p) => (
                <li key={p.id}>
                  <PostCard post={p} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
