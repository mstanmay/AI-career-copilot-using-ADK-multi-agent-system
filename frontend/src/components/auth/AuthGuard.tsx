"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { LoadingState } from "@/components/shared/LoadingState";

export function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  // Read auth state
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    // Check if store is already hydrated
    if (useAuthStore.persist.hasHydrated()) {
      setIsHydrated(true);
    }
    // Listen for hydration completion
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    console.log("AuthGuard logic check:", { isHydrated, isAuthenticated });
    if (isHydrated && !isAuthenticated) {
      console.log("Redirecting to /login...");
      router.replace("/login");
    }
  }, [isHydrated, isAuthenticated, router]);

  if (!isHydrated) {
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
