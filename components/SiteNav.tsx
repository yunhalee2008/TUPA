"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LangToggle from "@/components/LangToggle";

const NAV_ITEMS = [
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/people", label: "People" },
  { href: "/news", label: "News" },
  { href: "/gallery", label: "Gallery" },
  { href: "/prospective-students", label: "Prospective Students" },
  { href: "/contact", label: "Contact" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-mapline bg-paper/90 backdrop-blur">
      <div className="site-container flex h-16 items-center justify-between gap-6">
        <Link href="/" onClick={() => setOpen(false)} className="shrink-0">
          <Image
            src="/brand/tupa-logo.svg"
            alt="TUPA"
            width={110}
            height={35}
            priority
            unoptimized
          />
        </Link>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`text-sm transition-colors hover:text-cobalt-600 ${
                isActive(item.href)
                  ? "font-semibold text-cobalt-900"
                  : "text-body"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LangToggle />
          <Link
            href="/prospective-students"
            onClick={() => setOpen(false)}
            className="rounded-full bg-cobalt-600 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-cobalt-700"
          >
            Join TUPA
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md text-cobalt-900 md:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <>
                  <line x1="4" y1="4" x2="16" y2="16" />
                  <line x1="16" y1="4" x2="4" y2="16" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="17" y2="6" />
                  <line x1="3" y1="10" x2="17" y2="10" />
                  <line x1="3" y1="14" x2="17" y2="14" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-mapline md:hidden"
        >
          <ul className="site-container space-y-1 py-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block rounded-md px-2 py-2.5 text-base transition-colors hover:bg-skytint ${
                    isActive(item.href)
                      ? "font-semibold text-cobalt-900"
                      : "text-body"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
