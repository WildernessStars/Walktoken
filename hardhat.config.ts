import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "solidity-coverage";
import dotenv from "dotenv";

dotenv.config();

const { PRIVATE_KEY } = process.env;
// personal experience subjective healthcare smartwatch preventive good for environment(walk more) benefit society
// toC 
// value convice people
// have to has an economic model
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 10000,
      },
    },
  },
  typechain: {
    outDir: "typechain-types",
    target: "ethers-v6",
  },
  networks: {
    gemini: {
      url: "https://rpc5.gemini.axiomesh.io",
      accounts: PRIVATE_KEY ? [process.env.PRIVATE_KEY!] : [],
    },
    local: {
      url: "http://localhost:8545",
      accounts: PRIVATE_KEY ? [process.env.PRIVATE_KEY!] : [],
    },
    hardhat: {
      accounts: {
        mnemonic: process.env.MNEMONIC
      },
      chainId: 1337,
    },
  },
};

export default config;