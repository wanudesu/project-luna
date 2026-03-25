// src/app/page.tsx
//
// 📖 학습 포인트:
// App Router에서 page.tsx는 기본적으로 서버 컴포넌트입니다.
//  - 이 파일에서 작성한 코드는 브라우저가 아닌 서버(Node.js 환경)에서 
//  - 먼저 실행된다는 뜻
//  - page.tsx는 서버에서 실행되므로 DB같은 무거운 로직을 처리해도
//  - 브라우저 성능에는 영향 X
// 애니메이션 같은 클라이언트 기능은 HeroSection처럼
// 별도 컴포넌트로 분리하고 "use client"를 선언합니다.
// 이렇게 하면 서버에서 최대한 많이 렌더링하고
// 클라이언트 JS 번들 크기를 줄일 수 있습니다.

// TypeScript의 기능, 실제 코드가 아닌 타입만 가져옴
// TypeScript는 자바스크립트를 기반으로 정적 타입 문법을 추가한 프로그래밍 언어
// 자바스크립트에 타입을 부여, 타입을 검사, 자바스크립트와 다르게 검사됨
// 자바스크립트는 강 언어
import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";

// 이 변수는 서버 컴포넌트에서만 사용 가능한 약속된 이름.
// 이 정보를 바탕으로 Next.js가 자동으로 head 안에 title과 meta 태그 생성해줌
export const metadata: Metadata = {
  title: "Luna — Frontend Engineer Portfolio",
  description:
    "디테일에 집착하는 프론트엔드 엔지니어의 포트폴리오. Next.js, TypeScript 기반.",
};

// 페이지의 얼굴이 되는 메인 함수
// layout.tsx에 정의된 기본 틀 안에 page.tsx에서 리턴한 내용이 들어감
// 사용자 요청 -> 서버 실행 -> HTML 조립 -> 전송
export default function HomePage() {
  return (
    // 화려한 비주얼 담당
    <>
      <HeroSection />
      {/* 나중에 추가될 섹션들:
        <FeaturedProjects />
        <ContactSection />
      */}
    </>
  );
}
