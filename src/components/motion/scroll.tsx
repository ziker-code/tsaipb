"use client";

import Image, { type StaticImageData } from "next/image";
import * as m from "motion/react-m";
import { useMotionTemplate, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Hero berfoto ala referensi: saat di-scroll, foto zoom pelan + parallax,
 * kotak hero "menyusut" menjadi kartu bersudut membulat, dan isi teks naik sambil memudar.
 * Overlay hitam 50% menjaga teks tetap terbaca.
 */
export function PhotoHero({
  image,
  children,
  className,
  priority = true,
  position = "50% 60%",
}: {
  image: StaticImageData;
  children: ReactNode;
  className?: string;
  priority?: boolean;
  position?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const inset = useTransform(scrollYProgress, [0, 1], [0, 3.5]);
  const radius = useTransform(scrollYProgress, [0, 0.6], [0, 40]);
  const clipPath = useMotionTemplate`inset(0% ${inset}% ${inset}% ${inset}% round 0px 0px ${radius}px ${radius}px)`;
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1.22]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <m.section ref={ref} style={{ clipPath }} className={cn("relative isolate overflow-hidden bg-brand-950 text-white", className)}>
      <m.div aria-hidden="true" style={{ scale, y: imageY }} className="absolute inset-0 -z-10 will-change-transform">
        <Image src={image} alt="" fill priority={priority} placeholder="blur" sizes="100vw" className="object-cover" style={{ objectPosition: position }} />
      </m.div>
      {/* Overlay hitam ±50% + sedikit nuansa hijau tua di bawah agar menyatu dengan brand */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/50" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-950/80 via-brand-950/10 to-black/20" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-black/35 via-transparent to-transparent" />
      <m.div style={{ y: contentY, opacity: contentOpacity }} className="relative">
        {children}
      </m.div>
    </m.section>
  );
}

/** Section yang "melebar" dari kartu membulat menjadi selebar layar saat masuk viewport. */
export function ExpandOnScroll({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 25%"] });
  const inset = useTransform(scrollYProgress, [0, 1], [7, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [56, 0]);
  const clipPath = useMotionTemplate`inset(0% ${inset}% round ${radius}px)`;
  return (
    <m.div ref={ref} style={{ clipPath }} className={className}>
      {children}
    </m.div>
  );
}

/** Elemen yang naik dan membesar pelan mengikuti scroll (untuk panel FAQ / CTA). */
export function RiseOnScroll({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 35%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
  return (
    <m.div ref={ref} style={{ scale, y, opacity }} className={cn("origin-bottom will-change-transform", className)}>
      {children}
    </m.div>
  );
}

/** Gambar/isi bergeser vertikal di dalam bingkainya saat di-scroll (parallax). */
export function Parallax({ children, className, amount = 12 }: { children: ReactNode; className?: string; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  return (
    <div ref={ref} className={cn("absolute inset-0 overflow-hidden", className)}>
      <m.div style={{ y, scale: 1 + amount / 50 }} className="absolute inset-0 will-change-transform">
        {children}
      </m.div>
    </div>
  );
}

/** Baris-baris yang bergerak horizontal berlawanan arah mengikuti scroll. */
export function ScrollRows({ rows, className }: { rows: ReactNode[][]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const left = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const right = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);
  return (
    <div ref={ref} className={cn("flex flex-col gap-4 overflow-hidden", className)}>
      {rows.map((items, i) => (
        <m.div key={i} style={{ x: i % 2 ? right : left }} className="flex w-max gap-4 will-change-transform">
          {items}
        </m.div>
      ))}
    </div>
  );
}
