import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Proposal, VoteSide } from "../types";
import type { VoteMap } from "../data";
import { useToast } from "@/hooks/use-toast";

export default function ProposalDialog({
  open,
  onOpenChange,
  proposal,
  votes,
  getAvailableForProposal,
  castVote,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  proposal: (Proposal & { combinedTally: { yes: number; no: number; abstain: number }; turnoutPct: number; quorumMet: boolean }) | null;
  votes: VoteMap;
  getAvailableForProposal: (proposalId: string) => number;
  castVote: (proposalId: string, side: VoteSide, weight: number) => void;
}) {
  const { toast } = useToast();
  const [weight, setWeight] = useState<number>(0);

  const available = useMemo(() => (proposal ? getAvailableForProposal(proposal.id) : 0), [proposal, getAvailableForProposal]);
  const existing = proposal ? votes[proposal.id] : undefined;

  const handleVote = async (side: VoteSide) => {
    if (!proposal) return;
    try {
      castVote(proposal.id, side, weight || available);
      toast({ title: "Vote submitted", description: `Cast ${weight || available} KLD to ${side.toUpperCase()} on ${proposal.title}` });
      onOpenChange(false);
    } catch (e: any) {
      toast({ title: "Cannot cast vote", description: e.message });
    }
  };

  if (!proposal) return null;

  const total = proposal.combinedTally.yes + proposal.combinedTally.no + proposal.combinedTally.abstain;
  const pct = (v: number) => (total ? Math.round((v / total) * 100) : 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{proposal.title}</DialogTitle>
          <DialogDescription>{proposal.summary}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Voting window: {new Date(proposal.startsAt).toLocaleString()} – {new Date(proposal.endsAt).toLocaleString()}</p>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div>
              <div className="flex justify-between text-xs text-muted-foreground"><span>Yes</span><span>{pct(proposal.combinedTally.yes)}%</span></div>
              <div className="h-2 w-full overflow-hidden rounded bg-muted"><div className="h-full bg-primary" style={{ width: `${pct(proposal.combinedTally.yes)}%` }} /></div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-muted-foreground"><span>No</span><span>{pct(proposal.combinedTally.no)}%</span></div>
              <div className="h-2 w-full overflow-hidden rounded bg-muted"><div className="h-full bg-destructive" style={{ width: `${pct(proposal.combinedTally.no)}%` }} /></div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-muted-foreground"><span>Abstain</span><span>{pct(proposal.combinedTally.abstain)}%</span></div>
              <div className="h-2 w-full overflow-hidden rounded bg-muted"><div className="h-full bg-secondary" style={{ width: `${pct(proposal.combinedTally.abstain)}%` }} /></div>
            </div>
          </div>

          <div className="rounded-md border p-3">
            <div className="mb-2 text-sm text-muted-foreground">Available voting power for this proposal: <span className="font-medium text-foreground">{available}</span> KLD</div>
            {existing && (
              <div className="mb-2 text-xs text-muted-foreground">Existing vote: {existing.weight} to {existing.side.toUpperCase()}</div>
            )}
            <div className="flex items-center gap-2">
              <Input type="number" min={1} max={available} value={weight || ""} onChange={(e) => setWeight(Number(e.target.value))} placeholder={`Amount (max ${available})`} className="max-w-[200px]" />
              <Button variant="secondary" onClick={() => setWeight(available)}>Max</Button>
            </div>
            <div className="mt-3 flex gap-2">
              <Button onClick={() => handleVote("yes")}>Vote Yes</Button>
              <Button variant="destructive" onClick={() => handleVote("no")}>Vote No</Button>
              <Button variant="outline" onClick={() => handleVote("abstain")}>Abstain</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
