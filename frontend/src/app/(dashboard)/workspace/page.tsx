"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChatStore } from "@/stores/chatStore";
import { api } from "@/lib/api";
import { GlassCard } from "@/components/shared/GlassCard";
import { RightActivitySidebar } from "@/components/workspace/RightActivitySidebar";
import { AgentFlowGraph } from "@/components/workspace/AgentFlowGraph";
import {
  Send,
  Bot,
  User,
  Loader2,
  Upload,
  Sparkles,
  Activity,
} from "lucide-react";

export default function WorkspacePage() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    messages,
    isStreaming,
    currentStreamText,
    agentEvents,
    addMessage,
    setStreaming,
    appendStreamText,
    clearStreamText,
    setSessionId,
    sessionId,
    addAgentEvent,
    clearAgentEvents,
  } = useChatStore();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentStreamText]);

  const handleSend = async () => {
    if (!input.trim() || isStreaming) return;

    const message = input.trim();
    setInput("");
    addMessage("user", message);
    setStreaming(true);
    clearStreamText();
    clearAgentEvents();

    try {
      for await (const event of api.chat({
        message,
        session_id: sessionId || undefined,
      })) {
        if (event.type === "session") {
          setSessionId(event.session_id as string);
        } else if (event.type === "agent_event") {
          addAgentEvent(event as never);
        } else if (event.type === "chunk") {
          appendStreamText(event.text as string);
        } else if (event.type === "final") {
          addMessage("assistant", event.text as string);
          clearStreamText();
        }
      }
    } catch {
      addMessage("assistant", "Sorry, I encountered an error. Please try again.");
    } finally {
      setStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-4 h-[calc(100vh-var(--topbar-height)-48px)] max-h-[calc(100vh-112px)]">
      {/* Main chat area */}
      <div className="flex-1 flex flex-col glass-card overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && !isStreaming && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center mb-4 mx-auto">
                  <Sparkles size={28} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">AI Career Workspace</h3>
                <p className="text-sm text-[var(--text-muted)] mt-2 max-w-md">
                  Tell me your career goal, and I&apos;ll coordinate 7 AI agents to build
                  your personalized career plan.
                </p>
              </motion.div>

              <div className="w-full max-w-2xl mx-auto mb-6">
                <AgentFlowGraph />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-2xl w-full">
                {[
                  "I want to become a Data Scientist",
                  "Analyze my resume for ML Engineer",
                  "Build me a 6-month learning roadmap",
                  "Prepare me for system design interviews",
                ].map((prompt) => (
                  <button
                    key={prompt}
                    className="text-left text-sm px-4 py-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-muted)] hover:border-[var(--border-hover)] hover:text-white transition-all"
                    onClick={() => {
                      setInput(prompt);
                    }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center shrink-0">
                  <Bot size={16} className="text-white" />
                </div>
              )}
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[var(--accent-blue)] text-white rounded-br-md"
                    : "bg-[var(--bg-surface)] text-[var(--text-muted)] rounded-bl-md"
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-lg bg-[var(--bg-surface-hover)] flex items-center justify-center shrink-0">
                  <User size={16} className="text-[var(--text-muted)]" />
                </div>
              )}
            </motion.div>
          ))}

          {/* Streaming text */}
          {isStreaming && currentStreamText && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center shrink-0">
                <Bot size={16} className="text-white" />
              </div>
              <div className="max-w-[75%] px-4 py-3 rounded-2xl rounded-bl-md bg-[var(--bg-surface)] text-sm text-[var(--text-muted)] leading-relaxed whitespace-pre-wrap">
                {currentStreamText}
                <span className="inline-block w-1.5 h-4 bg-[var(--accent-blue)] ml-0.5 animate-pulse" />
              </div>
            </motion.div>
          )}

          {isStreaming && !currentStreamText && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center shrink-0">
                <Bot size={16} className="text-white" />
              </div>
              <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-[var(--bg-surface)]">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-[var(--accent-blue)]"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-[var(--border-default)]">
          <div className="flex items-end gap-3">
            <button className="p-2.5 rounded-lg hover:bg-[var(--bg-surface-hover)] text-[var(--text-muted)] transition-colors">
              <Upload size={18} />
            </button>
            <div className="flex-1 relative">
              <textarea
                id="workspace-chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your career goal..."
                rows={1}
                className="input-dark resize-none pr-12 min-h-[42px] max-h-[120px]"
                style={{ lineHeight: "1.5" }}
              />
            </div>
            <motion.button
              id="workspace-send-btn"
              className="btn-primary p-2.5"
              onClick={handleSend}
              disabled={!input.trim() || isStreaming}
              whileTap={{ scale: 0.95 }}
            >
              {isStreaming ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Right Activity Panel */}
      <RightActivitySidebar />
    </div>
  );
}
