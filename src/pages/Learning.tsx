import { Helmet } from "react-helmet-async";
import TopNav from "@/components/layout/TopNav";
import ComingSoon from "@/components/ComingSoon";

const Learning = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Learning & Training Hub – KarbonLedger CETP</title>
        <meta name="description" content="Courses, quizzes, certificates, and leaderboards for CETP operators." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : '/learning'} />
      </Helmet>
      <TopNav />
      <main className="flex-1">
        <ComingSoon title="Learning & Training Hub" description="Course catalog, progress tracking, and credentials." />
      </main>
    </div>
  );
};

export default Learning;
