import { ethers } from "hardhat";
import * as dotenv from "dotenv"; dotenv.config();

async function main() {
  const addr = process.env.HELLO_ADDR!;
  if (!addr) throw new Error("Set HELLO_ADDR in .env");

  const HelloWorld = await ethers.getContractFactory("HelloWorld");
  const hello = HelloWorld.attach(addr);

  const tx = await hello.setMessage("Salam, Amina!"); // <- change text
  console.log("Tx sent:", tx.hash);
  await tx.wait();
  console.log("Updated! New message:", await hello.hello());
}

main().catch((e)=>{ console.error(e); process.exitCode = 1; });
