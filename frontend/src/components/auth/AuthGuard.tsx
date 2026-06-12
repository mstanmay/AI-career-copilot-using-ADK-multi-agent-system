"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { LoadingState } from "@/components/shared/LoadingState";

export function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();
  const [hasHydrated, setHasHydrated] = useState(false);

  // Wait for Zustand persist to actually finish rehydrating from localStorage
  useEffect(() => {
    // Check if already hydrated (persist may have finished synchronously)
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      setHasHydrated(true);
    });

    // If persist has already rehydrated before this effect ran
    if (useAuthStore.persist.hasHydrated()) {
      setHasHydrated(true);
    }

    // Timeout fallback — never get stuck for more than 2 seconds
    const timeout = setTimeout(() => {
      setHasHydrated(true);
    }, 2000);

    return () => {
      unsub();
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (hasHydrated && !isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, hasHydrated, router]);

  if (!hasHydrated || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-app)" }}>
        <LoadingState text="Verifying session..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
