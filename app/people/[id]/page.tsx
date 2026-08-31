import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Copy from "@/components/Copy";
import PublicationItem from "@/components/PublicationItem";
import {
  getMemberPublicationRecord,
  getMembers,
  getPageCopy,
  getPublications,
  type Publication,
} from "@/lib/content";

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  const members = await getMembers();
  return members
    .filter((member) => member.role !== "admin")
    .map((member) => ({ id: member.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [members, copy] = await Promise.all([getMembers(), getPageCopy()]);
  const member = members.find((m) => m.id === params.id);
  if (!member) return {};
  return {
    title: member.nameEn,
    description: `${member.titleEn} ${copy["구성원 · 상세 검색 설명(SEO)"].en}`,
  };
}

export const revalidate = 3600;

/** Title key for deduping the same paper across sources. */
/**
 * Dedup key for a paper title. Punctuation, spacing and a leading article all
 * vary between the lab record and the personal record for the same paper, so
 * none of them may decide whether two entries are the same work.
 */
function titleKey(title: string): string {
  return title
    .toLowerCase()
    .replace(/^(a|an|the)\s+/, "")
    .replace(/[^a-z0-9가-힣]/g, "");
}

export default async function MemberDetailPage({ params }: Props) {
  const [members, publications, copy] = await Promise.all([
    getMembers(),
    getPublications(),
    getPageCopy(),
  ]);
  const member = members.find((m) => m.id === params.id);
  if (!member || member.role === "admin") notFound();

  // Publication record = lab journal papers listing this member as an author,
  // plus the personal SCI-journal record carried over from the legacy
  // inhi.kim/team modal (covers papers without lab co-authorship and entries
  // whose author strings use initials). Deduped by title; the lab entry wins
  // because it has full author names and a link.
  //
  // Journals only: conference entries carry venue and author details that do
  // not survive being attributed to an individual, so they stay on the
  // publications page rather than on a personal record.
  const matched = publications.filter(
    (pub) => pub.type === "journal" && pub.authors.includes(member.nameEn),
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
          {copy["구성원 · 상세 뒤로가기 링크"].en}
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
                  <Copy t={copy["구성원 · 현재 소속 라벨"]} />
                </span>{" "}
                · {member.placement}
              </p>
            ) : null}
          </div>
        </div>

        {member.researchInterests.length > 0 ? (
          <p className="mt-6 text-sm text-body/80">
            {/* KO list is optional — fall back to the English one when absent. */}
            <span className="ko-only">
              {(member.researchInterestsKo?.length
                ? member.researchInterestsKo
                : member.researchInterests
              ).join(" · ")}
            </span>
            <span className="en-only">
              {member.researchInterests.join(" · ")}
            </span>
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
            <Copy t={copy["구성원 · 논문 실적 섹션 제목"]} />
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
              <Copy t={copy["구성원 · 논문 실적 없음 안내"]} />
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
