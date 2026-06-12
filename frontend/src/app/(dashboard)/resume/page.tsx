"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/GlassCard";
import { SpotlightCard } from "@/components/effects/SpotlightCard";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Loader2,
  X,
} from "lucide-react";

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<{
    score: number;
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
    keywords: string[];
  } | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === "application/pdf") {
      setFile(droppedFile);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setIsAnalyzing(true);

    // Simulate analysis — in production, calls api.uploadResume()
    await new Promise((r) => setTimeout(r, 3000));

    setAnalysis({
      score: 72,
      strengths: [
        "Strong technical skills section",
        "Quantified achievements",
        "Clean formatting",
      ],
      weaknesses: [
        "Missing keywords for target role",
        "Summary could be more impactful",
        "No links to portfolio",
      ],
      suggestions: [
        "Add specific ML frameworks (TensorFlow, PyTorch)",
        "Include metrics: 'Improved model accuracy by X%'",
        "Add GitHub and LinkedIn links",
        "Tailor summary to target role",
      ],
      keywords: ["Machine Learning", "Python", "TensorFlow", "Data Pipeline", "SQL"],
    });
    setIsAnalyzing(false);
  };

  return (
    <div className="max-w-5xl space-y-6">
      {/* Upload zone */}
      {!analysis && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div
            className={`glass-card p-12 text-center cursor-pointer transition-all ${
              isDragOver
                ? "border-[var(--accent-blue)] bg-[var(--accent-blue-muted)]"
                : "hover:border-[var(--border-hover)]"
            }`}
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById("resume-file-input")?.click()}
          >
            <input
              id="resume-file-input"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileSelect}
            />
            <Upload
              size={40}
              className={`mx-auto mb-4 ${
                isDragOver ? "text-[var(--accent-blue)]" : "text-[var(--text-muted)]"
              }`}
            />
            <p className="text-sm text-white font-medium">
              {file ? file.name : "Drop your resume here or click to browse"}
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              PDF format, max 10MB
            </p>

            {file && (
              <div className="flex items-center justify-center gap-4 mt-6">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-surface)]">
                  <FileText size={14} className="text-[var(--accent-blue)]" />
                  <span className="text-sm text-white">{file.name}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                    className="text-[var(--text-muted)] hover:text-white"
                  >
                    <X size={14} />
                  </button>
                </div>
                <button
                  className="btn-primary text-sm"
                  onClick={(e) => { e.stopPropagation(); handleAnalyze(); }}
                >
                  {isAnalyzing ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    "Analyze Resume"
                  )}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Analysis results */}
      {analysis && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Score */}
          <GlassCard hover={false}>
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50" cy="50" r="42"
                    fill="none" stroke="var(--bg-surface-hover)" strokeWidth="8"
                  />
                  <motion.circle
                    cx="50" cy="50" r="42"
                    fill="none" stroke="var(--accent-blue)" strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={264}
                    initial={{ strokeDashoffset: 264 }}
                    animate={{ strokeDashoffset: 264 - (264 * analysis.score) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{analysis.score}</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Resume Score</h3>
                <p className="text-sm text-[var(--text-muted)]">
                  {analysis.score >= 80
                    ? "Great resume! Minor improvements needed."
                    : analysis.score >= 60
                    ? "Good foundation. Several areas to improve."
                    : "Needs significant improvements."}
                </p>
              </div>
              <button
                className="btn-ghost text-sm ml-auto"
                onClick={() => { setAnalysis(null); setFile(null); }}
              >
                Upload New
              </button>
            </div>
          </GlassCard>

          {/* Strengths & Weaknesses */}
          <div className="grid md:grid-cols-2 gap-4">
            <SpotlightCard className="p-5">
              <h4 className="text-sm font-medium text-[var(--success)] flex items-center gap-2 mb-3">
                <CheckCircle2 size={16} />
                Strengths
              </h4>
              <ul className="space-y-2">
                {analysis.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-[var(--text-muted)] flex items-start gap-2">
                    <span className="text-[var(--success)] mt-1">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </SpotlightCard>

            <SpotlightCard className="p-5">
              <h4 className="text-sm font-medium text-[var(--warning)] flex items-center gap-2 mb-3">
                <AlertTriangle size={16} />
                Areas to Improve
              </h4>
              <ul className="space-y-2">
                {analysis.weaknesses.map((w, i) => (
                  <li key={i} className="text-sm text-[var(--text-muted)] flex items-start gap-2">
                    <span className="text-[var(--warning)] mt-1">•</span>
                    {w}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </div>

          {/* Suggestions */}
          <GlassCard hover={false}>
            <h4 className="text-sm font-medium text-white flex items-center gap-2 mb-3">
              <TrendingUp size={16} className="text-[var(--accent-blue)]" />
              Actionable Suggestions
            </h4>
            <div className="space-y-2">
              {analysis.suggestions.map((s, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-hover)] transition-colors"
                >
                  <span className="text-xs font-bold text-[var(--accent-blue)] bg-[var(--accent-blue-muted)] w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-sm text-[var(--text-muted)]">{s}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Missing Keywords */}
          <GlassCard hover={false}>
            <h4 className="text-sm font-medium text-white mb-3">
              Missing Keywords
            </h4>
            <div className="flex flex-wrap gap-2">
              {analysis.keywords.map((kw) => (
                <span
                  key={kw}
                  className="px-3 py-1 rounded-full text-xs bg-[var(--accent-purple-muted)] text-[var(--accent-purple)] border border-[rgba(168,85,247,0.2)] cursor-pointer hover:bg-[rgba(168,85,247,0.2)] transition-colors"
                >
                  {kw}
                </span>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
}
