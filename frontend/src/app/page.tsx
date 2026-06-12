"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { ParticleField } from "@/components/effects/ParticleField";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { Logo } from "@/components/shared/Logo";
import {
  FileText,
  Target,
  Map,
  Mic,
  Briefcase,
  Shield,
  ArrowRight,
  Sparkles,
  Bot,
  Play,
  CheckCircle2,
  Loader2,
  Clock,
  Brain,
  TrendingUp,
  Award,
  ChevronRight,
  Zap,
  BarChart3,
  Users,
  Star,
  ArrowUpRight,
} from "lucide-react";

/* ============================================
   Data
   ============================================ */

const agents = [
  { name: "Resume Agent", status: "complete" as const, progress: 100, detail: "Analyzed 12 sections, ATS score: 87/100" },
  { name: "Skill Gap Agent", status: "running" as const, progress: 72, detail: "Comparing skills against 3 target roles..." },
  { name: "Roadmap Agent", status: "waiting" as const, progress: 0, detail: "Awaiting skill gap analysis" },
  { name: "Interview Coach", status: "waiting" as const, progress: 0, detail: "Ready to generate practice questions" },
  { name: "Job Match Agent", status: "waiting" as const, progress: 0, detail: "Will scan 500+ openings" },
];

const features = [
  {
    icon: FileText,
    title: "Resume Analysis",
    description: "Deep ATS scoring, section-by-section feedback, and actionable rewrites powered by AI.",
    color: "#4F8CFF",
    gradient: "from-blue-500/20 to-blue-600/5",
  },
  {
    icon: Target,
    title: "Skill Gap Detection",
    description: "Map your current abilities against target roles with precision gap identification.",
    color: "#A855F7",
    gradient: "from-purple-500/20 to-purple-600/5",
  },
  {
    icon: Map,
    title: "Career Roadmap",
    description: "Personalized month-by-month learning plans with resource recommendations.",
    color: "#22C55E",
    gradient: "from-green-500/20 to-green-600/5",
  },
  {
    icon: Mic,
    title: "Interview Coaching",
    description: "AI-generated behavioral and technical questions with real-time feedback.",
    color: "#F59E0B",
    gradient: "from-amber-500/20 to-amber-600/5",
  },
  {
    icon: Briefcase,
    title: "Job Matching",
    description: "Intelligent role matching with compatibility scoring across 500+ openings.",
    color: "#4F8CFF",
    gradient: "from-blue-500/20 to-blue-600/5",
  },
  {
    icon: Shield,
    title: "Verified Credentials",
    description: "Blockchain-verified certifications, scores, and achievements recruiters can validate.",
    color: "#A855F7",
    gradient: "from-purple-500/20 to-purple-600/5",
  },
];

const stats = [
  { value: "10K+", label: "Careers Launched", icon: TrendingUp },
  { value: "95%", label: "Placement Rate", icon: Award },
  { value: "7", label: "AI Agents", icon: Brain },
  { value: "500+", label: "Companies Trust Us", icon: Users },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "SDE-2 at Google",
    quote: "The multi-agent system identified gaps I never knew existed. Went from 3 rejections to 2 offers in 6 weeks.",
    avatar: "PS",
  },
  {
    name: "Alex Chen",
    role: "ML Engineer at Meta",
    quote: "The interview coach agent prepared me for exactly the type of questions I got asked. Genuinely felt like cheating.",
    avatar: "AC",
  },
  {
    name: "Sara Williams",
    role: "Product Manager at Stripe",
    quote: "Blockchain-verified credentials gave recruiters instant confidence. My roadmap agent was eerily accurate.",
    avatar: "SW",
  },
];

const agentFlow = [
  { name: "Coordinator", icon: Brain, color: "#4F8CFF" },
  { name: "Resume Agent", icon: FileText, color: "#22C55E" },
  { name: "Skill Gap Agent", icon: Target, color: "#A855F7" },
  { name: "Roadmap Agent", icon: Map, color: "#F59E0B" },
  { name: "Interview Agent", icon: Mic, color: "#EF4444" },
  { name: "Job Match Agent", icon: Briefcase, color: "#4F8CFF" },
];

/* ============================================
   Animated Counter
   ============================================ */

function AnimatedCounter({ value, delay = 0 }: { value: string; delay?: number }) {
  const [display, setDisplay] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const numericPart = value.replace(/[^0-9.]/g, "");
          const suffix = value.replace(/[0-9.]/g, "");
          const target = parseFloat(numericPart);
          const duration = 1500;
          const startTime = Date.now() + delay;

          const animate = () => {
            const elapsed = Date.now() - startTime;
            if (elapsed < 0) {
              requestAnimationFrame(animate);
              return;
            }
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            setDisplay(`${current}${suffix}`);
            if (progress < 1) requestAnimationFrame(animate);
            else setDisplay(value);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, delay, hasAnimated]);

  return <span ref={ref}>{display}</span>;
}

/* ============================================
   Animated Agent Status Row
   ============================================ */

function AgentStatusRow({
  agent,
  index,
}: {
  agent: (typeof agents)[0];
  index: number;
}) {
  const statusColors = {
    complete: "#22C55E",
    running: "#4F8CFF",
    waiting: "#64748B",
  };

  const statusIcons = {
    complete: CheckCircle2,
    running: Loader2,
    waiting: Clock,
  };

  const StatusIcon = statusIcons[agent.status];

  return (
    <motion.div
      className="flex items-center gap-4 py-3 px-4 rounded-lg"
      style={{ background: "rgba(17, 24, 39, 0.4)" }}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.4 }}
    >
      <StatusIcon
        size={18}
        style={{ color: statusColors[agent.status], flexShrink: 0 }}
        className={agent.status === "running" ? "animate-spin" : ""}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-white">{agent.name}</span>
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{
              color: statusColors[agent.status],
              background: `${statusColors[agent.status]}15`,
            }}
          >
            {agent.status === "complete" ? "Complete" : agent.status === "running" ? "Running" : "Waiting"}
          </span>
        </div>
        <p className="text-xs text-[var(--text-muted)] truncate">{agent.detail}</p>
        {agent.status !== "waiting" && (
          <div className="mt-1.5 h-1 rounded-full overflow-hidden" style={{ background: "rgba(30, 41, 59, 0.6)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: statusColors[agent.status] }}
              initial={{ width: 0 }}
              whileInView={{ width: `${agent.progress}%` }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 + 0.3, duration: 1, ease: "easeOut" }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ============================================
   Main Landing Page
   ============================================ */

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const [activeFlowIndex, setActiveFlowIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFlowIndex((prev) => (prev + 1) % agentFlow.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    }),
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "#050816" }}>
      {/* ========== NAVIGATION ========== */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 glass"
        style={{ borderBottom: "1px solid rgba(30, 41, 59, 0.5)" }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="section-container h-16 flex items-center justify-between">
          <Logo size="default" />
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors hidden sm:block"
            >
              Sign In
            </Link>
            <Link href="/login" className="btn-primary text-sm py-2.5 px-5">
              Get Started
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* ========== HERO SECTION ========== */}
      <section ref={heroRef} className="relative pt-32 pb-24 overflow-hidden">
        <ParticleField particleCount={50} />
        <GlowOrb color="blue" size={700} x="65%" y="35%" />
        <GlowOrb color="purple" size={550} x="25%" y="55%" delay={3} />

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 section-container">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8"
              style={{
                background: "rgba(79, 140, 255, 0.08)",
                border: "1px solid rgba(79, 140, 255, 0.2)",
              }}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Sparkles size={12} className="text-[var(--accent-blue)]" />
              <span className="text-[var(--text-secondary)]">Powered by 7 Specialized AI Agents</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="heading-1 mb-6"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Your Personal
              <br />
              <span className="gradient-text-blue-purple">AI Career Copilot</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="body-text max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              AI agents analyze resumes, identify skill gaps, generate roadmaps,
              coach interviews, and help you become placement-ready.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              <Link href="/login" className="btn-gradient text-base py-3.5 px-8">
                <Bot size={18} />
                <span>Start Analysis</span>
              </Link>
              <button className="btn-ghost text-base py-3.5 px-8">
                <Play size={16} />
                <span>Watch Demo</span>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ========== STATS ========== */}
      <section className="relative z-10 py-8">
        <div className="section-container">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center py-6 px-4 rounded-xl"
                style={{ background: "rgba(17, 24, 39, 0.3)", border: "1px solid rgba(30, 41, 59, 0.3)" }}
                custom={i}
                variants={fadeUp}
              >
                <stat.icon size={20} className="mx-auto mb-3 text-[var(--accent-blue)]" style={{ opacity: 0.7 }} />
                <p className="text-3xl md:text-4xl font-bold gradient-text-blue-purple mb-1">
                  <AnimatedCounter value={stat.value} delay={i * 150} />
                </p>
                <p className="caption-text">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== LIVE AGENT WORKSPACE ========== */}
      <section className="relative z-10 py-24">
        <div className="section-container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-2 mb-4">
              Live Agent <span className="gradient-text-blue-purple">Workspace</span>
            </h2>
            <p className="body-text max-w-xl mx-auto">
              Watch your AI agents collaborate in real-time to analyze your career profile.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
            {/* Agent Status Panel */}
            <motion.div
              className="glass-card p-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(79, 140, 255, 0.15)" }}>
                  <Bot size={16} className="text-[var(--accent-blue)]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Agent Execution Pipeline</h3>
                  <p className="text-xs text-[var(--text-muted)]">2 of 5 agents active</p>
                </div>
              </div>
              <div className="space-y-2">
                {agents.map((agent, i) => (
                  <AgentStatusRow key={agent.name} agent={agent} index={i} />
                ))}
              </div>
            </motion.div>

            {/* Placement Readiness */}
            <motion.div
              className="glass-card p-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(34, 197, 94, 0.15)" }}>
                  <BarChart3 size={16} className="text-[var(--success)]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Placement Readiness</h3>
                  <p className="text-xs text-[var(--text-muted)]">Based on multi-agent analysis</p>
                </div>
              </div>

              {/* Score Display */}
              <div className="flex items-center justify-center py-8">
                <div className="relative">
                  <svg width="160" height="160" viewBox="0 0 160 160">
                    <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(30, 41, 59, 0.5)" strokeWidth="8" />
                    <motion.circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="url(#scoreGradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={440}
                      strokeDashoffset={440}
                      whileInView={{ strokeDashoffset: 440 * (1 - 0.87) }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                      transform="rotate(-90 80 80)"
                    />
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4F8CFF" />
                        <stop offset="100%" stopColor="#22C55E" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-white">87</span>
                    <span className="text-xs text-[var(--text-muted)]">out of 100</span>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Strengths", value: "React, Node.js, System Design", color: "#22C55E" },
                  { label: "Weaknesses", value: "ML, Cloud Architecture", color: "#EF4444" },
                  { label: "Resume Score", value: "87/100", color: "#4F8CFF" },
                  { label: "Interview Ready", value: "72%", color: "#F59E0B" },
                ].map((metric) => (
                  <div
                    key={metric.label}
                    className="p-3 rounded-lg"
                    style={{ background: "rgba(17, 24, 39, 0.4)" }}
                  >
                    <p className="text-xs text-[var(--text-muted)] mb-1">{metric.label}</p>
                    <p className="text-sm font-medium" style={{ color: metric.color }}>
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== AGENT FLOW VISUALIZATION ========== */}
      <section className="relative z-10 py-24">
        <div className="section-container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-2 mb-4">
              Multi-Agent <span className="gradient-text-blue-purple">Collaboration</span>
            </h2>
            <p className="body-text max-w-xl mx-auto">
              Six specialized agents orchestrated by a coordinator to deliver comprehensive career intelligence.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-3">
              {agentFlow.map((agent, i) => {
                const isActive = i <= activeFlowIndex;
                const isCurrent = i === activeFlowIndex;
                return (
                  <div key={agent.name} className="flex flex-col items-center w-full max-w-md">
                    <motion.div
                      className="w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-500"
                      style={{
                        background: isCurrent
                          ? `linear-gradient(135deg, ${agent.color}15, ${agent.color}08)`
                          : "rgba(17, 24, 39, 0.3)",
                        border: `1px solid ${isCurrent ? `${agent.color}40` : "rgba(30, 41, 59, 0.3)"}`,
                        boxShadow: isCurrent ? `0 0 30px ${agent.color}15` : "none",
                      }}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: `${agent.color}${isActive ? "20" : "10"}`,
                          transition: "all 0.5s ease",
                        }}
                      >
                        <agent.icon
                          size={18}
                          style={{
                            color: isActive ? agent.color : "var(--text-muted)",
                            transition: "all 0.5s ease",
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <p
                          className="text-sm font-semibold transition-colors duration-500"
                          style={{ color: isActive ? "#fff" : "var(--text-muted)" }}
                        >
                          {agent.name}
                        </p>
                      </div>
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex-shrink-0"
                        >
                          {isCurrent ? (
                            <Loader2 size={16} className="animate-spin" style={{ color: agent.color }} />
                          ) : (
                            <CheckCircle2 size={16} style={{ color: "#22C55E" }} />
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                    {i < agentFlow.length - 1 && (
                      <div
                        className="w-px h-4 transition-colors duration-500"
                        style={{
                          background: isActive
                            ? `linear-gradient(to bottom, ${agent.color}60, ${agentFlow[i + 1].color}30)`
                            : "rgba(30, 41, 59, 0.5)",
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURES ========== */}
      <section className="relative z-10 py-24">
        <div className="section-container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-2 mb-4">
              Everything You Need to{" "}
              <span className="gradient-text-blue-purple">Succeed</span>
            </h2>
            <p className="body-text max-w-xl mx-auto">
              Seven specialized AI agents work together to accelerate your career journey.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="premium-card p-6 cursor-default"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${feature.color}15` }}
                >
                  <feature.icon size={22} style={{ color: feature.color }} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-medium" style={{ color: feature.color }}>
                  <span>Learn more</span>
                  <ChevronRight size={12} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BLOCKCHAIN SECTION ========== */}
      <section className="relative z-10 py-24">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="glass-card p-8 md:p-12 relative overflow-hidden"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <GlowOrb color="purple" size={400} x="90%" y="20%" />
              <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
                    style={{ background: "rgba(168, 85, 247, 0.1)", border: "1px solid rgba(168, 85, 247, 0.2)" }}
                  >
                    <Shield size={12} className="text-[var(--accent-purple)]" />
                    <span className="text-[var(--accent-purple)]">Blockchain Verified</span>
                  </div>
                  <h2 className="heading-3 mb-4">
                    Credentials That <span className="gradient-text-blue-purple">Recruiters Trust</span>
                  </h2>
                  <p className="body-text text-base mb-6">
                    Every achievement is recorded on-chain. Certifications, interview scores,
                    and career milestones become verifiable, tamper-proof credentials.
                  </p>
                  <Link href="/login" className="btn-ghost text-sm py-2.5 px-6">
                    <span>Explore Credentials</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Verified Certifications", desc: "On-chain proof of completed courses", icon: Award },
                    { label: "Interview Scores", desc: "Immutable AI-assessed performance", icon: Star },
                    { label: "Career Achievements", desc: "Verified milestones and contributions", icon: Zap },
                    { label: "Recruiter Verification", desc: "One-click credential validation", icon: CheckCircle2 },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      className="flex items-start gap-4 p-4 rounded-lg"
                      style={{ background: "rgba(17, 24, 39, 0.4)" }}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(168, 85, 247, 0.12)" }}
                      >
                        <item.icon size={16} className="text-[var(--accent-purple)]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{item.label}</p>
                        <p className="text-xs text-[var(--text-muted)]">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="relative z-10 py-24">
        <div className="section-container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-2 mb-4">
              Trusted by <span className="gradient-text-blue-purple">Professionals</span>
            </h2>
            <p className="body-text max-w-xl mx-auto">
              Hear from engineers and product managers who transformed their careers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                className="premium-card p-6"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: "linear-gradient(135deg, var(--accent-blue), var(--accent-purple))",
                      color: "#fff",
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{t.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="relative z-10 py-24">
        <div className="section-container">
          <motion.div
            className="glass-card p-12 md:p-16 text-center relative overflow-hidden max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlowOrb color="blue" size={350} x="15%" y="50%" />
            <GlowOrb color="purple" size={300} x="85%" y="50%" delay={2} />
            <div className="relative z-10">
              <h2 className="heading-2 mb-4">
                Ready to Transform{" "}
                <span className="gradient-text-blue-purple">Your Career?</span>
              </h2>
              <p className="body-text max-w-md mx-auto mb-8">
                Join thousands of professionals who&apos;ve accelerated their careers with AI-powered guidance.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/login" className="btn-gradient text-base py-3.5 px-8">
                  <Sparkles size={18} />
                  <span>Get Started — It&apos;s Free</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="relative z-10 border-t py-8" style={{ borderColor: "rgba(30, 41, 59, 0.4)" }}>
        <div className="section-container flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo size="sm" />
          <p className="text-xs text-[var(--text-muted)]">
            © 2025 Career Copilot. Built with AI & Blockchain.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-[var(--text-muted)] hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
