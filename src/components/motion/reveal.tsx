"use client";

import * as m from "motion/react-m";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Tag = "div" | "section" | "li" | "ul" | "ol" | "p" | "h2" | "article";

/** Muncul halus (fade + naik sedikit) saat masuk viewport. Hanya sekali. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: Tag;
}) {
  const C = m[as];
  return (
    <C
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </C>
  );
}

/** Kontainer yang memunculkan anak-anaknya berurutan. Anak memakai <StaggerItem>. */
export function Stagger({ children, className, as = "div", gap = 0.08 }: { children: ReactNode; className?: string; as?: Tag; gap?: number }) {
  const C = m[as];
  return (
    <C
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </C>
  );
}

export function StaggerItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: Tag }) {
  const C = m[as];
  return (
    <C
      className={className}
      variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
    >
      {children}
    </C>
  );
}
