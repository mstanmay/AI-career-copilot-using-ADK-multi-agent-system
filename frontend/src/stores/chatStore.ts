import { create } from "zustand";
import type { AgentEvent } from "@/types/career";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

interface ChatStore {
  messages: ChatMessage[];
  sessionId: string | null;
  isStreaming: boolean;
  currentStreamText: string;
  agentEvents: AgentEvent[];
  error: string | null;

  addMessage: (role: "user" | "assistant", content: string) => void;
  setSessionId: (id: string) => void;
  setStreaming: (streaming: boolean) => void;
  appendStreamText: (text: string) => void;
  clearStreamText: () => void;
  addAgentEvent: (event: AgentEvent) => void;
  clearAgentEvents: () => void;
  setError: (error: string | null) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  sessionId: null,
  isStreaming: false,
  currentStreamText: "",
  agentEvents: [],
  error: null,

  addMessage: (role, content) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: `msg-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          role,
          content,
          timestamp: Date.now(),
        },
      ],
    })),

  setSessionId: (sessionId) => set({ sessionId }),
  setStreaming: (isStreaming) => set({ isStreaming }),
  appendStreamText: (text) =>
    set((state) => ({ currentStreamText: state.currentStreamText + text })),
  clearStreamText: () => set({ currentStreamText: "" }),

  addAgentEvent: (event) =>
    set((state) => {
      const idx = state.agentEvents.findIndex((e) => e.agent === event.agent);
      if (idx >= 0) {
        const updated = [...state.agentEvents];
        updated[idx] = event;
        return { agentEvents: updated };
      }
      return { agentEvents: [...state.agentEvents, event] };
    }),

  clearAgentEvents: () => set({ agentEvents: [] }),
  setError: (error) => set({ error }),
  clearMessages: () => set({ messages: [], sessionId: null, agentEvents: [] }),
}));
