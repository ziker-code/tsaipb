"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/cn";

/**
 * Carousel ringan berbasis scroll-snap (swipe/drag native di HP, trackpad di desktop)
 * dengan tombol panah. Tanpa library tambahan.
 */
export function Carousel({ children, label, className, controlsClassName }: { children: ReactNode; label: string; className?: string; controlsClassName?: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    update();
    const el = ref.current;
    el?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const go = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <div className={className}>
      <div className={cn("flex justify-end gap-2", controlsClassName)}>
        {([-1, 1] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            onClick={() => go(dir)}
            disabled={dir === -1 ? edge.start : edge.end}
            aria-label={dir === -1 ? "Sebelumnya" : "Berikutnya"}
            className="grid size-11 place-items-center rounded-full border border-brand-700/20 text-brand-700 transition-colors hover:bg-brand-700 hover:text-white disabled:pointer-events-none disabled:opacity-30"
          >
            <Icon name={dir === -1 ? "arrow-back" : "arrow-forward"} className="size-4" />
          </button>
        ))}
      </div>
      <ul
        ref={ref}
        aria-label={label}
        className="mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
    </div>
  );
}
