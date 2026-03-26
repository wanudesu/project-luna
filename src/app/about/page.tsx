// src/app/about/page.tsx
import type { Metadata } from "next";
import { AboutSection } from "@/components/about/AboutSection";

export const metadata: Metadata = {
  title: "About | Luna Portfolio",
  description: "이원우 소개 페이지",
};

export default function AboutPage() {
  return <AboutSection />;
}