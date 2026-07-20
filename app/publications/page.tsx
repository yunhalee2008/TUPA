import type { Metadata } from "next";
import Copy from "@/components/Copy";
import PublicationExplorer from "@/components/PublicationExplorer";
import { getPageCopy, getPublications, getSiteSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const copy = await getPageCopy();
  return {
    title: copy["논문 · 탭 제목(SEO)"].en,
    description: copy["논문 · 검색 설명(SEO)"].en,
  };
}

export const revalidate = 3600;

export default async function PublicationsPage() {
  const [publications, settings, copy] = await Promise.all([
    getPublications(),
    getSiteSettings(),
    getPageCopy(),
  ]);

  return (
    <main className="site-container py-14 lg:py-20">
      <h1 className="font-display text-4xl font-extrabold text-cobalt-900">
        {copy["논문 · 페이지 제목"].en}
      </h1>
      <p className="mt-3 max-w-2xl">
        <Copy t={copy["논문 · 페이지 소개(링크 앞)"]} />{" "}
        <a
          href={settings["Google Scholar"]}
          target="_blank"
          rel="noreferrer"
          className="text-cobalt-600 underline-offset-2 hover:underline"
        >
          Google Scholar
        </a>
        <Copy t={copy["논문 · 페이지 소개(링크 사이)"]} />{" "}
        <a
          href={settings["Scopus"]}
          target="_blank"
          rel="noreferrer"
          className="text-cobalt-600 underline-offset-2 hover:underline"
        >
          Scopus
        </a>
        <Copy t={copy["논문 · 페이지 소개(링크 뒤)"]} />
      </p>

      <div className="mt-10">
        <PublicationExplorer publications={publications} />
      </div>
    </main>
  );
}
