// scripts/show-wallet.ts
import { Wallet } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

const wallet = new Wallet(process.env.PRIVATE_KEY || "");
console.log("Your wallet address:", wallet.address);
