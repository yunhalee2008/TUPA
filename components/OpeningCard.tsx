import Copy from "@/components/Copy";
import CopyTemplateButton from "@/components/CopyTemplateButton";
import { getPageCopy, type Opening } from "@/lib/content";

const POSITION_LABEL: Record<Opening["position"], string> = {
  phd: "Ph.D.",
  ms: "M.S.",
  postdoc: "Postdoc",
  intern: "Intern",
};

/**
 * Application email template applicants can paste into any mail client.
 * The template text lives in the "입학안내 · 지원 이메일 템플릿" copy key;
 * {이메일}, {포지션}, {공고제목} placeholders are substituted per opening.
 */
function applyTemplate(template: string, opening: Opening): string {
  return template
    .replaceAll("{이메일}", opening.contactEmail)
    .replaceAll("{포지션}", POSITION_LABEL[opening.position])
    .replaceAll("{공고제목}", opening.titleEn);
}

export default async function OpeningCard({ opening }: { opening: Opening }) {
  const copy = await getPageCopy();
  return (
    <article className="rounded-xl border border-mapline bg-white p-7">
      <div className="flex flex-wrap items-center gap-2">
        <span className="mono-label">{POSITION_LABEL[opening.position]}</span>
        {opening.active ? (
          <span className="rounded-full bg-safety px-2.5 py-0.5 text-xs font-semibold text-white">
            <Copy t={copy["입학안내 · 공고 모집중 배지"]} />
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
        <Copy t={{ ko: opening.descriptionKo, en: opening.descriptionEn }} />
      </p>
      <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-body/80">
        {opening.requirements.map((req) => (
          <li key={req}>{req}</li>
        ))}
      </ul>
      <p className="mt-4 border-t border-mapline pt-4 text-sm text-body/70">
        {opening.deadline ? (
          <>
            <Copy t={copy["입학안내 · 공고 마감 라벨"]} />{" "}
            <span className="font-mono">{opening.deadline}</span> ·{" "}
          </>
        ) : (
          <>
            <Copy t={copy["입학안내 · 공고 상시 모집"]} />
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
        <CopyTemplateButton
          text={applyTemplate(copy["입학안내 · 지원 이메일 템플릿"].ko, opening)}
        />
      ) : null}
    </article>
  );
}
