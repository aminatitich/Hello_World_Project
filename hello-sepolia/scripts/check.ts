import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const addr = process.env.HELLO_ADDR!;
  if (!addr) throw new Error("Set HELLO_ADDR in .env");

  const HelloWorld = await ethers.getContractFactory("HelloWorld");
  const hello = HelloWorld.attach(addr);

  console.log("Contract:", hello.target);   
  const msg = await hello.hello();          
  console.log("Current message:", msg);
}

main().catch((e) => { console.error(e); process.exitCode = 1; });
