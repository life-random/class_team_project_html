# class_team_project_html

팀 프로젝트 전용 저장소

## 📁 Root File Structure

```text
class_team_project_html/          ← Root
│
├── index.html                    ← 메인 페이지
│
├── pages/
│   ├── community.html            ← 커뮤니티
│   ├── about.html                ← 정보
│   └── support.html              ← 지원
│
├── css/
│   ├── style.css                 ← 공통 스타일
│   ├── community.css             ← 커뮤니티
│   ├── about.css                 ← 정보
│   └── support.css               ← 지원
│
├── js/
│   └── script.js                 ← JavaScript
│
└── images/
    ├── index/                    ← 메인 페이지 이미지
    ├── community/                ← 커뮤니티 이미지
    ├── about/                   ← 정보 페이지 이미지
    └── support/                ← 지원 페이지 이미지
```

## 📄 Pages

| 페이지 | 파일 | 담당자 |
|---|---|---|
| 메인 | `index.html` | 양형재, 최병권 |
| 커뮤니티 | `pages/community.html` | 구도하 |
| 정보 | `pages/about.html` | 이진우 |
| 지원 | `pages/support.html` | 이수현 |

## 🎨 CSS

| 파일 | 설명 |
|---|---|
| `css/style.css` | 공통 스타일 |
| `css/community.css` | 커뮤니티 스타일 |
| `css/about.css` | 정보 스타일 |
| `css/support.css` | 지원 스타일 |

## 📜 JavaScript

| 파일 | 설명 |
|---|---|
| `js/script.js` | 공통 JavaScript |

## 🖼️ Images

페이지별 이미지는 각각의 폴더에 관리합니다.

- `images/index/` → 메인 페이지
- `images/community/` → 커뮤니티
- `images/about/` → 정보 페이지
- `images/support/` → 지원 페이지

## 🎨 Shared Color Palette

| 용도 | CSS 변수 | 색상 |
|---|---|---|
| 헤더 배경 | `--st-header-bg` | `#171D25` |
| 헤더 메뉴 글자 | `--st-logo-react` | `#FFFFFF` |
| 네비게이션 배경 | `--st-nav-bg` | `#272A33` |
| 선택된 메뉴 / 파란색 버튼 | `--st-blue` | `#1A9FFF` |
| 녹색 버튼 | `--st-green-btn` | `#5C7E10` |
| 녹색 버튼 hover | `--st-green-btn-hover` | `#6C9018` |
| 헤더 / 본문 회색 글자 | `--st-gray-text` | `#C5C3C0` |
| 연두색 뱃지 / 글자 | `--st-lightgreen` | `#A1CD44` |
| 본문 파란색 글자 | `--st-blue-text` | `#5EAFDE` |
| 하늘색 버튼 / 강조 | `--st-skyblue-btn` | `#66C0F4` |

## 🏷️ Body Class Naming Convention
각 페이지의 `<body>` 태그에 아래와 같은 클래스를 부여해 style.css로 처리합니다

| 페이지 | 파일 경로 | `<body>` 클래스명 |
|---|---|---|
| 메인 | `index.html` | `<body class="pg-main">` |
| 커뮤니티 | `pages/community.html` | `<body class="pg-community">` |
| 정보 | `pages/about.html` | `<body class="pg-about">` |
| 지원 | `pages/support.html` | `<body class="pg-support">` |
