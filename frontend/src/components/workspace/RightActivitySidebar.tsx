"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/GlassCard";
import { useChatStore } from "@/stores/chatStore";
import { CheckCircle2, Circle, Clock, Loader2, Shield, Play } from "lucide-react";

// Mock data for the static agents
const ALL_AGENTS = [
  { id: "resume", name: "Resume Agent" },
  { id: "skills", name: "Skill Gap Agent" },
  { id: "roadmap", name: "Roadmap Agent" },
  { id: "interview", name: "Interview Agent" },
];

export function RightActivitySidebar() {
  const { agentEvents } = useChatStore();

  // Mock timeline logs
  const logs = [
    { time: "10:01", msg: "Workspace initialized" },
    { time: "10:01", msg: "Agents online and ready" },
  ];

  return (
    <div className="w-80 h-full flex flex-col gap-4 overflow-y-auto pr-2 pb-6">
      {/* Placement Readiness Score */}
      <GlassCard className="p-5 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-blue)] opacity-5 rounded-full blur-2xl translate-x-10 -translate-y-10" />
        <Shield size={24} className="text-[var(--accent-blue)] mb-2 relative z-10" />
        <h3 className="text-sm font-medium text-white relative z-10">Placement Ready</h3>
        <div className="flex items-end justify-center gap-1 mt-2 relative z-10">
          <span className="text-3xl font-bold gradient-text-blue-purple">87</span>
          <span className="text-sm text-[var(--text-muted)] mb-1">/100</span>
        </div>
        <p className="text-[10px] text-[var(--text-secondary)] mt-2 relative z-10">
          Top 15% of candidates for Data Scientist
        </p>
      </GlassCard>

      {/* Agent Status */}
      <GlassCard className="flex-1 min-h-0 flex flex-col">
        <h3 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
          <Play size={14} className="text-[var(--success)]" />
          Agent Execution
        </h3>
        
        <div className="space-y-3 flex-1 overflow-y-auto">
          {ALL_AGENTS.map((agent) => {
            // Find if this agent has an active event
            const activeEvent = agentEvents.find((e) => e.agent === agent.id);
            const status = activeEvent ? activeEvent.status : "waiting";

            return (
              <div key={agent.id} className="flex items-center gap-3">
                <div className="mt-0.5">
                  {status === "completed" ? (
                    <CheckCircle2 size={14} className="text-[var(--success)]" />
                  ) : status === "working" ? (
                    <Loader2 size={14} className="text-[var(--accent-blue)] animate-spin" />
                  ) : (
                    <Circle size={14} className="text-[var(--text-muted)]" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">{agent.name}</p>
                  <p className="text-[11px] text-[var(--text-muted)] capitalize">
                    {status === "working" ? "Running..." : status}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Live Logs */}
      <GlassCard className="flex-1 min-h-0 flex flex-col">
        <h3 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
          <Clock size={14} className="text-[var(--text-secondary)]" />
          Live Logs
        </h3>
        <div className="space-y-3 flex-1 overflow-y-auto">
          {logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-3 text-xs"
            >
              <span className="text-[var(--text-muted)] shrink-0 font-mono">
                {log.time}
              </span>
              <span className="text-[var(--text-secondary)]">
                {log.msg}
              </span>
            </motion.div>
          ))}
          
          {agentEvents.map((event, i) => (
            <motion.div
              key={`event-${i}`}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-3 text-xs"
            >
              <span className="text-[var(--accent-blue)] shrink-0 font-mono">
                Live
              </span>
              <span className="text-white">
                {event.agent.replace(/_/g, " ")}: {event.task}
              </span>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
