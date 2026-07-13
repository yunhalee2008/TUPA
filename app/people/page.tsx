import type { Metadata } from "next";
import MemberCard from "@/components/MemberCard";
import SectionHeading from "@/components/SectionHeading";
import { getMembers } from "@/lib/content";

export const metadata: Metadata = {
  title: "People",
  description: "Members of TUPA — professor, researchers, and students.",
};

export const revalidate = 3600;

export default async function PeoplePage() {
  const members = await getMembers();
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
      <h1 className="font-display text-4xl font-extrabold text-cobalt-900">People</h1>
      <p className="mt-3 max-w-2xl">
        <span className="ko-only">
          교통공학·도시계획·컴퓨터과학 배경의 구성원들이 함께 연구합니다.
        </span>
        <span className="en-only">
          Our members come from transportation engineering, urban planning, and
          computer science backgrounds.
        </span>
      </p>

      {/* Headcount band by career stage (professor's five categories),
          styled after the home page's Join TUPA band. */}
      <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 rounded-2xl bg-cobalt-900 px-8 py-8 text-white sm:grid-cols-3 lg:grid-cols-5 lg:px-12 lg:py-10">
        {[
          { ko: "박사", en: "Post-docs", count: researchers.length },
          { ko: "박사과정", en: "Ph.D. Students", count: phd.length },
          { ko: "석사과정", en: "M.S. Students", count: ms.length },
          { ko: "인턴", en: "Interns", count: interns.length },
          { ko: "졸업생", en: "Alumni", count: alumni.length },
        ].map((stat) => (
          <div key={stat.en}>
            <dt className="text-xs uppercase tracking-wide text-white/60">
              <span className="ko-only">{stat.ko}</span>
              <span className="en-only">{stat.en}</span>
            </dt>
            <dd className="mt-1 font-display text-3xl font-extrabold">
              {stat.count}
            </dd>
          </div>
        ))}
      </dl>

      <section className="mt-14 gap-10 lg:grid lg:grid-cols-12">
        <SectionHeading index="01" titleEn="Director" titleKo="지도교수" />
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
            titleEn="Post-doctoral Researchers"
            titleKo="박사"
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
          <SectionHeading index="03" titleEn="Ph.D. Students" titleKo="박사과정" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:col-span-9 lg:mt-0">
            {phd.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      ) : null}

      {ms.length > 0 ? (
        <section className="mt-16 gap-10 lg:grid lg:grid-cols-12">
          <SectionHeading index="04" titleEn="M.S. Students" titleKo="석사과정" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:col-span-9 lg:mt-0">
            {ms.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      ) : null}

      {interns.length > 0 ? (
        <section className="mt-16 gap-10 lg:grid lg:grid-cols-12">
          <SectionHeading index="05" titleEn="Interns" titleKo="인턴" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:col-span-9 lg:mt-0">
            {interns.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      ) : null}

      {alumni.length > 0 ? (
        <section className="mt-16 gap-10 lg:grid lg:grid-cols-12">
          <SectionHeading index="06" titleEn="Alumni" titleKo="졸업생" />
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
