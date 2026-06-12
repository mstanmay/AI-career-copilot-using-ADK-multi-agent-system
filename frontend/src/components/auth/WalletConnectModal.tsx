"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "@/stores/authStore";
import { useBlockchainStore } from "@/stores/blockchainStore";
import { Logo } from "@/components/shared/Logo";
import { generateNonce, shortenAddress } from "@/lib/utils";
import {
  ArrowLeft,
  Wallet,
  ExternalLink,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Shield,
} from "lucide-react";
import { useRouter } from "next/navigation";

type WalletStep = "select" | "connecting" | "signing" | "success" | "error";

export function WalletConnectModal({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<WalletStep>("select");
  const [errorMsg, setErrorMsg] = useState("");
  const { setUser } = useAuthStore();
  const { setConnecting, setConnected, setError, address } = useBlockchainStore();
  const router = useRouter();

  const connectMetaMask = async () => {
    setStep("connecting");
    setConnecting(true);

    try {
      // Check if MetaMask is available
      if (typeof window === "undefined" || !(window as unknown as { ethereum?: { request: (args: { method: string; params?: unknown[] }) => Promise<string[]> } }).ethereum) {
        throw new Error("MetaMask not detected. Please install MetaMask extension.");
      }

      const ethereum = (window as unknown as { ethereum: { request: (args: { method: string; params?: unknown[] }) => Promise<string[]> } }).ethereum;

      // Request accounts
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found");
      }

      const walletAddress = accounts[0];
      setConnected(walletAddress, 137); // Polygon

      // Sign message
      setStep("signing");
      const nonce = generateNonce();
      const message = `Sign this message to authenticate with AI Career Copilot.\n\nNonce: ${nonce}\nTimestamp: ${new Date().toISOString()}`;

      await ethereum.request({
        method: "personal_sign",
        params: [message, walletAddress],
      });

      // Success
      setStep("success");
      setUser({
        id: `wallet-${walletAddress}`,
        walletAddress,
        name: shortenAddress(walletAddress),
        provider: "wallet",
        createdAt: new Date().toISOString(),
      });

      // Redirect after animation
      setTimeout(() => router.push("/register"), 1500);
    } catch (err) {
      setStep("error");
      const message = err instanceof Error ? err.message : "Connection failed";
      setErrorMsg(message);
      setError(message);
    }
  };

  const wallets = [
    {
      id: "metamask",
      name: "MetaMask",
      icon: "🦊",
      description: "Popular browser wallet",
      action: connectMetaMask,
    },
    {
      id: "walletconnect",
      name: "WalletConnect",
      icon: "🔗",
      description: "Scan with mobile wallet",
      action: () => {
        setStep("error");
        setErrorMsg("WalletConnect requires a project ID. Please configure it.");
      },
    },
  ];

  return (
    <div className="w-full">
      {/* Back button */}
      <motion.button
        className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] mb-8 transition-colors"
        onClick={onBack}
        whileHover={{ x: -3 }}
      >
        <ArrowLeft size={16} />
        Back
      </motion.button>

      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <Logo size="default" />
        <h2 className="text-xl font-semibold mt-4 text-white">Connect Wallet</h2>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Authenticate with your Web3 wallet
        </p>
      </div>

      {/* Steps */}
      {step === "select" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-3"
        >
          {wallets.map((wallet) => (
            <motion.button
              key={wallet.id}
              id={`wallet-${wallet.id}-btn`}
              className="w-full glass-card p-4 flex items-center gap-4 text-left hover:border-[rgba(168,85,247,0.3)]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={wallet.action}
            >
              <span className="text-2xl">{wallet.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{wallet.name}</p>
                <p className="text-xs text-[var(--text-muted)]">
                  {wallet.description}
                </p>
              </div>
              <ExternalLink size={14} className="text-[var(--text-muted)]" />
            </motion.button>
          ))}

          {/* Security note */}
          <div className="flex items-start gap-3 mt-6 p-3 rounded-lg bg-[rgba(79,140,255,0.05)] border border-[rgba(79,140,255,0.1)]">
            <Shield size={16} className="text-[var(--accent-blue)] mt-0.5 shrink-0" />
            <p className="text-xs text-[var(--text-muted)]">
              We only verify your wallet signature. No passwords or private keys are
              stored. Your wallet is used solely for identity verification.
            </p>
          </div>
        </motion.div>
      )}

      {step === "connecting" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center py-8"
        >
          <Loader2 size={40} className="text-[var(--accent-purple)] animate-spin mb-4" />
          <p className="text-sm text-white">Connecting to wallet...</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Please approve the connection in your wallet
          </p>
        </motion.div>
      )}

      {step === "signing" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center py-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Wallet size={40} className="text-[var(--accent-purple)]" />
          </motion.div>
          <p className="text-sm text-white mt-4">Signature Request</p>
          <p className="text-xs text-[var(--text-muted)] mt-1 text-center max-w-xs">
            Please sign the authentication message in your wallet to verify your identity
          </p>
          {address && (
            <p className="text-xs text-[var(--accent-blue)] mt-3 font-mono">
              {shortenAddress(address)}
            </p>
          )}
        </motion.div>
      )}

      {step === "success" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center py-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 10 }}
          >
            <CheckCircle2 size={48} className="text-[var(--success)]" />
          </motion.div>
          <p className="text-sm text-white mt-4">Wallet Connected!</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Redirecting to profile setup...
          </p>
        </motion.div>
      )}

      {step === "error" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center py-8"
        >
          <AlertCircle size={48} className="text-[var(--error)] mb-4" />
          <p className="text-sm text-white">Connection Failed</p>
          <p className="text-xs text-[var(--error)] mt-1 text-center max-w-xs">
            {errorMsg}
          </p>
          <button
            className="btn-ghost mt-4 text-sm"
            onClick={() => setStep("select")}
          >
            Try Again
          </button>
        </motion.div>
      )}
    </div>
  );
}
