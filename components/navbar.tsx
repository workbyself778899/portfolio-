"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "skill", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Education" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id) setActiveSection(id);
          }
        });
      },
      {
        threshold: 0.4,
      },
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-40 ${
        isScrolled ? "backdrop-blur-md" : "backdrop-blur-none"
      }`}
    >
      <div className="container flex items-center justify-between py-3">
        <div
          className="flex cursor-pointer items-center gap-2"
          onClick={() => handleNavClick("home")}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-linear-to-tr from-sky-500 to-cyan-400 text-base font-bold text-slate-950 shadow-lg shadow-sky-500/40">
            CV
          </div>
          <div className="hidden flex-col text-sm sm:flex">
            <span className="font-semibold tracking-tight text-foreground">
              Your Name
            </span>
            <span className="text-xs text-muted-foreground">
              Software Developer / IT Student
            </span>
          </div>
        </div>

        <nav className="hidden items-center gap-1 rounded-full border border-border bg-card px-2 py-1 text-xs shadow-lg shadow-black/40 md:flex">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => handleNavClick(section.id)}
              className={`relative rounded-full px-3 py-1.5 font-medium transition ${
                activeSection === section.id
                  ? "text-sky-500"
                  : "text-muted-foreground hover:text-sky-500"
              }`}
            >
              {activeSection === section.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-muted"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {section.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md shadow-black/40 md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="border-b border-border dark:bg-black bg-white md:hidden"
        >
          <div className="container flex flex-col gap-1 py-3 text-sm">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavClick(section.id)}
                className={`flex items-center justify-between rounded-xl px-3 py-2 text-left transition ${
                  activeSection === section.id
                    ? "bg-muted text-sky-500"
                    : "text-muted-foreground hover:bg-muted hover:text-sky-500"
                }`}
              >
                <span>{section.label}</span>
                {activeSection === section.id && (
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                )}
              </button>
            ))}
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
}


