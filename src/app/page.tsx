// src/app/page.tsx (또는 src/pages/index.tsx)
//
// 📖 메인 페이지 구조
// Hero → About → Projects → Contact 순서로 스크롤
//
// 네비게이션에서 각 섹션으로 스크롤 이동하려면
// id="about", id="projects", id="contact"를 사용합니다.

import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { ContactSection } from "@/components/home/ContactSection";

export default function Home() {
  return (
    <main>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          🏠 Hero 섹션 (기존 코드)
          - MoonOrb 컴포넌트 포함
          - "SCROLL" 인디케이터
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <HeroSection />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          👤 About 섹션
          - 자기소개
          - 스킬 목록
          - 경력 타임라인
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AboutSection />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          🎨 Projects 섹션
          - 프로젝트 카드 (Kumo, Luna)
          - 클릭 시 상세 페이지로 이동
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <ProjectsSection />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          📧 Contact 섹션
          - 이메일 CTA
          - 소셜 링크
          - Footer
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <ContactSection />
    </main>
  );
}
