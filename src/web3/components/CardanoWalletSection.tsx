import React from "react";
import { CardanoWallet, useWallet as useCardanoWallet } from "@meshsdk/react";

function short(addr?: string | null, left = 6, right = 4) {
  if (!addr) return "";
  return addr.length > left + right ? `${addr.slice(0, left)}…${addr.slice(-right)}` : addr;
}

const CardanoWalletSection: React.FC = () => {
  const { connected: cardanoConnected, wallet } = useCardanoWallet();
  const [cardanoAddr, setCardanoAddr] = React.useState<string>("");

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (cardanoConnected && wallet) {
          const addr = await wallet.getChangeAddress();
          if (mounted) setCardanoAddr(addr);
        } else setCardanoAddr("");
      } catch {
        setCardanoAddr("");
      }
    })();
    return () => {
      mounted = false;
    };
  }, [cardanoConnected, wallet]);

  return (
    <section className="rounded-lg border p-4">
      <h3 className="font-medium mb-2">Cardano</h3>
      <div className="flex items-center justify-between gap-3">
        <CardanoWallet />
        <div className="text-sm">
          <div>Address: {short(cardanoAddr) || "—"}</div>
        </div>
      </div>
    </section>
  );
};

export default CardanoWalletSection;
