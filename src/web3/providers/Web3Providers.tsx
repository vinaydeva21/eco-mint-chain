import React from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { mainnet } from "viem/chains";

// Minimal EVM (Ethereum) config using injected wallets (MetaMask, Coinbase, etc.)
const evmConfig = createConfig({
  chains: [mainnet],
  connectors: [injected()],
  transports: { [mainnet.id]: http() },
});

const Web3Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <WagmiProvider config={evmConfig}>{children}</WagmiProvider>;
};

export default Web3Providers;

