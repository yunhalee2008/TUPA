import type { Member } from "@/lib/content";

export default function MemberCard({ member }: { member: Member }) {
  const initials = member.nameEn
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="rounded-xl border border-mapline bg-white p-6">
      <div className="flex items-center gap-4">
        <div
          aria-hidden
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-skytint font-display text-base font-bold text-cobalt-900"
        >
          {initials}
        </div>
        <div>
          <h3 className="font-semibold text-cobalt-900">
            {member.nameEn}{" "}
            <span className="font-normal text-body/60">{member.nameKo}</span>
          </h3>
          <p className="text-sm text-body/70">{member.titleEn}</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-body/80">
        {member.researchInterests.join(" · ")}
      </p>
      {member.links && member.links.length > 0 ? (
        <p className="mt-3 flex flex-wrap gap-3 text-sm">
          {member.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="text-cobalt-600 underline-offset-2 hover:underline"
            >
              {link.label}
            </a>
          ))}
        </p>
      ) : null}
    </article>
  );
}
