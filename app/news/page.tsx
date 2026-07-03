import type { Metadata } from "next";
import NewsExplorer from "@/components/NewsExplorer";
import { getNews } from "@/lib/content";

export const metadata: Metadata = {
  title: "News",
  description: "Latest news from TUPA — awards, grants, and people.",
};

export const revalidate = 3600;

export default async function NewsPage() {
  const news = await getNews();

  return (
    <main className="site-container py-14 lg:py-20">
      <h1 className="font-display text-4xl font-extrabold text-cobalt-900">News</h1>
      <p className="mt-3 max-w-2xl">
        <span className="ko-only">수상·과제 선정·구성원 소식을 전합니다.</span>
        <span className="en-only">Awards, grants, and people news from TUPA.</span>
      </p>
      <div className="mt-10">
        <NewsExplorer items={news} />
      </div>
    </main>
  );
}
