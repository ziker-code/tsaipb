"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Icon } from "./icon";
import { ctaItem, navItems } from "@/lib/site";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300";

/**
 * Navbar sesuai desain: (1) logo lengkap di "tab" putih yang menggantung dari tepi atas,
 * (2) pill navigasi kaca hijau di kanan dengan tombol "Hubungi Kami" bergaris.
 */
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

  const glass = cn(
    "border border-brand-100/20 backdrop-blur-xl transition-[background-color,box-shadow] duration-500 motion-reduce:transition-none",
    scrolled ? "bg-brand-800/85 shadow-lift" : "bg-brand-700/55",
  );

  return (
    // h-0: header mengambang di atas konten; section pertama tiap halaman memberi padding-top.
    <header className="sticky top-0 z-50 h-0">
      <div className="mx-auto flex max-w-[88rem] items-start justify-between gap-4 px-5 sm:px-8 lg:px-12">
        {/* Tab logo putih menggantung */}
        <Link
          href="/"
          aria-label="TSA IPB, ke Beranda"
          className={cn(
            "block shrink-0 origin-top-left rounded-b-2xl bg-white px-3 pb-3 pt-5 shadow-card transition-transform duration-500 motion-reduce:transition-none",
            scrolled && "scale-[0.82]",
            FOCUS,
          )}
        >
          <Image
            src="/brand/logo-tsa.webp"
            alt="Tanoto Scholars Association IPB University"
            width={1200}
            height={812}
            priority
            className="h-12 w-auto sm:h-14"
          />
        </Link>

        {/* Pill navigasi kaca hijau */}
        <div className={cn("mt-3 hidden items-center gap-1 rounded-2xl p-1.5 xl:flex", glass)}>
          <nav aria-label="Navigasi utama">
            <ul className="flex items-center">
              {navItems.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block whitespace-nowrap rounded-xl px-3.5 py-2 text-[13px] font-medium transition-colors duration-300",
                        active ? "bg-white/15 text-white" : "text-white/85 hover:bg-white/10 hover:text-white",
                        FOCUS,
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <Link
            href={ctaItem.href}
            className={cn(
              "ml-1 whitespace-nowrap rounded-xl border border-brand-100/60 px-4 py-2 text-[13px] font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-brand-800",
              FOCUS,
            )}
          >
            {ctaItem.label}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpenOn(open ? null : pathname)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          className={cn("mt-3 grid size-11 place-items-center rounded-2xl text-white xl:hidden", glass, FOCUS)}
        >
          <Icon name={open ? "close" : "menu"} className="size-6" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-nav"
            aria-label="Navigasi utama"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mx-5 mt-3 rounded-3xl border border-brand-100/20 bg-brand-800/95 p-3 shadow-lift backdrop-blur-xl sm:mx-8 xl:hidden"
          >
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-2xl px-4 py-3.5 text-white/85 hover:bg-white/5",
                      isActive(pathname, item.href) && "bg-white/10 text-white",
                      FOCUS,
                    )}
                  >
                    {item.label}
                    <Icon name="chevron-forward" className="size-4 opacity-40" />
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <Link href={ctaItem.href} className={cn("block rounded-2xl border border-brand-100/60 px-4 py-3.5 text-center font-semibold text-white", FOCUS)}>
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
