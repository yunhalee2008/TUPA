import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PublicationItem from "@/components/PublicationItem";
import {
  getMemberPublicationRecord,
  getMembers,
  getPublications,
  type Publication,
} from "@/lib/content";

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  const members = await getMembers();
  return members.map((member) => ({ id: member.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const members = await getMembers();
  const member = members.find((m) => m.id === params.id);
  if (!member) return {};
  return {
    title: member.nameEn,
    description: `${member.titleEn} at TUPA, KAIST — publication record.`,
  };
}

export const revalidate = 3600;

/** Title key for deduping the same paper across sources. */
function titleKey(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9가-힣]/g, "");
}

export default async function MemberDetailPage({ params }: Props) {
  const [members, publications] = await Promise.all([
    getMembers(),
    getPublications(),
  ]);
  const member = members.find((m) => m.id === params.id);
  if (!member) notFound();

  // Publication record = lab publications listing this member as an author,
  // plus the personal SCI-journal record carried over from the legacy
  // inhi.kim/team modal (covers papers without lab co-authorship and entries
  // whose author strings use initials). Deduped by title; the lab entry wins
  // because it has full author names and a link.
  const matched = publications.filter((pub) =>
    pub.authors.includes(member.nameEn),
  );
  const legacy = await getMemberPublicationRecord(member.nameEn);
  const matchedKeys = new Set(matched.map((p) => titleKey(p.title)));
  const legacyOnly: Publication[] = legacy
    .filter((entry) => !matchedKeys.has(titleKey(entry.title)))
    .map((entry, i) => ({
      id: `${member.id}-legacy-${i}`,
      title: entry.title,
      authors: entry.authors
        .split(entry.authors.includes(";") ? ";" : ",")
        .map((a) => a.trim())
        .filter(Boolean),
      venue: entry.venue,
      year: entry.year,
      type: "journal" as const,
      tags: [],
    }));
  const record = [...matched, ...legacyOnly];
  const years = Array.from(new Set(record.map((p) => p.year))).sort(
    (a, b) => b - a,
  );

  return (
    <main className="site-container py-14 lg:py-20">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/people"
          className="text-sm text-cobalt-600 underline-offset-2 hover:underline"
        >
          ← People
        </Link>

        <div className="mt-8 flex items-center gap-5">
          {member.photoUrl ? (
            <Image
              src={member.photoUrl}
              alt={member.nameEn}
              width={112}
              height={112}
              priority
              className="h-28 w-28 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div
              aria-hidden
              className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-skytint font-display text-2xl font-bold text-cobalt-900"
            >
              {member.nameEn
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="font-display text-3xl font-extrabold text-cobalt-900">
              {member.nameEn}
            </h1>
            <p className="mt-1 text-body/70">
              <span className="ko-only">{member.titleKo}</span>
              <span className="en-only">{member.titleEn}</span>
            </p>
            {member.placement ? (
              <p className="mt-1 text-sm text-body/70">
                <span className="font-medium text-cobalt-900">
                  <span className="ko-only">현재</span>
                  <span className="en-only">Now</span>
                </span>{" "}
                · {member.placement}
              </p>
            ) : null}
          </div>
        </div>

        {member.researchInterests.length > 0 ? (
          <p className="mt-6 text-sm text-body/80">
            {member.researchInterests.join(" · ")}
          </p>
        ) : null}

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

        {member.career && member.career.length > 0 ? (
          <ul className="mt-8 space-y-1.5 border-t border-mapline pt-6 text-sm text-body/80">
            {member.career.map((line) => {
              const [, period, rest] = line.match(
                /^([\d–\-~. ]*\d[\d–\-~. ]*|Industry)\s*[—-]?\s*(.*)$/,
              ) ?? [null, "", line];
              return (
                <li key={line} className="flex gap-3">
                  <span className="w-24 shrink-0 font-mono text-xs leading-5 text-body/60">
                    {period.trim()}
                  </span>
                  <span>{rest}</span>
                </li>
              );
            })}
          </ul>
        ) : null}

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-cobalt-900">
            <span className="ko-only">논문 실적</span>
            <span className="en-only">Publication record</span>
            <span className="ml-2 align-middle font-sans text-sm font-normal text-body/50">
              {record.length}
            </span>
          </h2>
          {record.length > 0 ? (
            years.map((year) => (
              <div key={year} className="mt-6">
                <p className="mono-label">{year}</p>
                <ul className="mt-2">
                  {record
                    .filter((p) => p.year === year)
                    .map((pub) => (
                      <PublicationItem key={pub.id} pub={pub} />
                    ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="mt-4 text-sm text-body/70">
              <span className="ko-only">
                이 목록에는 연구실 공식 발표 실적만 표시됩니다.
              </span>
              <span className="en-only">
                Only publications listed on the lab&apos;s record appear here.
              </span>
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
