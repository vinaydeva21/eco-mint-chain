import { useCallback, useMemo, useState } from "react";
import { getPledges, seedProjects, setPledges } from "./data";
import type { Donor, FundingFilters, Project } from "./types";

export function useFunding() {
  const [projects, setProjects] = useState<Project[]>(seedProjects);
  const [filters, setFilters] = useState<FundingFilters>({});
  const [pledges, setPledgesState] = useState(getPledges());

  const filtered = useMemo(() => {
    let list = [...projects];
    if (filters.region) list = list.filter((p) => p.region === filters.region);
    if (filters.category) list = list.filter((p) => p.category === filters.category);
    switch (filters.sort) {
      case "target":
        list.sort((a, b) => b.targetUSD - a.targetUSD);
        break;
      case "raised":
        list.sort((a, b) => b.raisedUSD - a.raisedUSD);
        break;
      default:
        list.sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [projects, filters]);

  const pledge = useCallback((projectId: string, amountUSD: number, donorName: string) => {
    setProjects((prev) => prev.map((p) => (p.id === projectId ? { ...p, raisedUSD: p.raisedUSD + amountUSD, donors: [{ name: donorName, amountUSD, timestamp: new Date().toISOString() }, ...p.donors] } : p)));

    const d: Donor = { name: donorName, amountUSD, timestamp: new Date().toISOString() };
    const next = { ...pledges, [projectId]: [d, ...(pledges[projectId] ?? [])] };
    setPledges(next);
    setPledgesState(next);
  }, [pledges]);

  const clearFilters = useCallback(() => setFilters({}), []);

  return { projects, filtered, filters, setFilters, clearFilters, pledge };
}
