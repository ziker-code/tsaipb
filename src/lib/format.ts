const dateFmt = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta" });

export function formatDate(iso: string | null | undefined) {
  if (!iso) return "";
  return dateFmt.format(new Date(iso));
}

/** Ambil ID video YouTube dari berbagai bentuk URL (watch, youtu.be, shorts, embed). */
export function youtubeId(url: string | null | undefined) {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|v=|\/shorts\/|\/embed\/)([\w-]{11})/);
  return m?.[1] ?? null;
}

export function youtubeThumb(url: string | null | undefined) {
  const id = youtubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}
