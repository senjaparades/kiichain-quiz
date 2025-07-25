// lib/wallet.ts
import { getPublicClient, getWalletClient } from '@wagmi/core';
import { wagmiConfig } from './wagmiConfig';

export const getClients = () => {
  const publicClient = getPublicClient(wagmiConfig);
  const walletClient = getWalletClient(wagmiConfig);
  return { publicClient, walletClient };
};
