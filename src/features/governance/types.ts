export type ProposalStatus = "Active" | "Passed" | "Rejected" | "Closed";

export type Tally = {
  yes: number;
  no: number;
  abstain: number;
};

export type Proposal = {
  id: string;
  title: string;
  summary: string;
  description: string;
  status: ProposalStatus;
  startsAt: string; // ISO
  endsAt: string; // ISO
  seedTally: Tally; // baseline community tally
};

export type Allocation = {
  program: string;
  percent: number; // 0-100
};

export type VoteSide = "yes" | "no" | "abstain";

export type Vote = {
  proposalId: string;
  side: VoteSide;
  weight: number; // token-weighted
};
