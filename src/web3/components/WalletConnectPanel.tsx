import React from "react";
import { Button } from "@/components/ui/button";
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";
// Cardano section is lazy-loaded to avoid loading Mesh SDK on initial route
const CardanoWalletSection = React.lazy(() => import("./CardanoWalletSection"));

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


  // Cardano UI and hooks are isolated in CardanoWalletSection (lazy-loaded)

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


      <React.Suspense fallback={<section className="rounded-lg border p-4"><h3 className="font-medium mb-2">Cardano</h3><div className="text-sm">Loading wallet…</div></section>}>
        <CardanoWalletSection />
      </React.Suspense>
    </div>
  );
};

export default WalletConnectPanel;
