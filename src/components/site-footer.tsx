import Image from "next/image";
import Link from "next/link";
import { Icon } from "./icon";
import { LineIcon } from "./social-icons";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Organisasi",
    links: [
      { label: "Tentang Kami", href: "/tentang" },
      { label: "Struktur", href: "/struktur" },
      { label: "Galeri", href: "/galeri" },
    ],
  },
  {
    title: "Program",
    links: [
      { label: "Program Kerja", href: "/program" },
      { label: "Kegiatan", href: "/galeri" },
      { label: "Kolaborasi", href: "/kontak#form" },
    ],
  },
  {
    title: "Informasi",
    links: [
      { label: "Berita", href: "/berita" },
      { label: "Kisah Inspiratif", href: "/berita" },
      { label: "Kontak", href: "/kontak" },
    ],
  },
];

export function SiteFooter() {
  const socials = [
    { name: "Instagram", href: site.socials.instagram.href, icon: <Icon name="logo-instagram" className="size-[18px]" /> },
    { name: "LinkedIn", href: site.socials.linkedin.href, icon: <Icon name="logo-linkedin" className="size-[18px]" /> },
    ...(site.socials.tiktok ? [{ name: "TikTok", href: site.socials.tiktok.href, icon: <Icon name="logo-tiktok" className="size-[18px]" /> }] : []),
    { name: "LINE", href: site.socials.line.href, icon: <LineIcon className="size-[18px]" /> },
  ];

  return (
    <footer className="mt-auto bg-brand-800 text-white">
      <div className="mx-auto grid max-w-[96rem] gap-12 px-4 pb-12 pt-20 sm:px-6 lg:px-6 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <Link href="/" aria-label="TSA IPB — Beranda" className="inline-flex items-center gap-3">
            <Image src="/brand/logo-mark.webp" alt="" width={32} height={60} className="h-14 w-auto brightness-0 invert" />
            <span className="text-base font-semibold leading-tight">
              Tanoto Scholars Association
              <br />
              <span className="text-gold-300">IPB University</span>
            </span>
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">
            Komunitas penerima beasiswa TELADAN di IPB University. Ruang untuk belajar, bertumbuh, dan berkolaborasi untuk
            menghadirkan dampak bermakna bagi masyarakat.
          </p>
          <ul className="mt-6 flex gap-2">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="grid size-10 place-items-center rounded-full border border-white/15 text-white/80 transition-colors duration-300 hover:border-gold-300 hover:bg-gold-300 hover:text-brand-950"
                >
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Navigasi footer" className="grid grid-cols-3 gap-6">
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="text-sm font-semibold text-gold-300">{col.title}</h2>
              <ul className="mt-5 grid gap-3 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-white/65 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="mx-auto flex max-w-[96rem] flex-wrap items-center justify-between gap-6 border-t border-white/10 px-4 py-6 sm:px-6 lg:px-6">
        <div className="flex items-center gap-6 opacity-80">
          <Image src="/brand/logo-teladan-white.webp" alt="TELADAN" width={110} height={26} className="h-5 w-auto" />
          <span className="rounded-md bg-white px-2 py-1">
            <Image src="/brand/logo-tanoto.webp" alt="Tanoto Foundation" width={80} height={40} className="h-5 w-auto" />
          </span>
        </div>
        <p className="text-xs text-white/55">
          © 2026 TSA IPB. Hak cipta dilindungi. <span className="text-gold-300">Berdaya, Berkarya, Digdaya!</span>
        </p>
      </div>
    </footer>
  );
}
