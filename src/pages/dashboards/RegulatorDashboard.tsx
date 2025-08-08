import { Helmet } from "react-helmet-async";
import TopNav from "@/components/layout/TopNav";
import ComingSoon from "@/components/ComingSoon";

const RegulatorDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Regulator Dashboard – KarbonLedger CETP</title>
        <meta name="description" content="Oversight of CETP clusters with map views, incident logs, and audit trails." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : '/dashboard/regulator'} />
      </Helmet>
      <TopNav />
      <main className="flex-1">
        <ComingSoon title="Regulator Dashboard" description="Geotagged CETPs, incident logs, filters, and ESG-compliant reporting." />
      </main>
    </div>
  );
};

export default RegulatorDashboard;
