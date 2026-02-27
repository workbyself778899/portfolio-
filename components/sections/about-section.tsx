
"use client";
import { SectionWrapper } from "./section-wrapper";
import { motion } from "framer-motion";

const timeline = [
  {
    title: "BSc in Computer Science",
    institution: "Your University",
    period: "2022 — Present",
    description:
      "Focusing on software engineering, algorithms, and modern web technologies.",
  },
  {
    title: "Frontend Intern",
    institution: "Tech Company",
    period: "Summer 2024",
    description:
      "Built responsive interfaces and collaborated with designers and backend engineers.",
  },
];

const skills = [
  { name: "JavaScript / TypeScript", level: 85 },
  { name: "React & Next.js", level: 80 },
  { name: "Node.js & Express", level: 75 },
  { name: "MongoDB / PostgreSQL", level: 70 },
];

export function AboutSection() {
  return (
    <SectionWrapper
      id="about"
      eyebrow="About"
      title="Who I am"
      subtitle="A brief overview of my background, journey, and what drives me as a developer."
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="space-y-6 text-sm text-muted-foreground sm:text-base">
          <p>
            I&apos;m a{" "}
            <span className="font-semibold text-sky-500">
              software developer and IT student
            </span>{" "}
            who enjoys turning ideas into fast, accessible, and visually
            polished web experiences. I focus on writing clean, maintainable
            code and learning modern tools that improve both developer and user
            experience.
          </p>
          <p>
            My interests span from frontend development and UI/UX to backend
            APIs, databases, and deployment pipelines. I love working on
            real-world projects, collaborating with teams, and continuously
            improving my skills through practice and open-source contributions.
          </p>
          <p>
            Outside of coding, I enjoy reading tech blogs, exploring new tools,
            and contributing to communities where I can share knowledge and
            learn from others.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4 rounded-2xl border border-border bg-card p-4 shadow-lg shadow-black/40">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Education & Experience
            </h3>
            <div className="space-y-4">
              {timeline.map((item) => (
                <div
                  key={item.title}
                  className="border-l border-border pl-4"
                >
                  <p className="text-xs text-muted-foreground">{item.period}</p>
                  <p className="text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.institution}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

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
        </div>
      </div>
    </SectionWrapper>
  );
}


