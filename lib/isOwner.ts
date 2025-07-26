import { ethers } from 'ethers';
import abi from '@/abi/abi.json';

const contractAddress = '0x21ee9D5B2B6Bd524dE7bd8c65f17587B2Bd61117';
const rpcUrl = process.env.NEXT_PUBLIC_KIICHAIN_RPC!;

export default async function isOwner(address: string): Promise<boolean> {
  if (!address) return false;

  try {
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const owner: string = await contract.owner();

    console.log('[isOwner check]', {
      connected: address,
      contractOwner: owner,
      match: owner.toLowerCase() === address.toLowerCase(),
    });

    return owner.toLowerCase() === address.toLowerCase();
  } catch (error) {
    console.error('❌ Failed to check contract owner:', error);
    return false;
  }
}
