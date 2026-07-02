import type { Metadata } from "next";
import PublicationItem from "@/components/PublicationItem";
import { getPublications } from "@/lib/content";

export const metadata: Metadata = {
  title: "Publications",
  description: "Journal and conference publications from TUPA, KAIST.",
};

export default async function PublicationsPage() {
  const publications = await getPublications();
  const years = Array.from(new Set(publications.map((p) => p.year))).sort(
    (a, b) => b - a,
  );

  return (
    <main className="site-container py-14 lg:py-20">
      <h1 className="font-display text-4xl font-extrabold text-cobalt-900">
        Publications
      </h1>
      <p className="mt-3 max-w-2xl">
        저널·국제학회 논문 목록입니다. 랩 구성원의 전체 목록은 Google Scholar에서
        확인할 수 있습니다.
      </p>

      {years.map((year) => (
        <section key={year} className="mt-12 gap-10 lg:grid lg:grid-cols-12">
          <p className="mono-label lg:col-span-3">{year}</p>
          <ul className="mt-4 max-w-[72ch] lg:col-span-9 lg:mt-0">
            {publications
              .filter((p) => p.year === year)
              .map((pub) => (
                <PublicationItem key={pub.id} pub={pub} />
              ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
