import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import type { FundingFilters } from "../types";

const regions = ["South Asia", "East Africa", "Latin America"];
const categories = ["Upgrades", "Pilot", "MRV"];

export default function FundingFilters({
  filters,
  setFilters,
  clearFilters,
}: {
  filters: FundingFilters;
  setFilters: React.Dispatch<React.SetStateAction<FundingFilters>>;
  clearFilters: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select value={filters.region} onValueChange={(v) => setFilters((f) => ({ ...f, region: v }))}>
        <SelectTrigger className="w-[180px]"><SelectValue placeholder="Region" /></SelectTrigger>
        <SelectContent>
          {regions.map((r) => (
            <SelectItem value={r} key={r}>{r}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.category} onValueChange={(v) => setFilters((f) => ({ ...f, category: v }))}>
        <SelectTrigger className="w-[180px]"><SelectValue placeholder="Category" /></SelectTrigger>
        <SelectContent>
          {categories.map((c) => (
            <SelectItem value={c} key={c}>{c}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="h-6" />

      <Select value={filters.sort} onValueChange={(v) => setFilters((f) => ({ ...f, sort: v as FundingFilters["sort"] }))}>
        <SelectTrigger className="w-[180px]"><SelectValue placeholder="Sort by" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Alphabetical</SelectItem>
          <SelectItem value="target">Target</SelectItem>
          <SelectItem value="raised">Raised</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" onClick={clearFilters}>Clear</Button>
    </div>
  );
}
