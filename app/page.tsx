import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import HeroVideo from "@/components/HeroVideo";
import NewsCard from "@/components/NewsCard";
import ResearchAreaCard from "@/components/ResearchAreaCard";
import SectionHeading from "@/components/SectionHeading";
import { getRecentNews, getResearchAreas } from "@/lib/content";

export default async function HomePage() {
  const [areas, news] = await Promise.all([getResearchAreas(), getRecentNews(3)]);

  return (
    <main>
      {/* Hero: the video IS the wordmark (TUPA letter buildings), so copy sits below it */}
      <section aria-labelledby="hero-heading">
        <HeroVideo />
        <div className="site-container py-12 lg:py-16">
          <div className="max-w-3xl">
            <p className="mono-label">
              KAIST · Cho Chun Shik Graduate School of Mobility
            </p>
            <h1
              id="hero-heading"
              className="mt-3 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-cobalt-900 sm:text-5xl"
            >
              Transport and Urban Planning Arena
            </h1>
            <p className="mt-4 text-lg">
              교통·모빌리티 AI와 스마트시티 연구로 도시의 이동 문제를 해결합니다.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/prospective-students" className="btn-primary">
                지원 안내
              </Link>
              <Link href="/research" className="btn-outline">
                Research
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FadeIn>
        <section
          aria-label="Research areas"
          className="site-container gap-10 py-16 lg:grid lg:grid-cols-12 lg:py-24"
        >
          <SectionHeading index="01" titleEn="Research" titleKo="연구 분야" />
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
          <SectionHeading index="02" titleEn="News" titleKo="소식" />
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
              모든 소식 보기 →
            </Link>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section aria-label="Join TUPA" className="site-container py-16 lg:py-24">
          <div className="rounded-2xl bg-cobalt-900 px-8 py-12 text-white lg:px-14 lg:py-16">
            <p className="mono-label !text-white/60">Join TUPA</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold">
              도시의 이동을 함께 설계할 사람을 찾습니다
            </h2>
            <p className="mt-3 max-w-2xl text-white/80">
              박사(GKS 전액 장학)·석사·학부 인턴 포지션이 열려 있습니다. We
              welcome students from Korea and abroad.
            </p>
            <Link
              href="/prospective-students"
              className="mt-7 inline-flex items-center rounded-lg bg-safety px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              모집 공고 보기
            </Link>
          </div>
        </section>
      </FadeIn>
    </main>
  );
}
