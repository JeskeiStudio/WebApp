// src/hooks/contracts/useAssetRegistry.ts
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useChainId } from 'wagmi'
import { getContractAddress } from '../../lib/contracts/addresses'
import { ASSET_REGISTRY_ABI } from '../../lib/contracts/abis'
import type { Address } from 'viem'

// Hook to create a new asset NFT
export function useCreateAsset() {
  const chainId = useChainId()
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  
  const createAsset = async (contentHash: string, metadataURI: string, revenueShare: bigint) => {
    try {
      const contractAddress = getContractAddress(chainId, 'ASSET_REGISTRY')
      
      writeContract({
        address: contractAddress,
        abi: ASSET_REGISTRY_ABI,
        functionName: 'createAsset',
        args: [contentHash, metadataURI, revenueShare],
      })
    } catch (err) {
      console.error('Error creating asset:', err)
      throw err
    }
  }
  
  return {
    createAsset,
    hash,
    isPending,
    error,
  }
}

// Hook to get asset details
export function useAsset(tokenId: bigint | undefined) {
  const chainId = useChainId()
  
  const { data, isLoading, error, refetch } = useReadContract({
    address: getContractAddress(chainId, 'ASSET_REGISTRY'),
    abi: ASSET_REGISTRY_ABI,
    functionName: 'getAsset',
    args: tokenId ? [tokenId] : undefined,
    query: {
      enabled: !!tokenId,
    },
  })
  
  return {
    asset: data,
    isLoading,
    error,
    refetch,
  }
}

// Hook to wait for asset creation transaction
export function useWaitForAssetCreation(hash: Address | undefined) {
  const { data, isLoading, error } = useWaitForTransactionReceipt({
    hash,
  })
  
  return {
    receipt: data,
    isLoading,
    error,
  }
}

// Types for the asset structure
export interface MediaAsset {
  creator: Address
  contentHash: string
  metadataURI: string
  revenueShare: bigint
  isVerified: boolean
  creationTime: bigint
}
