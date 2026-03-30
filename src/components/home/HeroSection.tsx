"use client";
// src/components/home/HeroSection.tsx

import { motion } from "framer-motion";
import Link from "next/link";
import { MoonOrb } from "./MoonOrb";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { homeTranslations } from "@/locales/home";

const STAR_COUNT = 80;

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.6 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function HeroSection() {
  const [stars, setStars] = useState<Star[]>([]);
  const { lang } = useLanguage();
  const t = homeTranslations[lang].hero;

  useEffect(() => {
    setStars(
      Array.from({ length: STAR_COUNT }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 2,
      })),
    );
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "var(--hero-bg)",
          transition: "background 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />

      <div className="absolute inset-0 -z-10">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              background: "var(--color-text-muted)",
            }}
            animate={{ opacity: [0.1, 0.8, 0.1] }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px -z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-accent-glow), transparent)",
        }}
      />

      <div className="page-container w-full">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-4 py-20 md:py-0 min-h-screen">
          <motion.div
            className="flex-1 flex flex-col gap-6 max-w-[560px]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-luna-accent uppercase">
                <span
                  className="inline-block w-2 h-2 rounded-full bg-luna-accent"
                  style={{
                    boxShadow: "0 0 8px rgba(77,124,254,0.8)",
                    animation: "moon-pulse 2s ease-in-out infinite",
                  }}
                />
                {t.available}
              </span>
            </motion.div>

            <div className="flex flex-col gap-1">
              <motion.p
                variants={itemVariants}
                className="text-lg font-light tracking-wide"
                style={{ color: "var(--color-text-muted)" }}
              >
                {t.greeting}
              </motion.p>
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                <span style={{ color: "var(--color-text-glow)" }}>
                  {t.namePrefix}
                </span>
                <span className="text-gradient-luna">{t.name}</span>
                <span style={{ color: "var(--color-text-glow)" }}>
                  {t.nameSuffix}
                </span>
              </motion.h1>
            </div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl leading-relaxed max-w-[420px]"
              style={{ color: "var(--color-text-muted)" }}
            >
              {t.subtitle1}{" "}
              <span style={{ color: "var(--color-text)", fontWeight: 500 }}>
                {t.subtitle2}
              </span>
              <br />
              {t.subtitle3}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 pt-2"
            >
              <Link href="/kumo">
                <motion.button
                  className="relative px-6 py-3 text-sm font-medium text-white rounded-lg overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent) 100%)",
                    boxShadow: "0 0 20px var(--color-accent-glow)",
                  }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 0 32px var(--color-accent-glow)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {t.btnProject}
                </motion.button>
              </Link>
              <Link href="/about">
                <motion.button
                  className="px-6 py-3 text-sm font-medium rounded-lg"
                  style={{
                    border: "1px solid var(--color-border)",
                    background: "transparent",
                    color: "var(--color-text)",
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {t.btnAbout}
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          <div className="flex-1 flex justify-center md:justify-end items-center">
            <MoonOrb />
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span
          className="text-xs font-mono tracking-widest uppercase"
          style={{ color: "var(--color-text-muted)" }}
        >
          scroll
        </span>
        <motion.div
          className="w-px h-8"
          style={{
            background:
              "linear-gradient(to bottom, var(--color-accent), transparent)",
            originY: 0,
          }}
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
