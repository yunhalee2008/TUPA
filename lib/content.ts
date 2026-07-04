/**
 * TUPA content data layer.
 *
 * Pages must import ONLY the types and the async getter functions below —
 * never the mock data directly. When we migrate to the Notion API, the
 * constants in the "Mock data" section get replaced by Notion queries and
 * nothing outside this file changes.
 */

import galleryData from "./data/gallery.json";
import newsArchiveData from "./data/news-archive.json";
import newsExtraData from "./data/news-extra.json";
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
  nameKo: string;
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

export type PublicationType = "journal" | "conference" | "book";

export interface Publication {
  id: string;
  title: string;
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

/** A research topic/project showcase (legacy "Research Projects" page). */
export interface ResearchProject {
  id: string;
  title: string;
  /** ISO date of the original post. */
  date: string;
  imageUrl?: string;
  summary: string;
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
      "Industry — Transport Engineer & Planner, PTV Group (Australia · Germany · UAE · Korea)",
    ],
    researchInterests: [
      "Transport modelling & simulation",
      "Mobility AI",
      "Digital twin",
      "Sustainable transport systems",
    ],
    links: [
      { label: "Official homepage", url: "https://inhi.kim" },
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
    nameEn: "Yoonha Lee",
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
    id: "taeho-oh-alumni",
    nameKo: "",
    nameEn: "Taeho Oh",
    role: "alumni",
    titleKo: "박사 졸업 (2025)",
    titleEn: "Ph.D. 2025",
    photoUrl: "/people/taeho-oh.jpg",
    researchInterests: [],
    placement: "Postdoctoral Researcher, KAIST",
  },
  {
    id: "hyunchul-park-alumni",
    nameKo: "박현철",
    nameEn: "Hyunchul Park",
    role: "alumni",
    titleKo: "석사 졸업 (2025)",
    titleEn: "M.S. 2025",
    photoUrl: "/people/hyunchul-park.jpg",
    researchInterests: [],
    placement: "Ph.D. Candidate, KAIST",
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
    id: "donghyun-kwon-alumni",
    nameKo: "권동현",
    nameEn: "Donghyun Kwon",
    role: "alumni",
    titleKo: "석사 졸업 (2023)",
    titleEn: "M.S. 2023",
    photoUrl: "/people/donghyun-kwon.jpg",
    researchInterests: [],
    placement: "Ph.D. Candidate, KAIST",
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
    venue: "ICTCT Conference",
    year: 2024,
    type: "conference",
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
    authors: ["Jaeeun Jung", "Jinwon Yoon", "Inhi Kim"],
    venue: "TRB 103rd Annual Meeting",
    year: 2024,
    type: "conference",
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
    authors: ["Donghyun Kwon", "Changhee Lee", "Inhi Kim"],
    venue: "TRB 102nd Annual Meeting",
    year: 2023,
    type: "conference",
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
      "TCIS 인턴 Yoonha가 '구급차 이송 자동화 AI 에이전트 시스템'으로 국토교통 서비스 아이디어 공모전 대상(장관상)을 수상했습니다.",
    summaryEn:
      "Intern Yoonha won the Grand Prize (Minister of Land, Infrastructure and Transport Award) for an ambulance transport automation AI agent system.",
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

const RESEARCH_AREAS: ResearchArea[] = [
  {
    slug: "autonomous-mixed-traffic",
    nameKo: "자율주행·혼재교통 제어",
    nameEn: "Autonomous Driving & Mixed Traffic Control",
    descriptionKo:
      "자율주행차와 일반 차량이 섞인 혼재교통 환경에서 Physical AI와 인프라 중심 제어 프레임워크를 연구합니다. 강화학습 기반 교차로·회전교차로 운영 전략을 개발합니다.",
    descriptionEn:
      "We study physical AI and infrastructure-centric control frameworks for mixed-autonomy traffic, including reinforcement-learning-based intersection and roundabout operation strategies.",
    keywords: ["Physical AI", "mixed-autonomy traffic", "reinforcement learning", "AV control"],
    relatedPublicationIds: ["jung-2025-roundabout-rl", "yoon-2025-dark-llm"],
  },
  {
    slug: "simulation-digital-twin",
    nameKo: "교통 시뮬레이션·디지털 트윈",
    nameEn: "Traffic Simulation & Digital Twin",
    descriptionKo:
      "미시교통 시뮬레이션과 디지털 트윈을 결합해 가상 환경에서 교통 운영과 자율주행을 검증합니다. KAIST 스핀아웃 dochak과 함께 드라이빙 시뮬레이터, 텔레드라이빙을 연구합니다.",
    descriptionEn:
      "We integrate microscopic traffic simulation with digital twin technology to test operations and automated driving in virtual environments, together with the KAIST spinout dochak.",
    keywords: ["digital twin", "microsimulation", "driving simulator", "teledriving"],
  },
  {
    slug: "safety-analytics",
    nameKo: "교통안전 분석",
    nameEn: "Transport Safety Analytics",
    descriptionKo:
      "설명가능한 AI와 계량 모형으로 보행자·고령자·개인형 이동수단(PM) 사고 심각도를 분석하고, 비신호 교차로의 대리안전지표를 개발합니다.",
    descriptionEn:
      "We analyse crash severity for pedestrians, the elderly, and micromobility users with explainable AI and econometric models, and develop surrogate safety measures for non-signalised intersections.",
    keywords: ["explainable AI", "crash severity", "micromobility", "surrogate safety measures"],
    relatedPublicationIds: ["zhang-2025-elderly-pedestrian"],
  },
  {
    slug: "urban-accessibility",
    nameKo: "도시 접근성·모빌리티 형평성",
    nameEn: "Urban Accessibility & Mobility Equity",
    descriptionKo:
      "20분 도시, 공유 모빌리티-대중교통 연계 등 도시 스케일의 접근성과 형평성을 데이터 기반으로 평가하고 대안을 설계합니다.",
    descriptionEn:
      "We evaluate city-scale accessibility and equity — the 20-minute city, shared-mobility-and-transit integration — with data-driven methods.",
    keywords: ["20-minute city", "accessibility", "equity", "shared mobility"],
    relatedPublicationIds: ["paek-2025-20-minute-city"],
  },
  {
    slug: "mobility-data-ai",
    nameKo: "모빌리티 데이터·생성형 AI",
    nameEn: "Mobility Data & Generative AI",
    descriptionKo:
      "심층 생성모형 기반 인구 합성, LLM을 활용한 자율주행 해제(disengagement) 원인 분석 등 모빌리티 데이터를 위한 AI 방법론을 개발합니다.",
    descriptionEn:
      "We develop AI methods for mobility data: deep generative population synthesis and LLM-based auto-labeling for autonomous-vehicle disengagement analysis.",
    keywords: ["generative models", "LLM", "population synthesis", "mobility data"],
    relatedPublicationIds: ["kwon-2025-population-synthesis", "yoon-2025-dark-llm"],
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
    id: "mobility-ax-ms-2027",
    position: "ms",
    titleKo: "Mobility AX 글로벌 전문가 프로그램 석사과정 모집",
    titleEn: "Mobility AX Global Expert Program (Master's)",
    descriptionKo:
      "모빌리티 AI 전환(AX)을 이끌 석사과정 학생을 모집합니다. KAIST 조천식모빌리티대학원 소속으로 산학 프로젝트에 참여합니다.",
    descriptionEn:
      "We are recruiting master's students for the Mobility AX Global Expert Program at the Cho Chun Shik Graduate School of Mobility, with industry-linked projects.",
    requirements: [
      "Bachelor's degree in engineering, urban planning, or a related field",
      "Interest in mobility AI and data-driven transport",
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
  fetchGalleryAlbums,
  fetchMembers,
  fetchNews,
  fetchOpenings,
  fetchPageContent,
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

export async function getOpenings(activeOnly = true): Promise<Opening[]> {
  let openings = OPENINGS;
  if (notionEnabled) {
    const remote = await fetchOpenings();
    if (remote && remote.length > 0) openings = remote;
  }
  return activeOnly ? openings.filter((o) => o.active) : openings;
}

/** Site-wide strings (emails, addresses, hero copy) with code defaults. */
const SITE_SETTINGS_DEFAULTS: Record<string, string> = {
  "대표 이메일": "kaist.mobility@gmail.com",
  "주소(한글)": "대전광역시 유성구 문지로 193, KAIST 문지캠퍼스 F동 433호",
  "주소(영문)": "433, Building F, 193 Munji-ro, Yuseong-gu, Daejeon, Republic of Korea",
  "히어로 문구(한글)": "교통·모빌리티 AI와 스마트시티 연구로 도시의 이동 문제를 해결합니다.",
  "히어로 문구(영문)": "We solve urban mobility problems through transport AI and smart city research.",
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
