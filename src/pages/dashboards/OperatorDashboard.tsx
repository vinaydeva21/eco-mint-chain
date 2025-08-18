import { useState } from "react";
import { Helmet } from "react-helmet-async";
import TopNav from "@/components/layout/TopNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import LearningWidget from "@/features/learning/components/LearningWidget";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
const metricCards = [
  { key: "COD", value: 82, unit: "mg/L", status: "ok" },
  { key: "BOD", value: 24, unit: "mg/L", status: "ok" },
  { key: "pH", value: 7.3, unit: "", status: "ok" },
  { key: "TDS", value: 540, unit: "mg/L", status: "warn" },
  { key: "Flow", value: 1200, unit: "m³/d", status: "ok" },
  { key: "Energy", value: 510, unit: "kWh", status: "ok" },
];

const chartData = Array.from({ length: 24 }).map((_, i) => ({
  time: `${i}:00`,
  COD: 70 + Math.round(Math.sin(i / 3) * 10 + Math.random() * 6),
  BOD: 20 + Math.round(Math.cos(i / 4) * 5 + Math.random() * 3),
}));

const OperatorDashboard = () => {
  const efficiency = 86; // mock
  const compliance = "Green"; // mock
  const [gatewayId, setGatewayId] = useState("");
  const [isDeviceConnected, setIsDeviceConnected] = useState(false);

  const handleConnectDevice = () => {
    if (gatewayId) {
      setIsDeviceConnected(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>CETP Operator Dashboard – KarbonLedger</title>
        <meta name="description" content="Monitor live CETP metrics, AI recommendations, alerts, and trends with automated compliance status." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : '/dashboard/operator'} />
      </Helmet>

      <TopNav />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <section className="grid gap-6 md:grid-cols-4">
          {/* Performance & Compliance */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Performance</CardTitle>
              <CardDescription>Efficiency score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl bg-gradient-primary text-primary-foreground p-6 shadow-glow">
                <div className="text-5xl font-extrabold leading-none">{efficiency}%</div>
                <div className="opacity-90">Optimized via AI benchmarks</div>
              </div>
              <div className="mt-4">
                <Progress value={efficiency} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Live Metrics</CardTitle>
              <CardDescription>Real-time sensor feed (mock)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {metricCards.map((m) => (
                  <div key={m.key} className="rounded-md border p-4 transition-smooth hover:shadow-elevated">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{m.key}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${m.status === "ok" ? "text-foreground" : "text-accent"}`}>
                        {m.status === "ok" ? "OK" : "Watch"}
                      </span>
                    </div>
                    <div className="mt-3 text-3xl font-bold">{m.value}<span className="text-base font-medium ml-1 text-muted-foreground">{m.unit}</span></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 md:grid-cols-3 mt-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Historical Trends</CardTitle>
              <CardDescription>COD & BOD (last 24h)</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                  <Line type="monotone" dataKey="COD" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="BOD" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compliance Status</CardTitle>
              <CardDescription>Automated verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="text-sm text-muted-foreground">Status</div>
                <div className="text-2xl font-bold">{compliance}</div>
              </div>
              <div className="rounded-md border p-4">
                <div className="text-sm text-muted-foreground">AI Recommendation</div>
                <p className="text-sm">Reduce coagulant dosing by 5% to optimize COD removal while keeping pH stable.</p>
                <Button className="mt-3" variant="secondary" size="sm">Apply change</Button>
              </div>
              <div className="rounded-md border p-4">
                <div className="text-sm text-muted-foreground">Latest Alerts</div>
                <ul className="mt-2 list-disc list-inside text-sm space-y-1">
                  <li>pH drift detected (6.4 → 7.3) — resolved</li>
                  <li>TDS approaching threshold — monitor</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-6">
          <LearningWidget metricKeysNeedingAttention={metricCards.filter(m => m.status !== "ok").map((m) => m.key)} />
        </section>

        {!isDeviceConnected && (
          <section className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Connect Devices</CardTitle>
                <CardDescription>Link your IoT gateway to start streaming sensor data.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="gateway">Gateway ID</Label>
                  <Input 
                    id="gateway" 
                    placeholder="e.g., KN-CHN-001" 
                    value={gatewayId} 
                    onChange={(e) => setGatewayId(e.target.value)} 
                  />
                  <p className="text-xs text-muted-foreground">Example sensors: COD, BOD, pH, Flow, Energy</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="secondary">Connect Wallet (DID)</Button>
                  <Button variant="hero" disabled={!gatewayId} onClick={handleConnectDevice}>
                    Connect Device
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        )}
      </main>
    </div>
  );
};

export default OperatorDashboard;
