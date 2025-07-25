// lib/kiichain.ts
import type { Chain } from 'wagmi/chains';

export const kiichainTestnet: Chain = {
  id: 1336,
  name: 'KiiChain Testnet',
  nativeCurrency: {
    name: 'KII',
    symbol: 'KII',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://json-rpc.uno.sentry.testnet.v3.kiivalidator.com/'],
    },
    public: {
      http: ['https://json-rpc.uno.sentry.testnet.v3.kiivalidator.com/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Kiichain Explorer',
      url: 'https://explorer.kiichain.io/',
    },
  },
  testnet: true,
};
