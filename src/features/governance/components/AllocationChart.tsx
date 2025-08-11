import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";
import type { Allocation } from "../types";

const COLORS = ["#6E56CF", "#0EA5E9", "#10B981", "#F59E0B"]; // chart-only colors

export default function AllocationChart({ allocations }: { allocations: Allocation[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fund Allocations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={allocations} dataKey="percent" nameKey="program" innerRadius={60} outerRadius={100}>
                {allocations.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          {allocations.map((a, i) => (
            <li key={a.program} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
              <span>{a.program}</span>
              <span className="ml-auto font-medium text-foreground">{a.percent}%</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
