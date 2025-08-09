import { Helmet } from "react-helmet-async";
import TopNav from "@/components/layout/TopNav";
import BaselineComparison from "@/features/mrv/components/BaselineComparison";
import ZKProofSimulator from "@/features/mrv/components/ZKProofSimulator";
import ApprovalWorkflow from "@/features/mrv/components/ApprovalWorkflow";
import { metrics } from "@/features/mrv/data";

const MRV = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Verification & MRV – KarbonLedger CETP</title>
        <meta name="description" content="Baselines vs current performance, simulated ZKP proofs, and approval workflows." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : '/mrv'} />
      </Helmet>
      <TopNav />
      <main className="flex-1">
        <header className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-semibold tracking-tight">Verification & MRV</h1>
          <p className="text-muted-foreground mt-1">Baselines vs current performance, ZKP proof (hash) simulation, and approvals.</p>
        </header>

        <section className="container mx-auto px-4 grid gap-6 lg:grid-cols-3 pb-8">
          <div className="lg:col-span-2 space-y-6">
            <BaselineComparison data={metrics} />
            <ZKProofSimulator metrics={metrics} />
          </div>
          <div className="space-y-6">
            <ApprovalWorkflow />
          </div>
        </section>
      </main>
    </div>
  );
};

export default MRV;
