"use client";

import * as m from "motion/react-m";
import { useScroll, useTransform, type MotionValue } from "motion/react";
import { Fragment, useRef, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Judul yang muncul per baris dari balik "masker" (seperti referensi).
 * `lines` = array baris; setiap baris boleh berisi elemen (mis. <span> berwarna).
 */
export function LineReveal({ lines, className, delay = 0 }: { lines: ReactNode[]; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <m.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: delay + i * 0.12, ease: EASE }}>
            {line}
          </m.span>
        </span>
      ))}
    </span>
  );
}

/** Kata-kata muncul berurutan saat masuk viewport (seperti "Speak to our…" di referensi). */
export function WordsReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <m.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      aria-label={text}
    >
      {words.map((w, i) => (
        // Spasi diletakkan DI LUAR span inline-block; spasi di dalamnya terbuang sehingga kata menempel.
        <Fragment key={i}>
          <m.span
            aria-hidden="true"
            className="inline-block"
            variants={{
              hidden: { opacity: 0, y: "0.4em", filter: "blur(6px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: EASE } },
            }}
          >
            {w}
          </m.span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </m.span>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <m.span style={{ opacity }} className="transition-none">
      {children}{" "}
    </m.span>
  );
}

/** Paragraf yang "menyala" kata demi kata mengikuti scroll. */
export function ScrollHighlight({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </Word>
        ))}
      </span>
    </p>
  );
}
