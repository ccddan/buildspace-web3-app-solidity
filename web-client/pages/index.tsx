import { BigNumber, ethers } from "ethers";
import { useAccount, useContract, useContractEvent, useSigner } from "wagmi";
import { useCallback, useEffect, useState } from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import type { NextPage } from "next";
import config from "@config";

const Home: NextPage = () => {
  const { data } = useAccount();
  const { data: signerData } = useSigner();

  const CONTRACT_NETWORK = "localhost";
  const contract = useContract({
    addressOrName: config.blockchain.contract[CONTRACT_NETWORK].info.addr,
    contractInterface: config.blockchain.contract[CONTRACT_NETWORK].specs.abi,
    signerOrProvider: signerData,
  });

  const [totalWaves, setTotalWaves] = useState(0);
  const [waveMessage, setWaveMessage] = useState("");
  const [waves, setWaves] = useState<
    Array<{ waver: string; message: string; timestamp: BigNumber }>
  >([]);

  useContractEvent(
    {
      addressOrName: config.blockchain.contract[CONTRACT_NETWORK].info.addr,
      contractInterface: config.blockchain.contract[CONTRACT_NETWORK].specs.abi,
    },
    "NewWave",
    async (newWave) => {
      console.log("NewWave event:", newWave);
      if (!newWave.includes(waveMessage)) {
        console.log("Wave created somewhere else, refreshing waves...");
        loadTotalWavesFn();
      }
    }
  );

  const loadTotalWavesFn = useCallback(() => {
    async function fn() {
      try {
        console.log("getting total waves...");
        const _totalWaves = await contract.getTotalWaves();
        console.log("total waves:", _totalWaves);
        setTotalWaves(_totalWaves);

        console.log("getting list of waves...");
        const wavesList = await contract.getWaves();
        console.log("waves list:", wavesList);
        setWaves(wavesList);
      } catch (error) {
        console.warn("Failed to get total waves:", error);
      }
    }

    if (contract) fn();
  }, [contract]);

  useEffect(() => {
    if (data && signerData && contract) {
      loadTotalWavesFn();
    }
  }, [data, signerData, contract, loadTotalWavesFn]);

  const wave = async () => {
    try {
      console.log("send new wave");
      const tx = await contract.wave(waveMessage || "[Empty]");
      await tx.wait();
      console.log("wave has been sent");

      await loadTotalWavesFn();
    } catch (error) {
      console.warn("Failed to send wave:", error);
    }
  };

  return (
    <div>
      <Head>
        <title>Wave Portal</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="connectButton">
        <ConnectButton />
      </div>
      <div className="mainContainer">
        <div className="dataContainer">
          <div className="header">👋 Hey there!</div>

          <div className="bio">
            I am Anonymous and I am learning Web 3 and Blockchain so that&apos;s
            pretty cool right?
            <br />
            Connect your Ethereum wallet and wave at me!
          </div>

          <input
            className="waveMessage"
            type="text"
            placeholder="Wave Message"
            onChange={(e) => setWaveMessage(e.target.value)}
            disabled={!data}
          />
          <button className="waveButton" onClick={wave} disabled={!data}>
            〰️ Wave 〰️
          </button>
          <br />
          {data && (
            <p>
              Total waves: <b>{totalWaves.toString()}</b>
            </p>
          )}
          <br />
          <ul>
            {data &&
              waves.length > 0 &&
              waves.map((wave, idx) => {
                return (
                  <li key={idx}>
                    <p>Timestamp: {wave.timestamp.toString()}</p>
                    <p>Waver: {wave.waver}</p>
                    <p>Message: {wave.message}</p>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
