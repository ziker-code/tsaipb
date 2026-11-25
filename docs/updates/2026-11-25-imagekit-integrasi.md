# 2026-11-25 — Integrasi ImageKit (kode siap, menunggu kunci API)

## Ringkasan
Gambar konten dipindah dari Supabase Storage ke **ImageKit**; database & login tetap Supabase. Rencana: [../IMAGEKIT-PLAN.md](../IMAGEKIT-PLAN.md).

## Yang berubah
| File | Perubahan |
|---|---|
| `package.json` | `@imagekit/next` (upload klien + komponen Image), `@imagekit/nodejs` (API server) |
| `src/lib/imagekit-config.ts` | **Baru** — endpoint publik, folder `/tsaipb`, `isImageKitUrl()` |
| `src/app/api/imagekit/auth/route.ts` | **Baru** — tanda tangan upload (berlaku 10 menit), **hanya admin** (Supabase Auth + tabel `admins`); 503 bila kunci belum ada |
| `src/lib/admin/image.ts` | Upload: kompres WebP di browser → minta tanda tangan → upload langsung ke ImageKit `/tsaipb/{posts,programs,gallery,stories}` |
| `src/lib/admin/media.ts` | **Baru** — `removeStoredImage()`: hapus file di ImageKit (cari fileId lewat folder+nama) atau di Supabase Storage lama |
| `admin/(panel)/{berita,program,galeri,cerita}/actions.ts` | Hapus konten → file gambar ikut dihapus di mana pun tersimpan; galeri menerima URL ImageKit |
| `src/components/media-image.tsx` | **Baru** — `MediaImage`: URL ImageKit → `Image` ImageKit (srcset responsif, `q-80`, format otomatis dari CDN); URL lain → `next/image` |
| Kartu & halaman publik | `cards.tsx`, Beranda (pita foto), detail proker (cover + dokumentasi), detail berita, galeri (lightbox), carousel Cerita → `MediaImage` |
| `admin/(panel)/galeri/migrate-*.ts(x)` | **Baru** — panel **"Pindahkan ke ImageKit"** di Admin → Galeri bila masih ada gambar lama: unduh → upload ke ImageKit → perbarui URL → hapus file lama (aman diulang) |
| `next.config.ts` | Domain `ik.imagekit.io` |
| `.mcp.json` | MCP ImageKit DAM, Admin, DevTools (commit sebelumnya) |

## Status
- Build, lint, typecheck lolos. Endpoint `/api/imagekit/auth` mengembalikan 503 dengan pesan jelas selama kunci belum diisi.
- **Belum di-deploy**: production masih memakai Supabase Storage sampai kunci ImageKit diisi di Vercel, supaya upload admin tidak terputus.
- **Migrasi 5 cover program** menunggu kunci; dijalankan lewat tombol di Admin → Galeri.

## Langkah berikutnya
1. Isi `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT`, `IMAGEKIT_PUBLIC_KEY`, `IMAGEKIT_PRIVATE_KEY` di `.env.local`.
2. Saya salin ke Vercel env → deploy → login admin → Admin → Galeri → **Pindahkan ke ImageKit**.
3. Uji upload baru di Berita/Program/Galeri/Cerita.
