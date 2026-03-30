"use client";
// src/components/home/AboutSection.tsx

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { homeTranslations } from "@/locales/home";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
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

const skills = {
  ko: [
    {
      category: "배운 것",
      items: ["Java", "JavaScript", "HTML5/CSS3", "Spring Boot"],
    },
    {
      category: "배우는 중",
      items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    },
    { category: "사용 중", items: ["Git", "Figma", "VS Code", "AWS"] },
  ],
  ja: [
    {
      category: "学んだこと",
      items: ["Java", "JavaScript", "HTML5/CSS3", "Spring Boot"],
    },
    {
      category: "学習中",
      items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    },
    { category: "使用中", items: ["Git", "Figma", "VS Code", "AWS"] },
  ],
};

const experiences = {
  ko: [
    {
      period: "2022 - 2024",
      role: "군 복무 / 학점은행제",
      description1: "일본어 공부 병행, 학점은행제 수강",
    },
    {
      period: "2025 - Present",
      role: "Smart Cloud IT Master 48기",
      description1:
        "Java, Spring Boot, JavaScript 등 IT 기술과 일본어 동시 수련",
      description2: "팀 프로젝트 KUMO 장려상 수상",
    },
  ],
  ja: [
    {
      period: "2022 - 2024",
      role: "軍服務 / 単位履修生",
      description1: "日本語学習を並行、単位履修生として受講",
    },
    {
      period: "2025 - Present",
      role: "Smart Cloud IT Master 48期",
      description1: "Java、Spring Boot、JavaScriptなどIT技術と日本語を同時習得",
      description2: "チームプロジェクトKUMO 奨励賞受賞",
    },
  ],
};

export function AboutSection() {
  const { lang } = useLanguage();
  const t = homeTranslations[lang].about;
  const currentSkills = skills[lang];
  const currentExperiences = experiences[lang];

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
              {t.sectionLabel}
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{ color: "var(--color-text-glow)" }}
          >
            {t.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          <motion.div variants={itemVariants} className="space-y-6">
            <p
              className="text-lg leading-relaxed"
              style={{ color: "var(--color-text)" }}
            >
              {t.intro1}{" "}
              <strong style={{ color: "var(--color-text-glow)" }}>
                {t.intro1}
              </strong>{" "}
              {t.intro2}
            </p>
            <p
              className="leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              {t.intro3}
              <br />
              {t.intro4}
            </p>

            <div className="pt-6 space-y-4">
              {currentExperiences.map((exp, i) => (
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

          <motion.div variants={itemVariants} className="space-y-8">
            {currentSkills.map((skillGroup, i) => (
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
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 pt-8"
              style={{ borderTop: "1px solid var(--color-border)" }}
            >
              {[
                { number: "N1", label: t.stats.jlpt },
                { number: "2", label: t.stats.projects },
                { number: "48", label: t.stats.course },
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
              {t.more}
              <span>→</span>
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
