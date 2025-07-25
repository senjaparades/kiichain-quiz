'use client';

import { kiichainTestnet } from './kiichain';

export async function switchToKiichain() {
  if (typeof window === 'undefined' || !window.ethereum)
    throw new Error('No crypto wallet found');

  const targetChainId = `0x${kiichainTestnet.id.toString(16)}`; // Convert 1336 → 0x538

  const currentChainId = await window.ethereum.request({
    method: 'eth_chainId',
  });

  if (currentChainId !== targetChainId) {
    try {
      // Coba switch jaringan
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: targetChainId }],
      });
    } catch (error: any) {
      // Kalau belum ditambahkan ke wallet
      if (error.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: targetChainId,
            chainName: kiichainTestnet.name,
            rpcUrls: kiichainTestnet.rpcUrls.default.http,
            nativeCurrency: kiichainTestnet.nativeCurrency,
            blockExplorerUrls: [kiichainTestnet.blockExplorers?.default?.url],
          }],
        });
      } else {
        throw new Error('❌ Failed to switch to KiiChain: ' + error.message);
      }
    }
  }
}
