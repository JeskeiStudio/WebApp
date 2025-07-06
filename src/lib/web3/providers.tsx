// src/lib/web3/providers.tsx
import { WagmiProvider } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';

const wagmiConfig = getDefaultConfig({
  appName: 'Jeskei',
  // 🔑 pulls from .env.local / .env.production etc.
  projectId: import.meta.env.VITE_WC_PROJECT_ID as string,
  chains: [sepolia],
  ssr: false,                // optional
});

const queryClient = new QueryClient();

export function Web3Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
