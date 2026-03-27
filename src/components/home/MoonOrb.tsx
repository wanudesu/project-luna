"use client";
// src/components/home/MoonOrb.tsx
//
// 📖 학습 포인트:
// 1. useDragControls + drag → 드래그 가능한 요소
// 2. useTransform → 드래그 거리를 scaleX/scaleY로 변환 (늘어남 효과)
// 3. useSpring → 놓으면 탄성 있게 원래 자리로 복귀
// 4. SVG mask → 초승달 모양

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

  const [moonScope, animateMoon] = useAnimate();
  const [sunScope, animateSun] = useAnimate();
  const [burstScope, animateBurst] = useAnimate();

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🖱️ 드래그 → 늘어남 효과
  //
  // 📖 dragX, dragY: 드래그로 이동한 거리 (픽셀)
  //    useTransform으로 거리를 scale로 변환합니다.
  //    x축으로 많이 당길수록 가로로 늘어나고 세로는 줄어들어요.
  //    (부피 보존 법칙처럼 한쪽이 늘면 다른쪽이 줄어야 자연스럽습니다)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // 드래그 거리 → scaleX 변환 (최대 1.35까지)
  const rawScaleX = useTransform(
    dragX,
    [-200, -100, 0, 100, 200],
    [1.35, 1.18, 1, 1.18, 1.35],
  );
  // 드래그 거리 → scaleY 변환 (x가 늘면 y는 줄어듦)
  const rawScaleY = useTransform(
    dragY,
    [-200, -100, 0, 100, 200],
    [1.35, 1.18, 1, 1.18, 1.35],
  );

  // 📖 useSpring: 놓는 순간 탄성 있게 원래 값(1)으로 복귀
  //    stiffness 높을수록 빠르게 복귀, damping 낮을수록 더 통통 튐
  const scaleX = useSpring(rawScaleX, { stiffness: 180, damping: 12 });
  const scaleY = useSpring(rawScaleY, { stiffness: 180, damping: 12 });

  // x/y 위치도 스프링 복귀
  const springX = useSpring(dragX, { stiffness: 200, damping: 20 });
  const springY = useSpring(dragY, { stiffness: 200, damping: 20 });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🖱️ 마우스 틸트 (기존)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltConfig = { stiffness: 50, damping: 20 };
  const rotateX = useSpring(
    useTransform(mouseY, [-300, 300], [8, -8]),
    tiltConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-300, 300], [-8, 8]),
    tiltConfig,
  );

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const currentlyDark = theme === "dark";
    if (currentlyDark) {
      animateMoon(
        moonScope.current,
        { opacity: 1, y: 0, scale: 1 },
        { duration: 0 },
      );
      animateSun(
        sunScope.current,
        { opacity: 0, y: 80, scale: 0.5 },
        { duration: 0 },
      );
    } else {
      animateMoon(
        moonScope.current,
        { opacity: 0, y: 80, scale: 0.5 },
        { duration: 0 },
      );
      animateSun(
        sunScope.current,
        { opacity: 1, y: 0, scale: 1 },
        { duration: 0 },
      );
    }
    setIsDark(currentlyDark);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const currentlyDark = theme === "dark";
    if (currentlyDark === isDark) return;
    setIsDark(currentlyDark);
    if (!currentlyDark) runDarkToLight();
    else runLightToDark();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  async function runDarkToLight() {
    animateMoon(
      moonScope.current,
      { y: 80, scale: 0.5, opacity: 0 },
      { duration: 0.4, ease: [0.55, 0, 1, 0.45] },
    );
    await animateSun(
      sunScope.current,
      {
        y: [80, 40, -8, 0],
        scale: [0.4, 0.7, 1.05, 1],
        opacity: [0, 0.2, 0.8, 1],
      },
      { duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] },
    );
    animateBurst(
      burstScope.current,
      { scale: [0.8, 3], opacity: [0.5, 0] },
      { duration: 0.5, ease: "easeOut" },
    );
  }

  async function runLightToDark() {
    await animateSun(
      sunScope.current,
      { y: 80, scale: 0.5, opacity: [1, 0] },
      { duration: 0.5, ease: [0.55, 0, 1, 0.45] },
    );
    await animateMoon(
      moonScope.current,
      {
        y: [80, -8, 0],
        scale: [0.5, 1.05, 1],
        opacity: [0, 0.5, 1],
      },
      { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    );
  }

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
      {/*
        📖 드래그 가능한 외부 wrapper
        drag: true → x/y 모두 드래그 가능
        dragElastic: 0.15 → 경계 바깥으로 살짝 나갈 수 있게 (탱탱한 느낌)
        dragConstraints: 이동 가능한 최대 범위 제한
        x, y: dragX, dragY에 연결 → 이동 거리를 실시간으로 추적
      */}
      <motion.div
        drag
        dragElastic={0.15}
        dragConstraints={{ left: -80, right: 80, top: -80, bottom: 80 }}
        dragMomentum={false}
        x={springX}
        y={springY}
        onDrag={(_, info) => {
          dragX.set(info.offset.x);
          dragY.set(info.offset.y);
        }}
        onDragEnd={() => {
          // 📖 드래그 끝나면 원점으로 스프링 복귀
          dragX.set(0);
          dragY.set(0);
        }}
        style={{ cursor: "grab" }}
        whileDrag={{ cursor: "grabbing" }}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            // 📖 드래그 거리에 따라 scaleX/scaleY 변환 → 늘어남 효과
            scaleX,
            scaleY,
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.4,
          }}
          // 📖 크기 키움: 기존 280/380 → 320/440
          className="relative w-[320px] h-[320px] md:w-[440px] md:h-[440px]"
        >
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              🌙 초승달 (다크모드)
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div ref={moonScope} className="absolute inset-0">
            {/* 달빛 글로우 */}
            <motion.div
              className="absolute inset-[-60px] rounded-full pointer-events-none"
              animate={{ opacity: [0.1, 0.28, 0.1], scale: [1, 1.08, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background:
                  "radial-gradient(circle at 60% 40%, rgba(77,124,254,0.28) 0%, transparent 65%)",
              }}
            />
            <motion.div
              className="absolute inset-[-10px] rounded-full pointer-events-none"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              }}
              style={{
                background:
                  "radial-gradient(circle at 60% 40%, rgba(120,160,255,0.2) 0%, transparent 60%)",
              }}
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.svg
                viewBox="0 0 200 200"
                className="w-full h-full"
                animate={{ rotate: [0, 3, -2, 0] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <defs>
                  <mask id="crescent-mask">
                    <circle cx="100" cy="100" r="75" fill="white" />
                    <circle cx="132" cy="83" r="64" fill="black" />
                  </mask>
                  <radialGradient id="moon-gradient" cx="32%" cy="32%" r="68%">
                    <stop offset="0%" stopColor="#A8C0F0" />
                    <stop offset="25%" stopColor="#6B90D8" />
                    <stop offset="60%" stopColor="#3060A8" />
                    <stop offset="100%" stopColor="#0F1E40" />
                  </radialGradient>
                  <filter id="moon-glow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite
                      in="SourceGraphic"
                      in2="blur"
                      operator="over"
                    />
                  </filter>
                </defs>

                {/* 달 본체 */}
                <circle
                  cx="100"
                  cy="100"
                  r="75"
                  fill="url(#moon-gradient)"
                  mask="url(#crescent-mask)"
                  filter="url(#moon-glow)"
                />
                {/* 가장자리 하이라이트 */}
                <circle
                  cx="100"
                  cy="100"
                  r="75"
                  fill="none"
                  mask="url(#crescent-mask)"
                  stroke="rgba(180,210,255,0.35)"
                  strokeWidth="2"
                />
                {/* 크레이터 */}
                <g mask="url(#crescent-mask)" opacity="0.5">
                  <circle cx="78" cy="85" r="6" fill="rgba(0,0,0,0.35)" />
                  <circle cx="70" cy="118" r="4" fill="rgba(0,0,0,0.28)" />
                  <circle cx="88" cy="135" r="5" fill="rgba(0,0,0,0.22)" />
                  <circle cx="60" cy="98" r="3" fill="rgba(0,0,0,0.2)" />
                </g>
              </motion.svg>
            </div>

            {/* 주변 별들 */}
            {[
              { x: "12%", y: "18%", size: 3, delay: 0 },
              { x: "78%", y: "12%", size: 2, delay: 0.8 },
              { x: "88%", y: "52%", size: 2.5, delay: 1.5 },
              { x: "18%", y: "72%", size: 2, delay: 0.4 },
              { x: "62%", y: "82%", size: 3, delay: 1.2 },
              { x: "42%", y: "8%", size: 1.5, delay: 2 },
              { x: "5%", y: "45%", size: 2, delay: 0.6 },
              { x: "90%", y: "28%", size: 1.5, delay: 1.8 },
            ].map((s, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none"
                style={{ left: s.x, top: s.y }}
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  delay: s.delay,
                  ease: "easeInOut",
                }}
              >
                <svg width={s.size * 4} height={s.size * 4} viewBox="0 0 12 12">
                  <path
                    d="M6 0 L6.8 5.2 L12 6 L6.8 6.8 L6 12 L5.2 6.8 L0 6 L5.2 5.2 Z"
                    fill="rgba(180,210,255,0.9)"
                  />
                </svg>
              </motion.div>
            ))}
          </div>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          🌕 보름달 (라이트모드)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div ref={sunScope} className="absolute inset-0">
            {/* 달빛 글로우 — 초승달이랑 동일 스타일 */}
            <motion.div
              className="absolute inset-[-60px] rounded-full pointer-events-none"
              animate={{ opacity: [0.04, 0.18, 0.04], scale: [1, 1.02, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(255,220,0,0.04) 0%, transparent 55%)",
              }}
            />
            <motion.div
              className="absolute inset-[-10px] rounded-full pointer-events-none"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              }}
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(180,210,255,0.18) 0%, transparent 60%)",
              }}
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.svg
                viewBox="0 0 200 200"
                className="w-full h-full"
                animate={{ rotate: [0, 2, -1, 0] }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <defs>
                  <radialGradient
                    id="fullmoon-gradient"
                    cx="38%"
                    cy="32%"
                    r="68%"
                  >
                    <stop offset="0%" stopColor="#FFFDE0" />
                    <stop offset="35%" stopColor="#FFE87A" />
                    <stop offset="70%" stopColor="#FFCC33" />
                    <stop offset="100%" stopColor="#F0A500" />
                  </radialGradient>
                  <filter id="fullmoon-glow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite
                      in="SourceGraphic"
                      in2="blur"
                      operator="over"
                    />
                  </filter>
                  {/* 달 원형으로 클리핑 */}
                  <clipPath id="moon-clip">
                    <circle cx="100" cy="100" r="75" />
                  </clipPath>
                </defs>
                {/* 달 본체 */}
                <circle
                  cx="100"
                  cy="100"
                  r="75"
                  fill="url(#fullmoon-gradient)"
                  filter="url(#fullmoon-glow)"
                />
                {/* 크레이터 — clipPath로 달 원 밖으로 나가면 잘림 */}
                <g clipPath="url(#moon-clip)" opacity="0.2">
                  <circle cx="55" cy="85" r="10" fill="rgba(0,0,0,0.15)" />
                  <circle cx="78" cy="145" r="13" fill="rgba(0,0,0,0.15)" />
                  <circle cx="135" cy="115" r="9" fill="rgba(0,0,0,0.12)" />
                  <circle cx="45" cy="130" r="7" fill="rgba(0,0,0,0.12)" />
                  <circle cx="120" cy="55" r="8" fill="rgba(0,0,0,0.1)" />
                </g>
                {/* 가장자리 하이라이트 */}
                <circle
                  cx="100"
                  cy="100"
                  r="75"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="2"
                />
                <radialGradient
                  id="fullmoon-gradient"
                  cx="50%"
                  cy="45%"
                  r="65%"
                >
                  <stop offset="0%" stopColor="#FFF5C0" />
                  <stop offset="40%" stopColor="#FFD84D" />
                  <stop offset="100%" stopColor="#F5A623" />
                </radialGradient>

                <circle cx="72" cy="68" r="3" fill="rgba(255,255,255,0.08)" />
                <circle cx="70" cy="66" r="1.5" fill="rgba(255,255,255,0.12)" />
                <circle
                  cx="100"
                  cy="100"
                  r="75"
                  fill="none"
                  stroke="rgba(255,200,50,0.3)"
                  strokeWidth="1.5"
                />
              </motion.svg>
            </div>

            {/* 주변 별들 */}
            {[
              { x: "12%", y: "18%", delay: 0 },
              { x: "78%", y: "12%", delay: 0.8 },
              { x: "88%", y: "52%", delay: 1.5 },
              { x: "18%", y: "72%", delay: 0.4 },
              { x: "62%", y: "82%", delay: 1.2 },
              { x: "42%", y: "8%", delay: 2 },
              { x: "5%", y: "45%", delay: 0.6 },
              { x: "90%", y: "28%", delay: 1.8 },
              { x: "30%", y: "5%", delay: 0.3 },
              { x: "70%", y: "90%", delay: 1.1 },
            ].map((s, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none"
                style={{ left: s.x, top: s.y }}
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  delay: s.delay,
                  ease: "easeInOut",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 12 12">
                  <path
                    d="M6 0 L6.8 5.2 L12 6 L6.8 6.8 L6 12 L5.2 6.8 L0 6 L5.2 5.2 Z"
                    fill="rgba(255,210,80,0.9)"
                  />
                </svg>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
