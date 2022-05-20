import { copyFileSync, mkdirSync, writeFileSync } from "fs";
import hre, { ethers } from "hardhat";

import { join } from "path";

async function main() {
  const initialContractBalance = ethers.utils.parseEther(
    hre.network.name === "localhost" ? "1" : ".001"
  );

  // WavePortal
  const wavePortalContractName = "WavePortal";
  const WavePortal = await ethers.getContractFactory(wavePortalContractName);
  const wavePortal = await WavePortal.deploy({
    value: initialContractBalance,
  });
  await wavePortal.deployed();

  console.log("Network:", hre.network.name);
  console.log("Contracts:");
  console.log(`\t${wavePortalContractName}:`);
  console.log("\t\tAddress:", wavePortal.address);
  console.log("\t\tInitial Balance:", initialContractBalance, "ETH");
  console.log("\n\n");

  return {
    network: hre.network.name,
    timestamp: new Date().toISOString(),
    contracts: [
      {
        name: wavePortalContractName,
        addr: wavePortal.address,
      },
    ],
  };
}

main()
  .then((result) => {
    console.log("Processing Deployed Contracts...");

    const compiledContractsPath = join(
      __dirname,
      "..",
      "artifacts",
      "contracts"
    );

    for (let contract of result.contracts) {
      console.log(`Exporting ${contract.name}:`);
      // DBG
      console.log("\tDBG:");
      const compiledContractDbgFile = join(
        compiledContractsPath,
        `${contract.name}.sol`,
        `${contract.name}.dbg.json`
      );
      const compiledContractDbgFileNetwork = compiledContractDbgFile.replace(
        ".json",
        `.${result.network}.json`
      );
      copyFileSync(compiledContractDbgFile, compiledContractDbgFileNetwork);
      console.log("\t\t", compiledContractDbgFileNetwork);

      const compiledContractDbgFileNetworkTimestamp =
        compiledContractDbgFileNetwork.replace(
          ".json",
          `_${result.timestamp}.json`
        );
      copyFileSync(
        compiledContractDbgFile,
        compiledContractDbgFileNetworkTimestamp
      );
      console.log("\t\t", compiledContractDbgFileNetworkTimestamp);

      // Contract ABI
      console.log("\tABI:");
      const compiledContractFile = join(
        compiledContractsPath,
        `${contract.name}.sol`,
        `${contract.name}.json`
      );
      const compiledContractFileNetwork = compiledContractFile.replace(
        ".json",
        `.${result.network}.json`
      );
      copyFileSync(compiledContractFile, compiledContractFileNetwork);
      console.log("\t\t", compiledContractFileNetwork);

      const compiledContractFileNetworkTimestamp =
        compiledContractFileNetwork.replace(
          ".json",
          `_${result.timestamp}.json`
        );
      copyFileSync(compiledContractFile, compiledContractFileNetworkTimestamp);
      console.log("\t\t", compiledContractFileNetworkTimestamp);

      // Info
      console.log("\tInfo:");
      const contractInfoFile = compiledContractFile.replace(
        ".json",
        ".addr.json"
      );
      writeFileSync(contractInfoFile, JSON.stringify(contract, null, 2), {
        flag: "w",
      });
      console.log("\t\t", contractInfoFile);

      const contractInfoFileNetwork = contractInfoFile.replace(
        ".json",
        `.${result.network}.json`
      );
      copyFileSync(contractInfoFile, contractInfoFileNetwork);
      console.log("\t\t", contractInfoFileNetwork);

      const contractInfoFileNetworkTimestamp = contractInfoFileNetwork.replace(
        ".json",
        `_${result.timestamp}.json`
      );
      copyFileSync(contractInfoFile, contractInfoFileNetworkTimestamp);
      console.log("\t\t", contractInfoFileNetworkTimestamp, "\n\n");
    }

    console.log("Done.");
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
