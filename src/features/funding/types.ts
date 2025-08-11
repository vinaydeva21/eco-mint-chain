export type MilestoneStatus = "pending" | "in_progress" | "verified";

export type Milestone = {
  id: string;
  title: string;
  targetDate: string; // ISO
  status: MilestoneStatus;
  progress: number; // 0..100
};

export type Donor = {
  name: string;
  amountUSD: number;
  timestamp: string; // ISO
};

export type Project = {
  id: string;
  title: string;
  region: string;
  category: string;
  targetUSD: number;
  raisedUSD: number;
  impact: { co2eTons: number; households: number };
  tags: string[];
  description: string;
  milestones: Milestone[];
  donors: Donor[];
};

export type FundingFilters = {
  region?: string;
  category?: string;
  sort?: "newest" | "target" | "raised";
};
