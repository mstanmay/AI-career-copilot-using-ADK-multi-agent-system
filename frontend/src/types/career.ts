/* ========================================
   Career Types — mirrors shared/schemas/career-types.json
   ======================================== */

export type AgentStatus = "pending" | "working" | "completed" | "error";

export interface AgentEvent {
  type: "agent_event";
  agent: string;
  status: AgentStatus;
  task?: string;
  progress: number;
  trace_id?: string;
  tokens_used?: number;
  duration_ms?: number;
  error?: string;
}

export interface TimelineEvent {
  type: "timeline";
  agent: string;
  status: string;
  time: string;
  trace_id: string;
}

export interface ResumeAnalysis {
  score: number;
  strengths: string[];
  weaknesses: string[];
  missing_keywords: string[];
  suggestions: string[];
  extracted_skills: string[];
  years_experience: number;
  target_role: string;
}

export interface SkillData {
  name: string;
  current: number;
  required: number;
  gap: number;
  priority: "high" | "medium" | "low";
}

export interface SkillGapAnalysis {
  target_role: string;
  skills: SkillData[];
  overall_readiness: number;
  top_gaps: string[];
}

export interface RoadmapMonth {
  month: number;
  title: string;
  skills: string[];
  resources: string[];
  milestones: string[];
}

export interface CareerRoadmap {
  target_role: string;
  duration_months: number;
  months: RoadmapMonth[];
}

export interface JobMatch {
  title: string;
  company: string;
  match_percent: number;
  required_skills: string[];
  matched_skills: string[];
  missing_skills: string[];
  location: string;
  apply_url: string;
}

export interface InterviewQuestion {
  question: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  hints?: string[];
}

export interface InterviewEvaluation {
  score: number;
  feedback: string;
  model_answer: string;
  strengths: string[];
  improvements: string[];
}

export interface AgentInfo {
  id: string;
  name: string;
  status: "online" | "offline" | "working";
  task: string;
  progress: number;
}
