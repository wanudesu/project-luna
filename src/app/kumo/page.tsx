// src/app/kumo/page.tsx
//
// 📖 학습 포인트:
// generateMetadata vs metadata export
// - 동적 메타데이터가 필요없으면 const metadata로 충분합니다.
// - slug 기반 상세 페이지에서는 generateMetadata를 씁니다.

import type { Metadata } from "next";
import { KumoSection } from "@/components/kumo/KumoSection";

export const metadata: Metadata = {
  title: "Kumo — Projects | Luna Portfolio",
  description:
    "프론트엔드 엔지니어 이원우의 프로젝트 모음. React, Next.js, TypeScript 기반.",
};

export default function KumoPage() {
  return <KumoSection />;
}
