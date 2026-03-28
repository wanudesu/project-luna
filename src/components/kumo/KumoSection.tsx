"use client";
// src/components/kumo/KumoSection.tsx
//
// 📖 학습 포인트:
// 1. useInView → 스크롤 진입 시 요소별 애니메이션 트리거
// 2. motion.div + variants → 섹션별 일관된 fade-up 패턴
// 3. 스토리텔링 레이아웃 = 시간 순서대로 읽히는 세로 흐름 설계

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { KumoOrb } from "./KumoOrb";
import { useTheme } from "next-themes";
import { ContactSection } from "@/components/home/ContactSection";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎬 공통 Variants
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🔧 섹션 진입 감지 훅 (재사용)
//
// 📖 커스텀 훅으로 분리하면 각 섹션에서
//    ref, isInView 선언을 반복하지 않아도 됩니다.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function useSectionInView() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  return { ref, isInView };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📦 데이터
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const TECH_STACK = [
  { name: "Java", category: "Backend", color: "#FB923C" },
  { name: "Spring Boot", category: "Backend", color: "#FB923C" },
  { name: "JavaScript", category: "Frontend", color: "#4D7CFE" },
  { name: "HTML / CSS", category: "Frontend", color: "#4D7CFE" },
  { name: "jQuery", category: "Frontend", color: "#4D7CFE" },
  { name: "Ajax", category: "Frontend", color: "#4D7CFE" },
  { name: "WebSocket", category: "Infra", color: "#34D399" },
  { name: "STOMP", category: "Infra", color: "#34D399" },
  { name: "Google Maps API", category: "API", color: "#A78BFA" },
  { name: "MySQL", category: "DB", color: "#F472B6" },
];

const MY_FEATURES = [
  {
    icon: "👤",
    title: "리쿠르터 페이지",
    desc: "메인 대시보드부터 공고 등록 및 관리, 지원자 관리까지 구인자 전용 페이지를 전담 구현",
  },
  {
    icon: "📋",
    title: "리쿠르터 켈린더",
    desc: "구인자가 어느 페이지에서도 일정을 확인할 수 있도록 미니 켈린더를 만들어 캘린더와 연동하였습니다.",
  },
  {
    icon: "🌓",
    title: "테마 플리커 방지",
    desc: "다크/라이트 모드 전환 시 발생하는 깜빡임 현상을 직접 발견하고 해결했습니다.",
  },
];

const TIMELINE = [
  {
    phase: "01",
    title: "첫 킥오프",
    period: "1월 말",
    color: "#4D7CFE",
    story:
      "태어나서 처음 해보는 팀 프로젝트. 브랜치를 왜 나누는지, 컨펌은 어떻게 받는지도 몰랐다. 팀원들이 다들 나보다 실력이 좋아 보여서 솔직히 위축됐다.",
  },
  {
    phase: "02",
    title: "담당 구역 배정",
    period: "2월 초",
    color: "#A78BFA",
    story:
      "리쿠르터 페이지 전담을 맡았다. 다른 팀에 비해 우리 프로젝트 분량이 컸고, 그 중에서도 내 분량이 제일 많았다. 처음엔 솔직히 막막했다.",
  },
  {
    phase: "03",
    title: "AI와 씨름",
    period: "2월",
    color: "#FB923C",
    story:
      "분량이 많아 AI를 적극적으로 활용했다. 퀄리티는 나왔지만 코드를 이해 못 한 채 붙여넣기만 했다. '내가 지금 개발을 하고 있는 건가?' 라는 생각이 들었다.",
  },
  {
    phase: "04",
    title: "매일 남았다",
    period: "2월 중순 ~ 3월",
    color: "#34D399",
    story:
      "팀원에게 민폐를 끼치지 않기 위해 매일 학원에 남아서 했다. 이해가 안 되면 잡고 늘어졌고, 결국 담당 파트는 전부 마쳤다.",
  },
  {
    phase: "05",
    title: "장려상 수상",
    period: "3월",
    color: "#F472B6",
    story:
      "SCIT 프로젝트 발표에서 장려상(3등)을 받았다. 솔직히 코드 이해도는 낮았지만, 결과물은 제대로 냈다. 다음엔 코드도 내 것으로 만들어야 한다는 걸 느꼈다.",
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🏗️ KumoSection 메인 컴포넌트
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function KumoSection() {
  const [particles, setParticles] = useState<
    {
      id: number;
      x: number;
      y: number;
      size: number;
      delay: number;
      dur: number;
    }[]
  >([]);

  // 📖 HeroSection과 동일한 패턴 — hydration 에러 방지를 위해 클라이언트에서만 생성
  useEffect(() => {
    setParticles(
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 5,
        dur: Math.random() * 3 + 3,
      })),
    );
  }, []);

  return (
    <div
      className="min-h-screen pt-24 pb-32"
      style={{
        background:
          "radial-gradient(ellipse at 55% 20%, var(--color-bg-surface) 0%, var(--color-bg) 45%)",
        transition: "background 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {/* ── 별 파티클 배경 ── */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-luna-silver"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
            animate={{ opacity: [0.05, 0.5, 0.05] }}
            transition={{
              duration: p.dur,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="page-container">
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            1. HERO — 프로젝트 타이틀
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <HeroBlock />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            2. 프로젝트 개요
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <OverviewSection />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            3. 시연 영상
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <DemoSection />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            4. 내가 맡은 역할
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <RoleSection />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            5. 기술 스택
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <TechSection />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            6. 개발 스토리 (타임라인)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <StorySection />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            7. 회고
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <ReflectionSection />
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📌 섹션 헤더 (재사용)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <span
        className="text-xs font-mono tracking-[0.2em] text-luna-accent"
        style={{ minWidth: "2rem" }}
      >
        {index}
      </span>
      <div
        className="flex-1 h-px"
        style={{ background: "var(--color-accent-glow)" }}
      />
      <h2 className="text-xs font-mono tracking-[0.15em] text-luna-mist uppercase">
        {title}
      </h2>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. Hero 블록
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function HeroBlock() {
  const [isHovered, setIsHovered] = useState(false);

  const badges = [
    { icon: "👥", text: "5인 팀 프로젝트" },
    { icon: "📅", text: "2025.01 — 2025.03" },
    { icon: "🏆", text: "SCIT 장려상 (3위)" },
  ];

  return (
    <section className="mb-28">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">
        {/* ── 왼쪽: 텍스트 블록 ── */}
        <div className="flex-1">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xs font-mono tracking-[0.25em] text-luna-accent uppercase mb-6"
          >
            / First Team Project
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.7,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="flex items-end gap-4 mb-6"
          >
            <h1
              className="text-6xl md:text-8xl font-bold text-luna-glow"
              style={{
                fontFamily: "var(--font-geist-sans)",
                letterSpacing: "-0.03em",
              }}
            >
              KUMO
            </h1>
            <span className="text-2xl md:text-3xl font-light text-luna-mist mb-2 md:mb-4">
              雲
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="text-luna-silver text-lg md:text-xl max-w-[560px] leading-relaxed mb-8"
          >
            일본(도쿄·오사카)의 구인구직 정보를{" "}
            <span className="text-luna-glow font-medium">지도 위에서</span>{" "}
            탐색하는 한·일 동시 지원 매칭 플랫폼.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            {badges.map((b) =>
              b.text.includes("장려상") ? (
                <motion.span
                  key={b.text}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-mono relative overflow-hidden cursor-default"
                  style={{
                    background: "var(--color-bg-surface)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text)",
                  }}
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                >
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.15) 50%, transparent 100%)",
                    }}
                    animate={{ x: isHovered ? "100%" : "-100%" }}
                    transition={
                      isHovered
                        ? { duration: 0.6, ease: "easeInOut" }
                        : { duration: 0 }
                    }
                  />
                  <span>{b.icon}</span>
                  <span>{b.text}</span>
                </motion.span>
              ) : (
                <span
                  key={b.text}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-mono"
                  style={{
                    background: "var(--color-bg-surface)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text)",
                  }}
                >
                  <span>{b.icon}</span>
                  <span>{b.text}</span>
                </span>
              ),
            )}
            <a
              href="https://github.com/wanudesu/KUMO-KR-JP-Job-Platform"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-mono transition-opacity hover:opacity-80"
              style={{
                background: "var(--color-accent-glow)",
                border: "1px solid var(--color-accent)",
                color: "var(--color-accent)",
              }}
            >
              <span>🔗</span>
              <span>GitHub</span>
              <svg
                width="10"
                height="10"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 2h8v8M2 10 10 2"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                />
              </svg>
            </a>
          </motion.div>

          {/* 구분선 */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-14 h-px"
            style={{
              background:
                "linear-gradient(90deg, var(--color-accent-glow), transparent 90%)",
              transformOrigin: "left",
            }}
          />
        </div>

        {/* ── 오른쪽: KumoOrb ── */}
        <div className="flex-shrink-0 flex justify-center md:justify-end">
          <KumoOrb />
        </div>
      </div>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. 시연 영상
//
// 📖 교체 방법:
//   영상 준비 → public/videos/kumo-demo.mp4 에 배치
//   VIDEO_SRC 상수만 바꾸면 끝.
//
//   나중에 AWS S3 배포 시:
//   const VIDEO_SRC = "https://[CloudFront도메인]/kumo-demo.mp4";
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const VIDEO_SRC = "/videos/kumo-demo.mp4";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 타임스탬프 — time은 초 단위로 수정하세요
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const CHAPTERS = [
  { label: "홈", time: 0 },
  { label: "로그인 / 회원가입", time: 9 },
  { label: "리쿠르터 페이지", time: 78 },
  { label: "메인 지도 화면", time: 168 },
  { label: "스케줄 등록", time: 244 },
  { label: "어드민 페이지", time: 270 },
];

function DemoSection() {
  const { ref, isInView } = useSectionInView();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [hasFile, setHasFile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // 영상 파일 존재 여부 확인
  useEffect(() => {
    const video = document.createElement("video");
    video.oncanplay = () => setHasFile(true);
    video.onerror = () => setHasFile(false);
    video.src = VIDEO_SRC;
  }, []);

  // 뷰포트 진입 시 재생 시도
  useEffect(() => {
    if (!isInView || !videoRef.current || !hasFile) return;
    videoRef.current.play().catch(() => {});
  }, [isInView, hasFile]);

  const seekTo = (index: number, time: number) => {
    setActiveIndex(index);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <motion.section
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="mb-28"
    >
      <SectionLabel index="02" title="Demo" />

      <motion.div variants={fadeUp}>
        {hasFile ? (
          /* ── 실제 영상 + 타임라인 ── */
          <div className="flex flex-col gap-3">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ border: "1px solid var(--color-border)" }}
            >
              {/* 로딩 전 스켈레톤 */}
              {!isReady && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: "rgba(13,22,44,0.8)" }}
                >
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "rgba(77,124,254,0.5)" }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 0.8,
                          delay: i * 0.15,
                          repeat: Infinity,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <video
                ref={videoRef}
                className="w-full block"
                style={{ maxHeight: "720px", objectFit: "contain" }}
                controls
                muted
                loop
                playsInline
                onCanPlay={() => setIsReady(true)}
              >
                <source src={VIDEO_SRC} type="video/mp4" />
              </video>
            </div>

            {/* 타임라인 버튼 */}
            <div className="flex flex-wrap gap-2 justify-center">
              {CHAPTERS.map((chapter, i) => (
                <motion.button
                  key={chapter.label}
                  onClick={() => seekTo(i, chapter.time)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono"
                  style={{
                    background:
                      activeIndex === i
                        ? "var(--color-accent-glow)"
                        : "var(--color-bg-surface)",
                    border:
                      activeIndex === i
                        ? "1px solid var(--color-accent)"
                        : "1px solid var(--color-border)",
                    color:
                      activeIndex === i
                        ? "var(--color-accent)"
                        : "var(--color-text-muted)",
                    cursor: "pointer",
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span style={{ opacity: 0.4 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{chapter.label}</span>
                </motion.button>
              ))}
            </div>

            {/* 영상 캡션 */}
            <p
              className="text-xs font-mono text-center"
              style={{ color: "var(--color-text-muted)" }}
            >
              KUMO — 지도 기반 한·일 구인구직 플랫폼 시연
            </p>
          </div>
        ) : (
          /* ── 영상 없을 때 placeholder ── */
          <div
            className="relative flex flex-col items-center justify-center rounded-2xl overflow-hidden"
            style={{
              height: "420px",
              background: "var(--color-bg-navy)",
              border: "1px dashed rgba(77,124,254,0.2)",
            }}
          >
            {/* 배경 그리드 */}
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(200,214,232,1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(200,214,232,1) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />
            {/* 중앙 재생 버튼 */}
            <motion.div
              className="relative z-10 flex flex-col items-center gap-5"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(77,124,254,0.1)",
                  border: "1px solid var(--color-accent-glow)",
                  boxShadow: "0 0 40px rgba(77,124,254,0.15)",
                }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M8 5.14v14l11-7-11-7z" fill="rgba(77,124,254,0.8)" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-luna-silver text-sm font-medium mb-1">
                  시연 영상 준비 중
                </p>
                <p
                  className="text-xs font-mono"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  public/videos/kumo-demo.mp4
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </motion.section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. 프로젝트 개요
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function OverviewSection() {
  const { ref, isInView } = useSectionInView();

  const features = [
    {
      icon: "🗺️",
      title: "스마트 맵 탐색",
      desc: "Google Maps 연동과 클러스터링으로 수백 개의 공고를 지도 위에 깔끔하게 렌더링",
    },
    {
      icon: "🌐",
      title: "한·일 다국어 지원",
      desc: "사용자 설정에 따라 한국어/일본어 UI와 공고 내용이 자동 전환",
    },
    {
      icon: "💬",
      title: "실시간 1:1 채팅",
      desc: "STOMP/WebSocket 기반으로 구인자-구직자 간 즉각적인 채팅방 생성",
    },
    {
      icon: "📍",
      title: "GPS 기반 탐색",
      desc: "내 위치 기반으로 반경 내 일자리를 필터링 (도쿄·오사카 지원)",
    },
  ];

  return (
    <motion.section
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="mb-28"
    >
      <SectionLabel index="01" title="Overview" />

      <motion.p
        variants={fadeUp}
        className="text-luna-mist text-base md:text-lg leading-relaxed max-w-[640px] mb-12"
      >
        구직자가 지도를 보며 주변 일자리를 탐색하고, 구인자에게 실시간으로
        연락할 수 있는 플랫폼입니다. 한일 양국의 구직자, 구인자를 주 타겟으로
        설계했습니다.
      </motion.p>

      <motion.div
        variants={stagger}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {features.map((f) => (
          <motion.div
            key={f.title}
            variants={fadeUp}
            className="flex gap-4 p-5 rounded-xl"
            style={{
              background: "var(--color-bg-navy)",
              border: "1px solid var(--color-border)",
            }}
          >
            <span className="text-2xl mt-0.5 shrink-0">{f.icon}</span>
            <div>
              <h3 className="text-luna-silver text-sm font-semibold mb-1">
                {f.title}
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                {f.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}

/// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. 내 역할
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function RoleSection() {
  const { ref, isInView } = useSectionInView();
  const { resolvedTheme: theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <motion.section
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="mb-28"
    >
      <SectionLabel index="03" title="My Role" />

      {/* UI/UX 설계 카드 */}
      <motion.div
        variants={fadeUp}
        className="relative p-6 rounded-2xl mb-4 overflow-hidden"
        style={{
          background: "var(--color-bg-navy)",
          border: "1px solid var(--color-border)",
        }}
      >
        <p className="text-xs font-mono tracking-[0.2em] text-luna-accent uppercase mb-2">
          담당 파트
        </p>
        <h3
          className="text-2xl md:text-3xl font-bold text-luna-glow mb-3"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          UI/UX 설계 전담
        </h3>
        <p
          className="text-sm leading-relaxed max-w-[520px] mb-5"
          style={{ color: "var(--color-text-muted)" }}
        >
          어드민 페이지를 제외한 전체 페이지의 UI/UX를 피그마로 설계 및
          구현하였습니다.
        </p>

        {/* 피그마 캡처 이미지 */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid var(--color-border)" }}
        >
          <img
            src={
              mounted && theme === "dark"
                ? "/images/kumo-figma-dark.png"
                : "/images/kumo-figma-light.png"
            }
            alt="KUMO 피그마 전체 설계 화면"
            className="w-full object-cover"
          />
        </div>
      </motion.div>

      {/* 기능 목록 */}
      <motion.div variants={stagger} className="flex flex-col gap-3">
        {MY_FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            variants={fadeUp}
            className="flex items-start gap-4 p-4 rounded-xl"
            style={{
              background: "var(--color-bg-navy)",
              border: "1px solid var(--color-border)",
            }}
          >
            <span
              className="text-xs font-mono mt-1 shrink-0"
              style={{ color: "rgba(77,124,254,0.35)", minWidth: "1.5rem" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-xl shrink-0 mt-0.5">{f.icon}</span>
            <div>
              <h4 className="text-luna-silver text-sm font-semibold mb-0.5">
                {f.title}
              </h4>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                {f.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. 기술 스택
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function TechSection() {
  const { ref, isInView } = useSectionInView();
  const categories = [...new Set(TECH_STACK.map((t) => t.category))];

  return (
    <motion.section
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="mb-28"
    >
      <SectionLabel index="04" title="Tech Stack" />

      <motion.div variants={stagger} className="flex flex-col gap-5">
        {categories.map((cat) => {
          const items = TECH_STACK.filter((t) => t.category === cat);
          const color = items[0].color;
          return (
            <motion.div
              key={cat}
              variants={fadeUp}
              className="flex items-center gap-4"
            >
              {/* 카테고리 레이블 */}
              <span
                className="text-[10px] font-mono tracking-[0.12em] uppercase shrink-0 w-16 text-right"
                style={{ color: "var(--color-text-muted)" }}
              >
                {cat}
              </span>
              {/* 포인트 점 */}
              <div
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: color, boxShadow: `0 0 6px ${color}80` }}
              />
              {/* 태그들 */}
              <div className="flex flex-wrap gap-2">
                {items.map((t) => (
                  <span
                    key={t.name}
                    className="px-3 py-1 text-xs font-mono rounded-full"
                    style={{
                      color: t.color,
                      background: `${t.color}12`,
                      border: `1px solid ${t.color}35`,
                    }}
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. 개발 스토리 (타임라인)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function StorySection() {
  const { ref, isInView } = useSectionInView();

  return (
    <motion.section
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="mb-28"
    >
      <SectionLabel index="05" title="Story" />

      <div className="relative pl-14">
        {/* 세로 타임라인 선 */}
        <motion.div
          className="absolute left-[1.625rem] top-3 bottom-3 w-px"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          style={{
            background: "rgba(77,124,254,0.12)",
            transformOrigin: "top",
          }}
        />

        <div className="flex flex-col gap-10">
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.phase}
              className="relative"
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{
                delay: 0.3 + i * 0.12,
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {/* 타임라인 점 — 절대 위치로 선 위에 올림 */}
              <div
                className="absolute -left-14 top-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-mono font-bold"
                style={{
                  background: `${item.color}18`,
                  border: `1.5px solid ${item.color}55`,
                  color: item.color,
                  boxShadow: `0 0 10px ${item.color}25`,
                  transform: "translateX(-0.25rem)",
                }}
              >
                {item.phase}
              </div>

              {/* 내용 */}
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-luna-silver font-semibold text-sm">
                  {item.title}
                </h3>
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                  style={{
                    color: item.color,
                    background: `${item.color}12`,
                    border: `1px solid ${item.color}28`,
                  }}
                >
                  {item.period}
                </span>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                {item.story}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. 회고
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ReflectionSection() {
  const { ref, isInView } = useSectionInView();

  const items = [
    {
      label: "잘한 점",
      color: "#34D399",
      icon: "✓",
      text: "팀원에게 민폐를 끼치지 않겠다는 마음으로 매일 남아서 담당 파트를 완수했다. 결과물의 퀄리티는 제대로 냈다.",
    },
    {
      label: "아쉬운 점",
      color: "#FB923C",
      icon: "△",
      text: "AI가 써준 코드를 이해하지 못한 채 붙여넣기만 했다. 프로젝트는 끝났지만 내 실력으로 소화한 코드가 거의 없었다.",
    },
    {
      label: "다음에는",
      color: "#4D7CFE",
      icon: "→",
      text: "그래서 이 포트폴리오를 만들고 있다. AI를 쓰되, 코드 한 줄 한 줄을 이해하면서. 그게 이 사이트를 만드는 이유다.",
    },
  ];

  return (
    <motion.section
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <SectionLabel index="06" title="Reflection" />

      <motion.div variants={stagger} className="flex flex-col gap-4 mb-12">
        {items.map((r) => (
          <motion.div
            key={r.label}
            variants={fadeUp}
            className="flex gap-5 p-6 rounded-2xl"
            style={{
              background: `${r.color}06`,
              border: `1px solid ${r.color}1A`,
            }}
          >
            <div
              className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mt-0.5"
              style={{
                color: r.color,
                background: `${r.color}15`,
                border: `1px solid ${r.color}30`,
              }}
            >
              {r.icon}
            </div>
            <div>
              <p
                className="text-xs font-mono tracking-[0.15em] uppercase mb-2"
                style={{ color: r.color }}
              >
                {r.label}
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text)" }}
              >
                {r.text}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <ContactSection
        title="편하게 연락주세요."
        description1="인사도 좋아요."
        description2="언제든지 기다리고 있어요."
        sectionNumber="07"
      />
    </motion.section>
  );
}
