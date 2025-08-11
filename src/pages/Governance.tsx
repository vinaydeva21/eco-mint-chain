import { Helmet } from "react-helmet-async";
import TopNav from "@/components/layout/TopNav";
import GovernanceHeader from "@/features/governance/components/GovernanceHeader";
import AllocationChart from "@/features/governance/components/AllocationChart";
import ProposalCard from "@/features/governance/components/ProposalCard";
import ProposalDialog from "@/features/governance/components/ProposalDialog";
import { useState } from "react";
import { useGovernance } from "@/features/governance/useGovernance";

const Governance = () => {
  const { activeProposals, proposals, allocations, balance, addTokens, quorumPercent, votes, getAvailableForProposal, castVote } = useGovernance();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<null | (typeof proposals)[number]>(null);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Governance & DAO – KarbonLedger CETP</title>
        <meta name="description" content="Proposals, token-weighted voting, and fund allocations for CETP clusters." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : '/governance'} />
      </Helmet>
      <TopNav />
      <main className="flex-1">
        <GovernanceHeader balance={balance} activeCount={activeProposals.length} quorumPercent={quorumPercent} onAddTokens={addTokens} />
        <section className="mx-auto max-w-6xl px-4 py-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="mb-3 text-xl font-semibold">Active Proposals</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {activeProposals.map((p) => (
                <ProposalCard key={p.id} proposal={p} onOpen={(pr) => { setSelected(pr); setOpen(true); }} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-3 text-xl font-semibold">Allocations</h2>
            <AllocationChart allocations={allocations} />
          </div>
        </section>
        <ProposalDialog open={open} onOpenChange={setOpen} proposal={selected} votes={votes} getAvailableForProposal={getAvailableForProposal} castVote={castVote} />
      </main>
    </div>
  );
};

export default Governance;
