// lib/wallet.ts
import { getPublicClient, getWalletClient } from '@wagmi/core';
import { config } from './wagmiConfig';

export const getClients = () => {
  const publicClient = getPublicClient(config);

  if (!publicClient) {
    throw new Error('❌ publicClient is undefined. Pastikan WagmiConfig sudah ter-inisialisasi.');
  }

  return { publicClient };
};

export const getWalletClientSafe = async () => {
  try {
    return await getWalletClient(config);
  } catch (err) {
    console.warn('⚠️ Wallet client not found:', err);
    return null;
  }
};
