"use client";

import { motion } from "framer-motion";

export function Logo({
  size = "default",
  animated = false,
}: {
  size?: "sm" | "default" | "lg";
  animated?: boolean;
}) {
  const sizeMap = {
    sm: { icon: 28, text: "text-lg" },
    default: { icon: 36, text: "text-xl" },
    lg: { icon: 48, text: "text-3xl" },
  };

  const { icon, text } = sizeMap[size];

  const Wrapper = animated ? motion.div : "div";
  const wrapperProps = animated
    ? {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5 },
      }
    : {};

  return (
    <Wrapper className="flex items-center gap-3" {...wrapperProps}>
      {/* Logo icon */}
      <div
        className="relative flex items-center justify-center rounded-xl"
        style={{
          width: icon,
          height: icon,
          background: "linear-gradient(135deg, #4F8CFF, #A855F7)",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: icon * 0.55, height: icon * 0.55 }}
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
        {animated && (
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{
              background: "linear-gradient(135deg, #4F8CFF, #A855F7)",
              filter: "blur(12px)",
              opacity: 0.4,
            }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        )}
      </div>

      {/* Logo text */}
      <div className="flex flex-col">
        <span className={`${text} font-bold tracking-tight text-[var(--text-primary)]`}>
          Career<span className="text-[#6366F1]">Copilot</span>
        </span>
        {size === "lg" && (
          <span className="text-xs text-[var(--text-muted)] tracking-wider uppercase">
            AI Operating System
          </span>
        )}
      </div>
    </Wrapper>
  );
}
