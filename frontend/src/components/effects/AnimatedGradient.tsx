"use client";

import { motion } from "framer-motion";

export function AnimatedGradient({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(79,140,255,0.08), rgba(168,85,247,0.08), rgba(34,197,94,0.04), rgba(79,140,255,0.08))",
          filter: "blur(80px)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}
