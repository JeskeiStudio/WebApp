// src/hooks/contracts/index.ts
// Asset Registry hooks
export {
  useCreateAsset,
  useAsset,
  useWaitForAssetCreation,
  useCreatorAssets,
  useAssetOwnership,
  type MediaAsset,
} from './useAssetRegistry'

// Revenue Distributor hooks
export {
  useDistributeRevenue,
  useRevenueShares,
  useWaitForRevenueDistribution,
  useAssetRevenue,
  useEstimateRevenueDistribution,
  percentageToBasisPoints,
  basisPointsToPercentage,
  type RevenueShare,
  type RevenueEvent,
} from './useRevenueDistributor'

// DAO Governance hooks (to be implemented)
// export { ... } from './useDAOGovernance'

// Hosting Manager hooks (to be implemented)
// export { ... } from './useHostingManager'