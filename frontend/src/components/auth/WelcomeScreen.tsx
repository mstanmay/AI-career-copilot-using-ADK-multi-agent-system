"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ParticleField } from "@/components/effects/ParticleField";
import { GlowOrb } from "@/components/effects/GlowOrb";
import { GridBackground } from "@/components/effects/GridBackground";
import { Logo } from "@/components/shared/Logo";
import { EmailAuthForm } from "./EmailAuthForm";
import { GoogleAuthButton } from "./GoogleAuthButton";
import { WalletConnectModal } from "./WalletConnectModal";
import { Mail, Globe, Wallet } from "lucide-react";

type AuthMode = "welcome" | "email" | "wallet";

export function WelcomeScreen() {
  const [mode, setMode] = useState<AuthMode>("welcome");

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "var(--bg-app)" }}>
      <ParticleField particleCount={30} />
      <GlowOrb color="purple" size={500} x="50%" y="50%" />
      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <AnimatePresence mode="wait">
          {mode === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center glass-card p-8 md:p-10"
            >
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="mb-8"
              >
                <Logo size="lg" animated />
              </motion.div>

              {/* Tagline */}
              <motion.p
                className="text-white text-center text-lg mb-2 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Your AI-Powered Career Operating System
              </motion.p>
              <motion.p
                className="text-[var(--text-muted)] text-center text-sm mb-10 max-w-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Analyze resumes, build roadmaps, practice interviews, and earn
                blockchain-verified credentials.
              </motion.p>

              {/* Auth options */}
              <div className="w-full space-y-3">
                {[
                  {
                    icon: Mail,
                    label: "Continue with Email",
                    action: () => setMode("email"),
                    variant: "primary" as const,
                  },
                  {
                    icon: Globe,
                    label: "Continue with Google",
                    action: () => {},
                    variant: "google" as const,
                  },
                  {
                    icon: Wallet,
                    label: "Connect Wallet",
                    action: () => setMode("wallet"),
                    variant: "wallet" as const,
                  },
                ].map((opt, i) => (
                  <motion.button
                    key={opt.label}
                    id={`auth-option-${opt.variant}`}
                    className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 border ${
                      opt.variant === "primary"
                        ? "bg-[var(--accent-blue)] text-white hover:brightness-110 border-transparent"
                        : "bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] border-[var(--border-default)]"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={opt.action}
                  >
                    <opt.icon size={18} />
                    {opt.label}
                  </motion.button>
                ))}

                {/* Google OAuth inline */}
                <div className="hidden">
                  <GoogleAuthButton />
                </div>
              </div>

              {/* Terms */}
              <motion.p
                className="text-xs text-[var(--text-muted)] text-center mt-8 max-w-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                By continuing, you agree to our Terms of Service and Privacy Policy.
              </motion.p>
            </motion.div>
          )}

          {mode === "email" && (
            <motion.div
              key="email"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col glass-card p-8 md:p-10 w-full"
            >
              <EmailAuthForm onBack={() => setMode("welcome")} />
            </motion.div>
          )}

          {mode === "wallet" && (
            <motion.div
              key="wallet"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col glass-card p-8 md:p-10 w-full"
            >
              <WalletConnectModal onBack={() => setMode("welcome")} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
