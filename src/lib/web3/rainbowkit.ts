// src/lib/web3/rainbowkit.ts
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, polygon, arbitrum, sepolia } from 'wagmi/chains'

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo-project-id'

export const rainbowConfig = getDefaultConfig({
  appName: 'Jeskei',
  projectId,
  chains: [
    mainnet,
    polygon,
    arbitrum,
    ...(import.meta.env.VITE_ENABLE_TESTNET === 'true' ? [sepolia] : []),
  ],
  ssr: false, // We're building a SPA, not SSR
})

// RainbowKit theme customization
export const rainbowTheme = {
  blurs: {
    modalOverlay: 'blur(4px)',
  },
  colors: {
    accentColor: '#3b82f6', // Jeskei blue
    accentColorForeground: 'white',
    actionButtonBorder: 'rgba(0, 0, 0, 0.04)',
    actionButtonBorderMobile: 'rgba(0, 0, 0, 0.06)',
    actionButtonSecondaryBackground: 'rgba(0, 0, 0, 0.06)',
    closeButton: 'rgba(60, 66, 66, 0.8)',
    closeButtonBackground: 'rgba(0, 0, 0, 0.06)',
    connectButtonBackground: '#3b82f6',
    connectButtonBackgroundError: '#FF494A',
    connectButtonInnerBackground: 'linear-gradient(0deg, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.06))',
    connectButtonText: 'white',
    connectButtonTextError: 'white',
    connectionIndicator: '#30D158',
    downloadBottomCardBackground: 'linear-gradient(126deg, rgba(255, 255, 255, 0) 9.49%, rgba(171, 171, 171, 0.04) 71.04%), #FFFFFF',
    downloadTopCardBackground: 'linear-gradient(126deg, rgba(171, 171, 171, 0.2) 9.49%, rgba(255, 255, 255, 0) 71.04%), #FFFFFF',
    error: '#FF494A',
    generalBorder: 'rgba(0, 0, 0, 0.06)',
    generalBorderDim: 'rgba(0, 0, 0, 0.03)',
    menuItemBackground: 'rgba(60, 66, 66, 0.1)',
    modalBackdrop: 'rgba(0, 0, 0, 0.3)',
    modalBackground: 'white',
    modalBorder: 'rgba(0, 0, 0, 0.06)',
    modalText: '#25292E',
    modalTextDim: 'rgba(60, 66, 66, 0.3)',
    modalTextSecondary: 'rgba(60, 66, 66, 0.6)',
    profileAction: '#FFF',
    profileActionHover: 'rgba(255, 255, 255, 0.5)',
    profileForeground: 'rgba(60, 66, 66, 0.06)',
    selectedOptionBorder: 'rgba(60, 66, 66, 0.1)',
    standby: '#FFD23F',
  },
  fonts: {
    body: 'Inter, system-ui, sans-serif',
  },
  radii: {
    actionButton: '9999px',
    connectButton: '12px',
    menuButton: '12px',
    modal: '24px',
    modalMobile: '28px',
  },
  shadows: {
    connectButton: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    dialog: '0px 8px 32px rgba(0, 0, 0, 0.32)',
    profileDetailsAction: '0px 2px 6px rgba(37, 41, 46, 0.04)',
    selectedOption: '0px 2px 6px rgba(0, 0, 0, 0.24)',
    selectedWallet: '0px 2px 6px rgba(0, 0, 0, 0.12)',
    walletLogo: '0px 2px 16px rgba(0, 0, 0, 0.16)',
  },
}