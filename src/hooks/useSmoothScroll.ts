// src/hooks/useSmoothScroll.ts
//
// 📖 학습 포인트:
// 네비게이션 클릭 시 해당 섹션으로 부드럽게 스크롤
//
// 사용법:
// const scrollTo = useSmoothScroll();
// <button onClick={() => scrollTo("about")}>About</button>

import { useCallback } from "react";

export function useSmoothScroll() {
  const scrollTo = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // 네비게이션 높이만큼 오프셋 (선택사항)
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  return scrollTo;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📌 네비게이션 사용 예시
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//
// "use client";
// import { useSmoothScroll } from "@/hooks/useSmoothScroll";
//
// export function Navigation() {
//   const scrollTo = useSmoothScroll();
//
//   const navItems = [
//     { label: "About", id: "about" },
//     { label: "Projects", id: "projects" },
//     { label: "Contact", id: "contact" },
//   ];
//
//   return (
//     <nav className="fixed top-0 ...">
//       {navItems.map((item) => (
//         <button
//           key={item.id}
//           onClick={() => scrollTo(item.id)}
//           className="..."
//         >
//           {item.label}
//         </button>
//       ))}
//     </nav>
//   );
// }
