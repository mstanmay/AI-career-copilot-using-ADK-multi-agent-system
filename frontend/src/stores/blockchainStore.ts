import { create } from "zustand";
import type { WalletState, CareerCredential } from "@/types/blockchain";

interface BlockchainStore extends WalletState {
  credentials: CareerCredential[];
  isPendingTx: boolean;
  txHash: string | null;

  setConnecting: (connecting: boolean) => void;
  setConnected: (address: string, chainId: number) => void;
  setDisconnected: () => void;
  setBalance: (balance: string) => void;
  setError: (error: string | null) => void;
  setCredentials: (credentials: CareerCredential[]) => void;
  addCredential: (credential: CareerCredential) => void;
  setPendingTx: (pending: boolean, hash?: string) => void;
}

export const useBlockchainStore = create<BlockchainStore>((set) => ({
  address: null,
  chainId: null,
  isConnected: false,
  isConnecting: false,
  balance: null,
  error: null,
  credentials: [],
  isPendingTx: false,
  txHash: null,

  setConnecting: (isConnecting) => set({ isConnecting, error: null }),

  setConnected: (address, chainId) =>
    set({
      address,
      chainId,
      isConnected: true,
      isConnecting: false,
      error: null,
    }),

  setDisconnected: () =>
    set({
      address: null,
      chainId: null,
      isConnected: false,
      isConnecting: false,
      balance: null,
    }),

  setBalance: (balance) => set({ balance }),
  setError: (error) => set({ error, isConnecting: false }),
  setCredentials: (credentials) => set({ credentials }),
  addCredential: (credential) =>
    set((state) => ({ credentials: [...state.credentials, credential] })),
  setPendingTx: (isPendingTx, txHash) =>
    set({ isPendingTx, txHash: txHash || null }),
}));
