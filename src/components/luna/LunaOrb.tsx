"use client";
// src/components/luna/LunaOrb.tsx
//
// 📖 학습 포인트:
// 1. 타이핑 애니메이션 — useEffect + setInterval로 한 글자씩 추가
// 2. 코드 에디터 UI — 순수 CSS/JSX로 재현
// 3. stagger 등장 — 각 라인이 순서대로 나타남

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export function LunaOrb() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [visibleLines, setVisibleLines] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const { resolvedTheme: theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isLight = mounted && theme === "light";

  // 📖 표시할 코드 라인들
  //    실제 이 사이트에서 쓴 코드 스니펫을 보여줘서
  //    "진짜로 만든 사이트"라는 느낌을 줍니다.
  const CODE_LINES = [
    {
      indent: 0,
      tokens: [
        { text: "const ", color: isLight ? "#7C3AED" : "#569CD6" },
        { text: "MoonOrb", color: isLight ? "#1D4ED8" : "#9CDCFE" },
        { text: " = () => {", color: isLight ? "#374151" : "#D4D4D4" },
      ],
    },
    {
      indent: 1,
      tokens: [
        { text: "const ", color: isLight ? "#7C3AED" : "#569CD6" },
        { text: "{ resolvedTheme }", color: isLight ? "#1D4ED8" : "#9CDCFE" },
        { text: " = ", color: isLight ? "#374151" : "#D4D4D4" },
        { text: "useTheme", color: isLight ? "#059669" : "#4EC994" },
        { text: "()", color: isLight ? "#374151" : "#D4D4D4" },
      ],
    },
    {
      indent: 1,
      tokens: [
        { text: "const ", color: isLight ? "#7C3AED" : "#569CD6" },
        { text: "isDark", color: isLight ? "#1D4ED8" : "#9CDCFE" },
        {
          text: " = resolvedTheme === ",
          color: isLight ? "#374151" : "#D4D4D4",
        },
        { text: '"dark"', color: isLight ? "#B45309" : "#CE9178" },
      ],
    },
    { indent: 0, tokens: [] },
    {
      indent: 1,
      tokens: [
        {
          text: "// 🌙 달 → 🌕 보름달 전환",
          color: isLight ? "#6B7280" : "#6A9955",
        },
      ],
    },
    {
      indent: 1,
      tokens: [
        { text: "return ", color: isLight ? "#7C3AED" : "#C586C0" },
        { text: "isDark", color: isLight ? "#1D4ED8" : "#9CDCFE" },
        { text: " ? ", color: isLight ? "#374151" : "#D4D4D4" },
        { text: "<Moon />", color: isLight ? "#1D4ED8" : "#4D7CFE" },
        { text: " : ", color: isLight ? "#374151" : "#D4D4D4" },
        { text: "<Full-moon />", color: isLight ? "#B45309" : "#FBBF24" },
      ],
    },
    {
      indent: 0,
      tokens: [{ text: "}", color: isLight ? "#374151" : "#D4D4D4" }],
    },
  ];

  // 📖 isInView가 true가 되면 라인을 하나씩 순차적으로 표시
  useEffect(() => {
    if (!isInView) return;
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setVisibleLines(count);
      if (count >= CODE_LINES.length) clearInterval(interval);
    }, 220);
    return () => clearInterval(interval);
  }, [isInView]);

  // 커서 깜빡임
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={ref}
      className="relative w-[300px] md:w-[420px]"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }}
    >
      {/* ── 배경 글로우 ── */}
      <motion.div
        className="absolute inset-[-30px] rounded-full pointer-events-none"
        animate={{ opacity: [0.06, 0.15, 0.06], scale: [1, 1.05, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle, rgba(77,124,254,0.2) 0%, transparent 70%)",
        }}
      />

      {/* ── 에디터 창 ── */}
      <motion.div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: isLight
            ? "rgba(250,250,255,0.95)"
            : "rgba(10,16,32,0.85)",
          border: isLight
            ? "1px solid rgba(0,0,0,0.1)"
            : "1px solid rgba(77,124,254,0.15)",
          backdropFilter: "blur(16px)",
          boxShadow: isLight
            ? "0 24px 60px rgba(180,120,60,0.15), 0 0 0 1px rgba(184,120,32,0.12)"
            : "0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(77,124,254,0.08)",
        }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* 상단 타이틀 바 */}
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{
            borderBottom: isLight
              ? "1px solid rgba(0,0,0,0.08)"
              : "1px solid rgba(77,124,254,0.1)",
          }}
        >
          {/* 신호등 버튼 */}
          <div className="flex gap-1.5">
            {["#FF5F57", "#FFBD2E", "#28C840"].map((color, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full"
                style={{ background: color, opacity: 0.8 }}
              />
            ))}
          </div>
          {/* 파일명 */}
          <div className="flex-1 flex justify-center">
            <span
              className="text-[11px] font-mono px-3 py-0.5 rounded-md"
              style={{
                color: isLight ? "#1D4ED8" : "rgba(173,209,255,0.36)",
                background: isLight
                  ? "rgba(77,124,254,0.08)"
                  : "rgba(77,124,254,0.06)",
                border: isLight
                  ? "1px solid rgba(77,124,254,0.25)"
                  : "1px solid rgba(77,124,254,0.1)",
              }}
            >
              MoonOrb.tsx
            </span>
          </div>
          {/* 우측 여백 맞추기 */}
          <div className="w-12" />
        </div>

        {/* 코드 영역 */}
        <div className="px-5 py-5 font-mono text-[13px] leading-[1.8]">
          {/* 라인 번호 + 코드 */}
          {CODE_LINES.map((line, lineIdx) => (
            <motion.div
              key={lineIdx}
              className="flex gap-4"
              initial={{ opacity: 0, x: -8 }}
              animate={
                lineIdx < visibleLines
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -8 }
              }
              transition={{ duration: 0.2 }}
            >
              {/* 라인 번호 */}
              <span
                className="select-none text-right shrink-0"
                style={{
                  color: isLight ? "rgba(0,0,0,0.2)" : "rgba(200,214,232,0.18)",
                  minWidth: "1.2rem",
                }}
              >
                {lineIdx + 1}
              </span>

              {/* 코드 내용 */}
              <span>
                {/* 들여쓰기 */}
                {"  ".repeat(line.indent)}
                {/* 토큰들 */}
                {line.tokens.map((token, tokenIdx) => (
                  <span key={tokenIdx} style={{ color: token.color }}>
                    {token.text}
                  </span>
                ))}
                {/* 마지막 라인에 커서 */}
                {lineIdx === visibleLines - 1 && (
                  <span
                    className="inline-block w-[2px] h-[14px] ml-[1px] align-middle"
                    style={{
                      background: "#4D7CFE",
                      opacity: cursorVisible ? 1 : 0,
                      transition: "opacity 0.1s",
                    }}
                  />
                )}
              </span>
            </motion.div>
          ))}
        </div>

        {/* 하단 상태 바 */}
        <div
          className="flex items-center justify-between px-4 py-2"
          style={{
            borderTop: isLight
              ? "1px solid rgba(0,0,0,0.06)"
              : "1px solid rgba(77,124,254,0.08)",
            background: isLight ? "rgba(240,240,248,0.8)" : "rgba(7,12,24,0.5)",
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="text-[10px] font-mono"
              style={{ color: "#4D7CFE" }}
            >
              TypeScript
            </span>
            <span
              className="text-[10px] font-mono"
              style={{
                color: isLight ? "rgba(0,0,0,0.35)" : "rgba(200,214,232,0.25)",
              }}
            >
              UTF-8
            </span>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#34D399" }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span
              className="text-[10px] font-mono"
              style={{ color: isLight ? "#059669" : "#34D399" }}
            >
              Ln {Math.min(visibleLines, CODE_LINES.length)}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
