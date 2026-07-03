import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Instant cache refresh for the professor: open
 * /api/refresh?token=<REVALIDATE_TOKEN> (bookmarkable) to pull the latest
 * Notion content immediately instead of waiting for the hourly revalidate.
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  if (!process.env.REVALIDATE_TOKEN || token !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ ok: false, error: "invalid token" }, { status: 401 });
  }

  revalidateTag("notion");
  revalidatePath("/", "layout");

  return new NextResponse(
    `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>새로고침 완료 — TUPA</title></head><body style="font-family:-apple-system,'Pretendard',sans-serif;display:grid;place-items:center;min-height:100vh;margin:0;background:#FAFAF7;color:#0A2A66"><div style="text-align:center;padding:24px"><div style="font-size:44px">✅</div><h1 style="margin:12px 0 8px">새로고침 완료</h1><p style="color:#40485A;line-height:1.6">Notion의 최신 내용을 다시 불러왔습니다.<br>사이트 페이지를 새로고침하면 반영되어 있습니다.</p><a href="/" style="display:inline-block;margin-top:16px;padding:10px 20px;border-radius:8px;background:#1D4FD7;color:#fff;text-decoration:none;font-weight:600">홈으로 가기</a></div></body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}
