import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import NewsCard from "@/components/NewsCard";
import OpeningCard from "@/components/OpeningCard";
import { getFaqs, getNews, getOpenings, getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Prospective Students",
  description:
    "Openings for Ph.D., master's, and intern positions at TUPA, KAIST — including fully funded GKS scholarships.",
};

export const revalidate = 3600;

/** Real student journeys — from undergraduate researcher to graduate school. */
const JOURNEYS = [
  {
    name: "Jaeeun Jung",
    photo: "/people/jaeeun-jung.jpg",
    stepsKo: [
      "학부 3학년 — 교통학회 우수논문상",
      "석사과정 — TRB 1저자 논문 · 과학기술우수논문상 · NRF 연구장려금",
      "현재 — 한국철도기술연구원",
    ],
    stepsEn: [
      "3rd-year undergrad — KST best paper award",
      "M.S. — first-author TRB papers, national paper award, NRF fund",
      "Now — Korea Railroad Research Institute",
    ],
  },
  {
    name: "Hyunchul Park",
    photo: "/people/hyunchul-park.jpg",
    stepsKo: [
      "학부 4학년 — 추계 ITS학회 우수논문상 (전국 석박사와 경쟁)",
      "석사과정 — TRB 논문 · 글로벌리더 장학금 · 우수조교상",
      "현재 — 박사과정",
    ],
    stepsEn: [
      "4th-year undergrad — best paper at the Korea ITS conference",
      "M.S. — TRB papers, leadership scholarship, outstanding TA award",
      "Now — Ph.D. student",
    ],
  },
  {
    name: "Yeji Yoo",
    photo: "/people/yeji-yoo.jpg",
    stepsKo: [
      "학부 — 박창호 장학금 · 학회 우수논문상 다수",
      "학부연구생 — ITS 세계총회 등 국내외 발표",
      "현재 — 석사과정",
    ],
    stepsEn: [
      "Undergrad — Park Chang-ho scholarship, multiple best paper awards",
      "Undergraduate researcher — presented at ITS World Congress and more",
      "Now — M.S. student",
    ],
  },
];

export default async function ProspectiveStudentsPage() {
  const [openings, faqs, news, settings] = await Promise.all([
    getOpenings(),
    getFaqs(),
    getNews(),
    getSiteSettings(),
  ]);
  const studentAwards = news
    .filter((item) => item.category === "award")
    .slice(0, 6);

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
              공고 카드의 &quot;지원 메일 보내기&quot; 버튼을 누르면 양식이 채워진
              메일이 열립니다. 교수에게 직접 연락하지 않습니다.
            </span>
            <span className="en-only">
              Click &quot;Apply by email&quot; on an opening card to open a
              pre-filled email. Please do not contact the professor directly.
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
        <p className="mt-5 flex flex-wrap gap-4 border-t border-cobalt-900/10 pt-4 text-sm">
          <a
            href="https://www.studyinkorea.go.kr"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-cobalt-600 underline-offset-2 hover:underline"
          >
            <span className="ko-only">GKS 장학 공식 안내 ↗</span>
            <span className="en-only">Official GKS scholarship guide ↗</span>
          </a>
          <a
            href="https://mo.kaist.ac.kr"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-cobalt-600 underline-offset-2 hover:underline"
          >
            <span className="ko-only">조천식모빌리티대학원 입학 안내 ↗</span>
            <span className="en-only">Graduate school admissions ↗</span>
          </a>
        </p>
      </section>

      {faqs.length > 0 ? (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-cobalt-900">
            <span className="ko-only">자주 묻는 질문</span>
            <span className="en-only">Frequently asked questions</span>
          </h2>
          <div className="mt-6 divide-y divide-mapline rounded-xl border border-mapline bg-white">
            {faqs.map((faq) => (
              <details key={faq.id} className="group px-6 py-4">
                <summary className="cursor-pointer list-none font-medium text-cobalt-900 marker:content-none">
                  <span className="mr-2 inline-block text-cobalt-600 transition-transform group-open:rotate-90">
                    ›
                  </span>
                  <span className="ko-only">{faq.questionKo}</span>
                  <span className="en-only">{faq.questionEn}</span>
                </summary>
                <p className="mt-3 pl-5 text-sm leading-relaxed text-body/80">
                  <span className="ko-only">{faq.answerKo}</span>
                  <span className="en-only">{faq.answerEn}</span>
                </p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      {studentAwards.length > 0 ? (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-cobalt-900">
            <span className="ko-only">학생들이 이룬 것</span>
            <span className="en-only">What our students have achieved</span>
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-body/80">
            <span className="ko-only">
              학부 인턴부터 박사과정까지 — 최근 수상 소식들입니다.
            </span>
            <span className="en-only">
              From undergraduate interns to Ph.D. students — recent awards.
            </span>
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {studentAwards.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
          <Link
            href="/news"
            className="mt-6 inline-block text-sm font-medium text-cobalt-600 underline-offset-2 hover:underline"
          >
            <span className="ko-only">수상 소식 전체 보기 →</span>
            <span className="en-only">All award news →</span>
          </Link>
        </section>
      ) : null}

      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold text-cobalt-900">
          <span className="ko-only">인턴에서 대학원까지</span>
          <span className="en-only">From intern to graduate school</span>
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-body/80">
          <span className="ko-only">
            TUPA에서 학부 연구를 시작해 성장한 실제 선배들의 경로입니다.
          </span>
          <span className="en-only">
            Real paths of students who started as undergraduates at TUPA.
          </span>
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {JOURNEYS.map((journey) => (
            <article
              key={journey.name}
              className="rounded-xl border border-mapline bg-white p-6"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={journey.photo}
                  alt={journey.name}
                  width={56}
                  height={56}
                  className="h-14 w-14 shrink-0 rounded-full object-cover"
                />
                <h3 className="font-semibold text-cobalt-900">{journey.name}</h3>
              </div>
              <ol className="mt-4 space-y-2 text-sm text-body/80">
                {journey.stepsKo.map((stepKo, i) => (
                  <li key={stepKo} className="flex gap-2">
                    <span aria-hidden className="mt-0.5 text-cobalt-600">
                      {i === journey.stepsKo.length - 1 ? "★" : "↳"}
                    </span>
                    <span>
                      <span className="ko-only">{stepKo}</span>
                      <span className="en-only">{journey.stepsEn[i]}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-5 md:grid-cols-2">
        <a
          href={settings["3D 투어 링크"]}
          target="_blank"
          rel="noreferrer"
          className="group relative overflow-hidden rounded-2xl border border-mapline"
        >
          <Image
            src="/lab/simulation-lab.jpg"
            alt="TUPA simulation lab 3D tour"
            width={1200}
            height={516}
            className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-cobalt-900/80 to-transparent p-5">
            <p className="font-display text-lg font-bold text-white">
              <span className="ko-only">연구실을 3D로 미리 둘러보기 ↗</span>
              <span className="en-only">Tour our lab in 3D ↗</span>
            </p>
          </div>
        </a>
        <Link
          href="/gallery"
          className="group relative overflow-hidden rounded-2xl border border-mapline"
        >
          <Image
            src="/about/tupa-group-1.jpg"
            alt="Life at TUPA"
            width={1600}
            height={914}
            className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-cobalt-900/80 to-transparent p-5">
            <p className="font-display text-lg font-bold text-white">
              <span className="ko-only">Life at TUPA — 갤러리 보기 →</span>
              <span className="en-only">Life at TUPA — gallery →</span>
            </p>
          </div>
        </Link>
      </section>
    </main>
  );
}
