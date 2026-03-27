"use client";
// src/components/kumo/KumoOrb.tsx
//
// 📖 학습 포인트:
// 1. SVG path로 구름 모양 만들기
// 2. staggerChildren으로 요소들이 순차적으로 등장
// 3. 각 요소에 독립적인 float 애니메이션 → 자연스러운 움직임

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

// 지도 핀 데이터 (도쿄, 오사카 기반)
const MAP_PINS = [
  { x: "52%", y: "38%", label: "東京", delay: 0, color: "#4D7CFE" },
  { x: "34%", y: "62%", label: "大阪", delay: 0.3, color: "#A78BFA" },
  { x: "68%", y: "55%", label: "渋谷", delay: 0.6, color: "#34D399" },
];
// 지도 위 구름
const MAP_CLOUDS = [
  { x: "20%", y: "10%", scale: 1.2, delay: 0.6, floatX: 6, floatY: -3 },
  { x: "69%", y: "20%", scale: 1.5, delay: 1.0, floatX: -5, floatY: -3 },
  { x: "72%", y: "72%", scale: 0.9, delay: 0.8, floatX: 4, floatY: -5 },
  { x: "10%", y: "58%", scale: 1.2, delay: 1.2, floatX: 6, floatY: -4 },
];

export function KumoOrb() {
  const [particles, setParticles] = useState<
    {
      id: number;
      x: number;
      y: number;
      size: number;
      delay: number;
      dur: number;
    }[]
  >([]);
  const { resolvedTheme: theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // 📖 mounted 전에는 테마를 알 수 없으니
  //    클라이언트에서 마운트된 후에만 테마 적용
  const accentColor =
    mounted && theme === "light" ? "rgba(232,118,26," : "rgba(77,124,254,";

  useEffect(() => {
    setParticles(
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: 15 + Math.random() * 70,
        y: 10 + Math.random() * 80,
        size: Math.random() * 3 + 1.5,
        delay: Math.random() * 3,
        dur: Math.random() * 2 + 3,
      })),
    );
  }, []);

  return (
    <motion.div
      className="relative w-[300px] h-[300px] md:w-[420px] md:h-[420px]"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }}
    >
      {/* ── 배경 글로우 ── */}
      <motion.div
        className="absolute inset-[-20px] rounded-full pointer-events-none"
        animate={{ opacity: [0.08, 0.18, 0.08], scale: [1, 1.06, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: `radial-gradient(circle, ${accentColor}0.25) 0%, transparent 70%)`,
        }}
      />

      {/* ── 메인 카드 (지도 느낌) ── */}
      <motion.div
        className="absolute inset-[20px] rounded-3xl overflow-hidden"
        style={{
          background: "var(--color-bg-navy)",
          border: "1px solid var(--color-border)",
          backdropFilter: "blur(12px)",
        }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* 격자 패턴 (지도 그리드) */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(77,124,254,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(77,124,254,1) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
          }}
        />

        {/* 도로선 느낌 */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 300 300"
          fill="none"
        >
          {/* 가로 도로 */}
          <motion.path
            d="M 0 120 Q 80 100 150 130 Q 220 160 300 140"
            stroke={`${accentColor}0.12)`}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.8, ease: "easeInOut" }}
          />
          {/* 세로 도로 */}
          <motion.path
            d="M 100 0 Q 120 80 110 150 Q 100 220 115 300"
            stroke={`${accentColor}0.1)`}
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.0, ease: "easeInOut" }}
          />
          <motion.path
            d="M 200 0 Q 190 60 210 150 Q 225 220 205 300"
            stroke={`${accentColor}0.08)`}
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.2, ease: "easeInOut" }}
          />
          {/* 곡선 도로 */}
          <motion.path
            d="M 0 200 Q 100 180 150 220 Q 200 260 300 240"
            stroke={`${accentColor}0.08)`}
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.4, ease: "easeInOut" }}
          />
        </svg>

        {/* 지도 핀들 */}
        {MAP_PINS.map((pin, i) => (
          <motion.div
            key={i}
            className="absolute flex flex-col items-center"
            style={{
              left: pin.x,
              top: pin.y,
              transform: "translate(-50%, -100%)",
            }}
            initial={{ opacity: 0, y: 16, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 1.2 + pin.delay,
              duration: 0.5,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            {/* 핀 본체 */}
            <motion.div
              className="flex items-center justify-center rounded-full mb-1"
              style={{
                width: "32px",
                height: "32px",
                background: `${pin.color}20`,
                border: `1.5px solid ${pin.color}60`,
                boxShadow: `0 0 12px ${pin.color}40`,
              }}
              animate={{ y: [0, -3, 0] }}
              transition={{
                duration: 2.5 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="5" r="2.5" fill={pin.color} />
                <path
                  d="M6 12 C6 12 2 7.5 2 5 C2 2.8 3.8 1 6 1 C8.2 1 10 2.8 10 5 C10 7.5 6 12 6 12Z"
                  fill={`${pin.color}30`}
                  stroke={pin.color}
                  strokeWidth="0.8"
                />
              </svg>
            </motion.div>

            {/* 라벨 */}
            <div
              className="px-2 py-0.5 rounded-full text-[10px] font-mono whitespace-nowrap"
              style={{
                background: "rgba(13,22,44,0.9)",
                border: `1px solid ${pin.color}30`,
                color: pin.color,
              }}
            >
              {pin.label}
            </div>

            {/* 핀 아래 펄스 */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: "40px",
                height: "40px",
                top: "-4px",
                left: "50%",
                transform: "translateX(-50%)",
                border: `1px solid ${pin.color}`,
                opacity: 0,
              }}
              animate={{ scale: [0.5, 1.5], opacity: [0.5, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.7,
                ease: "easeOut",
              }}
            />
          </motion.div>
        ))}

        {/* 파티클 */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: "rgba(77,124,254,0.6)",
            }}
            animate={{ opacity: [0.1, 0.6, 0.1] }}
            transition={{
              duration: p.dur,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* 하단 정보 바 */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-center justify-between"
          style={{
            background: "var(--color-bg-surface)",
            borderTop: "1px solid var(--color-border)",
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <span
            className="text-[10px] font-mono"
            style={{ color: "var(--color-text-muted)" }}
          >
            도쿄 · 오사카
          </span>
          <div className="flex items-center gap-1.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#34D399" }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span
              className="text-[10px] font-mono"
              style={{ color: "#34D399" }}
            >
              실시간
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* ── 구름들 (카드 주변에 흩뿌림) ── */}
      {MAP_CLOUDS.map((cloud, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: cloud.x, top: cloud.y, zIndex: 10 }}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: cloud.scale }}
          transition={{
            delay: 1.5 + cloud.delay,
            duration: 0.8,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          <motion.div
            animate={{ x: [0, cloud.floatX, 0], y: [0, cloud.floatY, 0] }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            <CloudSVG
              opacity={0.25 + i * 0.03}
              accentColor={accentColor}
              isLight={mounted && theme === "light"}
            />
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ── 구름 SVG ──
function CloudSVG({
  opacity,
  accentColor,
  isLight,
}: {
  opacity: number;
  accentColor: string;
  isLight: boolean;
}) {
  const c = isLight
    ? `rgba(255, 252, 245, ${opacity + 0.35})`
    : `rgba(200, 215, 255, ${opacity + 0.15})`;

  return (
    <svg width="90" height="50" viewBox="0 0 90 50" fill="none">
      <path
        d="M15 38 Q8 38 8 31 Q8 24 15 24 Q15 16 24 16 Q28 10 36 12 Q40 6 50 8 Q62 8 64 20 Q72 20 72 28 Q72 38 62 38 Z"
        fill={c}
      />
    </svg>
  );
}
