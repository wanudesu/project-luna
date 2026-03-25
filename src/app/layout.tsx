// src/app/layout.tsx
//
// 📖 학습 포인트:
// App Router에서 layout.tsx는 모든 페이지의 '껍데기'입니다.
// 이 파일은 한 번만 렌더링되고 페이지 이동 시 유지됩니다.
// 즉, Header/Footer를 여기에 두면 페이지 전환 시 깜빡이지 않습니다.

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import "./globals.css";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🔤 next/font 설정
//
// 📖 next/font는 Google Fonts를 빌드 시 다운로드해서
//    자체 호스팅합니다. 외부 네트워크 요청이 없어서
//    빠르고, FOUT(폰트 로딩 전 깜빡임)도 방지합니다.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const geistSans = Geist({
  variable: "--font-geist-sans", // CSS 변수로 노출
  subsets: ["latin"],
  display: "swap", // 폰트 로딩 중 시스템 폰트 표시 (레이아웃 시프트 방지)
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📋 메타데이터
//
// 📖 Next.js의 Metadata API를 쓰면 <head> 태그를
//    직접 건드리지 않아도 SEO, OG 태그가 자동 생성됩니다.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const metadata: Metadata = {
  title: {
    default: "Luna — Frontend Engineer Portfolio",
    template: "%s | Luna", // 각 페이지에서 title 설정 시: "About | Luna"
  },
  description:
    "신입 프론트엔드 개발자의 포트폴리오. Next.js, TypeScript, 그리고 디테일에 대한 집착.",
  keywords: ["frontend", "portfolio", "Next.js", "TypeScript", "React"],
  authors: [{ name: "Luna" }],
  creator: "Luna",

  // Open Graph (카카오톡, 슬랙 등 링크 미리보기)
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://your-domain.com", // 배포 후 변경
    siteName: "Luna Portfolio",
    title: "Luna — Frontend Engineer Portfolio",
    description: "신입 프론트엔드 개발자의 포트폴리오",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Luna Portfolio",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Luna — Frontend Engineer Portfolio",
    description: "신입 프론트엔드 개발자의 포트폴리오",
    images: ["/images/og-image.png"],
  },

  // 파비콘은 app/favicon.ico 파일로 자동 처리
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070C18", // 모바일 브라우저 상단 색상
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🏗️ 루트 레이아웃 컴포넌트
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning: next-themes가 서버/클라이언트에서
    // html 태그의 class를 다르게 설정하기 때문에 필수입니다.
    // 이게 없으면 React가 hydration 불일치 경고를 띄웁니다.
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          noise-overlay          
          antialiased
        `}
      >
        {/*
          📖 ThemeProvider (next-themes)
          - attribute="class": <html class="dark">으로 테마 적용
          - defaultTheme="dark": 기본값은 다크 모드
          - disableTransitionOnChange: 테마 전환 시 CSS transition 일시 중단
            → 색상이 천천히 바뀌는 어색함 방지
        */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {/* 네비게이션 헤더 (페이지 전환 시 유지됨) */}
          <Header />

          {/*
            📖 PageTransition 컴포넌트가 children을 감쌉니다.
            usePathname()으로 현재 경로를 감지하고,
            경로가 바뀔 때마다 Framer Motion 애니메이션을 트리거합니다.
          */}
          <PageTransition>
            <main className="min-h-screen">
              {children}
            </main>
          </PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
