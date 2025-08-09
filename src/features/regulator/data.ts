import type { CETP, Incident } from "./types";

export const cetps: CETP[] = [
  { id: "cetp-01", name: "Green Valley CETP", region: "West", lat: 19.076, lng: 72.8777, complianceScore: 92, status: "Compliant" },
  { id: "cetp-02", name: "Riverfront CETP", region: "North", lat: 28.6139, lng: 77.209, complianceScore: 74, status: "Warning" },
  { id: "cetp-03", name: "Coastal CETP", region: "South", lat: 12.9716, lng: 77.5946, complianceScore: 61, status: "Warning" },
  { id: "cetp-04", name: "Industrial Park CETP", region: "East", lat: 22.5726, lng: 88.3639, complianceScore: 49, status: "Breach" },
  { id: "cetp-05", name: "Highlands CETP", region: "Central", lat: 23.2599, lng: 77.4126, complianceScore: 88, status: "Compliant" },
  { id: "cetp-06", name: "Delta CETP", region: "South", lat: 13.0827, lng: 80.2707, complianceScore: 97, status: "Compliant" },
];

export const incidents: Incident[] = [
  { id: "inc-1001", cetpId: "cetp-02", facility: "Riverfront CETP", date: "2025-06-18", severity: "High", status: "Open", description: "TSS levels exceeded for 2 consecutive days." },
  { id: "inc-1002", cetpId: "cetp-04", facility: "Industrial Park CETP", date: "2025-06-15", severity: "Medium", status: "Investigating", description: "Non-compliant discharge reported by sensor cluster B." },
  { id: "inc-1003", cetpId: "cetp-03", facility: "Coastal CETP", date: "2025-06-10", severity: "Low", status: "Resolved", description: "Temporary pH drift corrected within 4 hours." },
  { id: "inc-1004", cetpId: "cetp-01", facility: "Green Valley CETP", date: "2025-06-02", severity: "Low", status: "Resolved", description: "Scheduled maintenance delayed reporting window." },
];
