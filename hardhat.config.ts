import * as dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat"; // <-- Tambahkan ini agar TypeChain bekerja

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    kiichain: {
      url: process.env.NEXT_PUBLIC_KIICHAIN_RPC || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
  },
  typechain: {
    outDir: "typechain-types",      // Folder output
    target: "ethers-v5",            // ⬅️ Penting! Hindari konflik dengan ethers-v6
  },
};

export default config;
