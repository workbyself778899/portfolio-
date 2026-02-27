"use client";
import { SectionWrapper } from "./section-wrapper";
import { motion } from "framer-motion";

const STATIC_PROJECTS = [
  {
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio site built with Next.js, Tailwind CSS, and Framer Motion.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    github: "https://github.com/your-username/portfolio",
    demo: "https://your-portfolio-demo.com",
  },
  {
    title: "MERN Stack App",
    description:
      "Full-stack MERN application with authentication, CRUD operations, and API integration.",
    tech: ["MongoDB", "Express", "React", "Node"],
    github: "https://github.com/your-username/mern-app",
    demo: "https://your-mern-demo.com",
  },
];

export function ProjectsSection() {
  // NOTE: Later we will replace STATIC_PROJECTS with data from /api/projects
  const projects = STATIC_PROJECTS;

  return (
    <SectionWrapper
      id="projects"
      eyebrow="Projects"
      title="Things I’ve built"
      subtitle="A selection of projects showcasing my experience with full‑stack development and modern tooling."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <motion.article
            key={project.title}
            className="group card flex h-full flex-col justify-between"
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            <div>
              <h3 className="text-base font-semibold text-foreground">
                {project.title}
              </h3>
              <p className="mt-2 text-xs text-muted-foreground">
                {project.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground ring-1 ring-border"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3 text-xs">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="text-sky-500 underline-offset-4 hover:text-sky-400 hover:underline"
              >
                GitHub
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Live demo
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionWrapper>
  );
}


