// lib/wallet.ts
import { getPublicClient, getWalletClient } from '@wagmi/core';
import { wagmiConfig } from './wagmiConfig';

export const getClients = async () => {
  const publicClient = getPublicClient(wagmiConfig);
  const walletClient = await getWalletClient(wagmiConfig);
  return { publicClient, walletClient };
};
