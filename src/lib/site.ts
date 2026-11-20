export const site = {
  name: "TSA IPB",
  fullName: "Tanoto Scholars Association IPB",
  tagline: "Berdaya, Berkarya, Digdaya",
  description:
    "Tanoto Scholars Association IPB — wadah kolaborasi dan pengembangan diri mahasiswa penerima beasiswa Tanoto Foundation di IPB University.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  address: "IPB University, Dramaga, Bogor, Jawa Barat",
  socials: {
    instagram: { label: "@tsaipb", href: "https://www.instagram.com/tsaipb" },
    linkedin: {
      label: "Tanoto Scholars Association IPB",
      href: "https://www.linkedin.com/company/tanoto-scholars-association-ipb",
    },
    line: { label: "@ogh5044d", href: "https://line.me/R/ti/p/@ogh5044d" },
  },
} as const;

export const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/tentang" },
  { label: "Struktur Organisasi", href: "/struktur" },
  { label: "Program Kerja", href: "/program" },
  { label: "Berita & Blog", href: "/berita" },
  { label: "Galeri", href: "/galeri" },
  { label: "Kontak", href: "/kontak" },
] as const;

export const ctaItem = { label: "Hubungi Kami", href: "/kontak#form" } as const;
