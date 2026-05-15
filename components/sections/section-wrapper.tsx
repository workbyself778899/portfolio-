"use client";
import { ReactNode } from "react";
import { motion } from "framer-motion";

type SectionWrapperProps = {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  image?: string;
};

export function SectionWrapper({
  id,
  eyebrow,
  title,
  subtitle,
  image,
  children,
}: SectionWrapperProps) {
  return (
    <section id={id} className="section-padding">
      <motion.div
        className="container min-w-0"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div
          className={`flex flex-col gap-6 sm:gap-8 ${
            image
              ? "lg:flex-row lg:items-start lg:justify-between lg:gap-10"
              : ""
          }`}
        >
          <motion.div
            className={`min-w-0 flex-1 ${image ? "order-2 lg:order-1" : ""}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {eyebrow && (
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-400/80">
                {eyebrow}
              </p>
            )}
            <h2 className="section-title">{title}</h2>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </motion.div>

          {image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
              viewport={{ once: true, amount: 0.25 }}
              className="order-1 flex shrink-0 justify-center lg:order-2 lg:justify-end"
            >
              <img
                src={image}
                alt={title}
                className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-2xl ring-4 ring-sky-400 sm:h-36 sm:w-36 md:h-44 md:w-44 md:border-8 lg:h-48 lg:w-48"
              />
            </motion.div>
          )}
        </div>

        <div className="mt-6 sm:mt-8">{children}</div>
      </motion.div>
    </section>
  );
}
