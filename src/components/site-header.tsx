"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Icon } from "./icon";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    // h-0: header mengambang di atas konten; section pertama tiap halaman memberi padding-top.
    <header className="sticky top-0 z-50 h-0 px-4 sm:px-6">
      <div
        className={cn(
          "mx-auto mt-3 flex max-w-6xl items-center justify-between gap-4 rounded-full border px-3 py-2 pl-4 transition-all duration-500 ease-[var(--ease-out-soft)]",
          scrolled
            ? "border-white/10 bg-brand-900/85 shadow-[0_12px_40px_-12px_rgba(3,38,25,0.45)] backdrop-blur-xl"
            : "border-white/15 bg-white/[0.06] backdrop-blur-md",
        )}
      >
        <Logo />

        <nav aria-label="Navigasi utama" className="hidden xl:block">
          <ul className="flex items-center">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative z-10 block whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] transition-colors duration-300",
                      active ? "text-brand-900" : "text-white/80 hover:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                  {active && (
                    <m.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <Link
          href={ctaItem.href}
          className="group hidden items-center gap-2 whitespace-nowrap rounded-full bg-gold-500 py-2 pl-4 pr-2 text-[13px] font-medium text-brand-950 transition-colors hover:bg-gold-300 xl:inline-flex"
        >
          {ctaItem.label}
          <span className="grid size-6 place-items-center rounded-full bg-brand-950 text-gold-300 transition-transform duration-300 group-hover:translate-x-0.5">
            <Icon name="arrow-forward" className="size-3" />
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setOpenOn(open ? null : pathname)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          className="grid size-10 place-items-center rounded-full text-white hover:bg-white/10 xl:hidden"
        >
          <Icon name={open ? "close" : "menu"} className="size-6" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-nav"
            aria-label="Navigasi utama"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 max-w-6xl origin-top rounded-3xl bg-brand-900/95 p-3 shadow-2xl backdrop-blur-xl xl:hidden"
          >
            <ul className="flex flex-col">
              {navItems.map((item, i) => (
                <m.li key={item.href} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-2xl px-4 py-3.5 text-white/85 hover:bg-white/5",
                      isActive(pathname, item.href) && "bg-white/10 text-white",
                    )}
                  >
                    {item.label}
                    <Icon name="chevron-forward" className="size-4 opacity-40" />
                  </Link>
                </m.li>
              ))}
              <li className="mt-2">
                <Link href={ctaItem.href} className="block rounded-2xl bg-gold-500 px-4 py-3.5 text-center font-medium text-brand-950">
                  {ctaItem.label}
                </Link>
              </li>
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
