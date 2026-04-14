"use client";

import { SectionWrapper } from "./section-wrapper";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function AboutSection() {
  const [data, setData] = useState<{
    title?: string;
    describe?: string;
    paragraphs?: string[];
    timeline?: { title: string; institution: string; period: string; description: string }[];
    skills?: { name: string; level: number }[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/sections/about")
      .then((res) => res.json())
      .then((json) => json.success && json.data && setData(json.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <SectionWrapper id="about" eyebrow="About" title="..." subtitle="">
        <div className="flex min-h-30 items-center justify-center text-muted-foreground">Loading...</div>
      </SectionWrapper>
    );
  }

  if (!data) {
    return (
      <SectionWrapper id="about" eyebrow="About" title="About" subtitle="">
        <p className="text-sm text-muted-foreground">No content yet. Add content from the admin panel.</p>
      </SectionWrapper>
    );
  }

  const title = data.title ?? "About";
  const subtitle = data.describe ?? "";
  const paragraphs = Array.isArray(data.paragraphs) ? data.paragraphs : [];
  const timeline = Array.isArray(data.timeline) ? data.timeline : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];

  const hasContent = paragraphs.length > 0 || timeline.length > 0 || skills.length > 0;
  if (!hasContent) {
    return (
      <SectionWrapper id="about" eyebrow="About" title={title} subtitle={subtitle}>
        <p className="text-sm text-muted-foreground">No content yet. Add content from the admin panel.</p>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="about" eyebrow="About" title={title} subtitle={subtitle}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        

        <div className="space-y-6">
          

          {skills.length > 0 && (
            <div className="space-y-3 rounded-2xl border border-border bg-card p-4 shadow-lg shadow-black/40">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Skill Level
              </h3>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{skill.name}</span>
                      <span className="text-sky-500">{skill.level}%</span>
                    </div>

                    {/* skill level bar   */}

                    <div className="mt-1 h-2 rounded-full bg-muted">
                      <motion.div
                        className="h-2 rounded-full bg-linear-to-r from-sky-400 to-cyan-300"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}


