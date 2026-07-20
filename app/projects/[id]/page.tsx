import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Copy from "@/components/Copy";
import { getPageCopy, getProject, getProjects } from "@/lib/content";

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject(params.id);
  if (!project) return {};
  return { title: project.titleEn, description: project.titleKo };
}

export const revalidate = 3600;

export default async function ProjectDetailPage({ params }: Props) {
  const [project, copy] = await Promise.all([
    getProject(params.id),
    getPageCopy(),
  ]);
  if (!project) notFound();

  return (
    <main className="site-container py-14 lg:py-20">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/projects"
          className="text-sm text-cobalt-600 underline-offset-2 hover:underline"
        >
          {copy["연구과제 상세 · 뒤로가기 링크"].en}
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-skytint px-2.5 py-0.5 text-xs font-medium text-cobalt-900">
            {project.sponsor}
          </span>
          <span className="rounded-full border border-mapline px-2.5 py-0.5 text-xs text-body/70">
            {project.role}
          </span>
          <span className="font-mono text-sm text-body/60">
            {project.startYear}–{project.endYear}
          </span>
          {project.ongoing ? (
            <span className="rounded-full bg-safety/10 px-2.5 py-0.5 text-xs font-medium text-safety">
              <Copy t={copy["연구과제 상세 · 진행중 배지"]} />
            </span>
          ) : null}
        </div>

        <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight text-cobalt-900 sm:text-4xl">
          {project.titleEn}
        </h1>
        {project.titleKo ? (
          <p className="ko-only mt-2 text-lg text-body/70">{project.titleKo}</p>
        ) : null}

        {project.body && project.body.length > 0 ? (
          <div className="mt-8 space-y-4 leading-relaxed text-body/90">
            {project.body.map((paragraph) => (
              <p key={paragraph.slice(0, 60)}>{paragraph}</p>
            ))}
          </div>
        ) : (
          <p className="mt-8 rounded-xl border border-mapline bg-white p-6 text-sm text-body/70">
            <Copy t={copy["연구과제 상세 · 자료 준비중 안내"]} />
          </p>
        )}

        {project.images && project.images.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {project.images.map((src) => (
              <Image
                key={src}
                src={src}
                alt={project.titleEn}
                width={640}
                height={480}
                className="w-full rounded-xl border border-mapline object-cover"
              />
            ))}
          </div>
        ) : null}
      </article>
    </main>
  );
}
