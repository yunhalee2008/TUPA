# Notion 워크스페이스 이전 런북 (2026-07-21 실행 예정)

> **이 문서를 읽는 Claude Code에게**: 사용자가 "이전 1·2단계 끝났어" + 새 API 키를
> 주면, 아래 3단계부터 그대로 실행하면 된다. 배경 설명은 §0, 함정 목록은 §6 필독.
> **사용자 확인 전에는 절대 commit/push 하지 말 것** (이 프로젝트의 확립된 규칙).

## 0. 배경

- 현재 Notion "TUPA CMS"는 **Yunha Lee의 워크스페이스**에 있고, 사람 Member가
  2명 이상이라 Free 플랜 블록 한도에 걸려 새 콘텐츠 생성이 막혔다.
- 해결책: CMS 전체를 **교수님(김인희) 개인 워크스페이스**로 복제 이전.
  교수님 혼자 Member인 워크스페이스는 Free 플랜에서도 블록 무제한.
- 이후 편집자는 교수님 한 분. 개발자는 Notion 계정/멤버십 없이
  **API 키만으로** 코드·데이터 유지보수 (Guest는 Notion API/MCP 접근이
  차단되므로 — makenotion/notion-mcp-server#227 — 키 방식이 표준).
- `REVALIDATE_TOKEN`은 Notion과 무관한 자체 토큰이므로 **바꾸지 않는다.**
- **검증 완료(2026-07-21)**: 현재 `NOTION_API_KEY`로 raw curl(MCP 미사용) 테스트 —
  DB 스키마에 속성 추가/삭제, 새 행 생성, 조회, archive 전부 성공. 즉 §3~5의
  "API 키만으로 코드·데이터 유지보수"는 실제로 검증된 사실이며 가정이 아니다.

## 1. [수동 · 교수님 컴퓨터] CMS 복제 — 코드 작업 아님

**중요**: Notion에는 "다른 워크스페이스로 복제" 버튼이 따로 없다. **Duplicate(같은
워크스페이스에 복사) → 그 복사본을 Move to(워크스페이스 선택 후 이동)**, 이렇게
2단계다. "Move to" 다이얼로그 안에 워크스페이스 선택 드롭다운이 있다.

**반드시 교수님 계정으로 로그인한 상태에서 진행할 것.** "Move to" 드롭다운에는
**그 계정이 Member로 속한 워크스페이스만** 뜬다. 교수님은 (a) 지금 이 워크스페이스
(Yunha 것)에 이미 Member로 들어와 있고 (b) 본인 워크스페이스의 Owner라서 양쪽 다
뜬다. Yunha 계정으로 하면 목적지 목록에 교수님 워크스페이스가 안 보인다.

**단계:**
1. 교수님 계정으로 Notion 로그인 (또는 이미 로그인된 브라우저/앱 확인)
2. 원본 "TUPA CMS" **부모 페이지**를 연다 (개별 DB 하나씩이 아니라 반드시 최상위
   부모 페이지에서 — 그래야 자식 DB 11개와 relation이 한 번에 같이 옮겨져서 안 깨짐)
3. 페이지 좌측 상단 `⋯` (또는 사이드바에서 우클릭) → **Duplicate** 클릭
   → 같은 워크스페이스 안에 "TUPA CMS (copy)" 같은 이름으로 복사본 생김
4. 방금 생긴 **복사본**을 다시 `⋯`(우클릭) → **Move to** 클릭
5. 다이얼로그 상단의 워크스페이스 드롭다운에서 **교수님 워크스페이스** 선택
6. 목적지 위치(보통 워크스페이스 최상위)를 고르고 **Move** 클릭
7. 완료까지 몇 초~몇 분 걸릴 수 있음. 목적지 워크스페이스를 열어 페이지가 도착했는지 확인

**만약 "Move to"에 교수님 워크스페이스가 안 뜨면** (교수님이 이 워크스페이스에
Member가 아니라 Guest로만 들어와 있는 경우 발생 가능): Yunha 계정에서 그 페이지를
Publish to web + "Allow duplicate as template" 켜기 → 교수님이 그 링크를 열어
Duplicate 버튼 클릭 → 교수님 워크스페이스로 복사됨 → 끝나면 원본은 unpublish.

완료 후 확인:
- [ ] 자식 DB 11개 전부 존재 (멤버·논문·소식·연구분야·연구과제·모집공고·갤러리·사이트 설정·FAQ·페이지 문구·성장 스토리)
- [ ] 논문 DB 행 수가 원본과 일치 (원본과 나란히 놓고 비교)
- [ ] 연구과제 DB의 `연구분야` relation이 **복제본 내부의** 연구분야 행을 가리킴
- [ ] 멤버 사진·소식 본문 이미지 몇 개 열어서 깨지지 않는지
- [ ] 교수님 워크스페이스 Settings → People에 **사람 Member가 교수님 1명뿐**
      (2명 되는 순간 블록 한도 재발. Yunha는 Member 금지, 필요시 Guest만)

## 2. [수동 · 교수님 컴퓨터] Integration 생성

1. **교수님 워크스페이스를 소유한 계정으로 로그인한 채로** notion.so/my-integrations
   → New integration → Associated workspace = 교수님 워크스페이스 → Secret 복사
2. **복제된** TUPA CMS 페이지 → `⋯` → Connections → 방금 만든 integration 연결
   (자식 DB들은 자동 상속. 이 연결이 빠지면 API가 조용히 빈 결과만 반환한다)
3. 가져올 것: **Secret(`ntn_...`) = 새 `NOTION_API_KEY`** + 복제된 CMS 페이지 URL

## 3. [Claude Code] 새 DB ID 조회

레포 최신화(`git pull`) 후, 새 키로 Search API를 호출해 DB 11개의 새 ID를 얻는다:

```js
// node --input-type=module 스크립트 예시 (Node 18+, 키는 env로)
const res = await fetch("https://api.notion.com/v1/search", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ filter: { property: "object", value: "database" }, page_size: 100 }),
});
const data = await res.json();
for (const db of data.results)
  console.log(db.id, "→", db.title?.map(t => t.plain_text).join(""));
```

DB 이름 ↔ 코드 키 ↔ **구 ID** 대응표 (이름으로 매칭해 새 ID를 채울 것):

| 코드 키 (`lib/notion.ts` `DB`) | Notion DB 이름 | 구 ID |
|---|---|---|
| members | 멤버 | 7aa78084bb144fe394ea80c27cef7d79 |
| publications | 논문 | 2f424be849424013ab8dd84de56e92a8 |
| news | 소식 | bf42bc1321bf401ba5f1d4b96685c091 |
| researchAreas | 연구분야 | 6df65f389bdd45dd8d38550c6cf72766 |
| projects | 연구과제 | 4aa6450de72244ddb77e960f0e8972c9 |
| openings | 모집공고 | e98c6f76086b4792a449acb6a570e006 |
| gallery | 갤러리 | 4ba8a240a18a403b84e024621b22beb4 |
| settings | 사이트 설정 | 3d0ceee3eddb48af932d09a4181bf363 |
| faqs | 자주 묻는 질문 (FAQ) | c602f68cf1bd4e4899fb1eedf5a239b8 |
| pageCopy | 페이지 문구 | 99dfb9e8a6b149d0a83df8b56243798a |
| journeys | 성장 스토리 | 897ed0304c6b44f4b20cc776e9213e11 |

이어서 **새 연구분야 DB를 query**해 행 5개의 새 page ID를 얻는다
(`databases/<새 researchAreas ID>/query`). `분야명(영문)` 제목으로 slug 매칭:

| 분야명(영문) | slug |
|---|---|
| Physical AI and Infrastructure-Centric AV Control | physical-ai-av-control |
| Crowd Dynamics | crowd-dynamics |
| LLM based Activity Based Model | llm-activity-based-model |
| Digital Twin Traffic Simulation | digital-twin-simulation |
| Urban Science | urban-science |

## 4. [Claude Code] 코드 수정 목록

| 파일 | 수정 내용 |
|---|---|
| `lib/notion.ts` | `DB = {...}`의 기본값 11개를 새 ID로 교체 |
| `lib/notion.ts` | `AREA_SLUG_BY_PAGE_ID`에 새 page ID 5개 **추가** (기존 5개는 롤백 대비 남겨둠 — ID lookup이라 공존 무해). 키는 대시 제거형으로 |
| `scripts/upload-member-photos.mjs` | `MEMBERS_DB` 상수를 새 멤버 DB ID로 |
| `.env.local` | `NOTION_API_KEY`를 새 Secret으로 (로컬 검증용) |
| `.env.local.example` | 주석의 `NOTION_DB_*` 값 갱신 + 누락된 `NOTION_DB_FAQS`도 추가 |
| `docs/notion-schema.md` | 이전 이력 한 줄 추가 (날짜 + 새 워크스페이스로 이전됨) |

## 5. [Claude Code + 사용자] 검증 → 배포

1. `npm run build` 통과
2. 새 키를 넣은 로컬 dev에서 확인 — **폴백이 실패를 가리므로 반드시 Notion이
   실제 서빙 중인지 확인할 것**: 각 DB fetcher를 직접 호출하는 스크립트로
   행 수를 찍어보거나, Notion에서 페이지 문구 하나를 살짝 바꿔 로컬에 반영되는지 확인
3. `/research`에서 연구 주제가 **정확한 분야 아래** 뜨는지 (과거 dash 버그의 증상 지점)
4. `/people` 멤버 사진 로드 (`/api/photo/<새 page id>`) 확인
5. **사용자**: Vercel → Settings → Environment Variables → `NOTION_API_KEY`를
   새 Secret으로 교체 (env 변경은 재배포해야 반영됨)
6. 사용자 확인 후 commit & push → Vercel 배포
7. 배포 후 `/api/refresh?token=...` 정상 동작 + 프로덕션에서 3·4번 재확인

## 6. 함정 (이 프로젝트에서 실제로 겪은 것들)

- **대시 문제**: Notion REST API는 page ID를 대시 포함 UUID로 반환하지만 URL/MCP
  표시는 대시 제거형. `AREA_SLUG_BY_PAGE_ID`는 대시 제거형 키 + `areaSlugFor()`가
  정규화. 과거에 이걸로 프로덕션에서 조용히 전 분야 topic이 사라진 적 있음.
- **조용한 폴백**: 키가 틀리거나 Connection이 빠져도 사이트는 정적 데이터로 멀쩡해
  보인다. "빌드 통과 + 화면 정상"만으로 이전 성공이라 판단하지 말 것 (§5-2).
- **Connection 누락**: integration을 복제된 CMS 페이지에 연결 안 하면 위와 동일 증상.
- **Vercel env는 재배포 전까지 미반영.**
- **구 워크스페이스는 1~2주 보존** — 프로덕션에서 문제없음을 확인할 때까지
  삭제하지 않는다. 롤백 = Vercel `NOTION_API_KEY`를 구 키로 되돌리기 + (코드 롤백
  필요 시) git revert.

## 7. 이전 완료 후

- [ ] 교수님 북마크(새로고침 링크)는 그대로 유효 (`REVALIDATE_TOKEN` 불변)
- [ ] Notion 사용 가이드 페이지도 복제본에 딸려왔는지 확인
- [ ] 1~2주 뒤 구 워크스페이스의 CMS 페이지 삭제(또는 워크스페이스 정리)
- [ ] `docs/notion-schema.md`·본 문서에 완료 날짜 기록
