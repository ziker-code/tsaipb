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

## Status (selesai)
- Kunci ImageKit di `.env.local` dan Vercel (production + preview); koneksi diuji: upload, CDN, pencarian & hapus file.
- **Live** di https://tsaipb.vercel.app. `/api/imagekit/auth` menolak non-admin (401).
- **Migrasi**: 5 cover program dipindah lewat tombol Admin → Galeri → sekarang di `/tsaipb/programs` ImageKit, URL database diperbarui, tampil di Beranda via CDN.
- **Rotasi kunci**: kunci sempat terkirim lewat chat → user me-roll pasangan kunci di Dashboard ImageKit; kunci baru dipasang di `.env.local` & Vercel, deploy ulang, upload bertanda tangan (gaya browser) diuji 200 lalu file uji dihapus.

## Catatan
- Folder kosong `/tsaipb/_uji` (sisa uji koneksi) boleh dihapus dari media library.
