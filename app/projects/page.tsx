import type { Metadata } from "next";
import Copy from "@/components/Copy";
import ProjectRow from "@/components/ProjectRow";
import { getPageCopy, getProjects } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const copy = await getPageCopy();
  return {
    title: copy["연구과제 · 탭 제목(SEO)"].en,
    description: copy["연구과제 · 검색 설명(SEO)"].en,
  };
}

export const revalidate = 3600;

export default async function ProjectsPage() {
  const [projects, copy] = await Promise.all([getProjects(), getPageCopy()]);

  return (
    <main className="site-container py-14 lg:py-20">
      <h1 className="font-display text-4xl font-extrabold text-cobalt-900">
        {copy["연구과제 · 페이지 제목"].en}
      </h1>
      <p className="mt-3 max-w-2xl">
        <Copy t={copy["연구과제 · 페이지 소개"]} />
      </p>

      <ul className="mt-10">
        {projects.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </ul>
    </main>
  );
}
