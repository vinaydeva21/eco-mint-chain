import { Helmet } from "react-helmet-async";
import TopNav from "@/components/layout/TopNav";
import hero from "@/assets/hero-water-tech.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import TiltCard from "@/components/motion/TiltCard";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { Activity, Cpu, ShieldCheck, Coins, FileCheck2, Gauge, Factory, Gavel, Sprout, Briefcase, Users, Mail } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>KarbonLedger CETP – Smart Monitoring & Credits</title>
        <meta name="description" content="Real-time CETP monitoring with AI optimization, digital MRV, and blockchain credit issuance for textile clusters." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : '/'} />
      </Helmet>
      <TopNav />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-primary animated-gradient opacity-20" aria-hidden="true" />
          <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-2 md:py-24 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
                Blockchain-Integrated Smart Monitoring for CETPs
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Unite IoT, AI/ML, digital MRV, and a marketplace to transform CETPs into transparent, revenue-generating environmental assets.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/login"><Button variant="hero" size="lg">Launch Instance</Button></Link>
                <Link to="/dashboard/operator"><Button variant="secondary" size="lg">View Operator Demo</Button></Link>
              </div>
            </div>
            <div className="relative">
              <img
                src={hero}
                loading="lazy"
                alt="Abstract water-tech gradient with data network lines"
                className="w-full h-auto rounded-xl border shadow-elevated"
              />
              <div className="absolute -bottom-6 -right-6 hidden md:block w-40 h-40 rounded-xl bg-gradient-primary blur-2xl opacity-40 pulse" aria-hidden="true"/>
            </div>
          </div>
        </section>

        {/* What is KarbonLedger */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid gap-8 md:grid-cols-2 items-start">
            <div>
              <ScrollReveal>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">What is KarbonLedger?</h2>
                <p className="text-muted-foreground mb-4">
                  KarbonLedger helps Effluent Treatment Plants (ETPs) turn pollution control into climate-positive action using real-time IoT monitoring, AI models, and blockchain-backed MRV—unlocking future carbon asset monetization.
                </p>
                <p className="text-muted-foreground">
                  Reduce pollution, validate CO₂e savings, and automate compliance—built for transparency, efficiency, and impact.
                </p>
              </ScrollReveal>
            </div>
            <ScrollReveal>
              <TiltCard className="p-6">
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3"><Activity className="mt-0.5" size={18} aria-hidden /><span>Real-time COD, BOD, flow, and energy monitoring</span></li>
                  <li className="flex items-start gap-3"><Cpu className="mt-0.5" size={18} aria-hidden /><span>AI verification of CO₂e reductions</span></li>
                  <li className="flex items-start gap-3"><ShieldCheck className="mt-0.5" size={18} aria-hidden /><span>Blockchain-backed, tamper-proof performance logs</span></li>
                  <li className="flex items-start gap-3"><Coins className="mt-0.5" size={18} aria-hidden /><span>Pathway to tokenized credits (KARB) and revenue</span></li>
                </ul>
              </TiltCard>
            </ScrollReveal>
          </div>
        </section>

        {/* How It Works */}
        <section className="container mx-auto px-4 pb-8">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">How It Works</h2>
          </ScrollReveal>
          <ScrollReveal>
            <Tabs defaultValue="sensors" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="sensors" className="gap-2"><Activity size={16} aria-hidden /> Sensors</TabsTrigger>
                <TabsTrigger value="ai" className="gap-2"><Cpu size={16} aria-hidden /> AI Models</TabsTrigger>
                <TabsTrigger value="chain" className="gap-2"><ShieldCheck size={16} aria-hidden /> Blockchain</TabsTrigger>
                <TabsTrigger value="monetize" className="gap-2"><Coins size={16} aria-hidden /> Monetization</TabsTrigger>
              </TabsList>
              <TabsContent value="sensors" className="focus:outline-none">
                <TiltCard className="p-6">
                  <p className="text-muted-foreground">
                    Install IoT sensors to continuously stream COD, BOD, flow, and energy data to the platform for real-time visibility.
                  </p>
                </TiltCard>
              </TabsContent>
              <TabsContent value="ai" className="focus:outline-none">
                <TiltCard className="p-6">
                  <p className="text-muted-foreground">
                    AI algorithms verify pollution reductions and compute CO₂e savings, delivering accurate, real-time insights.
                  </p>
                </TiltCard>
              </TabsContent>
              <TabsContent value="chain" className="focus:outline-none">
                <TiltCard className="p-6">
                  <p className="text-muted-foreground">
                    Tamper-proof records on-chain enable transparent, real-time compliance reporting to regulators.
                  </p>
                </TiltCard>
              </TabsContent>
              <TabsContent value="monetize" className="focus:outline-none">
                <TiltCard className="p-6">
                  <p className="text-muted-foreground">
                    Verified reductions will be tokenized as carbon credits (KARB), opening new revenue for high-performing ETPs.
                  </p>
                </TiltCard>
              </TabsContent>
            </Tabs>
          </ScrollReveal>
        </section>

        {/* Why Choose */}
        <section className="container mx-auto px-4 py-16">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Why Choose KarbonLedger?</h2>
          </ScrollReveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Streamline Compliance",
                desc: "Automated, real-time reporting to regulators reduces paperwork and inspections.",
              },
              {
                title: "Data Transparency",
                desc: "Tamper-proof, blockchain-backed data and AI-verified claims.",
              },
              {
                title: "Future Monetization",
                desc: "Convert verified CO₂e reductions into carbon assets.",
              },
              {
                title: "Operational Optimization",
                desc: "Reduce energy costs and improve efficiency with actionable insights.",
              },
            ].map((c, i) => (
              <ScrollReveal key={i}>
                <TiltCard className="p-5 h-full">
                  <div className="mb-3 text-primary">{(i === 0 && <FileCheck2 size={20} aria-hidden />) || (i === 1 && <ShieldCheck size={20} aria-hidden />) || (i === 2 && <Coins size={20} aria-hidden />) || <Gauge size={20} aria-hidden />}</div>
                  <h3 className="font-semibold mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground">{c.desc}</p>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Who Benefits */}
        <section className="container mx-auto px-4 pb-16">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Who Benefits?</h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="rounded-xl border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Stakeholder</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Benefit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { s: "ETP Operators", r: "Wastewater treatment", b: "Monetize CO₂e reductions; improve efficiency" },
                    { s: "SPCB Regulators", r: "Compliance oversight", b: "Real-time access to verified data" },
                    { s: "UNDP / NGOs", r: "Sustainability impact", b: "Track SDG outcomes with verified data" },
                    { s: "Credit Buyers / ESG Funds", r: "Purchase credits", b: "Buy verified CO₂e to meet ESG targets" },
                    { s: "Worker Cooperatives", r: "DAO governance", b: "Share in tokenized revenue" },
                  ].map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">
                        <span className="inline-flex items-center gap-2">
                          {i === 0 && <Factory size={16} aria-hidden />} 
                          {i === 1 && <Gavel size={16} aria-hidden />} 
                          {i === 2 && <Sprout size={16} aria-hidden />} 
                          {i === 3 && <Briefcase size={16} aria-hidden />} 
                          {i === 4 && <Users size={16} aria-hidden />} 
                          <span>{row.s}</span>
                        </span>
                      </TableCell>
                      <TableCell>{row.r}</TableCell>
                      <TableCell className="text-muted-foreground">{row.b}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ScrollReveal>
        </section>

        {/* Get Started */}
        <section className="container mx-auto px-4 pb-16">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Get Started</h2>
          </ScrollReveal>
          <ScrollReveal>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Step 1: Install Sensors</AccordionTrigger>
                <AccordionContent>
                  KarbonLedger provides IoT sensors for real-time monitoring at no upfront cost.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Step 2: Real-Time Data Collection</AccordionTrigger>
                <AccordionContent>
                  Begin collecting COD, flow, and energy data—our AI models compute CO₂e savings continuously.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Step 3: Future Monetization</AccordionTrigger>
                <AccordionContent>
                  As the system is validated, convert reductions into carbon assets to create a new revenue stream.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ScrollReveal>
        </section>

        {/* Contact */}
        <section className="container mx-auto px-4 pb-24">
          <ScrollReveal>
            <div className="grid gap-4 md:grid-cols-2 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Get in Touch</h2>
                <p className="text-muted-foreground mb-4">
                  Join the movement for cleaner water and climate action with KarbonLedger.
                </p>
                <a
                  className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm transition-smooth hover:shadow-elevated"
                  href="mailto:hello@konma.io"
                  aria-label="Email hello@konma.io"
                >
                  <Mail size={16} aria-hidden /> Email: hello@konma.io
                </a>
              </div>
              <TiltCard className="p-6">
                <h3 className="font-semibold mb-2">Future Impact</h3>
                <p className="text-sm text-muted-foreground">
                  Manage pollution better, contribute to climate action, and unlock verified carbon assets that benefit operators and global goals.
                </p>
              </TiltCard>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <footer className="border-t">
        <div className="container mx-auto px-4 py-10 text-sm text-muted-foreground">
          © {new Date().getFullYear()} KarbonLedger — CETP Instance
        </div>
      </footer>
    </div>
  );
};

export default Index;
