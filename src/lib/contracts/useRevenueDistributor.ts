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
        value: amount, // Send the payment amount
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
  
  // Parse the returned data into a more usable format
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

// Hook to wait for revenue distribution transaction
export function useWaitForRevenueDistribution(hash: Address | undefined) {
  const { data, isLoading, error } = useWaitForTransactionReceipt({
    hash,
  })
  
  return {
    receipt: data,
    isLoading,
    error,
  }
}

// Hook to calculate total revenue for an asset (would typically come from The Graph)
export function useAssetRevenue(assetId: bigint | undefined) {
  // This would typically query The Graph for historical revenue events
  // For now, return a mock structure
  
  return {
    totalRevenue: BigInt(0),
    revenueHistory: [],
    isLoading: false,
    error: null,
  }
}

// Types for revenue sharing
export interface RevenueShare {
  recipient: Address
  percentage: bigint
}

export interface RevenueEvent {
  assetId: bigint
  amount: bigint
  timestamp: bigint
  transactionHash: string
}

// Utility function to convert percentage to basis points
export function percentageToBasisPoints(percentage: number): bigint {
  return BigInt(Math.floor(percentage * 100))
}

// Utility function to convert basis points to percentage
export function basisPointsToPercentage(basisPoints: bigint): number {
  return Number(basisPoints) / 100
}

// Hook to estimate gas for revenue distribution
export function useEstimateRevenueDistribution() {
  const chainId = useChainId()
  
  const estimateGas = async (assetId: bigint, amount: bigint) => {
    try {
      // This would use viem's estimateGas function
      // For now, return a reasonable estimate
      return parseEther('0.01') // ~$20-40 depending on gas prices
    } catch (err) {
      console.error('Error estimating gas:', err)
      throw err
    }
  }
  
  return { estimateGas }
}