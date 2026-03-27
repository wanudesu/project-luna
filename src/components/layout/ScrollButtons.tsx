"use client";
// src/components/layout/ScrollButtons.tsx

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function ScrollButtons() {
  const [showUp, setShowUp] = useState(false);
  const [showDown, setShowDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      setShowUp(scrollY > 200);
      setShowDown(scrollY < maxScroll - 200);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (direction: "up" | "down") => {
    if (direction === "up") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const buttonStyle = {
    background: "var(--color-bg-surface)",
    border: "1px solid var(--color-border)",
    backdropFilter: "blur(12px)",
    color: "var(--color-text-muted)",
    opacity: 0.85,
  };

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.2, ease: "easeInOut" } }}
      className="fixed right-6 bottom-8 z-40 flex flex-col gap-2"
    >
      <AnimatePresence>
        {showUp && (
          <motion.button
            key="up"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            onClick={() => scrollTo("up")}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={buttonStyle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="맨 위로"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 9L7 4L12 9" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDown && (
          <motion.button
            key="down"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            onClick={() => scrollTo("down")}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={buttonStyle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="맨 아래로"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 5L7 10L12 5" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
