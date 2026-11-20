import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import type { Division, Post, Program } from "@/lib/types";
import { formatDate } from "@/lib/format";
import { Pill } from "./ui";

export function ProgramCard({ program, division }: { program: Program; division?: Division }) {
  return (
    <Link
      href={`/program/${program.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-brand-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] bg-gradient-to-br from-brand-700 to-brand-900">
        {program.cover_url ? (
          <Image src={program.cover_url} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
        ) : (
          <span className="absolute inset-0 grid place-items-center p-6 text-center font-display text-lg font-extrabold text-white/90">
            {program.title}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        {division && <Pill className="self-start">{division.name}</Pill>}
        <h3 className="mt-3 font-display text-lg font-bold text-brand-800">{program.title}</h3>
        {program.summary && <p className="mt-2 line-clamp-3 text-sm text-muted">{program.summary}</p>}
        <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold text-brand-600 group-hover:gap-2">
          Selengkapnya <ArrowRight className="size-4 transition-all" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/berita/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-sm ring-1 ring-brand-100 transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] bg-gradient-to-b from-brand-600 to-brand-100">
        {post.cover_url && <Image src={post.cover_url} alt="" fill sizes="(min-width: 1024px) 25vw, 100vw" className="object-cover" />}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <Pill className="self-start">{post.category}</Pill>
        <h3 className="mt-3 line-clamp-2 font-display font-bold text-brand-800">{post.title}</h3>
        {post.excerpt && <p className="mt-2 line-clamp-3 text-sm text-muted">{post.excerpt}</p>}
        <p className="mt-auto flex items-center gap-1.5 pt-4 text-xs text-muted">
          <CalendarDays className="size-3.5" aria-hidden="true" />
          {formatDate(post.published_at)}
        </p>
      </div>
    </Link>
  );
}
