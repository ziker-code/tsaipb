import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./motion/reveal";
import { LineReveal } from "./motion/text";
import { MaskReveal } from "./motion/mask-reveal";
import { PhotoHero } from "./motion/scroll";
import heroBg from "@/assets/hero-bg.webp";

/**
 * Wadah konten. Lebar maks 96rem (1536px) + padding 40px di desktop → di layar 1440px margin ±40px
 * per sisi, sesuai desain tim. `narrow` untuk halaman baca (artikel) agar baris nyaman dibaca.
 */
export function Container({ className, children, narrow }: { className?: string; children: ReactNode; narrow?: boolean }) {
  return <div className={cn("mx-auto w-full px-5 sm:px-8 lg:px-10", narrow ? "max-w-3xl" : "max-w-[96rem]", className)}>{children}</div>;
}

/** Hero halaman dalam: foto bersama TSA IPB + overlay gelap, menyusut ke kartu saat di-scroll. */
export function PageHero({ title, subtitle = "TSA IPB 2026, Berdaya, Berkarya, Digdaya!", children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <PhotoHero image={heroBg} className="pb-20 pt-40 sm:pb-28 sm:pt-52">
      <Container>
        <h1 className="max-w-5xl text-4xl font-light leading-[1.05] sm:text-6xl">
          <LineReveal lines={[title]} />
        </h1>
        {/* Nama halaman di bawah judul (bukan eyebrow di atasnya) */}
        <p className="mt-5 text-lg font-medium text-gold-300">{subtitle}</p>
        {children}
      </Container>
    </PhotoHero>
  );
}

export function SectionHeading({
  title,
  description,
  align = "left",
  className,
  tone = "dark",
  size = "lg",
}: {
  eyebrow?: string;
  /** "md" = gaya referensi Beranda: judul tebal ukuran sedang + deskripsi kecil */
  size?: "lg" | "md";
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <Reveal className={cn(align === "center" && "mx-auto max-w-3xl text-center", className)}>
      {/* `eyebrow` sengaja tidak dirender lagi (anti "AI slop": tanpa label kecil kapital di atas judul). Prop dipertahankan agar pemanggil lama tetap valid. */}
      <h2
        className={cn(
          size === "md" ? "text-2xl font-semibold leading-snug sm:text-[1.75rem]" : "text-3xl font-light leading-tight sm:text-[2.6rem]",
          "min-w-0 [overflow-wrap:break-word]",
          tone === "dark" ? "text-brand-900" : "text-white",
        )}
      >
        <MaskReveal>{title}</MaskReveal>
      </h2>
      {description && <p className={cn(size === "md" ? "mt-2 max-w-3xl text-sm leading-relaxed" : "mt-3 max-w-3xl leading-relaxed", align === "center" && "mx-auto", tone === "dark" ? "text-muted" : "text-white/70")}>{description}</p>}
    </Reveal>
  );
}

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-dashed border-line bg-canvas px-6 py-14 text-center">
      <p className="font-medium text-brand-900">{title}</p>
      {description && <p className="mt-1 text-sm text-muted">{description}</p>}
    </div>
  );
}

export function Pill({ children, className, style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <span style={style} className={cn("inline-flex items-center gap-1.5 rounded-full bg-gold-100 px-3 py-1 text-xs font-medium text-gold-600", className)}>
      {children}
    </span>
  );
}

/** Watermark mark logo TSA IPB, sangat samar, untuk latar hijau. Dekoratif. */
export function BrandWatermark({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/logo-mark.webp"
      alt=""
      aria-hidden="true"
      width={320}
      height={600}
      className={cn("pointer-events-none absolute -right-10 top-10 h-[130%] w-auto select-none opacity-[0.07] mix-blend-luminosity sm:right-8", className)}
    />
  );
}

/** @deprecated nama lama; dipertahankan agar import lama tetap jalan. */
export const Contours = BrandWatermark;

/** Tautan bergaya tombol. */
export function ButtonLink({ href, children, variant = "solid", className, external }: { href: string; children: ReactNode; variant?: "solid" | "outline" | "light" | "ghost"; className?: string; external?: boolean }) {
  const styles = {
    solid: "bg-brand-700 text-white hover:bg-brand-800",
    outline: "border border-white/50 text-white hover:bg-white hover:text-brand-800",
    light: "bg-white text-brand-800 hover:bg-gold-100",
    ghost: "border border-brand-700/20 text-brand-800 hover:border-brand-700 hover:bg-brand-700 hover:text-white",
  }[variant];
  const cls = cn("group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500", styles, className);
  if (external)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
