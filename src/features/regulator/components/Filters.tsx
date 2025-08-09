import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import type { CETPStatus } from "../types";

export type FilterState = {
  search: string;
  status: "All" | CETPStatus;
};

interface FiltersProps {
  value: FilterState;
  onChange: (next: FilterState) => void;
}

const Filters: React.FC<FiltersProps> = ({ value, onChange }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="search">Search CETP</Label>
        <Input
          id="search"
          value={value.search}
          onChange={(e) => onChange({ ...value, search: e.target.value })}
          placeholder="Search by name or region"
        />
      </div>
      <div className="space-y-2">
        <Label>Status</Label>
        <Select
          value={value.status}
          onValueChange={(v) => onChange({ ...value, status: v as FilterState["status"] })}
        >
          <SelectTrigger>
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Compliant">Compliant</SelectItem>
            <SelectItem value="Warning">Warning</SelectItem>
            <SelectItem value="Breach">Breach</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Filters;
