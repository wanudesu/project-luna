"use client";
// src/components/home/ContactSection.tsx
//
// 📖 CSS 변수 시스템 사용
// 테마 전환 시 자동으로 색상 변경 + transition 애니메이션

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/wanudesu",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
  name: "Wantedly",
  href: "https://www.wantedly.com/id/wanudesu",
  icon: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M2.2 4.5L8.7 19.5H11.1L4.6 4.5H2.2ZM10.5 4.5L17 19.5H19.4L12.9 4.5H10.5ZM20.7 4.3a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3Z" />
    </svg>
  ),
},
  {
    name: "Email",
    href: "mailto:wanudesu@gmail.com",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

interface ContactSectionProps {
    title?: string;
    description1?: string;
    description2?: string;
    sectionNumber?: string;
}

export function ContactSection({
    title = "함께 일해요",
    description1 = "새로운 프로젝트, 협업 제안, 또는 그냥 인사도 좋아요.",
    description2 = "편하게 연락주세요!",
    sectionNumber = "03",
}: ContactSectionProps) {

  return (
    <section
      id="contact"
      className="min-h-[80vh] py-24 px-6 md:px-12 lg:px-24 flex flex-col justify-center"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <motion.div
        className="max-w-3xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* ── 섹션 타이틀 ── */}
        <motion.span
          variants={itemVariants}
          className="font-mono text-sm tracking-wider"
          style={{ color: "var(--color-accent)" }}
        >
                  <span className="text-xs font-mono" style={{ color: "var(--color-accent)", minWidth: "2rem" }}>
                      {sectionNumber}
                  </span>
                  <span className="text-xs font-mono tracking-[0.15em] uppercase" style={{ color: "var(--color-text-muted)" }}>
                      . CONTACT
                  </span>
        </motion.span>

        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6"
          style={{ color: "var(--color-text-glow)" }}
        >
                  <span>
                      {title}
          </span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-lg mb-12 max-w-xl mx-auto"
          style={{ color: "var(--color-text-muted)" }}
        >
                  <span>
                      {description1}
                  <br />
                      {description2}
                  </span>
        </motion.p>

        {/* ── 이메일 버튼 (메인 CTA) ── */}
        <motion.div variants={itemVariants}>
          <motion.a
            href="mailto:wanudesu@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4
                       text-white font-medium text-lg rounded-full"
            style={{
              backgroundColor: "var(--color-accent)",
              boxShadow: "0 10px 40px var(--color-accent-glow)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            이메일 보내기
          </motion.a>
        </motion.div>

        {/* ── 소셜 링크 ── */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-6 mt-12"
        >
          {socialLinks.map((link) => (
            <motion.a
  key={link.name}
  href={link.href}
  target="_blank"
  rel="noopener noreferrer"
  className="p-3 rounded-full"
  style={{
    color: "var(--color-text-muted)",
    backgroundColor: "var(--color-bg-surface)",
  }}
  whileHover={{ scale: 1.1, y: -2 }}
  whileTap={{ scale: 0.95 }}
  title={link.name}
>
  {link.icon}
</motion.a>
          ))}
        </motion.div>

        {/* ── Footer ── */}
        <motion.div
          variants={itemVariants}
          className="mt-24 pt-8"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <p
            className="text-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            Designed & Built by{" "}
            <span style={{ color: "var(--color-accent)" }}>이원우 with Claude</span>
          </p>
          <p
            className="text-xs mt-2"
            style={{ color: "var(--color-text-muted)", opacity: 0.6 }}
          >
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}