"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { ctaItem, navItems } from "@/lib/site";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  // Menu mobile terbuka hanya untuk path saat dibuka → otomatis tertutup setelah navigasi.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (fn: (v: boolean) => boolean) => setOpenOn(fn(open) ? pathname : null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // h-0: header mengambang di atas konten; section pertama tiap halaman memberi padding-top (pt-28).
    <header className="sticky top-0 z-50 h-0 px-4 sm:px-6">
      <div
        className={cn(
          "mx-auto mt-3 flex max-w-6xl items-center justify-between gap-4 rounded-2xl border border-white/15 bg-brand-600/95 px-4 py-2.5 backdrop-blur transition-shadow",
          scrolled && "shadow-lg shadow-brand-950/20",
        )}
      >
        <Logo />

        <nav aria-label="Navigasi utama" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={cn(
                    "whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold text-white/85 transition-colors hover:bg-white/10 hover:text-white",
                    isActive(pathname, item.href) && "bg-white/10 text-white",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href={ctaItem.href}
          className="hidden whitespace-nowrap rounded-xl border border-white/40 bg-brand-800 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-900 xl:inline-block"
        >
          {ctaItem.label}
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          className="grid size-10 place-items-center rounded-lg text-white hover:bg-white/10 xl:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Navigasi utama"
          className="mx-auto mt-2 max-w-6xl rounded-2xl bg-brand-600 p-3 shadow-xl xl:hidden"
        >
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={cn(
                    "block rounded-lg px-3 py-3 font-semibold text-white/90 hover:bg-white/10",
                    isActive(pathname, item.href) && "bg-white/10 text-white",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link
                href={ctaItem.href}
                className="block rounded-xl bg-white px-3 py-3 text-center font-semibold text-brand-800"
              >
                {ctaItem.label}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
