/* ========================================
   Auth Types
   ======================================== */

export interface User {
  id: string;
  email?: string;
  name?: string;
  image?: string;
  walletAddress?: string;
  provider: "email" | "google" | "wallet";
  profile?: UserProfile;
  createdAt: string;
}

export interface UserProfile {
  targetRole: string;
  experienceLevel: "junior" | "mid" | "senior" | "lead";
  skills: string[];
  preferredIndustry?: string;
  learningSpeed?: "relaxed" | "moderate" | "intensive";
  completedOnboarding: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface WalletAuthPayload {
  address: string;
  signature: string;
  nonce: string;
  message: string;
}
