import type { Opening } from "@/lib/content";

const POSITION_LABEL: Record<Opening["position"], string> = {
  phd: "Ph.D.",
  ms: "M.S.",
  postdoc: "Postdoc",
  intern: "Intern",
};

export default function OpeningCard({ opening }: { opening: Opening }) {
  return (
    <article className="rounded-xl border border-mapline bg-white p-7">
      <div className="flex flex-wrap items-center gap-2">
        <span className="mono-label">{POSITION_LABEL[opening.position]}</span>
        {opening.active ? (
          <span className="rounded-full bg-safety px-2.5 py-0.5 text-xs font-semibold text-white">
            <span className="ko-only">모집중</span>
            <span className="en-only">Open</span>
          </span>
        ) : null}
      </div>
      <h3 className="mt-3 font-display text-lg font-bold text-cobalt-900">
        {opening.titleEn}
      </h3>
      <p className="ko-only mt-1 text-sm font-medium text-body/80">
        {opening.titleKo}
      </p>
      <p className="mt-3 text-sm leading-relaxed">
        <span className="ko-only">{opening.descriptionKo}</span>
        <span className="en-only">{opening.descriptionEn}</span>
      </p>
      <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-body/80">
        {opening.requirements.map((req) => (
          <li key={req}>{req}</li>
        ))}
      </ul>
      <p className="mt-4 border-t border-mapline pt-4 text-sm text-body/70">
        {opening.deadline ? (
          <>
            <span className="ko-only">마감</span>
            <span className="en-only">Deadline</span>{" "}
            <span className="font-mono">{opening.deadline}</span> ·{" "}
          </>
        ) : (
          <>
            <span className="ko-only">상시 모집</span>
            <span className="en-only">Rolling admissions</span>
            {" · "}
          </>
        )}
        <a
          className="text-cobalt-600 underline-offset-2 hover:underline"
          href={`mailto:${opening.contactEmail}`}
        >
          {opening.contactEmail}
        </a>
      </p>
    </article>
  );
}
