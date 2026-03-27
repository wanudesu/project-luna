// src/app/layout.tsx
//
// 📖 학습 포인트:
// ThemeProvider를 여기서 감싸면 모든 페이지에 테마가 적용됩니다.
// layout.tsx는 서버 컴포넌트라서 "use client" 불가 →
// ThemeProvider를 별도 클라이언트 컴포넌트로 분리한 이유입니다.

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luna — Frontend Engineer Portfolio",
  description: "디테일에 집착하는 프론트엔드 엔지니어의 포트폴리오.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      {/*
        📖 suppressHydrationWarning이 필요한 이유:
        next-themes가 <html>의 class를 JS로 변경하는데,
        서버 렌더링 시점과 클라이언트 시점의 class가 다를 수 있어요.
        이 경고를 suppressHydrationWarning으로 무시합니다.
      */}
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          <Header />
          <PageTransition>{children}</PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
