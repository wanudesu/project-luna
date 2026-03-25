# 🌙 Project Luna

> **한 | "나 자신을 보여주기 위한 포트폴리오 웹사이트이자, 성장 과정을 기록한 학습 로그"**
>
> **日 | "自分を表現するためのポートフォリオWebサイト、そして成長の過程を記録した学習ログ"**

[![Status](https://img.shields.io/badge/Status-In_Progress-4D7CFE?style=for-the-badge)](.)
[![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](.)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](.)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](.)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](.)

---

## 🗂 목차 / 目次

- [프로젝트 개요](#-프로젝트-개요--プロジェクト概要)
- [페이지 구성](#-페이지-구성--ページ構成)
- [기술 스택](#-기술-스택--技術スタック)
- [폴더 구조](#-폴더-구조--フォルダ構造)
- [개발 로그](#-개발-로그--開発ログ)
- [AI 활용 방식](#-ai-활용-방식--ai活用方法)
- [Contact](#-contact)

---

## 📌 프로젝트 개요 / プロジェクト概要

**한 |**
이 프로젝트는 단순한 포트폴리오가 아닙니다.
학원에서 배운 Java/Spring Boot가 아닌, 스스로 선택한 기술 스택(Next.js, TypeScript, Framer Motion)으로
처음부터 끝까지 구축하면서 코드 한 줄 한 줄을 이해하는 것을 목표로 만들었습니다.
AI를 적극 활용하되, 로직을 이해하지 않으면 넘어가지 않는 방식으로 진행하고 있습니다.

**日 |**
このプロジェクトは、単なるポートフォリオではありません。
自ら選択した技術スタック（Next.js、TypeScript、Framer Motion）を用いて、
コードの一行一行を理解することを目標に、ゼロから構築しています。
AIを積極的に活用しながらも、ロジックを理解するまで先に進まないスタイルで開発しています。

| 항목 / 項目 | 내용 / 内容 |
|---|---|
| 개발 기간 / 開発期間 | 2026.03.25 ~ 2026.04.08 (2주 / 2週間) |
| 목적 / 目的 | 포트폴리오 + 기술 학습 / ポートフォリオ + 技術習得 |
| 배포 / デプロイ | Vercel (예정 / 予定) |

---

## 📄 페이지 구성 / ページ構成

| 경로 / パス | 내용 (한) | 内容 (日) |
|---|---|---|
| `/` | 히어로 섹션 — 첫인상 | ヒーローセクション — 第一印象 |
| `/about` | 이원우라는 사람 — 가치관, 성격, 지원 동기 | 李元宇という人物 — 価値観、性格、志望動機 |
| `/kumo` | 학원 팀 프로젝트 쇼케이스 | 学院チームプロジェクトの紹介 |
| `/luna` | 이 사이트를 만드는 과정 자체 — AI 활용, 배운 것, 성장 기록 | このサイトを作る過程そのもの — AI活用・学習・成長ログ |

---

## 🛠 기술 스택 / 技術スタック

### 선택 이유 / 選定理由

학원 커리큘럼(Java, Spring Boot)에서 벗어나 프론트엔드 특화 기술을 스스로 익히기 위해 선택했습니다.
The SSS의 프론트엔드 중심 업무 환경을 고려해 실무에 가장 가까운 스택을 목표로 했습니다.

学院のカリキュラム（Java、Spring Boot）を超え、フロントエンド特化の技術を自ら習得するために選定しました。
The SSSのフロントエンド中心の業務環境を意識し、実務に最も近いスタックを目指しました。

| 기술 / 技術 | 용도 / 用途 |
|---|---|
| **Next.js 15** (App Router) | 라우팅, SSR, 메타데이터 관리 |
| **TypeScript** | 타입 안전성, 코드 가독성 |
| **Tailwind CSS** | Luna 커스텀 디자인 토큰 기반 스타일링 |
| **Framer Motion** | 페이지 전환, 스크롤 애니메이션, 마우스 인터랙션 |
| **next-themes** | 다크모드 전용 테마 관리 |

---

## 📁 폴더 구조 / フォルダ構造

```
src/
├── app/
│   ├── layout.tsx          # 루트 레이아웃 (Header, PageTransition 포함)
│   ├── page.tsx            # / 홈 페이지
│   ├── about/
│   │   └── page.tsx        # /about
│   ├── kumo/
│   │   └── page.tsx        # /kumo
│   └── luna/
│       └── page.tsx        # /luna
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # 네비게이션
│   │   └── PageTransition.tsx  # AnimatePresence 페이지 전환
│   └── home/
│       ├── HeroSection.tsx     # 히어로 섹션 (별빛 파티클, stagger 애니메이션)
│       └── MoonOrb.tsx         # CSS 달 오브 (마우스 틸트 효과)
└── globals.css             # CSS 변수, 전역 스타일
```

---

## 📅 개발 로그 / 開発ログ

> 매일의 작업을 기록합니다. 노션 일일 기록과 연동됩니다.
> 毎日の作業を記録します。Notionの日次ログと連動しています。

- [x] **2026.03.24** — 프로젝트 기획, 노션 대시보드 구축
- [x] **2026.03.25** — Next.js 프로젝트 초기 설정, 디자인 시스템(Tailwind 토큰) 구축, HeroSection / MoonOrb 완성
- [ ] **2026.03.26** — Header 네비게이션 완성
- [ ] **2026.03.27** — About 페이지
- [ ] **2026.03.28~31** — Kumo / Luna 페이지
- [ ] **2026.04.01~04** — 반응형, 애니메이션 polish
- [ ] **2026.04.05~08** — Vercel 배포, 최종 점검

---

## 🤖 AI 활용 방식 / AI活用方法

**한 |**
이 프로젝트는 Claude(Anthropic)와의 페어 프로그래밍으로 제작되고 있습니다.
단, AI가 생성한 코드를 그냥 붙여넣는 방식이 아닙니다.
주석으로 달린 학습 포인트(📖)를 읽고, 왜 이렇게 동작하는지 이해한 후에만 다음 단계로 넘어갑니다.
AI 활용 기록은 노션에 별도로 저장하고 있습니다.

**日 |**
このプロジェクトはClaude（Anthropic）とのペアプログラミングで制作しています。
ただし、AIが生成したコードをそのままコピーする方式ではありません。
コメントに記載された学習ポイント（📖）を読み、なぜそう動くのかを理解してから次のステップへ進みます。
AI活用の記録はNotionに別途保存しています。

---

## 📫 Contact

- **Email:** (이메일)
- **GitHub:** [@lewonu](https://github.com/lewonu)
- **Portfolio:** (배포 후 URL 추가 예정 / デプロイ後にURL追加予定)

<!-- 
  このREADMEはClaude (Anthropic) との対話を通じて作成しました。
  本プロジェクト全体において、AIを活用しながらも
  コードとロジックの理解を最優先に開発を進めています。
-->
