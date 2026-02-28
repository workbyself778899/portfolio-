"use client";

import { SectionWrapper } from "./section-wrapper";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SiMongodb, SiNextdotjs, SiNodedotjs, SiReact, SiTailwindcss } from "react-icons/si";

const ICON_MAP: { [key: string]: { icon: typeof SiReact; color: string } } = {
  react: { icon: SiReact, color: "text-sky-400" },
  next: { icon: SiNextdotjs, color: "text-foreground" },
  nextjs: { icon: SiNextdotjs, color: "text-foreground" },
  tailwind: { icon: SiTailwindcss, color: "text-sky-300" },
  node: { icon: SiNodedotjs, color: "text-emerald-400" },
  mongodb: { icon: SiMongodb, color: "text-emerald-300" },
};

export function SkillsSection() {
  const [data, setData] = useState<{
    categories?: { title: string; skills: string[] }[];
    description?: string;
    techStack?: { name?: string; icon?: string; color?: string }[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/sections/skills")
      .then((res) => res.json())
      .then((json) => json.success && json.data && setData(json.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <SectionWrapper id="skills" eyebrow="Skills" title="..." subtitle="">
        <div className="flex min-h-[120px] items-center justify-center text-muted-foreground">Loading...</div>
      </SectionWrapper>
    );
  }

  if (!data) {
    return (
      <SectionWrapper id="skills" eyebrow="Skills" title="Skills" subtitle="">
        <p className="text-sm text-muted-foreground">No content yet. Add content from the admin panel.</p>
      </SectionWrapper>
    );
  }

  const categories = Array.isArray(data.categories) ? data.categories : [];
  const description = data.description ?? "";
  const techStack = Array.isArray(data.techStack) ? data.techStack : [];
  const hasContent = categories.length > 0 || description || techStack.length > 0;

  if (!hasContent) {
    return (
      <SectionWrapper id="skills" eyebrow="Skills" title="Skills" subtitle="">
        <p className="text-sm text-muted-foreground">No content yet. Add content from the admin panel.</p>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper
      id="skills"
      eyebrow="Skills"
      title="What I work with"
      subtitle="A focused set of technologies and tools I use to build reliable, modern web applications."
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        {categories.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2">
            {categories.map((category) => (
              <motion.div
                key={category.title}
                className="card"
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <h3 className="text-sm font-semibold text-foreground">{category.title}</h3>
                <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                  {(category.skills ?? []).map((skill) => (
                    <li key={skill} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-5">
          {(description || techStack.length > 0) && (
            <div className="card flex flex-col gap-5">
              {description && (
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Tech stack snapshot</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{description}</p>
                </div>
              )}
              {techStack.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {techStack.map((item, idx) => {
                    const key = (item.name ?? "").toLowerCase().replace(/\s/g, "");
                    const mapped = ICON_MAP[key] ?? ICON_MAP[Object.keys(ICON_MAP).find((k) => key.includes(k)) ?? ""];
                    const Icon = mapped?.icon ?? SiReact;
                    const color = item.color ?? mapped?.color ?? "text-sky-400";
                    return (
                      <motion.div
                        key={idx}
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-muted shadow-md shadow-black/40`}
                        whileHover={{ scale: 1.08, rotate: 4 }}
                        transition={{ type: "spring", stiffness: 400, damping: 18 }}
                      >
                        <Icon className={`h-5 w-5 ${color}`} />
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}


