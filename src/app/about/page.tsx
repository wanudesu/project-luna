"use client";
// src/app/about/page.tsx
//
// 📖 변경 포인트:
// 하드코딩된 색상값(#070C18 등)을 CSS 변수(var(--color-bg) 등)로 교체.
// 이렇게 하면 .light 클래스가 붙을 때 자동으로 밝은 색상으로 바뀝니다.

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const fadeUpVariants = {
  hidden:  { opacity: 0, y: 32, filter: "blur(6px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function useScrollReveal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  return { ref, isInView };
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="text-xs font-mono" style={{ color: "var(--color-accent)" }}>
        {number}
      </span>
      <div className="h-px w-12" style={{ background: "var(--color-accent)", opacity: 0.4 }} />
      <span
        className="text-xs font-mono tracking-widest uppercase"
        style={{ color: "var(--color-text-muted)" }}
      >
        {label}
      </span>
    </div>
  );
}

const PHOTO_SRC = "/images/profile.jpg";

function ProfilePhoto() {
  return (
    <div style={{ perspective: "800px" }}>
      <div className="relative w-[240px] h-[240px] md:w-[320px] md:h-[320px]">
        <motion.div
          className="absolute inset-[-40px] rounded-full pointer-events-none"
          animate={{ opacity: [0.12, 0.28, 0.12], scale: [1, 1.06, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "radial-gradient(circle, rgba(77,124,254,0.22) 0%, transparent 70%)",
          }}
        />
        <motion.div
          className="absolute inset-[-12px] rounded-full pointer-events-none"
          animate={{ opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          style={{
            background: "radial-gradient(circle, rgba(77,124,254,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          className="relative w-full h-full rounded-full overflow-hidden"
          style={{
            background: "radial-gradient(ellipse at 35% 35%, #3a4f7a 0%, #1a2540 40%, #0a1020 100%)",
            boxShadow: `
              inset -16px -16px 32px rgba(0,0,0,0.7),
              inset 8px 8px 24px rgba(100,140,220,0.12),
              0 0 40px rgba(77,124,254,0.35),
              0 0 80px rgba(77,124,254,0.15)
            `,
          }}
        >
          <img
            src={PHOTO_SRC}
            alt="이원우 프로필 사진"
            className="w-full h-full object-cover object-top"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
              if (fallback) fallback.style.display = "flex";
            }}
          />
          <div
            className="absolute inset-0 items-center justify-center"
            style={{ display: "none", background: "radial-gradient(ellipse at 35% 35%, #3a4f7a 0%, #1a2540 100%)" }}
          >
            <span className="text-5xl md:text-6xl font-bold select-none" style={{ color: "rgba(77,124,254,0.7)" }}>
              W
            </span>
          </div>
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle at 70% 70%, transparent 40%, rgba(3,5,10,0.45) 100%)" }}
          />
        </div>
        <motion.div
          className="absolute inset-[-20px] rounded-full pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ border: "1px dashed rgba(77,124,254,0.12)" }}
        >
          {[0, 72, 144, 216, 288].map((deg, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                top: "50%", left: "50%",
                transform: `rotate(${deg}deg) translateX(170px) translateY(-50%)`,
                background: "rgba(77,124,254,0.7)",
              }}
              animate={{ opacity: [0.2, 0.9, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function IntroSection() {
  const { ref, isInView } = useScrollReveal();
  return (
    <section className="min-h-screen flex items-center" ref={ref}>
      <div className="page-container w-full py-32">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-8">
          <motion.div
            className="flex-1 max-w-[520px]"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={fadeUpVariants} className="mb-6">
              <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "var(--color-accent)" }}>
                About me
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUpVariants}
              className="text-5xl md:text-7xl font-bold leading-tight mb-8"
              style={{ color: "var(--color-text-glow)" }}
            >
              만드는 것을<br />
              <span style={{ color: "var(--color-accent)" }}>좋아하는</span> 사람.
            </motion.h1>
            <motion.p
              variants={fadeUpVariants}
              className="text-lg md:text-xl leading-relaxed"
              style={{ color: "var(--color-text)" }}
            >
              요리, 미술, 코드 — 형태는 달라도 항상 무언가를 만들어왔습니다.
              <br />
              디테일에 집착하고, 이유를 묻고, 끝까지 완성하려는 사람입니다.
            </motion.p>
            <motion.div
              variants={fadeUpVariants}
              className="mt-16 flex items-center gap-3"
              style={{ color: "var(--color-text-muted)" }}
            >
              <span className="text-xs font-mono tracking-widest">scroll to explore</span>
              <motion.div
                className="w-8 h-px"
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ originX: 0, background: "var(--color-text-muted)" }}
              />
            </motion.div>
          </motion.div>
          <motion.div
            className="flex-shrink-0 flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
          >
            <ProfilePhoto />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MonozukuriSection() {
  const { ref, isInView } = useScrollReveal();
  const items = [
    { emoji: "🍳", title: "요리 (특히 일식)", desc: "자취하면서 직접 만들기 시작했어요. 레시피대로만 하면 재미없어서 조금씩 바꿔보는 게 즐거워요." },
    { emoji: "🎨", title: "미술 & 디자인", desc: "어릴 때부터 그리고 만드는 걸 좋아했어요. 지금은 UI 디자인으로 이어지고 있고요." },
    { emoji: "💻", title: "코드", desc: "나만의 코드로 뭔가를 만들 수 있다는 게 신기해서 시작했어요. 처음 화면에 무언가 뜨는 그 순간이 좋아요." },
    { emoji: "🏙️", title: "시뮬레이션 게임", desc: "도시 경영, 시뮬레이터류를 좋아해요. 시스템을 설계하고 최적화하는 게 재밌어요." },
  ];
  return (
    <section className="py-32" ref={ref}>
      <div className="page-container">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.div variants={fadeUpVariants}><SectionLabel number="01" label="ものづくり" /></motion.div>
          <motion.h2 variants={fadeUpVariants} className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "var(--color-text-glow)" }}>
            눈치채면 항상<br />무언가를 만들고 있어요.
          </motion.h2>
          <motion.p variants={fadeUpVariants} className="text-base leading-relaxed mb-16 max-w-xl" style={{ color: "var(--color-text-muted)" }}>
            The SSS 설명회에서 사이토상이 말했어요.
            <br />
            <span style={{ color: "var(--color-text)" }}>"휴일이라도 어느 순간 코드를 쓰고 있는 사람."</span>
            <br />
            저는 코드뿐 아니라 요리도, 그림도 그렇게 하더라고요.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUpVariants}
                className="p-6 rounded-xl"
                style={{
                  background: "var(--color-bg-navy)",
                  border: "1px solid var(--color-border)",
                  transition: "background 0.8s ease, border-color 0.8s ease",
                }}
                whileHover={{ borderColor: "rgba(77,124,254,0.3)", background: "var(--color-bg-surface)" }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-2xl mb-3 block">{item.emoji}</span>
                <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--color-text-glow)" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function JourneySection() {
  const { ref, isInView } = useScrollReveal();
  const timeline = [
    { period: "고등학생", title: "일본어와의 첫 만남", desc: "수업에서 처음 일본어를 접했어요. 처음엔 잘 몰랐는데, 알아가면서 재밌어졌고 일본에서 일하고 싶다는 생각이 생겼어요.", tag: "きっかけ" },
    { period: "군 복무 중", title: "학점은행제 + 공부 시작", desc: "시간이 생겨서 학점은행제 수업을 들었어요. 솔직히 집중은 못 했지만, 준비는 멈추지 않으려 했어요.", tag: "継続" },
    { period: "2025 ~ 2026", title: "SCIT 마스터 과정", desc: "Java, Spring Boot, JavaScript 등 IT 기술과 일본어를 동시에 배웠어요. 팀 프로젝트에서 CSS를 주로 맡았는데 너무 재밌었어요. 그게 프론트엔드로 방향을 잡은 계기가 됐어요.", tag: "転換点" },
    { period: "지금", title: "Project Luna", desc: "학원에서 배운 Java가 아닌, 스스로 선택한 Next.js로 포트폴리오를 만들고 있어요. AI와 페어 프로그래밍하면서 코드 하나하나 이해하는 중이에요.", tag: "現在" },
  ];
  return (
    <section className="py-32" ref={ref}>
      <div className="page-container">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.div variants={fadeUpVariants}><SectionLabel number="02" label="Journey" /></motion.div>
          <motion.h2 variants={fadeUpVariants} className="text-3xl md:text-4xl font-bold mb-16" style={{ color: "var(--color-text-glow)" }}>
            거창하지 않아요.<br />그냥 계속 했을 뿐이에요.
          </motion.h2>
          <div className="relative">
            <div className="absolute top-0 bottom-0 w-px" style={{ left: "0", background: "linear-gradient(to bottom, transparent, var(--color-border), transparent)" }} />
            <div className="space-y-12 pl-8">
              {timeline.map((item, i) => (
                <motion.div key={i} variants={fadeUpVariants} className="relative">
                  <div className="absolute w-2 h-2 rounded-full" style={{ left: "-2.25rem", top: "0.4rem", background: "var(--color-accent)", boxShadow: "0 0 8px rgba(77,124,254,0.6)" }} />
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>{item.period}</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ color: "var(--color-accent)", border: "1px solid rgba(77,124,254,0.3)", background: "rgba(77,124,254,0.05)" }}>{item.tag}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--color-text-glow)" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed max-w-lg" style={{ color: "var(--color-text-muted)" }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function WhyJapanSection() {
  const { ref, isInView } = useScrollReveal();
  return (
    <section className="py-32" ref={ref}>
      <div className="page-container">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.div variants={fadeUpVariants}><SectionLabel number="03" label="Why Japan / Why SSS" /></motion.div>
          <motion.div variants={fadeUpVariants} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "var(--color-text-glow)" }}>
              좋아서 시작했고,<br />계속했을 뿐입니다.
            </h2>
            <p className="text-base leading-relaxed max-w-xl" style={{ color: "var(--color-text)" }}>
              고등학생 때 일본어 수업에서 시작된 작은 관심이었어요.
              처음엔 잘 몰라서 어렵기도 했지만, 알아가면서 재밌어졌고
              어느 순간 일본에서 일하고 싶다는 목표가 생겼어요.
              <br /><br />
              거창한 이유는 없어요.
              그냥 좋았고, 그 마음을 놓지 않았더니
              N1 취득, SCIT 과정, 그리고 지금 여기까지 왔어요.
            </p>
          </motion.div>
          <motion.div
            variants={fadeUpVariants}
            className="p-8 rounded-2xl"
            style={{
              background: "var(--color-bg-navy)",
              border: "1px solid rgba(77,124,254,0.2)",
              transition: "background 0.8s ease",
            }}
          >
            <h3 className="text-xl font-bold mb-4" style={{ color: "var(--color-accent)" }}>왜 The SSS인가요?</h3>
            <div className="space-y-4">
              {[
                { title: "프론트엔드 특화", desc: "백엔드는 파트너사에 맡기고 프론트에 집중하는 환경이 저에게 맞아요. CSS로 화면을 만드는 게 제일 재밌거든요." },
                { title: "AI를 적극 활용하는 문화", desc: "새로운 모델이 나오면 바로 써보는 팀. 저도 그렇게 일하고 싶어요. 도구를 잘 쓰는 게 실력이라고 생각해요." },
                { title: "자사 빌딩, 파견 없음", desc: "한 팀과 오래 함께하면서 성장하고 싶어요. 3개월마다 다른 회사에 나가는 환경보다 같은 팀에서 깊이 일하는 게 맞아요." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-1 rounded-full flex-shrink-0 mt-1" style={{ background: "var(--color-accent)", minHeight: "1rem" }} />
                  <div>
                    <h4 className="text-sm font-semibold mb-1" style={{ color: "var(--color-text-glow)" }}>{item.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{item.desc}</p>
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
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.div variants={fadeUpVariants}><SectionLabel number="04" label="Skills" /></motion.div>
          <motion.h2 variants={fadeUpVariants} className="text-3xl md:text-4xl font-bold mb-16" style={{ color: "var(--color-text-glow)" }}>
            배운 것과<br />배우고 있는 것.
          </motion.h2>
          <div className="space-y-10">
            {Object.entries(skills).map(([category, items]) => (
              <motion.div key={category} variants={fadeUpVariants}>
                <h3 className="text-xs font-mono tracking-widest uppercase mb-4" style={{ color: "var(--color-text-muted)" }}>{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <motion.span
                      key={skill}
                      className="px-3 py-1 text-sm font-mono rounded-full"
                      style={{
                        color: "var(--color-text)",
                        border: "1px solid var(--color-border)",
                        background: "var(--color-bg-navy)",
                        transition: "background 0.8s ease, border-color 0.8s ease",
                      }}
                      whileHover={{ borderColor: "rgba(77,124,254,0.4)", color: "var(--color-text-glow)" }}
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

function ContactSection() {
  const { ref, isInView } = useScrollReveal();
  return (
    <section className="py-32" ref={ref}>
      <div className="page-container">
        <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="text-center">
          <motion.div variants={fadeUpVariants}><SectionLabel number="05" label="Contact" /></motion.div>
          <motion.h2 variants={fadeUpVariants} className="text-3xl md:text-4xl font-bold mb-6" style={{ color: "var(--color-text-glow)" }}>
            함께 만들어요.
          </motion.h2>
          <motion.p variants={fadeUpVariants} className="text-base mb-12" style={{ color: "var(--color-text-muted)" }}>
            언제든지 연락주세요.
          </motion.p>
          <motion.div variants={fadeUpVariants} className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="mailto:your@email.com"
              className="px-6 py-3 text-sm font-medium rounded-lg"
              style={{ background: "linear-gradient(135deg, #4D7CFE 0%, #3a5fd9 100%)", color: "white", boxShadow: "0 0 20px rgba(77,124,254,0.3)" }}
              whileHover={{ scale: 1.03, boxShadow: "0 0 32px rgba(77,124,254,0.5)" }}
              whileTap={{ scale: 0.97 }}
            >
              이메일 보내기
            </motion.a>
            <motion.a
              href="https://github.com/wanudesu"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-sm font-medium rounded-lg"
              style={{ border: "1px solid var(--color-border)", color: "var(--color-text)", background: "transparent", transition: "border-color 0.3s ease" }}
              whileHover={{ scale: 1.03, borderColor: "var(--color-text-muted)" }}
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

export default function AboutPage() {
  return (
    <>
      {/* 📖 배경을 CSS 변수로 → 라이트/다크 자동 전환 */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: "radial-gradient(ellipse at 30% 20%, var(--color-bg-navy) 0%, var(--color-bg) 50%, var(--color-bg) 100%)",
          transition: "background 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
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