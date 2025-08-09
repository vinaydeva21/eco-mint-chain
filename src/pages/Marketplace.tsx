import { Helmet } from "react-helmet-async";
import TopNav from "@/components/layout/TopNav";
import ComingSoon from "@/components/ComingSoon";

const Marketplace = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Marketplace – KarbonLedger CETP</title>
        <meta name="description" content="Discover, buy, or retire environmental credits with impact summaries." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : '/marketplace'} />
      </Helmet>
      <TopNav />
      <main className="flex-1">
        <ComingSoon title="Marketplace" description="Filters, pricing, and buyer portfolios for credits trading." />
      </main>
    </div>
  );
};

export default Marketplace;
