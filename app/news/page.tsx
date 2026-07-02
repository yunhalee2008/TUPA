import type { Metadata } from "next";
import NewsCard from "@/components/NewsCard";
import { getNews } from "@/lib/content";

export const metadata: Metadata = {
  title: "News",
  description: "Latest news from TUPA — awards, grants, and people.",
};

export default async function NewsPage() {
  const news = await getNews();

  return (
    <main className="site-container py-14 lg:py-20">
      <h1 className="font-display text-4xl font-extrabold text-cobalt-900">News</h1>
      <p className="mt-3 max-w-2xl">수상·과제 선정·구성원 소식을 전합니다.</p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
