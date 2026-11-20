// Toleran terhadap URL yang disalin dari menu "Data API" (berakhiran /rest/v1/) atau ber-slash di akhir.
export const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim().replace(/\/(rest\/v1\/?)?$/, "").replace(/\/+$/, "");
export const SUPABASE_ANON_KEY = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "").trim();

/** False sampai .env.local diisi — halaman publik tetap bisa dirender dengan data fallback. */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
