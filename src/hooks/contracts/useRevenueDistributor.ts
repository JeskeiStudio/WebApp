// src/hooks/contracts/useRevenueDistributor.ts
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useChainId } from 'wagmi'
import { getContractAddress } from '../../lib/contracts/addresses'
import { REVENUE_DISTRIBUTOR_ABI } from '../../lib/contracts/abis'
import type { Address } from 'viem'
import { parseEther } from 'viem'

// Hook to distribute revenue for an asset
export function useDistributeRevenue() {
  const chainId = useChainId()
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  
  const distributeRevenue = async (assetId: bigint, amount: bigint) => {
    try {
      const contractAddress = getContractAddress(chainId, 'REVENUE_DISTRIBUTOR')
      
      writeContract({
        address: contractAddress,
        abi: REVENUE_DISTRIBUTOR_ABI,
        functionName: 'distributeRevenue',
        args: [assetId, amount],
        value: amount,
      })
    } catch (err) {
      console.error('Error distributing revenue:', err)
      throw err
    }
  }
  
  return {
    distributeRevenue,
    hash,
    isPending,
    error,
  }
}

// Hook to get revenue sharing configuration for an asset
export function useRevenueShares(assetId: bigint | undefined) {
  const chainId = useChainId()
  
  const { data, isLoading, error, refetch } = useReadContract({
    address: getContractAddress(chainId, 'REVENUE_DISTRIBUTOR'),
    abi: REVENUE_DISTRIBUTOR_ABI,
    functionName: 'getRevenueShares',
    args: assetId ? [assetId] : undefined,
    query: {
      enabled: !!assetId,
    },
  })
  
  const revenueShares = data ? {
    recipients: data[0] as Address[],
    percentages: data[1] as bigint[],
  } : undefined
  
  return {
    revenueShares,
    isLoading,
    error,
    refetch,
  }
}

// Utility function to convert percentage to basis points
export function percentageToBasisPoints(percentage: number): bigint {
  return BigInt(Math.floor(percentage * 100))
}
