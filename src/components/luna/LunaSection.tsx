"use client";
// src/components/luna/LunaSection.tsx
//
// 📖 학습 포인트:
// 1. Kumo와 동일한 useSectionInView 패턴 — 반복 사용으로 익숙해지기
// 2. 코드 스니펫 스타일링 — <pre><code> 태그로 실제 코드 표시
// 3. 이 파일 자체가 "Luna 페이지를 만든 과정"을 설명하는 페이지

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { LunaOrb } from "./LunaOrb";
import { ContactSection } from "@/components/home/ContactSection";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎬 공통 Variants (Kumo와 동일)
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

function useSectionInView() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  return { ref, isInView };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📦 데이터
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const TECH_STACK = [
  { name: "Next.js 15",      category: "Framework", color: "#E8F0FF" },
  { name: "TypeScript",      category: "Language",  color: "#4D7CFE" },
  { name: "Tailwind CSS v4", category: "Styling",   color: "#34D399" },
  { name: "Framer Motion",   category: "Animation", color: "#A78BFA" },
  { name: "Claude AI",       category: "AI",        color: "#FB923C" },
  { name: "Git / GitHub",    category: "Tooling",   color: "#F472B6" },
  { name: "Vercel / AWS",    category: "Deploy",    color: "#60A5FA" },
];

const STORY_TIMELINE = [
  {
    phase: "01",
    title: "출발점",
    period: "2026.03.25",
    color: "#4D7CFE",
    story:
      "포트폴리오 제출 마감까지 2주. Java로 만들 수도 있었지만 학원에서 배운 것 말고, 스스로 선택한 기술로 만들고 싶었다. 그게 Next.js였다.",
  },
  {
    phase: "02",
    title: "새로운 기술, 백지에서",
    period: "1일차",
    color: "#A78BFA",
    story:
      "Next.js도, TypeScript도, Framer Motion도 처음이었다. 학원에서 한 번도 안 배운 것들. AI 없이는 시작도 못 했을 거다. 그게 부끄럽지 않았다.",
  },
  {
    phase: "03",
    title: "Claude와 페어 프로그래밍",
    period: "매일",
    color: "#FB923C",
    story:
      "Kumo 때와 달리 이번엔 코드를 붙여넣기 전에 먼저 읽었다. 이해가 안 되면 물었다. Claude가 주석을 달아줬고, 나는 그걸 직접 고쳐가며 익혔다. 속도는 느렸지만 달랐다.",
  },
  {
    phase: "04",
    title: "달 테마를 선택한 이유",
    period: "디자인 결정",
    color: "#34D399",
    story:
      "밤에 학원에 혼자 남아서 코드를 쳤던 기억. 사이트 이름을 Luna(月)로 지었다. 사이트 안에 있는 프로젝트 이름이 Kumo(雲)가 된 것도 자연스러웠다.",
  },
  {
    phase: "05",
    title: "마감일 2026.04.08",
    period: "목표",
    color: "#F472B6",
    story:
      "2주 안에 완성. 완벽하지 않아도 된다. 코드를 이해하면서 만들었다는 것, 그게 이 사이트의 목적이다.",
  },
];

const LEARNINGS = [
  {
    icon: "⚡",
    title: "Next.js App Router",
    desc: "서버 컴포넌트와 클라이언트 컴포넌트의 차이, page.tsx와 layout.tsx의 역할, metadata 처리 방식을 직접 써보면서 이해했다.",
  },
  {
    icon: "🎬",
    title: "Framer Motion",
    desc: "variants, staggerChildren, useInView, useScroll. 애니메이션 라이브러리를 처음 써봤는데 CSS animation보다 훨씬 직관적이었다.",
  },
  {
    icon: "🎨",
    title: "Tailwind CSS v4",
    desc: "tailwind.config.ts 대신 globals.css의 @theme으로 토큰을 관리하는 v4 방식. 처음엔 낯설었지만 오히려 깔끔했다.",
  },
  {
    icon: "🤖",
    title: "AI와 협업하는 법",
    desc: "코드를 받아서 그냥 쓰는 게 아니라, 주석을 요청하고 직접 고쳐보고 질문하는 흐름. Kumo 때 못 했던 것을 여기서 했다.",
  },
];

const FUTURE_PLANS = [
  { icon: "🌅", text: "라이트/다크 모드 토글 + 해 떠오르는 애니메이션" },
  { icon: "☁️", text: "AWS S3 + CloudFront 배포" },
  { icon: "📱", text: "모바일 반응형 완성도 높이기" },
  { icon: "🇯🇵", text: "The SSS 입사 후 실제 프로젝트로 계속 성장" },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🏗️ LunaSection 메인
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function LunaSection() {
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number; delay: number; dur: number }[]
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 5,
        dur: Math.random() * 3 + 3,
      }))
    );
  }, []);

  return (
    <div
      className="min-h-screen pt-24 pb-32"
      style={{
         background: "radial-gradient(ellipse at 60% 10%, var(--color-bg-navy) 0%, var(--color-bg) 55%, var(--color-bg) 100%)",
         transition: "background 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {/* ── 별 파티클 ── */}
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
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="page-container">
        <HeroBlock />
        <PurposeSection />
        <TechSection />
        <StorySection />
        <LearningSection />
        <FuturePlanSection />
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📌 섹션 헤더 (Kumo와 동일)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <span className="text-xs font-mono tracking-[0.2em] text-luna-accent" style={{ minWidth: "2rem" }}>
        {index}
      </span>
      <div className="flex-1 h-px" style={{ background: "rgba(77,124,254,0.12)" }} />
      <h2 className="text-xs font-mono tracking-[0.15em] text-luna-mist uppercase">{title}</h2>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Hero
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function HeroBlock() {
  return (
    <section className="mb-28">
    <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">
      <div className="flex-1">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xs font-mono tracking-[0.25em] text-luna-accent uppercase mb-6"
      >
        / このサイトについて
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex items-end gap-4 mb-6"
      >
        <h1
          className="text-6xl md:text-8xl font-bold text-luna-glow"
          style={{ fontFamily: "var(--font-geist-sans)", letterSpacing: "-0.03em" }}
        >
          Luna
        </h1>
        <span className="text-2xl md:text-3xl font-light text-luna-mist mb-2 md:mb-4">
          月
        </span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6 }}
        className="text-luna-silver text-lg md:text-xl max-w-[560px] leading-relaxed mb-8"
      >
        이 포트폴리오 사이트 자체가{" "}
        <span className="text-luna-glow font-medium">하나의 프로젝트</span>
        입니다.
        <br />
        2주, 처음 쓰는 기술, AI와 함께.
      </motion.p>

      {/* 메타 배지 */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-wrap gap-3"
      >
        {[
          { icon: "📅", text: "2026.03.25 — 04.08" },
          { icon: "⚡", text: "2주 제작" },
          { icon: "🤖", text: "Claude와 페어 프로그래밍" },
        ].map((b) => (
          <span
            key={b.text}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-mono"
            style={{
              background: "rgba(200,214,232,0.04)",
              border: "1px solid rgba(200,214,232,0.1)",
              color: "var(--color-text)",
            }}
          >
            <span>{b.icon}</span>
            <span>{b.text}</span>
          </span>
        ))}
            <a
              href="https://github.com/wanudesu/project-luna"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-mono transition-opacity hover:opacity-80"
              style={{
                background: "rgba(77,124,254,0.08)",
                border: "1px solid var(--color-accent-glow)",
                color: "#4D7CFE",
              }}
            >
              <span>🔗</span>
              <span>GitHub</span>
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 2h8v8M2 10 10 2" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
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
          background: "linear-gradient(90deg, rgba(77,124,254,0.5), rgba(77,124,254,0.05) 70%, transparent)",
          transformOrigin: "left",
        }}
          />
          </div>
        <div className="flex-shrink-0 flex justify-center md:justify-end">
          <LunaOrb />
        </div>
      </div>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 01. 제작 목적
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function PurposeSection() {
  const { ref, isInView } = useSectionInView();

  const reasons = [
    {
      icon: "📋",
      title: "포트폴리오 제출",
      desc: "The SSS 채용 전형에 포트폴리오를 제출해야 했다. 형식은 자유지만 웹사이트 형식을 가장 좋게 본다고 했다.",
      color: "#4D7CFE",
    },
    {
      icon: "💻",
      title: "기술 이해",
      desc: "Kumo 때 AI 코드를 이해 없이 붙여넣기만 했다. 이번엔 코드 한 줄 한 줄을 읽고 이해하면서 만들기로 했다.",
      color: "#34D399",
    },
    {
      icon: "🤖",
      title: "AI 활용 능력 증명",
      desc: "SSS는 AI를 적극 활용하는 문화를 강조했다. 코드를 이해하면서 AI와 협업하는 것 자체를 보여주고 싶었다.",
      color: "#FB923C",
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
      <SectionLabel index="01" title="Purpose" />

      <motion.p
        variants={fadeUp}
        className="text-luna-mist text-base md:text-lg leading-relaxed max-w-[600px] mb-12"
      >
        이 사이트를 만든 이유는 세 가지입니다.
        기술 이해도 부족을 인정하고, 그것을 채우기 위해 시작했습니다.
      </motion.p>

      <motion.div variants={stagger} className="flex flex-col gap-4">
        {reasons.map((r) => (
          <motion.div
            key={r.title}
            variants={fadeUp}
            className="flex gap-5 p-6 rounded-2xl"
            style={{
              background: `${r.color}06`,
              border: `1px solid ${r.color}20`,
            }}
          >
            <div
              className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{ background: `${r.color}12`, border: `1px solid ${r.color}30` }}
            >
              {r.icon}
            </div>
            <div>
              <h3
                className="text-sm font-semibold mb-1"
                style={{ color: r.color }}
              >
                {r.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                {r.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 02. 기술 스택
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
      <SectionLabel index="02" title="Tech Stack" />

      <motion.p
        variants={fadeUp}
        className="text-luna-mist text-sm leading-relaxed max-w-[480px] mb-10"
      >
        전부 이 사이트를 만들면서 처음 써본 기술들입니다.
        <br />
        학원에서 배운 Java, Spring Boot는 하나도 없어요.
      </motion.p>

      <motion.div variants={stagger} className="flex flex-col gap-5">
        {categories.map((cat) => {
          const items = TECH_STACK.filter((t) => t.category === cat);
          const color = items[0].color;
          return (
            <motion.div key={cat} variants={fadeUp} className="flex items-center gap-4">
              <span
                className="text-[10px] font-mono tracking-[0.12em] uppercase shrink-0 w-20 text-right"
                style={{ color: "var(--color-text-muted)" }}
              >
                {cat}
              </span>
              <div
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: color, boxShadow: `0 0 6px ${color}80` }}
              />
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
// 03. 제작 스토리
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
      <SectionLabel index="03" title="Story" />

      <div className="relative pl-14">
        {/* 타임라인 세로선 */}
        <motion.div
          className="absolute left-[1.625rem] top-3 bottom-3 w-px"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          style={{ background: "rgba(77,124,254,0.12)", transformOrigin: "top" }}
        />

        <div className="flex flex-col gap-10">
          {STORY_TIMELINE.map((item, i) => (
            <motion.div
              key={item.phase}
              className="relative"
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* 타임라인 점 */}
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

              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-luna-silver font-semibold text-sm">{item.title}</h3>
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
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
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
// 04. 배운 점 + AI 협업 방식
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function LearningSection() {
  const { ref, isInView } = useSectionInView();

  return (
    <motion.section
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="mb-28"
    >
      <SectionLabel index="04" title="Learnings & AI" />

      {/* AI 협업 방식 강조 박스 */}
      <motion.div
        variants={fadeUp}
        className="relative p-6 rounded-2xl mb-10 overflow-hidden"
        style={{
          background: "rgba(251,146,60,0.06)",
          border: "1px solid rgba(251,146,60,0.2)",
        }}
      >
        <div
          className="absolute right-0 top-0 w-48 h-48 rounded-full pointer-events-none"
          style={{
            transform: "translate(30%, -30%)",
            background: "radial-gradient(circle, rgba(251,146,60,0.08) 0%, transparent 70%)",
            filter: "blur(24px)",
          }}
        />
        <p className="text-xs font-mono tracking-[0.2em] uppercase mb-2" style={{ color: "#FB923C" }}>
          AI 협업 방식
        </p>
        <h3
          className="text-xl md:text-2xl font-bold text-luna-glow mb-3"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          붙여넣기가 아닌 대화
        </h3>
        <p className="text-sm leading-relaxed max-w-[520px]" style={{ color: "var(--color-text-muted)" }}>
          코드를 받으면 먼저 읽었습니다. 모르는 부분은 주석 설명을 요청했고,
          이해한 뒤에 직접 고쳐봤습니다. Claude는 선생님이 아니라
          <span className="text-luna-silver"> 같이 코딩하는 동료</span>에 가까웠습니다.
        </p>

        {/* 협업 흐름 */}
        <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-mono">
          {["코드 요청", "→", "직접 읽기", "→", "모르면 질문", "→", "수정해보기", "→", "이해 확인"].map((step, i) => (
            <span
              key={i}
              style={{
                color: step === "→"
                  ? "rgba(200,214,232,0.2)"
                  : "rgba(251,146,60,0.7)",
              }}
            >
              {step !== "→" ? (
                <span
                  className="px-2 py-0.5 rounded"
                  style={{ background: "rgba(251,146,60,0.08)", border: "1px solid rgba(251,146,60,0.2)" }}
                >
                  {step}
                </span>
              ) : step}
            </span>
          ))}
        </div>
      </motion.div>

      {/* 배운 기술들 */}
      <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {LEARNINGS.map((l) => (
          <motion.div
            key={l.title}
            variants={fadeUp}
            className="flex gap-4 p-5 rounded-xl"
            style={{
              background: "var(--color-bg-navy)",
              border: "1px solid var(--color-border)",
            }}
          >
            <span className="text-2xl mt-0.5 shrink-0">{l.icon}</span>
            <div>
              <h3 className="text-luna-silver text-sm font-semibold mb-1">{l.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                {l.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 05. 앞으로의 계획
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function FuturePlanSection() {
  const { ref, isInView } = useSectionInView();

  return (
    <motion.section
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <SectionLabel index="05" title="Next Steps" />

      <motion.p
        variants={fadeUp}
        className="text-luna-mist text-sm leading-relaxed max-w-[480px] mb-10"
      >
        사이트는 제출로 끝나지 않습니다.
        입사 후에도 계속 업데이트할 예정입니다.
      </motion.p>

      <motion.div variants={stagger} className="flex flex-col gap-3 mb-14">
        {FUTURE_PLANS.map((p, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="flex items-center gap-4 p-4 rounded-xl"
            style={{
              background: "var(--color-bg-navy)",
              border: "1px solid var(--color-border)",
            }}
          >
            <span className="text-xl shrink-0">{p.icon}</span>
            <p className="text-sm" style={{ color: "var(--color-text)" }}>
              {p.text}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* 마무리 문장 */}
      <ContactSection
              title="함께 만들어요."
              description1="언제든지 연락주세요."
              description2="언제든지 연락주세요."
              sectionNumber="06"
            />
      
    </motion.section>
  );
}
