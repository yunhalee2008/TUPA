import Link from "next/link";
import Copy from "@/components/Copy";
import FadeIn from "@/components/FadeIn";
import PhotoSlider from "@/components/PhotoSlider";
import HeroVideo from "@/components/HeroVideo";
import NewsCard from "@/components/NewsCard";
import ResearchAreaCard from "@/components/ResearchAreaCard";
import SectionHeading from "@/components/SectionHeading";
import {
  getMembers,
  getNews,
  getPageCopy,
  getPublications,
  getRecentNews,
  getResearchAreas,
} from "@/lib/content";

export const revalidate = 3600;

export default async function HomePage() {
  const [areas, news, publications, members, allNews, copy] =
    await Promise.all([
      getResearchAreas(),
      getRecentNews(3),
      getPublications(),
      getMembers(),
      getNews(),
      getPageCopy(),
    ]);
  const stats = {
    papers: publications.length,
    alumniFaculty: members.filter(
      (m) => m.role === "alumni" && /professor|lecturer/i.test(m.placement ?? ""),
    ).length,
    awards: allNews.filter((n) => n.category === "award").length,
  };

  return (
    <main>
      {/* Hero: the video IS the wordmark (TUPA letter buildings), so copy sits below it */}
      <section aria-labelledby="hero-heading">
        <HeroVideo />
        <div className="site-container py-12 lg:py-16">
          <p className="mono-label">
            <Copy t={copy["홈 · 히어로 어깨문구"]} />
          </p>
          <h1
            id="hero-heading"
            className="mt-3 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-cobalt-900 sm:text-5xl lg:whitespace-nowrap"
          >
            <Copy t={copy["홈 · 히어로 연구실명"]} />
          </h1>
          <p className="mt-4 max-w-2xl text-lg">
            <Copy t={copy["홈 · 히어로 문구"]} />
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/prospective-students" className="btn-primary">
              <Copy t={copy["홈 · 히어로 버튼(지원 안내)"]} />
            </Link>
            <Link href="/research" className="btn-outline">
              <Copy t={copy["홈 · 히어로 버튼(연구)"]} />
            </Link>
          </div>
        </div>
      </section>

      <FadeIn>
        <section
          aria-label="About TUPA"
          className="site-container gap-10 py-16 lg:grid lg:grid-cols-12 lg:py-24"
        >
          <SectionHeading
            index="01"
            titleEn={copy["홈 · 섹션 제목(소개)"].en}
            titleKo={copy["홈 · 섹션 제목(소개)"].ko}
          />
          <div className="lg:col-span-9">
            <div className="mt-8 max-w-[68ch] space-y-4 lg:mt-0">
              <p className="font-display text-lg font-bold text-cobalt-900">
                <Copy t={copy["홈 · 소개 환영 문구"]} />
              </p>
              <p>
                <Copy t={copy["홈 · 소개 1문단"]} />
              </p>
              <p>
                <Copy t={copy["홈 · 소개 2문단"]} />
              </p>
              <p>
                <Copy t={copy["홈 · 소개 3문단"]} />
              </p>
              <p>
                <Copy t={copy["홈 · 소개 4문단"]} />
              </p>
            </div>
            <div className="mt-8">
              <PhotoSlider
                photos={[
                  {
                    src: "/about/tupa-group-1.jpg",
                    alt: "TUPA members group photo, 2026",
                  },
                  {
                    src: "/about/tupa-group-2.jpg",
                    alt: "TUPA members group photo at KAIST, 2026",
                  },
                ]}
              />
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section
          aria-label="Research areas"
          className="site-container gap-10 py-16 lg:grid lg:grid-cols-12 lg:py-24"
        >
          <SectionHeading
            index="02"
            titleEn={copy["홈 · 섹션 제목(연구 분야)"].en}
            titleKo={copy["홈 · 섹션 제목(연구 분야)"].ko}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:col-span-9 lg:mt-0 xl:grid-cols-3">
            {areas.map((area) => (
              <ResearchAreaCard key={area.slug} area={area} />
            ))}
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section
          aria-label="Latest news"
          className="site-container gap-10 py-16 lg:grid lg:grid-cols-12 lg:py-24"
        >
          <SectionHeading
            index="03"
            titleEn={copy["홈 · 섹션 제목(소식)"].en}
            titleKo={copy["홈 · 섹션 제목(소식)"].ko}
          />
          <div className="lg:col-span-9">
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 lg:mt-0">
              {news.map((item) => (
                <NewsCard key={item.id} item={item} />
              ))}
            </div>
            <Link
              href="/news"
              className="mt-6 inline-block text-sm font-medium text-cobalt-600 underline-offset-2 hover:underline"
            >
              <Copy t={copy["홈 · 모든 소식 보기 링크"]} />
            </Link>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section aria-label="Join TUPA" className="site-container py-16 lg:py-24">
          <div className="rounded-2xl bg-cobalt-900 px-8 py-12 text-white lg:px-14 lg:py-16">
            <p className="mono-label !text-white/60">
              <Copy t={copy["홈 · 모집 어깨문구"]} />
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold">
              <Copy t={copy["홈 · 모집 제목"]} />
            </h2>
            <p className="mt-3 max-w-2xl text-white/80">
              <Copy t={copy["홈 · 모집 문단"]} />
            </p>
            <dl className="mt-8 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/15 pt-6">
              <div>
                <dt className="text-xs uppercase tracking-wide text-white/60">
                  <Copy t={copy["홈 · 모집 지표(논문·특허)"]} />
                </dt>
                <dd className="mt-1 font-display text-3xl font-extrabold">
                  {stats.papers}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-white/60">
                  <Copy t={copy["홈 · 모집 지표(교수 임용 졸업생)"]} />
                </dt>
                <dd className="mt-1 font-display text-3xl font-extrabold">
                  {stats.alumniFaculty}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-white/60">
                  <Copy t={copy["홈 · 모집 지표(수상 소식)"]} />
                </dt>
                <dd className="mt-1 font-display text-3xl font-extrabold">
                  {stats.awards}+
                </dd>
              </div>
            </dl>
            <Link
              href="/prospective-students"
              className="mt-7 inline-flex items-center rounded-lg bg-safety px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Copy t={copy["홈 · 모집 버튼"]} />
            </Link>
          </div>
        </section>
      </FadeIn>
    </main>
  );
}
