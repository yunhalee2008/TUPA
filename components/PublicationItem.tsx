import type { Publication } from "@/lib/content";

const LAB_HEAD = "Inhi Kim";

export default function PublicationItem({ pub }: { pub: Publication }) {
  return (
    <li className="grid gap-2 border-b border-mapline py-5 sm:grid-cols-[64px_1fr] sm:gap-6">
      <span className="font-mono text-sm text-body/60">{pub.year}</span>
      <div>
        <p className="font-medium leading-snug text-cobalt-900">{pub.title}</p>
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
            {pub.type}
          </span>
          {pub.venue}
        </p>
      </div>
    </li>
  );
}
