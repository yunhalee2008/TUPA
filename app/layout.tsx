import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import "./globals.css";

/** Swap to the custom domain when it is connected. */
const SITE_URL = "https://tupa-two.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TUPA — Transport and Urban Planning Arena | KAIST",
    template: "%s | TUPA @ KAIST",
  },
  description:
    "TUPA (Transport and Urban Planning Arena) is Prof. Inhi Kim's research lab at the Cho Chun Shik Graduate School of Mobility, KAIST, working on transportation AI, mobility, and smart cities.",
  openGraph: {
    type: "website",
    siteName: "TUPA — Transport and Urban Planning Arena",
    title: "TUPA — Transport and Urban Planning Arena | KAIST",
    description:
      "Prof. Inhi Kim's transportation AI & smart city research lab at the Cho Chun Shik Graduate School of Mobility, KAIST.",
    url: SITE_URL,
    locale: "ko_KR",
    alternateLocale: "en_US",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "TUPA — a miniature paper city where buildings form the letters TUPA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TUPA — Transport and Urban Planning Arena | KAIST",
    description:
      "Prof. Inhi Kim's transportation AI & smart city research lab at KAIST.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" data-lang="ko">
      <head>
        <script
          // Apply the saved language before first paint; first-time visitors
          // with a non-Korean browser default to English.
          dangerouslySetInnerHTML={{
            __html:
              "try{var l=localStorage.getItem('tupa-lang');if(!l){l=(navigator.language||'ko').toLowerCase().indexOf('ko')===0?'ko':'en';}if(l==='en'){document.documentElement.dataset.lang='en';document.documentElement.lang='en';}}catch(e){}",
          }}
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-cobalt-900 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          <span className="ko-only">본문으로 건너뛰기</span>
          <span className="en-only">Skip to content</span>
        </a>
        <SiteNav />
        <div className="flex-1" id="main">{children}</div>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
