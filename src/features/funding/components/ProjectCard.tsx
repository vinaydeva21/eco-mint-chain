import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "../types";

export default function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const pct = Math.min(100, Math.round((project.raisedUSD / project.targetUSD) * 100));
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-xl">{project.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{project.region} • {project.category}</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">{project.region}</Badge>
            <Badge>{project.category}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Raised</span>
          <span className="font-medium">${project.raisedUSD.toLocaleString()} / ${project.targetUSD.toLocaleString()}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded bg-muted"><div className="h-full bg-primary" style={{ width: `${pct}%` }} /></div>
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <div>Impact: <span className="font-medium text-foreground">{project.impact.co2eTons.toLocaleString()} tCO₂e</span></div>
          <div>Households: <span className="font-medium text-foreground">{project.impact.households.toLocaleString()}</span></div>
        </div>
        <Button onClick={() => onOpen(project)}>View & Pledge</Button>
      </CardContent>
    </Card>
  );
}
