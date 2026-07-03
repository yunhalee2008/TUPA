import type { Metadata } from "next";
import Image from "next/image";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "How to reach TUPA at KAIST Cho Chun Shik Graduate School of Mobility.",
};

export const revalidate = 3600;

export default async function ContactPage() {
  const settings = await getSiteSettings();
  return (
    <main className="site-container py-14 lg:py-20">
      <h1 className="font-display text-4xl font-extrabold text-cobalt-900">Contact</h1>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-mapline bg-white p-7">
          <p className="mono-label">Address</p>
          <p className="mt-3 leading-relaxed">
            TUPA — Transport and Urban Planning Arena
            <br />
            Cho Chun Shik Graduate School of Mobility, KAIST
          </p>
          <p className="mt-3 text-sm text-body/80">
            {settings["주소(영문)"]}
            <br />
            {settings["주소(한글)"]}
          </p>
        </section>

        <section className="rounded-xl border border-mapline bg-white p-7">
          <p className="mono-label">Email</p>
          <p className="mt-3 text-sm text-body/80">
            <span className="ko-only">
              입학·인턴 문의 (지원 트랙을 제목에 명시해 주세요)
            </span>
            <span className="en-only">
              Admissions &amp; internship inquiries (state your track in the
              subject line)
            </span>
          </p>
          <a
            className="mt-2 inline-block font-medium text-cobalt-600 underline-offset-2 hover:underline"
            href={`mailto:${settings["대표 이메일"]}`}
          >
            {settings["대표 이메일"]}
          </a>
          <p className="mt-4 text-sm text-body/80">
            <span className="ko-only">기존 웹사이트</span>
            <span className="en-only">Legacy website</span>
          </p>
          <a
            className="mt-1 inline-block font-medium text-cobalt-600 underline-offset-2 hover:underline"
            href="https://inhi.kim"
            target="_blank"
            rel="noreferrer"
          >
            inhi.kim
          </a>
        </section>
      </div>

      <section className="mt-12">
        <p className="mono-label">Simulation Lab</p>
        <h2 className="mt-2 font-display text-2xl font-extrabold text-cobalt-900">
          <span className="ko-only">연구실을 3D로 둘러보세요</span>
          <span className="en-only">See our lab in 3D</span>
        </h2>
        <p className="mt-2 text-sm text-body/80">
          <span className="ko-only">
            사진을 클릭하면 Matterport 3D 투어가 열립니다.
          </span>
          <span className="en-only">
            Click the photo to open the Matterport 3D tour.
          </span>
        </p>
        <a
          href={settings["3D 투어 링크"]}
          target="_blank"
          rel="noreferrer"
          className="group mt-5 block overflow-hidden rounded-xl border border-mapline"
        >
          <Image
            src="/lab/simulation-lab.jpg"
            alt="TUPA simulation lab — click to open the 3D tour"
            width={1200}
            height={516}
            className="w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </a>
      </section>
    </main>
  );
}
