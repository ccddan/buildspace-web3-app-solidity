import { ethers } from "hardhat";

async function main() {
  const [owner, acc1] = await ethers.getSigners();
  const contractName = "WavePortal";
  const WavePortal = await ethers.getContractFactory(contractName);
  const wavePortal = await WavePortal.deploy();

  await wavePortal.deployed();

  console.log(`${contractName} deployed to:`, wavePortal.address);
  console.log(`${contractName} contract owner:`, owner.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
