import type { Allocation, Proposal, Tally, Vote } from "./types";

const LS_BALANCE = "gov_balance";
const LS_VOTES = "gov_votes"; // Record<proposalId, Vote>

export const TOTAL_SUPPLY = 100_000; // mock
export const QUORUM_PERCENT = 10; // % of total supply required

export const seedProposals: Proposal[] = [
  {
    id: "p1",
    title: "Allocate 40% to CETP Upgrades Q4",
    summary: "Increase upgrade budget to accelerate emission reductions across clusters.",
    description:
      "This proposal allocates 40% of the treasury to CETP infrastructure upgrades for Q4, focusing on aeration optimization, sludge management, and energy-efficient blowers.",
    status: "Active",
    startsAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
    seedTally: { yes: 12500, no: 3200, abstain: 800 },
  },
  {
    id: "p2",
    title: "Create MRV Bounty Program",
    summary: "Incentivize verifiers to audit clusters with bounties paid on proof submission.",
    description:
      "Establish a time-limited MRV bounty program to incentivize rapid verification across priority clusters. Rewards are disbursed upon submission of zero-knowledge proofs.",
    status: "Active",
    startsAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    endsAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
    seedTally: { yes: 7200, no: 1400, abstain: 600 },
  },
  {
    id: "p3",
    title: "Fund Community Outreach",
    summary: "Allocate 10% to community training and awareness programs.",
    description:
      "Dedicate funds to workshops and training for local operators and communities to improve compliance and reporting quality.",
    status: "Passed",
    startsAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
    endsAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    seedTally: { yes: 9800, no: 1200, abstain: 400 },
  },
];

export const seedAllocations: Allocation[] = [
  { program: "Upgrades", percent: 45 },
  { program: "MRV", percent: 25 },
  { program: "Community", percent: 10 },
  { program: "Treasury", percent: 20 },
];

export function getDaoBalance(): number {
  const raw = localStorage.getItem(LS_BALANCE);
  return raw ? Number(raw) : 10_000;
}

export function setDaoBalance(next: number) {
  localStorage.setItem(LS_BALANCE, String(next));
}

export type VoteMap = Record<string, Vote>;

export function getUserVotes(): VoteMap {
  try {
    const raw = localStorage.getItem(LS_VOTES);
    return raw ? (JSON.parse(raw) as VoteMap) : {};
  } catch {
    return {};
  }
}

export function setUserVotes(votes: VoteMap) {
  localStorage.setItem(LS_VOTES, JSON.stringify(votes));
}

export function mergeTallies(seed: Tally, votesForProposal?: Vote): Tally {
  const extra = votesForProposal?.weight ?? 0;
  if (!extra) return seed;
  const side = votesForProposal!.side;
  return {
    yes: seed.yes + (side === "yes" ? extra : 0),
    no: seed.no + (side === "no" ? extra : 0),
    abstain: seed.abstain + (side === "abstain" ? extra : 0),
  };
}

export function tallyTotal(t: Tally) {
  return t.yes + t.no + t.abstain;
}
