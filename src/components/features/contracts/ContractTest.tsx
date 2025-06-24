// src/components/features/contracts/ContractTest.tsx
import { useState } from 'react'
import { useAccount, useChainId } from 'wagmi'
import { parseEther } from 'viem'
import { 
  useCreateAsset, 
  useAsset, 
  useDistributeRevenue,
  useRevenueShares,
  percentageToBasisPoints 
} from '../../../hooks/contracts'
import { getChainContracts, isSupportedChain } from '../../../lib/contracts/addresses'

export function ContractTest() {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const [assetId, setAssetId] = useState<string>('')
  const [contentHash, setContentHash] = useState<string>('QmTest123...')
  const [metadataURI, setMetadataURI] = useState<string>('https://example.com/metadata.json')
  
  // Contract hooks
  const { createAsset, isPending: isCreating, hash: createHash } = useCreateAsset()
  const { asset, isLoading: isLoadingAsset } = useAsset(assetId ? BigInt(assetId) : undefined)
  const { distributeRevenue, isPending: isDistributing, hash: distributeHash } = useDistributeRevenue()
  const { revenueShares, isLoading: isLoadingShares } = useRevenueShares(assetId ? BigInt(assetId) : undefined)
  
  const isSupported = isSupportedChain(chainId)
  const contracts = isSupported ? getChainContracts(chainId) : null
  
  // Test functions
  const handleCreateAsset = async () => {
    if (!contentHash || !metadataURI) return
    
    try {
      const revenueShare = percentageToBasisPoints(100) // 100% to creator
      await createAsset(contentHash, metadataURI, revenueShare)
    } catch (error) {
      console.error('Failed to create asset:', error)
    }
  }
  
  const handleDistributeRevenue = async () => {
    if (!assetId) return
    
    try {
      const amount = parseEther('0.01') // 0.01 ETH for testing
      await distributeRevenue(BigInt(assetId), amount)
    } catch (error) {
      console.error('Failed to distribute revenue:', error)
    }
  }
  
  if (!isConnected) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">Connect your wallet to test smart contracts</p>
      </div>
    )
  }
  
  if (!isSupported) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">
          Chain ID {chainId} is not supported. Please switch to Polygon (137), Arbitrum (42161), or Sepolia (11155111).
        </p>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Smart Contract Testing</h3>
        
        {/* Contract Addresses Display */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Contract Addresses (Chain {chainId})</h4>
          <div className="space-y-1 text-sm font-mono">
            <div>Asset Registry: {contracts?.ASSET_REGISTRY || 'Not configured'}</div>
            <div>Revenue Distributor: {contracts?.REVENUE_DISTRIBUTOR || 'Not configured'}</div>
            <div>DAO Governance: {contracts?.DAO_GOVERNANCE || 'Not configured'}</div>
            <div>Hosting Manager: {contracts?.HOSTING_MANAGER || 'Not configured'}</div>
          </div>
        </div>
        
        {/* Asset Creation Test */}
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-3">Create Test Asset</h4>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Content Hash (e.g., IPFS hash)"
              value={contentHash}
              onChange={(e) => setContentHash(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Metadata URI"
              value={metadataURI}
              onChange={(e) => setMetadataURI(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleCreateAsset}
              disabled={isCreating || !contentHash || !metadataURI || !contracts?.ASSET_REGISTRY}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              {isCreating ? 'Creating Asset...' : 'Create Asset NFT'}
            </button>
            {createHash && (
              <p className="text-sm text-green-600">
                Transaction: {createHash.slice(0, 10)}...{createHash.slice(-8)}
              </p>
            )}
            {!contracts?.ASSET_REGISTRY && (
              <p className="text-sm text-red-600">
                Asset Registry contract address not configured. Please add VITE_ASSET_REGISTRY_ADDRESS to your .env.local
              </p>
            )}
          </div>
        </div>
        
        {/* Asset Query Test */}
        <div className="border-t pt-4 mt-4">
          <h4 className="font-medium text-gray-900 mb-3">Query Asset</h4>
          <div className="space-y-3">
            <input
              type="number"
              placeholder="Asset ID"
              value={assetId}
              onChange={(e) => setAssetId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            {isLoadingAsset && <p className="text-gray-600">Loading asset...</p>}
            
            {asset && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="space-y-1 text-sm">
                  <div><strong>Creator:</strong> {asset.creator}</div>
                  <div><strong>Content Hash:</strong> {asset.contentHash}</div>
                  <div><strong>Metadata URI:</strong> {asset.metadataURI}</div>
                  <div><strong>Revenue Share:</strong> {asset.revenueShare.toString()}</div>
                  <div><strong>Verified:</strong> {asset.isVerified ? 'Yes' : 'No'}</div>
                  <div><strong>Created:</strong> {new Date(Number(asset.creationTime) * 1000).toLocaleString()}</div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Revenue Distribution Test */}
        <div className="border-t pt-4 mt-4">
          <h4 className="font-medium text-gray-900 mb-3">Test Revenue Distribution</h4>
          <div className="space-y-3">
            <button
              onClick={handleDistributeRevenue}
              disabled={isDistributing || !assetId || !contracts?.REVENUE_DISTRIBUTOR}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              {isDistributing ? 'Distributing...' : 'Distribute 0.01 ETH'}
            </button>
            
            {distributeHash && (
              <p className="text-sm text-green-600">
                Distribution Transaction: {distributeHash.slice(0, 10)}...{distributeHash.slice(-8)}
              </p>
            )}
            
            {!contracts?.REVENUE_DISTRIBUTOR && (
              <p className="text-sm text-red-600">
                Revenue Distributor contract address not configured. Please add VITE_REVENUE_DISTRIBUTOR_ADDRESS to your .env.local
              </p>
            )}
            
            {isLoadingShares && <p className="text-gray-600">Loading revenue shares...</p>}
            
            {revenueShares && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <h5 className="font-medium mb-2">Revenue Shares:</h5>
                {revenueShares.recipients.map((recipient, index) => (
                  <div key={index} className="text-sm">
                    <strong>{recipient}:</strong> {revenueShares.percentages[index].toString()}%
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}