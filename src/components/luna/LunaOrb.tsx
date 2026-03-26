"use client";
// src/components/luna/LunaOrb.tsx
//
// 📖 학습 포인트:
// 1. 타이핑 애니메이션 — useEffect + setInterval로 한 글자씩 추가
// 2. 코드 에디터 UI — 순수 CSS/JSX로 재현
// 3. stagger 등장 — 각 라인이 순서대로 나타남

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// 📖 표시할 코드 라인들
//    실제 이 사이트에서 쓴 코드 스니펫을 보여줘서
//    "진짜로 만든 사이트"라는 느낌을 줍니다.
const CODE_LINES = [
  { indent: 0, tokens: [
    { text: "const ", color: "#A78BFA" },
    { text: "MoonOrb", color: "#4D7CFE" },
    { text: " = () => {", color: "rgba(200,214,232,0.6)" },
  ]},
  { indent: 1, tokens: [
    { text: "const ", color: "#A78BFA" },
    { text: "{ theme }", color: "rgba(200,214,232,0.8)" },
    { text: " = ", color: "rgba(200,214,232,0.5)" },
    { text: "useTheme", color: "#34D399" },
    { text: "()", color: "rgba(200,214,232,0.6)" },
  ]},
  { indent: 1, tokens: [
    { text: "const ", color: "#A78BFA" },
    { text: "isDark", color: "rgba(200,214,232,0.8)" },
    { text: " = theme === ", color: "rgba(200,214,232,0.5)" },
    { text: '"dark"', color: "#FDE68A" },
  ]},
  { indent: 0, tokens: [] }, // 빈 줄
  { indent: 1, tokens: [
    { text: "// 🌙 달 → ☀️ 해 전환", color: "rgba(200,214,232,0.3)" },
  ]},
  { indent: 1, tokens: [
    { text: "return ", color: "#A78BFA" },
    { text: "isDark", color: "rgba(200,214,232,0.8)" },
    { text: " ? ", color: "rgba(200,214,232,0.5)" },
    { text: "<Moon />", color: "#4D7CFE" },
    { text: " : ", color: "rgba(200,214,232,0.5)" },
    { text: "<Sun />", color: "#FBBF24" },
  ]},
  { indent: 0, tokens: [
    { text: "}", color: "rgba(200,214,232,0.6)" },
  ]},
];

export function LunaOrb() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [visibleLines, setVisibleLines] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

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
          background: "radial-gradient(circle, rgba(77,124,254,0.2) 0%, transparent 70%)",
        }}
      />

      {/* ── 에디터 창 ── */}
      <motion.div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "rgba(10,16,32,0.85)",
          border: "1px solid rgba(77,124,254,0.15)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.08)",
        }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* 상단 타이틀 바 */}
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{ borderBottom: "1px solid rgba(77,124,254,0.1)" }}
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
          <div
            className="flex-1 flex justify-center"
          >
            <span
              className="text-[11px] font-mono px-3 py-0.5 rounded-md"
              style={{
                color: "rgba(200,214,232,0.4)",
                background: "rgba(77,124,254,0.06)",
                border: "1px solid rgba(77,124,254,0.1)",
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
              animate={lineIdx < visibleLines ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
            >
              {/* 라인 번호 */}
              <span
                className="select-none text-right shrink-0"
                style={{ color: "rgba(200,214,232,0.18)", minWidth: "1.2rem" }}
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
            borderTop: "1px solid rgba(77,124,254,0.08)",
            background: "rgba(7,12,24,0.5)",
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono" style={{ color: "#4D7CFE" }}>
              TypeScript
            </span>
            <span className="text-[10px] font-mono" style={{ color: "rgba(200,214,232,0.25)" }}>
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
            <span className="text-[10px] font-mono" style={{ color: "#34D399" }}>
              Ln {Math.min(visibleLines, CODE_LINES.length)}
            </span>
          </div>
        </div>
      </motion.div>

      {/* ── 플로팅 태그들 (카드 주변) ── */}
      {[
        // Next.js 글자색만 살짝 더 하늘색 빛이 돌게 수정했습니다 (#E8F0FF -> #A5C8FF)
        { text: "Next.js 15", x: "-12%", y: "12%", color: "#A5C8FF", delay: 2.0 },
        { text: "Framer Motion", x: "72%", y: "8%",  color: "#A78BFA", delay: 2.3 },
        { text: "TypeScript",   x: "75%", y: "80%", color: "#4D7CFE", delay: 2.6 },
        { text: "Tailwind v4",  x: "-8%", y: "78%", color: "#34D399", delay: 2.9 },
      ].map((tag, i) => (
        <motion.div
          key={i}
          className="absolute px-3 py-1.5 rounded-full text-[11px] font-mono whitespace-nowrap pointer-events-none"
          style={{
            left: tag.x,
            top: tag.y,
            color: tag.color,
            // 💡 수정 포인트: 에디터와 통일감 있는 어두운 반투명 배경!
            background: "rgba(10, 16, 32, 0.85)", 
            // 테두리는 글자색과 맞춰서 은은하게
            border: `1px solid ${tag.color}50`, 
            // 그림자를 넣어서 공중에 확실히 뜬 느낌 주기
            boxShadow: "0 8px 16px rgba(0,0,0,0.12)",
            backdropFilter: "blur(8px)"
          }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: tag.delay, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <motion.span
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            className="block tracking-wide font-semibold"
          >
            {tag.text}
          </motion.span>
        </motion.div>
      ))}
    </motion.div>
  );
}
