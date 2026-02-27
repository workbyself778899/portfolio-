"use client";
import { SectionWrapper } from "./section-wrapper";
import { motion } from "framer-motion";
import { SiMongodb, SiNextdotjs, SiNodedotjs, SiReact, SiTailwindcss } from "react-icons/si";


const SKILL_CATEGORIES = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs", "Authentication", "WebSockets"],
  },
  {
    title: "Databases",
    skills: ["MongoDB", "Mongoose", "PostgreSQL", "Prisma (basic)"],
  },
  {
    title: "Tools & Others",
    skills: ["Git & GitHub", "VS Code", "Postman", "Linux basics", "Agile/Scrum"],
  },
];

const ICONS = [
  { Icon: SiReact, color: "text-sky-400" },
  { Icon: SiNextdotjs, color: "text-foreground" },
  { Icon: SiTailwindcss, color: "text-sky-300" },
  { Icon: SiNodedotjs, color: "text-emerald-400" },
  { Icon: SiMongodb, color: "text-emerald-300" },
];

export function SkillsSection() {
  return (
    <SectionWrapper
      id="skills"
      eyebrow="Skills"
      title="What I work with"
      subtitle="A focused set of technologies and tools I use to build reliable, modern web applications."
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="grid gap-5 sm:grid-cols-2">
          {SKILL_CATEGORIES.map((category) => (
            <motion.div
              key={category.title}
              className="card"
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className="text-sm font-semibold text-foreground">
                {category.title}
              </h3>
              <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col gap-5">
          <div className="card flex flex-col gap-5">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Tech stack snapshot
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Comfortable building full-stack apps with the MERN stack and
                modern tooling around it.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {ICONS.map(({ Icon, color }, idx) => (
                <motion.div
                  key={idx}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-muted shadow-md shadow-black/40"
                  whileHover={{ scale: 1.08, rotate: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                >
                  <Icon className={`h-5 w-5 ${color}`} />
                </motion.div>
              ))}
            </div>
          </div>
          <div className="card space-y-3">
            <h3 className="text-sm font-semibold text-foreground">
              How I work
            </h3>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              <li>• Clean architecture & reusable components</li>
              <li>• Git-based workflows and code reviews</li>
              <li>• Accessibility and performance awareness</li>
              <li>• Writing clear commit messages and documentation</li>
            </ul>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}


