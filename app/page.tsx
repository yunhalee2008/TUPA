import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import PhotoSlider from "@/components/PhotoSlider";
import HeroVideo from "@/components/HeroVideo";
import NewsCard from "@/components/NewsCard";
import ResearchAreaCard from "@/components/ResearchAreaCard";
import SectionHeading from "@/components/SectionHeading";
import { getRecentNews, getResearchAreas, getSiteSettings } from "@/lib/content";

export const revalidate = 3600;

export default async function HomePage() {
  const [areas, news, settings] = await Promise.all([
    getResearchAreas(),
    getRecentNews(3),
    getSiteSettings(),
  ]);

  return (
    <main>
      {/* Hero: the video IS the wordmark (TUPA letter buildings), so copy sits below it */}
      <section aria-labelledby="hero-heading">
        <HeroVideo />
        <div className="site-container py-12 lg:py-16">
          <p className="mono-label">
            KAIST · Cho Chun Shik Graduate School of Mobility
          </p>
          <h1
            id="hero-heading"
            className="mt-3 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-cobalt-900 sm:text-5xl lg:whitespace-nowrap"
          >
            Transport and Urban Planning Arena
          </h1>
          <p className="mt-4 max-w-2xl text-lg">
            <span className="ko-only">{settings["히어로 문구(한글)"]}</span>
            <span className="en-only">{settings["히어로 문구(영문)"]}</span>
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/prospective-students" className="btn-primary">
              <span className="ko-only">지원 안내</span>
              <span className="en-only">Join TUPA</span>
            </Link>
            <Link href="/research" className="btn-outline">
              Research
            </Link>
          </div>
        </div>
      </section>

      <FadeIn>
        <section
          aria-label="About TUPA"
          className="site-container gap-10 py-16 lg:grid lg:grid-cols-12 lg:py-24"
        >
          <SectionHeading index="01" titleEn="About" titleKo="소개" />
          <div className="lg:col-span-9">
            <div className="mt-8 max-w-[68ch] space-y-4 lg:mt-0">
              <p>
                <span className="ko-only">
                  TUPA는 KAIST 조천식모빌리티대학원 소속 연구실로, 도시와 교통
                  문제에 대한 해법을 찾아 일상의 이동을 개선하는 것을 목표로
                  합니다. KAIST 스핀아웃{" "}
                </span>
                <span className="en-only">
                  TUPA is a research lab at the Cho Chun Shik Graduate School of
                  Mobility, KAIST, dedicated to improving daily life by solving
                  urban and traffic problems. With the KAIST spinout{" "}
                </span>
                <a
                  href="https://dochak.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cobalt-600 underline-offset-2 hover:underline"
                >
                  dochak
                </a>
                <span className="ko-only">
                  과 함께 시뮬레이션·디지털 트윈·드라이빙
                  시뮬레이터·텔레드라이빙으로 이루어진 가상 세계를 탐구합니다.
                </span>
                <span className="en-only">
                  , we explore a virtual world of cutting-edge simulation,
                  digital twins, driving simulators, and teledriving.
                </span>
              </p>
              <p>
                <span className="ko-only">
                  KAIST-NYU 공동연구그룹의 Mobility AI 분과를 이끌며 NYU
                  C2SMARTER와 전략적으로 협력하고, SEU-Monash 공동연구소,
                  Monash 대학 교통연구소(ITS)와도 지속적으로 공동연구를
                  진행합니다 — KAIST, NYU(겸임교수), Monash, PTV Group을 거친
                  김인희 교수의 글로벌 네트워크 위에서 연구합니다.
                </span>
                <span className="en-only">
                  As chair of Mobility AI at the KAIST-NYU Joint Research Group,
                  we work strategically with C2SMARTER at NYU, and continue to
                  collaborate with the SEU-Monash Joint Research Institute and
                  the Institute of Transport Studies at Monash University — a
                  global network built on Prof. Kim&apos;s career across KAIST,
                  NYU (Adjunct Professor), Monash, and the PTV Group.
                </span>
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
          <SectionHeading index="02" titleEn="Research" titleKo="연구 분야" />
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
          <SectionHeading index="03" titleEn="News" titleKo="소식" />
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
              <span className="ko-only">모든 소식 보기 →</span>
              <span className="en-only">All news →</span>
            </Link>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section aria-label="Join TUPA" className="site-container py-16 lg:py-24">
          <div className="rounded-2xl bg-cobalt-900 px-8 py-12 text-white lg:px-14 lg:py-16">
            <p className="mono-label !text-white/60">Join TUPA</p>
            <h2 className="mt-3 font-display text-3xl font-extrabold">
              <span className="ko-only">
                도시의 이동을 함께 설계할 사람을 찾습니다
              </span>
              <span className="en-only">
                We are looking for people to design urban mobility with us
              </span>
            </h2>
            <p className="mt-3 max-w-2xl text-white/80">
              <span className="ko-only">
                박사(GKS 전액 장학)·석사·학부 인턴 포지션이 열려 있습니다. We
                welcome students from Korea and abroad.
              </span>
              <span className="en-only">
                Fully funded Ph.D. (GKS), master&apos;s, and undergraduate intern
                positions are open. We welcome students from Korea and abroad.
              </span>
            </p>
            <Link
              href="/prospective-students"
              className="mt-7 inline-flex items-center rounded-lg bg-safety px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <span className="ko-only">모집 공고 보기</span>
              <span className="en-only">See open positions</span>
            </Link>
          </div>
        </section>
      </FadeIn>
    </main>
  );
}
