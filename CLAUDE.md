# TUPA Lab Website — KAIST 교통/모빌리티 AI 연구실

## 프로젝트 목적
- 랩 지원을 고민하는 학생(학부/대학원)에게 정보를 전달하는 것이 최우선
- 멋보다 정보 전달. 인터랙션은 절제하되 효과적으로
- 콘텐츠는 추후 Notion API로 관리 (교수님이 개발자 없이 직접 수정)

## 기술 스택
- Next.js 14+ App Router, TypeScript(strict), Tailwind CSS, Framer Motion
- 배포: Vercel. 커밋 전 `npm run build` 통과 필수
- 콘텐츠는 lib/content.ts 데이터 레이어로만 접근 (페이지에 하드코딩 금지)
- 환경변수 추가 시 .env.local.example도 함께 갱신

## 디자인 원칙
- 학술적이고 절제된 톤, 여백 충분히, 콘텐츠가 주인공
- 금지: 보라~파랑 그라데이션, 이모지 아이콘, 카드 3개 나열식 generic 레이아웃,
  "Empowering the future of..." 류의 공허한 카피
- 애니메이션은 소수를 제대로: 히어로 인터랙션 1개 + 스크롤 진입 트랜지션 정도
- prefers-reduced-motion 대응 필수
- 모바일 반응형 필수, 한/영 콘텐츠 병기 가능한 구조

## 작업 방식
- 큰 변경 전에 계획을 먼저 제시하고 승인받기
- 페이지/컴포넌트 구현 후 브라우저에서 직접 확인하고 스크린샷으로 검증
