"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/GlassCard";
import { SpotlightCard } from "@/components/effects/SpotlightCard";
import { useBlockchainStore } from "@/stores/blockchainStore";
import { shortenAddress } from "@/lib/utils";
import {
  Shield,
  Wallet,
  ExternalLink,
  CheckCircle2,
  Award,
  FileCheck,
  Trophy,
  Map,
  Link2,
  Copy,
  Loader2,
} from "lucide-react";

const mockCredentials = [
  {
    id: "1",
    tokenId: 1,
    achievementType: "certification" as const,
    title: "Python Data Science Certification",
    description: "Completed comprehensive Python for Data Science curriculum",
    hash: "0x7f8a...3b2c",
    timestamp: Date.now() - 86400000 * 30,
    issuer: "Career Copilot",
    holder: "0x1234...5678",
    metadataUri: "",
    verified: true,
  },
  {
    id: "2",
    tokenId: 2,
    achievementType: "interview_score" as const,
    title: "Interview Excellence — ML Engineer",
    description: "Scored 92% on ML Engineer interview simulation",
    hash: "0x3c4d...9e1f",
    timestamp: Date.now() - 86400000 * 15,
    issuer: "Career Copilot",
    holder: "0x1234...5678",
    metadataUri: "",
    verified: true,
  },
  {
    id: "3",
    tokenId: 3,
    achievementType: "roadmap_completion" as const,
    title: "Month 1 Roadmap Complete",
    description: "Completed Foundations & Mathematics milestone",
    hash: "0x5e6f...1a2b",
    timestamp: Date.now() - 86400000 * 7,
    issuer: "Career Copilot",
    holder: "0x1234...5678",
    metadataUri: "",
    verified: true,
  },
];

const achievementIcons = {
  certification: FileCheck,
  interview_score: Trophy,
  roadmap_completion: Map,
  career_achievement: Award,
};

const achievementColors = {
  certification: "var(--accent-blue)",
  interview_score: "var(--warning)",
  roadmap_completion: "var(--success)",
  career_achievement: "var(--accent-purple)",
};

export default function CredentialsPage() {
  const { isConnected, address } = useBlockchainStore();
  const [verifyAddress, setVerifyAddress] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareLink = `${typeof window !== "undefined" ? window.location.origin : ""}/verify/${address || "0x..."}`;

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Shield size={20} className="text-[var(--accent-purple)]" />
            Blockchain Credentials
          </h2>
          <p className="text-sm text-[var(--text-muted)]">
            On-chain verified career achievements on Polygon
          </p>
        </div>

        {isConnected && address ? (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-default)]">
            <Wallet size={14} className="text-[var(--accent-purple)]" />
            <span className="text-sm text-white font-mono">
              {shortenAddress(address)}
            </span>
            <span className="w-2 h-2 rounded-full bg-[var(--success)]" />
          </div>
        ) : (
          <button className="btn-ghost text-sm">
            <Wallet size={14} />
            Connect Wallet
          </button>
        )}
      </motion.div>

      {/* Share link */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <GlassCard hover={false} glow="purple">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link2 size={18} className="text-[var(--accent-purple)]" />
              <div>
                <p className="text-sm font-medium text-white">Verification Link</p>
                <p className="text-xs text-[var(--text-muted)]">
                  Share this with recruiters to verify your credentials
                </p>
              </div>
            </div>
            <button
              className="btn-ghost text-sm flex items-center gap-2"
              onClick={copyLink}
            >
              {copied ? (
                <>
                  <CheckCircle2 size={14} className="text-[var(--success)]" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={14} />
                  Copy Link
                </>
              )}
            </button>
          </div>
        </GlassCard>
      </motion.div>

      {/* Credentials grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-sm font-medium text-[var(--text-muted)] mb-3">
          Your Achievements ({mockCredentials.length})
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockCredentials.map((cred, i) => {
            const Icon = achievementIcons[cred.achievementType];
            const color = achievementColors[cred.achievementType];

            return (
              <motion.div
                key={cred.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <SpotlightCard className="p-5 h-full flex flex-col">
                  {/* Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${color}15` }}
                    >
                      <Icon size={24} style={{ color }} />
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--success-muted)]">
                      <CheckCircle2 size={10} className="text-[var(--success)]" />
                      <span className="text-[10px] text-[var(--success)] font-medium">
                        Verified
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <h4 className="text-sm font-semibold text-white mb-1">{cred.title}</h4>
                  <p className="text-xs text-[var(--text-muted)] mb-3 flex-1">
                    {cred.description}
                  </p>

                  {/* Meta */}
                  <div className="space-y-1.5 pt-3 border-t border-[var(--border-default)]">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[var(--text-muted)]">Token ID</span>
                      <span className="text-[10px] text-white font-mono">#{cred.tokenId}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[var(--text-muted)]">Hash</span>
                      <span className="text-[10px] text-white font-mono">{cred.hash}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[var(--text-muted)]">Date</span>
                      <span className="text-[10px] text-white">
                        {new Date(cred.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* View on chain */}
                  <a
                    href="#"
                    className="flex items-center justify-center gap-1.5 mt-3 text-xs text-[var(--accent-purple)] hover:text-[var(--accent-purple-hover)] transition-colors"
                  >
                    View on Polygonscan
                    <ExternalLink size={10} />
                  </a>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Recruiter Verification */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <GlassCard hover={false}>
          <h3 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
            <Shield size={16} className="text-[var(--accent-blue)]" />
            Verify a Candidate
          </h3>
          <p className="text-xs text-[var(--text-muted)] mb-4">
            Enter a wallet address to verify their blockchain-certified credentials
          </p>
          <div className="flex gap-3">
            <input
              id="verify-address-input"
              type="text"
              placeholder="0x..."
              value={verifyAddress}
              onChange={(e) => setVerifyAddress(e.target.value)}
              className="input-dark flex-1 font-mono text-sm"
            />
            <button
              className="btn-primary text-sm"
              disabled={!verifyAddress || isVerifying}
              onClick={async () => {
                setIsVerifying(true);
                await new Promise((r) => setTimeout(r, 1500));
                setIsVerifying(false);
              }}
            >
              {isVerifying ? <Loader2 size={14} className="animate-spin" /> : "Verify"}
            </button>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
