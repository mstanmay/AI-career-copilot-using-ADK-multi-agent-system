/* ========================================
   Blockchain Types
   ======================================== */

export interface WalletState {
  address: string | null;
  chainId: number | null;
  isConnected: boolean;
  isConnecting: boolean;
  balance: string | null;
  error: string | null;
}

export interface CareerCredential {
  id: string;
  tokenId: number;
  achievementType: "certification" | "interview_score" | "roadmap_completion" | "career_achievement";
  title: string;
  description: string;
  hash: string;
  timestamp: number;
  issuer: string;
  holder: string;
  metadataUri: string;
  verified: boolean;
}

export interface CredentialVerification {
  isValid: boolean;
  credential: CareerCredential | null;
  holderAddress: string;
  verifiedAt: string;
  txHash: string;
}

export interface MintRequest {
  achievementType: CareerCredential["achievementType"];
  title: string;
  description: string;
  data: Record<string, unknown>;
}

export const POLYGON_CHAIN_ID = 137;
export const POLYGON_MUMBAI_CHAIN_ID = 80001;

export const POLYGON_CONFIG = {
  chainId: `0x${POLYGON_CHAIN_ID.toString(16)}`,
  chainName: "Polygon Mainnet",
  nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
  rpcUrls: ["https://polygon-rpc.com/"],
  blockExplorerUrls: ["https://polygonscan.com/"],
};
