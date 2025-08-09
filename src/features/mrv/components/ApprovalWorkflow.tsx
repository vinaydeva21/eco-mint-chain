import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const KEY = "mrv_approval_status";

type Status = "Draft" | "Submitted" | "Under Review" | "Approved" | "Rejected";

const nextAfterSubmit: Record<Exclude<Status, "Approved" | "Rejected">, Status> = {
  Draft: "Submitted",
  Submitted: "Under Review",
  "Under Review": "Approved",
};

const ApprovalWorkflow: React.FC = () => {
  const [status, setStatus] = useState<Status>(() => (localStorage.getItem(KEY) as Status) || "Draft");

  useEffect(() => {
    localStorage.setItem(KEY, status);
  }, [status]);

  const submit = () => setStatus(nextAfterSubmit[status] || status);
  const approve = () => setStatus("Approved");
  const reject = () => setStatus("Rejected");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Approval Workflow</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">Current status</div>
        <div className="text-xl font-semibold">{status}</div>
        <div className="flex flex-wrap gap-2 pt-2">
          {status !== "Approved" && status !== "Rejected" && (
            <Button onClick={submit}>
              {status === "Draft" && "Submit for Review"}
              {status === "Submitted" && "Start Review"}
              {status === "Under Review" && "Mark Approved"}
            </Button>
          )}
          {status === "Under Review" && (
            <>
              <Button variant="secondary" onClick={approve}>Approve</Button>
              <Button variant="destructive" onClick={reject}>Reject</Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApprovalWorkflow;
