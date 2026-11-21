"use client";

import Image from "next/image";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ProgramCard } from "@/components/cards";
import { EmptyState } from "@/components/ui";
import { brandOf } from "@/lib/divisions";
import type { Division, Program } from "@/lib/types";
import { cn } from "@/lib/cn";

type Props = { divisions: Division[]; programs: Program[]; initialSlug?: string };

export function ProgramBrowser({ divisions, programs, initialSlug }: Props) {
  const initial = divisions.find((d) => d.slug === initialSlug)?.id ?? divisions[0]?.id ?? "";
  const [active, setActive] = useState(initial);
  const division = divisions.find((d) => d.id === active);
  const brand = brandOf(division?.slug);
  const list = programs.filter((p) => p.division_id === active);

  return (
    <div>
      <div role="tablist" aria-label="Pilih divisi" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
        {divisions.map((d) => {
          const b = brandOf(d.slug);
          const on = d.id === active;
          return (
            <button
              key={d.id}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls="program-panel"
              onClick={() => setActive(d.id)}
              className={cn("relative flex shrink-0 items-center gap-2.5 rounded-full py-2 pl-2 pr-4 text-sm transition-colors duration-300", on ? "text-white" : "text-brand-900 ring-1 ring-line hover:ring-brand-700/30")}
            >
              {on && <m.span layoutId="division-tab" className="absolute inset-0 rounded-full" style={{ backgroundColor: b.color }} transition={{ type: "spring", stiffness: 380, damping: 34 }} />}
              <span className={cn("relative grid size-7 place-items-center rounded-full", on ? "bg-white" : "bg-canvas")}>
                <Image src={b.logo} alt="" width={22} height={22} className="size-[18px] object-contain" />
              </span>
              <span className="relative">{d.name}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {division && (
          <m.div
            key={division.id}
            id="program-panel"
            role="tabpanel"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <div className="relative overflow-hidden rounded-[2rem] p-8 sm:p-12" style={{ backgroundColor: brand.soft }}>
              <Image src={brand.logo} alt="" width={240} height={240} className="pointer-events-none absolute -right-6 -top-6 h-48 w-auto object-contain opacity-20 sm:h-64" />
              <p className="relative text-xs tracking-[0.25em]" style={{ color: brand.color }}>
                {brand.code} · {list.length} PROGRAM
              </p>
              <h2 className="relative mt-3 text-3xl font-light text-brand-900 sm:text-4xl">{division.name}</h2>
              <p className="relative mt-3 max-w-2xl leading-relaxed text-muted">{division.description}</p>
              <ul className="relative mt-6 flex flex-wrap gap-2">
                {division.core_values.map((v) => (
                  <li key={v} className="rounded-full bg-white/80 px-3 py-1 text-xs text-ink">
                    {v}
                  </li>
                ))}
              </ul>
            </div>

            {list.length ? (
              <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((p, i) => (
                  <m.li key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: Math.min(i, 8) * 0.05, ease: [0.22, 1, 0.36, 1] }}>
                    <ProgramCard program={p} division={division} />
                  </m.li>
                ))}
              </ul>
            ) : (
              <div className="mt-8">
                <EmptyState title="Belum ada program kerja" />
              </div>
            )}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Membaca ?divisi=slug (dari halaman Struktur). Harus dibungkus <Suspense>. */
export function ProgramBrowserFromParams(props: Omit<Props, "initialSlug">) {
  const slug = useSearchParams().get("divisi") ?? undefined;
  return <ProgramBrowser key={slug} {...props} initialSlug={slug} />;
}
