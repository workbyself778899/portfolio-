"use client";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <motion.div
         className="h-12 w-12 rounded-2xl bg-linear-to-tr from-sky-400 to-cyan-300 shadow-lg shadow-sky-500/40"
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, 8, -8, 0],
          borderRadius: ["0.75rem", "1.5rem", "0.75rem"],
        }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}


