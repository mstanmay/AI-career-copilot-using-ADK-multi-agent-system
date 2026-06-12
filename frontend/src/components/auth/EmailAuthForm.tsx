"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/lib/validations";
import { useAuthStore } from "@/stores/authStore";
import { Logo } from "@/components/shared/Logo";
import { ArrowLeft, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function EmailAuthForm({ onBack }: { onBack: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const { setUser, setLoading, setError } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      // Simulate auth — in production, call NextAuth signIn
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setUser({
        id: `user-${Date.now()}`,
        email: data.email,
        name: data.email.split("@")[0],
        provider: "email",
        createdAt: new Date().toISOString(),
      });

      router.push("/register");
    } catch {
      setError("Authentication failed. Please try again.");
    }
  };

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
        <h2 className="text-xl font-semibold mt-4 text-[var(--text-primary)]">
          {isRegistering ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          {isRegistering
            ? "Sign up to start your career journey"
            : "Sign in to your Career Copilot"}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label
            htmlFor="email-input"
            className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5"
          >
            Email
          </label>
          <div className="relative">
            <Mail
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            />
            <input
              id="email-input"
              type="email"
              placeholder="you@example.com"
              className="input-dark pl-10 py-2.5"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <motion.p
              className="text-xs text-[var(--error)] mt-1"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {errors.email.message}
            </motion.p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password-input"
            className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5"
          >
            Password
          </label>
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
            />
            <input
              id="password-input"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="input-dark pl-10 pr-10 py-2.5"
              {...register("password")}
            />
            <button
              type="button"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <motion.p
              className="text-xs text-[var(--error)] mt-1"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {errors.password.message}
            </motion.p>
          )}
        </div>

        {/* Submit */}
        <motion.button
          id="auth-submit-btn"
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full py-3 mt-2 disabled:opacity-50"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          {isSubmitting ? (
            <Loader2 size={18} className="animate-spin" />
          ) : isRegistering ? (
            "Create Account"
          ) : (
            "Sign In"
          )}
        </motion.button>
      </form>

      {/* Toggle register/login */}
      <p className="text-sm text-center mt-6 text-[var(--text-muted)]">
        {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          className="text-[var(--accent-blue)] hover:underline"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}
