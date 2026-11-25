"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/icon";
import type { Testimonial } from "@/lib/types";
import { cn } from "@/lib/cn";
import heroBg from "@/assets/hero-bg.webp";

const AUTOPLAY_MS = 7000;
const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500";

/** Foto kanan kartu: foto narasumber, atau potongan foto bersama TSA dengan overlay hijau bila tidak ada. */
function CardPhoto({ src, alt }: { src?: string | null; alt: string }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-brand-900 md:aspect-auto md:h-full md:min-h-[22rem]">
      {src ? (
        <Image src={src} alt={alt} fill sizes="(min-width: 768px) 40vw, 85vw" className="object-cover" />
      ) : (
        <>
          <Image src={heroBg} alt="" fill sizes="(min-width: 768px) 40vw, 85vw" className="object-cover" style={{ objectPosition: "50% 62%" }} />
          <span className="absolute inset-0 bg-brand-700/50" />
        </>
      )}
    </div>
  );
}

/** Kartu lebar ala referensi: teks cerita di kiri, foto besar di kanan. */
function Shell({ children, photo, active = true }: { children: ReactNode; photo: ReactNode; active?: boolean }) {
  return (
    <article
      className={cn(
        "grid h-full gap-6 rounded-[2rem] border border-brand-100/10 bg-brand-800 p-5 text-white shadow-lift transition-[transform,opacity] duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none sm:p-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-10",
        active ? "scale-100 opacity-100" : "scale-[0.94] opacity-45",
      )}
    >
      <div className="flex min-w-0 flex-col py-2 md:py-4">{children}</div>
      {photo}
    </article>
  );
}

function StoryBody({ t }: { t: Testimonial }) {
  return (
    <>
      <Icon name="chatbubble-ellipses-outline" className="size-7 text-gold-300" />
      <blockquote className="mt-6 text-xl font-light leading-relaxed [overflow-wrap:anywhere] sm:text-2xl">{t.quote}</blockquote>
      <footer className="mt-auto pt-8">
        <p className="text-lg font-semibold text-gold-300">{t.name}</p>
        {(t.batch || t.role) && <p className="mt-1 text-sm text-white/70">{[t.batch, t.role].filter(Boolean).join(", ")}</p>}
      </footer>
    </>
  );
}

/**
 * Carousel berfokus-tengah dengan kartu lebar; kartu sebelum/sesudah mengintip di tepi.
 * Navigasi: panah, titik indikator, geser, keyboard ←/→, ganti otomatis (berhenti saat hover/fokus & reduced-motion).
 */
export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  // Mulai dari kartu kedua bila ≥3 cerita, supaya ada kartu yang mengintip di kiri dan kanan.
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
      className="[--card:min(82rem,90vw)] [--gap:2rem]"
    >
      <div
        className="relative cursor-grab touch-pan-y select-none overflow-x-clip active:cursor-grabbing"
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
          className="flex items-stretch gap-[var(--gap)] transition-transform duration-700 ease-[var(--ease-out-soft)] motion-reduce:transition-none"
          // margin-left 50% = setengah lebar wadah; lalu geser agar kartu aktif tepat di tengah
          style={{ marginLeft: "50%", transform: `translateX(calc(var(--card) / -2 - ${index} * (var(--card) + var(--gap))))` }}
        >
          {items.map((t, i) => (
            <li key={t.id} aria-roledescription="slide" aria-label={`Cerita ${t.name}`} aria-hidden={i !== index} className="w-[var(--card)] shrink-0" onClick={() => i !== index && setIndex(i)}>
              <Shell active={i === index} photo={<CardPhoto src={t.photo_url} alt={`Foto ${t.name}`} />}>
                <StoryBody t={t} />
              </Shell>
            </li>
          ))}
        </ul>
      </div>

      {n > 1 && (
        <div className="mt-10 flex items-center justify-center gap-4">
          <button type="button" onClick={() => go(-1)} aria-label="Cerita sebelumnya" className="grid size-12 place-items-center rounded-full border border-brand-700/25 text-brand-700 transition-colors hover:bg-brand-700 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500">
            <Icon name="chevron-back" className="size-5" />
          </button>
          <div className="flex items-center gap-2 rounded-full bg-canvas px-4 py-3">
            {items.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Tampilkan cerita ${t.name}`}
                aria-current={i === index}
                className={cn(
                  "h-2.5 rounded-full transition-colors duration-300 motion-reduce:transition-none",
                  i === index ? "w-7 bg-brand-700" : "w-2.5 bg-brand-700/25 hover:bg-brand-700/50",
                  FOCUS,
                )}
              />
            ))}
          </div>
          <button type="button" onClick={() => go(1)} aria-label="Cerita berikutnya" className={cn("grid size-12 place-items-center rounded-full border border-brand-700/25 text-brand-700 transition-colors hover:bg-brand-700 hover:text-white", FOCUS)}>
            <Icon name="chevron-forward" className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}

/** Belum ada cerita yang tampil: ajakan berbagi (bukan testimoni rekaan), ukuran sama dengan kartu cerita. */
function EmptyInvite() {
  return (
    <div className="mx-auto w-[min(82rem,90vw)]">
      <Shell photo={<CardPhoto alt="" />}>
        <Icon name="chatbubble-ellipses-outline" className="size-7 text-gold-300" />
        <p className="mt-6 text-2xl font-light leading-relaxed sm:text-3xl">Bagikan pengalaman Anda belajar, bertumbuh, dan berkontribusi bersama TSA IPB.</p>
        <p className="mt-4 text-white/70">Testimoni asli ditampilkan setelah mendapat persetujuan narasumber.</p>
        <div className="mt-auto pt-8">
          <Link href="/kontak#form" className={cn("inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-800 transition-colors hover:bg-gold-100", FOCUS)}>
            Kirim cerita lewat form kontak
          </Link>
        </div>
      </Shell>
    </div>
  );
}
