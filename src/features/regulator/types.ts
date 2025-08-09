export type CETPStatus = "Compliant" | "Warning" | "Breach";

export type CETP = {
  id: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  complianceScore: number; // 0-100
  status: CETPStatus;
};

export type IncidentSeverity = "Low" | "Medium" | "High";
export type IncidentStatus = "Open" | "Investigating" | "Resolved";

export type Incident = {
  id: string;
  cetpId: string;
  facility: string;
  date: string; // ISO
  severity: IncidentSeverity;
  status: IncidentStatus;
  description: string;
};
