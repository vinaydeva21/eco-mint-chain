import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const GovernanceHeader = ({
  balance,
  activeCount,
  quorumPercent,
  onAddTokens,
}: {
  balance: number;
  activeCount: number;
  quorumPercent: number;
  onAddTokens: (amount: number) => void;
}) => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <header className="mb-4">
        <h1 className="text-3xl font-semibold">Governance & DAO</h1>
        <p className="text-muted-foreground">Token-weighted voting and allocations. Quorum {quorumPercent}%.</p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Token Balance</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{balance.toLocaleString()} KLD</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Proposals</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <span className="text-2xl font-semibold">{activeCount}</span>
            <Badge variant="secondary">Open</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Demo Controls</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <Button size="sm" onClick={() => onAddTokens(1000)}>Add 1,000 KLD</Button>
            <Button size="sm" variant="outline" onClick={() => onAddTokens(10000)}>Add 10,000 KLD</Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default GovernanceHeader;
