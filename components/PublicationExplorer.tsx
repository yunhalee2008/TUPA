"use client";

import { useMemo, useState } from "react";
import PublicationItem from "@/components/PublicationItem";
import type { Publication, PublicationType } from "@/lib/content";

const TYPES: { value: PublicationType | "all"; ko: string; en: string }[] = [
  { value: "all", ko: "전체", en: "All" },
  { value: "conference", ko: "학회", en: "Conference" },
  { value: "book", ko: "북챕터", en: "Book" },
];

export default function PublicationExplorer({
  publications,
}: {
  publications: Publication[];
}) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<PublicationType | "all">("all");
  const [order, setOrder] = useState<"newest" | "oldest">("newest");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = publications;
    if (type !== "all") {
      result = result.filter((p) => p.type === type);
    }
    if (q) {
      result = result.filter((p) =>
        [p.title, p.authors.join(" "), p.venue, String(p.year)]
          .join(" ")
          .toLowerCase()
          .includes(q),
      );
    }
    return result;
  }, [publications, query, type]);

  const years = useMemo(() => {
    const unique = Array.from(new Set(filtered.map((p) => p.year)));
    return unique.sort((a, b) => (order === "newest" ? b - a : a - b));
  }, [filtered, order]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색 — 제목·저자·학회 / Search"
          aria-label="Search publications"
          className="w-full max-w-xs rounded-lg border border-mapline bg-white px-3.5 py-2 text-sm outline-none transition-colors focus:border-cobalt-600 sm:w-72"
        />
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by type">
          {TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setType(t.value)}
              aria-pressed={type === t.value}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                type === t.value
                  ? "bg-cobalt-900 text-white"
                  : "border border-mapline bg-white text-body/70 hover:border-cobalt-600 hover:text-cobalt-600"
              }`}
            >
              <span className="ko-only">{t.ko}</span>
              <span className="en-only">{t.en}</span>
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
        <span className="ko-only">논문 {filtered.length}편</span>
        <span className="en-only">{filtered.length} publications</span>
      </p>

      {years.map((year) => (
        <section key={year} className="mt-10 gap-10 lg:grid lg:grid-cols-12">
          <p className="mono-label lg:col-span-3">{year}</p>
          <ul className="mt-4 max-w-[72ch] lg:col-span-9 lg:mt-0">
            {filtered
              .filter((p) => p.year === year)
              .map((pub) => (
                <PublicationItem key={pub.id} pub={pub} />
              ))}
          </ul>
        </section>
      ))}

      {filtered.length === 0 ? (
        <p className="mt-10 text-body/60">
          <span className="ko-only">검색 결과가 없습니다.</span>
          <span className="en-only">No results found.</span>
        </p>
      ) : null}
    </div>
  );
}
