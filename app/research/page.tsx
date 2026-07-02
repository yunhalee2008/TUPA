import type { Metadata } from "next";
import ProjectRow from "@/components/ProjectRow";
import ResearchAreaCard from "@/components/ResearchAreaCard";
import SectionHeading from "@/components/SectionHeading";
import { getProjects, getResearchAreas } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research",
  description: "Research areas and funded projects at TUPA, KAIST.",
};

export default async function ResearchPage() {
  const [areas, projects] = await Promise.all([getResearchAreas(), getProjects()]);

  return (
    <main className="site-container py-14 lg:py-20">
      <h1 className="font-display text-4xl font-extrabold text-cobalt-900">
        Research
      </h1>
      <p className="mt-3 max-w-2xl">
        교통 시스템과 도시를 데이터와 AI로 이해하고 설계합니다. 아래 다섯 축을
        중심으로 연구합니다.
      </p>

      <section className="mt-14 gap-10 lg:grid lg:grid-cols-12">
        <SectionHeading index="01" titleEn="Areas" titleKo="연구 분야" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:col-span-9 lg:mt-0">
          {areas.map((area) => (
            <ResearchAreaCard key={area.slug} area={area} />
          ))}
        </div>
      </section>

      <section className="mt-20 gap-10 lg:grid lg:grid-cols-12">
        <SectionHeading index="02" titleEn="Projects" titleKo="연구 과제" />
        <ul className="mt-8 lg:col-span-9 lg:mt-0">
          {projects.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </ul>
      </section>
    </main>
  );
}
