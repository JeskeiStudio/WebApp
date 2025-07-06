import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi';
import type { Address } from 'viem';

// ── Contract ABI stubs (swap in your real TypeChain later) ────────────────
const assetRegistryAbi = [
  {
    name: 'createAsset',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'contentHash', type: 'string' },
      { name: 'metadataURI', type: 'string' },
      { name: 'splits', type: 'tuple[]' },
    ],
  },
  {
    name: 'assets',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'id', type: 'uint256' }],
    outputs: [
      { name: 'contentHash', type: 'string' },
      { name: 'metadataURI', type: 'string' },
    ],
  },
] as const;

// ── Addresses per chain ────────────────────────────────────────────────────
export const CONTRACTS = {
  [11_155_111]: {
    assetRegistry: import.meta.env.VITE_ASSET_REGISTRY_ADDRESS_TESTNET as Address,
  },
} as const;

function addr(chainId: number, key: keyof (typeof CONTRACTS)[11_155_111]) {
  return CONTRACTS[chainId]?.[key];
}

// ── Helpers ────────────────────────────────────────────────────────────────
export const pctToBps = (p: number) => Math.round(p * 100);

// ── Reads ──────────────────────────────────────────────────────────────────
export function useAsset(id?: bigint) {
  const { chainId } = useAccount();
  const enabled = Boolean(chainId && id !== undefined);

  const { data, isFetching } = useReadContract({
    address: enabled ? addr(chainId!, 'assetRegistry') : undefined,
    abi: assetRegistryAbi,
    functionName: 'assets',
    args: id !== undefined ? [id] : undefined,
    query: { enabled },
  });

  const asset = data
    ? {
        contentHash: data[0] as string,
        metadataURI: data[1] as string,
        metadata: undefined as
          | undefined
          | { title?: string; description?: string },
      }
    : undefined;

  return { asset, isLoading: isFetching };
}

// ── Writes ────────────────────────────────────────────────────────────────
export function useCreateAsset() {
  const { chainId } = useAccount();
  const { writeContractAsync, data, isPending, error } = useWriteContract();
  const { isSuccess } = useWaitForTransactionReceipt({ hash: data });

  async function create({
    contentHash,
    metadataURI,
    splits,
  }: {
    contentHash: string;
    metadataURI: string;
    splits: readonly unknown[];
  }) {
    if (!chainId) throw new Error('Wallet not connected');
    return await writeContractAsync({
      abi: assetRegistryAbi,
      address: addr(chainId, 'assetRegistry'),
      functionName: 'createAsset',
      args: [contentHash, metadataURI, splits],
    });
  }

  return {
    createAsset: create,
    hash: data,
    isPending,
    isConfirmed: isSuccess,
    error,
  };
}
