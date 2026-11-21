"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";

export type AccordionItem = { q: string; a: string };

/** Accordion bergaya referensi FAQ: garis tipis, ikon + berputar jadi ×, tinggi beranimasi. */
export function Accordion({ items, className, tone = "dark" }: { items: AccordionItem[]; className?: string; tone?: "dark" | "light" }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <ul className={cn("divide-y", tone === "dark" ? "divide-white/15" : "divide-line", className)}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <li key={i}>
            <h3>
              <button
                type="button"
                id={`${base}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${base}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className={cn("text-base font-normal sm:text-lg", tone === "dark" ? "text-white" : "text-ink")}>{it.q}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative size-4 shrink-0 transition-transform duration-500 ease-[var(--ease-out-soft)]",
                    isOpen && "rotate-45",
                    tone === "dark" ? "text-gold-300" : "text-brand-700",
                  )}
                >
                  <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
                  <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div
                  id={`${base}-a${i}`}
                  role="region"
                  aria-labelledby={`${base}-q${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className={cn("max-w-xl pb-6 text-sm leading-relaxed", tone === "dark" ? "text-white/70" : "text-muted")}>{it.a}</p>
                </m.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
