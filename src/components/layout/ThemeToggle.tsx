"use client";
// src/components/layout/ThemeToggle.tsx
//
// 📖 학습 포인트:
// 1. useTheme() → 현재 테마 읽기 + 테마 변경
// 2. mounted 패턴 → hydration 에러 방지
// 3. useThemeTransition → 해/달 전환 시퀀스 트리거

import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 📖 mounted 패턴 (next-themes 필수)
  //
  // 서버에서는 테마를 알 수 없어요 (localStorage가 없으니까).
  // 클라이언트에서 JS가 실행된 후에야 현재 테마를 알 수 있어요.
  // 그래서 mounted 전에는 아무것도 렌더링하지 않아서
  // 서버/클라이언트 불일치(hydration 에러)를 방지합니다.
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />; // 자리만 차지하는 빈 박스

  const isDark = theme === "dark";

  function handleToggle() {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <motion.button
      onClick={handleToggle}
      className="relative w-9 h-9 rounded-full flex items-center justify-center"
      style={{
        background: "rgba(200,214,232,0.04)",
        border: "1px solid rgba(200,214,232,0.1)",
      }}
      whileHover={{
        background: "rgba(200,214,232,0.08)",
        borderColor: "rgba(200,214,232,0.2)",
        scale: 1.05,
      }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
    >
      {/*
        📖 AnimatePresence: 아이콘이 바뀔 때
           이전 아이콘이 exit 애니메이션으로 사라지고
           새 아이콘이 enter 애니메이션으로 나타납니다.
           mode="wait" → 이전 것이 다 사라진 후 새 것 등장
      */}
      <AnimatePresence mode="wait">
        {isDark ? (
          // 🌙 달 아이콘 (다크모드)
          <motion.svg
            key="moon"
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <path
              d="M17.5 10.5A7.5 7.5 0 1 1 9.5 2.5a5.5 5.5 0 0 0 8 8z"
              fill="#4D7CFE"
              opacity="0.9"
            />
          </motion.svg>
        ) : (
          // ☀️ 해 아이콘 (라이트모드)
          <motion.svg
            key="sun"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            initial={{ opacity: 0, rotate: 30, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -30, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {/* 중앙 원 */}
            <circle cx="12" cy="12" r="4" fill="#F59E0B" />
            {/* 8방향 빛줄기 */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <motion.line
                key={deg}
                x1="12"
                y1="2"
                x2="12"
                y2="5"
                stroke="#F59E0B"
                strokeWidth="2"
                strokeLinecap="round"
                style={{
                  transformOrigin: "12px 12px",
                  transform: `rotate(${deg}deg)`,
                }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: (deg / 360) * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
