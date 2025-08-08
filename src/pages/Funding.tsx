import { Helmet } from "react-helmet-async";
import TopNav from "@/components/layout/TopNav";
import ComingSoon from "@/components/ComingSoon";

const Funding = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Funding & Crowdfunding – KarbonLedger CETP</title>
        <meta name="description" content="Finance CETP upgrades with milestone tracking and impact dashboards." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : '/funding'} />
      </Helmet>
      <TopNav />
      <main className="flex-1">
        <ComingSoon title="Funding & Crowdfunding" description="Project cards, progress bars, and donor visibility." />
      </main>
    </div>
  );
};

export default Funding;
