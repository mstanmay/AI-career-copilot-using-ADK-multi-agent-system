"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  LayoutDashboard,
  MessageSquare,
  Target,
  FileText,
  Briefcase,
  TrendingUp,
  Settings,
  Sparkles
} from "lucide-react";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/workspace", icon: MessageSquare, label: "AI Chat" },
  { href: "/roadmap", icon: Target, label: "Career Roadmap" },
  { href: "/resume", icon: FileText, label: "Resume Analysis" },
  { href: "/jobs", icon: Briefcase, label: "Job Matches" },
  { href: "/skills", icon: TrendingUp, label: "Skill Gap" },
  { href: "/interview", icon: MessageSquare, label: "Interview Simulator" },
  { href: "/credentials", icon: FileText, label: "Credentials" },
  { href: "/agents", icon: Settings, label: "Agent System" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="w-[260px] shrink-0 flex flex-col border-r border-[var(--border-default)]"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-[var(--border-default)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F8CFF] to-[#A855F7] flex items-center justify-center text-white shadow-lg shadow-[#6366F1]/20">
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="text-base font-semibold text-white leading-tight">
              AI Career Copilot
            </h1>
            <p className="text-[11px] text-[var(--text-muted)]">
              Multi-Agent System
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (pathname === "/" && item.href === "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-150 ${
                isActive
                  ? "bg-[var(--accent-blue)]/15 text-[#4F8CFF] border border-[#4F8CFF]/20"
                  : "text-[var(--text-muted)] hover:text-white hover:bg-[var(--bg-surface)]"
              }`}
            >
              <item.icon
                size={18}
                className={`shrink-0 ${isActive ? "text-[#4F8CFF]" : ""}`}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Pro Tip Card */}
      <div className="p-4">
        <div
          className="rounded-xl p-4 border border-[var(--border-default)]"
          style={{
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1))",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={14} className="text-[#A855F7]" />
            <h4 className="text-sm font-semibold text-white">Pro Tip</h4>
          </div>
          <p className="text-[12px] text-[var(--text-muted)] leading-relaxed">
            Use our AI agents to analyze your career trajectory and get
            personalized recommendations.
          </p>
        </div>
      </div>
    </aside>
  );
}
