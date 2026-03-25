// 이 파일은 브라우저에서 실행 되어야 된다는 선언(스크롤 감지같은 상호작용이 필요하기 때문)
"use client";
// src/components/layout/Header.tsx
//
// 📖 학습 포인트:
// 1. useScrollY → 스크롤 감지로 배경 변화 (useMotionValue + useScroll)
// 2. usePathname → 현재 경로 감지로 활성 링크 표시
// 3. motion.header → Framer Motion으로 헤더 자체에 애니메이션

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📐 네비게이션 링크 데이터
// 나중에 페이지가 추가되면 여기만 수정하면 됩니다.
// as const는 "이 데이터는 절대 변하지 않는 상수야" 라는 뜻
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const NAV_LINKS = [
  { href: "/about", label: "About",  labelJa: "私について" },
  { href: "/kumo",  label: "Kumo",   labelJa: "プロジェクト" },
  { href: "/luna",  label: "Luna",   labelJa: "このサイト" },
] as const;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎬 Header 등장 애니메이션
// headerVariants는 애니메이션의 설계도
// y -16에 숨어있다가 0.6초동안 제자리로 내려오며 나타남
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const headerVariants = {
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 },
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🏗️ Header 컴포넌트
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function Header() {
  const pathname = usePathname();

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 📖 useScroll: 페이지 전체 스크롤 위치를 추적합니다.
  //    scrollY는 픽셀 단위의 현재 스크롤 값입니다. (얼마나 내렸는지)
  //
  // useTransform: scrollY 값을 다른 값으로 변환합니다. (값에 따라 투명도 변환))
  //    [0, 80] → 스크롤 0~80px 구간
  //    [0, 1]  → opacity를 0에서 1로 변환
  //    즉, 스크롤 80px 이상이면 배경이 완전히 불투명해집니다.
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const { scrollY } = useScroll();
  const backdropOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);

    return (
        // 애니메이션이 탑재된 특수 헤더, fixed : 위치 고정, variants : 상태 목록
        //                            initial : 첫 등장 모습, animate : 최종 목표 모습
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── 스크롤 시 나타나는 배경 (별도 레이어로 분리해 성능 최적화) ── */}
      {/*
        📖 왜 별도 div로 만드나?
        header 전체에 opacity를 주면 자식 요소(텍스트 등)도 같이 투명해집니다.
        배경만 따로 레이어로 분리해서 opacity를 조절해야 합니다.
      */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          opacity: backdropOpacity,
          background: "rgba(7, 12, 24, 0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      />

      {/* ── 스크롤 시 나타나는 하단 구분선 ── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          opacity: borderOpacity,
          background:
            "linear-gradient(90deg, transparent, rgba(77,124,254,0.2), transparent)",
        }}
      />

      {/* ── 내부 레이아웃 ── */}
      <div className="page-container">
        <nav className="flex items-center justify-between h-16">

          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2">
            {/* 달 아이콘 (SVG) */}
            <motion.div
              whileHover={{ rotate: -15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M17.5 10.5A7.5 7.5 0 1 1 9.5 2.5a5.5 5.5 0 0 0 8 8z"
                  fill="#4D7CFE"
                  opacity="0.9"
                />
              </svg>
            </motion.div>

            {/* 사이트명 */}
            <span
              className="text-sm font-mono tracking-[0.15em] text-luna-glow uppercase"
              style={{ letterSpacing: "0.2em" }}
            >
              Luna
            </span>
          </Link>

          {/* 네비게이션 링크 */}
          <ul className="flex items-center list-none" style={{ gap: "4px"}}>
            {NAV_LINKS.map((link) => {
              // 📖 pathname이 링크의 href로 시작하면 활성 상태
              //    startsWith를 쓰는 이유: /kumo/detail 같은 하위 경로도 활성화되도록
              const isActive = pathname.startsWith(link.href);

              return (
                <li key={link.href}>
                  <Link href={link.href} className="relative group block" style={{ padding: "6px 16px" }}>

                    {/* 활성 상태 배경 글로우 */}
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-bg"
                        className="absolute inset-0 rounded-lg"
                        style={{
                          background: "rgba(77,124,254,0.08)",
                          border: "1px solid rgba(77,124,254,0.2)",
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}

                    {/* 링크 텍스트 */}
                    <span
                      className={`
                        relative z-10 text-sm font-mono tracking-wide
                        transition-colors duration-200
                        ${isActive
                          ? "text-luna-accent"
                          : "text-luna-mist group-hover:text-luna-silver"
                        }
                      `}
                    >
                      {link.label}
                    </span>

                    {/* 활성 상태 하단 점 인디케이터 */}
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-dot"
                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-luna-accent"
                        style={{boxShadow: "0 0 6px rgba(77,124,254,0.8)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </motion.header>
  );
}