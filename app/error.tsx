"use client";

import Link from "next/link";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="site-container flex flex-col items-center py-24 text-center lg:py-32">
      <p className="mono-label">Error</p>
      <h1 className="mt-4 font-display text-4xl font-extrabold text-cobalt-900">
        <span className="ko-only">일시적인 오류가 발생했습니다</span>
        <span className="en-only">Something went wrong</span>
      </h1>
      <p className="mt-4 max-w-md text-body/80">
        <span className="ko-only">
          잠시 후 다시 시도해 주세요. 문제가 계속되면 새로고침해 주세요.
        </span>
        <span className="en-only">
          Please try again in a moment, or refresh the page if it persists.
        </span>
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className="btn-primary">
          <span className="ko-only">다시 시도</span>
          <span className="en-only">Try again</span>
        </button>
        <Link href="/" className="btn-outline">
          <span className="ko-only">홈으로</span>
          <span className="en-only">Go home</span>
        </Link>
      </div>
    </main>
  );
}
