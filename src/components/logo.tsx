import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Placeholder logo. Ganti isi <svg> dengan logo resmi TSA IPB
 * (atau pakai next/image ke /public/logo.svg) setelah file logo tersedia.
 */
export function Logo({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <Link href="/" aria-label="TSA IPB — Beranda" className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="grid size-10 place-items-center rounded-xl bg-white shadow-sm">
        <svg viewBox="0 0 32 32" className="size-7" aria-hidden="true">
          <path d="M16 3c5 4 7 9 5 14-1.5 3.6-5 5.5-5 5.5S12 20.6 11 17C9.6 12 11 7 16 3Z" fill="#006838" />
          <path d="M9 21c3 4 9 6 14 3-3 4.5-9 6-14-3Z" fill="#7fae96" />
          <circle cx="16" cy="10" r="2" fill="#b9a56b" />
        </svg>
      </span>
      <span className={cn("leading-tight", tone === "light" ? "text-white" : "text-brand-800")}>
        <span className="block font-display text-sm font-extrabold tracking-wide">TSA IPB</span>
        <span className="block text-[10px] font-medium opacity-80">Tanoto Scholars Association</span>
      </span>
    </Link>
  );
}
