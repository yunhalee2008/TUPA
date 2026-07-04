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
  const news = await getNews();
  const index = news.findIndex((n) => n.id === params.id);
  const item = index >= 0 ? news[index] : undefined;
  if (!item) notFound();

  const newer = index > 0 ? news[index - 1] : undefined;
  const older = index < news.length - 1 ? news[index + 1] : undefined;
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

        <nav
          aria-label="More news"
          className="mt-12 grid gap-4 border-t border-mapline pt-6 sm:grid-cols-2"
        >
          {newer ? (
            <Link
              href={`/news/${newer.id}`}
              className="group rounded-xl border border-mapline bg-white p-4 transition-colors hover:border-cobalt-600"
            >
              <p className="text-xs text-body/60">
                <span className="ko-only">← 다음 소식</span>
                <span className="en-only">← Newer</span>
              </p>
              <p className="mt-1 text-sm font-medium leading-snug text-cobalt-900 group-hover:text-cobalt-600">
                <span className="ko-only">{newer.titleKo}</span>
                <span className="en-only">{newer.titleEn}</span>
              </p>
            </Link>
          ) : (
            <span aria-hidden />
          )}
          {older ? (
            <Link
              href={`/news/${older.id}`}
              className="group rounded-xl border border-mapline bg-white p-4 text-right transition-colors hover:border-cobalt-600"
            >
              <p className="text-xs text-body/60">
                <span className="ko-only">이전 소식 →</span>
                <span className="en-only">Older →</span>
              </p>
              <p className="mt-1 text-sm font-medium leading-snug text-cobalt-900 group-hover:text-cobalt-600">
                <span className="ko-only">{older.titleKo}</span>
                <span className="en-only">{older.titleEn}</span>
              </p>
            </Link>
          ) : null}
        </nav>
      </article>
    </main>
  );
}
