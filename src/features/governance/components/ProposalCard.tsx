import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Proposal } from "../types";

type Props = {
  proposal: Proposal & { combinedTally: { yes: number; no: number; abstain: number }; turnoutPct: number; quorumMet: boolean };
  onOpen: (proposal: Props["proposal"]) => void;
};

const statusVariant: Record<Proposal["status"], "default" | "secondary" | "destructive" | "outline"> = {
  Active: "default",
  Passed: "secondary",
  Rejected: "destructive",
  Closed: "outline",
};

export default function ProposalCard({ proposal, onOpen }: Props) {
  const total = proposal.combinedTally.yes + proposal.combinedTally.no + proposal.combinedTally.abstain;
  const yesPct = total ? Math.round((proposal.combinedTally.yes / total) * 100) : 0;
  const noPct = total ? Math.round((proposal.combinedTally.no / total) * 100) : 0;
  const abstainPct = total ? Math.round((proposal.combinedTally.abstain / total) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-xl">{proposal.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{proposal.summary}</p>
          </div>
          <Badge variant={statusVariant[proposal.status]}>{proposal.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Turnout</span>
          <span className="font-medium">{proposal.turnoutPct}%</span>
          {proposal.quorumMet ? (
            <span className="text-xs text-muted-foreground">• Quorum met</span>
          ) : (
            <span className="text-xs text-muted-foreground">• Quorum {"<"} target</span>
          )}
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground"><span>Yes</span><span>{yesPct}%</span></div>
          <div className="h-2 w-full overflow-hidden rounded bg-muted"><div className="h-full bg-primary" style={{ width: `${yesPct}%` }} /></div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground"><span>No</span><span>{noPct}%</span></div>
          <div className="h-2 w-full overflow-hidden rounded bg-muted"><div className="h-full bg-destructive" style={{ width: `${noPct}%` }} /></div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground"><span>Abstain</span><span>{abstainPct}%</span></div>
          <div className="h-2 w-full overflow-hidden rounded bg-muted"><div className="h-full bg-secondary" style={{ width: `${abstainPct}%` }} /></div>
        </div>
        <Button className="mt-2" onClick={() => onOpen(proposal)} disabled={proposal.status !== "Active"}>View & Vote</Button>
      </CardContent>
    </Card>
  );
}
