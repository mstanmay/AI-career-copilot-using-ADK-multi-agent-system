"use client";

import {
  Bot,
  Activity,
  Target,
  Zap,
  Brain,
  MessageSquare
} from "lucide-react";

export default function AgentsPage() {
  return (
    <div className="max-w-[1000px] mx-auto p-2">
      {/* Header Area */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">Multi-Agent System</h1>
        <p className="text-sm text-[var(--text-muted)]">
          Powered by ADK (Agent Development Kit) - Enterprise-grade AI agents working together
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-[var(--text-muted)] mb-3">
            <Bot size={16} />
            <span className="text-xs font-medium">Total Agents</span>
          </div>
          <p className="text-2xl font-bold text-white">6</p>
        </div>
        <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-[var(--text-muted)] mb-3">
            <Activity size={16} />
            <span className="text-xs font-medium">Active Sessions</span>
          </div>
          <p className="text-2xl font-bold text-white">24K</p>
        </div>
        <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-[var(--text-muted)] mb-3">
            <Target size={16} />
            <span className="text-xs font-medium">Avg Accuracy</span>
          </div>
          <p className="text-2xl font-bold text-white">94.5%</p>
        </div>
        <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-[var(--text-muted)] mb-3">
            <Zap size={16} />
            <span className="text-xs font-medium">Response Time</span>
          </div>
          <p className="text-2xl font-bold text-white">1.4s</p>
        </div>
      </div>

      {/* Agent Collaboration Flow */}
      <div className="bg-[#A855F7]/10 border border-[#A855F7]/20 rounded-xl p-8 mb-10 shadow-sm relative overflow-hidden text-center">
        <h3 className="text-xl font-bold text-white mb-8 relative z-10">
          Agent Collaboration Flow
        </h3>
        
        <div className="flex items-center justify-center gap-4 relative z-10">
          {/* Node 1 */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#6366F1] flex items-center justify-center text-white mb-3 shadow-md z-10">
              <MessageSquare size={24} />
            </div>
            <span className="text-xs font-bold text-white">User Input</span>
          </div>

          <div className="w-8 h-[2px] bg-[#6366F1] -mt-6"></div>

          {/* Node 2 */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#D946EF] flex items-center justify-center text-white mb-3 shadow-md z-10">
              <Brain size={24} />
            </div>
            <span className="text-xs font-bold text-white">Agent Router</span>
          </div>

          <div className="w-8 h-[2px] bg-[#D946EF] -mt-6"></div>

          {/* Node 3 */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#F43F5E] flex items-center justify-center text-white mb-3 shadow-md z-10">
              <Zap size={24} />
            </div>
            <span className="text-xs font-bold text-white">Specialized Agents</span>
          </div>

          <div className="w-8 h-[2px] bg-[#F43F5E] -mt-6"></div>

          {/* Node 4 */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#F97316] flex items-center justify-center text-white mb-3 shadow-md z-10">
              <Activity size={24} />
            </div>
            <span className="text-xs font-bold text-white">Aggregated Response</span>
          </div>
        </div>
      </div>

      {/* Specialized Agents */}
      <div>
        <h3 className="text-xl font-bold text-white mb-5">Specialized Agents</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Agent 1 */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-5 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#0EA5E9] flex items-center justify-center text-white shrink-0">
                <Target size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-white">Career Advisor Agent</h4>
                <p className="text-xs text-[var(--text-muted)]">Career Planning & Strategy</p>
              </div>
            </div>
            <div className="bg-[#10B981]/10 text-[#059669] px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-[#10B981]/20">
              <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div> Active
            </div>
          </div>

          {/* Agent 2 */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-5 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#D946EF] flex items-center justify-center text-white shrink-0">
                <Brain size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-white">Skill Analysis Agent</h4>
                <p className="text-xs text-[var(--text-muted)]">Skill Assessment & Development</p>
              </div>
            </div>
            <div className="bg-[#10B981]/10 text-[#059669] px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-[#10B981]/20">
              <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div> Active
            </div>
          </div>

          {/* Agent 3 */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-5 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#F97316] flex items-center justify-center text-white shrink-0">
                <Activity size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-white">Resume Optimization Agent</h4>
                <p className="text-xs text-[var(--text-muted)]">ATS Scoring & Feedback</p>
              </div>
            </div>
            <div className="bg-[#10B981]/10 text-[#059669] px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-[#10B981]/20">
              <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div> Active
            </div>
          </div>

          {/* Agent 4 */}
          <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-5 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#6366F1] flex items-center justify-center text-white shrink-0">
                <Bot size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-white">Interview Prep Agent</h4>
                <p className="text-xs text-[var(--text-muted)]">Mock Interviews & Coaching</p>
              </div>
            </div>
            <div className="bg-[#10B981]/10 text-[#059669] px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-[#10B981]/20">
              <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div> Active
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
