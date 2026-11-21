import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

/** Logo resmi TSA IPB (mark daun + wordmark). `tone` mengatur warna teks wordmark. */
export function Logo({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <Link href="/" aria-label="TSA IPB — Beranda" className={cn("inline-flex items-center gap-2.5", className)}>
      <span className={cn("grid size-10 place-items-center rounded-xl", tone === "light" ? "bg-white" : "bg-transparent")}>
        <Image src="/brand/logo-mark.webp" alt="" width={18} height={34} className="h-7 w-auto" priority />
      </span>
      <span className={cn("leading-[1.1]", tone === "light" ? "text-white" : "text-brand-800")}>
        <span className="block text-[13px] font-semibold tracking-wide">TSA IPB</span>
        <span className={cn("block text-[10px] font-normal", tone === "light" ? "text-white/70" : "text-muted")}>Tanoto Scholars Association</span>
      </span>
    </Link>
  );
}
