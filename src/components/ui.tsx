import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>{children}</div>;
}

/** Hero kecil untuk halaman selain Beranda (judul hijau + subjudul emas, mengikuti Figma). */
export function PageHero({ title, subtitle = "TSA IPB 2026 | Berdaya Berkarya Digdaya", children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-brand-700 pb-16 pt-32 text-center text-white sm:pt-36">
      <Contours />
      <Container className="relative">
        <h1 className="font-display text-3xl font-extrabold uppercase tracking-wide sm:text-5xl">{title}</h1>
        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold-300">{subtitle}</p>
        {children}
      </Container>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, description, align = "left", className }: { eyebrow?: string; title: string; description?: string; align?: "left" | "center"; className?: string }) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-2xl text-center", className)}>
      {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">{eyebrow}</p>}
      <h2 className="mt-1 font-display text-2xl font-extrabold text-brand-800 sm:text-3xl">{title}</h2>
      {description && <p className="mt-2 text-muted">{description}</p>}
    </div>
  );
}

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-dashed border-brand-100 bg-brand-50 px-6 py-12 text-center">
      <p className="font-display font-bold text-brand-800">{title}</p>
      {description && <p className="mt-1 text-sm text-muted">{description}</p>}
    </div>
  );
}

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-block rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold text-gold-600", className)}>
      {children}
    </span>
  );
}

/** Ornamen garis kontur (seperti di desain IG TSA IPB). Dekoratif. */
export function Contours({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full opacity-[0.12]", className)}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 800 400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      {Array.from({ length: 9 }, (_, i) => (
        <path
          key={i}
          d={`M-50 ${60 + i * 38} C 120 ${10 + i * 40}, 240 ${130 + i * 34}, 400 ${70 + i * 38} S 680 ${20 + i * 42}, 860 ${90 + i * 36}`}
        />
      ))}
      <circle cx="680" cy="80" r="40" />
      <circle cx="680" cy="80" r="65" />
      <circle cx="680" cy="80" r="90" />
    </svg>
  );
}
