"use client";
// src/components/home/HeroSection.tsx
//
// 📖 학습 포인트:
// Framer Motion의 stagger(순차 애니메이션)와
// variants 상속 패턴을 배울 수 있는 핵심 컴포넌트입니다.
// 부모 variants가 자식에게 자동으로 전파(propagate)됩니다.

import { motion } from "framer-motion";
import Link from "next/link";
import { MoonOrb } from "./MoonOrb";
import { useEffect, useState } from "react";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🌟 별빛 배경 데이터
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const STAR_COUNT = 80;

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎬 Variants 정의
//
// 📖 containerVariants의 staggerChildren:
//    자식 요소들이 0.12초 간격으로 순차 등장합니다.
//    부모에 animate="visible"을 설정하면
//    자식들이 자동으로 순서대로 애니메이션됩니다.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.6, // 달 오브가 먼저 등장한 후 텍스트 시작
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🏗️ HeroSection 컴포넌트
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function HeroSection() {
  const [stars, setStars] = useState<Star[]>([]);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 📖 왜 useEffect에서 별 데이터를 생성하나?
  //
  // Math.random()은 서버와 클라이언트에서 다른 값을 생성합니다.
  // 서버에서 생성 → 클라이언트와 불일치 → Hydration 에러 발생.
  // useEffect는 클라이언트에서만 실행되므로 안전합니다.
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  useEffect(() => {
    const generatedStars = Array.from({ length: STAR_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 2,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── 배경: 깊은 우주 그라데이션 ── */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, #0D1E40 0%, #070C18 50%, #03050A 100%)",
        }}
      />

      {/* ── 배경: 별빛 파티클 ── */}
      <div className="absolute inset-0 -z-10">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-luna-silver"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
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
            "linear-gradient(90deg, transparent, rgba(77,124,254,0.3), transparent)",
        }}
      />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          📐 메인 콘텐츠 레이아웃
          모바일: 세로 스택 / 데스크탑: 좌우 분할
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
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
                className="text-luna-mist text-lg font-light tracking-wide"
              >
                안녕하세요,
              </motion.p>
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                {/* 📖 이름 부분은 나중에 본인 이름으로 변경하세요 */}
                <span className="text-luna-glow">저는 </span>
                <span className="text-gradient-luna">김민준</span>
                <span className="text-luna-glow">입니다.</span>
              </motion.h1>
            </div>

            {/* 서브 헤드라인 */}
            <motion.p
              variants={itemVariants}
              className="text-luna-mist text-lg md:text-xl leading-relaxed max-w-[420px]"
            >
              디테일에 집착하는{" "}
              <span className="text-luna-silver font-medium">
                Frontend Engineer.
              </span>
              <br />
              코드 한 줄에도 이유가 있어야 한다고 믿습니다.
            </motion.p>

            {/* 기술 스택 태그 */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2"
            >
              {["Next.js", "TypeScript", "React", "Framer Motion"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono text-luna-accent rounded-full"
                  style={{
                    border: "1px solid rgba(77,124,254,0.3)",
                    background: "rgba(77,124,254,0.05)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* CTA 버튼 그룹 */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 pt-2"
            >
              {/* 프라이머리 버튼 */}
              <Link href="/kumo">
                <motion.button
                  className="relative px-6 py-3 text-sm font-medium text-white rounded-lg overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, #4D7CFE 0%, #3a5fd9 100%)",
                    boxShadow: "0 0 20px rgba(77,124,254,0.3)",
                  }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 0 32px rgba(77,124,254,0.5)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  프로젝트 보기
                </motion.button>
              </Link>

              {/* 세컨더리 버튼 */}
              <Link href="/about">
                <motion.button
                  className="px-6 py-3 text-sm font-medium text-luna-silver rounded-lg"
                  style={{
                    border: "1px solid rgba(200,214,232,0.2)",
                    background: "rgba(200,214,232,0.03)",
                  }}
                  whileHover={{
                    scale: 1.03,
                    borderColor: "rgba(200,214,232,0.4)",
                    background: "rgba(200,214,232,0.07)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  소개 읽기
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* ── 우측: 달 오브 ── */}
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
        <span className="text-luna-mist text-xs font-mono tracking-widest uppercase">
          scroll
        </span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-luna-accent to-transparent"
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ originY: 0 }}
        />
      </motion.div>
    </section>
  );
}
