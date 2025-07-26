import { ethers } from "ethers";
import * as dotenv from "dotenv";
import KiiQuizJson from "../lib/abi/KiiQuiz.json";


dotenv.config();

async function main() {
  const rpc = process.env.NEXT_PUBLIC_KIICHAIN_RPC;
  const privateKey = process.env.PRIVATE_KEY;

  if (!rpc || !privateKey) {
    throw new Error("❌ PRIVATE_KEY atau NEXT_PUBLIC_KIICHAIN_RPC tidak ditemukan di .env");
  }

  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const wallet = new ethers.Wallet(privateKey, provider);

  const factory = new ethers.ContractFactory(
    KiiQuizJson.abi,
    KiiQuizJson.bytecode,
    wallet
  );

  console.log("⏳ Deploying KiiQuiz to KiiChain testnet...");
  const contract = await factory.deploy();
  await contract.waitForDeployment();

  console.log("✅ KiiQuiz deployed to:", await contract.getAddress());
}

main().catch((err) => {
  console.error("❌ Deployment failed:", err);
  process.exit(1);
});

