"use client";

import { SectionWrapper } from "./section-wrapper";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

type Project = {
  _id?: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
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
        if (json.success && Array.isArray(json.data)) {
          setProjects(json.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <SectionWrapper id="projects" eyebrow="Projects" title="..." subtitle="">
        <div className="flex min-h-[120px] items-center justify-center text-muted-foreground">
          Loading...
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper
      id="projects"
      eyebrow="Projects"
      title="Things I’ve built"
      subtitle="A selection of projects showcasing my experience with full-stack development and modern tooling."
    >
      {projects.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No projects yet. Add projects from the admin panel.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 pt-4 sm:gap-6 sm:pt-6 md:grid-cols-2">
          {projects.map((project) => (
            <motion.article
              key={project._id ?? project.title}
              className="group card flex h-full flex-col overflow-hidden rounded-xl border bg-background shadow-sm"
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              {/* IMAGE */}
              {project.image && (
                <div className="relative h-40 w-full overflow-hidden sm:h-44">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
              )}

              {/* CONTENT */}
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <h3 className="text-sm font-semibold text-foreground sm:text-base">
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

                {/* LINKS */}
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
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}