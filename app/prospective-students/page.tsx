import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Copy from "@/components/Copy";
import NewsCard from "@/components/NewsCard";
import OpeningCard from "@/components/OpeningCard";
import {
  getFaqs,
  getJourneys,
  getNews,
  getOpenings,
  getPageCopy,
  getSiteSettings,
} from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const copy = await getPageCopy();
  return {
    title: copy["입학안내 · 탭 제목(SEO)"].en,
    description: copy["입학안내 · 검색 설명(SEO)"].en,
  };
}

export const revalidate = 3600;

export default async function ProspectiveStudentsPage() {
  const [openings, faqs, news, settings, copy, journeys] = await Promise.all([
    getOpenings(),
    getFaqs(),
    getNews(),
    getSiteSettings(),
    getPageCopy(),
    getJourneys(),
  ]);
  const studentAwards = news
    .filter((item) => item.category === "award")
    .slice(0, 6);

  return (
    <main className="site-container py-14 lg:py-20">
      <h1 className="font-display text-4xl font-extrabold text-cobalt-900">
        {copy["입학안내 · 페이지 제목"].en}
      </h1>
      <p className="mt-3 max-w-2xl">
        <Copy t={copy["입학안내 · 소개"]} />
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {openings.map((opening) => (
          <OpeningCard key={opening.id} opening={opening} />
        ))}
      </div>

      <section className="mt-16 rounded-2xl bg-skytint px-8 py-10">
        <h2 className="font-display text-xl font-bold text-cobalt-900">
          <Copy t={copy["입학안내 · 지원 절차 제목"]} />
        </h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-body/90">
          <li>
            <Copy t={copy["입학안내 · 지원 절차 1단계"]} />
          </li>
          <li>
            <Copy t={copy["입학안내 · 지원 절차 2단계"]} />
          </li>
          <li>
            <Copy t={copy["입학안내 · 지원 절차 3단계"]} />
          </li>
        </ol>
        <p className="mt-5 flex flex-wrap gap-4 border-t border-cobalt-900/10 pt-4 text-sm">
          <a
            href="https://www.studyinkorea.go.kr"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-cobalt-600 underline-offset-2 hover:underline"
          >
            <Copy t={copy["입학안내 · GKS 안내 링크"]} />
          </a>
          <a
            href="https://mo.kaist.ac.kr"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-cobalt-600 underline-offset-2 hover:underline"
          >
            <Copy t={copy["입학안내 · 대학원 입학 링크"]} />
          </a>
        </p>
      </section>

      {faqs.length > 0 ? (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-cobalt-900">
            <Copy t={copy["입학안내 · FAQ 제목"]} />
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
            <Copy t={copy["입학안내 · 수상 섹션 제목"]} />
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-body/80">
            <Copy t={copy["입학안내 · 수상 섹션 설명"]} />
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
            <Copy t={copy["입학안내 · 수상 전체 보기 링크"]} />
          </Link>
        </section>
      ) : null}

      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold text-cobalt-900">
          <Copy t={copy["입학안내 · 성장스토리 제목"]} />
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-body/80">
          <Copy t={copy["입학안내 · 성장스토리 설명"]} />
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {journeys.map((journey) => (
            <article
              key={journey.name}
              className="rounded-xl border border-mapline bg-white p-6"
            >
              <div className="flex items-center gap-3">
                {journey.photo ? (
                  <Image
                    src={journey.photo}
                    alt={journey.name}
                    width={56}
                    height={56}
                    className="h-14 w-14 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-skytint font-display font-bold text-cobalt-600">
                    {journey.name.charAt(0)}
                  </span>
                )}
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
                      <span className="en-only">
                        {journey.stepsEn[i] ?? stepKo}
                      </span>
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
              <Copy t={copy["입학안내 · 3D 투어 카드"]} />
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
              <Copy t={copy["입학안내 · 갤러리 카드"]} />
            </p>
          </div>
        </Link>
      </section>
    </main>
  );
}
