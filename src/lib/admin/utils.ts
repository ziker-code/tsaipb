export function slugify(input: string) {
  return input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export const str = (fd: FormData, key: string) => String(fd.get(key) ?? "").trim();
export const optStr = (fd: FormData, key: string) => str(fd, key) || null;

/** Path objek di bucket `media` dari URL publik Supabase (untuk menghapus file). */
export function storagePathFromUrl(url: string | null | undefined) {
  if (!url) return null;
  const marker = "/storage/v1/object/public/media/";
  const i = url.indexOf(marker);
  return i === -1 ? null : decodeURIComponent(url.slice(i + marker.length));
}

export const POST_CATEGORIES = ["Berita", "Cerita Inspirasi", "Publikasi"] as const;
