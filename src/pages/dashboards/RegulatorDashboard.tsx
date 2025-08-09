import { Helmet } from "react-helmet-async";
import TopNav from "@/components/layout/TopNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GlobeMap from "@/components/maps/GlobeMap";
import Filters, { type FilterState } from "@/features/regulator/components/Filters";
import IncidentLog from "@/features/regulator/components/IncidentLog";
import ESGReport from "@/features/regulator/components/ESGReport";
import { cetps as allCetps, incidents as allIncidents } from "@/features/regulator/data";
import { useMemo, useState } from "react";

const RegulatorDashboard = () => {
  const [filters, setFilters] = useState<FilterState>({ search: "", status: "All" });
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const cetps = useMemo(() => {
    return allCetps.filter((c) => {
      const matchSearch = `${c.name} ${c.region}`.toLowerCase().includes(filters.search.toLowerCase());
      const matchStatus = filters.status === "All" ? true : c.status === filters.status;
      return matchSearch && matchStatus;
    });
  }, [filters]);

  const incidents = useMemo(() => {
    const set = new Set(cetps.map((c) => c.id));
    return allIncidents.filter((i) => set.has(i.cetpId));
  }, [cetps]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Regulator Dashboard – KarbonLedger CETP</title>
        <meta name="description" content="Oversight of CETP clusters with geotagged map, incident logs, filters, and ESG reports." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : '/dashboard/regulator'} />
      </Helmet>
      <TopNav />
      <main className="flex-1">
        <header className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-semibold tracking-tight">Regulator Dashboard</h1>
          <p className="text-muted-foreground mt-1">Geotagged CETPs, incident logs, filters, and ESG-compliant reporting.</p>
        </header>

        <section className="container mx-auto px-4 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <GlobeMap
              cetps={cetps.map(({ id, name, lat, lng, status }) => ({ id, name, lat, lng, status }))}
              onSelect={(id) => setSelectedId(id)}
            />
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <Filters value={filters} onChange={setFilters} />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-4">
            <ESGReport cetps={cetps} />
            {selectedId && (
              <Card>
                <CardHeader>
                  <CardTitle>Selected Facility</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm">
                    {cetps.find((c) => c.id === selectedId)?.name}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        <section className="container mx-auto px-4 py-6">
          <Card>
            <CardHeader>
              <CardTitle>Incident Log</CardTitle>
            </CardHeader>
            <CardContent>
              <IncidentLog incidents={incidents} />
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default RegulatorDashboard;
