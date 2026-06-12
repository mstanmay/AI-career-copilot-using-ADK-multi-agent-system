"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function GlassCard({
  children,
  className = "",
  hover = true,
  glow,
  padding = "p-6",
  onClick,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "blue" | "purple";
  padding?: string;
  onClick?: () => void;
}) {
  return (
    <motion.div
      className={cn(
        "glass-card",
        padding,
        glow === "blue" && "glow-border-blue",
        glow === "purple" && "glow-border-purple",
        hover && "cursor-pointer",
        onClick && "cursor-pointer",
        className
      )}
      whileHover={
        hover
          ? {
              scale: 1.01,
              transition: { duration: 0.2 },
            }
          : undefined
      }
      whileTap={onClick ? { scale: 0.99 } : undefined}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
