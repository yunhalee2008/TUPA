import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TUPA — Transport and Urban Planning Arena | KAIST",
    template: "%s | TUPA @ KAIST",
  },
  description:
    "TUPA (Transport and Urban Planning Arena) is Prof. Inhi Kim's research lab at the Cho Chun Shik Graduate School of Mobility, KAIST, working on transportation AI, mobility, and smart cities.",
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
          // Apply the saved language before first paint to avoid a flash.
          dangerouslySetInnerHTML={{
            __html:
              "try{var l=localStorage.getItem('tupa-lang');if(l==='en'){document.documentElement.dataset.lang='en';document.documentElement.lang='en';}}catch(e){}",
          }}
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <SiteNav />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
