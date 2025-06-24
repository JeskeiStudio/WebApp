// src/lib/contracts/abis.ts
export const ASSET_REGISTRY_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "contentHash", "type": "string"},
      {"internalType": "string", "name": "metadataURI", "type": "string"},
      {"internalType": "uint256", "name": "revenueShare", "type": "uint256"}
    ],
    "name": "createAsset",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "getAsset",
    "outputs": [
      {
        "components": [
          {"internalType": "address", "name": "creator", "type": "address"},
          {"internalType": "string", "name": "contentHash", "type": "string"},
          {"internalType": "string", "name": "metadataURI", "type": "string"},
          {"internalType": "uint256", "name": "revenueShare", "type": "uint256"},
          {"internalType": "bool", "name": "isVerified", "type": "bool"},
          {"internalType": "uint256", "name": "creationTime", "type": "uint256"}
        ],
        "internalType": "struct AssetRegistry.MediaAsset",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const

export const REVENUE_DISTRIBUTOR_ABI = [
  {
    "inputs": [
      {"internalType": "uint256", "name": "assetId", "type": "uint256"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "distributeRevenue",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "assetId", "type": "uint256"}],
    "name": "getRevenueShares",
    "outputs": [
      {"internalType": "address[]", "name": "recipients", "type": "address[]"},
      {"internalType": "uint256[]", "name": "percentages", "type": "uint256[]"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const

export const DAO_GOVERNANCE_ABI = [] as const
export const HOSTING_MANAGER_ABI = [] as const
