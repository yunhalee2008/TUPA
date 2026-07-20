import type { Metadata } from "next";
import Copy from "@/components/Copy";
import MemberCard from "@/components/MemberCard";
import SectionHeading from "@/components/SectionHeading";
import { getMembers, getPageCopy } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const copy = await getPageCopy();
  return {
    title: copy["구성원 · 탭 제목(SEO)"].en,
    description: copy["구성원 · 검색 설명(SEO)"].en,
  };
}

export const revalidate = 3600;

export default async function PeoplePage() {
  const [members, copy] = await Promise.all([getMembers(), getPageCopy()]);
  const professor = members.filter((m) => m.role === "professor");
  const researchers = members.filter((m) => m.role === "research-fellow");
  const phd = members.filter((m) => m.role === "phd");
  const ms = members.filter((m) => m.role === "ms");
  const interns = members.filter(
    (m) => m.role === "visiting" || m.role === "intern",
  );
  const alumni = members.filter((m) => m.role === "alumni");

  return (
    <main className="site-container py-14 lg:py-20">
      <div className="lg:flex lg:items-start lg:justify-between lg:gap-16">
        <div>
          <h1 className="font-display text-4xl font-extrabold text-cobalt-900">
            {copy["구성원 · 페이지 제목"].en}
          </h1>
          <p className="mt-3 max-w-2xl">
            <Copy t={copy["구성원 · 페이지 소개"]} />
          </p>
        </div>

        {/* Headcount strip by career stage (professor's five categories) —
            sits to the right of the title on desktop, stacks below on mobile. */}
        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-y border-mapline py-5 lg:mt-2 lg:shrink-0 lg:gap-x-8 lg:border-y-0 lg:py-0">
          {[
            { t: copy["구성원 · 인원 라벨(박사)"], count: researchers.length },
            { t: copy["구성원 · 인원 라벨(박사과정)"], count: phd.length },
            { t: copy["구성원 · 인원 라벨(석사과정)"], count: ms.length },
            { t: copy["구성원 · 인원 라벨(인턴)"], count: interns.length },
            { t: copy["구성원 · 인원 라벨(졸업생)"], count: alumni.length },
          ].map((stat) => (
            <div key={stat.t.en}>
              <dt className="mono-label">
                <Copy t={stat.t} />
              </dt>
              <dd className="mt-1 font-display text-2xl font-extrabold text-cobalt-900">
                {stat.count}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <section className="mt-14 gap-10 lg:grid lg:grid-cols-12">
        <SectionHeading
          index="01"
          titleEn={copy["구성원 · 지도교수 섹션 제목"].en}
          titleKo={copy["구성원 · 지도교수 섹션 제목"].ko}
        />
        <div className="mt-8 grid gap-5 lg:col-span-9 lg:mt-0">
          {professor.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      {researchers.length > 0 ? (
        <section className="mt-16 gap-10 lg:grid lg:grid-cols-12">
          <SectionHeading
            index="02"
            titleEn={copy["구성원 · 박사 섹션 제목"].en}
            titleKo={copy["구성원 · 박사 섹션 제목"].ko}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:col-span-9 lg:mt-0">
            {researchers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      ) : null}

      {phd.length > 0 ? (
        <section className="mt-16 gap-10 lg:grid lg:grid-cols-12">
          <SectionHeading
            index="03"
            titleEn={copy["구성원 · 박사과정 섹션 제목"].en}
            titleKo={copy["구성원 · 박사과정 섹션 제목"].ko}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:col-span-9 lg:mt-0">
            {phd.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      ) : null}

      {ms.length > 0 ? (
        <section className="mt-16 gap-10 lg:grid lg:grid-cols-12">
          <SectionHeading
            index="04"
            titleEn={copy["구성원 · 석사과정 섹션 제목"].en}
            titleKo={copy["구성원 · 석사과정 섹션 제목"].ko}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:col-span-9 lg:mt-0">
            {ms.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      ) : null}

      {interns.length > 0 ? (
        <section className="mt-16 gap-10 lg:grid lg:grid-cols-12">
          <SectionHeading
            index="05"
            titleEn={copy["구성원 · 인턴 섹션 제목"].en}
            titleKo={copy["구성원 · 인턴 섹션 제목"].ko}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:col-span-9 lg:mt-0">
            {interns.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      ) : null}

      {alumni.length > 0 ? (
        <section className="mt-16 gap-10 lg:grid lg:grid-cols-12">
          <SectionHeading
            index="06"
            titleEn={copy["구성원 · 졸업생 섹션 제목"].en}
            titleKo={copy["구성원 · 졸업생 섹션 제목"].ko}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:col-span-9 lg:mt-0">
            {alumni.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
