"use client";

import { motion } from "framer-motion";

export function LoadingState({
  text = "Loading...",
  size = "default",
}: {
  text?: string;
  size?: "sm" | "default" | "lg";
}) {
  const dotSize = size === "sm" ? 6 : size === "lg" ? 12 : 8;

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="rounded-full"
            style={{
              width: dotSize,
              height: dotSize,
              background: "linear-gradient(135deg, #4F8CFF, #A855F7)",
            }}
            animate={{
              y: [0, -12, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <p className="text-sm text-[var(--text-muted)]">{text}</p>
    </div>
  );
}
