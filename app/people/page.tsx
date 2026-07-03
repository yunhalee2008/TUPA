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
  const visitors = members.filter(
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
            titleEn="Post-Docs & Researchers"
            titleKo="연구원"
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

      {visitors.length > 0 ? (
        <section className="mt-16 gap-10 lg:grid lg:grid-cols-12">
          <SectionHeading
            index="05"
            titleEn="Visiting & Interns"
            titleKo="방문 학생 · 인턴"
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:col-span-9 lg:mt-0">
            {visitors.map((member) => (
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
