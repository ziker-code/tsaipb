import Link from "next/link";
import { MapPin } from "lucide-react";
import { Logo } from "./logo";
import { InstagramIcon, LineIcon, LinkedinIcon } from "./social-icons";
import { navItems, site } from "@/lib/site";

const socials = [
  { ...site.socials.linkedin, name: "LinkedIn", Icon: LinkedinIcon },
  { ...site.socials.instagram, name: "Instagram", Icon: InstagramIcon },
  { ...site.socials.line, name: "LINE", Icon: LineIcon },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-brand-800 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/75">{site.description}</p>
          <p className="mt-4 flex items-start gap-2 text-sm text-white/75">
            <MapPin className="mt-0.5 size-4 shrink-0 text-gold-300" aria-hidden="true" />
            {site.address}
          </p>
        </div>

        <nav aria-label="Navigasi footer">
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-gold-300">Jelajahi</h2>
          <ul className="mt-4 grid gap-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/75 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-gold-300">Ikuti Kami</h2>
          <ul className="mt-4 grid gap-3 text-sm">
            {socials.map(({ name, label, href, Icon }) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-white/75 hover:text-white"
                >
                  <span className="grid size-8 place-items-center rounded-lg bg-white/10">
                    <Icon className="size-4" />
                  </span>
                  <span>
                    <span className="sr-only">{name}: </span>
                    {label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 bg-brand-900">
        <p className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-white/70 sm:px-6">
          © 2026 {site.fullName}. All rights reserved. <span className="font-semibold text-gold-300">{site.tagline}!</span>
        </p>
      </div>
    </footer>
  );
}
