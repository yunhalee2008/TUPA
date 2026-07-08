import type { Metadata } from "next";
import PublicationExplorer from "@/components/PublicationExplorer";
import { getPublications } from "@/lib/content";

export const metadata: Metadata = {
  title: "Publications",
  description: "Journal and conference publications from TUPA, KAIST.",
};

export const revalidate = 3600;

export default async function PublicationsPage() {
  const publications = await getPublications();

  return (
    <main className="site-container py-14 lg:py-20">
      <h1 className="font-display text-4xl font-extrabold text-cobalt-900">
        Publications
      </h1>
      <p className="mt-3 max-w-2xl">
        <span className="ko-only">
          저널 논문, 특허, 국제학회 논문, 북챕터 목록입니다. 인용 지표는
        </span>
        <span className="en-only">
          Peer-reviewed journal papers, patents, international conference
          papers, and book chapters. For citation metrics, see
        </span>{" "}
        <a
          href="https://scholar.google.com/citations?user=Cz_9jloAAAAJ&hl=en"
          target="_blank"
          rel="noreferrer"
          className="text-cobalt-600 underline-offset-2 hover:underline"
        >
          Google Scholar
        </a>
        <span className="ko-only">와</span>
        <span className="en-only"> and</span>{" "}
        <a
          href="https://www.scopus.com/authid/detail.uri?authorId=55454217700"
          target="_blank"
          rel="noreferrer"
          className="text-cobalt-600 underline-offset-2 hover:underline"
        >
          Scopus
        </a>
        <span className="ko-only">에서 확인할 수 있습니다.</span>
        <span className="en-only">.</span>
      </p>

      <div className="mt-10">
        <PublicationExplorer publications={publications} />
      </div>
    </main>
  );
}
