# Front-End Trend
<img width="128" height="128" alt="logo" src="https://github.com/user-attachments/assets/54c23472-8182-408b-a4fa-186cd6842b81" />

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
- 코드 에디터 지원

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
│   ├── locales/      # i18n 설정 및 언어팩
│   ├── shared/       # 공통 라이브러리, API, UI, 모델 등
│   └── pages/        # 라우트별 페이지
├── index.html
├── package.json
├── README.md
└── ...
```

## 오픈소스 라이선스 고지

본 프로젝트는 다음 오픈소스 소프트웨어 및 폰트를 사용합니다. 각 라이선스 및 정책을 준수합니다.

- [React](https://react.dev/) (MIT License)
- [React DOM](https://react.dev/) (MIT License)
- [Vite](https://vitejs.dev/) (MIT License)
- [TypeScript](https://www.typescriptlang.org/) (Apache 2.0 License)
- [Tailwind CSS](https://tailwindcss.com/) (MIT License)
- [Tailwind Merge](https://github.com/dcastil/tailwind-merge) (MIT License)
- [Tailwind Animated](https://github.com/benadamstyles/tailwindcss-animated) (MIT License)
- [Octokit (GitHub API)](https://github.com/octokit/octokit.js) (MIT License)
- [Luxon](https://moment.github.io/luxon/) (MIT License)
- [Giscus](https://giscus.app/) (MIT License)
- [Utterances](https://utteranc.es/) (MIT License)
- [Pretendard](https://github.com/orioncactus/pretendard) (OFL 1.1 License)
- [S-CoreDream](https://noonnu.cc/font_page/45) (무료/상업적 사용 가능)
- [printingboxBold](https://noonnu.cc/font_page/2507) (무료/상업적 사용 가능)
- [Sandpack](https://github.com/codesandbox/sandpack) (MIT License)
- [RSS Parser](https://github.com/bobby-brennan/rss-parser) (MIT License)
- [Marked](https://github.com/markedjs/marked) (MIT License)
- [DOMPurify](https://github.com/cure53/DOMPurify) (Apache 2.0 License)
- [JSDOM](https://github.com/jsdom/jsdom) (MIT License)
- [uuid](https://github.com/uuidjs/uuid) (MIT License)
- [fflate](https://github.com/101arrowz/fflate) (MIT License)
- [entities](https://github.com/fb55/entities) (BSD License)
- [dotenv](https://github.com/motdotla/dotenv) (MIT License)
- [vite-plugin-svgr](https://github.com/pd4d10/vite-plugin-svgr) (MIT License)
- [vite-tsconfig-paths](https://github.com/aleclarson/vite-tsconfig-paths) (MIT License)
- 기타 프로젝트 내 명시된 외부 라이브러리 및 폰트

각 라이브러리/폰트의 상세 라이선스는 공식 사이트 및 배포처를 참고하세요.

## 기여 및 라이선스

- MIT License

---

**본 프로젝트는 프론트엔드 개발자 커뮤니티의 정보 접근성을 높이기 위해 만들어졌습니다.**
