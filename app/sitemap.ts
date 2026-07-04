import type { MetadataRoute } from "next";
import { getGalleryAlbums, getNews } from "@/lib/content";

const SITE_URL = "https://tupa-two.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [news, albums] = await Promise.all([getNews(), getGalleryAlbums()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/research",
    "/publications",
    "/people",
    "/news",
    "/gallery",
    "/prospective-students",
    "/contact",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "/news" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  return [
    ...staticRoutes,
    ...news.map((item) => ({
      url: `${SITE_URL}/news/${item.id}`,
      lastModified: item.date,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    ...albums.map((album) => ({
      url: `${SITE_URL}/gallery/${album.id}`,
      lastModified: album.date,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
