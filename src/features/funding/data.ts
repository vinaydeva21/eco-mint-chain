import type { Donor, Project } from "./types";

const LS_PLEDGES = "funding_pledges"; // Record<projectId, Donor[]>

export const seedProjects: Project[] = [
  {
    id: "f1",
    title: "Aeration Upgrade - CETP Cluster A",
    region: "South Asia",
    category: "Upgrades",
    targetUSD: 250_000,
    raisedUSD: 92_500,
    impact: { co2eTons: 1800, households: 1200 },
    tags: ["energy", "efficiency"],
    description:
      "Replace legacy blowers with high-efficiency units and optimize dissolved oxygen control, reducing energy by 35%.",
    milestones: [
      { id: "m1", title: "Design & Specs", targetDate: new Date(Date.now() + 86400e3 * 30).toISOString(), status: "in_progress", progress: 60 },
      { id: "m2", title: "Procurement", targetDate: new Date(Date.now() + 86400e3 * 60).toISOString(), status: "pending", progress: 0 },
      { id: "m3", title: "Commissioning", targetDate: new Date(Date.now() + 86400e3 * 120).toISOString(), status: "pending", progress: 0 },
    ],
    donors: [
      { name: "GreenFund", amountUSD: 25_000, timestamp: new Date(Date.now() - 86400e3 * 2).toISOString() },
      { name: "AquaDAO", amountUSD: 15_000, timestamp: new Date(Date.now() - 86400e3 * 1).toISOString() },
    ],
  },
  {
    id: "f2",
    title: "Sludge Management Pilot - Cluster B",
    region: "East Africa",
    category: "Pilot",
    targetUSD: 120_000,
    raisedUSD: 48_300,
    impact: { co2eTons: 950, households: 600 },
    tags: ["sludge", "pilot"],
    description: "Pilot decentralized sludge drying beds with improved pathogen reduction and odor control.",
    milestones: [
      { id: "m1", title: "Site Prep", targetDate: new Date(Date.now() + 86400e3 * 20).toISOString(), status: "in_progress", progress: 40 },
      { id: "m2", title: "Construction", targetDate: new Date(Date.now() + 86400e3 * 70).toISOString(), status: "pending", progress: 0 },
    ],
    donors: [
      { name: "BlueCarbon", amountUSD: 10_000, timestamp: new Date(Date.now() - 86400e3 * 3).toISOString() },
    ],
  },
  {
    id: "f3",
    title: "MRV Sensors Rollout - Cluster C",
    region: "Latin America",
    category: "MRV",
    targetUSD: 180_000,
    raisedUSD: 76_100,
    impact: { co2eTons: 1200, households: 800 },
    tags: ["sensors", "mrv"],
    description: "Deploy inline sensors and telemetry for continuous monitoring and ZK proof generation.",
    milestones: [
      { id: "m1", title: "Procurement", targetDate: new Date(Date.now() + 86400e3 * 15).toISOString(), status: "in_progress", progress: 30 },
      { id: "m2", title: "Install & Calibrate", targetDate: new Date(Date.now() + 86400e3 * 80).toISOString(), status: "pending", progress: 0 },
    ],
    donors: [],
  },
];

export type PledgeMap = Record<string, Donor[]>;

export function getPledges(): PledgeMap {
  try {
    const raw = localStorage.getItem(LS_PLEDGES);
    return raw ? (JSON.parse(raw) as PledgeMap) : {};
  } catch {
    return {};
  }
}

export function setPledges(map: PledgeMap) {
  localStorage.setItem(LS_PLEDGES, JSON.stringify(map));
}
