// lib/isQuizActive.ts
import { getClients } from './wallet';
import { contractAddress, contractAbi } from './constants';

export async function isQuizActive(): Promise<boolean> {
  try {
    const { publicClient } = getClients();

    const result = await publicClient.readContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: 'isQuizActive', // ✅ pastikan ini nama fungsi di contract
    });

    return Boolean(result);
  } catch (err) {
    console.error('❌ Failed to check isQuizActive:', err);
    return false;
  }
}
