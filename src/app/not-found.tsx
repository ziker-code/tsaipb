import Link from "next/link";
import { Logo } from "@/components/logo";
import { Contours } from "@/components/ui";

export default function NotFound() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-brand-700 px-4 text-center text-white">
      <Contours />
      <div className="relative">
        <div className="flex justify-center">
          <Logo />
        </div>
        <p className="mt-10 text-7xl font-light text-gold-300">404</p>
        <h1 className="mt-3 text-2xl font-light">Halaman tidak ditemukan</h1>
        <p className="mt-2 text-white/80">Halaman yang Anda cari mungkin sudah dipindahkan atau dihapus.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-brand-800 hover:bg-brand-50">
            Kembali ke Beranda
          </Link>
          <Link href="/berita" className="rounded-full border border-white/50 px-5 py-3 text-sm font-medium hover:bg-white/10">
            Lihat Berita
          </Link>
        </div>
      </div>
    </main>
  );
}
