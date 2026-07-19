import { NextRequest, NextResponse } from "next/server";

/**
 * Stable image URLs for files stored in Notion.
 *
 * Notion serves uploaded files through signed S3 URLs that expire after about
 * an hour and change on every API call. Hotlinking them breaks once the ISR
 * cache outlives the signature (and, with Vercel's image optimizer, the
 * constant URL churn burned through the free transformation quota). This
 * route gives every Notion image a permanent URL: it re-reads the fresh
 * signed URL from the Notion API on demand and streams the bytes with CDN
 * caching, so pages can embed /api/photo/<id> forever.
 *
 * - default: <id> is a Notion page id; serves the page's "사진" property.
 * - ?kind=block: <id> is an image block id (news/project/gallery bodies).
 */

const NOTION_VERSION = "2022-06-28";

export const dynamic = "force-dynamic";

async function notionGet(path: string): Promise<any | null> {
  const key = process.env.NOTION_API_KEY;
  if (!key) return null;
  const res = await fetch(`https://api.notion.com/v1/${path}`, {
    headers: {
      Authorization: `Bearer ${key}`,
      "Notion-Version": NOTION_VERSION,
    },
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  // Notion ids are UUIDs (with or without dashes) — reject anything else.
  if (!/^[0-9a-f-]{32,36}$/i.test(params.id)) {
    return new NextResponse("Bad id", { status: 400 });
  }

  let src: string | undefined;
  if (request.nextUrl.searchParams.get("kind") === "block") {
    const block = await notionGet(`blocks/${params.id}`);
    src = block?.image?.file?.url ?? block?.image?.external?.url;
  } else {
    const page = await notionGet(`pages/${params.id}`);
    const file = page?.properties?.["사진"]?.files?.[0];
    src = file?.file?.url ?? file?.external?.url;
  }
  if (!src) return new NextResponse("Not found", { status: 404 });

  const img = await fetch(src, { cache: "no-store" });
  if (!img.ok) return new NextResponse("Upstream error", { status: 502 });

  return new NextResponse(img.body, {
    headers: {
      "Content-Type": img.headers.get("content-type") ?? "image/jpeg",
      // Browsers keep it an hour; the CDN a day, serving stale for a week
      // while it refetches — photo swaps in Notion appear within a day.
      "Cache-Control":
        "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
