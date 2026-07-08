import type { Publication } from "@/lib/content";

const LAB_HEAD = "Inhi Kim";

/** Direct link when we have one; otherwise a Google Scholar title search. */
function paperUrl(pub: Publication): string | null {
  if (pub.url) return pub.url;
  if (pub.doi) return `https://doi.org/${pub.doi}`;
  // A Scholar title search is useless for patents — render them unlinked.
  if (pub.type === "patent") return null;
  return `https://scholar.google.com/scholar?q=${encodeURIComponent(`"${pub.title}"`)}`;
}

export default function PublicationItem({ pub }: { pub: Publication }) {
  const href = paperUrl(pub);
  const title = pub.titleKo ? (
    <>
      <span className="ko-only">{pub.titleKo}</span>
      <span className="en-only">{pub.title}</span>
    </>
  ) : (
    pub.title
  );
  return (
    <li className="border-b border-mapline py-5">
      <div>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="font-medium leading-snug text-cobalt-900 underline-offset-2 hover:text-cobalt-600 hover:underline"
          >
            {title}
            <span aria-hidden className="ml-1 text-xs text-body/50">
              ↗
            </span>
          </a>
        ) : (
          <span className="font-medium leading-snug text-cobalt-900">
            {title}
          </span>
        )}
        <p className="mt-1.5 text-sm">
          {pub.authors.map((author, i) => (
            <span key={author}>
              <span className={author === LAB_HEAD ? "font-semibold" : undefined}>
                {author}
              </span>
              {i < pub.authors.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
        <p className="mt-1.5 flex items-center gap-2 text-sm text-body/70">
          <span
            className={
              pub.type === "journal"
                ? "rounded-full bg-skytint px-2 py-0.5 text-xs font-medium text-cobalt-900"
                : "rounded-full border border-mapline px-2 py-0.5 text-xs text-body/70"
            }
          >
            <span className="ko-only">
              {pub.type === "journal"
                ? "저널"
                : pub.type === "book"
                  ? "북챕터"
                  : pub.type === "patent"
                    ? "특허"
                    : "학회"}
            </span>
            <span className="en-only">{pub.type}</span>
          </span>
          {pub.venue}
        </p>
      </div>
    </li>
  );
}
