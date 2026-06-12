"use client";

export function GridBackground({
  variant = "grid",
  className = "",
}: {
  variant?: "grid" | "dots";
  className?: string;
}) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${
        variant === "dots" ? "dot-bg" : "grid-bg"
      } ${className}`}
      aria-hidden="true"
    />
  );
}
