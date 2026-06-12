"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/shared/GlassCard";
import {
  Mic,
  Send,
  RotateCcw,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Loader2,
  MessageSquare,
} from "lucide-react";

const difficulties = ["Easy", "Medium", "Hard"];

export default function InterviewPage() {
  const [difficulty, setDifficulty] = useState("Medium");
  const [question, setQuestion] = useState<string | null>(null);
  const [answer, setAnswer] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<{
    score: number;
    feedback: string;
    model_answer: string;
    strengths: string[];
    improvements: string[];
  } | null>(null);

  const generateQuestion = async () => {
    setIsGenerating(true);
    setQuestion(null);
    setEvaluation(null);
    setAnswer("");

    // Simulate — calls api.getInterviewQuestion() in production
    await new Promise((r) => setTimeout(r, 1500));
    setQuestion(
      "Explain the bias-variance tradeoff in machine learning. How would you diagnose and address high bias vs high variance in a model?"
    );
    setIsGenerating(false);
  };

  const evaluateAnswer = async () => {
    if (!answer.trim()) return;
    setIsEvaluating(true);

    // Simulate — calls api.evaluateAnswer() in production
    await new Promise((r) => setTimeout(r, 2000));
    setEvaluation({
      score: 78,
      feedback:
        "Good conceptual understanding. Could improve by providing concrete examples and mentioning specific techniques for addressing each case.",
      model_answer:
        "The bias-variance tradeoff is a fundamental concept. Bias refers to errors from overly simplistic assumptions — leading to underfitting. Variance refers to sensitivity to training data fluctuations — leading to overfitting. To diagnose: high bias shows similar train/test errors (both high), while high variance shows low train error but high test error. Solutions: For high bias — increase model complexity, add features, reduce regularization. For high variance — add more data, increase regularization, use ensemble methods, feature selection.",
      strengths: [
        "Correctly defined bias and variance",
        "Mentioned the relationship to underfitting/overfitting",
      ],
      improvements: [
        "Add concrete examples (e.g., linear regression vs deep neural net)",
        "Mention specific techniques like cross-validation for diagnosis",
        "Discuss ensemble methods as a solution",
      ],
    });
    setIsEvaluating(false);
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Controls */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h2 className="text-lg font-semibold text-white">Interview Simulator</h2>
          <p className="text-sm text-[var(--text-muted)]">
            Practice with AI-generated questions
          </p>
        </div>
        <div className="flex items-center gap-2">
          {difficulties.map((d) => (
            <button
              key={d}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                difficulty === d
                  ? "bg-[var(--accent-blue)] text-white"
                  : "bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-white"
              }`}
              onClick={() => setDifficulty(d)}
            >
              {d}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Generate button */}
      {!question && !isGenerating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center mx-auto mb-6">
            <Mic size={28} className="text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Ready to Practice?</h3>
          <p className="text-sm text-[var(--text-muted)] mb-6 max-w-md mx-auto">
            Generate an interview question based on your target role and practice your response
          </p>
          <motion.button
            className="btn-gradient py-3 px-6"
            onClick={generateQuestion}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Sparkles size={16} />
            Generate Question
          </motion.button>
        </motion.div>
      )}

      {/* Loading */}
      {isGenerating && (
        <GlassCard hover={false} className="text-center py-12">
          <Loader2 size={32} className="text-[var(--accent-blue)] animate-spin mx-auto mb-4" />
          <p className="text-sm text-white">Generating {difficulty.toLowerCase()} question...</p>
        </GlassCard>
      )}

      {/* Question & Answer */}
      {question && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Question */}
          <GlassCard hover={false} glow="blue">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent-blue-muted)] flex items-center justify-center shrink-0 mt-0.5">
                <MessageSquare size={16} className="text-[var(--accent-blue)]" />
              </div>
              <div>
                <p className="text-xs text-[var(--accent-blue)] font-medium mb-1">
                  {difficulty} Question
                </p>
                <p className="text-sm text-white leading-relaxed">{question}</p>
              </div>
            </div>
          </GlassCard>

          {/* Answer input */}
          {!evaluation && (
            <GlassCard hover={false}>
              <textarea
                id="interview-answer-input"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                rows={6}
                className="input-dark resize-none mb-4"
              />
              <div className="flex items-center justify-between">
                <button
                  className="btn-ghost text-sm"
                  onClick={() => {
                    setQuestion(null);
                    setAnswer("");
                  }}
                >
                  <RotateCcw size={14} />
                  New Question
                </button>
                <motion.button
                  id="interview-submit-btn"
                  className="btn-primary text-sm"
                  onClick={evaluateAnswer}
                  disabled={!answer.trim() || isEvaluating}
                  whileTap={{ scale: 0.97 }}
                >
                  {isEvaluating ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <>
                      <Send size={14} />
                      Submit Answer
                    </>
                  )}
                </motion.button>
              </div>
            </GlassCard>
          )}

          {/* Evaluation */}
          <AnimatePresence>
            {evaluation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Score */}
                <GlassCard hover={false}>
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16">
                      <svg className="w-16 h-16 -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="var(--bg-surface-hover)" strokeWidth="8" />
                        <motion.circle
                          cx="50" cy="50" r="42" fill="none"
                          stroke={evaluation.score >= 80 ? "var(--success)" : evaluation.score >= 60 ? "var(--warning)" : "var(--error)"}
                          strokeWidth="8" strokeLinecap="round"
                          strokeDasharray={264}
                          initial={{ strokeDashoffset: 264 }}
                          animate={{ strokeDashoffset: 264 - (264 * evaluation.score) / 100 }}
                          transition={{ duration: 1 }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-white">{evaluation.score}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Your Score</p>
                      <p className="text-xs text-[var(--text-muted)]">{evaluation.feedback}</p>
                    </div>
                  </div>
                </GlassCard>

                {/* Strengths & Improvements */}
                <div className="grid md:grid-cols-2 gap-4">
                  <GlassCard hover={false}>
                    <h4 className="text-sm font-medium text-[var(--success)] flex items-center gap-2 mb-3">
                      <CheckCircle2 size={14} /> What You Did Well
                    </h4>
                    <ul className="space-y-1.5">
                      {evaluation.strengths.map((s, i) => (
                        <li key={i} className="text-xs text-[var(--text-muted)] flex items-start gap-2">
                          <ChevronRight size={12} className="text-[var(--success)] mt-0.5 shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>

                  <GlassCard hover={false}>
                    <h4 className="text-sm font-medium text-[var(--warning)] flex items-center gap-2 mb-3">
                      <AlertCircle size={14} /> Areas to Improve
                    </h4>
                    <ul className="space-y-1.5">
                      {evaluation.improvements.map((s, i) => (
                        <li key={i} className="text-xs text-[var(--text-muted)] flex items-start gap-2">
                          <ChevronRight size={12} className="text-[var(--warning)] mt-0.5 shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </div>

                {/* Model answer */}
                <GlassCard hover={false}>
                  <h4 className="text-sm font-medium text-[var(--accent-purple)] flex items-center gap-2 mb-3">
                    <Sparkles size={14} /> Model Answer
                  </h4>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {evaluation.model_answer}
                  </p>
                </GlassCard>

                {/* Next */}
                <div className="text-center">
                  <motion.button
                    className="btn-primary text-sm"
                    onClick={() => {
                      setQuestion(null);
                      setAnswer("");
                      setEvaluation(null);
                      generateQuestion();
                    }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <RotateCcw size={14} />
                    Practice Another
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
