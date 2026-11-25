import type { Metadata } from "next";
import { MediaImage } from "@/components/media-image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icon";
import { getLatestPosts, getPost, getPosts } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { Markdown } from "@/components/markdown";
import { PostCard } from "@/components/cards";
import { Container, Pill, SectionHeading } from "@/components/ui";
import { PhotoHero } from "@/components/motion/scroll";
import heroBg from "@/assets/hero-bg.webp";
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
      <PhotoHero image={heroBg} className="pb-16 pt-40 sm:pb-24 sm:pt-48">
        <Container narrow className="relative">
          <Link href="/berita" className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white">
            <Icon name="arrow-back" className="size-4" aria-hidden="true" /> Semua berita
          </Link>
          <div className="mt-6">
            <Pill className="bg-white/15 text-gold-300">{post.category}</Pill>
          </div>
          <h1 className="mt-3 text-3xl font-light leading-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-white/80">
            <span className="inline-flex items-center gap-1.5">
              <Icon name="calendar-outline" className="size-4" aria-hidden="true" /> {formatDate(post.published_at)}
            </span>
            {post.author && (
              <span className="inline-flex items-center gap-1.5">
                <Icon name="person-outline" className="size-4" aria-hidden="true" /> {post.author}
              </span>
            )}
          </p>
        </Container>
      </PhotoHero>

      <article className="py-14">
        <Container narrow>
          {post.cover_url && (
            <div className="relative mb-10 aspect-video overflow-hidden rounded-[var(--radius-card)]">
              <MediaImage src={post.cover_url} alt={post.title} fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" priority />
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
