"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, X, Waves } from "lucide-react";
import { GlassCard } from "@/components/shared/GlassCard";

export function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const toggleListen = () => {
    setIsListening(!isListening);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center shadow-lg shadow-[var(--accent-blue-muted)] z-40 text-white"
        style={{ boxShadow: "0 8px 32px rgba(79, 140, 255, 0.3)" }}
      >
        <Mic size={24} />
      </motion.button>

      {/* Voice Interface Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-8 w-80 z-50"
          >
            <GlassCard className="p-6 relative overflow-hidden">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsListening(false);
                }}
                className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-white transition-colors"
              >
                <X size={18} />
              </button>

              <div className="text-center mt-2 mb-6">
                <h3 className="text-lg font-semibold text-white">Career Copilot Voice</h3>
                <p className="text-sm text-[var(--text-secondary)] mt-1">
                  {isListening ? "Listening..." : "Tap the mic to speak"}
                </p>
              </div>

              <div className="flex justify-center mb-8 relative">
                {/* Listening Pulse Animation */}
                {isListening && (
                  <>
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 bg-[var(--accent-blue)] rounded-full blur-xl"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0.2, 0.8] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 bg-[var(--accent-purple)] rounded-full blur-md"
                    />
                  </>
                )}

                <button
                  onClick={toggleListen}
                  className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isListening
                      ? "bg-[var(--bg-surface)] border-2 border-[var(--accent-blue)] text-[var(--accent-blue)]"
                      : "bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] text-white"
                  }`}
                  style={
                    isListening
                      ? { boxShadow: "0 0 40px rgba(79, 140, 255, 0.4)" }
                      : { boxShadow: "0 8px 32px rgba(79, 140, 255, 0.3)" }
                  }
                >
                  {isListening ? <Waves size={32} className="animate-pulse" /> : <Mic size={32} />}
                </button>
              </div>

              {/* Decorative Audio Waves when listening */}
              {isListening && (
                <div className="flex justify-center items-end gap-1 h-8 mb-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 bg-gradient-to-t from-[var(--accent-purple)] to-[var(--accent-blue)] rounded-t-full"
                      animate={{ height: ["20%", "100%", "20%"] }}
                      transition={{
                        duration: 0.5 + Math.random() * 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
              )}
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
