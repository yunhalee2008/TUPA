import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORY_LABEL } from "@/components/NewsCard";
import { getNews, getNewsItem } from "@/lib/content";

/** Rough language detection for single-language article bodies. */
function bodyLanguage(body: string[]): "ko" | "en" {
  const text = body.join(" ");
  const hangul = (text.match(/[가-힣]/g) ?? []).length;
  return hangul > text.length * 0.05 ? "ko" : "en";
}

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  const news = await getNews();
  return news.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getNewsItem(params.id);
  if (!item) return {};
  return {
    title: item.titleEn,
    description: item.summaryEn,
  };
}

export const revalidate = 3600;

export default async function NewsDetailPage({ params }: Props) {
  const item = await getNewsItem(params.id);
  if (!item) notFound();

  const [cover, ...rest] = item.images ?? [];

  return (
    <main className="site-container py-14 lg:py-20">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/news"
          className="text-sm text-cobalt-600 underline-offset-2 hover:underline"
        >
          ← News
        </Link>
        <div className="mt-6 flex items-center gap-3">
          <span className="font-mono text-sm text-body/60">{item.date}</span>
          <span className="rounded-full border border-mapline px-2 py-0.5 text-xs text-body/70">
            <span className="ko-only">{CATEGORY_LABEL[item.category].ko}</span>
            <span className="en-only">{CATEGORY_LABEL[item.category].en}</span>
          </span>
        </div>
        <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight text-cobalt-900 sm:text-4xl">
          <span className="ko-only">{item.titleKo}</span>
          <span className="en-only">{item.titleEn}</span>
        </h1>
        {item.titleKo !== item.titleEn ? (
          <p className="mt-2 text-lg text-body/70">
            <span className="ko-only">{item.titleEn}</span>
            <span className="en-only">{item.titleKo}</span>
          </p>
        ) : null}

        {cover ? (
          <Image
            src={cover}
            alt=""
            width={900}
            height={600}
            priority
            className="mt-8 w-full rounded-xl border border-mapline object-cover"
          />
        ) : null}

        <p className="mt-8 font-medium text-cobalt-900">
          <span className="ko-only">{item.summaryKo}</span>
          <span className="en-only">{item.summaryEn}</span>
        </p>

        {item.body && item.body.length > 0 ? (
          <>
            {bodyLanguage(item.body) === "en" ? (
              <p className="ko-only mt-6 text-sm text-body/50">
                아래 본문은 영문 원문으로 제공됩니다.
              </p>
            ) : (
              <p className="en-only mt-6 text-sm text-body/50">
                The article below is provided in its original Korean.
              </p>
            )}
            <div className="mt-4 space-y-4 leading-relaxed text-body/90">
              {item.body.map((paragraph) => (
                <p key={paragraph.slice(0, 60)}>{paragraph}</p>
              ))}
            </div>
          </>
        ) : null}

        {rest.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {rest.map((src) => (
              <Image
                key={src}
                src={src}
                alt=""
                width={640}
                height={480}
                className="w-full rounded-xl border border-mapline object-cover"
              />
            ))}
          </div>
        ) : null}
      </article>
    </main>
  );
}
