import wavePortalContractInfoLocalhost from "../artifacts/smart-contracts/WavePortal.sol/WavePortal.addr.localhost.json";
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
      mumbai: {
        host: process.env.NEXT_PUBLIC_POLYGON_MUMBAI_URL || "not-defined",
        chainId: 80001,
        networkId: 80001,
      },
      localhost: {
        host: process.env.NEXT_PUBLIC_LOCAL_RPC_URL || "not-defined",
        chainId: +process.env.NEXT_PUBLIC_LOCAL_RPC_CHAIN_ID!,
        networkId: +process.env.NEXT_PUBLIC_LOCAL_RPC_CHAIN_ID!,
      },
    },
    contract: {
      goerli: {
        info: "", // require("../artifacts/smart-contracts/WavePortal.sol/WavePortal.goerli.addr.json"),
        specs: "", // require("../artifacts/smart-contracts/WavePortal.sol/WavePortal.goerli.json"),
      },
      mumbai: {
        info: "", // require("../smart-contracts/artifacts/contracts/WavePortal.sol/WavePortal.mumbai.addr.json"),
        specs: "", // require("../smart-contracts/artifacts/contracts/WavePortal.sol/WavePortal.mumbai.json"),
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
