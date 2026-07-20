import type { Metadata } from "next";
import Image from "next/image";
import Copy from "@/components/Copy";
import { getPageCopy, getSiteSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const copy = await getPageCopy();
  return {
    title: copy["연락처 · 탭 제목(SEO)"].en,
    description: copy["연락처 · 검색 설명(SEO)"].en,
  };
}

export const revalidate = 3600;

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const copy = await getPageCopy();
  return (
    <main className="site-container py-14 lg:py-20">
      <h1 className="font-display text-4xl font-extrabold text-cobalt-900">
        {copy["연락처 · 페이지 제목"].en}
      </h1>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-mapline bg-white p-7">
          <p className="mono-label">{copy["연락처 · 주소 라벨"].en}</p>
          <p className="mt-3 leading-relaxed">
            <Copy t={copy["연락처 · 연구실 이름 블록"]} />
          </p>
          <p className="mt-3 text-sm text-body/80">
            {settings["주소(영문)"]}
            <br />
            {settings["주소(한글)"]}
          </p>
        </section>

        <section className="rounded-xl border border-mapline bg-white p-7">
          <p className="mono-label">{copy["연락처 · 이메일 라벨"].en}</p>
          <p className="mt-3 text-sm text-body/80">
            <Copy t={copy["연락처 · 이메일 안내"]} />
          </p>
          <a
            className="mt-2 inline-block font-medium text-cobalt-600 underline-offset-2 hover:underline"
            href={`mailto:${settings["대표 이메일"]}`}
          >
            {settings["대표 이메일"]}
          </a>
        </section>
      </div>

      <section className="mt-12">
        <p className="mono-label">{copy["연락처 · 3D 투어 라벨"].en}</p>
        <h2 className="mt-2 font-display text-2xl font-extrabold text-cobalt-900">
          <Copy t={copy["연락처 · 3D 투어 제목"]} />
        </h2>
        <p className="mt-2 text-sm text-body/80">
          <Copy t={copy["연락처 · 3D 투어 안내"]} />
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
