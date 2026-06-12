"use client";

import {
  Briefcase,
  Clock,
  ExternalLink,
  Sparkles,
  MapPin,
  DollarSign,
  Calendar
} from "lucide-react";

export default function JobsPage() {
  return (
    <div className="max-w-[1000px] mx-auto p-2">
      {/* Header Area */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Job Matches</h1>
          <p className="text-sm text-[var(--text-muted)]">
            AI-powered job recommendations based on your profile and goals
          </p>
        </div>
        <button className="bg-[#0B0F19] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-black transition-colors shadow-sm">
          <Sparkles size={16} />
          Refresh Matches
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-[var(--text-muted)] mb-3">
            <Briefcase size={16} />
            <span className="text-xs font-medium">Total Matches</span>
          </div>
          <p className="text-2xl font-bold text-white">47</p>
        </div>
        <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-[var(--text-muted)] mb-3">
            <Clock size={16} />
            <span className="text-xs font-medium">New This Week</span>
          </div>
          <p className="text-2xl font-bold text-white">12</p>
        </div>
        <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-[var(--text-muted)] mb-3">
            <ExternalLink size={16} />
            <span className="text-xs font-medium">Applied</span>
          </div>
          <p className="text-2xl font-bold text-white">8</p>
        </div>
        <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-[var(--text-muted)] mb-3">
            <Sparkles size={16} />
            <span className="text-xs font-medium">Avg Match Score</span>
          </div>
          <p className="text-2xl font-bold text-white">86%</p>
        </div>
      </div>

      {/* Job Cards */}
      <div className="space-y-6">
        {/* Job Card 1 */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-6 shadow-sm">
          <div className="flex gap-4">
            {/* Logo placeholder */}
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#A855F7] flex items-center justify-center text-white shrink-0 shadow-sm">
              <Briefcase size={24} />
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-white">Senior Full Stack Engineer</h3>
                  <p className="text-sm text-[var(--text-muted)]">TechCorp Inc.</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="bg-[#10B981] text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Sparkles size={12} /> 95%
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)] mt-1">Excellent Match</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] mt-2 mb-4">
                <span className="flex items-center gap-1"><MapPin size={12} /> San Francisco, CA</span>
                <span className="flex items-center gap-1"><Clock size={12} /> Full-time</span>
                <span className="flex items-center gap-1"><DollarSign size={12} /> $150k - $200k</span>
                <span className="flex items-center gap-1"><Calendar size={12} /> Posted 2 days ago</span>
              </div>

              <p className="text-sm text-white mb-4">
                Join our innovative team building next-gen cloud solutions.
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {["React", "Nodejs", "TypeScript", "AWS"].map((tag) => (
                  <span key={tag} className="bg-[var(--bg-primary)] text-[var(--text-muted)] text-[11px] font-medium px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="bg-[#A855F7]/10 text-[var(--text-muted)] text-xs rounded-lg p-3 flex items-center gap-2 mb-5 border border-[#A855F7]/20">
                <Sparkles size={14} className="text-[#A855F7]" />
                <span className="font-medium text-white">Excellent match! Your React and TypeScript skills align perfectly with this role.</span>
              </div>

              <div className="flex items-center gap-3">
                <button className="bg-[#0B0F19] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-black transition-colors shadow-sm">
                  Apply Now
                </button>
                <button className="bg-[var(--bg-primary)] text-[var(--text-muted)] px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#E2E8F0] transition-colors">
                  Save for Later
                </button>
                <button className="bg-transparent border border-[var(--border-default)] text-[var(--text-muted)] px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2 transition-colors">
                  <ExternalLink size={14} /> View Details
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Job Card 2 */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl p-6 shadow-sm">
          <div className="flex gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center text-white shrink-0 shadow-sm">
              <Briefcase size={24} />
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-white">Cloud Solutions Architect</h3>
                  <p className="text-sm text-[var(--text-muted)]">CloudScale Systems</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="bg-[#0EA5E9] text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Sparkles size={12} /> 88%
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)] mt-1">Good Match</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] mt-2 mb-4">
                <span className="flex items-center gap-1"><MapPin size={12} /> Remote</span>
                <span className="flex items-center gap-1"><Clock size={12} /> Full-time</span>
                <span className="flex items-center gap-1"><DollarSign size={12} /> $160k - $220k</span>
                <span className="flex items-center gap-1"><Calendar size={12} /> Posted 5 days ago</span>
              </div>

              <p className="text-sm text-white mb-4">
                Lead the architecture and design of scalable cloud infrastructure for enterprise clients.
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {["AWS", "Kubernetes", "Terraform", "Docker"].map((tag) => (
                  <span key={tag} className="bg-[var(--bg-primary)] text-[var(--text-muted)] text-[11px] font-medium px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="bg-[#0EA5E9]/10 text-[var(--text-muted)] text-xs rounded-lg p-3 flex items-center gap-2 mb-5 border border-[#0EA5E9]/20">
                <Sparkles size={14} className="text-[#0EA5E9]" />
                <span className="font-medium text-white">Good match. You meet 4 of 5 core requirements, missing only advanced Terraform experience.</span>
              </div>

              <div className="flex items-center gap-3">
                <button className="bg-[#0B0F19] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-black transition-colors shadow-sm">
                  Apply Now
                </button>
                <button className="bg-[var(--bg-primary)] text-[var(--text-muted)] px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#E2E8F0] transition-colors">
                  Save for Later
                </button>
                <button className="bg-transparent border border-[var(--border-default)] text-[var(--text-muted)] px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2 transition-colors">
                  <ExternalLink size={14} /> View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
