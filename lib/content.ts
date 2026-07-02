/**
 * TUPA content data layer.
 *
 * Pages must import ONLY the types and the async getter functions below —
 * never the mock data directly. When we migrate to the Notion API, the
 * constants in the "Mock data" section get replaced by Notion queries and
 * nothing outside this file changes.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type MemberRole =
  | "professor"
  | "research-fellow"
  | "phd"
  | "ms"
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
}

export type PublicationType = "journal" | "conference";

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
  imageUrl?: string;
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
}

// ---------------------------------------------------------------------------
// Mock data — replaced by Notion API queries during migration.
// Content is based on the lab's previous site (inhi.kim, WordPress export).
// ---------------------------------------------------------------------------

const MEMBERS: Member[] = [
  {
    id: "inhi-kim",
    nameKo: "김인희",
    nameEn: "Inhi Kim",
    role: "professor",
    titleKo: "연구책임자 · 부교수",
    titleEn: "Director, Associate Professor",
    email: "inhi.kim@kaist.ac.kr",
    researchInterests: [
      "Transport modelling & simulation",
      "Mobility AI",
      "Digital twin",
      "Sustainable transport systems",
    ],
    links: [
      { label: "Official homepage", url: "https://inhi.kim" },
      { label: "Google Scholar", url: "https://scholar.google.com" },
    ],
  },
  {
    id: "reuben-tamakloe",
    nameKo: "루벤 타마클로",
    nameEn: "Reuben Tamakloe",
    role: "research-fellow",
    titleKo: "연구조교수 (장영실 펠로우)",
    titleEn: "Research Fellow (Jang Young Sil Fellow)",
    researchInterests: [
      "Traffic safety analytics",
      "Econometric & machine learning models",
      "Vulnerable road users",
    ],
  },
  {
    id: "kaihan-zhang",
    nameKo: "카이한 장",
    nameEn: "Kaihan Zhang",
    role: "phd",
    titleKo: "박사과정",
    titleEn: "Ph.D. Student",
    researchInterests: [
      "Pedestrian safety",
      "Explainable AI",
      "Streetscape perception",
    ],
  },
  {
    id: "donghyun-kwon",
    nameKo: "권동현",
    nameEn: "Donghyun Kwon",
    role: "phd",
    titleKo: "박사과정",
    titleEn: "Ph.D. Student",
    researchInterests: [
      "Deep generative models",
      "Population synthesis",
      "Travel demand modelling",
    ],
  },
  {
    id: "jaeeun-jung",
    nameKo: "정재은",
    nameEn: "Jaeeun Jung",
    role: "ms",
    titleKo: "석사과정",
    titleEn: "M.S. Student",
    researchInterests: [
      "Reinforcement learning",
      "Intersection control",
      "Autonomous driving",
    ],
  },
];

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
    id: "zhang-2024-elderly-pedestrian",
    title:
      "Elderly Pedestrian Crash Severity: Exploring the Role of Human Perceived Streetscape Design Using Explainable Ensemble Learning",
    authors: ["Kaihan Zhang", "Reuben Tamakloe", "Inhi Kim"],
    venue: "Accident Analysis & Prevention",
    year: 2024,
    type: "journal",
    tags: ["traffic safety", "explainable AI", "pedestrian"],
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
];

const NEWS: NewsItem[] = [
  {
    id: "2026-06-korail-award",
    date: "2026-06-15",
    titleKo: "코레일 최우수 학생상 수상",
    titleEn: "Best Korail Student Awards",
    summaryKo: "TUPA 학생이 코레일 최우수 학생상을 수상했습니다.",
    summaryEn: "A TUPA student received the Best Korail Student Award.",
    category: "award",
  },
  {
    id: "2026-05-iitp-grant",
    date: "2026-05-15",
    titleKo: "IITP 신규 과제 선정",
    titleEn: "New Grant from IITP",
    summaryKo:
      "생성형 AI 선도인재 양성 프로그램 과제(IITP)에 선정되었습니다.",
    summaryEn:
      "TUPA was awarded the Generative AI Leading Talent Cultivation Program grant from IITP.",
    category: "grant",
  },
  {
    id: "2026-04-meng-li-joins",
    date: "2026-04-20",
    titleKo: "Dr. Meng Li 합류",
    titleEn: "Dr. Meng Li Joins",
    summaryKo: "Dr. Meng Li가 연구원으로 TUPA에 합류했습니다.",
    summaryEn: "Dr. Meng Li joined TUPA as a researcher.",
    category: "people",
  },
  {
    id: "2026-03-fan-wu-joins",
    date: "2026-03-11",
    titleKo: "Dr. Fan Wu 합류",
    titleEn: "Welcoming Dr. Fan Wu",
    summaryKo: "Dr. Fan Wu가 TUPA에 합류했습니다.",
    summaryEn: "TUPA welcomed Dr. Fan Wu to the team.",
    category: "people",
  },
  {
    id: "2025-12-ministers-award",
    date: "2025-12-03",
    titleKo: "장관상 대상 수상",
    titleEn: "Grand Prize — Minister's Award",
    summaryKo: "TUPA 팀이 대상(장관상)을 수상했습니다.",
    summaryEn: "The TUPA team won the Grand Prize (Minister's Award).",
    category: "award",
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
    relatedPublicationIds: ["zhang-2024-elderly-pedestrian"],
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

const PROJECTS: Project[] = [
  {
    id: "iitp-genai-2026",
    titleKo: "생성형 AI 선도인재 양성 프로그램",
    titleEn: "Generative AI Leading Talent Cultivation Program",
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
// All getters are async so the Notion migration is a drop-in replacement.
// ---------------------------------------------------------------------------

export async function getMembers(role?: MemberRole): Promise<Member[]> {
  return role ? MEMBERS.filter((m) => m.role === role) : MEMBERS;
}

export async function getPublications(filter?: {
  year?: number;
  type?: PublicationType;
}): Promise<Publication[]> {
  let result = PUBLICATIONS;
  if (filter?.year) result = result.filter((p) => p.year === filter.year);
  if (filter?.type) result = result.filter((p) => p.type === filter.type);
  return [...result].sort((a, b) => b.year - a.year);
}

export async function getFeaturedPublications(): Promise<Publication[]> {
  return PUBLICATIONS.filter((p) => p.featured);
}

export async function getNews(): Promise<NewsItem[]> {
  return [...NEWS].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getRecentNews(limit: number): Promise<NewsItem[]> {
  return (await getNews()).slice(0, limit);
}

export async function getResearchAreas(): Promise<ResearchArea[]> {
  return RESEARCH_AREAS;
}

export async function getResearchArea(slug: string): Promise<ResearchArea | undefined> {
  return RESEARCH_AREAS.find((a) => a.slug === slug);
}

export async function getProjects(): Promise<Project[]> {
  return [...PROJECTS].sort(
    (a, b) => Number(b.ongoing) - Number(a.ongoing) || b.startYear - a.startYear,
  );
}

export async function getOpenings(activeOnly = true): Promise<Opening[]> {
  return activeOnly ? OPENINGS.filter((o) => o.active) : OPENINGS;
}
