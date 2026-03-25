// src/app/luna/page.tsx

import type { Metadata } from "next";
import { LunaSection } from "@/components/luna/LunaSection";

export const metadata: Metadata = {
  title: "Luna — このサイトについて | Portfolio",
  description:
    "このポートフォリオサイトの制作背景・技術スタック・AIとの協業プロセスについて。",
};

export default function LunaPage() {
  return <LunaSection />;
}
