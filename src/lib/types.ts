export type Division = {
  id: string;
  slug: string;
  name: string;
  short_name: string;
  description: string;
  core_values: string[];
  sort_order: number;
};

export type Member = {
  id: string;
  name: string;
  position: string;
  division_id: string;
  sort_order: number;
};

export type Program = {
  id: string;
  slug: string;
  title: string;
  division_id: string;
  summary: string;
  content: string;
  period: string | null;
  youtube_url: string | null;
  cover_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
};

export type Post = {
  id: string;
  slug: string;
  title: string;
  category: string;
  cover_url: string | null;
  excerpt: string;
  content: string;
  author: string | null;
  status: "draft" | "published";
  published_at: string | null;
};

export type GalleryItem = {
  id: string;
  image_url: string;
  caption: string | null;
  alt: string;
  division_id: string | null;
  program_id: string | null;
  created_at: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  /** Angkatan, mis. "TLD 27" (kolom dari migrasi 0002) */
  batch?: string;
  photo_url?: string | null;
  is_visible: boolean;
  sort_order: number;
};

export type Stat = { value: string; label: string };

export type SiteSettings = {
  stats: Stat[];
  profile_video_url: string;
  contact_email: string;
};
