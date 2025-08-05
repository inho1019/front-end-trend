# Front-End Trend

프론트엔드 개발자를 위한 최신 트렌드, 뉴스, 아티클, 오픈소스 등을 한 곳에서 모아보고 관리할 수 있는 RSS 기반 웹 애플리케이션입니다.

## 주소
[https://fe-trend.netlify.app/](https://fe-trend.netlify.app/)

## 주요 기능

- 다양한 프론트엔드 관련 RSS 피드 파싱 및 통합
- 트렌드/뉴스/아티클 리스트 및 상세 보기
- 키워드/사이트별 검색 및 필터링
- 다크/라이트/시스템 테마 지원
- 다국어 지원 및 Google 번역 연동
- GitHub Discussions/Issues 기반 댓글(변경 로그 등)
- 사이트/트렌드 추가 및 관리
- 반응형 UI 및 모던 디자인

## 기술 스택

- **React** (with Vite)
- **TypeScript**
- **Tailwind CSS**
- **RSS Parser**
- **Octokit (GitHub API)**
- **Luxon** (날짜 처리)
- **Giscus/Utterances** (댓글)

## 폴더 구조

FSD 구조

```
front-end-trend/
├── public/           # 정적 데이터 및 리소스
├── scripts/          # 데이터 수집/가공 스크립트
├── src/
│   ├── app/          # 앱 엔트리, 글로벌 스타일
│   ├── features/     # 주요 도메인별 기능(트렌드, 사이트, 설정 등)
│   ├── shared/       # 공통 라이브러리, API, UI, 모델 등
│   └── pages/        # 라우트별 페이지
├── index.html
├── index.js          # RSS 파싱 등 서버 스크립트
├── package.json
├── README.md
└── ...
```

## 기여 및 라이선스

- PR, 이슈 환영합니다!
- MIT License

---

**본 프로젝트는 프론트엔드 개발자 커뮤니티의 정보 접근성을 높이기 위해 만들어졌습니다.**
