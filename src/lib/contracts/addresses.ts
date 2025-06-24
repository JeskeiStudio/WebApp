// src/lib/contracts/addresses.ts
import type { Address } from 'viem'

export const CONTRACT_ADDRESSES = {
  137: { // Polygon
    ASSET_REGISTRY: (import.meta.env.VITE_ASSET_REGISTRY_ADDRESS || '') as Address,
    REVENUE_DISTRIBUTOR: (import.meta.env.VITE_REVENUE_DISTRIBUTOR_ADDRESS || '') as Address,
    DAO_GOVERNANCE: (import.meta.env.VITE_DAO_GOVERNANCE_ADDRESS || '') as Address,
    HOSTING_MANAGER: (import.meta.env.VITE_HOSTING_MANAGER_ADDRESS || '') as Address,
  },
  42161: { // Arbitrum
    ASSET_REGISTRY: (import.meta.env.VITE_ASSET_REGISTRY_ADDRESS_ARBITRUM || '') as Address,
    REVENUE_DISTRIBUTOR: (import.meta.env.VITE_REVENUE_DISTRIBUTOR_ADDRESS_ARBITRUM || '') as Address,
    DAO_GOVERNANCE: (import.meta.env.VITE_DAO_GOVERNANCE_ADDRESS_ARBITRUM || '') as Address,
    HOSTING_MANAGER: (import.meta.env.VITE_HOSTING_MANAGER_ADDRESS_ARBITRUM || '') as Address,
  },
  11155111: { // Sepolia
    ASSET_REGISTRY: (import.meta.env.VITE_ASSET_REGISTRY_ADDRESS_TESTNET || '') as Address,
    REVENUE_DISTRIBUTOR: (import.meta.env.VITE_REVENUE_DISTRIBUTOR_ADDRESS_TESTNET || '') as Address,
    DAO_GOVERNANCE: (import.meta.env.VITE_DAO_GOVERNANCE_ADDRESS_TESTNET || '') as Address,
    HOSTING_MANAGER: (import.meta.env.VITE_HOSTING_MANAGER_ADDRESS_TESTNET || '') as Address,
  },
} as const

export type SupportedChainId = keyof typeof CONTRACT_ADDRESSES
export type ContractName = keyof typeof CONTRACT_ADDRESSES[SupportedChainId]

export function getContractAddress(chainId: number, contractName: ContractName): Address {
  const addresses = CONTRACT_ADDRESSES[chainId as SupportedChainId]
  
  if (!addresses) {
    throw new Error(`Unsupported chain ID: ${chainId}`)
  }
  
  const address = addresses[contractName]
  
  if (!address) {
    throw new Error(`Contract ${contractName} not deployed on chain ${chainId}`)
  }
  
  return address
}

export function isSupportedChain(chainId: number): chainId is SupportedChainId {
  return chainId in CONTRACT_ADDRESSES
}

export function getChainContracts(chainId: number) {
  if (!isSupportedChain(chainId)) {
    throw new Error(`Unsupported chain ID: ${chainId}`)
  }
  
  return CONTRACT_ADDRESSES[chainId]
}
