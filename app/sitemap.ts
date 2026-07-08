import type { MetadataRoute } from "next";
import { getGalleryAlbums, getMembers, getNews, getProjects } from "@/lib/content";

const SITE_URL = "https://tupa-two.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [news, albums, projects, members] = await Promise.all([
    getNews(),
    getGalleryAlbums(),
    getProjects(),
    getMembers(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/research",
    "/publications",
    "/projects",
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
    ...projects.map((project) => ({
      url: `${SITE_URL}/projects/${project.id}`,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
    ...members.map((member) => ({
      url: `${SITE_URL}/people/${member.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
  ];
}
