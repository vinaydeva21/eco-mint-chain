import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Project } from "../types";
import { useFunding } from "../useFunding";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ProjectDialog({ open, onOpenChange, project }: { open: boolean; onOpenChange: (v: boolean) => void; project: Project | null }) {
  const { pledge } = useFunding();
  const { toast } = useToast();
  const [amount, setAmount] = useState<number>(0);
  const [name, setName] = useState<string>("");

  if (!project) return null;
  const pct = Math.min(100, Math.round((project.raisedUSD / project.targetUSD) * 100));

  const submit = () => {
    if (amount <= 0 || !name) {
      toast({ title: "Enter pledge", description: "Please provide your name and a positive amount." });
      return;
    }
    pledge(project.id, amount, name);
    toast({ title: "Thank you!", description: `Pledged $${amount.toLocaleString()} to ${project.title}` });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>{project.region} • {project.category}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Raised</span><span className="font-medium">${project.raisedUSD.toLocaleString()} / ${project.targetUSD.toLocaleString()} ({pct}%)</span></div>
            <div className="h-2 w-full overflow-hidden rounded bg-muted"><div className="h-full bg-primary" style={{ width: `${pct}%` }} /></div>
          </div>

          <p className="text-sm text-muted-foreground">{project.description}</p>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-2 text-sm font-medium">Milestones</h4>
              <ul className="space-y-2 text-sm">
                {project.milestones.map((m) => (
                  <li key={m.id} className="rounded border p-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{m.title}</span>
                      <span className="text-xs text-muted-foreground">{new Date(m.targetDate).toLocaleDateString()}</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded bg-muted"><div className="h-full bg-secondary" style={{ width: `${m.progress}%` }} /></div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium">Recent Donors</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {project.donors.slice(0, 5).map((d, i) => (
                    <TableRow key={i}>
                      <TableCell>{d.name}</TableCell>
                      <TableCell>${d.amountUSD.toLocaleString()}</TableCell>
                      <TableCell className="text-muted-foreground">{new Date(d.timestamp).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="rounded-md border p-3">
            <h4 className="mb-2 text-sm font-medium">Make a Pledge</h4>
            <div className="flex flex-wrap items-center gap-2">
              <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="max-w-[220px]" />
              <Input type="number" placeholder="Amount (USD)" value={amount || ""} onChange={(e) => setAmount(Number(e.target.value))} className="max-w-[220px]" />
              <Button onClick={submit}>Pledge</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
