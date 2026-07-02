import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-24 bg-cobalt-900 text-white">
      <div className="site-container grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-extrabold">TUPA</p>
          <p className="mt-2 text-sm text-white/70">
            Transport and Urban Planning Arena
            <br />
            교통·모빌리티 AI와 스마트시티 연구실
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
              <Link className="hover:text-white" href="/prospective-students">
                Prospective Students
              </Link>
            </li>
            <li>
              <a
                className="hover:text-white"
                href="https://mo.kaist.ac.kr"
                target="_blank"
                rel="noreferrer"
              >
                Cho Chun Shik Graduate School of Mobility
              </a>
            </li>
          </ul>
        </div>
        <div className="text-sm text-white/70">
          <p className="mono-label mb-3 !text-white/50">Contact</p>
          <p>
            291 Daehak-ro, Yuseong-gu, Daejeon 34141, Republic of Korea
            <br />
            대전광역시 유성구 대학로 291, KAIST
          </p>
          <a
            className="mt-2 inline-block hover:text-white"
            href="mailto:kaist.mobility@gmail.com"
          >
            kaist.mobility@gmail.com
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
