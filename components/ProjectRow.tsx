import type { Project } from "@/lib/content";

export default function ProjectRow({ project }: { project: Project }) {
  return (
    <li className="grid gap-2 border-b border-mapline py-5 sm:grid-cols-[110px_1fr] sm:gap-6">
      <div>
        <span className="font-mono text-sm text-body/60">
          {project.startYear}–{project.endYear}
        </span>
        {project.ongoing ? (
          <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-safety align-middle" aria-label="ongoing" />
        ) : null}
      </div>
      <div>
        <p className="font-medium leading-snug text-cobalt-900">{project.titleEn}</p>
        <p className="mt-1 text-sm text-body/80">{project.titleKo}</p>
        <p className="mt-1.5 text-sm text-body/60">
          {project.sponsor} · {project.role}
        </p>
      </div>
    </li>
  );
}
