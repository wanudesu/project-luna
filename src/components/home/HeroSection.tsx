"use client";
// src/components/home/HeroSection.tsx

import { motion } from "framer-motion";
import Link from "next/link";
import { MoonOrb } from "./MoonOrb";
import { useEffect, useState } from "react";

const STAR_COUNT = 80;

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.6 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function HeroSection() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: STAR_COUNT }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 2,
      })),
    );
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* ── 배경: 메인 그라데이션 ── */}
      {/*
        📖 var(--color-bg-navy), var(--color-bg) 를 쓰면
           globals.css의 .dark / .light 변수가 자동으로 교체됩니다.
           하드코딩된 #070C18 같은 값은 테마가 바뀌어도 그대로라
           반드시 var()로 써야 합니다.
      */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "var(--hero-bg)",
          transition: "background 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />

      {/* ── 배경: 별빛 파티클 ── */}
      <div className="absolute inset-0 -z-10">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              // 📖 별색도 텍스트 색상 변수 사용 — 라이트모드에서 자동으로 어두워짐
              background: "var(--color-text-muted)",
            }}
            animate={{ opacity: [0.1, 0.8, 0.1] }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ── 배경: 수평선 그라데이션 라인 ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px -z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-accent-glow), transparent)",
        }}
      />

      <div className="page-container w-full">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-4 py-20 md:py-0 min-h-screen">
          {/* ── 좌측: 텍스트 블록 ── */}
          <motion.div
            className="flex-1 flex flex-col gap-6 max-w-[560px]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* 소형 레이블 */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-luna-accent uppercase">
                <span
                  className="inline-block w-2 h-2 rounded-full bg-luna-accent"
                  style={{
                    boxShadow: "0 0 8px rgba(77,124,254,0.8)",
                    animation: "moon-pulse 2s ease-in-out infinite",
                  }}
                />
                Available for work
              </span>
            </motion.div>

            {/* 메인 헤드라인 */}
            <div className="flex flex-col gap-1">
              <motion.p
                variants={itemVariants}
                className="text-lg font-light tracking-wide"
                // 📖 style에 color를 직접 쓰는 대신 CSS 변수 사용
                style={{ color: "var(--color-text-muted)" }}
              >
                안녕하세요,
              </motion.p>
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                <span style={{ color: "var(--color-text-glow)" }}>저는 </span>
                <span className="text-gradient-luna">이원우</span>
                <span style={{ color: "var(--color-text-glow)" }}>입니다.</span>
              </motion.h1>
            </div>

            {/* 서브 헤드라인 */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl leading-relaxed max-w-[420px]"
              style={{ color: "var(--color-text-muted)" }}
            >
              디테일에 집착하는{" "}
              <span style={{ color: "var(--color-text)", fontWeight: 500 }}>
                UI/UX 엔지니어 지망생
              </span>
              <br />
              아직 배우는 중이지만, 방향은 분명합니다.
            </motion.p>

            {/* 기술 스택 태그 */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2"
            >
              {["Next.js", "TypeScript", "React", "Framer Motion"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-mono text-luna-accent rounded-full"
                    style={{
                      border: "1px solid var(--color-accent-glow)",
                      background: "var(--color-accent-glow)",
                    }}
                  >
                    {tech}
                  </span>
                ),
              )}
            </motion.div>

            {/* CTA 버튼 */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 pt-2"
            >
              <Link href="/kumo">
                <motion.button
                  className="relative px-6 py-3 text-sm font-medium text-white rounded-lg overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent) 100%)",
                    boxShadow: "0 0 20px var(--color-accent-glow)",
                  }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 0 32px var(--color-accent-glow)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  프로젝트 보기
                </motion.button>
              </Link>
              <Link href="/about">
                <motion.button
                  className="px-6 py-3 text-sm font-medium rounded-lg"
                  style={{
                    border: "1px solid var(--color-border)",
                    background: "transparent",
                    color: "var(--color-text)",
                  }}
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  나에 대해
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* ── 우측: 달/해 오브 ── */}
          <div className="flex-1 flex justify-center md:justify-end items-center">
            <MoonOrb />
          </div>
        </div>
      </div>

      {/* ── 스크롤 인디케이터 ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span
          className="text-xs font-mono tracking-widest uppercase"
          style={{ color: "var(--color-text-muted)" }}
        >
          scroll
        </span>
        <motion.div
          className="w-px h-8"
          style={{
            background:
              "linear-gradient(to bottom, var(--color-accent), transparent)",
          }}
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            originY: 0,
            background:
              "linear-gradient(to bottom, var(--color-accent), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
