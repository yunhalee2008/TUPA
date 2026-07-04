"use client";

import { useMemo, useState } from "react";
import NewsCard from "@/components/NewsCard";
import type { NewsCategory, NewsItem } from "@/lib/content";

const CATEGORIES: { value: NewsCategory | "all"; ko: string; en: string }[] = [
  { value: "all", ko: "전체", en: "All" },
  { value: "award", ko: "수상", en: "Awards" },
  { value: "grant", ko: "과제선정", en: "Grants" },
  { value: "people", ko: "사람들", en: "People" },
  { value: "publication", ko: "논문", en: "Publications" },
  { value: "general", ko: "일반", en: "General" },
];

const PAGE_SIZE = 24;

export default function NewsExplorer({ items }: { items: NewsItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<NewsCategory | "all">("all");
  const [order, setOrder] = useState<"newest" | "oldest">("newest");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = items;
    if (category !== "all") {
      result = result.filter((item) => item.category === category);
    }
    if (q) {
      result = result.filter((item) =>
        [item.titleKo, item.titleEn, item.summaryKo, item.summaryEn]
          .join(" ")
          .toLowerCase()
          .includes(q),
      );
    }
    return [...result].sort((a, b) =>
      order === "newest"
        ? b.date.localeCompare(a.date)
        : a.date.localeCompare(b.date),
    );
  }, [items, query, category, order]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setVisibleCount(PAGE_SIZE);
          }}
          placeholder="검색 — 제목·내용 / Search"
          aria-label="Search news"
          className="w-full max-w-xs rounded-lg border border-mapline bg-white px-3.5 py-2 text-sm outline-none transition-colors focus:border-cobalt-600 sm:w-64"
        />
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by category">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => {
                setCategory(c.value);
                setVisibleCount(PAGE_SIZE);
              }}
              aria-pressed={category === c.value}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                category === c.value
                  ? "bg-cobalt-900 text-white"
                  : "border border-mapline bg-white text-body/70 hover:border-cobalt-600 hover:text-cobalt-600"
              }`}
            >
              <span className="ko-only">{c.ko}</span>
              <span className="en-only">{c.en}</span>
            </button>
          ))}
        </div>
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value as "newest" | "oldest")}
          aria-label="Sort order"
          className="ml-auto rounded-lg border border-mapline bg-white px-3 py-2 text-sm outline-none focus:border-cobalt-600"
        >
          <option value="newest">최신순 · Newest</option>
          <option value="oldest">오래된순 · Oldest</option>
        </select>
      </div>

      <p className="mt-4 text-sm text-body/60">
        <span className="ko-only">{filtered.length}건</span>
        <span className="en-only">{filtered.length} items</span>
      </p>

      {filtered.length > 0 ? (
        <>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.slice(0, visibleCount).map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
          {filtered.length > visibleCount ? (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                className="btn-outline"
              >
                <span className="ko-only">
                  더 보기 ({filtered.length - visibleCount}건 남음)
                </span>
                <span className="en-only">
                  Load more ({filtered.length - visibleCount} remaining)
                </span>
              </button>
            </div>
          ) : null}
        </>
      ) : (
        <p className="mt-10 text-body/60">
          <span className="ko-only">검색 결과가 없습니다.</span>
          <span className="en-only">No results found.</span>
        </p>
      )}
    </div>
  );
}
