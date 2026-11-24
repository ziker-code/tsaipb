"use client";

import Link from "next/link";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/icon";
import { Logo } from "@/components/logo";
import { logout } from "../(auth)/login/actions";
import { cn } from "@/lib/cn";

const items: { href: string; label: string; icon: IconName }[] = [
  { href: "/admin/berita", label: "Berita", icon: "newspaper-outline" },
  { href: "/admin/program", label: "Program Kerja", icon: "folder-outline" },
  { href: "/admin/galeri", label: "Galeri", icon: "images-outline" },
  { href: "/admin/cerita", label: "Cerita Mereka", icon: "chatbubble-ellipses-outline" },
];

function NavLinks({ pathname }: { pathname: string }) {
  return (
    <ul className="flex gap-1 lg:flex-col">
      {items.map(({ href, label, icon }) => {
        const active = pathname.startsWith(href);
        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm transition-colors",
                active ? "bg-white text-brand-800" : "text-white/75 hover:bg-white/10 hover:text-white",
              )}
            >
              <Icon name={icon} className="size-4" />
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

// usePathname adalah data URL → harus di dalam Suspense agar route dinamis (/admin/berita/[id]) bisa diprerender.
function ActiveNavLinks() {
  return <NavLinks pathname={usePathname()} />;
}

export function AdminNav() {
  return (
    <aside className="sticky top-0 z-40 bg-brand-800 text-white lg:h-screen">
      <div className="flex items-center justify-between gap-3 px-4 py-3 lg:block lg:px-5 lg:py-6">
        <Logo />
        <form action={logout} className="lg:hidden">
          <button type="submit" className="inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-sm text-white/80 hover:bg-white/10">
            <Icon name="log-out-outline" className="size-4" /> Keluar
          </button>
        </form>
      </div>
      <nav aria-label="Menu admin" className="overflow-x-auto px-3 pb-3">
        <Suspense fallback={<NavLinks pathname="" />}>
          <ActiveNavLinks />
        </Suspense>
      </nav>
      <div className="hidden px-5 lg:absolute lg:bottom-6 lg:block lg:w-60">
        <p className="mb-3 text-xs leading-relaxed text-white/55">Pengurus, divisi & pengaturan diedit lewat Supabase Table Editor.</p>
        <Link href="/" target="_blank" className="mb-2 flex items-center gap-2 text-sm text-white/80 hover:text-white">
          <Icon name="open-outline" className="size-4" /> Lihat website
        </Link>
        <form action={logout}>
          <button type="submit" className="flex items-center gap-2 text-sm text-white/80 hover:text-white">
            <Icon name="log-out-outline" className="size-4" /> Keluar
          </button>
        </form>
      </div>
    </aside>
  );
}
