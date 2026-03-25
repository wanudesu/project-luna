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
    opacity: 0,
    y: 16,           // 16px 아래에서 시작
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
    y: -8,           // 위로 살짝 사라짐
    filter: "blur(2px)",
    transition: {
      duration: 0.25, // exit은 enter보다 빠르게 (기다리는 느낌 최소화)
      ease: [0.55, 0, 1, 0.45],
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
  // 📖 usePathname(): 현재 URL 경로를 반환합니다.
  // "/", "/about", "/kumo", "/luna" 중 하나가 됩니다.
  // 경로가 바뀔 때마다 이 값이 변경되어 리렌더링됩니다.
  const pathname = usePathname();

  return (
    <>
      {/*
        📖 AnimatePresence: 컴포넌트가 React 트리에서
        '제거'될 때도 애니메이션을 실행할 수 있게 해줍니다.

        - mode="wait": 이전 페이지 exit 애니메이션이 끝난 후
          새 페이지 enter 애니메이션을 시작합니다.
          (동시 실행하면 두 페이지가 겹쳐 보입니다)
      */}
      <AnimatePresence mode="wait" initial={false}>
        {/*
          📖 key={pathname}: React가 경로별로 다른 컴포넌트 인스턴스를
          만들도록 강제합니다. key가 바뀌면 AnimatePresence가
          이전 컴포넌트의 exit → 새 컴포넌트의 enter를 실행합니다.

          initial={false}: 앱 첫 로드 시 enter 애니메이션을 건너뜁니다.
          첫 방문자에게 즉시 콘텐츠를 보여주기 위해서입니다.
        */}
        <motion.div
          key={pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          // will-change: GPU 레이어를 미리 생성해 애니메이션을 매끄럽게 합니다.
          style={{ willChange: "transform, opacity" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/*
        ✨ 페이지 전환 시 화면을 가로지르는 슬라이드 오버레이 효과
        (선택 사항 — 더 극적인 전환 효과를 원한다면 아래 주석을 해제하세요)
      */}
      {/* <TransitionOverlay pathname={pathname} /> */}
    </>
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
