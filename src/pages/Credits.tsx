import { Helmet } from "react-helmet-async";
import TopNav from "@/components/layout/TopNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useMemo, useState } from "react";

// --- Types & mock data

type CreditType = "WATER_QUALITY" | "GHG_REDUCTION";

type Project = {
  id: string;
  name: string;
  description: string;
  location: string;
  creditTypes: CreditType[];
};

type MintedCredit = {
  id: string;
  projectId: string;
  type: CreditType;
  amount: number;
  metadata: string;
  hash: string;
  timestamp: string;
};

const projects: Project[] = [
  { id: "p-1", name: "Riverfront Upgrade", description: "Aeration and clarifier modernization for improved COD/BOD.", location: "North Region", creditTypes: ["WATER_QUALITY", "GHG_REDUCTION"] },
  { id: "p-2", name: "Energy Optimization", description: "VFDs and high-efficiency pumps lowering CO₂e footprint.", location: "West Region", creditTypes: ["GHG_REDUCTION"] },
  { id: "p-3", name: "Sludge Management", description: "Anaerobic digestion with biogas recovery.", location: "South Region", creditTypes: ["WATER_QUALITY"] },
];

// --- Helpers
async function sha256Hex(input: string): Promise<string> {
  const enc = new TextEncoder();
  const bytes = enc.encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  const hashArray = Array.from(new Uint8Array(digest));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

const LEDGER_KEY = "minted_credits_ledger";

const Credits = () => {
  const [ledger, setLedger] = useState<MintedCredit[]>(() => {
    const raw = localStorage.getItem(LEDGER_KEY);
    return raw ? (JSON.parse(raw) as MintedCredit[]) : [];
  });

  useEffect(() => {
    localStorage.setItem(LEDGER_KEY, JSON.stringify(ledger));
  }, [ledger]);

  const [form, setForm] = useState({ projectId: projects[0].id, type: projects[0].creditTypes[0], amount: 100, metadata: "" });

  const selectedProject = useMemo(() => projects.find((p) => p.id === form.projectId)!, [form.projectId]);

  useEffect(() => {
    // ensure selected credit type is valid for project
    if (!selectedProject.creditTypes.includes(form.type)) {
      setForm((f) => ({ ...f, type: selectedProject.creditTypes[0] }));
    }
  }, [selectedProject]);

  const mint = async () => {
    const payload = { projectId: form.projectId, type: form.type, amount: form.amount, metadata: form.metadata, at: new Date().toISOString() };
    const hash = await sha256Hex(JSON.stringify(payload));
    const minted: MintedCredit = {
      id: `${Date.now()}`,
      projectId: form.projectId,
      type: form.type,
      amount: form.amount,
      metadata: form.metadata,
      hash,
      timestamp: new Date().toISOString(),
    };
    setLedger((prev) => [minted, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Credit Issuance – KarbonLedger CETP</title>
        <meta name="description" content="Mint water quality and GHG reduction credits with on-chain style hash records." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : '/credits'} />
      </Helmet>
      <TopNav />
      <main className="flex-1">
        <header className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-semibold tracking-tight">Credit Issuance</h1>
          <p className="text-muted-foreground mt-1">Project details, credit types, minting, and blockchain-style hash display.</p>
        </header>

        <section className="container mx-auto px-4 grid gap-6 lg:grid-cols-3 pb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Mint Credits</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project">Project</Label>
                  <select
                    id="project"
                    className="w-full rounded-md border bg-background p-2"
                    value={form.projectId}
                    onChange={(e) => setForm((f) => ({ ...f, projectId: e.target.value }))}
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>{p.name} — {p.location}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Credit type</Label>
                  <select
                    id="type"
                    className="w-full rounded-md border bg-background p-2"
                    value={form.type}
                    onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as CreditType }))}
                  >
                    {selectedProject.creditTypes.map((t) => (
                      <option key={t} value={t}>{t.replace("_", " ")}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: Number(e.target.value) }))} />
                </div>
                <div className="space-y-2">
                  <Label>Hash Preview</Label>
                  <code className="block rounded-md bg-muted p-3 text-xs break-all">SHA-256 of payload generated on mint</code>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="metadata">Metadata</Label>
                <Textarea id="metadata" value={form.metadata} onChange={(e) => setForm((f) => ({ ...f, metadata: e.target.value }))} placeholder="Optional notes, references, sensor batch IDs, etc." />
              </div>
              <div className="flex justify-end">
                <Button onClick={mint}>Mint</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {projects.map((p) => (
                <div key={p.id} className="rounded-md border p-3">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-sm text-muted-foreground">{p.location}</div>
                  <div className="text-sm mt-1">{p.description}</div>
                  <div className="text-xs text-muted-foreground mt-1">Types: {p.creditTypes.join(", ")}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="container mx-auto px-4 pb-12">
          <Card>
            <CardHeader>
              <CardTitle>Minted Credits (Local Ledger)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {ledger.length === 0 && (
                <p className="text-sm text-muted-foreground">No credits minted yet.</p>
              )}
              {ledger.map((c) => (
                <div key={c.id} className="rounded-md border p-3">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-medium">{projects.find((p) => p.id === c.projectId)?.name}</div>
                      <div className="text-xs text-muted-foreground">{c.type} • {c.amount}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{new Date(c.timestamp).toLocaleString()}</div>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm text-muted-foreground">Hash</span>
                    <code className="block rounded-md bg-muted p-3 text-xs break-all">{c.hash}</code>
                  </div>
                  {c.metadata && (
                    <div className="mt-2 text-sm">{c.metadata}</div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Credits;
