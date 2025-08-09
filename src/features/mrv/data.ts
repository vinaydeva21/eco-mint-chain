import type { Metric } from "./types";

export const metrics: Metric[] = [
  { key: "cod", name: "COD", unit: "mg/L", baseline: 250, current: 180 },
  { key: "bod", name: "BOD", unit: "mg/L", baseline: 30, current: 22 },
  { key: "tss", name: "TSS", unit: "mg/L", baseline: 200, current: 120 },
  { key: "co2e", name: "CO₂e", unit: "tCO₂e/mo", baseline: 140, current: 95 },
];
