import type { Metadata } from "next";
import Copy from "@/components/Copy";
import ResearchAreaCard from "@/components/ResearchAreaCard";
import ResearchTopicList from "@/components/ResearchTopicList";
import SectionHeading from "@/components/SectionHeading";
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

      <section className="mt-14 gap-10 lg:grid lg:grid-cols-12">
        <SectionHeading
          index="01"
          titleEn={copy["연구 · 연구 분야 섹션 제목"].en}
          titleKo={copy["연구 · 연구 분야 섹션 제목"].ko}
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:col-span-9 lg:mt-0">
          {areas.map((area) => (
            <ResearchAreaCard key={area.slug} area={area} />
          ))}
        </div>
      </section>

      <section className="mt-20 gap-10 lg:grid lg:grid-cols-12">
        <SectionHeading
          index="02"
          titleEn={copy["연구 · 연구 주제 섹션 제목"].en}
          titleKo={copy["연구 · 연구 주제 섹션 제목"].ko}
        />
        <ResearchTopicList projects={researchProjects} />
      </section>

    </main>
  );
}
