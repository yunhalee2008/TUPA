import type { Metadata } from "next";
import MemberCard from "@/components/MemberCard";
import SectionHeading from "@/components/SectionHeading";
import { getMembers } from "@/lib/content";

export const metadata: Metadata = {
  title: "People",
  description: "Members of TUPA — professor, researchers, and students.",
};

export default async function PeoplePage() {
  const members = await getMembers();
  const professor = members.filter((m) => m.role === "professor");
  const researchers = members.filter((m) => m.role === "research-fellow");
  const students = members.filter((m) => m.role === "phd" || m.role === "ms");

  return (
    <main className="site-container py-14 lg:py-20">
      <h1 className="font-display text-4xl font-extrabold text-cobalt-900">People</h1>
      <p className="mt-3 max-w-2xl">
        교통공학·도시계획·컴퓨터과학 배경의 구성원들이 함께 연구합니다.
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
          <SectionHeading index="02" titleEn="Researchers" titleKo="연구원" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:col-span-9 lg:mt-0">
            {researchers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-16 gap-10 lg:grid lg:grid-cols-12">
        <SectionHeading index="03" titleEn="Students" titleKo="학생" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:col-span-9 lg:mt-0">
          {students.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>
    </main>
  );
}
