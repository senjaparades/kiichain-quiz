import { getContract } from '../lib/contracts';

export async function fetchScore(userAddress: string): Promise<number> {
  try {
    const contract = await getContract();
    const score = await contract.scores(userAddress); // atau contract.getScore(userAddress) jika ABI-nya pakai fungsi
    return Number(score);
  } catch (error) {
    console.error('Failed to fetch score:', error);
    return 0;
  }
}
