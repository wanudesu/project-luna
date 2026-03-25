"use client";
// src/components/home/MoonOrb.tsx
//
// 📖 학습 포인트:
// 1. useTheme() → 테마 변경 감지
// 2. useAnimate() → 여러 애니메이션을 순서대로 실행 (시퀀스)
// 3. 달 → 해 전환: 달이 내려가고 해가 떠오르는 시퀀스
//
// 기존 마우스 틸트 효과는 그대로 유지합니다.

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimate,
} from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

export function MoonOrb() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // 달 오브 애니메이션 제어용
  const [moonScope, animateMoon] = useAnimate();
  // 해 오브 애니메이션 제어용
  const [sunScope,  animateSun]  = useAnimate();
  // 빛 번짐 오버레이 제어용
  const [burstScope, animateBurst] = useAnimate();

  useEffect(() => setMounted(true), []);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🌅 테마 전환 시퀀스
  //
  // 📖 useAnimate()는 animate(요소, 목표값, 옵션) 형태로
  //    여러 애니메이션을 await로 순서대로 실행할 수 있어요.
  //    Promise 기반이라 "이게 끝나면 저것 시작" 제어가 쉽습니다.
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  useEffect(() => {
    if (!mounted) return;

    const currentlyDark = theme === "dark";
    if (currentlyDark === isDark) return; // 첫 마운트 시 실행 방지
    setIsDark(currentlyDark);

    if (!currentlyDark) {
      // ── 다크 → 라이트: 달 지고 해 뜨기 ──
      runDarkToLight();
    } else {
      // ── 라이트 → 다크: 해 지고 달 뜨기 ──
      runLightToDark();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, mounted]);

  async function runDarkToLight() {
    // 1단계: 달이 아래로 내려가며 사라짐 (0.5s)
    await animateMoon(moonScope.current, {
      y: 60,
      scale: 0.7,
      opacity: 0,
    }, { duration: 0.5, ease: [0.55, 0, 1, 0.45] });

    // 2단계: 해가 아래에서 떠오름 (0.8s)
    await animateSun(sunScope.current, {
      y: [60, -8, 0],
      scale: [0.6, 1.05, 1],
      opacity: [0, 1, 1],
    }, { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] });

    // 3단계: 빛이 화면 전체로 퍼짐 (0.5s, 병렬)
    animateBurst(burstScope.current, {
      scale: [0.8, 3],
      opacity: [0.5, 0],
    }, { duration: 0.5, ease: "easeOut" });
  }

  async function runLightToDark() {
    // 1단계: 해가 내려가며 사라짐 (0.5s)
    await animateSun(sunScope.current, {
      y: 60,
      scale: 0.7,
      opacity: 0,
    }, { duration: 0.5, ease: [0.55, 0, 1, 0.45] });

    // 2단계: 달이 아래에서 떠오름 (0.8s)
    await animateMoon(moonScope.current, {
      y: [60, -8, 0],
      scale: [0.6, 1.05, 1],
      opacity: [0, 1, 1],
    }, { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] });
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🖱️ 마우스 틸트 (기존과 동일)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 50, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - (rect.left + rect.width / 2));
      mouseY.set(e.clientY - (rect.top + rect.height / 2));
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} style={{ perspective: "800px" }}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
        className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px]"
      >

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            🌙 달 오브 (다크모드)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div
          ref={moonScope}
          className="absolute inset-0"
          // 📖 mounted 전에는 테마를 모르니 일단 둘 다 렌더링해두고
          //    opacity로만 제어합니다. (레이아웃 이동 없이 전환 가능)
          style={{ opacity: mounted && !isDark ? 0 : 1 }}
        >
          {/* 가장 바깥 글로우 링 */}
          <motion.div
            className="absolute inset-[-40px] rounded-full"
            animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.05, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: "radial-gradient(circle, rgba(77,124,254,0.2) 0%, transparent 70%)",
            }}
          />
          {/* 중간 글로우 링 */}
          <motion.div
            className="absolute inset-[-16px] rounded-full"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            style={{
              background: "radial-gradient(circle, rgba(77,124,254,0.15) 0%, transparent 70%)",
            }}
          />
          {/* 달 본체 */}
          <div
            className="relative w-full h-full rounded-full overflow-hidden"
            style={{
              background:
                "radial-gradient(ellipse at 35% 35%, #3a4f7a 0%, #1a2540 40%, #0a1020 100%)",
              boxShadow: `
                inset -20px -20px 40px rgba(0,0,0,0.8),
                inset 10px 10px 30px rgba(100,140,220,0.15),
                0 0 40px rgba(77,124,254,0.3),
                0 0 80px rgba(77,124,254,0.15)
              `,
            }}
          >
            {/* 크레이터들 */}
            {[
              { w: "18%", h: "18%", t: "22%", l: "28%", o: 0.4 },
              { w: "12%", h: "12%", t: "52%", l: "18%", o: 0.35 },
              { w: "8%",  h: "8%",  t: "35%", l: "58%", o: 0.3 },
              { w: "22%", h: "22%", t: "60%", l: "52%", o: 0.3 },
            ].map((c, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: c.w, height: c.h, top: c.t, left: c.l,
                  background: `radial-gradient(circle, rgba(0,0,0,${c.o}) 0%, transparent 70%)`,
                }}
              />
            ))}
            {/* 달빛 하이라이트 */}
            <div
              className="absolute rounded-full"
              style={{
                width: "45%", height: "45%", top: "8%", left: "10%",
                background: "radial-gradient(circle, rgba(180,200,255,0.12) 0%, transparent 70%)",
              }}
            />
          </div>
          {/* 회전하는 별 링 */}
          <motion.div
            className="absolute inset-[-24px] rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ border: "1px dashed rgba(77,124,254,0.15)" }}
          >
            {[0, 72, 144, 216, 288].map((deg, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-luna-accent"
                style={{
                  top: "50%", left: "50%",
                  transform: `rotate(${deg}deg) translateX(140px) translateY(-50%)`,
                  opacity: 0.6,
                }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
              />
            ))}
          </motion.div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            ☀️ 해 오브 (라이트모드)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div
          ref={sunScope}
          className="absolute inset-0"
          style={{ opacity: mounted && isDark ? 0 : 1 }}
        >
          {/* 햇빛 글로우 — 가장 바깥 */}
          <motion.div
            className="absolute inset-[-50px] rounded-full"
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.08, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: "radial-gradient(circle, rgba(251,191,36,0.25) 0%, transparent 70%)",
            }}
          />
          {/* 중간 글로우 */}
          <motion.div
            className="absolute inset-[-20px] rounded-full"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: "radial-gradient(circle, rgba(251,191,36,0.2) 0%, transparent 70%)",
            }}
          />
          {/* 해 본체 */}
          <div
            className="relative w-full h-full rounded-full overflow-hidden"
            style={{
              background:
                "radial-gradient(ellipse at 35% 30%, #FDE68A 0%, #F59E0B 45%, #D97706 100%)",
              boxShadow: `
                inset -15px -15px 30px rgba(180,80,0,0.4),
                inset 10px 10px 25px rgba(255,240,180,0.5),
                0 0 50px rgba(251,191,36,0.5),
                0 0 100px rgba(251,191,36,0.25)
              `,
            }}
          >
            {/* 표면 텍스처 */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              style={{
                background: `
                  radial-gradient(ellipse at 30% 40%, rgba(255,255,200,0.15) 0%, transparent 50%),
                  radial-gradient(ellipse at 70% 60%, rgba(180,80,0,0.1) 0%, transparent 40%)
                `,
              }}
            />
          </div>
          {/* 회전하는 빛줄기 링 */}
          <motion.div
            className="absolute inset-[-24px] rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ border: "1px dashed rgba(251,191,36,0.2)" }}
          >
            {[0, 72, 144, 216, 288].map((deg, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  top: "50%", left: "50%",
                  transform: `rotate(${deg}deg) translateX(140px) translateY(-50%)`,
                  background: "rgba(251,191,36,0.8)",
                  boxShadow: "0 0 4px rgba(251,191,36,0.8)",
                }}
                animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
              />
            ))}
          </motion.div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            💥 빛 번짐 오버레이 (전환 순간에만)
            다크→라이트 시 화면 전체로 퍼지는 플래시
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div
          ref={burstScope}
          className="absolute inset-[-100px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(251,191,36,0.35) 0%, transparent 70%)",
            opacity: 0,
          }}
        />

      </motion.div>
    </div>
  );
}