"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiDownload, FiMail } from "react-icons/fi";
import { SectionWrapper } from "./section-wrapper";
import { useEffect, useState } from "react";

const TITLES = ["MERN Stack Developer", "Full Stack Engineer", "IT Student"];

function useTypingEffect(words: string[], speed = 120, pause = 1200) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const blinkInterval = setInterval(
      () => setBlink((prev) => !prev),
      500,
    );
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    const currentWord = words[index];

    if (!deleting && subIndex === currentWord.length) {
      const timeout = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(timeout);
    }

    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => setSubIndex((prev) => prev + (deleting ? -1 : 1)),
      deleting ? speed / 2 : speed,
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, pause, speed, words]);

  return {
    text: TITLES[index].substring(0, subIndex),
    cursorVisible: blink,
  };
}

export function HeroSection() {
  const { text, cursorVisible } = useTypingEffect(TITLES);

  return (
    <SectionWrapper
      id="home" 
      eyebrow="Welcome"
      title="Hi, I&apos;m Your Name"
      subtitle="A passionate software developer / IT student focused on building clean, performant, and user-friendly web applications."
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center">
        <div className="space-y-6">
          <motion.p
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1 text-xs font-medium text-muted-foreground shadow-md shadow-black/40"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
            Open to internships & full-time roles
          </motion.p>

          <motion.h1
            className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Crafting modern web experiences.
          </motion.h1>

          <motion.p
            className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            I specialize in building full-stack applications with clean
            architecture, reusable components, and a strong focus on
            performance, accessibility, and developer experience.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <a
              href="/cv.pdf"
              className="btn-primary"
              download
            >
              <FiDownload className="h-4 w-4" />
              Download CV
            </a>
            <a
              href="#contact"
              className="btn-secondary"
            >
              <FiMail className="h-4 w-4" />
              Contact Me
            </a>
          </motion.div>

          <motion.div
            className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <span className="pill">Title</span>
              <p className="font-mono text-sky-500">
                {text}
                <span
                  className={`ml-1 inline-block h-4 w-[2px] align-middle bg-sky-500 ${
                    cursorVisible ? "opacity-100" : "opacity-0"
                  }`}
                />
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="badge">Next.js</span>
              <span className="badge">TypeScript</span>
              <span className="badge">MongoDB</span>
              <span className="badge">Framer Motion</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto flex max-w-xs items-center justify-center lg:max-w-sm"
          initial={{ opacity: 0, scale: 0.9, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7, type: "spring" }}
        >
          <div className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),transparent_60%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.3),transparent_60%)] opacity-80 blur-2xl" />
          <div className="relative rounded-[2rem] border border-border bg-card p-4 shadow-2xl shadow-black/50 backdrop-blur-xl">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-gradient-to-br from-muted via-background to-background">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_0_0,rgba(56,189,248,0.4),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(59,130,246,0.3),transparent_55%)] opacity-60" />
              <div className="relative flex flex-col items-center gap-3 px-6 pb-6 pt-8">
                <div className="relative h-28 w-28 overflow-hidden rounded-3xl border border-border bg-muted shadow-lg shadow-black/60">
                  <Image
                    src="/profile.jpg"
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-foreground">
                    Your Name
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Software Developer • IT Student
                  </p>
                </div>
                <div className="flex w-full items-center justify-between rounded-xl border border-border bg-muted px-3 py-2 text-[11px] text-muted-foreground">
                  <span>Available for remote & onsite work</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 ring-1 ring-emerald-500/40">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Open
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}


