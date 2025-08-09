import React from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { mainnet } from "viem/chains";

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import "@solana/wallet-adapter-react-ui/styles.css";

// Minimal EVM (Ethereum) config using injected wallets (MetaMask, Coinbase, etc.)
const evmConfig = createConfig({
  chains: [mainnet],
  connectors: [injected()],
  transports: { [mainnet.id]: http() },
});

const Web3Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const endpoint = "https://api.mainnet-beta.solana.com";
  const wallets = React.useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()], []);

  return (
    <WagmiProvider config={evmConfig}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </WagmiProvider>
  );
};

export default Web3Providers;
