import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

function getArg(name: string, def?: string) {
  const i = process.argv.indexOf(name);
  return i !== -1 && i + 1 < process.argv.length ? process.argv[i + 1] : def;
}

async function main() {
  const addr = process.env.HELLO_RULES_ADDR!;
  if (!addr) throw new Error("Set HELLO_RULES_ADDR in .env");

  const Factory = await ethers.getContractFactory("RuleBasedHello");
  const c = Factory.attach(addr);

  // CLI: --pay 0.0001 (ETH). Default 0.0001
  const payStr = getArg("--pay", "0.0001")!;
  const value = ethers.parseEther(payStr);

  // CLI: --nowait to skip waiting for an even second
  const wait = !process.argv.includes("--nowait");
  if (wait) {
    const now = Math.floor(Date.now() / 1000);
    if (now % 2 !== 0) {
      await new Promise((r) => setTimeout(r, 1100));
    }
  }

  const tx = await c.setMessage("Rules say hi!", { value });
  console.log("Tx:", tx.hash);
  await tx.wait();
  console.log("New message:", await c.hello());
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
