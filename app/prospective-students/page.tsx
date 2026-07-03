import type { Metadata } from "next";
import OpeningCard from "@/components/OpeningCard";
import { getOpenings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Prospective Students",
  description:
    "Openings for Ph.D., master's, and intern positions at TUPA, KAIST — including fully funded GKS scholarships.",
};

export const revalidate = 3600;

export default async function ProspectiveStudentsPage() {
  const openings = await getOpenings();

  return (
    <main className="site-container py-14 lg:py-20">
      <h1 className="font-display text-4xl font-extrabold text-cobalt-900">
        Prospective Students
      </h1>
      <p className="mt-3 max-w-2xl">
        <span className="ko-only">
          TUPA는 교통·모빌리티 AI에 관심 있는 대학원생과 인턴을 모집합니다. We
          welcome applications from students in Korea and abroad — 지원 전 아래
          공고의 요건과 연락 방법을 확인해 주세요.
        </span>
        <span className="en-only">
          TUPA recruits graduate students and interns interested in transport
          and mobility AI. We welcome applications from Korea and abroad —
          please check the requirements and contact instructions below before
          applying.
        </span>
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {openings.map((opening) => (
          <OpeningCard key={opening.id} opening={opening} />
        ))}
      </div>

      <section className="mt-16 rounded-2xl bg-skytint px-8 py-10">
        <h2 className="font-display text-xl font-bold text-cobalt-900">
          <span className="ko-only">지원 절차 안내</span>
          <span className="en-only">How to apply</span>
        </h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-body/90">
          <li>
            <span className="ko-only">
              관심 포지션의 공고를 확인하고, CV·성적표·영어성적·연구 관심사
              요약을 준비합니다.
            </span>
            <span className="en-only">
              Check the opening you are interested in, and prepare your CV,
              transcript, English proficiency score, and a short summary of
              research interests.
            </span>
          </li>
          <li>
            <span className="ko-only">
              제목에 지원 트랙(예: &quot;GKS PhD application&quot;)을 명시해{" "}
            </span>
            <span className="en-only">
              State your track in the subject line (e.g. &quot;GKS PhD
              application&quot;) and email{" "}
            </span>
            <a
              className="font-medium text-cobalt-600 underline-offset-2 hover:underline"
              href="mailto:kaist.mobility@gmail.com"
            >
              kaist.mobility@gmail.com
            </a>
            <span className="ko-only">
              으로 보냅니다. 교수에게 직접 연락하지 않습니다.
            </span>
            <span className="en-only">
              . Please do not contact the professor directly.
            </span>
          </li>
          <li>
            <span className="ko-only">
              서류 검토 후 자격이 확인되면 면담 일정을 안내드립니다.
            </span>
            <span className="en-only">
              After document review, qualified applicants will be invited to an
              interview.
            </span>
          </li>
        </ol>
      </section>
    </main>
  );
}
