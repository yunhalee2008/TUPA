"use client";

import { useMemo, useState } from "react";
import PublicationItem from "@/components/PublicationItem";
import type { Publication, PublicationType } from "@/lib/content";

/** Section order and labels, dochak.com/disclosure-style. */
const SECTIONS: { type: PublicationType; ko: string; en: string }[] = [
  { type: "journal", ko: "저널 논문", en: "Journal Papers" },
  { type: "patent", ko: "특허", en: "Patents" },
  { type: "conference", ko: "국제학회 논문", en: "Conference Papers" },
  { type: "book", ko: "북챕터", en: "Book Chapters" },
];

/** Items shown per section before the reader expands it. */
const PREVIEW_COUNT = 5;

export default function PublicationExplorer({
  publications,
}: {
  publications: Publication[];
}) {
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState<"newest" | "oldest">("newest");
  const [expanded, setExpanded] = useState<Partial<Record<PublicationType, boolean>>>({});
  // While searching, every match should be visible, not hidden behind a fold.
  const searching = query.trim().length > 0;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return publications;
    return publications.filter((p) =>
      [p.title, p.authors.join(" "), p.venue, String(p.year)]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [publications, query]);

  const sections = useMemo(
    () =>
      SECTIONS.map((section) => {
        const items = filtered
          .filter((p) => p.type === section.type)
          .sort((a, b) => (order === "newest" ? b.year - a.year : a.year - b.year));
        const isExpanded = searching || expanded[section.type] === true;
        const visible = isExpanded ? items : items.slice(0, PREVIEW_COUNT);
        const years = Array.from(new Set(visible.map((p) => p.year))).sort(
          (a, b) => (order === "newest" ? b - a : a - b),
        );
        return { ...section, items, visible, years, isExpanded };
      }).filter((section) => section.items.length > 0),
    [filtered, order, expanded, searching],
  );

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
        <span className="ko-only">총 {filtered.length}건</span>
        <span className="en-only">{filtered.length} items</span>
      </p>

      {sections.map((section, sectionIndex) => (
        <section key={section.type} className="mt-12">
          <div className="border-b-2 border-cobalt-900 pb-3">
            <p className="mono-label">
              {String(sectionIndex + 1).padStart(2, "0")} — {section.en}
            </p>
            <h2 className="mt-1 font-display text-2xl font-bold text-cobalt-900">
              <span className="ko-only">{section.ko}</span>
              <span className="en-only">{section.en}</span>
              <span className="ml-2 align-middle font-sans text-sm font-normal text-body/50">
                {section.items.length}
              </span>
            </h2>
          </div>
          {section.years.map((year) => (
            <div key={year} className="mt-8 gap-10 lg:grid lg:grid-cols-12">
              <p className="mono-label lg:col-span-3">{year}</p>
              <ul className="mt-4 max-w-[72ch] lg:col-span-9 lg:mt-0">
                {section.visible
                  .filter((p) => p.year === year)
                  .map((pub) => (
                    <PublicationItem key={pub.id} pub={pub} />
                  ))}
              </ul>
            </div>
          ))}
          {!searching && section.items.length > PREVIEW_COUNT ? (
            <div className="mt-6 text-center">
              <button
                type="button"
                aria-expanded={section.isExpanded}
                onClick={() =>
                  setExpanded((prev) => ({
                    ...prev,
                    [section.type]: !section.isExpanded,
                  }))
                }
                className="btn-outline"
              >
                {section.isExpanded ? (
                  <>
                    <span className="ko-only">접기</span>
                    <span className="en-only">Show less</span>
                  </>
                ) : (
                  <>
                    <span className="ko-only">
                      전체 {section.items.length}건 보기
                    </span>
                    <span className="en-only">
                      Show all {section.items.length}
                    </span>
                  </>
                )}
              </button>
            </div>
          ) : null}
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
