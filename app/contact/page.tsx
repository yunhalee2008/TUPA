import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "How to reach TUPA at KAIST Cho Chun Shik Graduate School of Mobility.",
};

export default function ContactPage() {
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
            291 Daehak-ro, Yuseong-gu, Daejeon 34141, Republic of Korea
            <br />
            대전광역시 유성구 대학로 291, 한국과학기술원
          </p>
        </section>

        <section className="rounded-xl border border-mapline bg-white p-7">
          <p className="mono-label">Email</p>
          <p className="mt-3 text-sm text-body/80">
            입학·인턴 문의 (지원 트랙을 제목에 명시해 주세요)
          </p>
          <a
            className="mt-2 inline-block font-medium text-cobalt-600 underline-offset-2 hover:underline"
            href="mailto:kaist.mobility@gmail.com"
          >
            kaist.mobility@gmail.com
          </a>
          <p className="mt-4 text-sm text-body/80">기존 웹사이트</p>
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
    </main>
  );
}
