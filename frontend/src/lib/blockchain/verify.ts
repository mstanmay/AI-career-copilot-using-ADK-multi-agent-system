import { ethers } from "ethers";
import { generateNonce } from "@/lib/utils";

/**
 * Generate a sign-in message for wallet authentication
 */
export function createSignMessage(nonce: string): string {
  return [
    "Sign this message to authenticate with AI Career Copilot.",
    "",
    `Nonce: ${nonce}`,
    `Timestamp: ${new Date().toISOString()}`,
    "",
    "This signature will not trigger a blockchain transaction.",
  ].join("\n");
}

/**
 * Verify an Ethereum signature
 * @returns The recovered address if valid
 */
export function verifySignature(
  message: string,
  signature: string
): string | null {
  try {
    const recoveredAddress = ethers.verifyMessage(message, signature);
    return recoveredAddress;
  } catch {
    return null;
  }
}

/**
 * Full wallet authentication flow
 * 1. Generate nonce
 * 2. Create sign message
 * 3. Request signature from wallet
 * 4. Verify signature
 * 5. Return authenticated address
 */
export async function authenticateWithWallet(): Promise<{
  address: string;
  signature: string;
  nonce: string;
  message: string;
}> {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("No wallet detected");
  }

  // Connect
  const accounts = (await window.ethereum.request({
    method: "eth_requestAccounts",
  })) as string[];

  if (!accounts?.[0]) throw new Error("No accounts found");

  const address = accounts[0];
  const nonce = generateNonce();
  const message = createSignMessage(nonce);

  // Request signature
  const signature = (await window.ethereum.request({
    method: "personal_sign",
    params: [message, address],
  })) as string;

  // Verify
  const recovered = verifySignature(message, signature);
  if (!recovered || recovered.toLowerCase() !== address.toLowerCase()) {
    throw new Error("Signature verification failed");
  }

  return { address, signature, nonce, message };
}
