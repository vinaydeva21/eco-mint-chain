import { Helmet } from "react-helmet-async";
import TopNav from "@/components/layout/TopNav";
import ComingSoon from "@/components/ComingSoon";

const MRV = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Verification & MRV – KarbonLedger CETP</title>
        <meta name="description" content="Validate baselines, compute CO₂e, and verify proofs for credit eligibility." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : '/mrv'} />
      </Helmet>
      <TopNav />
      <main className="flex-1">
        <ComingSoon title="Verification & MRV" description="Baselines vs current performance, ZKP proofs, and approval workflows." />
      </main>
    </div>
  );
};

export default MRV;
