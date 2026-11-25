# Rencana — Gambar lewat ImageKit (database tetap Supabase)

| | |
|---|---|
| Status | **Kode selesai; menunggu kunci API untuk deploy & migrasi** |
| Tanggal | 25 November 2026 |
| Keputusan user | Database & login **tetap Supabase**; gambar dipindah ke **ImageKit.io** |

## 1. MCP ImageKit (sudah dipasang)
Di `.mcp.json` proyek (server resmi, di-hosting ImageKit — tidak ada server lokal):

| Nama | URL | Kegunaan | Login |
|---|---|---|---|
| `imagekit-dam` | https://imagekit.io/mcp/dam | Cari, upload, pindah, hapus file di media library | Akun ImageKit + layar izin |
| `imagekit-admin` | https://imagekit.io/mcp/admin | URL endpoint, origin, webhook, statistik pemakaian | Akun ImageKit + layar izin |
| `imagekit-devtools` | https://devtools-mcp.imagekit.io/mcp | Dokumentasi resmi & pembuat URL transformasi | Tidak perlu |

Sumber: [ImageKit — Build with AI / MCP servers](https://imagekit.io/docs/mcp-server). Saran keamanan ImageKit: beri izin seminimal mungkin (lihat saja), tambah izin tulis/hapus hanya saat dibutuhkan.

## 2. Alur upload baru (admin)
1. Admin memilih foto → foto dikompres di browser (seperti sekarang, WebP maks 1600px).
2. Browser meminta **tanda tangan upload** ke server kita (`/api/imagekit/auth`), yang hanya melayani admin yang login (cek Supabase Auth + tabel `admins`).
3. Browser meng-upload langsung ke ImageKit dengan tanda tangan itu → **kunci privat tidak pernah sampai ke browser**.
4. URL ImageKit (`https://ik.imagekit.io/<id>/tsaipb/...`) disimpan di kolom yang sama seperti sekarang (`cover_url`, `image_url`, `photo_url`) — **tidak perlu mengubah skema database**.
5. Hapus artikel/proker/foto/cerita → file di ImageKit ikut dihapus lewat API server.

Folder di ImageKit: `/tsaipb/posts`, `/tsaipb/programs`, `/tsaipb/gallery`, `/tsaipb/stories`.

## 3. Tampilan gambar
- Komponen `next/image` memakai **loader ImageKit**: ukuran & format diatur lewat URL (`tr:w-800,q-auto,f-auto`), dikirim dari CDN ImageKit (AVIF/WebP otomatis).
- Mengurangi pemakaian kuota optimasi gambar Vercel.
- Gambar lama dari Supabase Storage tetap tampil selama masa transisi.

## 4. File yang disentuh
| File | Perubahan |
|---|---|
| `.env.local` + Vercel env | `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT`, `IMAGEKIT_PUBLIC_KEY`, `IMAGEKIT_PRIVATE_KEY` (privat hanya di server) |
| `src/app/api/imagekit/auth/route.ts` | **Baru** — tanda tangan upload, khusus admin |
| `src/lib/admin/image.ts` | Upload ke ImageKit (bukan Supabase Storage) |
| `src/lib/admin/imagekit.ts` | **Baru** — helper server: hapus file berdasarkan URL |
| `admin/(panel)/{berita,program,galeri,cerita}/actions.ts` | Hapus file di ImageKit saat konten dihapus |
| `src/lib/imagekit-loader.ts` + `next.config.ts` | Loader & domain `ik.imagekit.io` |
| `package.json` | SDK resmi ImageKit untuk Next.js |

## 5. Yang dibutuhkan dari user
1. **Setujui & login MCP**: buka sesi Claude Code baru di folder proyek → setujui 3 server ImageKit → login ke ImageKit saat diminta (izin awal cukup *view*; *create/delete* bila ingin saya upload/memindahkan file).
2. **Kunci API** (Dashboard ImageKit → Developer options): URL endpoint, public key, private key → simpan **langsung di `.env.local`** (jangan ditempel di chat).
3. **Gambar lama**: saat ini ada **5 cover program** (+ kemungkinan cover artikel draft) di Supabase Storage. Pindahkan ke ImageKit sekalian? (usul: ya, otomatis lewat skrip.)
4. **Aset statis** (logo, foto hero bersama): tetap di website (sudah dioptimasi), atau ikut dipindah ke ImageKit? (usul: tetap di website — cepat dan tidak memakai kuota bandwidth ImageKit.)
