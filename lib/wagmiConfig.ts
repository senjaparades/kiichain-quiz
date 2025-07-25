'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { kiichainTestnet } from './kiichain';

export const wagmiConfig = getDefaultConfig({
  appName: 'KiiChain Quiz',
  projectId: 'cf32cb7568df5e191dae74d5b19f8652', // pakai projectId dari WalletConnect
  chains: [kiichainTestnet],
  transports: {
    [kiichainTestnet.id]: http(kiichainTestnet.rpcUrls.default.http[0]),
  },
});
