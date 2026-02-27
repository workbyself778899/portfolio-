 "use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";

type SectionWrapperProps = {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function SectionWrapper({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: SectionWrapperProps) {
  return (
    <section id={id} className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.4 }}
        >
          {eyebrow && (
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-400/80">
              {eyebrow}
            </p>
          )}
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true, amount: 0.25 }}
          className="mt-8"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}


