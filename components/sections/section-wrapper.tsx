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
      <div className="container ">
        
       <div className="flex flex-wrap justify-between items-start gap-10">
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
          {image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.25 }}
            className="mt-6 flex justify-center"
          >
            <img
              src={image}
              alt={title}
              className="w-50 h-50 mb-10 md:mb-0 object-cover rounded-full border-8 border-white shadow-2xl ring-4 ring-sky-400"
            />
            
          </motion.div>
        )}
       </div>

       {children}
      </div>
    </section>
  );
}


