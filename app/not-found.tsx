import Link from "next/link";

export default function NotFound() {
  return (
    <main className="site-container flex flex-col items-center py-24 text-center lg:py-32">
      <p className="mono-label">404 — Not Found</p>
      <h1 className="mt-4 font-display text-4xl font-extrabold text-cobalt-900">
        <span className="ko-only">페이지를 찾을 수 없습니다</span>
        <span className="en-only">This page could not be found</span>
      </h1>
      <p className="mt-4 max-w-md text-body/80">
        <span className="ko-only">
          주소가 바뀌었거나 삭제된 페이지입니다. 아래 버튼으로 돌아가세요.
        </span>
        <span className="en-only">
          The address may have changed or the page has been removed.
        </span>
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          <span className="ko-only">홈으로</span>
          <span className="en-only">Go home</span>
        </Link>
        <Link href="/news" className="btn-outline">
          News
        </Link>
      </div>
    </main>
  );
}
