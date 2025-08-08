import { Helmet } from "react-helmet-async";
import TopNav from "@/components/layout/TopNav";
import ComingSoon from "@/components/ComingSoon";

const Governance = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Governance & DAO – KarbonLedger CETP</title>
        <meta name="description" content="Proposals, token-weighted voting, and fund allocations for CETP clusters." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : '/governance'} />
      </Helmet>
      <TopNav />
      <main className="flex-1">
        <ComingSoon title="Governance & DAO" description="Proposal lists, voting results, and allocation charts." />
      </main>
    </div>
  );
};

export default Governance;
