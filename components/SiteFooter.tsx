import Link from "next/link";
import Copy from "@/components/Copy";
import { getPageCopy, getSiteSettings } from "@/lib/content";

export default async function SiteFooter() {
  const settings = await getSiteSettings();
  const copy = await getPageCopy();
  return (
    <footer className="mt-24 bg-cobalt-900 text-white">
      <div className="site-container grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-extrabold">TUPA</p>
          <p className="mt-2 text-sm text-white/70">
            {copy["공통 · 푸터 랩 전체 이름"].en}
            <br />
            <Copy t={copy["공통 · 푸터 한 줄 소개"]} />
          </p>
        </div>
        <div className="text-sm text-white/70">
          <p className="mono-label mb-3 !text-white/50">Links</p>
          <ul className="space-y-2">
            <li>
              <Link className="hover:text-white" href="/research">
                Research
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/publications">
                Publications
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/projects">
                Projects
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/people">
                People
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/news">
                News
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/gallery">
                Gallery
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/prospective-students">
                Prospective Students
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" href="/contact">
                Contact
              </Link>
            </li>
            <li>
              <a
                className="hover:text-white"
                href="https://mo.kaist.ac.kr"
                target="_blank"
                rel="noreferrer"
              >
                {copy["공통 · 푸터 모빌리티대학원 링크"].en}
              </a>
            </li>
          </ul>
        </div>
        <div className="text-sm text-white/70">
          <p className="mono-label mb-3 !text-white/50">Contact</p>
          <p>
            {settings["주소(영문)"]}
            <br />
            {settings["주소(한글)"]}
          </p>
          <a
            className="mt-2 inline-block hover:text-white"
            href={`mailto:${settings["대표 이메일"]}`}
          >
            {settings["대표 이메일"]}
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="site-container py-4 text-xs text-white/50">
          © {new Date().getFullYear()} TUPA · Cho Chun Shik Graduate School of
          Mobility, KAIST
        </div>
      </div>
    </footer>
  );
}
