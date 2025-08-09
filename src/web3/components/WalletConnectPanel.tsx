import React from "react";
import { Button } from "@/components/ui/button";
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import { CardanoWallet, useWallet as useCardanoWallet } from "@meshsdk/react";

function short(addr?: string | null, left = 6, right = 4) {
  if (!addr) return "";
  return addr.length > left + right ? `${addr.slice(0, left)}…${addr.slice(-right)}` : addr;
}

export const WalletConnectPanel: React.FC = () => {
  // EVM (Ethereum)
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: ethBal } = useBalance({ address, unit: "ether", query: { enabled: !!address } });

  // Solana
  const { connection } = useConnection();
  const { publicKey } = useSolanaWallet();
  const [solBalance, setSolBalance] = React.useState<number | null>(null);
  React.useEffect(() => {
    let active = true;
    async function run() {
      if (!publicKey) return setSolBalance(null);
      const lamports = await connection.getBalance(publicKey);
      if (active) setSolBalance(lamports / 1e9);
    }
    run();
    return () => {
      active = false;
    };
  }, [publicKey, connection]);

  // Cardano (Mesh)
  const { connected: cardanoConnected, wallet } = useCardanoWallet();
  const [cardanoAddr, setCardanoAddr] = React.useState<string>("");
  React.useEffect(() => {
    let mounted = true;
    (async () => {
      if (cardanoConnected && wallet) {
        const addr = await wallet.getChangeAddress();
        if (mounted) setCardanoAddr(addr);
      } else setCardanoAddr("");
    })();
    return () => {
      mounted = false;
    };
  }, [cardanoConnected, wallet]);

  return (
    <div className="grid gap-4">
      <section className="rounded-lg border p-4">
        <h3 className="font-medium mb-2">Ethereum</h3>
        {!isConnected ? (
          <div className="flex items-center gap-2">
            {connectors.map((c) => (
              <Button key={c.uid} variant="secondary" onClick={() => connect({ connector: c })} disabled={isPending}>
                Connect {c.name}
              </Button>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm">
              <div>Address: {short(address)}</div>
              <div className="text-muted-foreground">ETH: {ethBal ? Number(ethBal.formatted).toFixed(4) : "…"}</div>
            </div>
            <Button variant="outline" onClick={() => disconnect()}>Disconnect</Button>
          </div>
        )}
      </section>

      <section className="rounded-lg border p-4">
        <h3 className="font-medium mb-2">Solana</h3>
        <div className="flex items-center justify-between gap-3">
          <WalletMultiButton className="!bg-primary !text-primary-foreground" />
          <div className="text-sm">
            <div>Address: {short(publicKey?.toBase58?.()) || "—"}</div>
            <div className="text-muted-foreground">SOL: {solBalance?.toFixed?.(4) ?? "—"}</div>
          </div>
        </div>
      </section>

      <section className="rounded-lg border p-4">
        <h3 className="font-medium mb-2">Cardano</h3>
        <div className="flex items-center justify-between gap-3">
          <CardanoWallet />
          <div className="text-sm">
            <div>Address: {short(cardanoAddr) || "—"}</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WalletConnectPanel;
