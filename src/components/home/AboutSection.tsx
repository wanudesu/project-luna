"use client";
// src/components/home/AboutSection.tsx
//
// 📖 학습 포인트:
// 1. whileInView → 스크롤해서 화면에 들어오면 애니메이션 실행
// 2. viewport={{ once: true }} → 한 번만 실행
// 3. CSS 변수 사용 → 테마 전환 시 자동으로 색상 변경

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Animation",
    items: ["Framer Motion", "GSAP", "CSS Animations"],
  },
  {
    category: "Tools",
    items: ["Git", "Figma", "VS Code", "Vercel"],
  },
];

const experiences = [
  {
    period: "2024 - Present",
    role: "Frontend Developer",
    company: "프리랜서",
    description: "다양한 웹 프로젝트 개발 및 UI/UX 개선",
  },
  {
    period: "2023 - 2024",
    role: "Junior Developer",
    company: "스타트업",
    description: "React 기반 서비스 개발 참여",
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen py-24 px-6 md:px-12 lg:px-24 flex items-center"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <motion.div
        className="max-w-6xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* ── 섹션 타이틀 ── */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-xs font-mono" style={{ color: "var(--color-accent)", minWidth: "2rem" }}>
            01
            </span>
            <div className="flex-1 h-px" style={{ background: "var(--color-accent-glow)" }} />
              <span className="text-xs font-mono tracking-[0.15em] uppercase" style={{ color: "var(--color-text-muted)" }}>
                About
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "var(--color-text-glow)" }}>
            저에 대해 알려드릴게요
            </h2>   
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* ── 왼쪽: 소개 텍스트 ── */}
          <motion.div variants={itemVariants} className="space-y-6">
            <p
              className="text-lg leading-relaxed"
              style={{ color: "var(--color-text)" }}
            >
              안녕하세요! 저는{" "}
              <strong style={{ color: "var(--color-text-glow)" }}>사용자 경험</strong>과{" "}
              <strong style={{ color: "var(--color-text-glow)" }}>디테일</strong>에 
              집착하는 프론트엔드 개발자입니다.
            </p>
            <p
              className="leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              코드 한 줄에도 이유가 있어야 한다고 믿습니다. 
              단순히 동작하는 것을 넘어, 사용자가 즐거운 경험을 할 수 있도록 
              인터랙션과 애니메이션에 특히 관심을 가지고 있습니다.
            </p>
            <p
              className="leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              새로운 기술을 배우는 것을 좋아하며, 
              최근에는 <span style={{ color: "var(--color-accent)" }}>Framer Motion</span>과{" "}
              <span style={{ color: "var(--color-accent)" }}>3D 웹 그래픽</span>에 푹 빠져 있습니다.
            </p>

            {/* ── 경력 타임라인 ── */}
            <div className="pt-6 space-y-4">
              {experiences.map((exp, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="flex gap-4 p-4 rounded-lg"
                  style={{
                    backgroundColor: "var(--color-bg-surface)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <div
                    className="text-sm font-mono whitespace-nowrap"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {exp.period}
                  </div>
                  <div>
                    <div
                      className="font-medium"
                      style={{ color: "var(--color-text-glow)" }}
                    >
                      {exp.role}
                    </div>
                    <div
                      className="text-sm"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {exp.company} · {exp.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── 오른쪽: 스킬 그리드 ── */}
          <motion.div variants={itemVariants} className="space-y-8">
            {skills.map((skillGroup, i) => (
              <div key={i}>
                <h3
                  className="text-sm font-mono mb-3 tracking-wider"
                  style={{ color: "var(--color-accent)" }}
                >
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, j) => (
                    <motion.span
                      key={j}
                      className="px-4 py-2 rounded-full text-sm cursor-default"
                      style={{
                        backgroundColor: "var(--color-bg-surface)",
                        color: "var(--color-text)",
                        border: "1px solid var(--color-border)",
                      }}
                      whileHover={{
                        scale: 1.05,
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}

            {/* ── 숫자 통계 ── */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 pt-8"
              style={{ borderTop: "1px solid var(--color-border)" }}
            >
              {[
                { number: "2+", label: "Years Exp." },
                { number: "10+", label: "Projects" },
                { number: "∞", label: "Curiosity" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div
                    className="text-2xl md:text-3xl font-bold"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {stat.number}
                  </div>
                  <div
                    className="text-xs mt-1"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}