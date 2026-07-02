# TUPA 웹사이트 디자인 시스템 제안서

> **상태: 부분 승인 (2026-07-02).**
> - 컬러 팔레트: **B안 Daylight Atlas 확정** ✅
> - 히어로: 인터랙티브 캔버스 2안 대신 **연구 분야를 보여주는 비디오 히어로로 방향 확정** (Higgsfield로 생성) — §5.3 참조
> - 타이포그래피: 미정 (T1 권장안으로 진행 예정, 이견 시 변경)
>
> 대상: KAIST 조천식모빌리티대학원 김인희 교수 연구실 TUPA (Transport and Urban Planning Arena)

## 0. 디자인 방향

타겟 사용자 우선순위가 ① 대학원 진학 희망 학생(한국인+유학생) ② 공동연구자 ③ 언론/일반이므로:

- **첫인상에서 "데이터와 시뮬레이션을 다루는 랩"임이 보여야 한다.** 히어로가 그 역할을 맡고, 나머지 페이지는 논문·모집요강을 읽는 데 방해되지 않는 절제된 편집 디자인을 유지한다.
- **한/영 병기 전제.** 유학생이 1순위 타겟에 포함되므로 모든 컴포넌트는 영문 우선 + 국문 병기 레이아웃을 기본으로 설계한다.
- **콘텐츠는 텍스트가 많다** (논문 목록, 지원 안내). 장식은 히어로와 카드 hover에 집중시키고 본문 영역은 가독성에 몰아준다.

미학적 키워드: **관제센터(traffic control room)의 정밀함 + 학술지의 편집 타이포그래피.** 흔한 "AI 스타트업 보라색 그라데이션"은 금지.

---

## 1. 컬러 팔레트 2안

### A안 — Night Control (다크 히어로 + 라이트 본문)

야간 교통관제센터 화면에서 가져온 방향. **히어로·푸터만 다크**, 본문은 라이트로 유지해 텍스트 페이지 가독성을 지킨다. 흐름(flow) 시각화가 가장 돋보이는 안.

| 토큰 | 값 | 용도 |
|---|---|---|
| `ink-950` | `#070D1A` | 히어로/푸터 배경 (심야 도시) |
| `ink-800` | `#101B30` | 다크 영역 카드/서피스 |
| `paper` | `#F7F8F5` | 본문 배경 (순백 대신 소프트 웜 화이트) |
| `text-strong` | `#111827` | 본문 제목 |
| `text-body` | `#3D4657` | 본문 텍스트 |
| `signal-teal` | `#19C6B2` | 주 강조색 — 흐름 선, 링크, CTA (교통류 시각화의 이동선) |
| `signal-amber` | `#FFB224` | 보조 강조 — 배지, 하이라이트 (신호등 황색) |
| `line-grid` | `#233047` | 다크 영역의 도로망 라인 |

- 대비: `signal-teal`은 `ink-950` 위에서 7:1 이상, 라이트 본문 링크로 쓸 때는 한 단계 어두운 `#0E9384`를 사용 (WCAG AA 확보).
- 인상: 연구력·기술력 강조. 유학생/공동연구자에게 "시뮬레이션·AI 랩" 시그널이 강함.
- 리스크: 다크·라이트 두 모드의 토큰을 관리해야 하므로 구현 비용이 B안보다 약간 높음.

### B안 — Daylight Atlas (라이트 단일 톤)

지도·도시계획 도면에서 가져온 방향. 전체가 라이트이고, KAIST 아이덴티티와 자연스럽게 이어지는 딥 블루를 축으로 안전색(오렌지)을 아주 절제해서 쓴다. 신뢰감·공공성 강조.

| 토큰 | 값 | 용도 |
|---|---|---|
| `paper` | `#FAFAF7` | 전체 배경 |
| `map-line` | `#E4E4DC` | 헤어라인, 지도풍 그리드 |
| `cobalt-900` | `#0A2A66` | 제목, 네비게이션 (KAIST 블루 `#004191`과 동계열) |
| `cobalt-600` | `#1D4FD7` | 링크, 주 강조색 |
| `text-body` | `#40485A` | 본문 텍스트 |
| `safety-orange` | `#F05323` | 포인트 1% — 모집중 배지, 핵심 CTA만 (도로 안전색) |
| `sky-tint` | `#E8F0FE` | 섹션 구분 배경, 태그 칩 |

- 대비: 본문·링크 모두 AA 이상 무난. 다크 모드 없음(추후 확장 가능).
- 인상: 공공기관·저널 느낌의 신뢰감. 언론/일반 방문자와 학부모에게 안정적.
- 리스크: 히어로 인터랙션의 시각적 임팩트가 A안보다 약함 (라이트 배경 위 flow 시각화는 대비 확보가 어려움).

**✅ 결정: B안 Daylight Atlas 채택 (2026-07-02).** 이하 모든 토큰·컴포넌트 구현은 B안 기준. 히어로가 비디오로 확정되면서(§5.3) 라이트 팔레트와 영상의 조화 처리가 핵심 과제가 된다.

---

## 2. 타이포그래피

### 기본 원칙
- 국문: **Pretendard Variable** (본문·UI 전반). woff2 셀프호스팅 + `size-adjust` 폴백으로 CLS 방지.
- 영문 디스플레이(제목·히어로): 국문과 별도 폰트를 스택 앞에 배치 — `font-family: var(--font-display), "Pretendard Variable", sans-serif` 구조로 라틴 글리프만 디스플레이 폰트가 담당.
- 숫자·메타데이터(연도, 과제 기간, 통계): 모노스페이스로 구분해 "데이터 랩" 질감 부여.

### 영문 조합 제안 (택1)

| 안 | 디스플레이 (영문 제목) | 데이터/라벨 | 성격 |
|---|---|---|---|
| **T1 (추천)** | **Overpass** (700–800, 타이트한 자간) | **IBM Plex Mono** | Overpass는 미국 고속도로 표지판 서체(Highway Gothic)에서 파생 — 교통 랩에 서사적으로 정확히 맞음. Pretendard와 x-height 궁합도 좋음 |
| T2 | **Archivo** (SemiExpanded 650+) | **JetBrains Mono** | 그로테스크 특유의 관공서 도면 느낌. 더 중립적이고 단단한 인상 |

- 두 안 모두 Google Fonts 무료 → `next/font/google`로 로드(자동 서브셋·프리로드), Pretendard만 로컬 woff2.
- Inter·Roboto·Space Grotesk 등 범용 조합은 의도적으로 배제.

### 타입 스케일 (1.25 배율, fluid)

| 토큰 | 크기 | 용도 |
|---|---|---|
| `display` | `clamp(2.5rem, 6vw, 4.5rem)` / 1.05 / -0.02em | 히어로 |
| `h1` | 2.44rem | 페이지 제목 |
| `h2` | 1.95rem | 섹션 제목 |
| `h3` | 1.56rem | 카드 제목 |
| `body-lg` | 1.125rem / 1.7 | 리드 문단 |
| `body` | 1rem / 1.65 | 본문 (국문 행간 1.65 이상 유지) |
| `caption` | 0.875rem | 메타데이터 |
| `mono-label` | 0.8125rem / letter-spacing 0.04em | 연도·태그·라벨 (모노) |

---

## 3. 레이아웃 그리드 · 스페이싱

### 그리드
- **12컬럼**, 콘텐츠 최대폭 `1200px`, 거터 `24px`, 좌우 마진 `24px`(모바일) → `48px`(데스크톱).
- 텍스트 중심 페이지(Publications, 지원 안내)는 본문 컬럼을 `max-w-[72ch]`로 제한.
- 브레이크포인트: Tailwind 기본 (`sm 640 / md 768 / lg 1024 / xl 1280`) 그대로 사용.
- 변주: 섹션 제목을 왼쪽 3컬럼에 고정하고 본문을 오른쪽 9컬럼에 흘리는 **에디토리얼 2단 구성**을 기본 섹션 패턴으로 사용 (학술지 레이아웃 참조).

### 스페이싱 스케일
- 4px 베이스, Tailwind 스케일 유지: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128`.
- 수직 리듬: 섹션 간 `py-24`(모바일 `py-16`), 섹션 제목→본문 `mt-8`, 카드 그리드 gap `24px`.

### 핵심 컴포넌트 목록 (구현 우선순위 순)

| 컴포넌트 | 설명 |
|---|---|
| `SiteNav` | 스티키 헤더. 로고(TUPA 워드마크) + 6개 메뉴 + KO/EN 토글(2차 범위). 스크롤 시 배경 블러 |
| `SiteFooter` | 다크 배경. 주소·이메일·KAIST/대학원 링크·SNS |
| `Hero` | §5의 인터랙티브 배경 + 랩 소개 카피 + 이중 CTA("지원 안내" / "Research") |
| `SectionHeading` | 에디토리얼 2단 구성의 왼쪽 컬럼 (영문 제목 + 국문 부제 + 모노 인덱스 번호) |
| `ResearchAreaCard` | 아이콘/키워드 칩 + 설명. hover 시 관련 논문 노출 |
| `PublicationItem` | 리스트형. 연도(모노) · 제목 · 저자(랩 멤버 하이라이트) · 벤처 배지(journal/conference) |
| `MemberCard` | 사진 + 이름(영/한) + 직위 + 관심분야 칩 |
| `NewsCard` | 날짜(모노) + 카테고리 배지(award/grant/people) + 제목 |
| `ProjectRow` | 기간 타임라인 바 + 과제명 + 발주처·역할 배지 |
| `OpeningCard` | 모집 포지션. `active`면 `signal-amber`(A안)/`safety-orange`(B안) "모집중" 배지 + 마감일 |
| `TagChip` / `Badge` / `Button` | 공통 프리미티브 |
| `CTABanner` | 페이지 하단 공통 "Join TUPA" 배너 (1순위 타겟 동선 마감) |

---

## 4. 모션 원칙

- Framer Motion 사용 범위: 페이지 로드 시 히어로 카피 stagger 등장, 스크롤 진입 시 섹션 fade-up(1회성), 카드 hover. **그 외 상시 애니메이션은 히어로 배경 하나로 제한.**
- 전 구간 `prefers-reduced-motion` 존중 — 히어로는 정적 이미지로 대체, 스크롤 애니메이션은 비활성화.

---

## 5. 히어로

> **✅ 결정 (2026-07-02): §5.3 비디오 히어로로 확정.** 아래 캔버스 컨셉 1·2는 채택되지 않았으나 추후 서브페이지 배경 등에 재활용할 수 있어 기록으로 남긴다.

공통 전제: 모티브는 교통 네트워크/흐름. 마우스 반응형. 텍스트(랩 이름·카피·CTA)는 배경 위 좌측 정렬로 얹힌다. 두 안 모두 A안 팔레트(다크) 기준으로 기술하며, B안 팔레트 채택 시 대비 조정이 필요하다.

### 컨셉 1 — "Living Network" (도로망 + 차량 입자)

**그림**: 히어로 전체에 스타일라이즈된 도로망 그래프(노드=교차로, 엣지=도로)가 깔리고, 그 위를 작은 입자(차량)들이 엣지를 따라 흐른다. **실제 대전 유성구 도로망 형상을 단순화해서 쓰면** 아는 사람에게는 KAIST 주변 지도로 읽히는 이스터에그가 된다.

**마우스 인터랙션**:
- 커서 주변 반경 내 엣지가 `signal-teal`로 점등(글로우), 입자 속도가 느려짐 — 커서가 "혼잡"을 만드는 메타포.
- 커서가 노드 근처에 오래 머물면 해당 노드에서 신호 펄스가 퍼짐.

**구현 방식**: **Canvas 2D 단일 레이어.**
- 도로망은 정적 JSON(노드·엣지 좌표)으로 빌드타임에 포함. `requestAnimationFrame` 루프에서 입자만 갱신.
- 입자는 엣지 위 파라메트릭 위치(`t` 0→1)만 저장 — 물리 연산 없음, 입자당 연산 O(1).

**성능 고려사항**:
- 입자 수 200~400 (데스크톱) / 80 (모바일, `matchMedia`로 분기). 입자 풀 재사용, GC 배제.
- 커서 근접 검사는 균일 그리드 spatial hash로 O(1) 근사.
- `devicePixelRatio` 상한 2, 캔버스 해상도 고정. `visibilitychange`·뷰포트 이탈(IntersectionObserver) 시 루프 정지.
- `prefers-reduced-motion`: 입자 없는 정적 도로망 SVG로 대체.
- 예상 부하: mid-tier 노트북에서 60fps 무난, 저사양 모바일에서도 입자 수만 줄이면 안전.

**성격**: 구상적·정보적. "교통 네트워크를 다루는 랩"이 문자 그대로 읽힌다. 공수는 컨셉 2보다 큼(도로망 데이터 준비 포함 +1일).

### 컨셉 2 — "Flow Field" (궤적 흐름장)

**그림**: GPS 궤적 히트맵을 연상시키는 유선(streamline) 수백 개가 커브를 그리며 화면을 가로질러 흐른다. curl noise 벡터장을 따라 이동하는 입자들이 잔상 트레일을 남긴다 — 도시의 이동 데이터를 추상화한 그림.

**마우스 인터랙션**:
- 커서가 벡터장에 국소 와류(vortex)를 삽입 — 흐름이 커서를 감아 돌며 지나감. 이동 속도에 비례해 교란 강도 증가.
- 커서 정지 시 와류가 서서히 감쇠하며 원래 흐름으로 복귀.

**구현 방식**: **Canvas 2D + 알파 페이드 트레일.**
- 매 프레임 저투명도 배경색 fillRect로 이전 프레임을 살짝 덮어 잔상 생성 (오프스크린 버퍼 불필요).
- 벡터장은 해상도 낮은 그리드(예: 40×24)에 사전 계산한 noise 값 + 커서 와류 항 합성. 입자는 grid lookup만 수행.
- (선택) 트래픽이 많아지면 WebGL 포인트 스프라이트로 이관 가능한 구조로 모듈 분리.

**성능 고려사항**:
- 입자 600~1,000 (데스크톱) / 200 (모바일). 알파 페이드 방식은 풀스크린 클리어보다 fillRect 1회라 오히려 저렴.
- noise는 프레임마다 재계산하지 않고 시간축 보간. 커서 와류만 실시간 항.
- 트레일 특성상 리사이즈 시 캔버스 리셋 필요 → debounce 처리.
- `prefers-reduced-motion`: 정적 유선 SVG(사전 렌더한 곡선 묶음)로 대체.
- 예상 부하: 컨셉 1과 동급이나 픽셀 필레이트가 조금 더 높음 — 캔버스를 히어로 높이(뷰포트 80vh)로 제한해 관리.

**성격**: 추상적·분위기형. 더 "AI/데이터" 감성이고 우아하지만, 교통 도메인이라는 메시지는 컨셉 1보다 간접적. 공수는 더 작음.

### 비교 요약

| | 컨셉 1 Living Network | 컨셉 2 Flow Field |
|---|---|---|
| 메시지 전달 | 교통망이 직독됨 (강) | 추상적 데이터 감성 (중) |
| 시각적 임팩트 | 정교함 | 몰입감 |
| 구현 공수 | 3~4일 (도로망 데이터 포함) | 2~3일 |
| 렌더링 | Canvas 2D, 입자 ~400 | Canvas 2D + 트레일, 입자 ~1,000 |
| 실패 리스크 | 도로망이 지저분해 보일 위험 → 곡선 단순화 필요 | 잔상이 텍스트 가독성 해칠 위험 → 텍스트 영역 마스크 필요 |

### 5.3 비디오 히어로 (✅ 채택안) — Higgsfield 생성 영상

> **✅ 제작 완료 (2026-07-02).** 최종 소재: 페이퍼 미니어처 도시 탑다운, TUPA 글자 건물 + 주변 도시 조직, B안 팔레트, 차량만 움직이는 고정 카메라. 파이프라인: Nano Banana로 시작 프레임 확정(사용자 승인) → Kling 3.0 Turbo start_image 애니메이션(10초) → ffmpeg 크로스페이드로 9초 심리스 루프(첫/끝 프레임 동일 검증) → 웹 인코딩.
> 파일: `public/hero/hero.mp4`(H.264, ~0.9MB) · `hero.webm`(VP9, ~0.4MB) · `hero-poster.jpg` · `hero-master.mp4`(고품질 원본, 재인코딩용). 남은 작업: 히어로 컴포넌트 구현(다음 세션), 필요시 upscale 후 재인코딩.

**컨셉**: 연구 분야(교통망·자율주행·도시 모빌리티)를 실사풍 영상으로 직접 보여주는 클린 히어로. 인터랙션 대신 영상의 정보량과 완성도로 승부한다.

#### 디자인 처리 (B안 라이트 팔레트와의 조화)

통상적인 "어두운 영상 + 흰 텍스트" 공식은 B안의 라이트 톤과 충돌한다. 두 가지 처리 중 택1:

- **(권장) 인셋 프레임**: 배경은 `paper`(#FAFAF7) 유지, 히어로 우측 55~60%에 라운드 카드(radius 16px)로 영상을 인셋. 좌측에 `cobalt-900` 헤드라인 + CTA. 지도 도면 위에 "관측 화면"을 얹은 구성 — 텍스트 가독성 문제가 원천 차단되고 라이트 아이덴티티 유지.
- **풀블리드 + 라이트 스크림**: 밝은 톤(주간, 항공뷰) 영상 위에 좌→우 white 스크림(`rgba(250,250,247,0.92)→0.25`)을 깔고 `cobalt-900` 텍스트. 영상 밝기가 일정해야 성립하므로 소재 선별이 까다로움.

#### 영상 소재 방향 (Higgsfield 프롬프트)

주의: 방문자 중 교통 전문가(2순위 타겟)는 차량 거동·차선 논리의 어색함을 즉시 알아챈다. 실사 클로즈업보다 **원거리 항공뷰·미니어처(tilt-shift)·스타일라이즈드 톤**이 AI 생성 아티팩트에 안전하다. 아래 프롬프트를 Higgsfield에 그대로 입력:

1. **Aerial interchange (주 후보)**
   > Aerial top-down drone shot of a large highway interchange at golden hour, light traffic flowing smoothly along sweeping curved ramps, soft warm daylight, clean minimal urban landscape, subtle tilt-shift miniature effect, calm and precise mood, locked camera, seamless loop, no text, no logos
2. **Smart city grid (보조 후보)**
   > Slow aerial view over a bright modern city grid in daytime, cars moving along orderly streets like data flowing through a network, soft morning haze, pastel tones with deep blue accents, tilt-shift miniature style, gentle constant motion, locked camera, seamless loop, no text
3. **Transit flow (보조 후보)**
   > High-angle view of a clean transit hub in daylight, buses and trains arriving and departing in smooth choreographed motion, pedestrians crossing in patterns, bright airy tones, architectural minimalism, subtle motion, locked camera, seamless loop, no text

공통 옵션: 16:9, 가능한 최고 해상도(최소 1080p), 모션 강도 낮음(luma/motion 파라미터 하향 — 루프 시 이질감 감소), 5~10초. "seamless loop" 미지원 시 앞뒤 크로스페이드로 후처리.

#### 기술 스펙 · 성능

- 소스 → 웹 최적화 재인코딩 필수: H.264 MP4(호환) + WebM/VP9(용량), 1600px 폭, 24fps, 음성 트랙 제거, **목표 3~4MB 이하**
  ```bash
  ffmpeg -i hero-src.mp4 -an -vf "scale=1600:-2,fps=24" -c:v libx264 -crf 28 -preset slow -movflags +faststart hero.mp4
  ffmpeg -i hero-src.mp4 -an -vf "scale=1600:-2,fps=24" -c:v libvpx-vp9 -crf 38 -b:v 0 hero.webm
  ffmpeg -i hero.mp4 -vframes 1 -q:v 2 hero-poster.jpg
  ```
- 마크업: `<video autoplay muted loop playsinline preload="metadata" poster="hero-poster.jpg">` + `<source>` 2종. `muted` 없으면 모바일 자동재생 불가.
- 성능/접근성:
  - poster 이미지를 LCP 후보로 — `priority` 로드, 영상은 lazy
  - `prefers-reduced-motion` / Save-Data / 모바일 좁은 뷰포트 → 영상 로드 생략, poster 정지 이미지만
  - IntersectionObserver로 뷰포트 이탈 시 `video.pause()`
  - 루프 경계 이질감 검수 (첫/끝 프레임 비교)

#### 캔버스 안 대비 트레이드오프 (참고)

| | 비디오 히어로 | 캔버스 (컨셉 1·2) |
|---|---|---|
| 유지보수·안정성 | 강 (파일 하나) | 코드 유지 필요 |
| 파일 무게 | 3~4MB (poster로 LCP 방어) | ~10KB JS |
| 차별성 | 소재 품질에 좌우 | 인터랙션 자체가 차별점 |
| 도메인 전달 | 실사로 직관적 | 추상적이지만 "AI 랩" 시그널 |

---

## 6. 다음 세션 진행 (승인 후)

1. 승인된 팔레트·폰트를 `tailwind.config.ts` + `globals.css` CSS 변수로 토큰화
2. `SiteNav` / `SiteFooter` / `SectionHeading` / 카드류 컴포넌트 구현
3. 승인된 히어로 컨셉 구현 (`components/hero/` 분리, reduced-motion 폴백 포함)
4. 페이지별 실 레이아웃 적용 (현재 placeholder 대체)

### 승인 현황
- [x] 컬러 팔레트: **B안 Daylight Atlas** (2026-07-02 확정)
- [ ] 영문 폰트: T1 Overpass + IBM Plex Mono (권장안으로 진행 예정, 이견 시 변경)
- [x] 히어로: **비디오 히어로** (§5.3, Higgsfield 생성 — 소재 3안 중 선택 필요)
- [ ] 히어로 레이아웃: 인셋 프레임(권장) vs 풀블리드+라이트 스크림
