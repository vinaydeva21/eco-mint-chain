import { Helmet } from "react-helmet-async";
import TopNav from "@/components/layout/TopNav";
import hero from "@/assets/hero-water-tech.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>KarbonLedger – Wastewater to Climate Assets</title>
        <meta name="description" content="Real-time IoT, AI and blockchain help ETPs cut pollution, verify CO₂e savings and monetize future carbon assets." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : '/'} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "KarbonLedger",
            url: typeof window !== 'undefined' ? window.location.origin : 'https://karbonledger.app',
            description: "Platform for ETPs to verify CO2e savings with IoT, AI and blockchain and monetize future carbon assets."
          })}
        </script>
      </Helmet>
      <TopNav />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-primary animated-gradient opacity-20" aria-hidden="true" />
          <div className="container mx-auto grid gap-10 px-4 py-16 md:grid-cols-2 md:py-24 items-center">
            <div>
              <p className="text-sm font-semibold tracking-wide text-primary mb-2">Welcome to KarbonLedger</p>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
                Transforming Wastewater Treatment into Climate Action & Profit
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                KarbonLedger helps Effluent Treatment Plants (ETPs) turn pollution control into climate-positive action with IoT monitoring, AI verification, and blockchain-backed transparency.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/login"><Button variant="hero" size="lg">Launch Instance</Button></Link>
                <Link to="/dashboard/operator"><Button variant="secondary" size="lg">View Operator Demo</Button></Link>
                <a href="#contact"><Button variant="outline" size="lg">Contact Us</Button></a>
              </div>
            </div>
            <div className="relative">
              <img
                src={hero}
                loading="lazy"
                alt="KarbonLedger wastewater IoT, AI and blockchain visualization"
                className="w-full h-auto rounded-xl border shadow-elevated"
              />
              <div className="absolute -bottom-6 -right-6 hidden md:block w-40 h-40 rounded-xl bg-gradient-primary blur-2xl opacity-40" aria-hidden="true"/>
            </div>
          </div>
        </section>

        {/* What is KarbonLedger */}
        <section id="what-is" className="container mx-auto px-4 py-12 md:py-16">
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            <h2 className="text-2xl md:text-3xl font-bold">What is KarbonLedger?</h2>
            <p>
              KarbonLedger is an innovative platform that helps ETPs transform their pollution control efforts into climate-positive actions. Using real-time IoT sensors, AI-powered models, and blockchain technology, KarbonLedger reduces pollution, verifies CO₂e savings, and automates regulatory compliance — while opening the door for future carbon asset monetization.
            </p>
          </article>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="container mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">How It Works</h2>
          <ol className="list-decimal pl-6 space-y-4 text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">Real-Time Monitoring with IoT Sensors:</span> Track COD, BOD, flow rate, and energy consumption continuously with secure data capture.
            </li>
            <li>
              <span className="font-medium text-foreground">AI Models for Pollution Verification:</span> Algorithms verify pollution reductions and calculate CO₂e savings for accurate, real-time insights.
            </li>
            <li>
              <span className="font-medium text-foreground">Blockchain for Secure Data and Compliance:</span> Tamper-proof records enable real-time compliance reporting to regulators.
            </li>
            <li>
              <span className="font-medium text-foreground">Monetizing Future Carbon Assets:</span> Once validated, reductions are tokenized (KARB) to create new revenue streams.
            </li>
          </ol>
        </section>

        {/* Why Choose */}
        <section id="why-choose" className="container mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Why Choose KarbonLedger?</h2>
          <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
            <li><span className="text-foreground font-medium">Streamline Compliance:</span> Automated, real-time reporting to regulatory bodies reduces paperwork and inspections.</li>
            <li><span className="text-foreground font-medium">Data Transparency:</span> Tamper-proof data and AI models ensure accuracy of pollution reduction claims.</li>
            <li><span className="text-foreground font-medium">Future Monetization:</span> Convert CO₂e reductions into carbon assets for sale or use in marketplaces.</li>
            <li><span className="text-foreground font-medium">Operational Optimization:</span> Insights reduce energy costs and improve efficiency.</li>
            <li><span className="text-foreground font-medium">Support for Climate Action:</span> Contribute to SDG 6 (Clean Water) and SDG 13 (Climate Action).</li>
          </ul>
        </section>

        {/* Who Benefits */}
        <section id="who-benefits" className="container mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Who Benefits?</h2>
          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stakeholder</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>How They Benefit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>ETP Operators</TableCell>
                  <TableCell>Wastewater treatment</TableCell>
                  <TableCell>Monetize CO₂e reductions and improve operational efficiency.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>SPCB Regulators</TableCell>
                  <TableCell>Monitor compliance</TableCell>
                  <TableCell>Real-time access to verified compliance data.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>UNDP / NGOs</TableCell>
                  <TableCell>Promote sustainability</TableCell>
                  <TableCell>Track SDG impact with verified reduction data.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Credit Buyers / ESG Funds</TableCell>
                  <TableCell>Purchase carbon credits</TableCell>
                  <TableCell>Buy verified CO₂e credits to meet ESG targets.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Worker Cooperatives</TableCell>
                  <TableCell>DAO governance participation</TableCell>
                  <TableCell>Share in tokenized revenue for community development.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Future Carbon Asset Monetization */}
        <section id="future-monetization" className="container mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Future Carbon Asset Monetization</h2>
          <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
            <li>Sell verified credits to corporate buyers meeting ESG targets.</li>
            <li>Retire credits to contribute to climate mitigation.</li>
            <li>Reinvest via DAO into local sustainability projects.</li>
          </ul>
        </section>

        {/* Get Started */}
        <section id="get-started" className="container mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Get Started with KarbonLedger</h2>
          <ol className="list-decimal pl-6 space-y-4 text-muted-foreground">
            <li><span className="text-foreground font-medium">Install Sensors:</span> IoT sensors for real-time monitoring at no upfront cost.</li>
            <li><span className="text-foreground font-medium">Real-Time Data Collection:</span> Capture COD, flow, and energy data to calculate CO₂e savings.</li>
            <li><span className="text-foreground font-medium">Future Monetization:</span> Convert validated reductions into carbon assets and unlock new revenue.</li>
          </ol>
        </section>

        {/* Contact */}
        <section id="contact" className="container mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-muted-foreground mb-4">
            Join the movement for cleaner water and climate action. Start tracking, verifying, and eventually monetizing your carbon savings today.
          </p>
          <a href="mailto:hello@konma.io" className="inline-flex"><Button variant="secondary">Email: hello@konma.io</Button></a>
        </section>

        {/* Future Impact */}
        <section id="future-impact" className="container mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Future Impact</h2>
          <p className="text-muted-foreground">
            This solution helps ETPs manage pollution better, contribute to climate action, and provide verified carbon credits for future marketplaces. KarbonLedger ensures regulatory compliance and turns sustainable operations into tangible climate assets benefiting operators and global climate goals.
          </p>
        </section>

        {/* Start Today CTA */}
        <section id="start-today" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-primary opacity-10" aria-hidden="true" />
          <div className="container mx-auto px-4 py-16 text-center relative">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Start Today!</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Become part of a future of sustainable water management and carbon asset monetization.
            </p>
            <div className="flex justify-center gap-3">
              <Link to="/login"><Button variant="hero" size="lg">Get Started</Button></Link>
              <a href="#contact"><Button variant="outline" size="lg">Talk to Us</Button></a>
            </div>
          </div>
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
