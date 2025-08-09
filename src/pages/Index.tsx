import { Helmet } from "react-helmet-async";
import TopNav from "@/components/layout/TopNav";
import hero from "@/assets/hero-water-tech.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
              <div className="absolute -bottom-6 -right-6 hidden md:block w-40 h-40 rounded-xl bg-gradient-primary blur-2xl opacity-40" aria-hidden="true"/>
            </div>
          </div>
        </section>
        <section className="container mx-auto px-4 pb-24 grid gap-6 md:grid-cols-3">
          {[
            { title: "Real-time Sensors", desc: "Track COD, BOD, pH, flow, and energy with tamper-proof logs."},
            { title: "AI Optimization", desc: "Smart dosing and anomaly detection to improve performance."},
            { title: "Credit Issuance", desc: "Mint water quality and GHG reduction credits on-chain."},
          ].map((b, i) => (
            <article key={i} className="rounded-lg border bg-card p-6 shadow-sm transition-smooth hover:shadow-elevated">
              <h2 className="text-xl font-semibold mb-2">{b.title}</h2>
              <p className="text-muted-foreground">{b.desc}</p>
            </article>
          ))}
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
