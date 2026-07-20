"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ResearchProject } from "@/lib/content";

/** Research topic rows that open an in-page detail dialog when clicked. */
export default function ResearchTopicList({
  projects,
}: {
  projects: ResearchProject[];
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const open = projects.find((p) => p.id === openId);
  const close = useCallback(() => setOpenId(null), []);

  // Keyboard controls + focus trap, mirroring GalleryLightbox: focus moves
  // into the dialog on open, Tab cycles within it, and focus returns to the
  // trigger row on close.
  useEffect(() => {
    if (!openId) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    dialogRef.current
      ?.querySelector<HTMLButtonElement>('button[aria-label="Close"]')
      ?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>("button, a[href]"),
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (
          e.shiftKey &&
          (active === first || !dialogRef.current.contains(active))
        ) {
          e.preventDefault();
          last.focus();
        } else if (
          !e.shiftKey &&
          (active === last || !dialogRef.current.contains(active))
        ) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      restoreFocusRef.current?.focus();
    };
  }, [openId, close]);

  return (
    <>
      <ul className="mt-8 lg:col-span-9 lg:mt-0">
        {projects.map((project) => (
          <li key={project.id} className="border-b border-mapline">
            <button
              type="button"
              onClick={() => setOpenId(project.id)}
              aria-haspopup="dialog"
              className="group grid w-full gap-4 py-5 text-left sm:grid-cols-[160px_1fr] sm:gap-6"
            >
              {project.imageUrl ? (
                <Image
                  src={project.imageUrl}
                  alt=""
                  width={320}
                  height={214}
                  className="aspect-[3/2] w-full rounded-lg border border-mapline object-cover sm:w-40"
                />
              ) : (
                <div className="aspect-[3/2] w-full rounded-lg border border-mapline bg-skytint sm:w-40" />
              )}
              <div>
                <h3 className="font-semibold leading-snug text-cobalt-900 group-hover:underline group-hover:decoration-cobalt-600/40 group-hover:underline-offset-4">
                  {project.title}
                </h3>
                {project.summary ? (
                  <p className="mt-1.5 text-sm text-body/80">
                    {project.summary}
                  </p>
                ) : null}
                <p className="mt-2.5 text-sm font-medium text-cobalt-600">
                  <span className="ko-only">자세히 보기</span>
                  <span className="en-only">View details</span>
                  <span aria-hidden> →</span>
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {open ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-cobalt-900/60 p-4 sm:p-6"
          onClick={close}
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-mapline bg-white p-6 shadow-xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-6">
              <h3 className="font-display text-xl font-bold leading-snug text-cobalt-900 sm:text-2xl">
                {open.title}
              </h3>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-mapline text-cobalt-900 transition-colors hover:bg-skytint"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <path d="M4 4l10 10M14 4L4 14" />
                </svg>
              </button>
            </div>

            {(open.detail?.paragraphs ?? [open.summary]).map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="mt-4 text-sm leading-relaxed text-body/90"
              >
                {paragraph}
              </p>
            ))}

            {open.detail?.images?.map((image) => (
              <figure key={image.src} className="mt-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.caption ?? ""}
                  className="w-full rounded-lg border border-mapline"
                />
                {image.caption ? (
                  <figcaption className="mt-1.5 text-xs text-body/60">
                    {image.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}

            {open.detail?.sections?.map((section) => (
              <section key={section.heading} className="mt-6">
                <h4 className="font-semibold text-cobalt-900">
                  {section.heading}
                </h4>
                {section.body ? (
                  <p className="mt-1.5 text-sm leading-relaxed text-body/90">
                    {section.body}
                  </p>
                ) : null}
                {section.bullets ? (
                  <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm leading-relaxed text-body/90">
                    {section.bullets.map((bullet) => (
                      <li key={bullet.slice(0, 40)}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            {open.detail?.links?.length ? (
              <div className="mt-7 flex flex-wrap gap-2 border-t border-mapline pt-5">
                {open.detail.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-mapline px-3.5 py-1.5 text-xs font-medium text-cobalt-900 transition-colors hover:bg-skytint"
                  >
                    {link.label}
                    <span aria-hidden> ↗</span>
                  </a>
                ))}
              </div>
            ) : null}
          </motion.div>
        </div>
      ) : null}
    </>
  );
}
