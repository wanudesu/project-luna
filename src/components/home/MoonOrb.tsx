"use client";
// src/components/home/MoonOrb.tsx
//
// 📖 학습 포인트:
// Canvas 없이 순수 CSS + Framer Motion으로
// 달 오브를 만듭니다. CSS만으로도 충분히
// 풍부한 시각 효과를 낼 수 있어요.

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export function MoonOrb() {
  const containerRef = useRef<HTMLDivElement>(null);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🖱️ 마우스 틸트 효과
  //
  // 📖 useMotionValue: Framer Motion의 반응형 값.
  //    useState와 달리 변경 시 리렌더링을 유발하지 않아
  //    애니메이션 성능에 최적화되어 있습니다.
  //
  // 📖 useSpring: 값이 바뀔 때 스프링 물리 효과를 적용.
  //    마우스를 움직이면 달이 약간 늦게 따라오는
  //    자연스러운 느낌을 만들어줍니다.
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 50, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    // perspective: 3D 원근감을 위해 부모에 설정
    <div ref={containerRef} style={{ perspective: "800px" }}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
        className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px]"
      >
        {/* ── 가장 바깥 글로우 링 (희미하게 퍼지는 달빛) ── */}
        <motion.div
          className="absolute inset-[-40px] rounded-full"
          animate={{
            opacity: [0.15, 0.3, 0.15],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle, rgba(77,124,254,0.2) 0%, transparent 70%)",
          }}
        />

        {/* ── 중간 글로우 링 ── */}
        <motion.div
          className="absolute inset-[-16px] rounded-full"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          style={{
            background:
              "radial-gradient(circle, rgba(77,124,254,0.15) 0%, transparent 70%)",
          }}
        />

        {/* ── 달 본체 ── */}
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
          {/* 달 표면 크레이터 (순수 CSS) */}
          <div
            className="absolute rounded-full"
            style={{
              width: "18%", height: "18%",
              top: "22%", left: "28%",
              background: "radial-gradient(circle, rgba(0,0,0,0.4) 0%, transparent 70%)",
              boxShadow: "inset 2px 2px 4px rgba(0,0,0,0.5)",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: "12%", height: "12%",
              top: "52%", left: "18%",
              background: "radial-gradient(circle, rgba(0,0,0,0.35) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: "8%", height: "8%",
              top: "35%", left: "58%",
              background: "radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: "22%", height: "22%",
              top: "60%", left: "52%",
              background: "radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 70%)",
            }}
          />

          {/* 달빛 하이라이트 (좌상단 빛 반사) */}
          <div
            className="absolute rounded-full"
            style={{
              width: "45%", height: "45%",
              top: "8%", left: "10%",
              background:
                "radial-gradient(circle, rgba(180,200,255,0.12) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* ── 회전하는 별 링 ── */}
        <motion.div
          className="absolute inset-[-24px] rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ border: "1px dashed rgba(77,124,254,0.15)" }}
        >
          {/* 링 위의 작은 별들 */}
          {[0, 72, 144, 216, 288].map((deg, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-luna-accent"
              style={{
                top: "50%",
                left: "50%",
                transform: `rotate(${deg}deg) translateX(${140}px) translateY(-50%)`,
                opacity: 0.6,
              }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
