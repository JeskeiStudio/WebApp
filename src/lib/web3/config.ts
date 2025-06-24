// src/lib/web3/config.ts
import { http, createConfig } from 'wagmi'
import { mainnet, polygon, arbitrum, sepolia, polygonMumbai } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'

// Get WalletConnect project ID from environment
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID

if (!projectId) {
  console.warn('VITE_WALLETCONNECT_PROJECT_ID is not set')
}

// Define supported chains
export const supportedChains = [
  mainnet,
  polygon,
  arbitrum,
  // Test networks
  ...(import.meta.env.VITE_ENABLE_TESTNET === 'true' ? [sepolia, polygonMumbai] : [])
] as const

// Configure connectors
const connectors = [
  injected(),
  metaMask(),
  ...(projectId ? [walletConnect({ projectId })] : [])
]

// Create Wagmi config
export const config = createConfig({
  chains: supportedChains,
  connectors,
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(import.meta.env.VITE_POLYGON_RPC_URL),
    [arbitrum.id]: http(import.meta.env.VITE_ARBITRUM_RPC_URL),
    [sepolia.id]: http(),
    [polygonMumbai.id]: http(),
  },
})

// Contract addresses by chain ID
export const CONTRACT_ADDRESSES = {
  [polygon.id]: {
    ASSET_REGISTRY: import.meta.env.VITE_ASSET_REGISTRY_ADDRESS || '',
    REVENUE_DISTRIBUTOR: import.meta.env.VITE_REVENUE_DISTRIBUTOR_ADDRESS || '',
    DAO_GOVERNANCE: import.meta.env.VITE_DAO_GOVERNANCE_ADDRESS || '',
    HOSTING_MANAGER: import.meta.env.VITE_HOSTING_MANAGER_ADDRESS || '',
  },
  [arbitrum.id]: {
    ASSET_REGISTRY: import.meta.env.VITE_ASSET_REGISTRY_ADDRESS || '',
    REVENUE_DISTRIBUTOR: import.meta.env.VITE_REVENUE_DISTRIBUTOR_ADDRESS || '',
    DAO_GOVERNANCE: import.meta.env.VITE_DAO_GOVERNANCE_ADDRESS || '',
    HOSTING_MANAGER: import.meta.env.VITE_HOSTING_MANAGER_ADDRESS || '',
  },
  // Test networks
  [sepolia.id]: {
    ASSET_REGISTRY: import.meta.env.VITE_ASSET_REGISTRY_ADDRESS_TESTNET || '',
    REVENUE_DISTRIBUTOR: import.meta.env.VITE_REVENUE_DISTRIBUTOR_ADDRESS_TESTNET || '',
    DAO_GOVERNANCE: import.meta.env.VITE_DAO_GOVERNANCE_ADDRESS_TESTNET || '',
    HOSTING_MANAGER: import.meta.env.VITE_HOSTING_MANAGER_ADDRESS_TESTNET || '',
  },
} as const

export type SupportedChainId = typeof supportedChains[number]['id']