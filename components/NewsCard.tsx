import type { NewsCategory, NewsItem } from "@/lib/content";

const CATEGORY_STYLE: Record<NewsCategory, string> = {
  award: "bg-safety/10 text-safety",
  grant: "bg-skytint text-cobalt-900",
  people: "bg-skytint text-cobalt-900",
  publication: "bg-skytint text-cobalt-900",
  general: "border border-mapline text-body/70",
};

export default function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="rounded-xl border border-mapline bg-white p-6">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-body/60">{item.date}</span>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${CATEGORY_STYLE[item.category]}`}
        >
          {item.category}
        </span>
      </div>
      <h3 className="mt-3 font-semibold leading-snug text-cobalt-900">
        {item.titleEn}
      </h3>
      <p className="mt-1.5 text-sm">{item.summaryKo}</p>
    </article>
  );
}
