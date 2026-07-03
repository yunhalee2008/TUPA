"use client";

import { useMemo, useState } from "react";
import NewsCard from "@/components/NewsCard";
import type { NewsCategory, NewsItem } from "@/lib/content";

const CATEGORIES: { value: NewsCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "award", label: "Awards" },
  { value: "grant", label: "Grants" },
  { value: "people", label: "People" },
  { value: "publication", label: "Publications" },
  { value: "general", label: "General" },
];

export default function NewsExplorer({ items }: { items: NewsItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<NewsCategory | "all">("all");
  const [order, setOrder] = useState<"newest" | "oldest">("newest");

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
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색 — 제목·내용 / Search"
          aria-label="Search news"
          className="w-full max-w-xs rounded-lg border border-mapline bg-white px-3.5 py-2 text-sm outline-none transition-colors focus:border-cobalt-600 sm:w-64"
        />
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by category">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setCategory(c.value)}
              aria-pressed={category === c.value}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                category === c.value
                  ? "bg-cobalt-900 text-white"
                  : "border border-mapline bg-white text-body/70 hover:border-cobalt-600 hover:text-cobalt-600"
              }`}
            >
              {c.label}
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

      <p className="mt-4 text-sm text-body/60">{filtered.length} items</p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-body/60">
          <span className="ko-only">검색 결과가 없습니다.</span>
          <span className="en-only">No results found.</span>
        </p>
      )}
    </div>
  );
}
