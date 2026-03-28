"use client";
// src/components/home/AboutSection.tsx
//
// 📖 학습 포인트:
// 1. whileInView → 스크롤해서 화면에 들어오면 애니메이션 실행
// 2. viewport={{ once: true }} → 한 번만 실행
// 3. CSS 변수 사용 → 테마 전환 시 자동으로 색상 변경

import { motion } from "framer-motion";
import Link from "next/link";

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
    category: "배운 것",
    items: ["Java", "JavaScript", "HTML5/CSS3", "Spring Boot"],
  },
  {
    category: "배우는 중",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "사용 중",
    items: ["Git", "Figma", "VS Code", "AWS"],
  },
];

const experiences = [
  {
    period: "2022 - 2024",
    role: "군 복무 / 학점은행제",
    description1: "일본어 공부 병행, 학점은행제 수강",
  },
  {
    period: "2025 - Present",
    role: "Smart Cloud IT Master 48기",
    description1: "Java, Spring Boot, JavaScript 등 IT 기술과 일본어 동시 수련",
    description2: "팀 프로젝트 KUMO 장려상 수상",
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
            <span
              className="text-xs font-mono"
              style={{ color: "var(--color-accent)", minWidth: "2rem" }}
            >
              01
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "var(--color-accent-glow)" }}
            />
            <span
              className="text-xs font-mono tracking-[0.15em] uppercase"
              style={{ color: "var(--color-text-muted)" }}
            >
              About
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{ color: "var(--color-text-glow)" }}
          >
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
              <strong style={{ color: "var(--color-text-glow)" }}>
                디테일에 집착하는
              </strong>{" "}
              이원우입니다.
            </p>
            <p
              className="leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              한국에서 일본 취업을 준비 중인 23살 프론트엔드 개발자
              지망생입니다.
              {<br />}현재 Smart Cloud IT Master 48기에서 웹 개발과 일본어를
              함께 공부하고 있어요.
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
                    style={{ color: "var(--color-accent)", minWidth: "8rem" }}
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
                      {exp.description1}
                      <br />
                      {exp.description2}
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
                { number: "N1", label: "JLPT" },
                { number: "2", label: "Projects" },
                { number: "48기", label: "Smart Cloud IT Master" },
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
        {/* ── 더 보기 버튼 ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex justify-end"
        >
          <Link href="/about">
            <motion.span
              className="flex items-center gap-2 text-sm font-mono"
              style={{ color: "var(--color-accent)" }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              더 보기
              <span>→</span>
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
