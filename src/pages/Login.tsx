import { useState } from "react";
import { Helmet } from "react-helmet-async";
import TopNav from "@/components/layout/TopNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { defaultDashboardForRole, type Role } from "@/lib/rbac";
import { Factory, Gavel, ShieldCheck, ShoppingCart, Users, TrendingUp, GraduationCap } from "lucide-react";

const roleData = [
  {
    id: "Operator",
    name: "Operator",
    description: "Manage and monitor CETP operations",
    icon: Factory,
  },
  {
    id: "Regulator",
    name: "Regulator", 
    description: "Oversee compliance and regulatory matters",
    icon: Gavel,
  },
  {
    id: "Verifier",
    name: "Verifier",
    description: "Verify and validate carbon credit claims",
    icon: ShieldCheck,
  },
  {
    id: "Buyer",
    name: "Buyer",
    description: "Purchase carbon credits from marketplace",
    icon: ShoppingCart,
  },
  {
    id: "DAO Member",
    name: "DAO Member",
    description: "Participate in governance and voting",
    icon: Users,
  },
  {
    id: "Investor",
    name: "Investor",
    description: "Fund carbon credit projects",
    icon: TrendingUp,
  },
  {
    id: "Trainer",
    name: "Trainer",
    description: "Provide education and training resources",
    icon: GraduationCap,
  },
];

const steps = ["Role", "KYC"] as const;

type Step = typeof steps[number];

const Login = () => {
  const [activeStep, setActiveStep] = useState<Step>("Role");
  const [role, setRole] = useState<string>("");
  const [kycFile, setKycFile] = useState<File | null>(null);
  
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
    if (!role) return;
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
                  <div className="space-y-4">
                    <Label>Choose your role</Label>
                    <RadioGroup value={role} onValueChange={setRole} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {roleData.map((roleItem) => {
                        const IconComponent = roleItem.icon;
                        const isSelected = role === roleItem.id;
                        return (
                          <Label
                            key={roleItem.id}
                            htmlFor={roleItem.id}
                            className={`
                              flex flex-col items-center justify-center rounded-lg border-2 p-6 cursor-pointer
                              transition-all duration-200 hover:border-primary/50 hover:bg-secondary/50
                              ${isSelected 
                                ? 'border-primary bg-primary/5' 
                                : 'border-muted'
                              }
                            `}
                          >
                            <RadioGroupItem 
                              value={roleItem.id} 
                              id={roleItem.id}
                              className="sr-only"
                            />
                            <IconComponent 
                              className={`h-8 w-8 mb-3 transition-colors ${
                                isSelected ? 'text-primary' : 'text-muted-foreground'
                              }`} 
                            />
                            <span className="text-lg font-semibold mb-2">{roleItem.name}</span>
                            <span className="text-sm text-muted-foreground text-center leading-relaxed">
                              {roleItem.description}
                            </span>
                          </Label>
                        );
                      })}
                    </RadioGroup>
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
                    <Button variant="hero" onClick={handleFinish} disabled={!kycFile}>Finish & Go to Dashboard</Button>
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
