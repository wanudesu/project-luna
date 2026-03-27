"use client";
// src/components/layout/ThemeProvider.tsx
//
// 📖 학습 포인트:
// next-themes는 <html> 태그에 class="dark" 또는 class="light"를
// 자동으로 붙여줍니다. 그러면 globals.css의 .dark / .light
// 변수가 자동으로 적용되는 구조예요.
//
// 왜 별도 컴포넌트로 분리하나?
// layout.tsx는 서버 컴포넌트인데, ThemeProvider는
// "use client"가 필요해요. 그래서 이렇게 분리합니다.

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      // 📖 attribute: "class" → <html class="dark"> 방식으로 테마 적용
      //    globals.css의 .dark / .light 셀렉터와 연결됩니다.
      attribute="class"
      defaultTheme="system"
      enableSystem
      // 📖 disableTransitionOnChange: false
      //    테마 전환 시 CSS transition이 동작하게 허용합니다.
      //    true로 하면 깜빡임 방지를 위해 transition을 잠깐 끄는데
      //    우리는 해 떠오르는 애니메이션을 직접 제어하므로 false로 둡니다.
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}
