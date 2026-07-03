import type { ResearchArea } from "@/lib/content";

export default function ResearchAreaCard({ area }: { area: ResearchArea }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-mapline bg-white p-6 transition-shadow hover:shadow-sm">
      <h3 className="font-display text-lg font-bold text-cobalt-900">
        {area.nameEn}
      </h3>
      <p className="ko-only mt-0.5 text-sm font-medium text-cobalt-600">
        {area.nameKo}
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed">
        <span className="ko-only">{area.descriptionKo}</span>
        <span className="en-only">{area.descriptionEn}</span>
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {area.keywords.map((keyword) => (
          <span
            key={keyword}
            className="rounded-full bg-skytint px-2.5 py-0.5 text-xs text-cobalt-900"
          >
            {keyword}
          </span>
        ))}
      </div>
    </article>
  );
}
