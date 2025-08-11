export type CreditType = "Carbon" | "Water";

export type Credit = {
  id: string;
  name: string;
  type: CreditType;
  issuer: string;
  region: string;
  priceUsd: number;
  available: number; // units available
  vintage: number; // year
  methodology: string;
  sdgs: string[];
  summary: string;
  rating: number; // 0-5
};

export type SortOption = "price-asc" | "price-desc" | "rating-desc" | "newest";

export type FilterState = {
  search: string;
  type: "All" | CreditType;
  region: "All" | string;
  issuer: "All" | string;
  maxPrice: number;
  sort: SortOption;
};
