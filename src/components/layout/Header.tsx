"use client";
// src/components/layout/Header.tsx
// ThemeToggle 버튼 추가 — 나머지는 기존과 동일

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/about", label: "About",  labelJa: "私について" },
  { href: "/kumo",  label: "Kumo",   labelJa: "プロジェクト" },
  { href: "/luna",  label: "Luna",   labelJa: "このサイト" },
] as const;

const headerVariants = {
  hidden:  { opacity: 0, y: -16 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 },
  },
};

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const backdropOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const borderOpacity   = useTransform(scrollY, [0, 80], [0, 1]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      variants={headerVariants}
      initial={false}
      animate="visible"
    >
      {/* 스크롤 시 배경 */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          opacity: backdropOpacity,
          background: "rgba(7, 12, 24, 0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      />
      {/* 하단 구분선 */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          opacity: borderOpacity,
          background: "linear-gradient(90deg, transparent, rgba(77,124,254,0.2), transparent)",
        }}
      />

      <div className="page-container">
        <nav className="flex items-center justify-between h-16">

          {/* 로고 */}
          <Link href="/" className="group flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: -15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M17.5 10.5A7.5 7.5 0 1 1 9.5 2.5a5.5 5.5 0 0 0 8 8z"
                  fill="#4D7CFE"
                  opacity="0.9"
                />
              </svg>
            </motion.div>
            <span
              className="text-sm font-mono tracking-[0.15em] text-luna-glow uppercase"
              style={{ letterSpacing: "0.2em" }}
            >
              Luna
            </span>
          </Link>

          {/* 우측: 네비 + 토글 */}
          <div className="flex items-center gap-2">

            {/* 네비게이션 링크 */}
            <ul className="flex items-center list-none gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link href={link.href} className="relative group px-4 py-2 block">
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
                      {isActive && (
                        <motion.div
                          layoutId="active-nav-dot"
                          className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-luna-accent"
                          style={{ boxShadow: "0 0 6px rgba(77,124,254,0.8)" }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* 📖 ThemeToggle: 네비 오른쪽 끝에 배치 */}
            <ThemeToggle />

          </div>
        </nav>
      </div>
    </motion.header>
  );
}