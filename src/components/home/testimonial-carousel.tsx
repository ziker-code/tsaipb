"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";
import type { Testimonial } from "@/lib/types";
import { cn } from "@/lib/cn";

const AUTOPLAY_MS = 6500;

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

/** Kartu emas sesuai referensi: kutipan, avatar menumpang di tepi bawah, bilah nama + angkatan. */
function StoryCardGold({ t, active }: { t: Testimonial; active: boolean }) {
  return (
    <figure
      className={cn(
        "relative flex h-full flex-col rounded-[var(--radius-card)] bg-gold-500 px-7 pb-16 pt-8 text-white transition-[transform,opacity] duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none sm:px-9",
        active ? "scale-100 opacity-100" : "scale-[0.92] opacity-55",
      )}
    >
      <blockquote className="text-lg font-light leading-relaxed sm:text-xl">{t.quote}</blockquote>
      <figcaption className="absolute -bottom-7 left-6 flex items-end gap-3 sm:left-8">
        <span className="relative grid size-16 shrink-0 place-items-center overflow-hidden rounded-full bg-canvas text-lg font-medium text-brand-800 ring-4 ring-white">
          {t.photo_url ? <Image src={t.photo_url} alt="" fill sizes="64px" className="object-cover" /> : initials(t.name)}
        </span>
        <span className="mb-1 grid gap-1">
          <span className="rounded-md bg-gold-600 px-3 py-1 text-sm font-medium text-white">{t.name}</span>
          {(t.batch || t.role) && (
            <span className="w-fit rounded-md bg-brand-900/80 px-3 py-0.5 text-xs text-white/90">{[t.batch, t.role].filter(Boolean).join(", ")}</span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Carousel berfokus-tengah: kartu aktif di tengah, kartu kiri/kanan mengintip di tepi layar.
 * Geser (swipe/drag), panah, keyboard ←/→, dan ganti otomatis (berhenti saat hover/fokus & reduced-motion).
 */
export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  // Mulai dari kartu kedua bila ≥3 cerita, supaya ada kartu yang mengintip di kiri dan kanan (sesuai referensi).
  const [index, setIndex] = useState(items.length >= 3 ? 1 : 0);
  const [paused, setPaused] = useState(false);
  const dragX = useRef<number | null>(null);
  const n = items.length;

  const go = useCallback((dir: number) => setIndex((i) => (i + dir + n) % n), [n]);

  useEffect(() => {
    if (n < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => !document.hidden && go(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [n, paused, go]);

  if (!n) return <EmptyInvite />;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Cerita mereka tentang TSA IPB"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      className="[--card:min(34rem,82vw)] [--gap:1.5rem]"
    >
      <div
        className="relative cursor-grab touch-pan-y select-none overflow-x-clip pb-12 active:cursor-grabbing"
        onPointerDown={(e) => (dragX.current = e.clientX)}
        onPointerUp={(e) => {
          if (dragX.current === null) return;
          const dx = e.clientX - dragX.current;
          dragX.current = null;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        }}
        onPointerCancel={() => (dragX.current = null)}
      >
        <ul
          className="flex gap-[var(--gap)] transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none"
          // margin-left 50% = setengah lebar wadah; lalu geser agar kartu aktif tepat di tengah
          style={{ marginLeft: "50%", transform: `translateX(calc(var(--card) / -2 - ${index} * (var(--card) + var(--gap))))` }}
        >
          {items.map((t, i) => (
            <li
              key={t.id}
              aria-roledescription="slide"
              aria-label={`${i + 1} dari ${n}`}
              aria-hidden={i !== index}
              className="w-[var(--card)] shrink-0"
              onClick={() => i !== index && setIndex(i)}
            >
              <StoryCardGold t={t} active={i === index} />
            </li>
          ))}
        </ul>
      </div>

      {n > 1 && (
        <div className="mx-auto mt-6 flex max-w-6xl items-center justify-end gap-2 px-5 sm:px-8">
          <p className="mr-3 text-sm tabular-nums text-muted" aria-live="polite">
            {index + 1} dari {n}
          </p>
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => go(dir)}
              aria-label={dir === -1 ? "Cerita sebelumnya" : "Cerita berikutnya"}
              className="grid size-11 place-items-center rounded-full border border-brand-700/25 text-brand-700 transition-colors hover:bg-brand-700 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
            >
              <Icon name={dir === -1 ? "arrow-back" : "arrow-forward"} className="size-4" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** Belum ada cerita yang tampil: ajakan berbagi (bukan testimoni rekaan). */
function EmptyInvite() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <div className="mx-auto max-w-xl rounded-[var(--radius-card)] bg-gold-500 px-8 py-10 text-white">
        <p className="text-lg font-light leading-relaxed">Bagikan pengalaman Anda belajar, bertumbuh, dan berkontribusi bersama TSA IPB.</p>
        <p className="mt-3 text-sm text-white/80">Testimoni asli ditampilkan setelah mendapat persetujuan narasumber.</p>
        <Link
          href="/kontak#form"
          className="mt-6 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-medium text-brand-800 transition-colors hover:bg-gold-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
        >
          Kirim cerita lewat form kontak
        </Link>
      </div>
    </div>
  );
}
