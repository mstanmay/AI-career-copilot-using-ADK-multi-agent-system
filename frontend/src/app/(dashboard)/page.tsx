"use client";

import Link from "next/link";
import { Sparkles, MessageSquare, Target } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] max-w-5xl mx-auto px-6">
      
      {/* Floating Pill */}
      <div className="bg-[#E2E8F0] text-[#334155] px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 mb-8 mt-12">
        <Sparkles size={16} className="text-[#334155]" />
        Powered by Advanced AI Multi-Agent System
      </div>

      {/* Main Heading */}
      <h1 className="text-5xl md:text-6xl font-bold text-[#6366F1] mb-6 text-center tracking-tight">
        Your AI Career Copilot
      </h1>

      {/* Subtext */}
      <p className="text-lg text-[var(--text-muted)] text-center max-w-3xl mb-12 leading-relaxed">
        Navigate your career journey with confidence. Our multi-agent AI system
        provides personalized guidance, skill analysis, and job matching to
        accelerate your success.
      </p>

      {/* CTAs */}
      <div className="flex items-center gap-4 mb-24">
        <Link
          href="/workspace"
          className="bg-[#0B0F19] text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-black transition-colors shadow-md"
        >
          <Sparkles size={18} />
          Start AI Chat
        </Link>
        <Link
          href="/goals"
          className="bg-[#E2E8F0] text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-[#CBD5E1] transition-colors"
        >
          Set Career Goals
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-4xl">
        {[
          { value: "10,000+", label: "Career Paths Analyzed" },
          { value: "94%", label: "Success Rate" },
          { value: "7", label: "AI Agents" },
          { value: "25K+", label: "Active Users" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl p-6 text-center shadow-sm"
          >
            <h3 className="text-3xl font-bold text-[#6366F1] mb-2">{stat.value}</h3>
            <p className="text-sm text-[var(--text-muted)]">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Intelligent Features Heading (bottom cut off in screenshot) */}
      <h2 className="text-3xl font-bold text-white mt-24">
        Intelligent Features
      </h2>
    </div>
  );
}
