import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import TopNav from "@/components/layout/TopNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAccount, useBalance } from "wagmi";

import { useWallet as useCardanoWallet } from "@meshsdk/react";
import { toast } from "@/components/ui/use-toast";

// Local storage listings (scaffold)
interface Listing { id: string; name: string; price: number; chain: "Ethereum" | "Solana" | "Cardano"; seller: string; }

const LS_KEY = "kl_market_listings";

const Marketplace = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [chain, setChain] = useState<"Ethereum" | "Solana" | "Cardano">("Ethereum");
  const [listings, setListings] = useState<Listing[]>([]);

  // Wallets
  const { address: evmAddress } = useAccount();
  const { data: evmBalance } = useBalance({ address: evmAddress, unit: "ether", query: { enabled: !!evmAddress } });
  const solAddress = "";
  const { connected: adaConnected, wallet } = useCardanoWallet();
  const [adaAddr, setAdaAddr] = useState("");
  useEffect(() => { (async () => { if (adaConnected && wallet) setAdaAddr(await wallet.getChangeAddress()); else setAdaAddr(""); })(); }, [adaConnected, wallet]);

  const seller = useMemo(() => evmAddress || solAddress || adaAddr || "", [evmAddress, solAddress, adaAddr]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setListings(JSON.parse(raw));
    } catch {}
  }, []);

  const save = (items: Listing[]) => {
    setListings(items);
    try { localStorage.setItem(LS_KEY, JSON.stringify(items)); } catch {}
  };

  const addListing = () => {
    if (!name || !price || !seller) {
      toast({ title: "Missing info", description: "Enter name, price, and connect a wallet." });
      return;
    }
    const item: Listing = { id: crypto.randomUUID(), name, price: Number(price), chain, seller };
    const next = [item, ...listings];
    save(next);
    setName(""); setPrice("");
    toast({ title: "Listed", description: `${item.name} listed for ${item.price} on ${item.chain}` });
  };

  const buy = (id: string) => {
    const item = listings.find((l) => l.id === id);
    if (!item) return;
    // Here you would call chain-specific purchase logic.
    save(listings.filter((l) => l.id !== id));
    toast({ title: "Purchased", description: `You bought ${item.name} for ${item.price}` });
  };

  function short(addr?: string, left = 6, right = 4) {
    if (!addr) return ""; return addr.length > left + right ? `${addr.slice(0, left)}…${addr.slice(-right)}` : addr;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Marketplace – KarbonLedger CETP</title>
        <meta name="description" content="Discover, buy, or retire environmental credits with impact summaries." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : '/marketplace'} />
      </Helmet>
      <TopNav />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-10 grid gap-6">
          <header>
            <h1 className="text-3xl font-bold">Credits Marketplace</h1>
            <p className="text-muted-foreground">List or buy credits. Test scaffold, no on-chain settlement yet.</p>
          </header>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Create Listing</CardTitle>
                <CardDescription>Provide details and choose a chain.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-4 items-end">
                <div className="md:col-span-2">
                  <label className="text-sm">Name</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., CETP CO₂e Credit #001" />
                </div>
                <div>
                  <label className="text-sm">Price</label>
                  <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g., 100" />
                </div>
                <div>
                  <label className="text-sm">Chain</label>
                  <Select value={chain} onValueChange={(v) => setChain(v as any)}>
                    <SelectTrigger><SelectValue placeholder="Select chain" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ethereum">Ethereum</SelectItem>
                      <SelectItem value="Solana">Solana</SelectItem>
                      <SelectItem value="Cardano">Cardano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-4 flex justify-end">
                  <Button variant="hero" onClick={addListing}>List Credit</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Wallets</CardTitle>
                <CardDescription>Used as seller address.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>Ethereum: {short(evmAddress) || "—"} {evmAddress ? `(ETH ${evmBalance ? Number(evmBalance.formatted).toFixed(4) : "…"})` : ""}</div>
                <div>Solana: {short(solAddress) || "—"}</div>
                <div>Cardano: {short(adaAddr) || "—"}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Active Listings</CardTitle>
              <CardDescription>Local demo data only.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {listings.length === 0 && <p className="text-muted-foreground text-sm">No listings yet.</p>}
              {listings.map((l) => (
                <div key={l.id} className="flex items-center justify-between rounded-md border p-3">
                  <div>
                    <div className="font-medium">{l.name}</div>
                    <div className="text-xs text-muted-foreground">{l.chain} • Seller {short(l.seller)}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-semibold">{l.price}</div>
                    <Button variant="secondary" onClick={() => buy(l.id)}>Buy</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Marketplace;
