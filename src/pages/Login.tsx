import { useState } from "react";
import { Helmet } from "react-helmet-async";
import TopNav from "@/components/layout/TopNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { defaultDashboardForRole, type Role } from "@/lib/rbac";
import WalletConnectPanel from "@/web3/components/WalletConnectPanel";

const roles = [
  "Operator",
  "Regulator",
  "Verifier",
  "Buyer",
  "DAO Member",
  "Investor",
  "Trainer",
];

const steps = ["Role", "KYC", "Connect Devices"] as const;

type Step = typeof steps[number];

const Login = () => {
  const [activeStep, setActiveStep] = useState<Step>("Role");
  const [role, setRole] = useState<string>("");
  const [kycFile, setKycFile] = useState<File | null>(null);
  const [gatewayId, setGatewayId] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const stepIndex = steps.indexOf(activeStep);
  const progress = Math.round(((stepIndex + 1) / steps.length) * 100);

  const next = () => {
    if (stepIndex < steps.length - 1) setActiveStep(steps[stepIndex + 1]);
  };
  const back = () => {
    if (stepIndex > 0) setActiveStep(steps[stepIndex - 1]);
  };

  const handleFinish = () => {
    if (!gatewayId || !role) return;
    login({ role: role as Role });
    navigate(defaultDashboardForRole[role as Role]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Login & Onboarding – KarbonLedger CETP Instance</title>
        <meta name="description" content="Authenticate, set your role, upload KYC, and connect devices to start monitoring your CETP." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : '/login'} />
      </Helmet>
      <TopNav />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <header className="mb-6">
              <h1 className="text-3xl font-bold">Welcome to KarbonLedger</h1>
              <p className="text-muted-foreground">CETP Monitoring & Credit Generation Instance</p>
            </header>

            <div className="mb-4">
              <Progress value={progress} className="h-2" />
              <div className="mt-2 text-sm text-muted-foreground">Step {stepIndex + 1} of {steps.length}: {activeStep}</div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {steps.map((s, i) => (
                <div key={s} className={`rounded-md border p-3 text-sm ${i === stepIndex ? "bg-secondary" : "bg-card"}`}>
                  <span className="font-medium">{s}</span>
                </div>
              ))}
            </div>

            {activeStep === "Role" && (
              <Card>
                <CardHeader>
                  <CardTitle>Select your role</CardTitle>
                  <CardDescription>Choose how you will use the CETP instance.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select onValueChange={setRole}>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((r) => (
                          <SelectItem key={r} value={r}>{r}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-between">
                    <div />
                    <Button variant="hero" onClick={next} disabled={!role}>Continue</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeStep === "KYC" && (
              <Card>
                <CardHeader>
                  <CardTitle>KYC Verification</CardTitle>
                  <CardDescription>Upload an identity document (PDF or image). Mocked for demo.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="kyc">Document</Label>
                    <Input id="kyc" type="file" accept=".pdf,image/*" onChange={(e) => setKycFile(e.target.files?.[0] ?? null)} />
                    <p className="text-xs text-muted-foreground">Status: {kycFile ? "Uploaded (pending verification)" : "Not uploaded"}</p>
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={back}>Back</Button>
                    <Button variant="hero" onClick={next} disabled={!kycFile}>Continue</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeStep === "Connect Devices" && (
              <Card>
                <CardHeader>
                  <CardTitle>Connect Devices</CardTitle>
                  <CardDescription>Link your IoT gateway to start streaming sensor data.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="gateway">Gateway ID</Label>
                    <Input id="gateway" placeholder="e.g., KN-CHN-001" value={gatewayId} onChange={(e) => setGatewayId(e.target.value)} />
                    <p className="text-xs text-muted-foreground">Example sensors: COD, BOD, pH, Flow, Energy</p>
                  </div>
                  <div className="space-y-6">
                    <WalletConnectPanel />
                    <div className="flex flex-wrap gap-3 justify-between">
                      <Button variant="outline" onClick={back}>Back</Button>
                      <Button variant="hero" disabled={!gatewayId || !role} onClick={handleFinish}>Finish & Go to Dashboard</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Login;
