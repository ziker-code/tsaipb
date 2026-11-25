"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/icon";
import { youtubeId } from "@/lib/format";
import { cn } from "@/lib/cn";

/**
 * Pemutar YouTube di dalam website (tanpa pindah ke YouTube).
 * Awalnya hanya thumbnail HD + tombol play (ringan, tidak memuat iframe YouTube);
 * iframe baru dimuat saat diklik, lalu langsung diputar. Memakai youtube-nocookie.com.
 */
export function VideoEmbed({
  url,
  title,
  label,
  className,
  sizes = "(min-width: 1024px) 58vw, 100vw",
}: {
  url: string;
  title: string;
  label?: string;
  className?: string;
  sizes?: string;
}) {
  const id = youtubeId(url);
  const [playing, setPlaying] = useState(false);
  // maxresdefault (1280×720) tidak selalu ada → turun ke sddefault (640×480) bila gagal dimuat
  const [thumb, setThumb] = useState(id ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg` : "");

  if (!id) return null;

  return (
    <div className={cn("relative aspect-video overflow-hidden bg-brand-950", className)}>
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Putar video: ${title}`}
          className="group absolute inset-0 size-full text-left focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-gold-300"
        >
          <Image
            src={thumb}
            alt=""
            fill
            sizes={sizes}
            quality={85}
            onError={() => setThumb(`https://i.ytimg.com/vi/${id}/sddefault.jpg`)}
            className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03] motion-reduce:transition-none"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-brand-950/75 via-transparent to-transparent" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="grid size-20 place-items-center rounded-full bg-white/90 text-brand-800 shadow-lift transition-transform duration-500 group-hover:scale-110 motion-reduce:transition-none">
              <Icon name="play" className="ml-1 size-8" />
            </span>
          </span>
          {label && (
            <span className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
              <span className="block text-sm text-white/75">{label}</span>
              <span className="mt-1 block text-xl font-light sm:text-2xl">{title}</span>
            </span>
          )}
        </button>
      )}
    </div>
  );
}
