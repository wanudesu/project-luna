"use client";
// src/components/home/ProjectsSection.tsx
//
// 📖 CSS 변수 시스템 사용
// - var(--color-bg-navy): 섹션 배경 (살짝 다른 톤)
// - var(--color-bg-surface): 카드 배경
// - 테마 전환 시 자동으로 색상 변경

import { motion } from "framer-motion";
import Link from "next/link";

const projects = [
  {
    id: "kumo",
    title: "Kumo",
    subtitle: "클라우드 대시보드",
    description: "실시간 데이터 시각화와 직관적인 UX를 갖춘 클라우드 모니터링 대시보드",
    tags: ["Next.js", "TypeScript", "D3.js", "Tailwind"],
    color: "#4D7CFE",
    year: "2024",
  },
  {
    id: "luna",
    title: "Luna",
    subtitle: "포트폴리오 사이트",
    description: "달과 태양의 테마 전환이 특징인 개인 포트폴리오 웹사이트",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
    color: "#FBBF24",
    year: "2024",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      variants={itemVariants}
      className={`grid md:grid-cols-2 gap-8 items-center ${
        isEven ? "" : "md:[direction:rtl]"
      }`}
    >
      {/* ── 이미지 영역 ── */}
      <Link
        href={`/${project.id}`}
        className="block group md:[direction:ltr]"
      >
        <motion.div
          className="relative aspect-[16/10] rounded-2xl overflow-hidden"
          style={{ backgroundColor: "var(--color-bg-surface)" }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* 플레이스홀더 */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${project.color}20 0%, ${project.color}40 100%)`,
            }}
          >
            <span
              className="text-6xl font-bold opacity-20"
              style={{ color: project.color }}
            >
              {project.title}
            </span>
          </div>

          {/* 호버 오버레이 */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100
                        transition-opacity duration-300
                        flex items-end p-6"
                      
            style={{
                background: "linear-gradient(to top, var(--card-overlay) 0%, transparent 60%)"
            }}
          >
            <span className="text-white font-medium flex items-center gap-2">
              프로젝트 보기
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </div>
        </motion.div>
      </Link>

      {/* ── 텍스트 영역 ── */}
      <div className={`space-y-4 md:[direction:ltr] ${isEven ? "" : "md:text-right"}`}>
        <div
          className="flex items-center gap-3 text-sm"
          style={{ color: "var(--color-text-muted)" }}
        >
          <span className="font-mono">{project.year}</span>
          <span
            className="w-8 h-px"
            style={{ backgroundColor: "var(--color-border)" }}
          />
          <span>{project.subtitle}</span>
        </div>

        <Link href={`/${project.id}`}>
          <h3
            className="text-2xl md:text-3xl font-bold transition-colors duration-200"
            style={{ color: "var(--color-text-glow)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-glow)")}
          >
            {project.title}
          </h3>
        </Link>

        <p
          className="leading-relaxed"
          style={{ color: "var(--color-text-muted)" }}
        >
          {project.description}
        </p>

        <div className={`flex flex-wrap gap-2 ${isEven ? "" : "md:justify-end"}`}>
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs font-mono rounded-full"
              style={{
                backgroundColor: "var(--color-bg-surface)",
                color: "var(--color-text-muted)",
                border: "1px solid var(--color-border)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="min-h-screen py-24 px-6 md:px-12 lg:px-24"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* ── 섹션 타이틀 ── */}
      <motion.div variants={itemVariants} className="mb-16">
        <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono" style={{ color: "var(--color-accent)", minWidth: "2rem" }}>
                02
            </span>
        <div className="flex-1 h-px" style={{ background: "var(--color-accent-glow)" }} />
        <span className="text-xs font-mono tracking-[0.15em] uppercase" style={{ color: "var(--color-text-muted)" }}>
            Projects
        </span>
    </div>
          <h2
            className="text-3xl md:text-4xl font-bold mt-2"
            style={{ color: "var(--color-text-glow)" }}
          >
            제가 만든 것들
          </h2>
          <p
            className="mt-4 max-w-xl"
            style={{ color: "var(--color-text-muted)" }}
          >
            각 프로젝트는 새로운 도전이었고, 그 과정에서 많은 것을 배웠습니다.
          </p>
        </motion.div>

        {/* ── 프로젝트 리스트 ── */}
        <div className="space-y-24">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}