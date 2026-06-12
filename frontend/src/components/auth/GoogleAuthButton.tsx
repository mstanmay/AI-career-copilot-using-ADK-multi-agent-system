"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Loader2 } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";

export function GoogleAuthButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuthStore();
  const router = useRouter();

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      // In production, this would call signIn("google") from next-auth
      // For now, simulate OAuth flow
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setUser({
        id: `google-${Date.now()}`,
        email: "user@gmail.com",
        name: "Google User",
        image: "",
        provider: "google",
        createdAt: new Date().toISOString(),
      });

      router.push("/register");
    } catch {
      console.error("Google auth failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.button
      id="google-auth-btn"
      className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl font-medium text-sm glass-card text-white hover:border-[rgba(255,255,255,0.12)] transition-all duration-200"
      onClick={handleGoogleAuth}
      disabled={isLoading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {isLoading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <>
          <Globe size={18} />
          Continue with Google
        </>
      )}
    </motion.button>
  );
}
