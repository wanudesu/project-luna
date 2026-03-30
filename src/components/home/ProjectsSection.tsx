"use client";
// src/components/home/ProjectsSection.tsx

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { homeTranslations } from "@/locales/home";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const projectsData = [
  {
    id: "kumo",
    color: "#4D7CFE",
    year: "2025",
    tags: ["Java", "Spring Boot", "JavaScript", "CSS"],
  },
  {
    id: "luna",
    color: "#FBBF24",
    year: "2026",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
  },
];

function ProjectCard({
  project,
  index,
  t,
}: {
  project: (typeof projectsData)[0];
  index: number;
  t: any;
}) {
  const isEven = index % 2 === 0;
  const projectT = t[project.id as "kumo" | "luna"];

  return (
    <motion.div
      variants={itemVariants}
      className={`grid md:grid-cols-2 gap-8 items-center ${isEven ? "" : "md:[direction:rtl]"}`}
    >
      <Link href={`/${project.id}`} className="block group md:[direction:ltr]">
        <motion.div
          className="relative aspect-[16/10] rounded-2xl overflow-hidden"
          style={{ backgroundColor: "var(--color-bg-surface)" }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${project.color}20 0%, ${project.color}40 100%)`,
            }}
          >
            <span
              className="text-6xl font-bold opacity-20 capitalize"
              style={{ color: project.color }}
            >
              {project.id}
            </span>
          </div>
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6"
            style={{
              background:
                "linear-gradient(to top, var(--card-overlay) 0%, transparent 60%)",
            }}
          >
            <span className="text-white font-medium flex items-center gap-2">
              {t.viewProject}
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </div>
        </motion.div>
      </Link>

      <div
        className={`space-y-4 md:[direction:ltr] ${isEven ? "" : "md:text-right"}`}
      >
        <div
          className={`flex items-center gap-3 text-sm ${isEven ? "" : "md:justify-end"}`}
          style={{ color: "var(--color-text-muted)" }}
        >
          <span className="font-mono">{project.year}</span>
          <span
            className="w-8 h-px"
            style={{ backgroundColor: "var(--color-border)" }}
          />
          <span>{projectT.subtitle}</span>
        </div>

        <Link href={`/${project.id}`}>
          <h3
            className="text-2xl md:text-3xl font-bold capitalize"
            style={{ color: "var(--color-text-glow)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-accent)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-text-glow)")
            }
          >
            {project.id.charAt(0).toUpperCase() + project.id.slice(1)}
          </h3>
        </Link>

        <p
          className="leading-relaxed"
          style={{ color: "var(--color-text-muted)" }}
        >
          {projectT.description}
        </p>

        <div
          className={`flex flex-wrap gap-2 ${isEven ? "" : "md:justify-end"}`}
        >
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs font-mono rounded-full"
              style={{
                backgroundColor: "var(--color-bg-surface)",
                color: "var(--color-text-muted)",
                border: "1px solid var(--color-border)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const { lang } = useLanguage();
  const t = homeTranslations[lang].projects;

  return (
    <section
      id="projects"
      className="min-h-screen py-24 px-6 md:px-12 lg:px-24"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={itemVariants} className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span
              className="text-xs font-mono"
              style={{ color: "var(--color-accent)", minWidth: "2rem" }}
            >
              02
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "var(--color-accent-glow)" }}
            />
            <span
              className="text-xs font-mono tracking-[0.15em] uppercase"
              style={{ color: "var(--color-text-muted)" }}
            >
              {t.sectionLabel}
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold mt-2"
            style={{ color: "var(--color-text-glow)" }}
          >
            {t.title}
          </h2>
          <p
            className="mt-4 max-w-xl"
            style={{ color: "var(--color-text-muted)" }}
          >
            {t.subtitle}
          </p>
        </motion.div>

        <div className="space-y-24">
          {projectsData.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} t={t} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
