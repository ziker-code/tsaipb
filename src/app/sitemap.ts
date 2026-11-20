import type { MetadataRoute } from "next";
import { getPosts, getPrograms } from "@/lib/data";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [programs, posts] = await Promise.all([getPrograms(), getPosts()]);

  const pages: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/tentang`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/struktur`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/program`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/berita`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/galeri`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${site.url}/kontak`, changeFrequency: "yearly", priority: 0.5 },
  ];

  return [
    ...pages,
    ...programs.map((p) => ({ url: `${site.url}/program/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...posts.map((p) => ({
      url: `${site.url}/berita/${p.slug}`,
      lastModified: p.published_at ?? undefined,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
