import { ethers } from 'ethers';
import { KiiQuiz__factory } from '@/typechain-types'; // ✅ gunakan factory
import KiiQuizABI from '@/artifacts/contracts/KiiQuiz.sol/KiiQuiz.json';

const contractAddress = '0x21ee9D5B2B6Bd524dE7bd8c65f17587B2Bd61117';
const rpcUrl = process.env.NEXT_PUBLIC_KIICHAIN_RPC!;

const provider = new ethers.JsonRpcProvider(rpcUrl);

// Base contract instance for read-only ops
const contract = KiiQuiz__factory.connect(contractAddress, provider);

// ✅ Ambil round saat ini
export async function getRound(): Promise<number> {
  const round = await contract.round();
  return Number(round);
}

// ✅ Cek apakah kuis sedang aktif
export async function isQuizActive(): Promise<boolean> {
  return await contract.isQuizActive();
}

// ✅ Cek apakah user sudah submit skor di round tertentu
export async function hasUserSubmitted(address: string, round: number): Promise<boolean> {
  return await contract.hasSubmitted(round, address);
}

// ✅ Wrapper: Cek apakah user sudah submit skor di round saat ini
export async function hasSubmittedScore(address: string): Promise<boolean> {
  const round = await getRound();
  return await hasUserSubmitted(address, round);
}

// ✅ Ambil nilai maksimum skor per round
export async function getMaxScorePerRound(): Promise<number> {
  const maxScore = await contract.maxScorePerRound();
  return Number(maxScore);
}

// ✅ Aktifkan / nonaktifkan quiz (admin only)
export async function setQuizActive(active: boolean): Promise<void> {
  const signer = await new ethers.BrowserProvider(window.ethereum).getSigner();
  const connected = KiiQuiz__factory.connect(contractAddress, signer); // ✅ pakai factory
  await connected.setQuizActive(active);
}

// ✅ Set skor maksimum per round (admin only)
export async function setMaxScorePerRound(score: number): Promise<void> {
  const signer = await new ethers.BrowserProvider(window.ethereum).getSigner();
  const connected = KiiQuiz__factory.connect(contractAddress, signer); // ✅ pakai factory
  await connected.setMaxScorePerRound(score);
}

// ✅ Submit skor user ke smart contract
export async function submitScoreToContract(score: number): Promise<void> {
  const signer = await new ethers.BrowserProvider(window.ethereum).getSigner();
  const connected = KiiQuiz__factory.connect(contractAddress, signer); // ✅ pakai factory
  const tx = await connected.submitScore(score);
  await tx.wait();
}
