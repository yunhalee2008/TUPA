# TUPA Website

KAIST 조천식모빌리티대학원 김인희 교수 연구실 **TUPA (Transport and Urban Planning Arena)** 웹사이트.
교통/모빌리티 AI, 스마트시티 분야. 기존 사이트: https://inhi.kim (WordPress export가 루트의 `tupa.WordPress.*.xml`).

## 프로젝트 목적

- 랩 지원을 고민하는 학생(학부/대학원)에게 정보를 전달하는 것이 최우선
- 멋보다 정보 전달. 인터랙션은 절제하되 효과적으로
- 콘텐츠는 추후 Notion API로 관리 (교수님이 개발자 없이 직접 수정)

## Stack

- Next.js 14 (App Router) + TypeScript(strict) + Tailwind CSS + Framer Motion
- `npm run dev` / `npm run build` / `npm run lint`
- 배포: Vercel. 커밋 전 `npm run build` 통과 필수
- 환경변수 추가 시 `.env.local.example`도 함께 갱신

## ⚠️ 환경 주의: iCloud 금지

이 repo는 iCloud 동기화 폴더(`~/Documents`)에 있을 때 node 빌드가 CPU 0%로 무한 정지하고 심링크가 `"이름 2"` 복제본으로 훼손되는 문제를 겪어 **2026-07-02에 `~/dev/TUPA`로 이전했다. 다시 iCloud 경로로 옮기지 말 것.** (당시 우회책은 git 히스토리 참조)
- 폰트는 `next/font/google` 대신 `public/fonts/` 셀프호스팅 + `globals.css` `@font-face`를 유지한다 (빌드타임 네트워크 의존 제거 — iCloud와 무관하게 유지).

## 구조와 규칙

- **`lib/content.ts`가 유일한 데이터 소스.** 페이지는 반드시 이 파일의 타입과 async getter만 import한다 (목데이터 상수 직접 import·하드코딩 금지). getter 내부는 Notion CMS 우선 + 정적 폴백 구조이므로 getter 시그니처를 함부로 바꾸지 않는다.
- **고정 문구도 하드코딩 금지 (2026-07-16~).** 사용자에게 보이는 모든 고정 문장(제목·소개문·버튼·SEO)은 Notion "페이지 문구" DB에서 수정 가능해야 한다: 기본값은 `lib/data/page-copy.json`, 페이지에서는 `getPageCopy()`의 `copy["키"]` + `<Copy t={...}>` 사용 (키 예: "홈 · 소개 1문단"). 새 문구를 추가하면 json 기본값과 Notion DB 행을 함께 추가할 것. 스키마 상세는 `docs/notion-schema.md`.
- 라우트: `/`, `/research`, `/publications`, `/people`, `/news`, `/prospective-students`, `/contact`
- **디자인 결정 현황 (2026-07-02)**: 컬러는 **B안 Daylight Atlas** 확정, 히어로 비디오 **제작 완료** — `public/hero/`에 hero.mp4/webm/poster (9초 심리스 루프, 페이퍼 미니어처 TUPA 도시, `docs/design-system.md` §5.3 참조). 영문 폰트 T1(Overpass + IBM Plex Mono) 확정. 참고: Higgsfield 작업 시 크레딧 드는 비디오 생성은 반드시 사용자 확인 후 실행, 시작 프레임은 이미지로 먼저 확정.
- 한/영 병기 사이트: 콘텐츠 필드는 `titleKo`/`titleEn` 식으로 이중화되어 있다. 타겟 1순위는 대학원 지원 학생(한국인+유학생).

## 디자인 원칙

- 학술적이고 절제된 톤, 여백 충분히, 콘텐츠가 주인공
- 금지: 보라~파랑 그라데이션, 이모지 아이콘, 카드 3개 나열식 generic 레이아웃, "Empowering the future of..." 류의 공허한 카피
- 애니메이션은 소수를 제대로: 히어로 1개 + 스크롤 진입 트랜지션 정도
- prefers-reduced-motion 대응 필수
- 모바일 반응형 필수

## 작업 방식

- 큰 변경 전에 계획을 먼저 제시하고 승인받기
- 페이지/컴포넌트 구현 후 브라우저에서 직접 확인하고 스크린샷으로 검증

## 타겟 사용자 우선순위

1. 랩 지원을 고민하는 대학원 진학 희망 학생 (한국인 + 유학생)
2. 공동연구 검토하는 타 기관 연구자
3. 언론/일반 방문자
