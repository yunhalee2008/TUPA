import Image from "next/image";
import Link from "next/link";
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
    <article className="overflow-hidden rounded-xl border border-mapline bg-white transition-shadow hover:shadow-md">
      <Link href={`/news/${item.id}`} className="block h-full">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt=""
            width={640}
            height={360}
            className="aspect-video w-full border-b border-mapline object-cover"
          />
        ) : null}
        <div className="p-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-body/60">{item.date}</span>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${CATEGORY_STYLE[item.category]}`}
            >
              {item.category}
            </span>
          </div>
          <h3 className="mt-3 font-semibold leading-snug text-cobalt-900">
            <span className="ko-only">{item.titleKo}</span>
            <span className="en-only">{item.titleEn}</span>
          </h3>
          <p className="mt-1.5 text-sm">
            <span className="ko-only">{item.summaryKo}</span>
            <span className="en-only">{item.summaryEn}</span>
          </p>
        </div>
      </Link>
    </article>
  );
}
