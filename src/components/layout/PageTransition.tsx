// src/components/layout/PageTransition.tsx
//
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📖 [핵심 학습] 왜 App Router에서 페이지 전환이 까다로운가?
//
// Pages Router (구버전): getServerSideProps + _app.tsx 구조라
// AnimatePresence로 비교적 쉽게 전환 애니메이션을 만들 수 있었습니다.
//
// App Router (현재): 서버 컴포넌트가 기본이라
// Framer Motion 같은 클라이언트 라이브러리를 루트 layout에서
// 직접 쓸 수 없습니다. 그래서 "use client" 지시어가 붙은
// 별도 컴포넌트로 분리하는 이 패턴이 필요합니다.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎬 애니메이션 Variants 정의
//
// 📖 Framer Motion의 'variants'는 애니메이션 상태를
//    이름으로 정의하는 객체입니다.
//    initial → animate → exit 순서로 실행됩니다.
//
// 현재 효과: 페이드 + 살짝 위로 올라오는 슬라이드
// (달이 구름 뒤에서 나타나는 느낌을 표현)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const pageVariants = {
  // 페이지 진입 전 상태
  initial: {
    opacity: 0, // 16px 아래에서 시작
    filter: "blur(4px)", // 약간의 블러로 '나타나는' 느낌
  },
  // 페이지가 완전히 보이는 상태
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      // 📖 ease: 애니메이션 가속/감속 곡선
      // easeOut = 처음엔 빠르게, 끝에서 천천히 (자연스러운 착지감)
      ease: [0.25, 0.46, 0.45, 0.94], // custom cubic-bezier (--ease-luna)
    },
  },
  // 페이지가 사라지는 상태
  exit: {
    opacity: 0,
    transition: {
      duration: 0,
    },
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🏗️ PageTransition 컴포넌트
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, filter: "blur(4px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ willChange: "opacity" }}
    >
      {children}
    </motion.div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ✨ [보너스] 페이지 전환 오버레이 (극적인 연출용)
//
// 활성화하려면:
// 1. 위 주석(<TransitionOverlay />) 해제
// 2. AnimatePresence key를 이 컴포넌트에도 적용
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const overlayVariants = {
  initial: { scaleX: 0, originX: 0 },
  animate: {
    scaleX: [0, 1, 1, 0],
    originX: ["0%", "0%", "100%", "100%"],
    transition: {
      duration: 0.7,
      times: [0, 0.4, 0.6, 1],
      ease: "easeInOut",
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function TransitionOverlay({ pathname }: { pathname: string }) {
  return (
    <AnimatePresence>
      <motion.div
        key={`overlay-${pathname}`}
        variants={overlayVariants}
        initial="initial"
        animate="animate"
        className="fixed inset-0 z-50 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, #0D1526 0%, #162038 50%, #0D1526 100%)",
        }}
      />
    </AnimatePresence>
  );
}
