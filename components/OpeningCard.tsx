import type { Opening } from "@/lib/content";

const POSITION_LABEL: Record<Opening["position"], string> = {
  phd: "Ph.D.",
  ms: "M.S.",
  postdoc: "Postdoc",
  intern: "Intern",
};

/** Pre-filled application email so applicants know exactly what to send. */
function applyMailto(opening: Opening): string {
  const subject = `[${POSITION_LABEL[opening.position]} Application] ${opening.titleEn} — (Your name)`;
  const body = [
    "Dear TUPA,",
    "",
    "Name / 이름:",
    "Affiliation & year / 소속·학년:",
    "Research interests / 관심 연구 분야:",
    "Programming experience / 프로그래밍 경험:",
    "Available period / 가능한 기간:",
    "",
    "Attachments: CV, transcript (and English score if applicable)",
  ].join("\n");
  return `mailto:${opening.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

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
      {opening.active ? (
        <a href={applyMailto(opening)} className="btn-primary mt-4">
          <span className="ko-only">지원 메일 보내기</span>
          <span className="en-only">Apply by email</span>
        </a>
      ) : null}
    </article>
  );
}
