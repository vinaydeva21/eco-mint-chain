import { useCallback, useMemo, useState } from "react";
import { QUORUM_PERCENT, TOTAL_SUPPLY, getDaoBalance, getUserVotes, seedAllocations, seedProposals, setDaoBalance, setUserVotes, tallyTotal, mergeTallies } from "./data";
import type { Allocation, Proposal, VoteSide } from "./types";

export function useGovernance() {
  const [proposals, setProposals] = useState<Proposal[]>(seedProposals);
  const [allocations] = useState<Allocation[]>(seedAllocations);
  const [balance, setBalance] = useState<number>(getDaoBalance());
  const [votes, setVotes] = useState(() => getUserVotes());

  const activeProposals = useMemo(
    () => proposals.filter((p) => p.status === "Active"),
    [proposals]
  );

  const derived = useMemo(() => {
    return proposals.map((p) => {
      const userVote = votes[p.id];
      const combined = mergeTallies(p.seedTally, userVote);
      const total = tallyTotal(combined);
      const turnoutPct = Math.round((total / TOTAL_SUPPLY) * 1000) / 10; // 0.1% precision
      const quorumMet = turnoutPct >= QUORUM_PERCENT;
      return { ...p, combinedTally: combined, turnoutPct, quorumMet } as Proposal & {
        combinedTally: { yes: number; no: number; abstain: number };
        turnoutPct: number;
        quorumMet: boolean;
      };
    });
  }, [proposals, votes]);

  const getAvailableForProposal = useCallback(
    (proposalId: string) => {
      const used = votes[proposalId]?.weight ?? 0;
      return Math.max(0, balance - used);
    },
    [balance, votes]
  );

  const addTokens = useCallback((amount: number) => {
    const next = balance + amount;
    setBalance(next);
    setDaoBalance(next);
  }, [balance]);

  const castVote = useCallback(
    (proposalId: string, side: VoteSide, weight: number) => {
      const available = getAvailableForProposal(proposalId);
      if (weight <= 0) throw new Error("Weight must be > 0");
      if (weight > available) throw new Error("Insufficient voting power for this proposal");

      const nextVotes = { ...votes, [proposalId]: { proposalId, side, weight } };
      setVotes(nextVotes);
      setUserVotes(nextVotes);
    },
    [getAvailableForProposal, votes]
  );

  return {
    balance,
    addTokens,
    proposals: derived,
    activeProposals: derived.filter((p) => p.status === "Active"),
    allocations,
    votes,
    getAvailableForProposal,
    castVote,
    quorumPercent: QUORUM_PERCENT,
  };
}
