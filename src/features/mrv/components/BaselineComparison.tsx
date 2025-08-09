import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Metric } from "../types";
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Props {
  data: Metric[];
}

const BaselineComparison: React.FC<Props> = ({ data }) => {
  const chartData = data.map((m) => ({ name: m.name, Baseline: m.baseline, Current: m.current }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Baselines vs Current Performance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Baseline" fill="hsl(var(--muted-foreground))" />
              <Bar dataKey="Current" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead>Baseline</TableHead>
                <TableHead>Current</TableHead>
                <TableHead>Delta</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((m) => {
                const delta = m.current - m.baseline;
                const improved = delta < 0; // lower is better here
                return (
                  <TableRow key={m.key}>
                    <TableCell className="font-medium">{m.name} ({m.unit})</TableCell>
                    <TableCell>{m.baseline}</TableCell>
                    <TableCell>{m.current}</TableCell>
                    <TableCell>
                      <Badge variant={improved ? "secondary" : "destructive"}>
                        {improved ? "Improved" : "Worse"} {Math.abs(delta)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default BaselineComparison;
