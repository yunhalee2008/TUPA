import type { Metadata } from "next";
import Copy from "@/components/Copy";
import NewsExplorer from "@/components/NewsExplorer";
import { getNews, getPageCopy } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const copy = await getPageCopy();
  return {
    title: copy["소식 · 탭 제목(SEO)"].en,
    description: copy["소식 · 검색 설명(SEO)"].en,
  };
}

export const revalidate = 3600;

export default async function NewsPage() {
  const news = await getNews();
  const copy = await getPageCopy();

  return (
    <main className="site-container py-14 lg:py-20">
      <h1 className="font-display text-4xl font-extrabold text-cobalt-900">
        {copy["소식 · 페이지 제목"].en}
      </h1>
      <p className="mt-3 max-w-2xl">
        <Copy t={copy["소식 · 페이지 소개"]} />
      </p>
      <div className="mt-10">
        <NewsExplorer items={news} />
      </div>
    </main>
  );
}
