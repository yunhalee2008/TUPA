/**
 * Notion CMS fetch layer.
 *
 * Talks to the Notion REST API directly (no SDK) with Next.js fetch caching
 * (`revalidate: 3600` — edits in Notion appear on the site within an hour).
 * Every fetcher returns `null` when Notion is not configured or errors, so
 * lib/content.ts can fall back to the built-in static data and the site never
 * breaks because of a CMS problem.
 *
 * Schema: docs/notion-schema.md · CMS: Notion "TUPA CMS" page.
 */

import type {
  Faq,
  GalleryAlbum,
  Member,
  MemberRole,
  NewsCategory,
  NewsItem,
  Opening,
  OpeningPosition,
  Project,
  Publication,
  PublicationType,
  ResearchArea,
  ResearchProject,
} from "./content";

const NOTION_VERSION = "2022-06-28";
const REVALIDATE_SECONDS = 3600;

const API_KEY = process.env.NOTION_API_KEY;

/** Database IDs (fixed; overridable via env for a future workspace move). */
const DB = {
  members: process.env.NOTION_DB_MEMBERS ?? "7aa78084bb144fe394ea80c27cef7d79",
  publications:
    process.env.NOTION_DB_PUBLICATIONS ?? "2f424be849424013ab8dd84de56e92a8",
  news: process.env.NOTION_DB_NEWS ?? "bf42bc1321bf401ba5f1d4b96685c091",
  researchAreas:
    process.env.NOTION_DB_RESEARCH_AREAS ?? "6df65f389bdd45dd8d38550c6cf72766",
  projects: process.env.NOTION_DB_PROJECTS ?? "4aa6450de72244ddb77e960f0e8972c9",
  openings: process.env.NOTION_DB_OPENINGS ?? "e98c6f76086b4792a449acb6a570e006",
  gallery: process.env.NOTION_DB_GALLERY ?? "4ba8a240a18a403b84e024621b22beb4",
  settings: process.env.NOTION_DB_SETTINGS ?? "3d0ceee3eddb48af932d09a4181bf363",
  faqs: process.env.NOTION_DB_FAQS ?? "c602f68cf1bd4e4899fb1eedf5a239b8",
};

export const notionEnabled = Boolean(API_KEY);

// ---------------------------------------------------------------------------
// Low-level API helpers
// ---------------------------------------------------------------------------

type NotionPage = { id: string; created_time: string; properties: Record<string, any> };

async function notionFetch(path: string, body?: unknown): Promise<any | null> {
  if (!API_KEY) return null;
  try {
    const res = await fetch(`https://api.notion.com/v1/${path}`, {
      method: body ? "POST" : "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
      // Tagged so /api/refresh can purge everything at once via revalidateTag.
      next: { revalidate: REVALIDATE_SECONDS, tags: ["notion"] },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/** Query all pages of a database, optionally filtering 공개=true. */
async function queryDb(
  dbId: string,
  publishedProp?: string,
): Promise<NotionPage[] | null> {
  const pages: NotionPage[] = [];
  let cursor: string | undefined;
  do {
    const data = await notionFetch(`databases/${dbId}/query`, {
      page_size: 100,
      start_cursor: cursor,
      ...(publishedProp
        ? { filter: { property: publishedProp, checkbox: { equals: true } } }
        : {}),
    });
    if (!data) return null;
    pages.push(...data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);
  return pages;
}

// Property extractors (all tolerate missing/empty values).
const plain = (rich: any[]): string =>
  (rich ?? []).map((r) => r?.plain_text ?? "").join("");
const text = (p: any): string =>
  p?.type === "title" ? plain(p.title) : plain(p?.rich_text);
const select = (p: any): string => p?.select?.name ?? "";
const multiSelect = (p: any): string[] =>
  (p?.multi_select ?? []).map((o: any) => o.name);
const number = (p: any): number | undefined => p?.number ?? undefined;
const checkbox = (p: any): boolean => Boolean(p?.checkbox);
const email = (p: any): string => p?.email ?? "";
const url = (p: any): string => p?.url ?? "";
const dateStart = (p: any): string => p?.date?.start ?? "";
const fileUrl = (p: any): string | undefined => {
  const f = p?.files?.[0];
  return f?.file?.url ?? f?.external?.url ?? undefined;
};

/** Fetch a page's blocks and split into text paragraphs + image URLs. */
export async function fetchPageContent(
  pageId: string,
): Promise<{ body: string[]; images: string[] } | null> {
  const body: string[] = [];
  const images: string[] = [];
  let cursor: string | undefined;
  do {
    const qs = cursor ? `?start_cursor=${cursor}&page_size=100` : "?page_size=100";
    const data = await notionFetch(`blocks/${pageId}/children${qs}`);
    if (!data) return null;
    for (const block of data.results) {
      if (block.type === "paragraph") {
        const t = plain(block.paragraph?.rich_text);
        if (t.trim()) body.push(t);
      } else if (block.type === "image") {
        const src = block.image?.file?.url ?? block.image?.external?.url;
        if (src) images.push(src);
      }
    }
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);
  return { body, images };
}

// ---------------------------------------------------------------------------
// Typed fetchers (null = Notion unavailable → caller falls back to static)
// ---------------------------------------------------------------------------

const ROLE_FROM_KO: Record<string, MemberRole> = {
  지도교수: "professor",
  연구원: "research-fellow",
  박사과정: "phd",
  석사과정: "ms",
  방문: "visiting",
  인턴: "intern",
  졸업생: "alumni",
};

export async function fetchMembers(): Promise<Member[] | null> {
  const pages = await queryDb(DB.members, "공개");
  if (!pages) return null;
  const members: Member[] = [];
  for (const page of pages) {
    const p = page.properties;
    // Property renamed 이름(영문) → 이름 when the Korean name column was dropped.
    const nameEn = text(p["이름"]) || text(p["이름(영문)"]);
    const role = ROLE_FROM_KO[select(p["구분"])];
    if (!nameEn || !role) continue;
    const links: { label: string; url: string }[] = [];
    if (url(p["홈페이지"])) links.push({ label: "Official homepage", url: url(p["홈페이지"]) });
    if (url(p["Google Scholar"])) links.push({ label: "Google Scholar", url: url(p["Google Scholar"]) });
    members.push({
      id: page.id,
      nameEn,
      role,
      titleKo: text(p["직함(한글)"]),
      titleEn: text(p["직함(영문)"]),
      email: email(p["이메일"]) || undefined,
      photoUrl: fileUrl(p["사진"]),
      researchInterests: multiSelect(p["연구 관심사"]),
      links: links.length ? links : undefined,
      placement: text(p["진로"]) || undefined,
      career: text(p["약력"])
        ? text(p["약력"]).split("\n").map((l) => l.trim()).filter(Boolean)
        : undefined,
      order: number(p["순서"]),
    });
  }
  return members.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

const PUB_TYPE_FROM_KO: Record<string, PublicationType> = {
  학회: "conference",
  저널: "journal",
  북챕터: "book",
};

export async function fetchPublications(): Promise<Publication[] | null> {
  const pages = await queryDb(DB.publications, "공개");
  if (!pages) return null;
  const pubs: Publication[] = [];
  for (const page of pages) {
    const p = page.properties;
    const title = text(p["제목"]);
    const year = number(p["연도"]);
    if (!title || !year) continue; // year is required for grouping
    pubs.push({
      id: page.id,
      title,
      authors: text(p["저자"]).split(",").map((a) => a.trim()).filter(Boolean),
      venue: text(p["발표처"]),
      year,
      type: PUB_TYPE_FROM_KO[select(p["종류"])] ?? "conference",
      tags: [],
      url: url(p["링크"]) || undefined,
      doi: text(p["DOI"]) || undefined,
      featured: checkbox(p["대표 논문"]),
    });
  }
  return pubs;
}

const NEWS_CATEGORY_FROM_KO: Record<string, NewsCategory> = {
  수상: "award",
  과제선정: "grant",
  사람들: "people",
  논문: "publication",
  일반: "general",
};

/** News list (properties only — body/images are fetched per page on demand). */
export async function fetchNews(): Promise<NewsItem[] | null> {
  const pages = await queryDb(DB.news, "공개");
  if (!pages) return null;
  const items: NewsItem[] = [];
  for (const page of pages) {
    const p = page.properties;
    const titleEn = text(p["제목(영문)"]);
    if (!titleEn) continue;
    const summaryKo = text(p["요약(한글)"]);
    const summaryEn = text(p["요약(영문)"]);
    items.push({
      id: page.id,
      date: dateStart(p["날짜"]) || page.created_time.slice(0, 10),
      titleEn,
      titleKo: text(p["제목(한글)"]) || titleEn,
      summaryKo: summaryKo || summaryEn,
      summaryEn: summaryEn || summaryKo,
      category: NEWS_CATEGORY_FROM_KO[select(p["분류"])] ?? "general",
      fromNotion: true,
    });
  }
  return items;
}

export async function fetchResearchAreas(): Promise<ResearchArea[] | null> {
  const pages = await queryDb(DB.researchAreas, "공개");
  if (!pages) return null;
  const areas = pages.map((page) => {
    const p = page.properties;
    const nameEn = text(p["분야명(영문)"]);
    const descriptionKo = text(p["설명(한글)"]);
    const descriptionEn = text(p["설명(영문)"]);
    return {
      slug: page.id,
      nameEn,
      nameKo: text(p["분야명(한글)"]) || nameEn,
      descriptionKo: descriptionKo || descriptionEn,
      descriptionEn: descriptionEn || descriptionKo,
      keywords: multiSelect(p["키워드"]),
      order: number(p["순서"]),
    };
  });
  return areas
    .filter((a) => a.nameEn)
    .sort((a, b) => (a.order ?? 999) - (b.order ??  999));
}

export async function fetchProjects(): Promise<Project[] | null> {
  const pages = await queryDb(DB.projects, "공개");
  if (!pages) return null;
  const currentYear = new Date().getFullYear();
  const projects: Project[] = [];
  for (const page of pages) {
    const p = page.properties;
    if (select(p["유형"]) === "연구소개") continue;
    const titleEn = text(p["과제명(영문)"]);
    const startYear = number(p["시작년도"]);
    if (!titleEn || !startYear) continue;
    const endYear = number(p["종료년도"]);
    projects.push({
      id: page.id,
      titleEn,
      titleKo: text(p["과제명(한글)"]),
      sponsor: select(p["지원기관"]),
      role: select(p["역할"]) === "Co-PI" ? "Co-PI" : "PI",
      startYear,
      endYear: endYear ?? currentYear,
      ongoing: endYear === undefined || endYear >= currentYear,
    });
  }
  return projects;
}

export async function fetchResearchProjects(): Promise<ResearchProject[] | null> {
  const pages = await queryDb(DB.projects, "공개");
  if (!pages) return null;
  const items: ResearchProject[] = [];
  for (const page of pages) {
    const p = page.properties;
    if (select(p["유형"]) !== "연구소개") continue;
    const title = text(p["과제명(영문)"]);
    if (!title) continue;
    items.push({
      id: page.id,
      title,
      date: page.created_time.slice(0, 10),
      imageUrl: fileUrl(p["사진"]),
      summary: text(p["요약(영문)"]),
    });
  }
  return items;
}

const POSITION_FROM_KO: Record<string, OpeningPosition> = {
  박사: "phd",
  석사: "ms",
  포닥: "postdoc",
  인턴: "intern",
};

export async function fetchOpenings(): Promise<Opening[] | null> {
  const pages = await queryDb(DB.openings, "공개");
  if (!pages) return null;
  const openings: Opening[] = [];
  for (const page of pages) {
    const p = page.properties;
    const titleEn = text(p["제목(영문)"]);
    const position = POSITION_FROM_KO[select(p["포지션"])];
    if (!titleEn || !position) continue;
    const descriptionKo = text(p["설명(한글)"]);
    const descriptionEn = text(p["설명(영문)"]);
    openings.push({
      id: page.id,
      position,
      titleEn,
      titleKo: text(p["제목(한글)"]) || titleEn,
      descriptionKo: descriptionKo || descriptionEn,
      descriptionEn: descriptionEn || descriptionKo,
      requirements: text(p["지원요건"]).split("\n").map((r) => r.trim()).filter(Boolean),
      deadline: dateStart(p["마감일"]) || undefined,
      contactEmail: email(p["연락 이메일"]) || "kaist.mobility@gmail.com",
      active: checkbox(p["모집중"]),
      order: number(p["순서"]),
    });
  }
  return openings.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

/** Gallery albums; cover/images come from each album page's image blocks. */
export async function fetchGalleryAlbums(): Promise<GalleryAlbum[] | null> {
  const pages = await queryDb(DB.gallery, "공개");
  if (!pages) return null;
  const albums = await Promise.all(
    pages.map(async (page) => {
      const p = page.properties;
      const titleEn = text(p["앨범명"]);
      if (!titleEn) return null;
      const content = await fetchPageContent(page.id);
      if (!content || content.images.length === 0) return null;
      return {
        id: page.id,
        titleEn,
        date: dateStart(p["날짜"]) || page.created_time.slice(0, 10),
        cover: content.images[0],
        images: content.images,
      };
    }),
  );
  return albums.filter((a): a is GalleryAlbum => a !== null);
}

export async function fetchFaqs(): Promise<Faq[] | null> {
  const pages = await queryDb(DB.faqs, "공개");
  if (!pages) return null;
  const faqs: Faq[] = [];
  for (const page of pages) {
    const p = page.properties;
    const questionKo = text(p["질문(한글)"]);
    if (!questionKo) continue;
    const answerKo = text(p["답변(한글)"]);
    const answerEn = text(p["답변(영문)"]);
    faqs.push({
      id: page.id,
      questionKo,
      questionEn: text(p["질문(영문)"]) || questionKo,
      answerKo: answerKo || answerEn,
      answerEn: answerEn || answerKo,
      order: number(p["순서"]),
    });
  }
  return faqs
    .filter((f) => f.answerKo)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export async function fetchSiteSettings(): Promise<Record<string, string> | null> {
  const pages = await queryDb(DB.settings);
  if (!pages) return null;
  const settings: Record<string, string> = {};
  for (const page of pages) {
    const key = text(page.properties["항목"]);
    const value = text(page.properties["값"]);
    if (key && value) settings[key] = value;
  }
  return settings;
}
