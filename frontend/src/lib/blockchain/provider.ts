import { ethers } from "ethers";
import { POLYGON_CONFIG, POLYGON_CHAIN_ID } from "@/types/blockchain";

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      on: (event: string, callback: (...args: unknown[]) => void) => void;
      removeListener: (event: string, callback: (...args: unknown[]) => void) => void;
      isMetaMask?: boolean;
    };
  }
}

/**
 * Get ethers provider — browser wallet or fallback to Polygon RPC
 */
export function getProvider(): ethers.BrowserProvider | ethers.JsonRpcProvider {
  if (typeof window !== "undefined" && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum as ethers.Eip1193Provider);
  }
  return new ethers.JsonRpcProvider(POLYGON_CONFIG.rpcUrls[0]);
}

/**
 * Get signer from browser wallet
 */
export async function getSigner(): Promise<ethers.JsonRpcSigner | null> {
  if (typeof window === "undefined" || !window.ethereum) return null;
  const provider = new ethers.BrowserProvider(window.ethereum as ethers.Eip1193Provider);
  return provider.getSigner();
}

/**
 * Request wallet connection
 */
export async function connectWallet(): Promise<string> {
  if (!window.ethereum) {
    throw new Error("No wallet detected. Please install MetaMask.");
  }

  const accounts = (await window.ethereum.request({
    method: "eth_requestAccounts",
  })) as string[];

  if (!accounts || accounts.length === 0) {
    throw new Error("No accounts found");
  }

  return accounts[0];
}

/**
 * Switch to Polygon network
 */
export async function switchToPolygon(): Promise<void> {
  if (!window.ethereum) throw new Error("No wallet detected");

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: POLYGON_CONFIG.chainId }],
    });
  } catch (switchError: unknown) {
    const error = switchError as { code?: number };
    // Chain not added, add it
    if (error.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [POLYGON_CONFIG],
      });
    } else {
      throw switchError;
    }
  }
}

/**
 * Get wallet balance in MATIC
 */
export async function getBalance(address: string): Promise<string> {
  const provider = getProvider();
  const balance = await provider.getBalance(address);
  return ethers.formatEther(balance);
}

/**
 * Get current chain ID
 */
export async function getChainId(): Promise<number> {
  if (!window.ethereum) return 0;
  const chainId = (await window.ethereum.request({
    method: "eth_chainId",
  })) as string;
  return parseInt(chainId, 16);
}

/**
 * Check if connected to Polygon
 */
export async function isOnPolygon(): Promise<boolean> {
  const chainId = await getChainId();
  return chainId === POLYGON_CHAIN_ID;
}
