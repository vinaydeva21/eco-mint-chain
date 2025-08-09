import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { CETP } from "../types";

interface ESGReportProps {
  cetps: CETP[];
}

const ESGReport: React.FC<ESGReportProps> = ({ cetps }) => {
  const total = cetps.length;
  const compliant = cetps.filter((c) => c.status === "Compliant").length;
  const warning = cetps.filter((c) => c.status === "Warning").length;
  const breach = cetps.filter((c) => c.status === "Breach").length;
  const avgCompliance = Math.round(
    (cetps.reduce((a, c) => a + c.complianceScore, 0) / Math.max(total, 1)) * 10
  ) / 10;

  const data = {
    generatedAt: new Date().toISOString(),
    summary: { total, compliant, warning, breach, avgCompliance },
    facilities: cetps,
  };

  const download = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `esg-report-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ESG Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total CETPs</p>
            <p className="text-2xl font-semibold">{total}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Compliant</p>
            <p className="text-2xl font-semibold">{compliant}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Warnings</p>
            <p className="text-2xl font-semibold">{warning}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Breaches</p>
            <p className="text-2xl font-semibold">{breach}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Avg. compliance score</p>
          <p className="text-xl font-semibold">{avgCompliance}</p>
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={download}>Download ESG JSON</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ESGReport;
