import type { Metadata } from "next";
import Copy from "@/components/Copy";
import ResearchTopicList from "@/components/ResearchTopicList";
import {
  getPageCopy,
  getResearchAreas,
  getResearchProjects,
} from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const copy = await getPageCopy();
  return {
    title: copy["연구 · 탭 제목(SEO)"].en,
    description: copy["연구 · 검색 설명(SEO)"].en,
  };
}

export const revalidate = 3600;

export default async function ResearchPage() {
  const [areas, researchProjects, copy] = await Promise.all([
    getResearchAreas(),
    getResearchProjects(),
    getPageCopy(),
  ]);

  return (
    <main className="site-container py-14 lg:py-20">
      <h1 className="font-display text-4xl font-extrabold text-cobalt-900">
        {copy["연구 · 페이지 제목"].en}
      </h1>
      <p className="mt-3 max-w-2xl">
        <Copy t={copy["연구 · 페이지 소개"]} />
      </p>

      {areas.map((area, i) => {
        const topics = researchProjects.filter(
          (p) => p.areaSlug === area.slug,
        );
        return (
          <section
            key={area.slug}
            className={
              i === 0
                ? "mt-14 gap-10 lg:grid lg:grid-cols-12"
                : "mt-16 gap-10 border-t border-mapline pt-16 lg:grid lg:grid-cols-12 lg:pt-20"
            }
          >
            <div className="lg:col-span-3">
              <p className="mono-label">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-2 text-2xl font-bold text-cobalt-900">
                <span className="ko-only">{area.nameKo}</span>
                <span className="en-only">{area.nameEn}</span>
              </h2>
            </div>
            <div className="lg:col-span-9">
              <p className="mt-8 max-w-[68ch] text-sm leading-relaxed lg:mt-0">
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
              {topics.length > 0 ? (
                <ResearchTopicList projects={topics} />
              ) : null}
            </div>
          </section>
        );
      })}
    </main>
  );
}
