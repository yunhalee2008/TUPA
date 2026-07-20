# TUPA Website

KAIST 조천식모빌리티대학원 **TUPA (Transport and Urban Planning with AI)** 연구실
웹사이트. Next.js 14 (App Router) + TypeScript + Tailwind CSS, 콘텐츠는 Notion
CMS에서 관리하며 Vercel로 배포합니다.

- Production: https://tupa-two.vercel.app
- CMS: Notion "TUPA CMS" 페이지 (교수님용 사용 가이드 포함)
- 이전 사이트: https://inhi.kim (WordPress — 원본 export는 루트의 `tupa.WordPress.*.xml`)

## 아키텍처

```
페이지 (app/*) ──▶ lib/content.ts (유일한 데이터 표면 — async getter)
                        │
             NOTION_API_KEY 있으면 Notion 우선
                        ▼
                 lib/notion.ts (REST 직접 호출, ISR 1h, 실패 시 폴백)
                        │ 폴백
                        ▼
              내장 실데이터 (content.ts 상수 + lib/data/*.json)
```

- **폴백 대원칙**: Notion이 비었거나 죽어도 사이트는 내장 데이터로 항상 동작.
- **하이브리드 콘텐츠**: 멤버·논문·연구분야·연구과제·모집공고·설정은 Notion이
  단일 소스(전량 시드됨). 소식·갤러리는 레거시 아카이브(코드) + 신규(Notion) 병합.
- **KO/EN 토글**: 두 언어를 모두 렌더링하고 `html[data-lang]` CSS로 표시 전환
  (`.ko-only` / `.en-only` 스팬, `components/LangToggle.tsx`).
- **캐시**: 모든 Notion fetch는 `revalidate: 3600` + `"notion"` 태그.
  `/api/refresh?token=REVALIDATE_TOKEN`으로 즉시 무효화(교수님 북마크용).

## 개발

```bash
npm install
cp .env.local.example .env.local   # NOTION_API_KEY, REVALIDATE_TOKEN 채우기
npm run dev                         # http://localhost:3000
npm run build && npm run lint       # 커밋 전 필수
```

- 키 없이도 동작합니다(내장 데이터). Notion 연동 테스트에만 키가 필요.
- `npm run dev:preview`는 Claude Code 프리뷰 전용 — 별도 빌드 디렉터리
  (`.next-preview`)를 써서 사용자 dev 서버의 `.next`와 충돌하지 않게 함.
  **경고: dev 서버 실행 중에 `npm run build`를 돌리면 `.next`가 깨집니다.**
  (`NEXT_DIST_DIR=.next-build npm run build`로 격리 빌드 가능)

## 환경변수 (.env.local / Vercel)

| 변수 | 용도 |
|---|---|
| `NOTION_API_KEY` | Notion Internal Integration 시크릿. "TUPA CMS" 페이지에 connection 연결 필요 |
| `REVALIDATE_TOKEN` | `/api/refresh` 즉시 새로고침 토큰 (임의 문자열) |
| `NOTION_DB_*` | (선택) DB ID 오버라이드 — 기본값은 `lib/notion.ts`에 하드코딩 |

## 디렉터리 안내

- `lib/content.ts` — 데이터 계약(타입 + getter). 페이지는 이것만 import.
- `lib/notion.ts` — Notion fetch 레이어 (DB ID 포함).
- `lib/data/` — 레거시 아카이브 데이터 (뉴스 본문/이미지 인덱스, 옛 뉴스, 갤러리, 연구소개).
- `public/people|news|gallery|projects/` — 레거시에서 이관한 이미지 (신규 이미지는 Notion에 업로드).
- `public/hero/` — 히어로 비디오 (4K 업스케일 → 1920p 인코딩; 4K 원본은 git 제외 `hero-4k-raw.mp4`).
- `scripts/` — 일회성 마이그레이션 스크립트 (Notion 시드 덤프, 멤버 사진 업로드).
- `docs/notion-schema.md` — CMS 스키마 설계 문서 (승인본).
- `docs/design-system.md` — 디자인 시스템 (B안 Daylight Atlas).

## 콘텐츠 운영

교수님(비개발자)은 Notion "TUPA CMS"의 표만 수정하면 됩니다 — 절차는 그 안의
**📖 사용 가이드** 페이지 참조. 반영은 최대 1시간(ISR), 급하면 가이드의 즉시
새로고침 링크. 새 행은 **공개** 체크 필수.

## 도메인 변경 시 체크리스트

1. Vercel Domains에서 연결 + DNS 설정
2. `app/layout.tsx`의 `SITE_URL`, `app/sitemap.ts`, `app/robots.ts` 갱신
3. Notion 가이드의 새로고침 링크 URL 교체
4. Google Search Console 등록
