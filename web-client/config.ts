import wavePortalContractInfoGoerli from "../artifacts/smart-contracts/WavePortal.sol/WavePortal.addr.goerli.json";
import wavePortalContractInfoLocalhost from "../artifacts/smart-contracts/WavePortal.sol/WavePortal.addr.localhost.json";
import wavePortalContractSpecsGoerli from "../artifacts/smart-contracts/WavePortal.sol/WavePortal.goerli.json";
import wavePortalContractSpecsLocalhost from "../artifacts/smart-contracts/WavePortal.sol/WavePortal.localhost.json";

export const config = {
  blockchain: {
    mode: "development",
    network: {
      goerli: {
        host: process.env.NEXT_PUBLIC_GOERLI_URL || "not-defined",
        chainId: 420,
        networkId: 420,
      },
      localhost: {
        host: process.env.NEXT_PUBLIC_LOCAL_RPC_URL || "not-defined",
        chainId: +process.env.NEXT_PUBLIC_LOCAL_RPC_CHAIN_ID!,
        networkId: +process.env.NEXT_PUBLIC_LOCAL_RPC_CHAIN_ID!,
      },
    },
    contract: {
      goerli: {
        info: wavePortalContractInfoGoerli,
        specs: wavePortalContractSpecsGoerli,
      },
      localhost: {
        info: wavePortalContractInfoLocalhost,
        specs: wavePortalContractSpecsLocalhost,
      },
    },
  },
};

console.debug("global config:", config);

export default config;
