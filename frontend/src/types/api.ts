/* ========================================
   API Types
   ======================================== */

export interface ChatRequest {
  message: string;
  session_id?: string;
  user_id?: string;
}

export interface SessionResponse {
  session_id: string;
  state: Record<string, unknown>;
}

export interface UploadResponse {
  session_id: string;
  parsed: {
    success: boolean;
    text: string;
    filename: string;
  };
  analysis: string;
  state: Record<string, unknown>;
}

export interface GitHubAnalysis {
  success: boolean;
  username: string;
  repos: number;
  languages: Record<string, number>;
  top_repos: Array<{
    name: string;
    stars: number;
    language: string;
    description: string;
  }>;
  contributions: number;
  error?: string;
}

export interface ProfileData {
  user_id: string;
  target_role?: string;
  current_skills?: string[];
  preferred_industry?: string;
  learning_speed?: string;
  experience_level?: string;
}

export interface StreamEvent {
  type: string;
  [key: string]: unknown;
}

export interface HealthResponse {
  status: string;
  app: string;
  version: string;
}
