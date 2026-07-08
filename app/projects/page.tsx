import type { Metadata } from "next";
import ProjectRow from "@/components/ProjectRow";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Funded research projects at TUPA, KAIST.",
};

export const revalidate = 3600;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="site-container py-14 lg:py-20">
      <h1 className="font-display text-4xl font-extrabold text-cobalt-900">
        Projects
      </h1>
      <p className="mt-3 max-w-2xl">
        <span className="ko-only">
          정부·산업체와 함께 수행한 연구 과제 목록입니다. 과제를 클릭하면 상세
          설명을 볼 수 있습니다.
        </span>
        <span className="en-only">
          Funded research projects with government and industry partners. Click
          a project for details.
        </span>
      </p>

      <ul className="mt-10">
        {projects.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </ul>
    </main>
  );
}
