import { Helmet } from "react-helmet-async";
import TopNav from "@/components/layout/TopNav";
import hero from "@/assets/hero-water-tech.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Counter from "@/components/landing/Counter";
import ScrollReveal from "@/components/landing/ScrollReveal";
import ScrollSpyNav from "@/components/landing/ScrollSpyNav";
import TiltCard from "@/components/landing/TiltCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { ActivitySquare, BrainCircuit, ShieldCheck, Coins, Mail, Check, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
const Index = () => {
  const [sortKey, setSortKey] = useState<"stakeholder" | "role" | "benefit">("stakeholder");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const beneficiaries = [
    { stakeholder: "🏭 ETP Operators", role: "Responsible for wastewater treatment", benefit: "Monetize CO₂e reductions and improve operational efficiency" },
    { stakeholder: "🧑‍⚖️ SPCB Regulators", role: "Monitor regulatory compliance", benefit: "Real-time access to verified compliance data" },
    { stakeholder: "🌱 UNDP / NGOs", role: "Promote sustainability", benefit: "Track SDG impact with verified pollution reduction data" },
    { stakeholder: "💼 Credit Buyers / ESG Funds", role: "Purchase carbon credits", benefit: "Buy verified CO₂e credits to meet ESG targets" },
    { stakeholder: "👩‍🏭 Worker Cooperatives", role: "Participate in DAO governance", benefit: "Share in tokenized revenue for community development" },
  ];

  const sortedBeneficiaries = useMemo(() => {
    const arr = [...beneficiaries];
    arr.sort((a, b) => {
      const ka = a[sortKey].toString().toLowerCase();
      const kb = b[sortKey].toString().toLowerCase();
      if (ka < kb) return sortDir === "asc" ? -1 : 1;
      if (ka > kb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [beneficiaries, sortKey, sortDir]);

  const setSort = (key: "stakeholder" | "role" | "benefit") => {
    if (key === sortKey) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const scrollSpyItems = [
    { id: "what", label: "What" },
    { id: "how", label: "How" },
    { id: "why", label: "Why" },
    { id: "who", label: "Who" },
    { id: "monetize", label: "Monetize" },
    { id: "get-started", label: "Get Started" },
    { id: "contact", label: "Contact" },
    { id: "impact", label: "Impact" },
  ];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hello@konma.io");
      toast({ title: "Copied", description: "Email address copied to clipboard." });
    } catch {
      toast({ title: "Copy failed", description: "Could not copy email. Please try again." });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>KarbonLedger – Transforming Wastewater Treatment into Climate Action & Profit</title>
        <meta name="description" content="Real-time IoT, AI verification, and blockchain-backed compliance for ETPs—laying the groundwork for future carbon asset monetization." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : '/'} />
      </Helmet>
      <TopNav />
      <main className="flex-1 scroll-smooth">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-primary animated-gradient opacity-20" aria-hidden="true" />
          <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-2 md:py-24 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
                Welcome to KarbonLedger
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Transforming Wastewater Treatment into Climate Action & Profit
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/login"><Button variant="hero" size="lg" className="gap-2">Start Today <ArrowRight className="h-4 w-4" /></Button></Link>
                <a href="mailto:hello@konma.io"><Button variant="secondary" size="lg" className="gap-2"><Mail className="h-4 w-4" /> Contact</Button></a>
              </div>
            </div>
            <TiltCard className="relative">
              <img
                src={hero}
                loading="lazy"
                alt="Abstract water-tech gradient with data network lines"
                className="w-full h-auto rounded-xl border shadow-elevated"
              />
              <div className="absolute -bottom-6 -right-6 hidden md:block w-40 h-40 rounded-xl bg-gradient-primary blur-2xl opacity-40" aria-hidden="true"/>
            </TiltCard>
          </div>

          {/* Stat strip */}
          <div className="container mx-auto px-4 pb-10">
            <div className="grid gap-4 sm:grid-cols-3">
              <ScrollReveal className="rounded-lg border bg-card p-6 text-center">
                <div className="text-3xl font-bold"><Counter to={120} />+</div>
                <div className="text-sm text-muted-foreground mt-1">Sensors Integrated</div>
              </ScrollReveal>
              <ScrollReveal className="rounded-lg border bg-card p-6 text-center">
                <div className="text-3xl font-bold"><Counter to={2450} />+</div>
                <div className="text-sm text-muted-foreground mt-1">CO₂e Savings Verified (t)</div>
              </ScrollReveal>
              <ScrollReveal className="rounded-lg border bg-card p-6 text-center">
                <div className="text-3xl font-bold"><Counter to={8100} />+</div>
                <div className="text-sm text-muted-foreground mt-1">Compliance Events Logged</div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Scroll Spy */}
        <ScrollSpyNav items={scrollSpyItems} />

        {/* What is KarbonLedger? */}
        <ScrollReveal as="section" id="what" className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-4">What is KarbonLedger?</h2>
          <p className="text-muted-foreground max-w-prose">
            KarbonLedger is an innovative platform that helps <strong>Effluent Treatment Plants (ETPs)</strong> transform their <strong>pollution control</strong> efforts into <strong>climate-positive actions</strong>.
          </p>
          <p className="text-muted-foreground max-w-prose mt-4">
            By using <strong>real-time monitoring</strong> through <strong>IoT sensors</strong>, <strong>AI-powered models</strong>, and <strong>blockchain technology</strong>, KarbonLedger helps ETPs <strong>reduce pollution</strong>, <strong>validate carbon reductions</strong>, and <strong>automate regulatory compliance</strong> — all while opening the door for <strong>future carbon asset monetization</strong>.
          </p>
        </ScrollReveal>

        {/* How It Works */}
        <ScrollReveal as="section" id="how" className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-6">How It Works</h2>
          <Tabs defaultValue="sensors" className="w-full">
            <TabsList>
              <TabsTrigger value="sensors" className="gap-2"><ActivitySquare className="h-4 w-4" /> Real-Time Monitoring</TabsTrigger>
              <TabsTrigger value="ai" className="gap-2"><BrainCircuit className="h-4 w-4" /> AI Verification</TabsTrigger>
              <TabsTrigger value="blockchain" className="gap-2"><ShieldCheck className="h-4 w-4" /> Blockchain Compliance</TabsTrigger>
              <TabsTrigger value="monetize" className="gap-2"><Coins className="h-4 w-4" /> Monetize Assets</TabsTrigger>
            </TabsList>
            <TabsContent value="sensors" className="mt-6">
              <p className="text-muted-foreground max-w-3xl">
                KarbonLedger installs <strong>IoT sensors</strong> at your ETP to monitor key parameters like <strong>COD</strong>, <strong>BOD</strong>, <strong>flow rate</strong>, and <strong>energy consumption</strong>. Data is captured continuously and streamed to the platform.
              </p>
            </TabsContent>
            <TabsContent value="ai" className="mt-6">
              <p className="text-muted-foreground max-w-3xl">
                Our <strong>AI algorithms</strong> process the data to <strong>verify</strong> pollution reductions and calculate the <strong>CO₂e savings</strong> from your treatment efforts — providing accurate, real-time insights.
              </p>
            </TabsContent>
            <TabsContent value="blockchain" className="mt-6">
              <p className="text-muted-foreground max-w-3xl">
                We use <strong>blockchain technology</strong> to ensure <strong>data integrity</strong> and provide <strong>tamper-proof records</strong> for real-time regulatory compliance reporting.
              </p>
            </TabsContent>
            <TabsContent value="monetize" className="mt-6">
              <p className="text-muted-foreground max-w-3xl">
                Once validated, <strong>pollution reductions</strong> can be <strong>tokenized as carbon credits</strong> (KARB tokens), enabling a future <strong>revenue stream</strong> based on verifiable CO₂e savings.
              </p>
            </TabsContent>
          </Tabs>
        </ScrollReveal>

        {/* Why Choose */}
        <ScrollReveal as="section" id="why" className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-6">Why Choose KarbonLedger?</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Streamline Compliance", desc: "Automated, real-time reporting to regulatory bodies (like SPCBs)." },
              { title: "Data Transparency", desc: "Tamper-proof data backed by blockchain and AI models." },
              { title: "Future Monetization", desc: "Convert CO₂e reductions into carbon assets for future marketplaces." },
              { title: "Operational Optimization", desc: "Insights to reduce energy costs and improve efficiency." },
              { title: "Support Climate Action", desc: "Directly contributes to SDG 6 (Clean Water) and SDG 13 (Climate Action)." },
            ].map((item) => (
              <TiltCard key={item.title} className="rounded-lg border bg-card p-6 hover:shadow-elevated">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </TiltCard>
            ))}
          </div>
        </ScrollReveal>

        {/* Who Benefits */}
        <ScrollReveal as="section" id="who" className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-6">Who Benefits?</h2>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead onClick={() => setSort("stakeholder")} className="cursor-pointer select-none">
                    Stakeholder {sortKey === "stakeholder" ? (sortDir === "asc" ? "↑" : "↓") : ""}
                  </TableHead>
                  <TableHead onClick={() => setSort("role")} className="cursor-pointer select-none">
                    Role {sortKey === "role" ? (sortDir === "asc" ? "↑" : "↓") : ""}
                  </TableHead>
                  <TableHead onClick={() => setSort("benefit")} className="cursor-pointer select-none">
                    How They Benefit {sortKey === "benefit" ? (sortDir === "asc" ? "↑" : "↓") : ""}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedBeneficiaries.map((row) => (
                  <TableRow key={row.stakeholder} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{row.stakeholder}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell>{row.benefit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ScrollReveal>

        {/* Future Carbon Asset Monetization */}
        <ScrollReveal as="section" id="monetize" className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-6">Future Carbon Asset Monetization</h2>
          <Carousel className="relative">
            <CarouselContent>
              {[
                { title: "Sell to ESG Buyers", desc: "Sell verified credits to corporate buyers meeting ESG targets." },
                { title: "Retire for Impact", desc: "Retire credits to contribute to climate mitigation efforts." },
                { title: "Reinvest Locally", desc: "Reinvest proceeds into local sustainability projects via the DAO." },
              ].map((slide) => (
                <CarouselItem key={slide.title} className="md:basis-1/2 lg:basis-1/3">
                  <div className="rounded-lg border bg-card p-6 h-full flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{slide.title}</h3>
                      <p className="text-muted-foreground">{slide.desc}</p>
                    </div>
                    <div className="pt-4">
                      <a href="#contact" className="story-link text-primary">Learn more</a>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </ScrollReveal>

        {/* Get Started */}
        <ScrollReveal as="section" id="get-started" className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-6">Get Started with KarbonLedger</h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl">
            <AccordionItem value="step-1">
              <AccordionTrigger>Step 1: Install Sensors</AccordionTrigger>
              <AccordionContent>
                KarbonLedger provides <strong>IoT sensors</strong> for real-time monitoring at no upfront cost.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="step-2">
              <AccordionTrigger>Step 2: Real-Time Data Collection</AccordionTrigger>
              <AccordionContent>
                Start collecting <strong>COD</strong>, <strong>flow</strong>, and <strong>energy</strong> data, which will be processed by our AI models to calculate the <strong>CO₂e savings</strong>.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="step-3">
              <AccordionTrigger>Step 3: Future Monetization</AccordionTrigger>
              <AccordionContent>
                As the technology is validated, your ETP will be able to <strong>convert pollution reductions into carbon assets</strong>, creating a future <strong>revenue stream</strong>.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="mt-6">
            <Link to="/login"><Button size="lg" className="gap-2">Start Today <Check className="h-4 w-4" /></Button></Link>
          </div>
        </ScrollReveal>

        {/* Get in Touch */}
        <ScrollReveal as="section" id="contact" className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-muted-foreground max-w-prose">
            Join the movement for cleaner water and climate action with KarbonLedger. Start tracking, verifying, and eventually monetizing your carbon savings today.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button variant="secondary" onClick={handleCopyEmail} className="gap-2"><Check className="h-4 w-4" /> Copy email</Button>
            <a href="mailto:hello@konma.io"><Button className="gap-2"><Mail className="h-4 w-4" /> Email us</Button></a>
          </div>
        </ScrollReveal>

        {/* Future Impact */}
        <ScrollReveal as="section" id="impact" className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-4">Future Impact</h2>
          <p className="text-muted-foreground max-w-3xl">
            This solution will help <strong>ETPs</strong> manage <strong>pollution better</strong>, contribute to <strong>climate action</strong>, and provide <strong>verified carbon credits</strong> that can be used in future marketplaces. KarbonLedger’s technology doesn’t just ensure <strong>regulatory compliance</strong>; it turns <strong>sustainable operations</strong> into <strong>tangible climate assets</strong> that can benefit both the <strong>ETP operators</strong> and <strong>global climate goals</strong>.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/login"><Button variant="hero" size="lg" className="gap-2">Start Today <ArrowRight className="h-4 w-4" /></Button></Link>
            <Link to="/dashboard/operator"><Button variant="secondary" size="lg">View Operator Demo</Button></Link>
          </div>
        </ScrollReveal>
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
