// src/App.tsx
import { useState } from 'react'
import { Web3Providers } from './lib/web3/providers'
import { ConnectButton } from './components/features/wallet/ConnectButton'
import { ContractTest } from './components/features/contracts/ContractTest'
import { useAccount, useChainId } from 'wagmi'
import { isSupportedChain } from './lib/contracts/addresses'

function JeskeiApp() {
  const [activeTab, setActiveTab] = useState<'overview' | 'contracts'>('overview')
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const isSupported = isSupportedChain(chainId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">J</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Jeskei</h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('contracts')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'contracts'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Smart Contracts
              </button>
            </nav>

            {/* Wallet Connection */}
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Chain Status Banner */}
      {isConnected && !isSupported && (
        <div className="bg-red-50 border-b border-red-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">
                    You're connected to an unsupported network (Chain ID: {chainId}). 
                    Please switch to Polygon, Arbitrum, or Sepolia testnet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'overview' && (
          <div className="text-center">
            {/* Hero Section */}
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Building a Better Online Video Experience
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Decentralized media platform powered by blockchain technology
              </p>
              
              {/* Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {/* Wallet Status */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Wallet Status</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      Status: <span className={isConnected ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                        {isConnected ? 'Connected' : 'Disconnected'}
                      </span>
                    </p>
                    {address && (
                      <p className="text-sm text-gray-600">
                        Address: <span className="font-mono text-xs">{address.slice(0, 6)}...{address.slice(-4)}</span>
                      </p>
                    )}
                    {chainId && (
                      <p className="text-sm text-gray-600">
                        Chain ID: <span className={`font-medium ${isSupported ? 'text-green-600' : 'text-red-600'}`}>
                          {chainId} {isSupported ? '✓' : '✗'}
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Smart Contract Status */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Contracts</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      Integration: <span className="text-green-600 font-medium">Ready</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Asset Registry: <span className="text-yellow-600 font-medium">Configured</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Revenue Sharing: <span className="text-yellow-600 font-medium">Configured</span>
                    </p>
                  </div>
                </div>

                {/* Platform Status */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Platform Status</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      IPFS Storage: <span className="text-yellow-600 font-medium">Pending</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      The Graph: <span className="text-yellow-600 font-medium">Pending</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Content Upload: <span className="text-yellow-600 font-medium">Pending</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            {isConnected && isSupported && (
              <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">🎉 Ready for Development!</h3>
                <p className="text-gray-600 mb-6">
                  Wallet connected and smart contracts configured. Development progress:
                </p>
                <ul className="text-left space-y-2 text-gray-600">
                  <li>✅ Web3 wallet connection</li>
                  <li>✅ Smart contract integration</li>
                  <li>🔲 IPFS content storage</li>
                  <li>🔲 Content upload interface</li>
                  <li>🔲 Video streaming player</li>
                  <li>🔲 Revenue sharing system</li>
                </ul>
                <div className="mt-6">
                  <button
                    onClick={() => setActiveTab('contracts')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
                  >
                    Test Smart Contracts
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'contracts' && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Smart Contract Testing</h2>
              <p className="text-lg text-gray-600">
                Test the Jeskei smart contracts directly from the web interface
              </p>
            </div>
            <ContractTest />
          </div>
        )}
      </main>
    </div>
  )
}

function App() {
  return (
    <Web3Providers>
      <JeskeiApp />
    </Web3Providers>
  )
}

export default App