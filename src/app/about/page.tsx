"use client";
// src/app/about/page.tsx
//
// 📖 학습 포인트:
// 1. useInView — 스크롤해서 요소가 화면에 보일 때 애니메이션 트리거
// 2. 섹션별 컴포넌트 분리 — 파일이 길어지면 읽기 힘드니까
//    각 섹션을 함수로 분리해서 가독성을 높입니다.
// 3. metadata — 서버 컴포넌트에서만 export 가능한데,
//    "use client"와 충돌하므로 별도 파일로 분리하거나 제거합니다.

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎬 공통 Variants
//
// 📖 여러 섹션에서 같은 애니메이션을 재사용합니다.
// DRY 원칙: Don't Repeat Yourself
// 같은 코드를 반복하지 말고 한 곳에 정의해서 재사용하세요.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 32,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1, // 자식 요소들이 0.1초 간격으로 순차 등장
    },
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🔧 커스텀 훅: useScrollReveal
//
// 📖 훅(Hook)이란?
// 반복되는 로직을 재사용하기 위해 함수로 묶은 것입니다.
// "use"로 시작하는 게 React Hook의 규칙이에요.
//
// useInView: 요소가 화면(viewport)에 들어왔는지 감지합니다.
// once: true → 한 번만 실행 (스크롤 올렸다 내려도 반복 안 함)
// margin: 화면 하단에서 100px 전에 미리 트리거
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function useScrollReveal() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -100px 0px",
  });
  return { ref, isInView };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🏗️ 섹션 컴포넌트들
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── 섹션 헤더 (재사용 컴포넌트) ──
function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      {/* 섹션 번호 */}
      <span
        className="text-xs font-mono"
        style={{ color: "var(--color-luna-accent)" }}
      >
        {number}
      </span>
      {/* 구분선 */}
      <div
        className="h-px w-12"
        style={{ background: "var(--color-luna-accent)", opacity: 0.4 }}
      />
      {/* 섹션 이름 */}
      <span
        className="text-xs font-mono tracking-widest uppercase"
        style={{ color: "var(--color-luna-mist)" }}
      >
        {label}
      </span>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 01. 인트로 섹션
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function IntroSection() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="min-h-screen flex items-center" ref={ref}>
      <div className="page-container w-full py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* 작은 레이블 */}
          <motion.div variants={fadeUpVariants} className="mb-6">
            <span
              className="text-xs font-mono tracking-widest uppercase"
              style={{ color: "var(--color-luna-accent)" }}
            >
              About me
            </span>
          </motion.div>

          {/* 메인 헤드라인 */}
          <motion.h1
            variants={fadeUpVariants}
            className="text-5xl md:text-7xl font-bold leading-tight mb-8"
            style={{ color: "var(--color-luna-glow)" }}
          >
            만드는 것을<br />
            <span style={{ color: "var(--color-luna-accent)" }}>좋아하는</span> 사람.
          </motion.h1>

          {/* 서브 텍스트 */}
          <motion.p
            variants={fadeUpVariants}
            className="text-lg md:text-xl leading-relaxed max-w-2xl"
            style={{ color: "var(--color-luna-silver)" }}
          >
            요리, 미술, 코드 — 형태는 달라도 항상 무언가를 만들어왔습니다.
            <br />
            디테일에 집착하고, 이유를 묻고, 끝까지 완성하려는 사람입니다.
          </motion.p>

          {/* 스크롤 힌트 */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-16 flex items-center gap-3"
            style={{ color: "var(--color-luna-mist)" }}
          >
            <span className="text-xs font-mono tracking-widest">scroll to explore</span>
            <motion.div
              className="w-8 h-px"
              style={{ background: "var(--color-luna-mist)" }}
              animate={{ scaleX: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ originX: 0, background: "var(--color-luna-mist)" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 02. ものづくり 섹션
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function MonozukuriSection() {
  const { ref, isInView } = useScrollReveal();

  // 📖 배열 데이터를 컴포넌트 밖에 두지 않고 여기 두는 이유:
  // 이 데이터는 이 섹션에서만 쓰이니까요. 응집도를 높입니다.
  const items = [
    {
      emoji: "🍳",
      title: "요리 (특히 일식)",
      desc: "자취하면서 직접 만들기 시작했어요. 레시피대로만 하면 재미없어서 조금씩 바꿔보는 게 즐거워요.",
    },
    {
      emoji: "🎨",
      title: "미술 & 디자인",
      desc: "어릴 때부터 그리고 만드는 걸 좋아했어요. 지금은 UI 디자인으로 이어지고 있고요.",
    },
    {
      emoji: "💻",
      title: "코드",
      desc: "나만의 코드로 뭔가를 만들 수 있다는 게 신기해서 시작했어요. 처음 화면에 무언가 뜨는 그 순간이 좋아요.",
    },
    {
      emoji: "🏙️",
      title: "시뮬레이션 게임",
      desc: "도시 경영, 시뮬레이터류를 좋아해요. 시스템을 설계하고 최적화하는 게 재밌어요.",
    },
  ];

  return (
    <section className="py-32" ref={ref}>
      <div className="page-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUpVariants}>
            <SectionLabel number="01" label="ものづくり" />
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ color: "var(--color-luna-glow)" }}
          >
            눈치채면 항상<br />무언가를 만들고 있어요.
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="text-base leading-relaxed mb-16 max-w-xl"
            style={{ color: "var(--color-luna-mist)" }}
          >
            The SSS 설명회에서 사이토상이 말했어요.
            <br />
            <span style={{ color: "var(--color-luna-silver)" }}>
              "휴일이라도 어느 순간 코드를 쓰고 있는 사람."
            </span>
            <br />
            저는 코드뿐 아니라 요리도, 그림도 그렇게 하더라고요.
          </motion.p>

          {/* 카드 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUpVariants}
                className="p-6 rounded-xl"
                style={{
                  background: "var(--color-luna-navy)",
                  border: "1px solid var(--color-luna-border)",
                }}
                whileHover={{
                  borderColor: "rgba(77,124,254,0.3)",
                  background: "var(--color-luna-surface)",
                }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-2xl mb-3 block">{item.emoji}</span>
                <h3
                  className="text-sm font-semibold mb-2"
                  style={{ color: "var(--color-luna-glow)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-luna-mist)" }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 03. 여정 섹션 (타임라인)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function JourneySection() {
  const { ref, isInView } = useScrollReveal();

  const timeline = [
    {
      period: "고등학생",
      title: "일본어와의 첫 만남",
      desc: "수업에서 처음 일본어를 접했어요. 처음엔 잘 몰랐는데, 알아가면서 재밌어졌고 일본에서 일하고 싶다는 생각이 생겼어요.",
      tag: "きっかけ",
    },
    {
      period: "군 복무 중",
      title: "학점은행제 + 공부 시작",
      desc: "시간이 생겨서 학점은행제 수업을 들었어요. 솔직히 집중은 못 했지만, 준비는 멈추지 않으려 했어요.",
      tag: "継続",
    },
    {
      period: "2025 ~ 2026",
      title: "SCIT 마스터 과정",
      desc: "Java, Spring Boot, JavaScript 등 IT 기술과 일본어를 동시에 배웠어요. 팀 프로젝트에서 CSS를 주로 맡았는데 너무 재밌었어요. 그게 프론트엔드로 방향을 잡은 계기가 됐어요.",
      tag: "転換点",
    },
    {
      period: "지금",
      title: "Project Luna",
      desc: "학원에서 배운 Java가 아닌, 스스로 선택한 Next.js로 포트폴리오를 만들고 있어요. AI와 페어 프로그래밍하면서 코드 하나하나 이해하는 중이에요.",
      tag: "現在",
    },
  ];

  return (
    <section className="py-32" ref={ref}>
      <div className="page-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUpVariants}>
            <SectionLabel number="02" label="Journey" />
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
            className="text-3xl md:text-4xl font-bold mb-16"
            style={{ color: "var(--color-luna-glow)" }}
          >
            거창하지 않아요.<br />그냥 계속 했을 뿐이에요.
          </motion.h2>

          {/* 타임라인 */}
          <div className="relative">
            {/*
              📖 타임라인 왼쪽 세로선
              absolute로 부모 기준 위치를 잡고,
              부모에 relative를 줘서 기준점을 설정합니다.
            */}
            <div
              className="absolute top-0 bottom-0 w-px"
              style={{
                left: "0",
                background:
                  "linear-gradient(to bottom, transparent, var(--color-luna-border), transparent)",
              }}
            />

            <div className="space-y-12 pl-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUpVariants}
                  className="relative"
                >
                  {/* 타임라인 점 */}
                  <div
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      left: "-2.25rem",
                      top: "0.4rem",
                      background: "var(--color-luna-accent)",
                      boxShadow: "0 0 8px rgba(77,124,254,0.6)",
                    }}
                  />

                  {/* 기간 + 태그 */}
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-xs font-mono"
                      style={{ color: "var(--color-luna-mist)" }}
                    >
                      {item.period}
                    </span>
                    <span
                      className="text-xs font-mono px-2 py-0.5 rounded-full"
                      style={{
                        color: "var(--color-luna-accent)",
                        border: "1px solid rgba(77,124,254,0.3)",
                        background: "rgba(77,124,254,0.05)",
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>

                  {/* 제목 */}
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ color: "var(--color-luna-glow)" }}
                  >
                    {item.title}
                  </h3>

                  {/* 설명 */}
                  <p
                    className="text-sm leading-relaxed max-w-lg"
                    style={{ color: "var(--color-luna-mist)" }}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 04. 왜 일본 / 왜 SSS 섹션
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function WhyJapanSection() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="py-32" ref={ref}>
      <div className="page-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUpVariants}>
            <SectionLabel number="03" label="Why Japan / Why SSS" />
          </motion.div>

          {/* 왜 일본 */}
          <motion.div variants={fadeUpVariants} className="mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ color: "var(--color-luna-glow)" }}
            >
              좋아서 시작했고,<br />계속했을 뿐입니다.
            </h2>
            <p
              className="text-base leading-relaxed max-w-xl"
              style={{ color: "var(--color-luna-silver)" }}
            >
              고등학생 때 일본어 수업에서 시작된 작은 관심이었어요.
              처음엔 잘 몰라서 어렵기도 했지만, 알아가면서 재밌어졌고
              어느 순간 일본에서 일하고 싶다는 목표가 생겼어요.
              <br /><br />
              거창한 이유는 없어요.
              그냥 좋았고, 그 마음을 놓지 않았더니
              N1 취득, SCIT 과정, 그리고 지금 여기까지 왔어요.
            </p>
          </motion.div>

          {/* 왜 SSS */}
          <motion.div
            variants={fadeUpVariants}
            className="p-8 rounded-2xl"
            style={{
              background: "var(--color-luna-navy)",
              border: "1px solid rgba(77,124,254,0.2)",
            }}
          >
            <h3
              className="text-xl font-bold mb-4"
              style={{ color: "var(--color-luna-accent)" }}
            >
              왜 The SSS인가요?
            </h3>
            <div className="space-y-4">
              {[
                {
                  title: "프론트엔드 특화",
                  desc: "백엔드는 파트너사에 맡기고 프론트에 집중하는 환경이 저에게 맞아요. CSS로 화면을 만드는 게 제일 재밌거든요.",
                },
                {
                  title: "AI를 적극 활용하는 문화",
                  desc: "새로운 모델이 나오면 바로 써보는 팀. 저도 그렇게 일하고 싶어요. 도구를 잘 쓰는 게 실력이라고 생각해요.",
                },
                {
                  title: "자사 빌딩, 파견 없음",
                  desc: "한 팀과 오래 함께하면서 성장하고 싶어요. 3개월마다 다른 회사에 나가는 환경보다 같은 팀에서 깊이 일하는 게 맞아요.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div
                    className="w-1 rounded-full flex-shrink-0 mt-1"
                    style={{
                      background: "var(--color-luna-accent)",
                      minHeight: "1rem",
                    }}
                  />
                  <div>
                    <h4
                      className="text-sm font-semibold mb-1"
                      style={{ color: "var(--color-luna-glow)" }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--color-luna-mist)" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 05. 기술 스택 섹션
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function SkillsSection() {
  const { ref, isInView } = useScrollReveal();

  const skills = {
    "학원에서 배운 것": ["Java", "Spring Boot", "JavaScript", "HTML", "CSS", "jQuery", "Ajax"],
    "스스로 익힌 것": ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "React"],
    "툴 & 기타": ["Git", "GitHub", "Figma", "Notion", "Claude AI"],
  };

  return (
    <section className="py-32" ref={ref}>
      <div className="page-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUpVariants}>
            <SectionLabel number="04" label="Skills" />
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
            className="text-3xl md:text-4xl font-bold mb-16"
            style={{ color: "var(--color-luna-glow)" }}
          >
            배운 것과<br />배우고 있는 것.
          </motion.h2>

          <div className="space-y-10">
            {Object.entries(skills).map(([category, items]) => (
              <motion.div key={category} variants={fadeUpVariants}>
                <h3
                  className="text-xs font-mono tracking-widest uppercase mb-4"
                  style={{ color: "var(--color-luna-mist)" }}
                >
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <motion.span
                      key={skill}
                      className="px-3 py-1 text-sm font-mono rounded-full"
                      style={{
                        color: "var(--color-luna-silver)",
                        border: "1px solid var(--color-luna-border)",
                        background: "var(--color-luna-navy)",
                      }}
                      whileHover={{
                        borderColor: "rgba(77,124,254,0.4)",
                        color: "var(--color-luna-glow)",
                      }}
                      transition={{ duration: 0.15 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 06. 연락처 섹션
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ContactSection() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="py-32" ref={ref}>
      <div className="page-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.div variants={fadeUpVariants}>
            <SectionLabel number="05" label="Contact" />
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ color: "var(--color-luna-glow)" }}
          >
            함께 만들어요.
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="text-base mb-12"
            style={{ color: "var(--color-luna-mist)" }}
          >
            언제든지 연락주세요.
          </motion.p>

          <motion.div
            variants={fadeUpVariants}
            className="flex flex-wrap justify-center gap-4"
          >
            {/* 이메일 버튼 */}
            <motion.a
              href="mailto:your@email.com"
              className="px-6 py-3 text-sm font-medium rounded-lg"
              style={{
                background: "linear-gradient(135deg, #4D7CFE 0%, #3a5fd9 100%)",
                color: "white",
                boxShadow: "0 0 20px rgba(77,124,254,0.3)",
              }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 32px rgba(77,124,254,0.5)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              이메일 보내기
            </motion.a>

            {/* GitHub 버튼 */}
            <motion.a
              href="https://github.com/lewonu"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-sm font-medium rounded-lg"
              style={{
                border: "1px solid var(--color-luna-border)",
                color: "var(--color-luna-silver)",
                background: "transparent",
              }}
              whileHover={{
                scale: 1.03,
                borderColor: "rgba(200,214,232,0.4)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              GitHub
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🏗️ About 페이지 메인
//
// 📖 페이지는 섹션들을 조립하는 역할만 합니다.
// 각 섹션의 로직은 위에서 각자 관리하고 있어요.
// 이게 컴포넌트 분리의 핵심입니다.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function AboutPage() {
  return (
    <>
      {/* 배경 그라데이션 */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, #0D1E40 0%, #070C18 50%, #03050A 100%)",
        }}
      />

      <IntroSection />
      <MonozukuriSection />
      <JourneySection />
      <WhyJapanSection />
      <SkillsSection />
      <ContactSection />
    </>
  );
}
