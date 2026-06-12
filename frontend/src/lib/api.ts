import type { ChatRequest, StreamEvent, UploadResponse, GitHubAnalysis, ProfileData } from "@/types/api";
import type { AgentInfo, InterviewQuestion, InterviewEvaluation, JobMatch } from "@/types/career";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async fetch<T>(path: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      headers: { "Content-Type": "application/json", ...options?.headers },
      ...options,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: res.statusText }));
      throw new Error(err.detail || `API Error: ${res.status}`);
    }
    return res.json();
  }

  // Health
  async health() {
    return this.fetch<{ status: string; app: string; version: string }>("/health");
  }

  // Chat — SSE streaming
  async *chat(request: ChatRequest): AsyncGenerator<StreamEvent> {
    const res = await fetch(`${this.baseUrl}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    if (!res.ok) throw new Error(`Chat failed: ${res.status}`);
    if (!res.body) throw new Error("No response body");

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          try {
            const data = JSON.parse(line.slice(6));
            yield data as StreamEvent;
          } catch {
            // skip malformed lines
          }
        }
      }
    }
  }

  // Resume upload
  async uploadResume(
    file: File,
    targetRole: string = "Data Scientist",
    sessionId?: string,
    userId: string = "default_user"
  ): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append("file", file);
    const params = new URLSearchParams({
      target_role: targetRole,
      user_id: userId,
      ...(sessionId && { session_id: sessionId }),
    });

    const res = await fetch(`${this.baseUrl}/resume/upload?${params}`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Resume upload failed");
    return res.json();
  }

  // GitHub analysis
  async analyzeGitHub(username: string, sessionId?: string): Promise<GitHubAnalysis> {
    return this.fetch("/github/analyze", {
      method: "POST",
      body: JSON.stringify({ username, session_id: sessionId }),
    });
  }

  // Interview
  async getInterviewQuestion(
    targetRole: string = "Data Scientist",
    difficulty: string = "medium"
  ): Promise<InterviewQuestion> {
    return this.fetch("/interview/question", {
      method: "POST",
      body: JSON.stringify({ target_role: targetRole, difficulty }),
    });
  }

  async evaluateAnswer(
    question: string,
    answer: string,
    targetRole: string = "Data Scientist"
  ): Promise<InterviewEvaluation> {
    return this.fetch("/interview/evaluate", {
      method: "POST",
      body: JSON.stringify({ question, answer, target_role: targetRole }),
    });
  }

  // Jobs
  async searchJobs(targetRole: string, skills: string[] = []): Promise<JobMatch[]> {
    return this.fetch("/jobs/search", {
      method: "POST",
      body: JSON.stringify({ target_role: targetRole, skills }),
    });
  }

  // Profile
  async getProfile(userId: string): Promise<{ profile: ProfileData }> {
    return this.fetch(`/profile/${userId}`);
  }

  async updateProfile(profile: ProfileData): Promise<{ profile: ProfileData }> {
    return this.fetch("/profile", {
      method: "POST",
      body: JSON.stringify(profile),
    });
  }

  // Agents
  async getAgentStatus(): Promise<{ agents: AgentInfo[] }> {
    return this.fetch("/agents/status");
  }

  // Session
  async getSession(sessionId: string, userId: string = "default_user") {
    return this.fetch(`/session/${sessionId}?user_id=${userId}`);
  }

  // Observability
  async getDashboard() {
    return this.fetch("/observability/dashboard");
  }
}

export const api = new ApiClient(API_URL);
