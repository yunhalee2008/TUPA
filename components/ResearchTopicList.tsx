"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type {
  ResearchProject,
  ResearchTopicImage,
  ResearchTopicMedia,
} from "@/lib/content";

/** The three companion-media formats a paper can ship with. */
type MediaTab = "audio" | "video" | "infographic";

const MEDIA_LABEL: Record<MediaTab, { ko: string; en: string }> = {
  audio: { ko: "듣기", en: "Listen" },
  video: { ko: "보기", en: "Watch" },
  infographic: { ko: "살펴보기", en: "Explore" },
};

function mediaTabs(media?: ResearchTopicMedia): MediaTab[] {
  if (!media) return [];
  const tabs: MediaTab[] = [];
  if (media.audio) tabs.push("audio");
  if (media.videos?.length) tabs.push("video");
  if (media.infographic) tabs.push("infographic");
  return tabs;
}

function MediaIcon({ tab }: { tab: MediaTab }) {
  const props = {
    width: 13,
    height: 13,
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (tab === "audio") {
    return (
      <svg {...props}>
        <path d="M2 6.5v3M5.5 3.5v9M9 1.5v13M12.5 5v6M15.5 7v2" />
      </svg>
    );
  }
  if (tab === "video") {
    return (
      <svg {...props}>
        <path d="M4 2.6l9 5.4-9 5.4z" />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <path d="M2 14h12M4 14V9M8 14V3M12 14v-8" />
    </svg>
  );
}

/**
 * "Listen · Watch · Explore" row shown under a topic that has companion media.
 * Each button opens the topic dialog straight onto that format.
 */
function MediaStrip({
  media,
  onOpen,
}: {
  media: ResearchTopicMedia;
  onOpen: (tab: MediaTab) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <span className="mono-label">
        <span className="ko-only">멀티미디어</span>
        <span className="en-only">Multimedia</span>
      </span>
      <div className="flex flex-wrap items-center gap-1.5">
        {mediaTabs(media).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onOpen(tab)}
            aria-haspopup="dialog"
            className="inline-flex items-center gap-1.5 rounded-full border border-mapline bg-white px-3 py-1 text-xs font-medium text-cobalt-900 transition-colors hover:border-cobalt-600 hover:bg-skytint"
          >
            <MediaIcon tab={tab} />
            <span className="ko-only">{MEDIA_LABEL[tab].ko}</span>
            <span className="en-only">{MEDIA_LABEL[tab].en}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/** Player area inside the dialog: one tab per available media format. */
function MediaPanel({
  media,
  initialTab,
  title,
}: {
  media: ResearchTopicMedia;
  initialTab: MediaTab;
  title: string;
}) {
  const tabs = mediaTabs(media);
  const [tab, setTab] = useState<MediaTab>(initialTab);
  const [clip, setClip] = useState(0);
  const video = media.videos?.[Math.min(clip, (media.videos?.length ?? 1) - 1)];
  // Only the machine-generated companions carry the caveat — clips the authors
  // made themselves are shown without it.
  const aiGenerated =
    tab === "audio"
      ? media.audio?.aiGenerated
      : tab === "video"
        ? video?.aiGenerated
        : media.infographic?.aiGenerated;

  return (
    <section className="mt-6 rounded-xl border border-mapline bg-paper p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-1.5">
        {tabs.map((t) => {
          const active = t === tab;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              aria-pressed={active}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                active
                  ? "border-cobalt-600 bg-cobalt-600 text-white"
                  : "border-mapline bg-white text-cobalt-900 hover:border-cobalt-600"
              }`}
            >
              <MediaIcon tab={t} />
              <span className="ko-only">{MEDIA_LABEL[t].ko}</span>
              <span className="en-only">{MEDIA_LABEL[t].en}</span>
            </button>
          );
        })}
      </div>

      {tab === "audio" && media.audio ? (
        <div className="mt-4">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <audio
            controls
            preload="none"
            src={media.audio.src}
            className="w-full"
            aria-label={`Audio summary — ${title}`}
          />
          {media.audio.durationLabel ? (
            <p className="mt-2 font-mono text-xs text-body/60">
              {media.audio.durationLabel}
            </p>
          ) : null}
        </div>
      ) : null}

      {tab === "video" && video ? (
        <div className="mt-4">
          {(media.videos?.length ?? 0) > 1 ? (
            <div className="mb-3 flex flex-wrap gap-1.5">
              {media.videos?.map((v, i) => (
                <button
                  key={v.src ?? v.youtubeId}
                  type="button"
                  onClick={() => setClip(i)}
                  aria-pressed={i === clip}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                    i === clip
                      ? "border-cobalt-600 text-cobalt-600"
                      : "border-mapline text-body/70 hover:border-cobalt-600"
                  }`}
                >
                  {v.label}
                  {v.durationLabel ? (
                    <span className="ml-1.5 font-mono text-[10px] text-body/50">
                      {v.durationLabel}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          ) : null}
          {video.youtubeId ? (
            <div className="aspect-video w-full overflow-hidden rounded-lg border border-mapline bg-black">
              <iframe
                key={video.youtubeId}
                src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
                title={`${video.label} — ${title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="h-full w-full"
              />
            </div>
          ) : (
            /* eslint-disable-next-line jsx-a11y/media-has-caption */
            <video
              key={video.src}
              controls
              preload="metadata"
              poster={video.poster}
              src={video.src}
              aria-label={`${video.label} — ${title}`}
              className={
                video.portrait
                  ? "mx-auto max-h-[64vh] w-auto rounded-lg border border-mapline bg-black"
                  : "w-full rounded-lg border border-mapline bg-black"
              }
            />
          )}
        </div>
      ) : null}

      {tab === "infographic" && media.infographic ? (
        <div className="mt-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={media.infographic.src}
            alt={`Infographic summary — ${title}`}
            width={media.infographic.width}
            height={media.infographic.height}
            className="mx-auto w-full max-w-md rounded-lg border border-mapline"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={media.infographic.src}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-mapline bg-white px-3 py-1 text-xs font-medium text-cobalt-900 transition-colors hover:bg-skytint"
            >
              <span className="ko-only">원본 크기로 보기</span>
              <span className="en-only">View full size</span>
              <span aria-hidden> ↗</span>
            </a>
            {media.infographic.pdfSrc ? (
              <a
                href={media.infographic.pdfSrc}
                download
                className="rounded-full border border-mapline bg-white px-3 py-1 text-xs font-medium text-cobalt-900 transition-colors hover:bg-skytint"
              >
                <span className="ko-only">PDF 내려받기</span>
                <span className="en-only">Download PDF</span>
              </a>
            ) : null}
          </div>
        </div>
      ) : null}

      {aiGenerated ? (
        <p className="mt-4 border-t border-mapline pt-3 text-xs leading-relaxed text-body/60">
          <span className="ko-only">
            논문을 요약한 AI 생성 자료입니다. 정확한 내용은 원문을 확인해 주세요.
          </span>
          <span className="en-only">
            AI-generated companion media summarising the paper — see the
            publication itself for the authoritative account.
          </span>
        </p>
      ) : null}
    </section>
  );
}

/**
 * One captioned figure in the detail dialog. Figures live either on the topic
 * (lead figures, under the paragraphs) or on the section they illustrate, so
 * the reader meets each diagram next to the text that explains it.
 */
function Figure({
  image,
  className = "mt-6",
}: {
  image: ResearchTopicImage;
  className?: string;
}) {
  return (
    <figure className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt={image.caption ?? ""}
        className="w-full rounded-lg border border-mapline bg-skytint"
      />
      {image.caption ? (
        <figcaption className="mt-1.5 text-xs text-body/60">
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Research topic rows that open an in-page detail dialog when clicked. */
export default function ResearchTopicList({
  projects,
}: {
  projects: ResearchProject[];
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [openTab, setOpenTab] = useState<MediaTab | null>(null);
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
          dialogRef.current.querySelectorAll<HTMLElement>(
            "button, a[href], audio[controls], video[controls]",
          ),
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

  const openMedia = open?.detail?.media;
  const openTabs = mediaTabs(openMedia);

  return (
    <>
      <ul className="mt-8 lg:col-span-9 lg:mt-0">
        {projects.map((project) => {
          const media = project.detail?.media;
          return (
            <li key={project.id} className="border-b border-mapline py-5">
              <button
                type="button"
                onClick={() => {
                  setOpenTab(null);
                  setOpenId(project.id);
                }}
                aria-haspopup="dialog"
                className="group grid w-full gap-4 text-left sm:grid-cols-[160px_1fr] sm:gap-6"
              >
                {project.imageUrl ? (
                  <Image
                    src={project.imageUrl}
                    alt=""
                    width={320}
                    height={214}
                    // bg-skytint shows through while the lazy-loaded thumbnail
                    // is still in flight, so a slow row reads as loading rather
                    // than as a broken image.
                    className="aspect-[3/2] w-full rounded-lg border border-mapline bg-skytint object-cover sm:w-40"
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
              {media && mediaTabs(media).length > 0 ? (
                <div className="mt-3 sm:pl-[184px]">
                  <MediaStrip
                    media={media}
                    onOpen={(tab) => {
                      setOpenTab(tab);
                      setOpenId(project.id);
                    }}
                  />
                </div>
              ) : null}
            </li>
          );
        })}
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

            {openMedia && openTabs.length > 0 ? (
              <MediaPanel
                key={`${open.id}-${openTab ?? "default"}`}
                media={openMedia}
                initialTab={openTab ?? openTabs[0]}
                title={open.title}
              />
            ) : null}

            {(open.detail?.paragraphs ?? [open.summary]).map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="mt-4 text-sm leading-relaxed text-body/90"
              >
                {paragraph}
              </p>
            ))}

            {open.detail?.images?.map((image) => (
              <Figure key={image.src} image={image} />
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
                {section.images?.map((image) => (
                  <Figure key={image.src} image={image} className="mt-4" />
                ))}
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
