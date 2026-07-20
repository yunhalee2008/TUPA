/**
 * TUPA content data layer.
 *
 * Pages must import ONLY the types and the async getter functions below —
 * never the mock data directly. When we migrate to the Notion API, the
 * constants in the "Mock data" section get replaced by Notion queries and
 * nothing outside this file changes.
 */

import galleryData from "./data/gallery.json";
import journeysData from "./data/journeys.json";
import memberPublicationsData from "./data/member-publications.json";
import newsArchiveData from "./data/news-archive.json";
import newsExtraData from "./data/news-extra.json";
import pageCopyData from "./data/page-copy.json";
import researchProjectsData from "./data/research-projects.json";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type MemberRole =
  | "professor"
  | "research-fellow"
  | "phd"
  | "ms"
  | "visiting"
  | "intern"
  | "alumni";

export interface Member {
  id: string;
  /** @deprecated Korean names are no longer displayed or stored in Notion. */
  nameKo?: string;
  nameEn: string;
  role: MemberRole;
  /** e.g. "Director, Associate Professor" / "박사과정" */
  titleKo: string;
  titleEn: string;
  email?: string;
  photoUrl?: string;
  researchInterests: string[];
  /** Personal site, Google Scholar, LinkedIn, etc. */
  links?: { label: string; url: string }[];
  /** For alumni: where they went after TUPA. */
  placement?: string;
  /** Career timeline lines (mainly for the director), newest first. */
  career?: string[];
  /** Manual sort order within a role (from the Notion CMS). */
  order?: number;
}

/** Student journey card on /prospective-students (성장 스토리 DB). */
export interface Journey {
  name: string;
  photo?: string;
  /** Timeline lines, first to current. */
  stepsKo: string[];
  stepsEn: string[];
  order?: number;
}

export type PublicationType = "journal" | "conference" | "book" | "patent";

export interface Publication {
  id: string;
  title: string;
  /** Korean title, shown when the site language is KO (mainly for patents). */
  titleKo?: string;
  /** Ordered author list as displayed, e.g. "Kaihan Zhang". */
  authors: string[];
  venue: string;
  year: number;
  type: PublicationType;
  tags: string[];
  doi?: string;
  url?: string;
  /** Highlighted on the home page / top of the list. */
  featured?: boolean;
}

/**
 * One line of a member's personal publication record, imported verbatim from
 * the legacy inhi.kim/team member modals (SCI Journal lists). Author strings
 * are kept as displayed there (initials etc.), so they are not used for
 * author-name matching — only for display on the member page.
 */
export interface MemberPublicationEntry {
  year: number;
  /** Author list as a single display string, e.g. "R Tamakloe, I Kim". */
  authors: string;
  title: string;
  venue: string;
}

export type NewsCategory = "award" | "grant" | "people" | "publication" | "general";

export interface NewsItem {
  id: string;
  /** ISO date, e.g. "2026-06-15". */
  date: string;
  titleKo: string;
  titleEn: string;
  summaryKo: string;
  summaryEn: string;
  category: NewsCategory;
  /** Thumbnail (first article image). */
  imageUrl?: string;
  /** Full-article paragraphs, in the original language of the legacy post. */
  body?: string[];
  /** All article images. */
  images?: string[];
  /** True when the item lives in the Notion CMS (vs. the built-in archive). */
  fromNotion?: boolean;
}

export interface GalleryAlbum {
  id: string;
  titleEn: string;
  /** ISO date of the album post. */
  date: string;
  cover: string;
  images: string[];
}

/** A titled block of detail content inside a research topic dialog. */
export interface ResearchTopicSection {
  heading: string;
  body?: string;
  bullets?: string[];
}

export interface ResearchTopicImage {
  src: string;
  caption?: string;
}

/** Rich content shown in the click-to-open detail dialog of a research topic. */
export interface ResearchTopicDetail {
  /** Lead paragraphs shown at the top of the dialog. */
  paragraphs: string[];
  sections?: ResearchTopicSection[];
  images?: ResearchTopicImage[];
  /** External references (source page, demo videos). */
  links?: { label: string; url: string }[];
}

/** A research topic/project showcase (legacy "Research Projects" page). */
export interface ResearchProject {
  id: string;
  title: string;
  /** ISO date of the original post. */
  date: string;
  imageUrl?: string;
  summary: string;
  detail?: ResearchTopicDetail;
  /** Parent ResearchArea.slug — each topic belongs to exactly one area. */
  areaSlug?: string;
}

export interface ResearchArea {
  slug: string;
  nameKo: string;
  nameEn: string;
  descriptionKo: string;
  descriptionEn: string;
  /** Representative methods/keywords shown as chips. */
  keywords: string[];
  /** Publication ids that showcase this area. */
  relatedPublicationIds?: string[];
  /** Manual sort order (from the Notion CMS). */
  order?: number;
}

export type ProjectRole = "PI" | "Co-PI";

export interface Project {
  id: string;
  titleKo: string;
  titleEn: string;
  /** Funding agency, e.g. "NRF", "IITP", "Samsung". */
  sponsor: string;
  role: ProjectRole;
  startYear: number;
  endYear: number;
  /** Ongoing projects are shown first. */
  ongoing: boolean;
  summaryKo?: string;
  summaryEn?: string;
  /** Detail-page paragraphs — the Notion 연구과제 row's page body. */
  body?: string[];
  /** Detail-page images from the Notion page body. */
  images?: string[];
}

export interface Faq {
  id: string;
  questionKo: string;
  questionEn: string;
  answerKo: string;
  answerEn: string;
  /** Manual sort order (from the Notion CMS). */
  order?: number;
}

export type OpeningPosition = "phd" | "ms" | "postdoc" | "intern";

export interface Opening {
  id: string;
  position: OpeningPosition;
  titleKo: string;
  titleEn: string;
  descriptionKo: string;
  descriptionEn: string;
  /** Bullet-point requirements / preferred backgrounds. */
  requirements: string[];
  /** ISO date; omit for rolling applications. */
  deadline?: string;
  contactEmail: string;
  active: boolean;
  /** Manual sort order (from the Notion CMS). */
  order?: number;
}

// ---------------------------------------------------------------------------
// Mock data — replaced by Notion API queries during migration.
// Content is based on the lab's previous site (inhi.kim, WordPress export).
// ---------------------------------------------------------------------------

const MEMBERS: Member[] = [
  // --- Director ------------------------------------------------------------
  {
    id: "inhi-kim",
    nameKo: "김인희",
    nameEn: "Inhi Kim",
    role: "professor",
    titleKo: "연구책임자 · 부교수",
    titleEn: "Director, Associate Professor",
    email: "inhi.kim@kaist.ac.kr",
    photoUrl: "/people/inhi-kim.jpg",
    career: [
      "2023– Associate Professor, Cho Chun Shik Graduate School of Mobility, KAIST",
      "2024– Adjunct Professor, New York University (C2SMARTER)",
      "2020– Adjunct Senior Lecturer, Monash University",
      "2020–2022 Associate Professor, Kongju National University",
      "2019–2020 Senior Lecturer, Dept. of Civil Engineering, Monash University",
      "2015–2018 Lecturer, Dept. of Civil Engineering, Monash University",
      "2014 Ph.D. in Civil Engineering, The University of Queensland",
      "2007-2012 — Transport Engineer & Planner, PTV Group (Australia · Germany · UAE · Korea)",
    ],
    researchInterests: [
      "Transport modelling & simulation",
      "Mobility AI",
      "Digital twin",
      "Sustainable transport systems",
    ],
    links: [
      // "Official homepage" (inhi.kim) removed — that domain now serves this site.
      {
        label: "Google Scholar",
        url: "https://scholar.google.com/citations?user=Cz_9jloAAAAJ&hl=en",
      },
      {
        label: "Scopus",
        url: "https://www.scopus.com/authid/detail.uri?authorId=55454217700",
      },
    ],
  },
  // --- Post-docs & researchers ----------------------------------------------
  {
    id: "reuben-tamakloe",
    nameKo: "루벤 타마클로",
    nameEn: "Reuben Tamakloe",
    role: "research-fellow",
    titleKo: "연구조교수 · 장영실 펠로우",
    titleEn: "Research Assistant Professor · Jang Young Sil Fellow",
    photoUrl: "/people/reuben-tamakloe.jpg",
    researchInterests: [
      "Traffic safety analytics",
      "Econometric & machine learning models",
      "Vulnerable road users",
    ],
  },
  {
    id: "gyounghoon-chun",
    nameKo: "",
    nameEn: "Gyounghoon Chun",
    role: "research-fellow",
    titleKo: "박사후연구원",
    titleEn: "Postdoctoral Researcher",
    photoUrl: "/people/gyounghoon-chun.jpg",
    researchInterests: ["Intersection operations", "Reinforcement learning"],
  },
  {
    id: "taeho-oh",
    nameKo: "",
    nameEn: "Taeho Oh",
    role: "research-fellow",
    titleKo: "박사후연구원",
    titleEn: "Postdoctoral Researcher",
    photoUrl: "/people/taeho-oh.jpg",
    researchInterests: [
      "Micromobility safety",
      "Driver behaviour",
      "Driving simulator",
    ],
  },
  {
    id: "fan-wu",
    nameKo: "",
    nameEn: "Fan Wu",
    role: "research-fellow",
    titleKo: "박사후연구원",
    titleEn: "Postdoctoral Researcher",
    photoUrl: "/people/fan-wu.jpg",
    researchInterests: ["Traffic state estimation", "Machine learning"],
  },
  {
    id: "meng-li",
    nameKo: "",
    nameEn: "Meng Li",
    role: "research-fellow",
    titleKo: "박사후연구원",
    titleEn: "Postdoctoral Researcher",
    photoUrl: "/people/meng-li.jpg",
    researchInterests: ["Mixed traffic control", "Proactive safety"],
  },
  // --- Ph.D. students --------------------------------------------------------
  {
    id: "tengfeng-lin",
    nameKo: "",
    nameEn: "Tengfeng Lin",
    role: "phd",
    titleKo: "박사과정 · 2022 입학",
    titleEn: "Ph.D. Student · since 2022",
    photoUrl: "/people/tengfeng-lin.jpg",
    researchInterests: [
      "Surrogate safety measures",
      "Trajectory prediction",
      "Cyclist safety",
    ],
  },
  {
    id: "donghyun-kwon",
    nameKo: "권동현",
    nameEn: "Donghyun Kwon",
    role: "phd",
    titleKo: "박사과정 · 2023 입학",
    titleEn: "Ph.D. Student · since 2023",
    photoUrl: "/people/donghyun-kwon.jpg",
    researchInterests: [
      "Deep generative models",
      "Population synthesis",
      "Travel demand modelling",
    ],
  },
  {
    id: "younghi-liu",
    nameKo: "",
    nameEn: "Younghi Liu",
    role: "phd",
    titleKo: "박사과정 · 2023 입학",
    titleEn: "Ph.D. Student · since 2023",
    photoUrl: "/people/younghi-liu.jpg",
    researchInterests: [],
  },
  {
    id: "mahdi-khorasani",
    nameKo: "",
    nameEn: "Mahdi Khorasani",
    role: "phd",
    titleKo: "박사과정 · 2023 입학",
    titleEn: "Ph.D. Student · since 2023",
    photoUrl: "/people/mahdi-khorasani.jpg",
    researchInterests: [],
  },
  {
    id: "kaihan-zhang",
    nameKo: "",
    nameEn: "Kaihan Zhang",
    role: "phd",
    titleKo: "박사과정 · 2024 입학",
    titleEn: "Ph.D. Student · since 2024",
    photoUrl: "/people/kaihan-zhang.jpg",
    researchInterests: [
      "Pedestrian safety",
      "Explainable AI",
      "Streetscape perception",
    ],
  },
  {
    id: "ng-hui-zhi",
    nameKo: "",
    nameEn: "Ng Hui Zhi",
    role: "phd",
    titleKo: "박사과정 · 2024 입학",
    titleEn: "Ph.D. Student · since 2024",
    photoUrl: "/people/ng-hui-zhi.jpg",
    researchInterests: [],
  },
  {
    id: "kervin-lucas",
    nameKo: "",
    nameEn: "Kervin Lucas",
    role: "phd",
    titleKo: "박사과정 · 2024 입학",
    titleEn: "Ph.D. Student · since 2024",
    photoUrl: "/people/kervin-lucas.jpg",
    researchInterests: [],
  },
  {
    id: "hyunchul-park",
    nameKo: "박현철",
    nameEn: "Hyunchul Park",
    role: "phd",
    titleKo: "박사과정 · 2025 입학",
    titleEn: "Ph.D. Student · since 2025",
    photoUrl: "/people/hyunchul-park.jpg",
    researchInterests: ["Micromobility safety", "Driver behaviour"],
  },
  // --- M.S. students ---------------------------------------------------------
  {
    id: "jaehyuck-lim",
    nameKo: "",
    nameEn: "Jaehyuck Lim",
    role: "ms",
    titleKo: "석사과정 · 2024 입학",
    titleEn: "M.S. Student · since 2024",
    photoUrl: "/people/jaehyuck-lim.jpg",
    researchInterests: [],
  },
  {
    id: "eric-min-kim",
    nameKo: "",
    nameEn: "Eric Min Kim",
    role: "ms",
    titleKo: "석사과정 · 2024 입학",
    titleEn: "M.S. Student · since 2024",
    photoUrl: "/people/eric-min-kim.jpg",
    researchInterests: [],
  },
  {
    id: "junyuk-lee",
    nameKo: "",
    nameEn: "Junyuk Lee",
    role: "ms",
    titleKo: "석사과정 · 2024 입학",
    titleEn: "M.S. Student · since 2024",
    photoUrl: "/people/junyuk-lee.jpg",
    researchInterests: [],
  },
  {
    id: "kexin-zhu",
    nameKo: "",
    nameEn: "Kexin Zhu",
    role: "ms",
    titleKo: "석사과정 · 2024 입학",
    titleEn: "M.S. Student · since 2024",
    photoUrl: "/people/kexin-zhu.jpg",
    researchInterests: [],
  },
  {
    id: "jungyoon-kim",
    nameKo: "김정윤",
    nameEn: "Jungyoon Kim",
    role: "ms",
    titleKo: "석사과정 · 2025 입학",
    titleEn: "M.S. Student · since 2025",
    photoUrl: "/people/jungyoon-kim.jpg",
    researchInterests: [],
  },
  {
    id: "junyoung-kim",
    nameKo: "",
    nameEn: "Junyoung Kim",
    role: "ms",
    titleKo: "석사과정 · 2025 입학",
    titleEn: "M.S. Student · since 2025",
    photoUrl: "/people/junyoung-kim.jpg",
    researchInterests: [],
  },
  {
    id: "myeonghyeon-kim",
    nameKo: "김명현",
    nameEn: "MyeongHyeon Kim",
    role: "ms",
    titleKo: "석사과정 · 2025 입학",
    titleEn: "M.S. Student · since 2025",
    photoUrl: "/people/myeonghyeon-kim.jpg",
    researchInterests: [],
  },
  {
    id: "truyen-le-minh",
    nameKo: "",
    nameEn: "Truyen Le-Minh",
    role: "ms",
    titleKo: "석사과정 · 2025 입학",
    titleEn: "M.S. Student · since 2025",
    photoUrl: "/people/truyen-le-minh.jpg",
    researchInterests: [],
  },
  {
    id: "jihae-peak",
    nameKo: "",
    nameEn: "Jihae Peak",
    role: "ms",
    titleKo: "석사과정 · 2025 입학",
    titleEn: "M.S. Student · since 2025",
    photoUrl: "/people/jihae-peak.jpg",
    researchInterests: [],
  },
  {
    id: "hyeoncheol-noh",
    nameKo: "",
    nameEn: "Hyeoncheol Noh",
    role: "ms",
    titleKo: "석사과정 · 2025 입학",
    titleEn: "M.S. Student · since 2025",
    photoUrl: "/people/hyeoncheol-noh.jpg",
    researchInterests: [],
  },
  {
    id: "chungkyo-hong",
    nameKo: "",
    nameEn: "Chungkyo Hong",
    role: "ms",
    titleKo: "석사과정 · 2025 입학",
    titleEn: "M.S. Student · since 2025",
    photoUrl: "/people/chungkyo-hong.jpg",
    researchInterests: [],
  },
  {
    id: "yeji-yoo",
    nameKo: "유예지",
    nameEn: "Yeji Yoo",
    role: "ms",
    titleKo: "석사과정 · 2025 입학",
    titleEn: "M.S. Student · since 2025",
    photoUrl: "/people/yeji-yoo.jpg",
    researchInterests: [],
  },
  {
    id: "chanwoo-moon",
    nameKo: "",
    nameEn: "Chanwoo Moon",
    role: "ms",
    titleKo: "석사과정 · 2026 입학",
    titleEn: "M.S. Student · since 2026",
    photoUrl: "/people/chanwoo-moon.jpg",
    researchInterests: [],
  },
  {
    id: "jihye-eum",
    nameKo: "",
    nameEn: "Jihye Eum",
    role: "ms",
    titleKo: "석사과정 · 2026 입학",
    titleEn: "M.S. Student · since 2026",
    photoUrl: "/people/jihye-eum.jpg",
    researchInterests: [],
  },
  {
    id: "jongmyeung",
    nameKo: "",
    nameEn: "Jongmyeung",
    role: "ms",
    titleKo: "석사과정 · 2026 입학",
    titleEn: "M.S. Student · since 2026",
    photoUrl: "/people/jongmyeung.jpg",
    researchInterests: [],
  },
  // --- Visiting students -----------------------------------------------------
  {
    id: "chengjie",
    nameKo: "",
    nameEn: "Chengjie",
    role: "visiting",
    titleKo: "방문 학생 · Southeast University (2025)",
    titleEn: "Visiting Student · Southeast University (2025)",
    photoUrl: "/people/chengjie.jpg",
    researchInterests: [],
  },
  {
    id: "lurong-xu",
    nameKo: "",
    nameEn: "Lurong Xu",
    role: "visiting",
    titleKo: "방문 학생 · Monash University (2024–2025)",
    titleEn: "Visiting Student · Monash University (2024–2025)",
    photoUrl: "/people/lurong-xu.jpg",
    researchInterests: [],
  },
  // --- Interns ----------------------------------------------------------------
  {
    id: "yoonha-lee",
    nameKo: "",
    nameEn: "Yunha Lee",
    role: "intern",
    titleKo: "인턴 · TCIS (2025)",
    titleEn: "Intern · TCIS (2025)",
    photoUrl: "/people/yoonha-lee.jpg",
    researchInterests: [],
  },
  {
    id: "changhee-kim",
    nameKo: "",
    nameEn: "Changhee Kim",
    role: "intern",
    titleKo: "인턴 · KAIST 전산학부 (2025)",
    titleEn: "Intern · School of Computing (2025)",
    photoUrl: "/people/changhee-kim.jpg",
    researchInterests: [],
  },
  {
    id: "biniam",
    nameKo: "",
    nameEn: "Biniam",
    role: "intern",
    titleKo: "인턴 · KAIST 전산학부 (2026)",
    titleEn: "Intern · School of Computing (2026)",
    photoUrl: "/people/biniam.jpg",
    researchInterests: [],
  },
  // --- Alumni ------------------------------------------------------------------
  {
    id: "songmi-paek-alumni",
    nameKo: "",
    nameEn: "Songmi Paek",
    role: "alumni",
    titleKo: "석사 졸업 (2026)",
    titleEn: "M.S. 2026",
    photoUrl: "/people/songmi-paek.jpg",
    researchInterests: [],
  },
  {
    id: "jaeeun-jung-alumni",
    nameKo: "정재은",
    nameEn: "Jaeeun Jung",
    role: "alumni",
    titleKo: "석사 졸업 (2026)",
    titleEn: "M.S. 2026",
    photoUrl: "/people/jaeeun-jung.jpg",
    researchInterests: [],
    placement: "Korea Railroad Research Institute",
  },
  {
    id: "jinwon-yoon-alumni",
    nameKo: "",
    nameEn: "Jinwon Yoon",
    role: "alumni",
    titleKo: "박사 졸업 (2025)",
    titleEn: "Ph.D. 2025",
    photoUrl: "/people/jinwon-yoon.jpg",
    researchInterests: [],
    placement: "Assistant Professor, Korea University",
  },
  {
    id: "dong-xiao-alumni",
    nameKo: "",
    nameEn: "Dong Xiao",
    role: "alumni",
    titleKo: "박사 졸업 (2024)",
    titleEn: "Ph.D. 2024",
    photoUrl: "/people/dong-xiao.jpg",
    researchInterests: [],
    placement: "Research Fellow, Monash University",
  },
  {
    id: "chunliang-wu-alumni",
    nameKo: "",
    nameEn: "Chunliang Wu",
    role: "alumni",
    titleKo: "박사 졸업 (2023)",
    titleEn: "Ph.D. 2023",
    photoUrl: "/people/chunliang-wu.jpg",
    researchInterests: [],
    placement: "Lecturer (Assistant Professor), University of Western Australia",
  },
  {
    id: "fatemeh-nourmohammadi-alumni",
    nameKo: "",
    nameEn: "Fatemeh Nourmohammadi",
    role: "alumni",
    titleKo: "석사 졸업 (2023)",
    titleEn: "M.S. 2023",
    photoUrl: "/people/fatemeh-nourmohammadi.jpg",
    researchInterests: [],
    placement: "Ph.D. Candidate, UNSW",
  },
  {
    id: "zahra-nourmohammadi-alumni",
    nameKo: "",
    nameEn: "Zahra Nourmohammadi",
    role: "alumni",
    titleKo: "박사 졸업 (2022)",
    titleEn: "Ph.D. 2022",
    photoUrl: "/people/zahra-nourmohammadi.jpg",
    researchInterests: [],
    placement: "UNSW",
  },
  {
    id: "wenhua-jiang-alumni",
    nameKo: "",
    nameEn: "Wenhua Jiang",
    role: "alumni",
    titleKo: "박사 졸업 (2022)",
    titleEn: "Ph.D. 2022",
    photoUrl: "/people/wenhua-jiang.jpg",
    researchInterests: [],
    placement: "Research Fellow, University of Edinburgh",
  },
  {
    id: "bo-wang-alumni",
    nameKo: "",
    nameEn: "Bo Wang",
    role: "alumni",
    titleKo: "박사 졸업 (2022)",
    titleEn: "Ph.D. 2022",
    photoUrl: "/people/wang-bo.jpg",
    researchInterests: [],
    placement: "Research Fellow, University of Melbourne",
  },
  {
    id: "kai-huang-alumni",
    nameKo: "",
    nameEn: "Kai Huang",
    role: "alumni",
    titleKo: "박사 졸업 (2020)",
    titleEn: "Ph.D. 2020",
    photoUrl: "/people/kai-huang.jpg",
    researchInterests: [],
    placement: "Assistant Professor, Southeast University",
  },
  {
    id: "tianqi-gu-alumni",
    nameKo: "",
    nameEn: "Tianqi Gu",
    role: "alumni",
    titleKo: "박사 졸업 (2020)",
    titleEn: "Ph.D. 2020",
    photoUrl: "/people/tianqi-gu.jpg",
    researchInterests: [],
    placement: "Assistant Professor, Monash University",
  },
  {
    id: "xinyuan-chen-alumni",
    nameKo: "",
    nameEn: "Xinyuan Chen",
    role: "alumni",
    titleKo: "박사 졸업 (2019)",
    titleEn: "Ph.D. 2019",
    photoUrl: "/people/xinyuan-chen.jpg",
    researchInterests: [],
    placement:
      "Assistant Professor, Nanjing University of Aeronautics and Astronautics",
  },
  {
    id: "wentao-jing-alumni",
    nameKo: "",
    nameEn: "Wentao Jing",
    role: "alumni",
    titleKo: "박사 졸업 (2018)",
    titleEn: "Ph.D. 2018",
    photoUrl: "/people/wentao-jing.jpg",
    researchInterests: [],
    placement: "Chief Operating Officer, HyperPay",
  },
  {
    id: "xiaoying-cao-alumni",
    nameKo: "",
    nameEn: "Xiaoying Cao",
    role: "alumni",
    titleKo: "박사 졸업 (2017)",
    titleEn: "Ph.D. 2017",
    photoUrl: "/people/xiaoying-cao.jpg",
    researchInterests: [],
    placement: "Senior Evaluation Officer, VicRoads",
  },
];

/**
 * Imported from the previous site's Publication page (inhi.kim/dfdfd,
 * WordPress export 2026-07-02): peer-reviewed international conference
 * papers and book chapters. Journal papers are linked out to Google
 * Scholar / Scopus, matching the old site's structure.
 */
const PUBLICATIONS: Publication[] = [
  // ── Journal papers 2012–2022 — imported from Google Scholar (2026-07) ──
  {
    id: "yoo-2022-connected-autonomous",
    title:
      "Connected Autonomous Vehicles Intersection Capacity Analysis Considering HCM 7th: Case Study of Jeju Innovation City",
    authors: ["Yegi Yoo", "Inhi Kim"],
    venue: "Journal of Korean Society of Transportation 40 (6), 879-894",
    year: 2022,
    type: "journal",
    tags: [],
    doi: "10.7470/jkst.2022.40.6.879",
  },
  {
    id: "xiao-2022-recent-advances",
    title:
      "Recent advances in understanding the impact of built environment on traffic performance",
    authors: ["Dong Xiao", "Inhi Kim", "Nan Zheng"],
    venue: "Multimodal Transportation 1 (4), 100034",
    year: 2022,
    type: "journal",
    tags: [],
    doi: "10.1016/j.multra.2022.100034",
  },
  {
    id: "shaaban-2022-measuring-users",
    title:
      "Measuring users’ satisfaction of the road network using structural equation modeling",
    authors: ["Khaled Shaaban", "Kiran Shakeel", "Taha Hossein Rashidi", "Inhi Kim"],
    venue: "International journal of sustainable transportation 16 (9), 792-803",
    year: 2022,
    type: "journal",
    tags: [],
    doi: "10.1080/15568318.2021.1934916",
  },
  {
    id: "wang-2022-short-term",
    title:
      "Short-term traffic flow prediction in bike-sharing networks",
    authors: ["Bo Wang", "Hai L. Vu", "Inhi Kim", "Chen Cai"],
    venue: "Journal of intelligent transportation systems 26 (4), 461-475",
    year: 2022,
    type: "journal",
    tags: [],
    doi: "10.1080/15472450.2021.1904921",
  },
  {
    id: "xu-2022-are-shared",
    title:
      "Are shared streets acceptable to pedestrians and drivers? Evidence from Virtual Reality experiments",
    authors: ["Lurong Xu", "Taeho Oh", "Inhi Kim", "Xiaojian Hu"],
    venue: "PLoS one 17 (4), e0266591",
    year: 2022,
    type: "journal",
    tags: [],
    doi: "10.1371/journal.pone.0266591",
  },
  {
    id: "jeong-2022-comprehensive-analysis",
    title:
      "Comprehensive Analysis of Traffic Accidents in Seoul: Major Factors and Types Affecting Injury Severity",
    authors: ["Hyeonchoel Jeong", "Inhi Kim", "Keejun Han", "Jungeun Kim"],
    venue: "Applied Sciences 12 (4), 1790",
    year: 2022,
    type: "journal",
    tags: [],
    doi: "10.3390/app12041790",
  },
  {
    id: "park-2022-validation-omnidirectional",
    title:
      "A Study on Validation of Omnidirectional VR Treadmill by Comparison of Spatial Orientation Skills",
    authors: ["Hyunchul Park", "Taeho Oh", "Inhi Kim"],
    venue: "The Journal of The Korea Institute of Intelligent Transport Systems 21 (5 …",
    year: 2022,
    type: "journal",
    tags: [],
    doi: "10.12815/kits.2022.21.5.15",
  },
  {
    id: "oh-2022-driving-risk",
    title:
      "Driving Risk Analysis Based on Driving Experience at Hook-Turn Intersection Using the Emerging Virtual Reality Technology",
    authors: ["Taeho Oh", "Yanping Xu", "Zhibin Li", "Inhi Kim"],
    venue: "Journal of Advanced Transportation 2022 (1), 8929826",
    year: 2022,
    type: "journal",
    tags: [],
    doi: "10.1155/2022/8929826",
  },
  {
    id: "jung-2021-volume-delay",
    title:
      "Volume Delay Function Calibration Based on GPS Trajectory Data",
    authors: ["Jaeeun Jung", "Taeho Oh", "Inhi Kim"],
    venue: "Journal of Korean Society of Transportation 39 (4), 399-408",
    year: 2021,
    type: "journal",
    tags: [],
    doi: "10.7470/jkst.2021.39.4.399",
  },
  {
    id: "haghani-2021-applications-brain",
    title:
      "Applications of brain imaging methods in driving behaviour research",
    authors: ["Milad Haghani", "Michiel C.J. Bliemer", "Bilal Farooq", "Inhi Kim", "Zhibin Li", "Cheol Oh", "Zahra Shahhoseini", "Hamish MacDougall"],
    venue: "Accident Analysis & Prevention 154, 106093",
    year: 2021,
    type: "journal",
    tags: [],
    doi: "10.1016/j.aap.2021.106093",
  },
  {
    id: "shaaban-2021-severity-analysis",
    title:
      "Severity analysis of red-light-running-related crashes using structural equation modeling",
    authors: ["Khaled Shaaban", "Iman Gharraie", "Emanuele Sacchi", "Inhi Kim"],
    venue: "Journal of Transportation Safety & Security 13 (3), 278-297",
    year: 2021,
    type: "journal",
    tags: [],
    doi: "10.1080/19439962.2019.1629137",
  },
  {
    id: "wu-2021-effects-built",
    title:
      "The effects of built environment spatial variation on bike-sharing usage: A case study of Suzhou, China",
    authors: ["Chunliang Wu", "Inhi Kim", "Hyungchul Chung"],
    venue: "Cities 110, 103063",
    year: 2021,
    type: "journal",
    tags: [],
    doi: "10.1016/j.cities.2020.103063",
  },
  {
    id: "zhu-2021-high-resolution",
    title:
      "High-resolution simulation-based analysis of leading vehicle acceleration profiles at signalized intersections for emission modeling",
    authors: ["Sicong Zhu", "Inhi Kim", "Keechoo Choi"],
    venue: "International Journal of Sustainable Transportation 15 (5), 375-385",
    year: 2021,
    type: "journal",
    tags: [],
    doi: "10.1080/15568318.2020.1792011",
  },
  {
    id: "wu-2021-examining-effects",
    title:
      "Examining the effects of the built environment on topological properties of the bike-sharing network in Suzhou, China",
    authors: ["Chunliang Wu", "Hyungchul Chung", "Zhiyuan Liu", "Inhi Kim"],
    venue: "International Journal of Sustainable Transportation 15 (5), 338-350",
    year: 2021,
    type: "journal",
    tags: [],
    doi: "10.1080/15568318.2020.1780652",
  },
  {
    id: "gu-2021-two-wheeled",
    title:
      "The two-wheeled renaissance in China—an empirical review of bicycle, E-bike, and motorbike development",
    authors: ["Tianqi Gu", "Inhi Kim", "Graham Currie"],
    venue: "International journal of sustainable transportation 15 (4), 239-258",
    year: 2021,
    type: "journal",
    tags: [],
    doi: "10.1080/15568318.2020.1737277",
  },
  {
    id: "wang-2021-revealing-hidden",
    title:
      "Revealing the hidden features in traffic prediction via entity embedding",
    authors: ["Bo Wang", "Khaled Shaaban", "Inhi Kim"],
    venue: "Personal and Ubiquitous Computing 25 (1), 21-31",
    year: 2021,
    type: "journal",
    tags: [],
    doi: "10.1007/s00779-019-01333-x",
  },
  {
    id: "wu-2020-analyzing-structural",
    title:
      "Analyzing the structural properties of bike-sharing networks: Evidence from the United States, Canada, and China",
    authors: ["Chunliang Wu", "Inhi Kim"],
    venue: "Transportation Research Part A: Policy and Practice 140, 52-71",
    year: 2020,
    type: "journal",
    tags: [],
    doi: "10.1016/j.tra.2020.07.018",
  },
  {
    id: "an-2020-battery-swapping",
    title:
      "Battery-swapping facility planning for electric buses with local charging systems",
    authors: ["Kun An", "Wentao Jing", "Inhi Kim"],
    venue: "International Journal of Sustainable Transportation 14 (7), 489-502",
    year: 2020,
    type: "journal",
    tags: [],
    doi: "10.1080/15568318.2019.1573939",
  },
  {
    id: "chen-2020-parallel-computing",
    title:
      "A parallel computing framework for solving user equilibrium problem on computer clusters",
    authors: ["Xinyuan Chen", "Zhiyuan Liu", "Inhi Kim"],
    venue: "Transportmetrica A: Transport Science 16 (3), 550-573",
    year: 2020,
    type: "journal",
    tags: [],
    doi: "10.1080/23249935.2020.1720041",
  },
  {
    id: "tahmasbi-2019-multimodal-accessibility",
    title:
      "Multimodal accessibility-based equity assessment of urban public facilities distribution",
    authors: ["Behnam Tahmasbi", "Mohammad Hadi Mansourianfar", "Hossein Haghshenas", "Inhi Kim"],
    venue: "Sustainable Cities and Society 49, 101633",
    year: 2019,
    type: "journal",
    tags: [],
    doi: "10.1016/j.scs.2019.101633",
  },
  {
    id: "huang-2019-analysis-influencing",
    title:
      "Analysis of the Influencing Factors of Carpooling Schemes",
    authors: ["Kai Huang", "Zhiyuan Liu", "Inhi Kim", "Yong Zhang", "Ting Zhu"],
    venue: "IEEE Intelligent Transportation Systems Magazine 11 (3), 200-208",
    year: 2019,
    type: "journal",
    tags: [],
    doi: "10.1109/mits.2019.2919550",
  },
  {
    id: "gu-2019-measuring-immediate",
    title:
      "Measuring immediate impacts of a new mass transit system on an existing bike-share system in China",
    authors: ["Tianqi Gu", "Inhi Kim", "Graham Currie"],
    venue: "Transportation research part A: policy and practice 124, 20-39",
    year: 2019,
    type: "journal",
    tags: [],
    doi: "10.1016/j.tra.2019.03.003",
  },
  {
    id: "huang-2019-analysis-acceptance",
    title:
      "Analysis of the acceptance of park-and-ride by users: A cumulative logistic regression approach",
    authors: ["Kai Huang", "Zhiyuan Liu", "Ting Zhu", "Inhi Kim", "Kun An"],
    venue: "Journal of Transport and Land Use 12 (1), 637-647",
    year: 2019,
    type: "journal",
    tags: [],
    doi: "10.5198/jtlu.2019.1390",
  },
  {
    id: "gu-2019-be-or",
    title:
      "To be or not to be dockless: Empirical analysis of dockless bikeshare development in China",
    authors: ["Tianqi Gu", "Inhi Kim", "Graham Currie"],
    venue: "Transportation Research Part A: Policy and Practice 119, 122-147",
    year: 2019,
    type: "journal",
    tags: [],
    doi: "10.1016/j.tra.2018.11.007",
  },
  {
    id: "jia-2018-traffic-crash",
    title:
      "Traffic crash analysis with point-of-interest spatial clustering",
    authors: ["Ruo Jia", "Anish Khadka", "Inhi Kim"],
    venue: "Accident Analysis & Prevention 121, 223-230",
    year: 2018,
    type: "journal",
    tags: [],
    doi: "10.1016/j.aap.2018.09.018",
  },
  {
    id: "liu-2018-remote-park",
    title:
      "Remote park-and-ride network equilibrium model and its applications",
    authors: ["Zhiyuan Liu", "Xinyuan Chen", "Qiang Meng", "Inhi Kim"],
    venue: "Transportation Research Part B: Methodological 117, 37-62",
    year: 2018,
    type: "journal",
    tags: [],
    doi: "10.1016/j.trb.2018.08.004",
  },
  {
    id: "nguyen-phuoc-2018-modelling-net",
    title:
      "Modelling the net traffic congestion impact of bus operations in Melbourne",
    authors: ["Duy Q. Nguyen-Phuoc", "Graham Currie", "Chris De Gruyter", "Inhi Kim", "William Young"],
    venue: "Transportation Research Part A: Policy and Practice 117, 1-12",
    year: 2018,
    type: "journal",
    tags: [],
    doi: "10.1016/j.tra.2018.08.005",
  },
  {
    id: "jing-2018-congestion-patterns",
    title:
      "Congestion patterns of electric vehicles with limited battery capacity",
    authors: ["Wentao Jing", "Mohsen Ramezani", "Kun An", "Inhi Kim"],
    venue: "Plos one 13 (3), e0194354",
    year: 2018,
    type: "journal",
    tags: [],
    doi: "10.1371/journal.pone.0194354",
  },
  {
    id: "chen-2018-modelling-rail",
    title:
      "Modelling Rail-Based Park and Ride with Environmental Constraints in a Multimodal Transport Network",
    authors: ["Xinyuan Chen", "Inhi Kim"],
    venue: "Journal of Advanced Transportation 2018 (1), 2310905",
    year: 2018,
    type: "journal",
    tags: [],
    doi: "10.1155/2018/2310905",
  },
  {
    id: "rose-2017-predicting-urban",
    title:
      "Predicting Urban Railway Level Crossing Closure Times",
    authors: ["Graham Rose", "Inhi Kim", "T. B. Kularatne"],
    venue: "Journal of the Eastern Asia Society for Transportation Studies 12, 1328-1345",
    year: 2017,
    type: "journal",
    tags: [],
  },
  {
    id: "jing-2017-location-design",
    title:
      "Location Design of Electric Vehicle Charging Facilities: A Path-Distance Constrained Stochastic User Equilibrium Approach",
    authors: ["Wentao Jing", "Kun An", "Mohsen Ramezani", "Inhi Kim"],
    venue: "Journal of advanced transportation 2017 (1), 4252946",
    year: 2017,
    type: "journal",
    tags: [],
    doi: "10.1155/2017/4252946",
  },
  {
    id: "shaaban-2016-influence-bus",
    title:
      "The influence of bus service satisfaction on university students' mode choice",
    authors: ["Khaled Shaaban", "Inhi Kim"],
    venue: "Journal of Advanced Transportation 50 (6), 935-948",
    year: 2016,
    type: "journal",
    tags: [],
    doi: "10.1002/atr.1383",
  },
  {
    id: "shaaban-2016-assessment-taxi",
    title:
      "Assessment of the taxi service in Doha",
    authors: ["Khaled Shaaban", "Inhi Kim"],
    venue: "Transportation Research Part A: Policy and Practice 88, 223-235",
    year: 2016,
    type: "journal",
    tags: [],
    doi: "10.1016/j.tra.2016.04.011",
  },
  {
    id: "jing-2016-electric-vehicles",
    title:
      "Electric vehicles: A review of network modelling and future research needs",
    authors: ["Wentao Jing", "Yadan Yan", "Inhi Kim", "Majid Sarvi"],
    venue: "Advances in Mechanical Engineering 8 (1), 1687814015627981",
    year: 2016,
    type: "journal",
    tags: [],
    doi: "10.1177/1687814015627981",
  },
  {
    id: "cao-2016-mandatory-lane",
    title:
      "Study of Mandatory Lane Change Execution Behavior Model for Heavy Vehicles and Passenger Cars",
    authors: ["Xiaoying Cao", "William Young", "Majid Sarvi", "Inhi Kim"],
    venue: "Transportation Research Record 2561 (1), 73-80",
    year: 2016,
    type: "journal",
    tags: [],
    doi: "10.3141/2561-09",
  },
  {
    id: "larue-2015-driver-s",
    title:
      "Driver’s behavioural changes with new intelligent transport system interventions at railway level crossings—A driving simulator study",
    authors: ["Grégoire S. Larue", "Inhi Kim", "Andry Rakotonirainy", "Narelle L. Haworth", "Luis Ferreira"],
    venue: "Accident analysis & prevention 81, 74-85",
    year: 2015,
    type: "journal",
    tags: [],
    doi: "10.1016/j.aap.2015.04.026",
  },
  {
    id: "kabit-2014-modelling-major",
    title:
      "Modelling major traffic incident impacts and estimation of their associated costs",
    authors: ["Mohamad Raduan bin Kabit", "Phil Charles", "Luis Ferreira", "Inhi Kim"],
    venue: "Transportation planning and technology 37 (4), 373-390",
    year: 2014,
    type: "journal",
    tags: [],
    doi: "10.1080/03081060.2014.897130",
  },
  {
    id: "kim-2014-driver-experience",
    title:
      "A study on driver experience to railway crossings in driving simulator",
    authors: ["Inhi Kim", "Seonha Lee"],
    venue: "The Journal of The Korea Institute of Intelligent Transport Systems 13 (2 …",
    year: 2014,
    type: "journal",
    tags: [],
    doi: "10.12815/kits.2014.13.2.057",
  },
  {
    id: "kim-2013-modeling-pedestrian",
    title:
      "Modeling pedestrian queuing using micro-simulation",
    authors: ["Inhi Kim", "Ronald Galiza", "Luis Ferreira"],
    venue: "Transportation Research Part A: Policy and Practice 49, 232-240",
    year: 2013,
    type: "journal",
    tags: [],
    doi: "10.1016/j.tra.2013.01.018",
  },
  {
    id: "tey-2012-evaluating-safety",
    title:
      "Evaluating Safety at Railway Level Crossings with Microsimulation Modeling",
    authors: ["Li-Sian Tey", "Inhi Kim", "Luis Ferreira"],
    venue: "Transportation research record 2298 (1), 70-77",
    year: 2012,
    type: "journal",
    tags: [],
    doi: "10.3141/2298-08",
  },
  // ── Journal papers — imported from dochak.com/disclosure (2026-07) ──
  {
    id: "zhang-2026-waits-longer",
    title:
      "Who waits longer to pick you up? behavioral and spatial inequities in ride-hailing pickup time based on real-world platform data",
    authors: ["Jiaqi Zhang", "Junfeng Jiao", "Xin Wang", "Inhi Kim", "Tianqi Gu"],
    venue: "Travel Behaviour and Society 43, 101224",
    year: 2026,
    type: "journal",
    tags: [],
  },
  {
    id: "zhang-2026-social-psychological",
    title:
      "Social-psychological determinants and nonlinear thresholds: behavioral insights into urban air mobility adoption as an airport shuttle",
    authors: ["Kaihan Zhang", "Xiaoyu Liu", "Qihao Cui", "Xueting Gao", "Mengqiu Cao", "Inhi Kim"],
    venue: "Transportation Research Part A: Policy and Practice 205, 104856",
    year: 2026,
    type: "journal",
    tags: [],
  },
  {
    id: "tamakloe-2026-determinants-battery",
    title:
      "Determinants of battery electric vehicle adoption concerns: insights from commercial fleet owners",
    authors: ["Reuben Tamakloe", "Linus Dinam Caesar", "Inhi Kim"],
    venue: "Transportation Research Part A: Policy and Practice 205, 104874",
    year: 2026,
    type: "journal",
    tags: [],
  },
  {
    id: "zhang-2026-streetscape-built",
    title:
      "Does the streetscape built environment matter in explaining crash injury severity among older adults?",
    authors: ["Kaihan Zhang", "Bo Chen", "Reuben Tamakloe", "Yang Bai", "Inhi Kim"],
    venue: "Journal of Transport Geography 131, 104540",
    year: 2026,
    type: "journal",
    tags: [],
  },
  {
    id: "zhuang-2026-platform-induced",
    title:
      "Platform-induced time-space trade-offs in ride-hailing: Multi-homing as a response to operational constraints",
    authors: ["Chutian Zhuang", "Tianqi Gu", "Inhi Kim", "Hyungchul Chung", "Kaihan Zhang"],
    venue: "Journal of Transport Geography 131, 104533",
    year: 2026,
    type: "journal",
    tags: [],
  },
  {
    id: "gu-2026-managing-coexistence",
    title:
      "Managing coexistence between taxis and ride-hailing services: A longitudinal case study of operational strategies and policy implications",
    authors: ["Tianqi Gu", "Inhi Kim", "Lei Cheng"],
    venue: "Case Studies on Transport Policy, 101718",
    year: 2026,
    type: "journal",
    tags: [],
  },
  {
    id: "liu-2025-sequential-decomposition",
    title:
      "Sequential Decomposition and Attribution for Trajectory Forecasting",
    authors: ["Yuting Liu", "Inhi Kim"],
    venue: "Knowledge-Based Systems, 115204",
    year: 2025,
    type: "journal",
    tags: [],
  },
  {
    id: "liu-2025-enhanced-trajectory",
    title:
      "Enhanced trajectory reconstruction from sparse and noisy GPS data: A progressive chunked transformer approach",
    authors: ["Yuting Liu", "Qingyuan Li", "Inhi Kim"],
    venue: "Communications in Transportation Research 5, 100200",
    year: 2025,
    type: "journal",
    tags: [],
  },
  {
    id: "kim-2025-identifying-critical",
    title:
      "Identifying critical urban traffic risks for autonomous vehicle crash severity",
    authors: ["Changjae Kim", "Juneyoung Kim", "Inhi Kim"],
    venue: "Journal of Transportation Safety & Security, 1-21",
    year: 2025,
    type: "journal",
    tags: [],
  },
  {
    id: "ye-2025-drivers-react",
    title:
      "How do the drivers react to different C-V2X-based communication conditions in dilemma zones? A driving simulator study",
    authors: ["Shengdi Ye", "Tiantian Chen", "Oscar Oviedo-Trespalacios", "Yusak Ali", "Taeho Oh", "Inhi Kim"],
    venue: "Accident Analysis & Prevention 221, 108208",
    year: 2025,
    type: "journal",
    tags: [],
  },
  {
    id: "zhang-2025-synergistic-role",
    title:
      "Synergistic role of audio-visual perceptions in promoting bikeshare for active travel",
    authors: ["Kaihan Zhang", "Qunshan Song", "Hui Ma", "Waishan Qiu", "Mei Li", "Inhi Kim"],
    venue: "Transportation Research Part D: Transport and Environment 145, 104806",
    year: 2025,
    type: "journal",
    tags: [],
  },
  {
    id: "tamakloe-2025-pattern-recognition",
    title:
      "Pattern recognition in crash clusters involving vehicles with advanced driving technologies",
    authors: ["Reuben Tamakloe", "Mahdi Khorasani", "Subasish Das", "Inhi Kim"],
    venue: "Accident Analysis & Prevention 218, 108072",
    year: 2025,
    type: "journal",
    tags: [],
  },
  {
    id: "jiang-2025-carbon-savings",
    title:
      "Carbon savings in ride-pooling: A data-driven, route-based analysis from East Asia",
    authors: ["Zhonghui Jiang", "Tianqi Gu", "Jiaqi Zhang", "Hyungchul Chung", "Inhi Kim"],
    venue: "Transportation Research Part D: Transport and Environment 144, 104764",
    year: 2025,
    type: "journal",
    tags: [],
  },
  {
    id: "tamakloe-2025-differences-injury",
    title:
      "Differences in injury severities between elderly and non-elderly taxi driver at-fault crashes: Temporal instability and out-of-sample prediction",
    authors: ["Reuben Tamakloe", "Mahdi Khorasani", "Inhi Kim"],
    venue: "Accident Analysis & Prevention 211, 107865",
    year: 2025,
    type: "journal",
    tags: [],
  },
  {
    id: "lim-2025-impact-information",
    title:
      "The impact of information delivery systems in tunnels depending on lighting intensity and speed limit",
    authors: ["Jaehyuck Lim", "Hyunchul Park", "Taeho Oh", "Inhi Kim"],
    venue: "Tunnelling and Underground Space Technology 157, 106365",
    year: 2025,
    type: "journal",
    tags: [],
  },
  {
    id: "gu-2025-free-interchange",
    title:
      "Free interchange for better transit? Assessing the multi-dimensional impacts on metro to bus interchange behavior − insights from an explainable machine learning method",
    authors: ["Tianqi Gu", "Kaihan Zhang", "Weiping Xu", "Chutian Zhuang", "Zhonghui Jiang", "Inhi Kim", "Hyungchul Chung"],
    venue: "Travel Behaviour and Society 38, 100923",
    year: 2025,
    type: "journal",
    tags: [],
  },
  {
    id: "zhang-2024-exploring-fatal",
    title:
      "Exploring fatal/severe pedestrian injury crash frequency at school zone crash hotspots: using interpretable machine learning to assess the micro-level street environment",
    authors: ["Kaihan Zhang", "Reuben Tamakloe", "Mengqiu Cao", "Inhi Kim"],
    venue: "Journal of Transport Geography 121, 104034",
    year: 2024,
    type: "journal",
    tags: [],
  },
  {
    id: "gu-2024-understanding-shared",
    title:
      "Understanding shared bike usages toward metros with fewer physical road separations",
    authors: ["Tianqi Gu", "Inhi Kim", "Graham Currie", "Weiping Xu"],
    venue: "Case Studies on Transport Policy 18, 101281",
    year: 2024,
    type: "journal",
    tags: [],
  },
  {
    id: "nguyen-phuoc-2024-questioning-penalties",
    title:
      "Questioning penalties and road safety Policies: Are they enough to deter risky motorcyclist Behavior?",
    authors: ["Duy Quy Nguyen-Phuoc", "Nhat Xuan Mai", "Inhi Kim", "Oscar Oviedo-Trespalacios"],
    venue: "Accident Analysis & Prevention 207, 107756",
    year: 2024,
    type: "journal",
    tags: [],
  },
  {
    id: "oh-2024-enhancing-mutual",
    title:
      "Enhancing mutual understanding of e-scooter user's perspective in overtaking maneuver through replaying own driving trajectory",
    authors: ["Taeho Oh", "Jaehyuck Lim", "Reuben Tamakloe", "Zhibin Li", "Inhi Kim"],
    venue: "Accident Analysis & Prevention 207, 107750",
    year: 2024,
    type: "journal",
    tags: [],
  },
  {
    id: "park-2024-effects-driver",
    title:
      "Effects of driver's braking behavior by the real-time pedestrian scale warning system",
    authors: ["Hyunchul Park", "Taeho Oh", "Inhi Kim"],
    venue: "Accident Analysis & Prevention 205, 107685",
    year: 2024,
    type: "journal",
    tags: [],
  },
  {
    id: "tamakloe-2024-temporal-instability",
    title:
      "Temporal instability of the determinants of fatal/severe elderly pedestrian injury outcomes in intersections and non-intersections before, during, and after the COVID-19 pandemic",
    authors: ["Reuben Tamakloe", "Kaihan Zhang", "Inhi Kim"],
    venue: "Accident Analysis & Prevention 205, 107676",
    year: 2024,
    type: "journal",
    tags: [],
  },
  {
    id: "nourmohammadi-2024-impact-covid",
    title:
      "Impact of COVID-19 pandemic on characteristic of bike-sharing systems near metro and bus stations",
    authors: ["Fatemeh Nourmohammadi", "Zahra Nourmohammadi", "Inhi Kim", "Heechan Kang"],
    venue: "International Journal of Urban Sciences 29 (3), 563-581",
    year: 2024,
    type: "journal",
    tags: [],
  },
  {
    id: "gu-2024-taxi-competition",
    title:
      "Taxi in competition with online car-hailing drivers: policy implication to operating strategies",
    authors: ["Tianqi Gu", "Weiping Xu", "Peiran Shi", "Rongrong Wang", "Inhi Kim"],
    venue: "Multimodal Transportation 3 (2), 100129",
    year: 2024,
    type: "journal",
    tags: [],
  },
  {
    id: "tamakloe-2024-critical-risk",
    title:
      "Critical risk factors associated with fatal/severe crash outcomes in personal mobility device rider at-fault crashes: A two-step inter-cluster rule mining technique",
    authors: ["Reuben Tamakloe", "Kaihan Zhang", "Ahmed Hossain", "Inhi Kim", "Shin Hyoung Park"],
    venue: "Accident Analysis & Prevention 199, 107527",
    year: 2024,
    type: "journal",
    tags: [],
  },
  {
    id: "tu-2024-advancements-prospects",
    title:
      "Advancements and prospects in multisensor fusion for autonomous driving",
    authors: ["Chengzhong Tu", "Lei Wang", "Jaehyuck Lim", "Inhi Kim"],
    venue: "Journal of Intelligent and Connected Vehicles 7 (4), 245-247",
    year: 2024,
    type: "journal",
    tags: [],
  },
  {
    id: "xiao-2024-built-environment",
    title:
      "Does built environment have impact on traffic congestion?—A bootstrap mediation analysis on a case study of Melbourne",
    authors: ["Dongyang Xiao", "Inhi Kim", "Nan Zheng"],
    venue: "Transportation Research Part A: Policy and Practice 190, 104297",
    year: 2024,
    type: "journal",
    tags: [],
  },
  {
    id: "phi-2024-machine-learning",
    title:
      "Machine learning application to seismic site classification prediction model using Horizontal-to-Vertical Spectral Ratio (HVSR) of strong-ground motions",
    authors: ["Francis G Phi", "Bumsu Cho", "Jungeun Kim", "Hyungik Cho", "Yun Wook Choo", "Dookie Kim", "Inhi Kim"],
    venue: "Geomechanics & Engineering 37 (6), 539-554",
    year: 2024,
    type: "journal",
    tags: [],
  },
  {
    id: "jiang-2023-missing-data",
    title:
      "Missing data imputation for transfer passenger flow identified from in-station WiFi systems",
    authors: ["Wenhua Jiang", "Nan Zheng", "Inhi Kim"],
    venue: "Transportmetrica B: Transport Dynamics 11 (1), 325-342",
    year: 2023,
    type: "journal",
    tags: [],
  },
  {
    id: "wang-2023-distributional-prediction",
    title:
      "Distributional prediction of short-term traffic using neural networks",
    authors: ["Bo Wang", "Hai L Vu", "Inhi Kim", "Chen Cai"],
    venue: "Engineering Applications of Artificial Intelligence 126, 107061",
    year: 2023,
    type: "journal",
    tags: [],
  },
  {
    id: "zhu-2023-uwb-ins",
    title:
      "A UWB/INS Trajectory Tracking System Application in a Cycling Safety Study",
    authors: ["Sicong Zhu", "Hao Yue", "Tatsuto Suzuki", "Inhi Kim", "Lei Yu", "Qing Lan"],
    venue: "Sensors 23 (7), 3629",
    year: 2023,
    type: "journal",
    tags: [],
  },
  {
    id: "nourmohammadi-2023-deep-spatiotemporal",
    title:
      "A deep spatiotemporal approach in maritime accident prediction: A case study of the territorial sea of South Korea",
    authors: ["Zahra Nourmohammadi", "Fatemeh Nourmohammadi", "Inhi Kim", "Shin Hyoung Park"],
    venue: "Ocean Engineering 270, 113565",
    year: 2023,
    type: "journal",
    tags: [],
  },
  // ── Patents — imported from dochak.com/disclosure (2026-07) ──
  {
    id: "patent-2020-signal-controller",
    title:
      "Traffic Signal Control Device",
    titleKo: "교통신호기 제어장치",
    authors: [],
    venue: "대한민국 등록특허 10-2166283",
    year: 2020,
    type: "patent",
    tags: [],
  },
  {
    id: "patent-2024-pedestrian-collision",
    title:
      "Method and System for Evaluating Future Pedestrian Collisions at Unsignalized Intersections Based on Probabilistic Trajectory Prediction",
    titleKo: "확률 궤적 예측을 기반으로 비신호 교차로에서 보행자의 미래 충돌을 평가하는 방법 및 시스템",
    authors: [],
    venue: "대한민국 특허 출원",
    year: 2024,
    type: "patent",
    tags: [],
  },
  {
    id: "patent-2024-rl-signal-control",
    title:
      "Reinforcement Learning-Based Signal Control Method and System Considering Environmental Impact",
    titleKo: "환경영향을 고려한 강화학습 기반의 신호제어방법 및 시스템",
    authors: [],
    venue: "대한민국 특허 출원",
    year: 2024,
    type: "patent",
    tags: [],
  },
  {
    id: "patent-2024-mobility-route",
    title:
      "Method and System for Analyzing Route Selection of Electric Mobility Using Street View Images",
    titleKo: "스트리트 뷰 이미지를 이용하여 전동 모빌리티의 경로선택을 분석하는 방법 및 시스템",
    authors: [],
    venue: "대한민국 특허 출원",
    year: 2024,
    type: "patent",
    tags: [],
  },
  {
    id: "patent-2024-driving-self-evaluation",
    title:
      "Method and System for Self-Evaluating Driving Behavior Using Visual Context Based on Route Replay",
    titleKo: "경로 리플레이에 기반한 시각 전황을 활용하여 운전행태를 자기평가하는 방법 및 시스템",
    authors: [],
    venue: "대한민국 특허 출원",
    year: 2024,
    type: "patent",
    tags: [],
  },
  {
    id: "patent-2024-driver-warning",
    title:
      "Real-Time Driver Warning Method and System Based on Pedestrian Scale Information",
    titleKo: "보행자 규모 정보에 기반한 실시간 운전자 경고 방법 및 시스템",
    authors: [],
    venue: "대한민국 특허 출원",
    year: 2024,
    type: "patent",
    tags: [],
  },
  {
    id: "patent-2024-signal-plan",
    title:
      "Traffic Signal Plan Generation Device and Method Using Traffic Volume Control Plan",
    titleKo: "교통량 제어 계획을 이용한 교통신호 계획 생성 장치 및 방법",
    authors: [],
    venue: "대한민국 특허 출원",
    year: 2024,
    type: "patent",
    tags: [],
  },
  {
    id: "patent-2024-synthetic-population",
    title:
      "Method and System for Generating Customized Synthetic Population for Traffic Demand Analysis Based on Conditional Adversarial Generative Model",
    titleKo: "조건부 적대적 생성 모델 기반 교통수요 분석의 맞춤형 합성인구 생성 방법 및 시스템",
    authors: [],
    venue: "대한민국 특허 출원",
    year: 2024,
    type: "patent",
    tags: [],
  },
  {
    id: "jung-2025-roundabout-rl",
    title:
      "A Novel Roundabout Operation Strategy Using Reinforcement Learning Based Single-Agent Robot Speed Control",
    authors: ["Jaeeun Jung", "Gyounghoon Chun", "Inhi Kim"],
    venue: "TRB 104th Annual Meeting",
    year: 2025,
    type: "conference",
    tags: ["reinforcement learning", "intersection control", "autonomous driving"],
    featured: true,
  },
  {
    id: "paek-2025-20-minute-city",
    title:
      "Redefining Urban Access: A Fresh Look at Accessibility and Equity in the 20-Minute City",
    authors: ["Songmi Paek", "Tiantian Chen", "Inhi Kim"],
    venue: "TRB 104th Annual Meeting",
    year: 2025,
    type: "conference",
    tags: ["accessibility", "equity", "urban planning"],
  },
  {
    id: "kwon-2025-population-synthesis",
    title:
      "Customized Deep Generative Models to Resolve the Sampling Bias in Population Synthesis",
    authors: ["Donghyun Kwon", "Inhi Kim"],
    venue: "TRB 104th Annual Meeting",
    year: 2025,
    type: "conference",
    tags: ["generative AI", "population synthesis", "travel demand"],
  },
  {
    id: "zhang-2025-elderly-pedestrian",
    title:
      "Elderly Pedestrian Crash Severity: Exploring the Role of Human Perceived Streetscape Design Using Explainable Ensemble Learning",
    authors: ["Kaihan Zhang", "Reuben Tamakloe", "Inhi Kim"],
    venue: "TRB 104th Annual Meeting",
    year: 2025,
    type: "conference",
    tags: ["traffic safety", "explainable AI", "pedestrian"],
    featured: true,
  },
  {
    id: "park-2025-micromobility-overtaking",
    title:
      "Micromobility Safety Challenges: A Study on Drivers Overtaking Bicycles and E-Scooters According to Road Conditions and Cross-Modal Experience",
    authors: ["Hyunchul Park", "Taeho Oh", "Jaehyuck Lim", "Inhi Kim"],
    venue: "TRB 104th Annual Meeting",
    year: 2025,
    type: "conference",
    tags: [],
  },
  {
    id: "yoon-2025-dark-llm",
    title:
      "DARK-LLM: Description Data Auto-Labeling with Reliable Keyword Using LLM for Analyzing Causes of Autonomous Vehicle Disengagements",
    authors: ["Jinwon Yoon", "Byeongjoon Noh", "Inhi Kim"],
    venue: "TRB 104th Annual Meeting",
    year: 2025,
    type: "conference",
    tags: ["LLM", "autonomous vehicles", "safety analysis"],
    featured: true,
  },
  {
    id: "lin-2025-surrogate-safety",
    title:
      "A Surrogate Safety Measure at Non-Signalized Intersections Based on Probability Trajectory Prediction",
    authors: ["Tengfeng Lin", "Zhixiong Jin", "Hwasoo Yeo", "Inhi Kim", "Kaihan Zhang"],
    venue: "TRB 104th Annual Meeting",
    year: 2025,
    type: "conference",
    tags: [],
  },
  {
    id: "zhang-2024-perception-severity",
    title:
      "The Role of Human Subjective Perceptions and Objective Measurements of the Urban Environment in Explaining Pedestrian Injury Severity",
    authors: ["Kaihan Zhang", "Reuben Tamakloe", "Inhi Kim"],
    venue: "ICTCT Conference",
    year: 2024,
    type: "conference",
    tags: [],
  },
  {
    id: "tamakloe-2024-elderly-covid",
    title:
      "Variability in the Impact of Factors Influencing Elderly Pedestrian-Injuries in Crashes at Intersections and Non-Intersections Before, During, and After the COVID-19 Pandemic",
    authors: ["Reuben Tamakloe", "Kaihan Zhang", "Inhi Kim"],
    venue: "ICTCT Conference",
    year: 2024,
    type: "conference",
    tags: [],
  },
  {
    id: "tamakloe-2024-school-zones",
    title:
      "Differences Between Pedestrian Injury Severity Determinants at School and Non-School Zones: New Findings from Streetscape Quality Factors",
    authors: ["Reuben Tamakloe", "Kaihan Zhang", "Asim Alogaili", "Inhi Kim"],
    venue: "ICTCT Conference",
    year: 2024,
    type: "conference",
    tags: [],
  },
  {
    id: "park-2024-micromobility-ictct",
    title:
      "Micro Mobility Safety Challenges: A Study on Drivers Overtaking Bicycles and E-Scooters in Relation to Road Conditions and Prior Riding Experience",
    authors: ["Hyunchul Park", "Taeho Oh", "Jaehyuck Lim", "Inhi Kim"],
    venue: "Transportation Research Part F: Traffic Psychology and Behaviour 117, 103482",
    year: 2026,
    type: "journal",
    tags: [],
  },
  {
    id: "lin-2024-relative-ttc",
    title:
      "Predicted Relative Time-to-Collision: Evaluating Pedestrian Potential Risk at Non-Signalized Intersections",
    authors: ["Tengfeng Lin", "Zhixiong Jin", "Hwasoo Yeo", "Inhi Kim"],
    venue: "ICTCT Conference",
    year: 2024,
    type: "conference",
    tags: [],
  },
  {
    id: "zhang-2024-elderly-imagery",
    title:
      "Factors Influencing Injury Severity Among Elderly Pedestrians — Insights from Urban Imagery and Explainable Machine Learning",
    authors: ["Kaihan Zhang", "Reuben Tamakloe", "Inhi Kim"],
    venue: "ICTCT Conference",
    year: 2024,
    type: "conference",
    tags: [],
  },
  {
    id: "cho-2024-transit-geospatial",
    title:
      "Evaluating the Sustainable Urban Mobility for Public Transit Incorporating Geospatial Modeling Approach",
    authors: ["Shin-Hyung Cho", "Kitae Jang", "Inhi Kim", "Shin Hyoung Park"],
    venue: "Transit Data 2024",
    year: 2024,
    type: "conference",
    tags: [],
  },
  {
    id: "park-2024-drt-taxi",
    title:
      "Is It Possible to Substitute the Taxi Travel Demand to Demand Responsive Transport?",
    authors: [
      "Hyunsu Park",
      "Shin-Hyung Cho",
      "Inhi Kim",
      "Kitae Jang",
      "Shin Hyoung Park",
    ],
    venue: "Transit Data 2024",
    year: 2024,
    type: "conference",
    tags: [],
  },
  {
    id: "oh-2024-safe-overtaking",
    title:
      "Exploring Safe Overtaking Behavior Threshold Considering Human Interactions Using Multi-Agent Driving Simulator",
    authors: ["Taeho Oh", "Inhi Kim", "Zhibin Li"],
    venue: "TRB 103rd Annual Meeting",
    year: 2024,
    type: "conference",
    tags: [],
  },
  {
    id: "lim-2024-tunnel-information",
    title:
      "The Impact of Information Delivery System in Tunnels Depending on Lighting Intensity and Speed Limit",
    authors: ["Jaehyuck Lim", "Hyunchul Park", "Taeho Oh", "Inhi Kim"],
    venue: "TRB 103rd Annual Meeting",
    year: 2024,
    type: "conference",
    tags: [],
  },
  {
    id: "kwon-2024-population-synthesis",
    title:
      "Customized Deep Generative Models to Resolve the Sampling Bias in Population Synthesis",
    authors: ["Donghyun Kwon", "Eui-Jin Kim", "Inhi Kim"],
    venue: "TRB 103rd Annual Meeting",
    year: 2024,
    type: "conference",
    tags: [],
  },
  {
    id: "paek-2024-tram-equity",
    title: "Assessing Mass Circular Tram Service Equity in Metropolitan City",
    authors: ["Songmi Paek", "Hyungchul Chung", "Inhi Kim"],
    venue: "TRB 103rd Annual Meeting",
    year: 2024,
    type: "conference",
    tags: [],
  },
  {
    id: "jung-2024-ecomrl",
    title:
      "EcoMRL: Deep Reinforcement Learning-Based Traffic Signal Control for Urban Air Quality",
    authors: ["Jaeeun Jung", "Inhi Kim", "Jinwon Yoon"],
    venue: "International Journal of Sustainable Transportation 19 (8), 720-729",
    year: 2024,
    type: "journal",
    tags: [],
  },
  {
    id: "jang-2023-av-network",
    title:
      "Analyzing the Impact of Autonomous Vehicles on Urban Traffic Flow at the Large Scale Network Using Real-World Data",
    authors: ["Hyeokjun Jang", "Kitae Jang", "Inhi Kim"],
    venue: "IEEE ITSC 2023",
    year: 2023,
    type: "conference",
    tags: [],
  },
  {
    id: "kwon-2023-zeros",
    title:
      "Enhancing Deep Generative Models for Distinguishing Sampling Zeros and Structural Zeros in Population Synthesis",
    authors: ["Donghyun Kwon", "Inhi Kim"],
    venue: "hEART 2023 Symposium",
    year: 2023,
    type: "conference",
    tags: [],
  },
  {
    id: "jung-2023-visualization",
    title:
      "Open-Sourced Real-Time Visualization Platform for Traffic Simulation",
    authors: ["Jaeeun Jung", "Taeho Oh", "Inhi Kim", "Shinhyoung Park"],
    venue: "ANT Conference 2023",
    year: 2023,
    type: "conference",
    tags: [],
  },
  {
    id: "wu-2023-drl-signal",
    title:
      "Deep Reinforcement Learning Based Traffic Signal Control: A Comparative Analysis",
    authors: ["Chunliang Wu", "Inhi Kim", "Zhenliang Ma"],
    venue: "ANT Conference 2023",
    year: 2023,
    type: "conference",
    tags: [],
  },
  {
    id: "yoo-2023-platooning",
    title:
      "Impact on Platooning of Autonomous Vehicles Using Macro to Micro Simulations",
    authors: ["Yeji Yoo", "Tiantian Chen", "Kitae Jang", "Inhi Kim"],
    venue: "ANT Conference 2023",
    year: 2023,
    type: "conference",
    tags: [],
  },
  {
    id: "kwon-2023-network-imputation",
    title:
      "Large-Scale Network Imputation and Prediction of Traffic Volume Based on Multi-Source Data Collection System",
    authors: ["Donghyun Kwon", "Changhee Lee", "Heechan Kang", "Inhi Kim"],
    venue: "Transportation Research Record 2677 (9), 30-42",
    year: 2023,
    type: "journal",
    tags: [],
  },
  {
    id: "oh-2023-overtaking-ml",
    title:
      "Robust Overtaking Behavior with Human Interaction in Multi-Agent Driving Simulator Supported by Machine Learning",
    authors: ["Taeho Oh", "Inhi Kim", "Zhibin Li"],
    venue: "TRB 102nd Annual Meeting",
    year: 2023,
    type: "conference",
    tags: [],
  },
  {
    id: "nourmohammadi-2023-patrol-ship",
    title:
      "Designing Patrol Ship Routes Based on Multi Data Sources for Marine Environment",
    authors: [
      "Fatemeh Nourmohammadi",
      "Zahra Nourmohammadi",
      "Jinwoo Lee",
      "Inhi Kim",
    ],
    venue: "TRB 102nd Annual Meeting",
    year: 2023,
    type: "conference",
    tags: [],
  },
  {
    id: "park-2023-pedestrian-warning",
    title:
      "Effects of Driver's Braking Response by the Real-Time Pedestrian Scale Warning System",
    authors: ["Hyunchul Park", "Taeho Oh", "Inhi Kim"],
    venue: "TRB 102nd Annual Meeting",
    year: 2023,
    type: "conference",
    tags: [],
  },
  {
    id: "kwon-2022-astgcn-lstm",
    title:
      "Large Scale Multi-Source Traffic Flow Forecasting Based on Attention Based Spatio-Temporal Graph Convolutional Networks – LSTM",
    authors: ["Donghyun Kwon", "Taeho Oh", "Changhee Lee", "Inhi Kim"],
    venue: "ITS World Congress 2022",
    year: 2022,
    type: "conference",
    tags: [],
  },
  {
    id: "oh-2022-overtaking-mas",
    title:
      "Overtaking Maneuvers Using Multi-Agent Systems on a Two-Lane Two-Way Road",
    authors: ["Taeho Oh", "Inhi Kim"],
    venue: "ITS World Congress 2022",
    year: 2022,
    type: "conference",
    tags: [],
  },
  {
    id: "yoo-2022-platooning-network",
    title: "An Impact of Vehicles in the Platooning on the Road Network",
    authors: ["Yeji Yoo", "Donghyun Kwon", "Inhi Kim"],
    venue: "ITS World Congress 2022",
    year: 2022,
    type: "conference",
    tags: [],
  },
  {
    id: "park-2022-vr-treadmill",
    title: "Validation of Spatial Orientation Skill Using Virtual Reality Treadmill",
    authors: ["Hyunchul Park", "Taeho Oh", "Inhi Kim"],
    venue: "ITS World Congress 2022",
    year: 2022,
    type: "conference",
    tags: [],
  },
  {
    id: "kwon-2021-rse-calibration",
    title:
      "Traffic Data Calibration Collected by RSE Detectors Based on Deep Learning",
    authors: ["Donghyun Kwon", "Hyunchul Park", "Inhi Kim"],
    venue: "EASTS 2021",
    year: 2021,
    type: "conference",
    tags: [],
  },
  {
    id: "yoo-2021-sbrt-priority",
    title: "Priority Signal Effect on S-BRT (Super Bus Rapid Transit)",
    authors: ["Yeji Yoo", "J. Kang", "S. Park", "Inhi Kim"],
    venue: "EASTS 2021",
    year: 2021,
    type: "conference",
    tags: [],
  },
  {
    id: "nourmohammadi-2021-marine-ml",
    title:
      "Explore the Applicability of Machine Learning Method to Find Marine Causalities: A Case Study of Territorial Sea of South Korea",
    authors: ["Zahra Nourmohammadi", "Yeji Yoo", "Inhi Kim"],
    venue: "EASTS 2021",
    year: 2021,
    type: "conference",
    tags: [],
  },
  {
    id: "xu-2021-shared-streets-vr",
    title:
      "Explore the Applicability of Shared Streets with Virtual Reality Technology: A Case Study of Suzhou, China",
    authors: ["Lurong Xu", "Taeho Oh", "X. Hu", "Inhi Kim"],
    venue: "TRB 100th Annual Meeting",
    year: 2021,
    type: "conference",
    tags: [],
  },
  {
    id: "wang-2020-rail-mobility",
    title: "Revealing Mobility Regularities in Urban Rail Systems",
    authors: ["Bo Wang", "Inhi Kim"],
    venue: "ANT Conference 2020",
    year: 2020,
    type: "conference",
    tags: [],
  },
  {
    id: "wang-2020-cnn-transfer",
    title:
      "Short-Term Traffic Prediction Using a Spatial-Temporal CNN Model with Transfer Learning",
    authors: ["Bo Wang", "Hai Vu", "Inhi Kim"],
    venue: "TRB 99th Annual Meeting",
    year: 2020,
    type: "conference",
    tags: [],
  },
  {
    id: "xiao-2020-dockless-bike",
    title:
      "Inferring the Optimal Number of Dockless Shared Bike in a New Area by Applying the Gradient Boosting Decision Tree Model",
    authors: ["Dong Xiao", "Tianqi Gu", "Yuanqiu Bao", "Inhi Kim"],
    venue: "TRB 99th Annual Meeting",
    year: 2020,
    type: "conference",
    tags: [],
  },
  {
    id: "oh-2020-vr-hookturn",
    title:
      "The Use of Emerging Virtual Reality Technology in Road Safety Analysis: The Hook-Turn Case",
    authors: ["Taeho Oh", "Yanping Xu", "Zhibin Li", "Inhi Kim"],
    venue: "TRB 99th Annual Meeting",
    year: 2020,
    type: "conference",
    tags: [],
  },
  {
    id: "wu-2019-gwr-bike",
    title:
      "Exploring the Relationship Between Built Environment and Public Sharing Bike Flow in Suzhou, China Using Geographically Weighted Regression Model",
    authors: ["Chunliang Wu", "Inhi Kim"],
    venue: "TRB 98th Annual Meeting",
    year: 2019,
    type: "conference",
    tags: [],
  },
  {
    id: "jiang-2019-gp-imputation",
    title:
      "Imputation of Missing Transfer Passenger Flow with Self-Measuring Multi-Task Gaussian Process",
    authors: ["Wenhua Jiang", "Inhi Kim"],
    venue: "TRB 98th Annual Meeting",
    year: 2019,
    type: "conference",
    tags: [],
  },
  {
    id: "zheng-2019-lstm-parking",
    title:
      "An Analysis of Short-Term Available Parking Space Forecasting Method Based on LSTM Neural Network",
    authors: ["Meina Zheng", "Inhi Kim"],
    venue: "TRB 98th Annual Meeting",
    year: 2019,
    type: "conference",
    tags: [],
  },
  {
    id: "nguyen-2019-turn-signal",
    title:
      "Turn Signal Use Among Car Drivers and Motorcyclists at Intersections: A Case Study of Danang, Vietnam",
    authors: ["Duy Nguyen-Phuoc", "Inhi Kim"],
    venue: "TRB 98th Annual Meeting",
    year: 2019,
    type: "conference",
    tags: [],
  },
  {
    id: "sabban-2019-sem-satisfaction",
    title:
      "User Satisfaction of the Road Network: A Structural Equation Model",
    authors: ["Khaled Sabban", "Inhi Kim"],
    venue: "TRB 98th Annual Meeting",
    year: 2019,
    type: "conference",
    tags: [],
  },
  {
    id: "wu-2018-mobility-network",
    title:
      "Exploring Human Mobility Pattern Using Complex Network Theory and Spatial Econometric Model",
    authors: ["Chunliang Wu", "Inhi Kim", "Zhiyuan Liu"],
    venue: "HKSTS 2018",
    year: 2018,
    type: "conference",
    tags: [],
  },
  {
    id: "chen-2018-parallel-ue",
    title:
      "Parallel Computing for User Equilibrium Problem in a Cluster with Integrated Computing Resources",
    authors: ["Xinyuan Chen", "Zhiyuan Liu", "Inhi Kim"],
    venue: "HKSTS 2018",
    year: 2018,
    type: "conference",
    tags: [],
  },
  {
    id: "xu-2018-pnr",
    title:
      "Optimal Sitting and Sizing of the Remote Park-and-Ride Scheme in the Multimodal Transport Network",
    authors: ["X. Xu", "Zhiyuan Liu", "Inhi Kim"],
    venue: "TRB 97th Annual Meeting",
    year: 2018,
    type: "conference",
    tags: [],
  },
  {
    id: "song-2017-gated-community",
    title: "Perspectives of Opening a Gated Community and Its Effect",
    authors: ["C. Song", "Yuanqiu Bao", "Tianqi Gu", "Inhi Kim"],
    venue: "CICTP 2017",
    year: 2017,
    type: "conference",
    tags: [],
  },
  {
    id: "xu-2017-road-rage",
    title: "Understanding Road Rage: Insights from a Synthesis of Research",
    authors: ["X. Xu", "H. Lin", "Zhiyuan Liu", "Inhi Kim"],
    venue: "CICTP 2017",
    year: 2017,
    type: "conference",
    tags: [],
  },
  {
    id: "zhu-2017-stop-and-go",
    title:
      "Analysis of Vehicle Stop-and-Go Driving Behaviors at Signalized Intersections",
    authors: ["S. Zhu", "Inhi Kim", "Q. Zhao", "G. Song", "L. Yu"],
    venue: "CICTP 2017",
    year: 2017,
    type: "conference",
    tags: [],
  },
  {
    id: "chen-2017-pnr-schemes",
    title: "Modelling Asymmetric and Non-Additive P&R Schemes",
    authors: ["Xinyuan Chen", "Zhiyuan Liu", "Inhi Kim", "Q. Cheng", "Z. Chen"],
    venue: "CICTP 2017",
    year: 2017,
    type: "conference",
    tags: [],
  },
  {
    id: "wu-2017-bike-network",
    title:
      "Analysis of Public Bicycle Sharing Network Based on Complex Network Theory",
    authors: ["Chunliang Wu", "Y. Shao", "Kun An", "Inhi Kim"],
    venue: "CICTP 2017",
    year: 2017,
    type: "conference",
    tags: [],
  },
  {
    id: "wang-2017-illegal-parking",
    title: "Social Media Application for Illegal Parking Problem",
    authors: ["Bo Wang", "L. Hua", "Inhi Kim"],
    venue: "CICTP 2017",
    year: 2017,
    type: "conference",
    tags: [],
  },
  {
    id: "cao-2017-lane-change-conflict",
    title:
      "A Study of Lane Change Behavior of Heavy Vehicle and Passenger Car on the Influence of Conflict",
    authors: ["Xiaoying Cao", "William Young", "Majid Sarvi", "Inhi Kim"],
    venue: "TRB 96th Annual Meeting",
    year: 2017,
    type: "conference",
    tags: [],
  },
  {
    id: "zhu-2017-vsp",
    title:
      "Analysis of Vehicle-Specific Power Distribution of Stop-and-Go Behaviors at Signalized Intersections",
    authors: ["S. Zhu", "Inhi Kim", "Luis Ferreira"],
    venue: "TRB 96th Annual Meeting",
    year: 2017,
    type: "conference",
    tags: [],
  },
  {
    id: "sabban-2017-red-light",
    title:
      "Using Structural Equation Modeling to Understand Red Light Running Related Crashes",
    authors: ["Khaled Sabban", "Inhi Kim"],
    venue: "TRB 96th Annual Meeting",
    year: 2017,
    type: "conference",
    tags: [],
  },
  {
    id: "cao-2016-lane-change-atrf",
    title:
      "A Study of Mandatory Lane-Changing Execution Behaviour Model Considering Conflicts",
    authors: ["Xiaoying Cao", "William Young", "Inhi Kim"],
    venue: "ATRF 2016",
    year: 2016,
    type: "conference",
    tags: [],
  },
  {
    id: "jing-2016-ev-assignment",
    title:
      "Stochastic Traffic Assignment of Electric Vehicle with Path Distance",
    authors: ["Wentao Jing", "Zhiyuan Liu", "Inhi Kim", "Mohsen Ramezani"],
    venue: "ISTS & IWTDCS 2016, Jeju",
    year: 2016,
    type: "conference",
    tags: [],
  },
  {
    id: "liu-2016-pnr-feeder",
    title:
      "A New Model for Rail-Based Park-and-Ride with Feeder Bus Services",
    authors: ["Zhiyuan Liu", "Xinyuan Chen", "Inhi Kim"],
    venue: "ISTS & IWTDCS 2016, Jeju",
    year: 2016,
    type: "conference",
    tags: [],
  },
  {
    id: "han-2016-frame-signal",
    title:
      "Frame Signal Control Based on Traffic Condition Using Estimated Data in Korea",
    authors: ["J. Han", "T. Kim", "S. Lee", "Inhi Kim"],
    venue: "23rd ITS World Congress, Melbourne",
    year: 2016,
    type: "conference",
    tags: [],
  },
  {
    id: "rose-2016-level-crossing",
    title:
      "An ITS Application to Predict Urban Railway Level Crossing Closure Times",
    authors: ["Geoff Rose", "Inhi Kim", "T. Jones"],
    venue: "23rd ITS World Congress, Melbourne",
    year: 2016,
    type: "conference",
    tags: [],
  },
  {
    id: "cao-2016-lane-change-trb",
    title:
      "A Study of Mandatory Lane-Changing Execution Behaviour Model for Heavy Vehicles and Passenger Cars",
    authors: ["Xiaoying Cao", "William Young", "Majid Sarvi", "Inhi Kim"],
    venue: "TRB 95th Annual Meeting",
    year: 2016,
    type: "conference",
    tags: [],
  },
  {
    id: "kim-2015-level-crossing-sim",
    title:
      "Traffic Safety at Road-Rail Level Crossings Using a Driving Simulator and Traffic Simulation",
    authors: [
      "Inhi Kim",
      "G. S. Larue",
      "Luis Ferreira",
      "A. Rakotonirainy",
      "Khaled Sabban",
    ],
    venue: "TRB 94th Annual Meeting",
    year: 2015,
    type: "conference",
    tags: [],
  },
  {
    id: "sabban-2015-simtraffic-vissim",
    title:
      "Comparison of SimTraffic and Vissim Microscopic Traffic Simulation Tools in Modeling Roundabouts",
    authors: ["Khaled Sabban", "Inhi Kim"],
    venue: "ANT 2015, Greenwich",
    year: 2015,
    type: "conference",
    tags: [],
  },
  {
    id: "kim-2013-pedestrian-los",
    title:
      "A Study of Delay-Based Level of Service on Pedestrian Facility",
    authors: ["Inhi Kim", "H. Kang"],
    venue: "36th Australasian Transport Research Forum, Brisbane",
    year: 2013,
    type: "conference",
    tags: [],
  },
  {
    id: "kim-2013-level-crossing-its",
    title:
      "Evaluating ITS Interventions at Railway Level Crossings Using a Driving Simulator",
    authors: [
      "Inhi Kim",
      "G. S. Larue",
      "Luis Ferreira",
      "A. Tavassoli",
      "A. Rakotonirainy",
    ],
    venue: "36th Australasian Transport Research Forum, Brisbane",
    year: 2013,
    type: "conference",
    tags: [],
  },
  {
    id: "larue-2012-comprail",
    title:
      "Integrating Driving and Traffic Simulator to Study Railway Level Crossing Safety Interventions — A Methodology",
    authors: ["G. S. Larue", "Inhi Kim", "A. Rakotonirainy", "Luis Ferreira"],
    venue: "COMPRAIL 2012, New Forest",
    year: 2012,
    type: "conference",
    tags: [],
  },
  {
    id: "tey-2012-level-crossing",
    title:
      "Evaluating Safety at Railway Level Crossings Using Micro-Simulation Modelling",
    authors: ["L. S. Tey", "Inhi Kim", "Luis Ferreira"],
    venue: "TRB 91st Annual Meeting",
    year: 2012,
    type: "conference",
    tags: [],
  },
  {
    id: "galiza-2009-pedestrian-microsim",
    title:
      "Modelling Pedestrian Circulation in Rail Transit Stations Using Micro-Simulation",
    authors: ["R. Galiza", "Inhi Kim", "Luis Ferreira", "J. Laufer"],
    venue: "ATRF 2009, Auckland",
    year: 2009,
    type: "conference",
    tags: [],
  },
  {
    id: "kim-2017-traffic-flow-chapter",
    title:
      "Traffic Flow Theory and Relationships, in 'Traffic Engineering and Management'",
    authors: ["Inhi Kim", "Kun An"],
    venue: "Monash Institute of Transport Studies",
    year: 2017,
    type: "book",
    tags: [],
  },
  {
    id: "wu-2021-encyclopedia",
    title: "International Encyclopedia of Transportation",
    authors: ["L. Wu", "Inhi Kim"],
    venue: "Elsevier",
    year: 2021,
    type: "book",
    tags: [],
  },
];

/**
 * Imported from the previous site's NEWS posts (WordPress export
 * 2026-07-02), covering the KAIST era (Feb 2023 –). Older Monash/Kongju-era
 * posts remain in the XML for the Notion migration.
 */
const NEWS: NewsItem[] = [
  {
    id: "2026-06-korail-award",
    date: "2026-06-15",
    titleKo: "코레일 파견 석사과정, 수석 졸업",
    titleEn: "Best Korail Student Awards",
    summaryKo:
      "코레일 파견 석사과정 백지혜·홍충교 학생이 최우수 학생으로 졸업했습니다.",
    summaryEn:
      "Korail master's students Jihye Baek and Chunggyo Hong graduated as the top students of their cohort.",
    category: "award",
  },
  {
    id: "2026-05-iitp-grant",
    date: "2026-05-15",
    titleKo: "IITP 생성형 AI 선도인재 양성사업 선정",
    titleEn: "New Grant from IITP",
    summaryKo:
      "김인희 교수 연구팀이 롯데이노베이트와 함께 2026 생성형 AI 선도인재 양성사업(Physical AI)에 선정되었습니다.",
    summaryEn:
      "A team led by Prof. Inhi Kim was selected for the 2026 Generative AI Leading Talent Cultivation Program, spearheading Physical AI talent development with Lotte Innovate.",
    category: "grant",
  },
  {
    id: "2026-04-meng-li-joins",
    date: "2026-04-20",
    titleKo: "Dr. Meng Li 합류",
    titleEn: "Dr. Meng Li Joins",
    summaryKo:
      "NTU(싱가포르) 리서치 펠로우 출신 Dr. Meng Li가 박사후연구원으로 합류했습니다.",
    summaryEn:
      "Dr. Meng Li joined TUPA as a postdoctoral researcher, coming from Nanyang Technological University, Singapore.",
    category: "people",
  },
  {
    id: "2026-03-fan-wu-joins",
    date: "2026-03-11",
    titleKo: "Dr. Fan Wu 합류",
    titleEn: "Welcoming Dr. Fan Wu",
    summaryKo:
      "University of Alberta 출신 Dr. Fan Wu가 박사후연구원으로 합류했습니다.",
    summaryEn:
      "Dr. Fan Wu from the University of Alberta joined TUPA as a postdoctoral fellow.",
    category: "people",
  },
  {
    id: "2025-12-ministers-award",
    date: "2025-12-03",
    titleKo: "국토교통부 장관상 대상 수상",
    titleEn: "Grand Prize — Minister's Award",
    summaryKo:
      "TCIS 인턴 Yunha가 '구급차 이송 자동화 AI 에이전트 시스템'으로 국토교통 서비스 아이디어 공모전 대상(장관상)을 수상했습니다.",
    summaryEn:
      "Intern Yunha won the Grand Prize (Minister of Land, Infrastructure and Transport Award) for an ambulance transport automation AI agent system.",
    category: "award",
  },
  {
    id: "2025-10-junyuk-nrf-scholarship",
    date: "2025-10-22",
    titleKo: "이준욱, NRF 석사 우수장학금 선정",
    titleEn: "NRF Scholarship for Junyuk",
    summaryKo:
      "이준욱 석사과정 학생이 이공계 석사 우수장학금(STEM)에 선정되었습니다.",
    summaryEn:
      "Junyuk Lee was awarded the national Master's Excellence Scholarship (STEM).",
    category: "award",
  },
  {
    id: "2025-10-kaihan-aotule",
    date: "2025-10-12",
    titleKo: "Kaihan, AOTULE 컨퍼런스 2025 참가",
    titleEn: "Kaihan at AOTULE Conference 2025",
    summaryKo:
      "Kaihan Zhang이 칭화대(베이징)에서 열린 AOTULE 컨퍼런스 학생 프로그램에 선발되어 참가했습니다.",
    summaryEn:
      "Kaihan Zhang was selected for and attended the AOTULE Conference 2025 student program at Tsinghua University, Beijing.",
    category: "general",
  },
  {
    id: "2025-09-jaehyuk-scholarship",
    date: "2025-09-26",
    titleKo: "임재혁, 박창호 장학금 수상",
    titleEn: "Jaehyuk Lim on Park Chang-ho Scholarship",
    summaryKo: "임재혁 학생이 박창호 장학금을 수상했습니다.",
    summaryEn: "Jaehyuk Lim was awarded the Park Chang-ho Scholarship.",
    category: "award",
  },
  {
    id: "2025-09-changhee-ptv-best",
    date: "2025-09-24",
    titleKo: "김창희, KAIST-PTV 인턴십 최우수 선정",
    titleEn: "Chang-Hee Kim — Best Student, KAIST-PTV Internship",
    summaryKo:
      "김창희 학부연구생이 KAIST-PTV 그룹 1기 인턴십 프로그램 최우수 학생으로 선정되어 PTV 그룹의 초청을 받았습니다.",
    summaryEn:
      "Undergraduate researcher Chang-Hee Kim was named Best Student of the inaugural KAIST-PTV Group internship program.",
    category: "award",
  },
  {
    id: "2025-09-chungkyo-award",
    date: "2025-09-12",
    titleKo: "홍충교, 최우수 학생상 수상",
    titleEn: "Chung-kyo Hong — Outstanding Student Award",
    summaryKo:
      "코레일 파견 홍충교 학생이 2025 봄학기 최우수 학생으로 선정되었습니다.",
    summaryEn:
      "Chung-kyo Hong (KORAIL) was honored as the top student of the Spring 2025 semester.",
    category: "award",
  },
  {
    id: "2025-08-ptv-certified-trainer",
    date: "2025-08-25",
    titleKo: "국내 최초 PTV 공인 트레이너 배출",
    titleEn: "PTV Certified Trainers at KAIST",
    summaryKo:
      "김인희 교수, 오태호 박사, 김태균 연구원이 국내 최초로 PTV 공인 트레이너 자격을 취득했습니다.",
    summaryEn:
      "Prof. Inhi Kim, Dr. Taeho Oh, and researcher Tae-kyun Kim became Korea's first PTV Certified Trainers.",
    category: "general",
  },
  {
    id: "2025-08-truyen-joins",
    date: "2025-08-25",
    titleKo: "신입 석사과정 Truyen Le-Minh 합류",
    titleEn: "A New Master's Student",
    summaryKo:
      "베트남 출신 Truyen Le-Minh 학생이 석사과정으로 합류했습니다.",
    summaryEn:
      "Truyen Le-Minh from Vietnam joined TUPA as a master's student.",
    category: "people",
  },
  {
    id: "2025-06-irsc-visit",
    date: "2025-06-16",
    titleKo: "NSF IRSC 프로그램, TUPA 방문",
    titleEn: "IRSC Visits KAIST",
    summaryKo:
      "NSF 지원 Interdisciplinary Research in Smart City(IRSC) 프로그램 2025 스콜라들이 TUPA를 방문해 스마트시티 연구를 논의했습니다.",
    summaryEn:
      "Scholars of the NSF-funded IRSC program visited TUPA to discuss the latest smart-city research with KAIST students.",
    category: "general",
  },
  {
    id: "2025-05-suwon-its-best-paper",
    date: "2025-05-28",
    titleKo: "2025 수원 ITS AP 포럼 우수논문상",
    titleEn: "2025 Suwon ITS AP Best Paper Award",
    summaryKo:
      "공유 전동킥보드 통행 목적 분류 연구로 2025 수원 ITS AP 포럼에서 우수논문상을 수상했습니다.",
    summaryEn:
      "A data-driven study on dockless shared e-scooter trip purpose classification won the Best Paper Award at the 2025 Suwon ITS AP Forum.",
    category: "award",
  },
  {
    id: "2025-05-urp-recruiting",
    date: "2025-05-13",
    titleKo: "TUPA+PTV 그룹 인턴·URP 모집",
    titleEn: "TUPA + PTV Group Intern and URP",
    summaryKo:
      "KAIST 학부생 대상 URP 프로그램과 PTV 그룹 연계 인턴십을 운영했습니다 (2025.6–12).",
    summaryEn:
      "TUPA ran the KAIST URP program and a PTV Group-linked internship for undergraduates (Jun–Dec 2025).",
    category: "general",
  },
  {
    id: "2025-04-yongsan-forum",
    date: "2025-04-28",
    titleKo: "용산국제업무지구 미래교통포럼",
    titleEn: "Yongsan International Business District Forum",
    summaryKo:
      "코레일이 주최한 '용산국제업무지구 미래교통포럼'에 참여했습니다.",
    summaryEn:
      "TUPA took part in KORAIL's Yongsan International Business District Future Transportation Forum.",
    category: "general",
  },
  {
    id: "2025-04-reuben-jys-fellow",
    date: "2025-04-11",
    titleKo: "루벤 타마클로, 2025 장영실 펠로우 선정",
    titleEn: "2025 Jang Young Sil Fellow — Dr. Reuben Tamakloe",
    summaryKo:
      "Dr. Reuben Tamakloe가 KAIST 2025 장영실 펠로우 프로그램에 선정되었습니다.",
    summaryEn:
      "Dr. Reuben Tamakloe was selected for KAIST's prestigious 2025 Jang Young Sil Fellow Program.",
    category: "award",
  },
  {
    id: "2025-01-multra-best-article",
    date: "2025-01-17",
    titleKo: "Multimodal Transportation 2024 최우수 논문상",
    titleEn: "2024 Best Article Award in Multra",
    summaryKo:
      "진화게임이론으로 택시·호출차량 운영 전략을 분석한 논문이 Multimodal Transportation 저널 2024 최우수 논문상을 수상했습니다.",
    summaryEn:
      "A paper using evolutionary game theory to analyse taxi and ride-hailing operating strategies won the 2024 Best Article Award in Multimodal Transportation.",
    category: "award",
  },
  {
    id: "2025-01-trb-outstanding-paper",
    date: "2025-01-08",
    titleKo: "TRB 104th 우수논문상 (만점 평가)",
    titleEn: "Outstanding Paper Award in TRB",
    summaryKo:
      "TRB 104차 연차대회 자전거교통위원회에서 10점 만점의 최고 평가로 우수논문상을 수상했습니다.",
    summaryEn:
      "TUPA received the Outstanding Paper Award from the TRB bicycle transportation committee, ranked first with a perfect score of 10/10.",
    category: "award",
  },
  {
    id: "2024-11-asean-rok-hrd",
    date: "2024-11-28",
    titleKo: "2024 ASEAN-ROK 인적자원개발 프로그램",
    titleEn: "2024 ASEAN-ROK HRD Program (Smart Mobility)",
    summaryKo:
      "ASEAN 10개국 교통공무원 16명이 스마트 모빌리티 인적자원개발 프로그램으로 KAIST를 방문했습니다.",
    summaryEn:
      "Sixteen transportation officials from ASEAN countries visited KAIST through the 2024 ASEAN-ROK Human Resource Development Program.",
    category: "general",
  },
  {
    id: "2024-11-stom-atm",
    date: "2024-11-22",
    titleKo: "ASEAN 교통장관회의 로드맵 발표",
    titleEn: "STOM and ATM",
    summaryKo:
      "김인희 교수가 쿠알라룸푸르 STOM(58차)·ATM(30차)에서 ASEAN-ROK 교통 로드맵 2026–2030을 발표했습니다.",
    summaryEn:
      "Prof. Inhi Kim presented the ASEAN-ROK transport roadmap 2026–2030 at the 58th STOM and the 30th ASEAN Transport Ministers Meeting in Kuala Lumpur.",
    category: "general",
  },
  {
    id: "2024-11-naepo-institute",
    date: "2024-11-13",
    titleKo: "KAIST 모빌리티연구소 내포 개소",
    titleEn: "KAIST Mobility Institute in Naepo",
    summaryKo:
      "충남 내포신도시에 KAIST 모빌리티연구소가 개소했습니다.",
    summaryEn:
      "The KAIST Mobility Institute officially opened in Naepo New Town, South Chungcheong Province.",
    category: "general",
  },
  {
    id: "2024-11-un-escap",
    date: "2024-11-05",
    titleKo: "제8차 UN ESCAP 교통위원회 참여",
    titleEn: "8th UN ESCAP Transport Committee",
    summaryKo:
      "UN ESCAP 교통위원회 8차 세션의 'Smart Mobility in ASEAN' 사이드 이벤트에 참여했습니다.",
    summaryEn:
      "TUPA joined the side event 'Smart Mobility in ASEAN' at the eighth session of the UN ESCAP Committee on Transport.",
    category: "general",
  },
  {
    id: "2024-10-ictct-6-papers",
    date: "2024-10-19",
    titleKo: "ICTCT 2024 논문 6편 발표",
    titleEn: "Six Papers at ICTCT 2024",
    summaryKo:
      "교통안전 국제학회 ICTCT 2024에서 TUPA 논문 6편을 발표했습니다.",
    summaryEn:
      "TUPA presented six papers at the 2024 ICTCT conference on traffic safety.",
    category: "publication",
  },
  {
    id: "2024-09-postdoc-fund",
    date: "2024-09-02",
    titleKo: "박사후연구원 성장형 공동연구 과제 선정",
    titleEn: "Post-doctoral Collaborative Research Fund",
    summaryKo:
      "윤진원 박사(PI), 루벤·전경훈 박사 팀이 메타버스 기반 테스트베드 과제로 박사후연구원 성장형 공동연구 지원사업에 선정되었습니다.",
    summaryEn:
      "Jinwon (PI) with Reuben and Gyounghoon were awarded the Post-Doctoral Growth-Oriented Collaborative Research Fund for a metaverse-based testbed project.",
    category: "grant",
  },
  {
    id: "2024-09-jaeeun-nrf-fund",
    date: "2024-09-02",
    titleKo: "정재은, NRF 박사과정생 연구장려금 선정",
    titleEn: "Graduate Student Research Fund for Jaeeun",
    summaryKo:
      "정재은 학생이 혼재교통 온실가스 저감 교통운영 최적화 연구로 NRF 연구장려금을 받았습니다.",
    summaryEn:
      "Jaeeun Jung received the NRF Graduate Student Research Encouragement Fund for research on optimising traffic operations in mixed AV environments to cut greenhouse gas emissions.",
    category: "grant",
  },
  {
    id: "2024-07-hyunchul-scholarship",
    date: "2024-07-26",
    titleKo: "박현철, 김영한 글로벌리더 장학생 선정",
    titleEn: "Hyunchul Wins Scholarship",
    summaryKo:
      "박현철 석사과정 학생이 김영한 글로벌리더 장학생으로 선정되었습니다.",
    summaryEn:
      "Master's student Hyunchul Park was selected as a Kim Young-han Global Leader Scholarship recipient.",
    category: "award",
  },
  {
    id: "2024-05-its-best-presentation",
    date: "2024-05-09",
    titleKo: "한국ITS학회 최우수 발표상 2건",
    titleEn: "Best Presentation Awards from ITS Conference",
    summaryKo:
      "Tengfeng Lin과 정재은 학생이 2024 한국ITS학회(제주)에서 최우수 발표상을 수상했습니다.",
    summaryEn:
      "Tengfeng Lin and Jaeeun Jung won best presentation awards at the 2024 Korea ITS conference in Jeju.",
    category: "award",
  },
  {
    id: "2024-04-donghyun-young-scholar",
    date: "2024-04-30",
    titleKo: "권동현, MESH Young Scholar Award 수상",
    titleEn: "Young Scholar Award",
    summaryKo:
      "권동현 학생이 우수 석사논문으로 MESH(Mobility Ecology Summit Hour) Young Scholar Award를 수상했습니다.",
    summaryEn:
      "Donghyun Kwon received the Young Scholar Award from MESH for his master's thesis.",
    category: "award",
  },
  {
    id: "2024-04-tu-berlin-seminar",
    date: "2024-04-22",
    titleKo: "TU Berlin–KAIST 세미나",
    titleEn: "TU Berlin – KAIST Seminar",
    summaryKo:
      "TU Berlin의 Dietmar Göhlich, Sangyoung Park 교수를 초청해 격년 세미나를 개최했습니다.",
    summaryEn:
      "TUPA hosted Profs. Dietmar Göhlich and Sangyoung Park from TU Berlin for the biannual research seminar.",
    category: "general",
  },
  {
    id: "2024-04-hyunchul-ta-award",
    date: "2024-04-19",
    titleKo: "박현철, 우수조교상 수상",
    titleEn: "Outstanding TA Award — Hyunchul Park",
    summaryKo: "박현철 학생이 우수조교상을 수상했습니다.",
    summaryEn: "Hyunchul Park received the Outstanding Teaching Assistant Award.",
    category: "award",
  },
  {
    id: "2024-04-hyunchul-nrf-fund",
    date: "2024-04-01",
    titleKo: "박현철, NRF 연구장려금 선정",
    titleEn: "NRF Award",
    summaryKo:
      "박현철 학생이 자율주행 안전성 테스트용 공격적 보행자 모델 연구로 NRF 연구장려금을 받았습니다.",
    summaryEn:
      "Hyunchul Park received the NRF Graduate Student Research Encouragement Fund for developing an aggressive pedestrian model for AV safety testing.",
    category: "grant",
  },
  {
    id: "2024-02-hyunchul-kst-award",
    date: "2024-02-02",
    titleKo: "박현철, 대한교통학회 우수 졸업생 표창",
    titleEn: "Hyunchul Park Award",
    summaryKo:
      "박현철 학생이 대한교통학회로부터 교통공학 분야 우수 졸업생으로 표창받았습니다.",
    summaryEn:
      "Hyunchul Park was recognised by the Korean Society of Transportation as an outstanding graduate in transportation engineering.",
    category: "award",
  },
  {
    id: "2024-01-teleoperation-mou",
    date: "2024-01-25",
    titleKo: "원격제어 기술 협력 MOU 체결",
    titleEn: "MOU on Teleoperation Technology",
    summaryKo:
      "KAIST 친환경스마트자동차연구센터가 KISTI·토렌토시스템즈·이모션과 자율주행 테스트베드 구축 MOU를 체결했습니다.",
    summaryEn:
      "KAIST signed an MOU with KISTI, Torento Systems, and Emotion to build an autonomous-driving testbed with teleoperation technology.",
    category: "general",
  },
  {
    id: "2023-12-startup-contest",
    date: "2023-12-15",
    titleKo: "제1회 스타트업 아이디어 콘테스트",
    titleEn: "Startup Idea Contest",
    summaryKo:
      "교통그룹 제1회 스타트업 아이디어 콘테스트가 열렸습니다.",
    summaryEn:
      "The transport group held its first startup idea contest.",
    category: "general",
  },
  {
    id: "2023-12-deep-mobility",
    date: "2023-12-04",
    titleKo: "딥모빌리티 컨소시엄 출범",
    titleEn: "Deep Mobility Consortium",
    summaryKo:
      "대전시·첨단기업들과 함께 딥모빌리티 컨소시엄이 출범했으며, 대전시장과 KAIST 총장이 참석했습니다.",
    summaryEn:
      "The Deep Mobility Consortium launched with Daejeon City and high-tech companies, celebrated by the mayor and the KAIST president.",
    category: "general",
  },
  {
    id: "2023-11-qday-award",
    date: "2023-11-28",
    titleKo: "KAIST Q-Day 교원 특별상 수상",
    titleEn: "KAIST Q-Day Faculty Special Awards",
    summaryKo:
      "김인희 교수 팀이 2023 KAIST Q-Day 교원 특별상(국제화 부문)을 수상했습니다.",
    summaryEn:
      "Prof. Inhi Kim's team won the 2023 KAIST Q-Day Faculty Special Award in the internationalisation category.",
    category: "award",
  },
  {
    id: "2023-10-trips-award",
    date: "2023-10-19",
    titleKo: "수도권 교통혁신 공모전 수상",
    titleEn: "TRIPS Competition Award",
    summaryKo:
      "김민·백송미·전경훈 박사 팀이 2023 수도권 대중교통 혁신 공모전에서 수상했습니다.",
    summaryEn:
      "Min Kim, Songmi Paek, and Dr. Kyunghoon Chun won an award at the 2023 Metropolitan Area Transportation Innovation Competition.",
    category: "award",
  },
  {
    id: "2023-07-summer-camp",
    date: "2023-07-25",
    titleKo: "2023 모빌리티 서머캠프 (제주)",
    titleEn: "2023 Mobility Summer Camp",
    summaryKo:
      "KAIST 제주캠퍼스에서 18개 워크숍으로 구성된 첫 모빌리티 서머캠프를 열었습니다.",
    summaryEn:
      "The first mobility summer camp ran on KAIST's Jeju campus with 18 workshops.",
    category: "general",
  },
  {
    id: "2023-05-nyu-president",
    date: "2023-05-29",
    titleKo: "NYU 총장 KAIST 방문",
    titleEn: "NYU President Linda in KAIST",
    summaryKo: "NYU Linda Mills 총장이 KAIST를 방문했습니다.",
    summaryEn: "NYU President Linda Mills visited KAIST.",
    category: "general",
  },
  {
    id: "2023-05-molit-minister-visit",
    date: "2023-05-16",
    titleKo: "원희룡 국토교통부 장관 KAIST 방문",
    titleEn: "MOLIT Minister Visits KAIST",
    summaryKo:
      "국토교통부가 KAIST 창업원에서 '국토교통부×스타트업 커피챗' 행사를 개최했습니다.",
    summaryEn:
      "The Minister of Land, Infrastructure and Transport visited KAIST for the MOLIT × Startup Coffee Chat event.",
    category: "general",
  },
  {
    id: "2023-05-fatemeh-unsw",
    date: "2023-05-10",
    titleKo: "Fatemeh, UNSW 박사과정 진학",
    titleEn: "Fatemeh Joins UNSW for Ph.D.",
    summaryKo:
      "Fatemeh Nourmohammadi가 UNSW 박사과정에 진학합니다.",
    summaryEn:
      "Fatemeh Nourmohammadi is joining UNSW for her Ph.D.",
    category: "people",
  },
  {
    id: "2023-05-chunliang-uwa",
    date: "2023-05-10",
    titleKo: "Dr. Chunliang Wu, UWA 교수 임용",
    titleEn: "Dr. Chunliang Wu — Faculty at UWA",
    summaryKo:
      "Dr. Chunliang Wu가 University of Western Australia 교수직 오퍼를 받아 2023년 9월 부임합니다.",
    summaryEn:
      "Dr. Chunliang Wu received a faculty offer from the University of Western Australia, starting September 2023.",
    category: "people",
  },
  {
    id: "2023-05-lily-visit",
    date: "2023-05-01",
    titleKo: "Prof. Lily Elefteriadou 초청 세미나",
    titleEn: "Lily Visits KAIST",
    summaryKo:
      "플로리다대 Lily Elefteriadou 교수가 CAV 기반 교통운영 개선을 주제로 세미나를 했습니다.",
    summaryEn:
      "Prof. Lily Elefteriadou (University of Florida) gave a talk on leveraging CAV capabilities to improve traffic operations.",
    category: "general",
  },
  {
    id: "2023-04-its-best-paper",
    date: "2023-04-21",
    titleKo: "한국ITS학회 우수논문상",
    titleEn: "Best Paper Award — Korea ITS",
    summaryKo:
      "김재혁·오태호·박현철이 한국ITS학회에서 우수논문상을 수상했습니다.",
    summaryEn:
      "Jaehyuk Kim, Taeho Oh, and Hyunchul Park won the best paper award at the Korea ITS conference.",
    category: "award",
  },
  {
    id: "2023-04-mobility-show",
    date: "2023-04-09",
    titleKo: "2023 서울모빌리티쇼 전시",
    titleEn: "TUPA in the Mobility Show",
    summaryKo:
      "조천식모빌리티대학원을 대표해 멀티에이전트 메타버스 플랫폼을 2023 서울모빌리티쇼에 전시했습니다.",
    summaryEn:
      "TUPA exhibited its multi-agent metaverse platform at the 2023 Seoul Mobility Show on behalf of the Cho Chun Shik Graduate School of Mobility.",
    category: "general",
  },
  {
    id: "2023-02-inhi-joins-kaist",
    date: "2023-02-14",
    titleKo: "김인희 교수, KAIST 부임",
    titleEn: "Inhi Joins KAIST",
    summaryKo:
      "김인희 교수가 2023년 1월 1일 자로 KAIST 부교수로 부임하며 TUPA의 새 장이 시작되었습니다.",
    summaryEn:
      "Dr. Inhi Kim was appointed associate professor at KAIST on 1 January 2023, opening a new chapter for TUPA.",
    category: "people",
  },
];

/** Research areas — the professor's five pillars (updated 2026-07). */
const RESEARCH_AREAS: ResearchArea[] = [
  {
    slug: "physical-ai-av-control",
    nameKo: "Physical AI·인프라 중심 자율주행 제어",
    nameEn: "Physical AI and Infrastructure-Centric AV Control",
    descriptionKo:
      "자율주행차와 일반 차량이 섞인 혼재교통에서 차량 단독 지능을 넘어 인프라가 제어에 함께 참여하는 Physical AI 프레임워크를 연구합니다. 강화학습 기반 교차로·회전교차로 운영이 대표 주제입니다.",
    descriptionEn:
      "We develop Physical AI frameworks in which infrastructure joins the control loop for mixed-autonomy traffic, including reinforcement-learning-based intersection and roundabout operations.",
    keywords: ["Physical AI", "mixed-autonomy traffic", "reinforcement learning", "AV control"],
  },
  {
    slug: "crowd-dynamics",
    nameKo: "군중 동역학",
    nameEn: "Crowd Dynamics",
    descriptionKo:
      "보행자와 군중의 이동을 계측·모형화해 혼잡과 압사 위험을 예측하고 안전한 공간 설계를 지원합니다. VR 보행 시뮬레이터와 시뮬레이션 기반 군중 안전 분석을 수행합니다.",
    descriptionEn:
      "We measure and model pedestrian and crowd movement to predict congestion and crush risk, supporting safer space design with VR walking simulators and simulation-based crowd safety analysis.",
    keywords: ["crowd dynamics", "pedestrian simulation", "crowd safety", "VR"],
  },
  {
    slug: "llm-activity-based-model",
    nameKo: "LLM 기반 활동기반모형",
    nameEn: "LLM based Activity Based Model",
    descriptionKo:
      "대규모 언어모형(LLM)과 심층 생성모형으로 개인의 활동-통행 패턴을 합성하는 차세대 활동기반 수요모형을 연구합니다. 인구 합성과 자율주행 데이터 라벨링에도 LLM을 활용합니다.",
    descriptionEn:
      "We build next-generation activity-based demand models that synthesize individual activity-travel patterns with LLMs and deep generative models, including population synthesis and AV data labeling.",
    keywords: ["LLM", "activity-based model", "population synthesis", "generative models"],
  },
  {
    slug: "digital-twin-simulation",
    nameKo: "디지털 트윈 교통 시뮬레이션",
    nameEn: "Digital Twin Traffic Simulation",
    descriptionKo:
      "미시교통 시뮬레이션과 디지털 트윈을 결합해 가상 환경에서 교통 운영과 자율주행을 검증합니다. KAIST 스핀아웃 dochak과 함께 드라이빙 시뮬레이터, 텔레드라이빙을 연구합니다.",
    descriptionEn:
      "We integrate microscopic traffic simulation with digital twin technology to test operations and automated driving in virtual environments, together with the KAIST spinout dochak.",
    keywords: ["digital twin", "microsimulation", "driving simulator", "teledriving"],
  },
  {
    slug: "urban-science",
    nameKo: "도시 과학",
    nameEn: "Urban Science",
    descriptionKo:
      "20분 도시, 접근성·형평성, 공유 모빌리티-대중교통 연계 등 도시 스케일의 이동 현상을 데이터로 분석하고 설계합니다.",
    descriptionEn:
      "We study city-scale mobility with data — the 20-minute city, accessibility and equity, and shared-mobility–transit integration.",
    keywords: ["urban science", "accessibility", "equity", "20-minute city"],
  },
];

/** Funded projects — imported from the legacy Projects page (inhi.kim/project). */
const PROJECTS: Project[] = [
  {
    id: "iitp-genai-2026",
    titleKo: "2026 생성형 AI 선도인재 양성 프로그램",
    titleEn: "2026 Generative AI Leading Talent Cultivation Program",
    sponsor: "IITP",
    role: "PI",
    startYear: 2026,
    endYear: 2029,
    ongoing: true,
  },
  {
    id: "nrf-physical-ai-2026",
    titleKo: "혼재교통 환경을 위한 Physical AI·인프라 중심 자율주행 제어 프레임워크 개발",
    titleEn:
      "Development of a Physical AI and Infrastructure-Centric AV Control Framework for Mixed-Autonomy Traffic Environments",
    sponsor: "NRF",
    role: "PI",
    startYear: 2026,
    endYear: 2030,
    ongoing: true,
  },
  {
    id: "nrf-k-construction-erc-2025",
    titleKo: "AI Plus K-건설 인프라 리질리언스 선도연구센터(ERC)",
    titleEn: "AI Plus K-Construction Infrastructure Resilience-ERC",
    sponsor: "NRF",
    role: "Co-PI",
    startYear: 2025,
    endYear: 2032,
    ongoing: true,
  },
  {
    id: "molit-asean-roadmap-2025",
    titleKo: "2026–2030 한-아세안 교통협력 로드맵",
    titleEn: "2026–2030 ASEAN-Korea Transport Cooperation Roadmap",
    sponsor: "MOLIT",
    role: "PI",
    startYear: 2025,
    endYear: 2025,
    ongoing: false,
  },
  {
    id: "nrf-delivery-robot-2024",
    titleKo: "보도 중심 지도 데이터를 활용한 배송로봇 경로 최적화 연구",
    titleEn:
      "A Study on Delivery Robot Route Optimization Using Sidewalk-Centered Map Data",
    sponsor: "NRF",
    role: "PI",
    startYear: 2024,
    endYear: 2025,
    ongoing: false,
  },
  {
    id: "kaist-digital-twin-2023",
    titleKo: "디지털 트윈 기술과 연계한 미시교통 시뮬레이션 개발",
    titleEn:
      "Development of Microscopic Traffic Simulation through Integration with Digital Twin Technology",
    sponsor: "KAIST",
    role: "PI",
    startYear: 2023,
    endYear: 2025,
    ongoing: false,
  },
  {
    id: "samsung-intrafab-2023",
    titleKo: "반도체 제조라인 Intra-Fab 물류 운영 전략 연구",
    titleEn:
      "Study on the Operation Strategies of Intra-Fab Transportation Systems in Semiconductor Manufacturing Lines",
    sponsor: "Samsung",
    role: "Co-PI",
    startYear: 2023,
    endYear: 2026,
    ongoing: true,
  },
  {
    id: "molit-metaverse-av-2023",
    titleKo: "메타버스 기반 자율주행 가상환경 및 실증 기술 개발",
    titleEn:
      "Development of Virtual Environment and Demonstration Technology for Automated Driving based on Metaverse",
    sponsor: "MOLIT",
    role: "Co-PI",
    startYear: 2023,
    endYear: 2028,
    ongoing: true,
  },
  {
    id: "molit-road-digital-twin-2022",
    titleKo: "자율주행 Lv.4/4+ 빅데이터를 활용한 도로교통 디지털 트윈 개발",
    titleEn:
      "Road Traffic Digital Twin Development Using Autonomous Driving Lv.4/4+ Big Data",
    sponsor: "MOLIT",
    role: "Co-PI",
    startYear: 2022,
    endYear: 2026,
    ongoing: true,
  },
  {
    id: "nrf-shared-mobility-2021",
    titleKo: "차기 팬데믹 대비 공유 모빌리티-대중교통 운영 계획",
    titleEn:
      "Shared Mobility–Mass Transit Operational Plan for Preparing the Next Pandemic",
    sponsor: "NRF",
    role: "PI",
    startYear: 2021,
    endYear: 2026,
    ongoing: true,
  },
  {
    id: "nrf-earthquake-underground-2021",
    titleKo: "대심도 지하공간 지진 대비 데이터 융합 방재 기술",
    titleEn:
      "Data Fusion Based Disaster Prevention Technology to Earthquakes for Deep and Large Underground Space",
    sponsor: "NRF",
    role: "Co-PI",
    startYear: 2021,
    endYear: 2024,
    ongoing: false,
  },
  {
    id: "nia-data-flagship-2021",
    titleKo: "2021 데이터 플래그십 사업",
    titleEn: "2021 Data Flagship",
    sponsor: "NIA",
    role: "Co-PI",
    startYear: 2021,
    endYear: 2022,
    ongoing: false,
  },
  {
    id: "nia-bigdata-platform-2021",
    titleKo: "빅데이터 플랫폼 및 센터 구축",
    titleEn: "Big Data Platform and Centre Development",
    sponsor: "NIA",
    role: "Co-PI",
    startYear: 2021,
    endYear: 2021,
    ongoing: false,
  },
  {
    id: "goyang-changneung-tia-2021",
    titleKo: "고양 창릉 공공주택지구 교통영향평가",
    titleEn: "Goyang Changneung Public Housing District Traffic Impact Assessment",
    sponsor: "Korea Eng.",
    role: "PI",
    startYear: 2021,
    endYear: 2021,
    ongoing: false,
  },
  {
    id: "crlab-ocean-trajectory-2021",
    titleKo: "해양 궤적 데이터 분석 및 시각화",
    titleEn: "Ocean Trajectory Data Analysis and Visualization",
    sponsor: "CRLab",
    role: "PI",
    startYear: 2021,
    endYear: 2021,
    ongoing: false,
  },
  {
    id: "joinin-ocean-interpolation-2021",
    titleKo: "해양 궤적 데이터 보간 기술 개발",
    titleEn: "Development of Ocean Trajectory Data Interpolation",
    sponsor: "Join In",
    role: "PI",
    startYear: 2021,
    endYear: 2021,
    ongoing: false,
  },
  {
    id: "krri-sbrt-2020",
    titleKo: "Super BRT 미시 시뮬레이션 분석",
    titleEn: "Super BRT Micro Simulation Analysis",
    sponsor: "KRRI",
    role: "PI",
    startYear: 2020,
    endYear: 2020,
    ongoing: false,
  },
];

const OPENINGS: Opening[] = [
  {
    id: "gks-phd-2027",
    position: "phd",
    titleKo: "GKS 장학 박사과정 모집 (2027 가을 입학)",
    titleEn: "Fully Funded Ph.D. Positions via Global Korea Scholarship (Fall 2027)",
    descriptionKo:
      "Global Korea Scholarship(GKS) University R&D Track으로 박사과정 학생을 모집합니다. 등록금 전액과 경쟁력 있는 생활비(월 180만원+α)가 지원되며, 1년 한국어 연수가 포함됩니다.",
    descriptionEn:
      "We are recruiting Ph.D. students through the GKS University R&D Track. Positions are fully funded with a tuition waiver, a competitive stipend (1.8M KRW/month + top-up), and one year of Korean language training.",
    requirements: [
      "Background in transportation, civil engineering, computer science, economics, mathematics, control, human factors, or related fields",
      "English proficiency score and transcript",
      "CV and a short description of research interests",
    ],
    deadline: "2027-01-31",
    contactEmail: "kaist.mobility@gmail.com",
    active: true,
  },
  {
    id: "kr-graduate-rolling",
    position: "ms",
    titleKo: "한국인 대학원생 (석사·박사·석박통합) — 상시 문의",
    titleEn:
      "Korean Graduate Students (M.S. / Ph.D. / Integrated Ph.D.) — Inquiries Welcome",
    descriptionKo:
      "국내 정규 석사·박사·석박통합 과정에 관심 있는 **한국 학생**은 언제든지 문의해 주세요. 교통·모빌리티 AI, 도시·교통 계획, 데이터 과학 등 관련 분야에 관심이 있으면 연구 관심사와 학력을 간단히 적어 보내주시면 검토 후 연락드립니다.",
    descriptionEn:
      "Korean students interested in our regular M.S., Ph.D., or integrated Ph.D. programs are welcome to inquire **at any time**. Send a brief note on your background and research interests in transport, mobility AI, urban systems, or related fields — we will review and get back to you.",
    requirements: [
      "Korean nationality (domestic graduate admission track)",
      "Background in engineering, urban planning, computer science, economics, mathematics, or related fields",
      "CV and a short statement of research interests",
    ],
    contactEmail: "kaist.mobility@gmail.com",
    active: true,
  },
  {
    id: "mobility-ax-gmax-ms",
    position: "ms",
    titleKo: "G-MAX 모빌리티 AX 글로벌 전문가 프로그램 석사과정 모집 (논문 트랙)",
    titleEn: "G-MAX — Mobility AX Global Expert Program (Master's, Thesis Track)",
    descriptionKo:
      "KAIST 조천식모빌리티대학원이 참여하는 G-MAX(모빌리티 AX 글로벌 전문가 프로그램) 석사과정(논문 트랙) 모집입니다. 선발 시 등록금과 생활비 전액 장학금이 지원됩니다. 방글라데시, 캄보디아, 이집트, 인도, 인도네시아, 몽골, 미얀마, 네팔, 파키스탄, 필리핀, 스리랑카, 우즈베키스탄, 베트남 등 13개국 국적자가 지원 가능하며, 매 학기 [KAIST 대학원 입학 포털](https://gradapply.kaist.ac.kr)을 통해 온라인으로 지원합니다 — 정확한 일정은 매 학기 별도 공지됩니다.",
    descriptionEn:
      "A fully funded Master's program (Thesis Track) under G-MAX (Mobility AX Global Expert Program), hosted at the Cho Chun Shik Graduate School of Mobility, KAIST. Open to applicants from 13 eligible countries: Bangladesh, Cambodia, Egypt, India, Indonesia, Mongolia, Myanmar, Nepal, Pakistan, Philippines, Sri Lanka, Uzbekistan, and Viet Nam. Applications open each semester through [KAIST's graduate application portal](https://gradapply.kaist.ac.kr) — exact dates are announced closer to each intake.",
    requirements: [
      "Citizenship in one of 13 eligible countries: Bangladesh, Cambodia, Egypt, India, Indonesia, Mongolia, Myanmar, Nepal, Pakistan, Philippines, Sri Lanka, Uzbekistan, Viet Nam",
      "Bachelor's degree in engineering, urban planning, or a related field",
      "Interest in mobility AI and data-driven transport",
      "Online application via gradapply.kaist.ac.kr, with an online recommendation letter submitted about a week after the application deadline",
    ],
    contactEmail: "kaist.mobility@gmail.com",
    active: true,
  },
  {
    id: "postdoc-rolling",
    position: "postdoc",
    titleKo: "포스트닥 연구원 — 상시 문의",
    titleEn: "Postdoctoral Researchers — Inquiries Welcome",
    descriptionKo:
      "포스트닥 포지션은 **언제든지** 문의를 받습니다. 한국연구재단(NRF) 등 공식 프로그램을 통한 합류도 가능합니다. [NRF 2026년 1차 포스트닥 지원공고](https://www.iris.go.kr/contents/retrieveBsnsAncmView.do?ancmId=018946&bsnsYyDetail=2026&sorgnBsnsCd=S051415&bsnsAncmSn=1&chngRcveDeFro=2026/02/25&chngRcveDeTo=2026/04/10)를 참고하거나, 연구 경력과 관심 분야를 적어 직접 문의해 주세요.",
    descriptionEn:
      "We welcome postdoctoral inquiries **at any time**. You may also join through official programs such as the Korea Research Foundation (NRF) — see the [NRF 2026 1st-round postdoc announcement](https://www.iris.go.kr/contents/retrieveBsnsAncmView.do?ancmId=018946&bsnsYyDetail=2026&sorgnBsnsCd=S051415&bsnsAncmSn=1&chngRcveDeFro=2026/02/25&chngRcveDeTo=2026/04/10). Alternatively, email us directly with your CV and research interests.",
    requirements: [
      "Ph.D. in transportation, civil engineering, computer science, urban planning, or a related field",
      "Strong publication or research record",
      "CV and a brief research statement",
    ],
    contactEmail: "kaist.mobility@gmail.com",
    active: true,
  },
  {
    id: "urp-intern-rolling",
    position: "intern",
    titleKo: "학부 연구 인턴 (URP) 상시 모집",
    titleEn: "Undergraduate Research Interns (URP) — Rolling",
    descriptionKo:
      "교통 시뮬레이션, 데이터 분석, AI 모델링에 관심 있는 학부생 인턴을 상시 모집합니다. KAIST-PTV 그룹 인턴십 연계 기회가 있습니다.",
    descriptionEn:
      "We welcome undergraduate interns interested in traffic simulation, data analysis, and AI modelling, with opportunities linked to the KAIST-PTV Group internship program.",
    requirements: [
      "Programming experience (Python preferred)",
      "Curiosity about transport and mobility problems",
    ],
    contactEmail: "kaist.mobility@gmail.com",
    active: true,
  },
];

// ---------------------------------------------------------------------------
// Public API — the only surface pages are allowed to use.
//
// Every getter asks the Notion CMS first (lib/notion.ts, ISR-cached for 1h)
// and falls back to the static data above when Notion is unconfigured, down,
// or empty — the site never breaks because of a CMS problem.
// ---------------------------------------------------------------------------

import {
  fetchFaqs,
  fetchGalleryAlbums,
  fetchJourneys,
  fetchMembers,
  fetchNews,
  fetchOpenings,
  fetchPageContent,
  fetchPageCopy,
  fetchProjects,
  fetchPublications,
  fetchResearchAreas,
  fetchResearchProjects,
  fetchSiteSettings,
  notionEnabled,
} from "./notion";

export async function getMembers(role?: MemberRole): Promise<Member[]> {
  let members = MEMBERS;
  if (notionEnabled) {
    const remote = await fetchMembers();
    if (remote && remote.length > 0) {
      // Notion rows missing a photo/career inherit the built-in values.
      const staticByKey = new Map(
        MEMBERS.map((m) => [`${m.nameEn}|${m.role}`, m]),
      );
      members = remote.map((m) => {
        const fallback = staticByKey.get(`${m.nameEn}|${m.role}`);
        return {
          ...m,
          photoUrl: m.photoUrl ?? fallback?.photoUrl,
          career: m.career ?? fallback?.career,
          links: m.links ?? fallback?.links,
        };
      });
    }
  }
  return role ? members.filter((m) => m.role === role) : members;
}

async function allPublications(): Promise<Publication[]> {
  if (notionEnabled) {
    const remote = await fetchPublications();
    if (remote && remote.length > 0) return remote;
  }
  return PUBLICATIONS;
}

export async function getPublications(filter?: {
  year?: number;
  type?: PublicationType;
}): Promise<Publication[]> {
  let result = await allPublications();
  if (filter?.year) result = result.filter((p) => p.year === filter.year);
  if (filter?.type) result = result.filter((p) => p.type === filter.type);
  return [...result].sort((a, b) => b.year - a.year);
}

export async function getFeaturedPublications(): Promise<Publication[]> {
  return (await allPublications()).filter((p) => p.featured);
}

const MEMBER_PUBLICATIONS = memberPublicationsData as Record<
  string,
  MemberPublicationEntry[]
>;

/**
 * A member's personal publication record as listed on the legacy
 * inhi.kim/team member modal (SCI Journal list). Frozen snapshot — new lab
 * papers appear on member pages via author-name matching against the
 * publications database instead. Keyed by English name (not member id)
 * because Notion-sourced members use Notion page ids.
 */
export async function getMemberPublicationRecord(
  memberNameEn: string,
): Promise<MemberPublicationEntry[]> {
  return MEMBER_PUBLICATIONS[memberNameEn] ?? [];
}

const NEWS_EXTRA = newsExtraData as Record<
  string,
  { body: string[]; images: string[] }
>;

/** Pre-KAIST archive (2016–2022, imported from the legacy site). */
const NEWS_ARCHIVE = (
  newsArchiveData as Array<
    Omit<NewsItem, "category"> & { category: string; pid: number }
  >
).map(({ pid: _pid, ...item }) => ({
  ...item,
  category: item.category as NewsCategory,
}));

/** Built-in archive (imported from the legacy site) with bodies/images. */
function staticNews(): NewsItem[] {
  return [...NEWS, ...NEWS_ARCHIVE].map((item) => {
    const extra = NEWS_EXTRA[item.id];
    if (!extra) return item;
    return {
      ...item,
      body: extra.body,
      images: extra.images,
      imageUrl: extra.images[0],
    };
  });
}

export async function getNews(): Promise<NewsItem[]> {
  const archive = staticNews();
  let merged = archive;
  if (notionEnabled) {
    const remote = await fetchNews();
    if (remote && remote.length > 0) {
      // Pull body + images (thumbnail) for CMS-managed articles.
      const withContent = await Promise.all(
        remote.map(async (item) => {
          const content = await fetchPageContent(item.id);
          if (!content) return item;
          return {
            ...item,
            body: content.body,
            images: content.images,
            imageUrl: content.images[0],
          };
        }),
      );
      // Union: Notion wins when the same article exists in the archive.
      const seen = new Set(withContent.map((n) => `${n.date}|${n.titleEn}`));
      merged = [
        ...withContent,
        ...archive.filter((n) => !seen.has(`${n.date}|${n.titleEn}`)),
      ];
    }
  }
  return merged.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getNewsItem(id: string): Promise<NewsItem | undefined> {
  return (await getNews()).find((item) => item.id === id);
}

export async function getRecentNews(limit: number): Promise<NewsItem[]> {
  return (await getNews()).slice(0, limit);
}

export async function getGalleryAlbums(): Promise<GalleryAlbum[]> {
  const archive = galleryData as GalleryAlbum[];
  let merged = archive;
  if (notionEnabled) {
    const remote = await fetchGalleryAlbums();
    if (remote && remote.length > 0) {
      const seen = new Set(remote.map((a) => `${a.date}|${a.titleEn}`));
      merged = [
        ...remote,
        ...archive.filter((a) => !seen.has(`${a.date}|${a.titleEn}`)),
      ];
    }
  }
  return [...merged].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getGalleryAlbum(
  id: string,
): Promise<GalleryAlbum | undefined> {
  return (await getGalleryAlbums()).find((album) => album.id === id);
}

export async function getResearchProjects(): Promise<ResearchProject[]> {
  const archive = (
    researchProjectsData as Array<
      Omit<ResearchProject, "imageUrl"> & { imageUrl: string | null }
    >
  ).map((p) => ({ ...p, imageUrl: p.imageUrl ?? undefined }));
  if (notionEnabled) {
    const remote = await fetchResearchProjects();
    if (remote && remote.length > 0) return [...remote, ...archive];
  }
  return archive;
}

export async function getResearchAreas(): Promise<ResearchArea[]> {
  if (notionEnabled) {
    const remote = await fetchResearchAreas();
    if (remote && remote.length > 0) return remote;
  }
  return RESEARCH_AREAS;
}

export async function getResearchArea(slug: string): Promise<ResearchArea | undefined> {
  return (await getResearchAreas()).find((a) => a.slug === slug);
}

export async function getProjects(): Promise<Project[]> {
  let projects = PROJECTS;
  if (notionEnabled) {
    const remote = await fetchProjects();
    if (remote && remote.length > 0) projects = remote;
  }
  return [...projects].sort(
    (a, b) => Number(b.ongoing) - Number(a.ongoing) || b.startYear - a.startYear,
  );
}

/** Single funded project, with the Notion row's page body as its detail. */
export async function getProject(id: string): Promise<Project | undefined> {
  const projects = await getProjects();
  const project = projects.find((p) => p.id === id);
  if (!project) return undefined;
  if (notionEnabled) {
    const content = await fetchPageContent(project.id);
    if (content && (content.body.length > 0 || content.images.length > 0)) {
      return { ...project, body: content.body, images: content.images };
    }
  }
  return project;
}

export async function getOpenings(activeOnly = true): Promise<Opening[]> {
  let openings = OPENINGS;
  if (notionEnabled) {
    const remote = await fetchOpenings();
    if (remote && remote.length > 0) openings = remote;
  }
  return activeOnly ? openings.filter((o) => o.active) : openings;
}

/** FAQ lives only in Notion — an empty list simply hides the section. */
export async function getFaqs(): Promise<Faq[]> {
  if (notionEnabled) {
    const remote = await fetchFaqs();
    if (remote) return remote;
  }
  return [];
}

/** Site-wide strings (emails, addresses, hero copy) with code defaults. */
const SITE_SETTINGS_DEFAULTS: Record<string, string> = {
  "대표 이메일": "kaist.mobility@gmail.com",
  "주소(한글)": "대전광역시 유성구 문지로 193, KAIST 문지캠퍼스 F동 433호",
  "주소(영문)": "433, Building F, 193 Munji-ro, Yuseong-gu, Daejeon, Republic of Korea",
  // 히어로 문구 → 페이지 문구 DB "홈 · 히어로 문구"로 이동 (2026-07-16)
  "3D 투어 링크": "https://my.matterport.com/show/?m=PKXeypMWexL",
  "Google Scholar": "https://scholar.google.com/citations?user=Cz_9jloAAAAJ&hl=en",
  Scopus: "https://www.scopus.com/authid/detail.uri?authorId=55454217700",
};

export async function getSiteSettings(): Promise<Record<string, string>> {
  if (notionEnabled) {
    const remote = await fetchSiteSettings();
    if (remote) return { ...SITE_SETTINGS_DEFAULTS, ...remote };
  }
  return SITE_SETTINGS_DEFAULTS;
}

/** Student journey cards — Notion 성장 스토리 DB with the built-in fallback. */
const JOURNEYS_FALLBACK = journeysData as Journey[];

export async function getJourneys(): Promise<Journey[]> {
  if (notionEnabled) {
    const remote = await fetchJourneys();
    if (remote && remote.length > 0) {
      // Rows without an uploaded photo inherit the repo photo by name.
      const staticByName = new Map(JOURNEYS_FALLBACK.map((j) => [j.name, j]));
      return remote.map((j) => ({
        ...j,
        photo: j.photo ?? staticByName.get(j.name)?.photo,
      }));
    }
  }
  return JOURNEYS_FALLBACK;
}

/** One bilingual copy string. Rendered via <Copy t={...}> (links supported). */
export interface CopyPair {
  ko: string;
  en: string;
}

/**
 * Fixed page copy (headings, intro paragraphs, buttons, SEO strings), keyed
 * by the 키 column of the Notion 페이지 문구 DB. lib/data/page-copy.json holds
 * the shipped defaults; a Notion row overrides per language, and an empty
 * language field falls back to the default so a half-filled row never blanks
 * the site.
 */
const PAGE_COPY_DEFAULTS = pageCopyData as Record<string, CopyPair>;

export async function getPageCopy(): Promise<Record<string, CopyPair>> {
  if (notionEnabled) {
    const remote = await fetchPageCopy();
    if (remote) {
      const merged: Record<string, CopyPair> = { ...PAGE_COPY_DEFAULTS };
      for (const [key, pair] of Object.entries(remote)) {
        const d = PAGE_COPY_DEFAULTS[key];
        merged[key] = {
          ko: pair.ko.trim() ? pair.ko : (d?.ko ?? pair.en),
          en: pair.en.trim() ? pair.en : (d?.en ?? pair.ko),
        };
      }
      return merged;
    }
  }
  return PAGE_COPY_DEFAULTS;
}
