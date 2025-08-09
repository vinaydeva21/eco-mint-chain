import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Metric } from "../types";

async function sha256Hex(input: string): Promise<string> {
  const enc = new TextEncoder();
  const bytes = enc.encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  const hashArray = Array.from(new Uint8Array(digest));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

interface Props {
  metrics: Metric[];
}

const ZKProofSimulator: React.FC<Props> = ({ metrics }) => {
  const [nonce, setNonce] = useState("");
  const [hash, setHash] = useState<string>("");

  const payload = useMemo(() => ({
    type: "mrv-proof",
    at: new Date().toISOString(),
    metrics: metrics.map(({ key, current }) => ({ key, current })),
    nonce,
  }), [metrics, nonce]);

  useEffect(() => {
    sha256Hex(JSON.stringify(payload)).then(setHash);
  }, [payload]);

  const copy = async () => {
    await navigator.clipboard.writeText(hash);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ZKP Proof (simulated hash)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <span className="text-sm text-muted-foreground">Nonce (optional)</span>
          <Input value={nonce} onChange={(e) => setNonce(e.target.value)} placeholder="Add salt/nonce" />
        </div>
        <div className="grid gap-2">
          <span className="text-sm text-muted-foreground">Hash (SHA-256 of payload)</span>
          <code className="block rounded-md bg-muted p-3 break-all text-xs">{hash}</code>
        </div>
        <div className="flex justify-end">
          <Button onClick={copy}>Copy hash</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ZKProofSimulator;
