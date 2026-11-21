"use client";

import * as m from "motion/react-m";
import type { ReactNode } from "react";

/** Teks naik dari balik "masker" saat masuk viewport — dipakai untuk judul section. */
export function MaskReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <span className={`block overflow-hidden pb-[0.1em] ${className ?? ""}`}>
      <m.span
        className="block"
        initial={{ y: "110%", rotate: 2 }}
        whileInView={{ y: 0, rotate: 0 }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 0.95, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </m.span>
    </span>
  );
}
