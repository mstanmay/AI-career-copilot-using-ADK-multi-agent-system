"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/GlassCard";
import { SpotlightCard } from "@/components/effects/SpotlightCard";
import { Target, TrendingUp, BookOpen, ArrowUpRight } from "lucide-react";

const skillsData = [
  { name: "Python", current: 85, required: 90, priority: "medium" as const },
  { name: "Machine Learning", current: 60, required: 85, priority: "high" as const },
  { name: "SQL", current: 75, required: 80, priority: "medium" as const },
  { name: "TensorFlow", current: 40, required: 75, priority: "high" as const },
  { name: "Statistics", current: 70, required: 85, priority: "high" as const },
  { name: "Data Viz", current: 80, required: 75, priority: "low" as const },
  { name: "Docker", current: 45, required: 60, priority: "medium" as const },
  { name: "AWS", current: 30, required: 65, priority: "high" as const },
];

const priorityColors = {
  high: "var(--error)",
  medium: "var(--warning)",
  low: "var(--success)",
};

export default function SkillsPage() {
  const readiness = Math.round(
    skillsData.reduce((sum, s) => sum + Math.min(s.current / s.required, 1), 0) /
      skillsData.length * 100
  );

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header stats */}
      <motion.div
        className="grid md:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <GlassCard hover={false}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--accent-blue-muted)] flex items-center justify-center">
              <Target size={20} className="text-[var(--accent-blue)]" />
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)]">Overall Readiness</p>
              <p className="text-xl font-bold text-white">{readiness}%</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard hover={false}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--error-muted)] flex items-center justify-center">
              <TrendingUp size={20} className="text-[var(--error)]" />
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)]">Critical Gaps</p>
              <p className="text-xl font-bold text-white">
                {skillsData.filter((s) => s.priority === "high").length}
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard hover={false}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--success-muted)] flex items-center justify-center">
              <BookOpen size={20} className="text-[var(--success)]" />
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)]">Skills Met</p>
              <p className="text-xl font-bold text-white">
                {skillsData.filter((s) => s.current >= s.required).length}/{skillsData.length}
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Radar Chart Placeholder + Skills Grid */}
      <motion.div
        className="grid md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {/* Visual radar */}
        <GlassCard hover={false}>
          <h3 className="text-sm font-medium text-white mb-4">Skill Radar</h3>
          <div className="relative w-full aspect-square max-w-[300px] mx-auto">
            {/* Concentric circles */}
            {[0.25, 0.5, 0.75, 1].map((scale) => (
              <div
                key={scale}
                className="absolute rounded-full border border-[var(--border-default)]"
                style={{
                  width: `${scale * 100}%`,
                  height: `${scale * 100}%`,
                  left: `${(1 - scale) * 50}%`,
                  top: `${(1 - scale) * 50}%`,
                }}
              />
            ))}

            {/* Skill dots */}
            {skillsData.map((skill, i) => {
              const angle = (i / skillsData.length) * 2 * Math.PI - Math.PI / 2;
              const r = (skill.current / 100) * 45;
              const x = 50 + r * Math.cos(angle);
              const y = 50 + r * Math.sin(angle);

              return (
                <motion.div
                  key={skill.name}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    background: priorityColors[skill.priority],
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  title={`${skill.name}: ${skill.current}%`}
                />
              );
            })}

            {/* Labels */}
            {skillsData.map((skill, i) => {
              const angle = (i / skillsData.length) * 2 * Math.PI - Math.PI / 2;
              const x = 50 + 52 * Math.cos(angle);
              const y = 50 + 52 * Math.sin(angle);

              return (
                <span
                  key={`label-${skill.name}`}
                  className="absolute text-[10px] text-[var(--text-muted)] whitespace-nowrap"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {skill.name}
                </span>
              );
            })}
          </div>
        </GlassCard>

        {/* Skills List */}
        <div className="space-y-3">
          {skillsData
            .sort((a, b) => {
              const pa = { high: 0, medium: 1, low: 2 };
              return pa[a.priority] - pa[b.priority];
            })
            .map((skill, i) => {
              const gap = skill.required - skill.current;
              const met = skill.current >= skill.required;

              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <SpotlightCard className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white">{skill.name}</span>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-medium uppercase"
                        style={{
                          background: `${priorityColors[skill.priority]}20`,
                          color: priorityColors[skill.priority],
                        }}
                      >
                        {met ? "Met" : skill.priority}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 rounded-full bg-[var(--bg-surface-hover)] overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: met
                              ? "var(--success)"
                              : `linear-gradient(90deg, ${priorityColors[skill.priority]}, ${priorityColors[skill.priority]}88)`,
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.current}%` }}
                          transition={{ duration: 0.8, delay: i * 0.05 }}
                        />
                      </div>
                      <span className="text-xs text-[var(--text-muted)] w-20 text-right">
                        {skill.current}/{skill.required}
                      </span>
                    </div>

                    {!met && (
                      <p className="text-xs text-[var(--text-muted)] mt-2">
                        Gap: {gap} points — focus on this skill
                      </p>
                    )}
                  </SpotlightCard>
                </motion.div>
              );
            })}
        </div>
      </motion.div>
    </div>
  );
}
