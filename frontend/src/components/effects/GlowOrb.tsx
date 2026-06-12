"use client";

import { motion } from "framer-motion";

export function GlowOrb({
  color = "blue",
  size = 400,
  x = "50%",
  y = "50%",
  delay = 0,
  className = "",
}: {
  color?: "blue" | "purple" | "green";
  size?: number;
  x?: string;
  y?: string;
  delay?: number;
  className?: string;
}) {
  const colorMap = {
    blue: "rgba(79, 140, 255, 0.12)",
    purple: "rgba(168, 85, 247, 0.12)",
    green: "rgba(34, 197, 94, 0.08)",
  };

  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        background: `radial-gradient(circle, ${colorMap[color]} 0%, transparent 70%)`,
        filter: "blur(40px)",
      }}
      animate={{
        x: [0, 30, -20, 10, 0],
        y: [0, -20, 15, -10, 0],
        scale: [1, 1.1, 0.95, 1.05, 1],
        opacity: [0.6, 0.8, 0.5, 0.7, 0.6],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}
