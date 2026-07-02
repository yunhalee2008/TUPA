import Link from "next/link";

const NAV_ITEMS = [
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/people", label: "People" },
  { href: "/news", label: "News" },
  { href: "/prospective-students", label: "Prospective Students" },
  { href: "/contact", label: "Contact" },
];

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-mapline bg-paper/90 backdrop-blur">
      <div className="site-container flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-display text-xl font-extrabold tracking-tight text-cobalt-900"
        >
          TUPA
        </Link>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-body transition-colors hover:text-cobalt-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/prospective-students"
          className="rounded-full bg-cobalt-600 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-cobalt-700"
        >
          Join TUPA
        </Link>
      </div>
    </header>
  );
}
