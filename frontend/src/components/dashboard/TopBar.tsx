"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, Command } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { getInitials } from "@/lib/utils";

const pageTitles: Record<string, string> = {
  "/dashboard": "Career Dashboard",
  "/workspace": "Agent Workspace",
  "/resume": "Resume Analysis",
  "/skills": "Skills Dashboard",
  "/roadmap": "Career Roadmap",
  "/interview": "Interview Simulator",
  "/jobs": "Job Matching",
  "/credentials": "Blockchain Credentials",
};

export function TopBar() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const title = pageTitles[pathname] || "Dashboard";

  return (
    <header
      className="h-16 shrink-0 flex items-center justify-between px-6 border-b border-[var(--border-default)]"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Title */}
      <h1 className="text-lg font-semibold text-white">{title}</h1>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <button
          id="topbar-search"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-default)] text-sm text-[var(--text-muted)] hover:border-[var(--border-hover)] transition-all"
        >
          <Search size={14} />
          <span className="hidden md:inline">Search</span>
          <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] bg-[var(--bg-primary)] border border-[var(--border-default)]">
            <Command size={10} />K
          </kbd>
        </button>

        {/* Notifications */}
        <button
          id="topbar-notifications"
          className="relative p-2 rounded-lg hover:bg-[var(--bg-surface)] transition-colors"
        >
          <Bell size={18} className="text-[var(--text-muted)]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--accent-blue)]" />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center text-white text-xs font-bold">
          {getInitials(user?.name || "U")}
        </div>
      </div>
    </header>
  );
}
