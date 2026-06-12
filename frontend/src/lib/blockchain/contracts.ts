import { ethers } from "ethers";
import { getProvider, getSigner } from "./provider";

// Contract addresses — set via environment variables after deployment
const CREDENTIALS_ADDRESS = process.env.NEXT_PUBLIC_CREDENTIALS_CONTRACT || "";
const REGISTRY_ADDRESS = process.env.NEXT_PUBLIC_REGISTRY_CONTRACT || "";

// Minimal ABIs for interaction
const CREDENTIALS_ABI = [
  "function mintCredential(address _holder, uint8 _achievementType, bytes32 _dataHash, string _metadataURI) external returns (uint256)",
  "function verifyCredential(uint256 _tokenId) external view returns (bool isValid, tuple(uint256 tokenId, address holder, uint8 achievementType, bytes32 dataHash, string metadataURI, uint256 timestamp, bool revoked) credential)",
  "function getHolderCredentials(address _holder) external view returns (uint256[])",
  "function verifyByHash(bytes32 _dataHash) external view returns (bool)",
  "function totalSupply() external view returns (uint256)",
  "event CredentialMinted(uint256 indexed tokenId, address indexed holder, uint8 achievementType, bytes32 dataHash, uint256 timestamp)",
];

const REGISTRY_ABI = [
  "function getSummary(address _holder) external view returns (tuple(address holder, uint256 totalCredentials, uint256 certifications, uint256 interviewScores, uint256 roadmapCompletions, uint256 careerAchievements, uint256 lastUpdated))",
  "function isRecruiter(address _addr) external view returns (bool)",
];

/**
 * Get CareerCredentials contract instance (read-only)
 */
export function getCredentialsContract() {
  if (!CREDENTIALS_ADDRESS) {
    console.warn("Credentials contract address not set");
    return null;
  }
  const provider = getProvider();
  return new ethers.Contract(CREDENTIALS_ADDRESS, CREDENTIALS_ABI, provider);
}

/**
 * Get CareerCredentials contract with signer (write operations)
 */
export async function getCredentialsContractWithSigner() {
  if (!CREDENTIALS_ADDRESS) return null;
  const signer = await getSigner();
  if (!signer) return null;
  return new ethers.Contract(CREDENTIALS_ADDRESS, CREDENTIALS_ABI, signer);
}

/**
 * Get AchievementRegistry contract instance (read-only)
 */
export function getRegistryContract() {
  if (!REGISTRY_ADDRESS) return null;
  const provider = getProvider();
  return new ethers.Contract(REGISTRY_ADDRESS, REGISTRY_ABI, provider);
}

/**
 * Verify a credential by token ID
 */
export async function verifyCredentialOnChain(tokenId: number) {
  const contract = getCredentialsContract();
  if (!contract) return null;

  try {
    const [isValid, credential] = await contract.verifyCredential(tokenId);
    return { isValid, credential };
  } catch (error) {
    console.error("Verification failed:", error);
    return null;
  }
}

/**
 * Get all credentials for a wallet address
 */
export async function getWalletCredentials(address: string) {
  const contract = getCredentialsContract();
  if (!contract) return [];

  try {
    const tokenIds = await contract.getHolderCredentials(address);
    return tokenIds.map((id: bigint) => Number(id));
  } catch {
    return [];
  }
}

/**
 * Generate data hash for an achievement
 */
export function hashAchievementData(data: Record<string, unknown>): string {
  const encoded = ethers.toUtf8Bytes(JSON.stringify(data));
  return ethers.keccak256(encoded);
}
