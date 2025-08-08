import { Helmet } from "react-helmet-async";
import TopNav from "@/components/layout/TopNav";
import ComingSoon from "@/components/ComingSoon";

const Credits = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Credit Issuance – KarbonLedger CETP</title>
        <meta name="description" content="Mint water quality and GHG reduction credits with on-chain records." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : '/credits'} />
      </Helmet>
      <TopNav />
      <main className="flex-1">
        <ComingSoon title="Credit Issuance" description="Project details, credit types, minting, and blockchain hash display." />
      </main>
    </div>
  );
};

export default Credits;
