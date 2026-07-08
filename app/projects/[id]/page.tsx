import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/lib/content";

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
  const project = await getProject(params.id);
  if (!project) notFound();

  return (
    <main className="site-container py-14 lg:py-20">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/projects"
          className="text-sm text-cobalt-600 underline-offset-2 hover:underline"
        >
          ← Projects
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
              <span className="ko-only">진행중</span>
              <span className="en-only">Ongoing</span>
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
            <span className="ko-only">
              이 과제의 상세 자료는 준비 중입니다. 문의는 Contact 페이지를
              이용해 주세요.
            </span>
            <span className="en-only">
              Detailed materials for this project are being prepared. Please use
              the Contact page for inquiries.
            </span>
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
