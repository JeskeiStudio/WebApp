// src/App.tsx
import { useState } from 'react'
import { Web3Providers } from './lib/web3/providers'
import { ConnectButton } from './components/features/wallet/ConnectButton'
import { useAccount, useChainId } from 'wagmi'

function JeskeiApp() {
  const [count, setCount] = useState(0)
  const { address, isConnected } = useAccount()
  const chainId = useChainId()

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

            {/* Wallet Connection */}
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                      Chain ID: <span className="font-medium">{chainId}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Platform Status */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Platform Status</h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Smart Contracts: <span className="text-yellow-600 font-medium">Pending</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    IPFS Storage: <span className="text-yellow-600 font-medium">Pending</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    The Graph: <span className="text-yellow-600 font-medium">Pending</span>
                  </p>
                </div>
              </div>

              {/* Development Counter */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Development Test</h3>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Count: <span className="font-bold text-blue-600">{count}</span>
                  </p>
                  <button
                    onClick={() => setCount(count + 1)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Increment
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          {isConnected && (
            <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🎉 Wallet Connected!</h3>
              <p className="text-gray-600 mb-6">
                Great! Your wallet is connected. Next steps in development:
              </p>
              <ul className="text-left space-y-2 text-gray-600">
                <li>✅ Web3 wallet connection</li>
                <li>🔲 Smart contract integration</li>
                <li>🔲 IPFS content storage</li>
                <li>🔲 Content upload interface</li>
                <li>🔲 Video streaming player</li>
                <li>🔲 Revenue sharing system</li>
              </ul>
            </div>
          )}
        </div>
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