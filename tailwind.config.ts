// tailwind.config.ts
//
// 📖 학습 포인트:
// Tailwind의 `extend`를 사용해 Luna 전용 디자인 토큰을 주입합니다.
// 이렇게 하면 className="bg-luna-navy" 처럼 의미 있는 이름으로
// 색상을 사용할 수 있어 코드 가독성이 높아집니다.

import type { Config } from "tailwindcss";

const config: Config = {
  // ✅ darkMode: 'class' — <html> 태그에 'dark' 클래스가 붙으면
  //    dark: 접두사가 붙은 스타일이 활성화됩니다. (next-themes와 연동)
  darkMode: "class",

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 🎨 Luna 컬러 팔레트
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      colors: {
        luna: {
          // 배경 레이어 (어두울수록 더 뒤에 있는 느낌)
          void: "#03050A",       // 가장 깊은 우주 블랙
          deep: "#070C18",       // 기본 페이지 배경
          navy: "#0D1526",       // 카드/패널 배경
          surface: "#162038",    // 호버 시 표면
          border: "#1E2D4A",     // 경계선

          // 텍스트 & 글로우 레이어
          silver: "#C8D6E8",     // 기본 본문 텍스트
          mist: "#8899B4",       // 서브 텍스트, 캡션
          glow: "#E8F0FF",       // 강조 텍스트 (달빛 흰색)

          // 포인트 컬러
          accent: "#4D7CFE",     // 인터랙션 포인트 (푸른 달빛)
          "accent-glow": "rgba(77, 124, 254, 0.3)", // 글로우 효과용
        },
      },

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 📐 8px 그리드 시스템
      // Tailwind 기본값이 4px(0.25rem) 기반이라
      // spacing을 재정의해 8px 기준으로 맞춥니다.
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      spacing: {
        "0": "0px",
        "1": "8px",   // 기본 단위: 8px
        "2": "16px",
        "3": "24px",
        "4": "32px",
        "5": "40px",
        "6": "48px",
        "7": "56px",
        "8": "64px",
        "10": "80px",
        "12": "96px",
        "16": "128px",
        "20": "160px",
        "24": "192px",
        // 기존 Tailwind 값과 혼용이 필요하면 아래처럼 추가
        "px": "1px",
        "0.5": "4px",
      },

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 🔤 타이포그래피
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      fontFamily: {
        // Google Fonts로 로드할 예정 (layout.tsx에서 next/font 사용)
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        display: ["var(--font-display)", "serif"], // 히어로 제목용 세리프
      },

      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],    // 10px
        xs:   ["0.75rem",  { lineHeight: "1.125rem" }], // 12px
        sm:   ["0.875rem", { lineHeight: "1.375rem" }], // 14px
        base: ["1rem",     { lineHeight: "1.625rem" }], // 16px
        lg:   ["1.125rem", { lineHeight: "1.75rem" }],  // 18px
        xl:   ["1.25rem",  { lineHeight: "1.875rem" }], // 20px
        "2xl":["1.5rem",   { lineHeight: "2rem" }],     // 24px
        "3xl":["2rem",     { lineHeight: "2.5rem" }],   // 32px
        "4xl":["2.5rem",   { lineHeight: "3rem" }],     // 40px
        "5xl":["3.5rem",   { lineHeight: "4rem" }],     // 56px
        "6xl":["4.5rem",   { lineHeight: "5rem" }],     // 72px
      },

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // ✨ 글로우 Shadow 커스텀 토큰
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      boxShadow: {
        "glow-sm":  "0 0 12px rgba(77, 124, 254, 0.2)",
        "glow-md":  "0 0 24px rgba(77, 124, 254, 0.3)",
        "glow-lg":  "0 0 48px rgba(77, 124, 254, 0.4)",
        "glow-silver": "0 0 20px rgba(200, 214, 232, 0.15)",
      },

      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // 🎬 커스텀 애니메이션
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      keyframes: {
        "moon-pulse": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "moon-pulse": "moon-pulse 4s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
