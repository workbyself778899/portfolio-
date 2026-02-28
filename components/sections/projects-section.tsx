"use client";

import { SectionWrapper } from "./section-wrapper";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Project = {
  _id?: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
};

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/sections/projects")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) setProjects(json.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <SectionWrapper id="projects" eyebrow="Projects" title="..." subtitle="">
        <div className="flex min-h-[120px] items-center justify-center text-muted-foreground">Loading...</div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper
      id="projects"
      eyebrow="Projects"
      title="Things I’ve built"
      subtitle="A selection of projects showcasing my experience with full‑stack development and modern tooling."
    >
      {projects.length === 0 ? (
        <p className="text-sm text-muted-foreground">No projects yet. Add projects from the admin panel.</p>
      ) : (
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <motion.article
            key={project._id ?? project.title}
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
                {(project.tech ?? []).map((t) => (
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
              {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="text-sky-500 underline-offset-4 hover:text-sky-400 hover:underline"
              >
                GitHub
              </a>
              )}
              {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Live demo
              </a>
              )}
            </div>
          </motion.article>
        ))}
        </div>
      )}
    </SectionWrapper>
  );
}