import Image from "next/image";
import Link from "next/link";
import type { Division, Post, Program } from "@/lib/types";
import { formatDate } from "@/lib/format";
import { brandOf } from "@/lib/divisions";
import { cn } from "@/lib/cn";
import { Icon } from "./icon";
import { Parallax } from "./motion/scroll";

/** Kartu proker: cover (atau panel warna divisi + logo), judul, ringkasan. */
export function ProgramCard({ program, division, tall }: { program: Program; division?: Division; tall?: boolean }) {
  const brand = brandOf(division?.slug);
  return (
    <Link
      href={`/program/${program.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white ring-1 ring-line transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgba(5,58,38,0.35)]"
    >
      <div className={cn("relative overflow-hidden", tall ? "aspect-[4/5]" : "aspect-[16/11]")} style={{ backgroundColor: brand.soft }}>
        <Parallax amount={tall ? 10 : 6}>
          {program.cover_url ? (
            <Image
              src={program.cover_url}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-105"
            />
          ) : (
            <Image
              src={brand.logo}
              alt=""
              width={200}
              height={200}
              className="absolute inset-0 m-auto h-2/5 w-auto object-contain opacity-90 transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-110 group-hover:-rotate-3"
            />
          )}
        </Parallax>
        {division && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 py-1 pl-1 pr-3 text-xs text-ink backdrop-blur">
            <Image src={brand.logo} alt="" width={20} height={20} className="size-5 object-contain" />
            {division.name}
          </span>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-6 [overflow-wrap:anywhere]">
        <h3 className="text-lg font-medium leading-snug text-brand-900">{program.title}</h3>
        {program.summary && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{program.summary}</p>}
        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm text-brand-700">
          Selengkapnya
          <Icon name="arrow-forward" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

/** Kartu artikel untuk daftar Berita. */
export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/berita/${post.slug}`} className="group flex h-full min-w-0 flex-col [overflow-wrap:anywhere]">
      <div className="relative aspect-[16/11] overflow-hidden rounded-[var(--radius-card)] bg-brand-100">
        {post.cover_url ? (
          <Image src={post.cover_url} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-105" />
        ) : (
          <Image src="/brand/logo-mark.webp" alt="" width={80} height={150} className="absolute inset-0 m-auto h-1/2 w-auto opacity-20" />
        )}
      </div>
      <p className="mt-4 flex items-center gap-2 text-xs text-muted">
        <span className="text-gold-600">{post.category}</span>
        <span aria-hidden="true">·</span>
        {formatDate(post.published_at)}
      </p>
      <h3 className="mt-2 line-clamp-2 text-lg font-medium leading-snug text-brand-900 decoration-gold-500 decoration-1 underline-offset-4 group-hover:underline">
        {post.title}
      </h3>
      {post.excerpt && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>}
    </Link>
  );
}

/** Kartu "Kisah Inspiratif": gambar penuh dengan judul di atas gradasi hijau (sesuai desain). */
export function StoryCard({ post }: { post: Post }) {
  return (
    <Link href={`/berita/${post.slug}`} className="group relative block aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-brand-700">
      {post.cover_url && (
        <Image src={post.cover_url} alt="" fill sizes="(min-width: 1024px) 25vw, 80vw" className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-105" />
      )}
      <span className="absolute inset-0 bg-gradient-to-b from-brand-800/95 via-brand-800/40 to-transparent" />
      <span className="absolute inset-x-0 top-0 p-5 text-white">
        <span className="line-clamp-2 font-medium leading-snug">{post.title}</span>
        <span className="mt-2 block text-xs text-white/70">{formatDate(post.published_at)}</span>
      </span>
      <span className="absolute bottom-4 right-4 grid size-10 translate-y-2 place-items-center rounded-full bg-white text-brand-800 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <Icon name="arrow-forward" className="size-4" />
      </span>
    </Link>
  );
}
