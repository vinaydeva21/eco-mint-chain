import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import type { FilterState, CreditType } from "../types";

interface Props {
  value: FilterState;
  onChange: (v: FilterState) => void;
  regions: string[];
  issuers: string[];
}

const types: ("All" | CreditType)[] = ["All", "Carbon", "Water"];

export default function Filters({ value, onChange, regions, issuers }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-6 items-end">
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="Search credits, issuers, methods"
          value={value.search}
          onChange={(e) => onChange({ ...value, search: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Type</Label>
        <Select value={value.type} onValueChange={(v) => onChange({ ...value, type: v as any })}>
          <SelectTrigger>
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            {types.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Region</Label>
        <Select value={value.region} onValueChange={(v) => onChange({ ...value, region: v })}>
          <SelectTrigger>
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            {regions.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Issuer</Label>
        <Select value={value.issuer} onValueChange={(v) => onChange({ ...value, issuer: v })}>
          <SelectTrigger>
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            {issuers.map((i) => (
              <SelectItem key={i} value={i}>
                {i}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label>Max price (USD): {value.maxPrice}</Label>
        <Slider
          value={[value.maxPrice]}
          min={0}
          max={50}
          step={1}
          onValueChange={(vals) => onChange({ ...value, maxPrice: vals[0] ?? value.maxPrice })}
        />
      </div>

      <div className="space-y-2">
        <Label>Sort</Label>
        <Select value={value.sort} onValueChange={(v) => onChange({ ...value, sort: v as any })}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating-desc">Top rated</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest vintage</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
