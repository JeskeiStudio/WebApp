// src/lib/web3/providers.tsx
import '@rainbow-me/rainbowkit/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { rainbowConfig, rainbowTheme } from './rainbowkit'
import { ReactNode } from 'react'

const queryClient = new QueryClient()

interface Web3ProvidersProps {
  children: ReactNode
}

export function Web3Providers({ children }: Web3ProvidersProps) {
  return (
    <WagmiProvider config={rainbowConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={rainbowTheme}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}