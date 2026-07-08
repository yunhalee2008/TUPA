import type { Metadata } from "next";
import Image from "next/image";
import ResearchAreaCard from "@/components/ResearchAreaCard";
import SectionHeading from "@/components/SectionHeading";
import { getResearchAreas, getResearchProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research",
  description: "Research areas and funded projects at TUPA, KAIST.",
};

export const revalidate = 3600;

export default async function ResearchPage() {
  const [areas, researchProjects] = await Promise.all([
    getResearchAreas(),
    getResearchProjects(),
  ]);

  return (
    <main className="site-container py-14 lg:py-20">
      <h1 className="font-display text-4xl font-extrabold text-cobalt-900">
        Research
      </h1>
      <p className="mt-3 max-w-2xl">
        <span className="ko-only">
          교통 시스템과 도시를 데이터와 AI로 이해하고 설계합니다. 아래 다섯 축을
          중심으로 연구합니다.
        </span>
        <span className="en-only">
          We understand and design transport systems and cities with data and
          AI, organised around the five areas below.
        </span>
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
        <SectionHeading
          index="02"
          titleEn="Research Topics"
          titleKo="연구 주제"
        />
        <ul className="mt-8 lg:col-span-9 lg:mt-0">
          {researchProjects.map((project) => (
            <li
              key={project.id}
              className="grid gap-4 border-b border-mapline py-5 sm:grid-cols-[160px_1fr] sm:gap-6"
            >
              {project.imageUrl ? (
                <Image
                  src={project.imageUrl}
                  alt=""
                  width={320}
                  height={214}
                  className="aspect-[3/2] w-full rounded-lg border border-mapline object-cover sm:w-40"
                />
              ) : (
                <div className="aspect-[3/2] w-full rounded-lg border border-mapline bg-skytint sm:w-40" />
              )}
              <div>
                <h3 className="font-semibold leading-snug text-cobalt-900">
                  {project.title}
                </h3>
                {project.summary ? (
                  <p className="mt-1.5 text-sm text-body/80">
                    {project.summary}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </section>

    </main>
  );
}
