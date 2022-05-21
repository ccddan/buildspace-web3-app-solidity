import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { Chain, WagmiProvider, createClient } from "wagmi";
import {
  RainbowKitProvider,
  apiProvider,
  configureChains,
  getDefaultWallets,
  lightTheme,
} from "@rainbow-me/rainbowkit";

import type { AppProps } from "next/app";
import config from "../config";

function MyApp({ Component, pageProps }: AppProps) {
  const goerliChain: Chain = {
    id: 5,
    name: "Ethereum Goerli",
    nativeCurrency: {
      decimals: 18,
      name: "ETH",
      symbol: "ETH",
    },
    rpcUrls: {
      default: config.blockchain.network.goerli.host,
    },
    blockExplorers: {
      etherscan: {
        name: "Goerli Etherscan",
        url: "https://goerli.etherscan.io/",
      },
      default: {
        name: "Mumbai Polygon Scan",
        url: "https://goerli.etherscan.io/",
      },
    },
    testnet: true,
  };
  const localhostChain: Chain = {
    id: config.blockchain.network.localhost.chainId,
    name: "Hardhat",
    nativeCurrency: {
      decimals: 18,
      name: "Ethereum",
      symbol: "ETH",
    },
    rpcUrls: {
      default: config.blockchain.network.localhost.host,
    },
    testnet: true,
  };

  const { provider, chains } = configureChains(
    [goerliChain, localhostChain],
    [
      apiProvider.jsonRpc((chain) => ({ rpcUrl: `${chain.rpcUrls.default}` })),
      apiProvider.fallback(),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: "Wave Portal",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <WagmiProvider client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={lightTheme()}
        appInfo={{ appName: "NFT Marketplace" }}
      >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiProvider>
  );
}

export default MyApp;
