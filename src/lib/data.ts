import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { createPublicClient } from "./supabase/public";
import { fallbackDivisions, fallbackPrograms } from "./fallback";
import type { Division, GalleryItem, Member, Post, Program, SiteSettings, Testimonial } from "./types";

/**
 * Lapisan baca konten publik. Semua fungsi di-cache dan diberi tag,
 * sehingga Server Action admin cukup memanggil `updateTag(tags.x)` setelah menyimpan.
 * Perubahan lewat Supabase Table Editor muncul paling lambat sesuai cacheLife ("minutes" ≈ 1–5 menit).
 */
export const tags = {
  divisions: "divisions",
  members: "members",
  programs: "programs",
  posts: "posts",
  gallery: "gallery",
  testimonials: "testimonials",
  settings: "settings",
} as const;

const defaultSettings: SiteSettings = {
  stats: [
    { value: "42", label: "Pengurus Aktif" },
    { value: "5", label: "Divisi" },
    { value: "40+", label: "Program Kerja" },
    { value: "1", label: "Keluarga" },
  ],
  profile_video_url: "",
  contact_email: "",
};

// ---------------------------------------------------------------- settings
export async function getSettings(): Promise<SiteSettings> {
  "use cache";
  cacheLife("minutes");
  cacheTag(tags.settings);

  const supabase = createPublicClient();
  if (!supabase) return defaultSettings;
  const { data } = await supabase.from("settings").select("key, value");
  const map = Object.fromEntries((data ?? []).map((r) => [r.key, r.value]));
  return {
    stats: Array.isArray(map.stats) && map.stats.length ? map.stats : defaultSettings.stats,
    profile_video_url: typeof map.profile_video_url === "string" ? map.profile_video_url : "",
    contact_email: typeof map.contact_email === "string" ? map.contact_email : "",
  };
}

// --------------------------------------------------------------- divisions
export async function getDivisions(): Promise<Division[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(tags.divisions);

  const supabase = createPublicClient();
  if (!supabase) return fallbackDivisions;
  const { data } = await supabase.from("divisions").select("*").order("sort_order");
  return data?.length ? data : fallbackDivisions;
}

// ----------------------------------------------------------------- members
export async function getMembers(): Promise<Member[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(tags.members);

  const supabase = createPublicClient();
  if (!supabase) return [];
  const { data } = await supabase.from("members").select("*").order("sort_order");
  return data ?? [];
}

// ---------------------------------------------------------------- programs
export async function getPrograms(): Promise<Program[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(tags.programs);

  const supabase = createPublicClient();
  if (!supabase) return fallbackPrograms;
  const { data } = await supabase.from("programs").select("*").eq("is_published", true).order("sort_order");
  return data ?? [];
}

export async function getProgram(slug: string): Promise<Program | null> {
  const programs = await getPrograms();
  return programs.find((p) => p.slug === slug) ?? null;
}

export async function getFeaturedPrograms(limit = 3): Promise<Program[]> {
  const programs = await getPrograms();
  return programs.filter((p) => p.is_featured).slice(0, limit);
}

// ------------------------------------------------------------------- posts
const postListColumns = "id, slug, title, category, cover_url, excerpt, author, status, published_at";

export async function getPosts(): Promise<Post[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(tags.posts);

  const supabase = createPublicClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("posts")
    .select(postListColumns)
    .eq("status", "published")
    .order("published_at", { ascending: false });
  return (data ?? []).map((p) => ({ ...p, content: "" }));
}

export async function getLatestPosts(limit = 4): Promise<Post[]> {
  return (await getPosts()).slice(0, limit);
}

export async function getPost(slug: string): Promise<Post | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag(tags.posts);

  const supabase = createPublicClient();
  if (!supabase) return null;
  const { data } = await supabase.from("posts").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
  return data;
}

// ----------------------------------------------------------------- gallery
export async function getGallery(): Promise<GalleryItem[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(tags.gallery);

  const supabase = createPublicClient();
  if (!supabase) return [];
  const { data } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });
  return data ?? [];
}

// ------------------------------------------------------------ testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(tags.testimonials);

  const supabase = createPublicClient();
  if (!supabase) return [];
  const { data } = await supabase.from("testimonials").select("*").eq("is_visible", true).order("sort_order");
  return data ?? [];
}
