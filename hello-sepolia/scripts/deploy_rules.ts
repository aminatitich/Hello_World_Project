import { ethers } from "hardhat";

async function main() {
  const F = await ethers.getContractFactory("RuleBasedHello");
  const c = await F.deploy("Hello, Amina!");
  await c.waitForDeployment();
  console.log("RuleBasedHello deployed at:", c.target); // ethers v6
}

main().catch((e)=>{ console.error(e); process.exitCode = 1; });
