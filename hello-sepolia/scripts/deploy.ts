import { ethers } from "hardhat";

async function main() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld");
  const hello = await HelloWorld.deploy("Hello, Amina!"); // ou sans argument si le constructeur n’en prend pas

  await hello.waitForDeployment(); // ⬅️ à la place de hello.deployed()

  console.log("✅ Contract deployed to:", hello.target); // Ethers v6 utilise `target` au lieu de `address`
}

main().catch((error) => {
  console.error("🚨 Error in deployment:", error);
  process.exitCode = 1;
});

