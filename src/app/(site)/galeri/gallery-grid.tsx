"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Icon } from "@/components/icon";
import type { Division, GalleryItem } from "@/lib/types";
import { cn } from "@/lib/cn";

export function GalleryGrid({ items, divisions }: { items: GalleryItem[]; divisions: Division[] }) {
  const [filter, setFilter] = useState<string>("all");
  const [index, setIndex] = useState<number | null>(null);
  const shown = filter === "all" ? items : items.filter((i) => i.division_id === filter);
  const current = index !== null ? shown[index] : null;

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + shown.length) % shown.length)), [shown.length]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, step]);

  const filters = [{ id: "all", name: "Semua" }, ...divisions.map((d) => ({ id: d.id, name: d.name }))];

  return (
    <>
      {divisions.length > 0 && (
        <div className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter divisi">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm transition-colors",
                filter === f.id ? "bg-brand-700 text-white" : "bg-brand-50 text-brand-800 hover:bg-brand-100",
              )}
            >
              {f.name}
            </button>
          ))}
        </div>
      )}

      <ul className="columns-2 gap-3 sm:columns-3 lg:columns-4">
        {shown.map((item, i) => (
          <li key={item.id} className="mb-3 break-inside-avoid">
            <button type="button" onClick={() => setIndex(i)} className="group block w-full overflow-hidden rounded-xl bg-brand-50">
              <Image
                src={item.image_url}
                alt={item.alt || item.caption || "Dokumentasi TSA IPB"}
                width={600}
                height={600}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="h-auto w-full transition duration-300 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      {current && (
        <div role="dialog" aria-modal="true" aria-label="Pratinjau foto" className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4" onClick={close}>
          <button type="button" onClick={close} aria-label="Tutup" className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
            <Icon name="close" className="size-6" />
          </button>
          {shown.length > 1 && (
            <>
              <button type="button" onClick={(e) => (e.stopPropagation(), step(-1))} aria-label="Sebelumnya" className="absolute left-2 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6">
                <Icon name="chevron-back" className="size-6" />
              </button>
              <button type="button" onClick={(e) => (e.stopPropagation(), step(1))} aria-label="Berikutnya" className="absolute right-2 grid size-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6">
                <Icon name="chevron-forward" className="size-6" />
              </button>
            </>
          )}
          <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image src={current.image_url} alt={current.alt || current.caption || "Dokumentasi TSA IPB"} width={1600} height={1200} sizes="100vw" className="max-h-[80vh] w-auto rounded-lg object-contain" />
            {current.caption && <figcaption className="mt-3 text-center text-sm text-white/80">{current.caption}</figcaption>}
          </figure>
        </div>
      )}
    </>
  );
}
