import { Helmet } from "react-helmet-async";
import TopNav from "@/components/layout/TopNav";
import FundingFilters from "@/features/funding/components/Filters";
import ProjectCard from "@/features/funding/components/ProjectCard";
import ProjectDialog from "@/features/funding/components/ProjectDialog";
import { useState } from "react";
import { useFunding } from "@/features/funding/useFunding";

const Funding = () => {
  const { filtered } = useFunding();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<null | (typeof filtered)[number]>(null);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Funding & Crowdfunding – KarbonLedger CETP</title>
        <meta name="description" content="Finance CETP upgrades with milestone tracking and impact dashboards." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : '/funding'} />
      </Helmet>
      <TopNav />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 py-6">
          <header className="mb-4">
            <h1 className="text-3xl font-semibold">Funding & Crowdfunding</h1>
            <p className="text-muted-foreground">Project cards, progress bars, and donor visibility.</p>
          </header>
          <FundingFilters />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={(prj) => { setSelected(prj); setOpen(true); }} />
            ))}
          </div>
        </section>
        <ProjectDialog open={open} onOpenChange={setOpen} project={selected} />
      </main>
    </div>
  );
};

export default Funding;
