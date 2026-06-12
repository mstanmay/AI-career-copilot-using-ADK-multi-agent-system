import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, UserProfile } from "@/types/auth";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  hasCompletedOnboarding: boolean;

  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  completeOnboarding: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      hasCompletedOnboarding: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
          error: null,
        }),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error, isLoading: false }),

      updateProfile: (profile) => {
        const { user } = get();
        if (user) {
          set({
            user: {
              ...user,
              profile: { ...user.profile, ...profile } as UserProfile,
            },
          });
        }
      },

      completeOnboarding: () => {
        const { user } = get();
        if (user) {
          set({
            hasCompletedOnboarding: true,
            user: {
              ...user,
              profile: { ...user.profile, completedOnboarding: true } as UserProfile,
            },
          });
        }
      },

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          hasCompletedOnboarding: false,
          error: null,
        }),
    }),
    {
      name: "career-copilot-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
      }),
    }
  )
);
