'use client';

import * as React from 'react';
import '@rainbow-me/rainbowkit/styles.css';

import { WagmiProvider, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, darkTheme, getDefaultConfig } from '@rainbow-me/rainbowkit';

import { kiichainTestnet } from '@/lib/kiichain';

const config = getDefaultConfig({
  appName: 'KiiChain Quiz',
  projectId: 'cf32cb7568df5e191dae74d5b19f8652',
  chains: [kiichainTestnet],
  transports: {
    [kiichainTestnet.id]: http(kiichainTestnet.rpcUrls.default.http[0]),
  },
});

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // ⛔ Hindari render di server (SSR) karena RainbowKit butuh akses window
  if (!mounted) return null;

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={[kiichainTestnet]} theme={darkTheme()}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
