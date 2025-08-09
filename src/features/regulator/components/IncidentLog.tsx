import React from "react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Incident } from "../types";

interface IncidentLogProps {
  incidents: Incident[];
}

const severityVariant: Record<Incident["severity"], string> = {
  Low: "outline",
  Medium: "secondary",
  High: "destructive",
};

const statusTone: Record<Incident["status"], string> = {
  Open: "destructive",
  Investigating: "secondary",
  Resolved: "default",
};

const IncidentLog: React.FC<IncidentLogProps> = ({ incidents }) => {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableCaption>ESG incident log across CETPs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Facility</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incidents.map((i) => (
            <TableRow key={i.id}>
              <TableCell className="whitespace-nowrap">{new Date(i.date).toLocaleDateString()}</TableCell>
              <TableCell className="font-medium">{i.facility}</TableCell>
              <TableCell>
                <Badge variant={severityVariant[i.severity]}>{i.severity}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={statusTone[i.status] as any}>{i.status}</Badge>
              </TableCell>
              <TableCell className="max-w-[480px] truncate" title={i.description}>
                {i.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default IncidentLog;
