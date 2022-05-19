import hre, { ethers } from "hardhat";

import { join } from "path";
import { writeFileSync } from "fs";

async function main() {
  const contractName = "WavePortal";
  const WavePortal = await ethers.getContractFactory(contractName);
  const wavePortal = await WavePortal.deploy();

  await wavePortal.deployed();

  console.log(`Contract ${contractName}:`);
  console.log("\tAddress:", wavePortal.address);
  console.log("\tNetwork:", hre.network.name);
  console.log("");

  const exportFile = join(
    __dirname,
    "..",
    "artifacts",
    "contracts",
    `${contractName}.sol`,
    `${contractName}.${hre.network.name}.addr.json`
  );
  const exportFileTimestamp = exportFile.replace(
    ".addr.",
    `.addr-${new Date().toISOString()}.`
  );
  const fileData = JSON.stringify(
    {
      name: contractName,
      addr: wavePortal.address,
      network: hre.network.name,
    },
    null,
    2
  );
  writeFileSync(exportFile, fileData, { flag: "w" });
  writeFileSync(exportFileTimestamp, fileData);

  console.log(
    "\tDetails exported at:\n\t\t",
    exportFile,
    "\n\t",
    exportFileTimestamp
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
