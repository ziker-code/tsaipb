"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

/** Angka menghitung naik saat terlihat. Mendukung akhiran seperti "40+" atau "1". */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    const match = value.match(/^(\d+)(.*)$/);
    if (!inView || !match || !ref.current) return;
    const el = ref.current;
    const target = Number(match[1]);
    const suffix = match[2];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = value;
      return;
    }
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (el.textContent = `${Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      {value}
    </span>
  );
}
