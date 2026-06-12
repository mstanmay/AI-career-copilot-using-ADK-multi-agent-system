"use client";

import {
  Target,
  Briefcase,
  BookOpen,
  TrendingUp,
  Sparkles
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const lineData = [
  { name: "Jan", progress: 62 },
  { name: "Feb", progress: 65 },
  { name: "Mar", progress: 70 },
  { name: "Apr", progress: 73 },
  { name: "May", progress: 76 },
  { name: "Jun", progress: 80 },
];

const pieData = [
  { name: "Skills", value: 35, color: "#4F8CFF" },
  { name: "Jobs", value: 25, color: "#A855F7" },
  { name: "Learning", value: 20, color: "#10B981" },
  { name: "Goals", value: 20, color: "#F43F5E" },
];

const statCards = [
  {
    icon: Target,
    value: "3",
    label: "Active Goals",
    change: "+1",
    gradient: "from-[#4F8CFF]/20 to-[#4F8CFF]/5",
    iconColor: "text-[#4F8CFF]",
    borderColor: "border-[#4F8CFF]/20",
  },
  {
    icon: Briefcase,
    value: "47",
    label: "Job Matches",
    change: "+12",
    gradient: "from-[#A855F7]/20 to-[#A855F7]/5",
    iconColor: "text-[#A855F7]",
    borderColor: "border-[#A855F7]/20",
  },
  {
    icon: BookOpen,
    value: "8",
    label: "Skills Learning",
    change: "+2",
    gradient: "from-[#10B981]/20 to-[#10B981]/5",
    iconColor: "text-[#10B981]",
    borderColor: "border-[#10B981]/20",
  },
  {
    icon: TrendingUp,
    value: "78%",
    label: "Avg Progress",
    change: "+5%",
    gradient: "from-[#F97316]/20 to-[#F97316]/5",
    iconColor: "text-[#F97316]",
    borderColor: "border-[#F97316]/20",
  },
];

export default function DashboardPage() {
  return (
    <div className="max-w-[1200px] mx-auto">
      <p className="text-[var(--text-muted)] text-sm mb-6">
        Your AI-powered career journey at a glance
      </p>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((card, i) => (
          <div
            key={i}
            className={`relative overflow-hidden rounded-xl border ${card.borderColor} p-5`}
            style={{
              background: "var(--bg-surface)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} pointer-events-none`} />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-3">
                <div className={`p-2 rounded-lg bg-[var(--bg-primary)] ${card.iconColor}`}>
                  <card.icon size={18} />
                </div>
                <span className="bg-[#10B981]/15 text-[#10B981] text-xs font-semibold px-2 py-0.5 rounded-md">
                  {card.change}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-white">{card.value}</h3>
              <p className="text-sm text-[var(--text-muted)] mt-1">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 mb-6">
        {/* Line Chart */}
        <div
          className="rounded-xl border border-[var(--border-default)] p-6"
          style={{ background: "var(--bg-surface)" }}
        >
          <h3 className="text-base font-semibold text-white mb-6">
            Skill Progress Over Time
          </h3>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={lineData}
                margin={{ top: 5, right: 20, bottom: 5, left: -20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="rgba(255,255,255,0.06)"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "rgba(255,255,255,0.4)" }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "rgba(255,255,255,0.4)" }}
                  domain={[0, 100]}
                  ticks={[0, 25, 50, 75, 100]}
                />
                <Line
                  type="monotone"
                  dataKey="progress"
                  stroke="#6366F1"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#6366F1", strokeWidth: 2, stroke: "#0B0F19" }}
                  activeDot={{ r: 6, fill: "#6366F1", stroke: "#fff", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart */}
        <div
          className="rounded-xl border border-[var(--border-default)] p-6"
          style={{ background: "var(--bg-surface)" }}
        >
          <h3 className="text-base font-semibold text-white mb-2">
            Activity Distribution
          </h3>
          <div className="h-[180px] w-full flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-y-2 mt-4 px-2">
            {pieData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-[var(--text-muted)]">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity and Tasks Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent Activity */}
        <div
          className="rounded-xl border border-[var(--border-default)] p-6"
          style={{ background: "var(--bg-surface)" }}
        >
          <h3 className="text-base font-semibold text-white mb-5">
            Recent Activity
          </h3>
          <div className="space-y-5">
            {[
              {
                title: "Applied to Senior Engineer role at TechCorp",
                time: "2 hours ago",
                color: "bg-[#4F8CFF]",
                icon: Briefcase,
              },
              {
                title: "Completed AWS Fundamentals course",
                time: "1 day ago",
                color: "bg-[#10B981]",
                icon: BookOpen,
              },
              {
                title: "Updated career goal: Tech Lead by 2027",
                time: "2 days ago",
                color: "bg-[#A855F7]",
                icon: Target,
              },
              {
                title: "Improved System Design skill to 45%",
                time: "3 days ago",
                color: "bg-[#F97316]",
                icon: TrendingUp,
              },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-white shrink-0 ${activity.color}`}
                >
                  <activity.icon size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white leading-tight">
                    {activity.title}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div
          className="rounded-xl border border-[var(--border-default)] p-6"
          style={{ background: "var(--bg-surface)" }}
        >
          <h3 className="text-base font-semibold text-white mb-5">
            Upcoming Tasks
          </h3>
          <div className="space-y-3">
            {[
              {
                title: "Complete System Design course module 3",
                time: "Tomorrow",
                priority: "High",
                color: "text-[#F43F5E]",
                bg: "bg-[#F43F5E]/15",
              },
              {
                title: "Practice coding interview questions",
                time: "Jun 12",
                priority: "Medium",
                color: "text-[#F97316]",
                bg: "bg-[#F97316]/15",
              },
              {
                title: "Update LinkedIn profile",
                time: "Jun 15",
                priority: "Low",
                color: "text-[#4F8CFF]",
                bg: "bg-[#4F8CFF]/15",
              },
              {
                title: "Review job matches and apply",
                time: "This week",
                priority: "High",
                color: "text-[#F43F5E]",
                bg: "bg-[#F43F5E]/15",
              },
            ].map((task, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3.5 rounded-lg border border-[var(--border-default)]"
                style={{ background: "var(--bg-primary)" }}
              >
                <div className="flex gap-3 items-start">
                  <div className="mt-0.5 w-4 h-4 rounded border border-[var(--border-hover)] shrink-0 cursor-pointer" />
                  <div>
                    <p className="text-sm font-medium text-white">
                      {task.title}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      {task.time}
                    </p>
                  </div>
                </div>
                <span
                  className={`${task.bg} ${task.color} text-[10px] font-bold px-2.5 py-1 rounded-md shrink-0 uppercase tracking-wide`}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Career Insight Banner */}
      <div className="bg-gradient-to-r from-[#6366F1] to-[#A855F7] rounded-xl p-6 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-[var(--bg-surface)] opacity-5 rounded-full blur-3xl" />
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-[var(--bg-surface)] opacity-5 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-[var(--bg-surface)]/15 backdrop-blur-sm p-2 rounded-lg">
              <Sparkles size={18} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              AI Career Insight
            </h3>
          </div>
          <p className="text-white/85 text-sm leading-relaxed max-w-[85%] mb-5">
            Great progress this week! You&apos;ve improved your System Design
            skills by 15% and applied to 3 high-match positions. Based on your
            learning pace, you&apos;re on track to achieve your AWS
            certification goal by August 2026. Consider focusing on Kubernetes
            next to strengthen your DevOps profile.
          </p>
          <button className="bg-[var(--bg-surface)]/15 backdrop-blur-sm text-white border border-white/20 px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[var(--bg-surface)]/25 transition-colors">
            Chat with AI Advisor
          </button>
        </div>
      </div>
    </div>
  );
}
