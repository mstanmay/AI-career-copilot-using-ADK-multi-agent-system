"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/GlassCard";
import {
  CheckCircle2,
  Circle,
  Clock,
  BookOpen,
  Trophy,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

type RoadmapStatus = "completed" | "current" | "upcoming";

const roadmapData: Array<{
  month: number;
  title: string;
  status: RoadmapStatus;
  skills: string[];
  resources: string[];
  milestones: string[];
}> = [
  {
    month: 1,
    title: "Foundations & Mathematics",
    status: "upcoming",
    skills: ["Linear Algebra", "Probability", "Statistics", "Python Advanced"],
    resources: ["Khan Academy", "3Blue1Brown", "MIT OpenCourseware"],
    milestones: ["Complete stats course", "Build first data analysis project"],
  },
  {
    month: 2,
    title: "Core Machine Learning",
    status: "upcoming",
    skills: ["Supervised Learning", "Unsupervised Learning", "Feature Engineering"],
    resources: ["Andrew Ng's ML Course", "Hands-On ML Book", "Kaggle"],
    milestones: ["Complete ML course", "Submit first Kaggle competition"],
  },
  {
    month: 3,
    title: "Deep Learning & Neural Networks",
    status: "upcoming",
    skills: ["Neural Networks", "CNNs", "RNNs", "TensorFlow"],
    resources: ["Fast.ai", "Deep Learning Specialization", "Papers With Code"],
    milestones: ["Build image classifier", "Implement NLP pipeline"],
  },
  {
    month: 4,
    title: "MLOps & Production",
    status: "upcoming",
    skills: ["Docker", "MLflow", "AWS SageMaker", "CI/CD"],
    resources: ["MLOps Zoomcamp", "Docker Docs", "AWS Training"],
    milestones: ["Deploy ML model to production", "Set up ML pipeline"],
  },
  {
    month: 5,
    title: "Specialization & Projects",
    status: "upcoming",
    skills: ["NLP", "Computer Vision", "Recommendation Systems"],
    resources: ["Hugging Face", "Stanford CS231n", "Research Papers"],
    milestones: ["Complete capstone project", "Publish on GitHub"],
  },
  {
    month: 6,
    title: "Interview Prep & Job Search",
    status: "upcoming",
    skills: ["System Design", "ML Design", "Coding Interviews"],
    resources: ["Designing ML Systems Book", "LeetCode", "Mock Interviews"],
    milestones: ["Complete 50 LeetCode problems", "Do 5 mock interviews"],
  },
];

const statusConfig = {
  completed: { icon: CheckCircle2, color: "var(--success)", label: "Completed" },
  current: { icon: Clock, color: "var(--accent-blue)", label: "In Progress" },
  upcoming: { icon: Circle, color: "var(--text-muted)", label: "Upcoming" },
};

export default function RoadmapPage() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-lg font-semibold text-white">Career Roadmap</h2>
          <p className="text-sm text-[var(--text-muted)]">
            Your 6-month learning plan to become a Data Scientist
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-surface)]">
          <Trophy size={14} className="text-[var(--warning)]" />
          <span className="text-sm text-white">0/6 months completed</span>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-[var(--border-default)]" />

        <div className="space-y-4">
          {roadmapData.map((month, i) => {
            const config = statusConfig[month.status];
            const isExpanded = expanded === i;
            const StatusIcon = config.icon;

            return (
              <motion.div
                key={month.month}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <GlassCard
                  className="ml-12 relative"
                  padding="p-0"
                  hover={false}
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute -left-[36px] top-5 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                    style={{
                      borderColor: config.color,
                      background: month.status === "completed" ? config.color : "var(--bg-primary)",
                    }}
                  >
                    {month.status === "completed" && (
                      <CheckCircle2 size={10} className="text-white" />
                    )}
                  </div>

                  {/* Header — clickable */}
                  <button
                    className="w-full flex items-center justify-between p-4 text-left"
                    onClick={() => setExpanded(isExpanded ? null : i)}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="text-xs font-mono px-2 py-0.5 rounded"
                        style={{
                          background: `${config.color}20`,
                          color: config.color,
                        }}
                      >
                        M{month.month}
                      </span>
                      <h4 className="text-sm font-medium text-white">{month.title}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{
                          background: `${config.color}15`,
                          color: config.color,
                        }}
                      >
                        {config.label}
                      </span>
                      {isExpanded ? (
                        <ChevronDown size={14} className="text-[var(--text-muted)]" />
                      ) : (
                        <ChevronRight size={14} className="text-[var(--text-muted)]" />
                      )}
                    </div>
                  </button>

                  {/* Expanded content */}
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="px-4 pb-4 space-y-4 border-t border-[var(--border-default)]"
                    >
                      <div className="pt-4">
                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">
                          Skills to Learn
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {month.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2.5 py-1 rounded-md text-xs bg-[var(--accent-blue-muted)] text-[var(--accent-blue)]"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">
                          Resources
                        </p>
                        <div className="space-y-1.5">
                          {month.resources.map((res) => (
                            <div
                              key={res}
                              className="flex items-center gap-2 text-sm text-[var(--text-muted)]"
                            >
                              <BookOpen size={12} className="text-[var(--accent-purple)]" />
                              {res}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">
                          Milestones
                        </p>
                        <div className="space-y-1.5">
                          {month.milestones.map((ms) => (
                            <div
                              key={ms}
                              className="flex items-center gap-2 text-sm text-[var(--text-muted)]"
                            >
                              <Circle size={12} className="text-[var(--text-muted)]" />
                              {ms}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
