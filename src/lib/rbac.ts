export const roles = [
  "Operator",
  "Regulator",
  "Verifier",
  "Buyer",
  "DAO Member",
  "Investor",
  "Trainer",
] as const;

export type Role = typeof roles[number];

export const defaultDashboardForRole: Record<Role, string> = {
  Operator: "/dashboard/operator",
  Regulator: "/dashboard/regulator",
  Verifier: "/mrv",
  Buyer: "/marketplace",
  "DAO Member": "/governance",
  Investor: "/funding",
  Trainer: "/learning",
};

// Define which roles can access each route (use prefixes for groups)
export const routeAccess: Record<string, Role[]> = {
  "/dashboard/operator": ["Operator"],
  "/dashboard/regulator": ["Regulator"],
  "/mrv": ["Regulator", "Verifier"],
  "/credits": ["Regulator", "Verifier"],
  "/marketplace": ["Buyer", "Investor"],
  "/governance": ["DAO Member"],
  "/funding": ["DAO Member", "Investor"],
  "/learning": ["Operator", "Trainer"],
  "/profile": roles as unknown as Role[],
};

export function canAccess(role: Role, path: string): boolean {
  // Match by exact path or by the longest matching prefix
  let allowed: Role[] | undefined = routeAccess[path];
  if (!allowed) {
    const match = Object.keys(routeAccess)
      .filter((p) => path.startsWith(p))
      .sort((a, b) => b.length - a.length)[0];
    if (match) allowed = routeAccess[match];
  }
  return allowed ? allowed.includes(role) : false;
}
