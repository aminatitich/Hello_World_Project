import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 11155111,
    },
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY || "",
    },
    // (optional) hide the Sourcify message:
    // sourcify: { enabled: false },
  },
};

export default config;

import { task } from "hardhat/config";

task("rules:set", "Set RuleBasedHello message")
  .addParam("msg", "New message")
  .addOptionalParam("pay", "ETH to send", "0.0001")
  .addFlag("nowait", "Don't wait for an even second")
  .setAction(async ({ msg, pay, nowait }, hre) => {
    const addr = process.env.HELLO_RULES_ADDR!;
    const F = await hre.ethers.getContractFactory("RuleBasedHello");
    const c = F.attach(addr);

    if (!nowait) {
      const now = Math.floor(Date.now() / 1000);
      if (now % 2 !== 0) await new Promise(r => setTimeout(r, 1100));
    }

    const tx = await c.setMessage(msg, { value: hre.ethers.parseEther(pay) });
    console.log("Tx:", tx.hash);
    await tx.wait();
    console.log("New message:", await c.hello());
  });
