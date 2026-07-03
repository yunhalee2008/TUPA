/**
 * Dump current site data as Notion create-pages payloads (one JSON per DB).
 * One-off migration helper; run with: npx -y tsx scripts/dump-seed.ts <outdir>
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  getMembers,
  getOpenings,
  getProjects,
  getPublications,
  getResearchAreas,
} from "../lib/content";

const OUT = process.argv[2] ?? "seed-out";
mkdirSync(OUT, { recursive: true });

const ROLE_KO: Record<string, string> = {
  professor: "지도교수",
  "research-fellow": "연구원",
  phd: "박사과정",
  ms: "석사과정",
  visiting: "방문",
  intern: "인턴",
  alumni: "졸업생",
};
const TYPE_KO: Record<string, string> = {
  conference: "학회",
  journal: "저널",
  book: "북챕터",
};
const POSITION_KO: Record<string, string> = {
  phd: "박사",
  ms: "석사",
  postdoc: "포닥",
  intern: "인턴",
};

function write(name: string, pages: unknown[]) {
  writeFileSync(join(OUT, name), JSON.stringify(pages, null, 1));
  console.log(name, pages.length);
}

async function main() {
  const areas = await getResearchAreas();
  write(
    "seed-areas.json",
    areas.map((a, i) => ({
      properties: {
        "분야명(영문)": a.nameEn,
        "분야명(한글)": a.nameKo,
        "설명(한글)": a.descriptionKo,
        "설명(영문)": a.descriptionEn,
        키워드: JSON.stringify(a.keywords),
        공개: "__YES__",
        순서: i + 1,
      },
    })),
  );

  const members = await getMembers();
  const roleCounter: Record<string, number> = {};
  write(
    "seed-members.json",
    members.map((m) => {
      roleCounter[m.role] = (roleCounter[m.role] ?? 0) + 1;
      const homepage = m.links?.find((l) => /home/i.test(l.label))?.url;
      const scholar = m.links?.find((l) => /scholar/i.test(l.label))?.url;
      return {
        properties: {
          "이름(영문)": m.nameEn,
          ...(m.nameKo ? { "이름(한글)": m.nameKo } : {}),
          구분: ROLE_KO[m.role],
          "직함(한글)": m.titleKo,
          "직함(영문)": m.titleEn,
          ...(m.email ? { 이메일: m.email } : {}),
          ...(m.researchInterests.length
            ? { "연구 관심사": JSON.stringify(m.researchInterests) }
            : {}),
          ...(homepage ? { 홈페이지: homepage } : {}),
          ...(scholar ? { "Google Scholar": scholar } : {}),
          ...(m.placement ? { 진로: m.placement } : {}),
          공개: "__YES__",
          순서: roleCounter[m.role],
        },
      };
    }),
  );

  const pubs = await getPublications();
  write(
    "seed-pubs.json",
    pubs.map((p) => ({
      properties: {
        제목: p.title,
        저자: p.authors.join(", "),
        발표처: p.venue,
        연도: p.year,
        종류: TYPE_KO[p.type],
        ...(p.url ? { 링크: p.url } : {}),
        ...(p.doi ? { DOI: p.doi } : {}),
        ...(p.featured ? { "대표 논문": "__YES__" } : {}),
        공개: "__YES__",
      },
    })),
  );

  const projects = await getProjects();
  write(
    "seed-projects.json",
    projects.map((p) => ({
      properties: {
        "과제명(영문)": p.titleEn,
        "과제명(한글)": p.titleKo,
        유형: "수주과제",
        지원기관: p.sponsor,
        역할: p.role,
        시작년도: p.startYear,
        종료년도: p.endYear,
        공개: "__YES__",
      },
    })),
  );

  const openings = await getOpenings(false);
  write(
    "seed-openings.json",
    openings.map((o, i) => ({
      properties: {
        "제목(영문)": o.titleEn,
        "제목(한글)": o.titleKo,
        포지션: POSITION_KO[o.position],
        "설명(한글)": o.descriptionKo,
        "설명(영문)": o.descriptionEn,
        지원요건: o.requirements.join("\n"),
        ...(o.deadline ? { "date:마감일:start": o.deadline } : {}),
        "연락 이메일": o.contactEmail,
        모집중: o.active ? "__YES__" : "__NO__",
        공개: "__YES__",
        순서: i + 1,
      },
    })),
  );

  write(
    "seed-settings.json",
    [
      ["대표 이메일", "kaist.mobility@gmail.com"],
      ["주소(한글)", "대전광역시 유성구 문지로 193, KAIST 문지캠퍼스 F동 433호"],
      ["주소(영문)", "433, Building F, 193 Munji-ro, Yuseong-gu, Daejeon, Republic of Korea"],
      ["히어로 문구(한글)", "교통·모빌리티 AI와 스마트시티 연구로 도시의 이동 문제를 해결합니다."],
      ["히어로 문구(영문)", "We solve urban mobility problems through transport AI and smart city research."],
      ["3D 투어 링크", "https://my.matterport.com/show/?m=PKXeypMWexL"],
      ["Google Scholar", "https://scholar.google.com/citations?user=Cz_9jloAAAAJ&hl=en"],
      ["Scopus", "https://www.scopus.com/authid/detail.uri?authorId=55454217700"],
    ].map(([k, v]) => ({ properties: { 항목: k, 값: v } })),
  );
}

main();
