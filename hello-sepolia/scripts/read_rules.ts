import { ethers } from "hardhat"; import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const addr = process.env.HELLO_RULES_ADDR!;
  const F = await ethers.getContractFactory("RuleBasedHello");
  const c = F.attach(addr);
  console.log("hello():", await c.hello());
}
main().catch((e)=>{ console.error(e); process.exitCode = 1; });
