import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import TopNav from "@/components/layout/TopNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Filters from "@/features/marketplace/components/Filters";
import CreditCard from "@/features/marketplace/components/CreditCard";
import CreditDialog from "@/features/marketplace/components/CreditDialog";
import { credits } from "@/features/marketplace/data";
import type { Credit, FilterState } from "@/features/marketplace/types";

const Marketplace = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    type: "All",
    region: "All",
    issuer: "All",
    maxPrice: 50,
    sort: "rating-desc",
  });
  const [active, setActive] = useState<Credit | null>(null);

  const regions = useMemo(() => Array.from(new Set(credits.map((c) => c.region))).sort(), []);
  const issuers = useMemo(() => Array.from(new Set(credits.map((c) => c.issuer))).sort(), []);

  const filtered = useMemo(() => {
    let list = credits.filter((c) => {
      const matchSearch = `${c.name} ${c.summary} ${c.issuer}`.toLowerCase().includes(filters.search.toLowerCase());
      const matchType = filters.type === "All" ? true : c.type === filters.type;
      const matchRegion = filters.region === "All" ? true : c.region === filters.region;
      const matchIssuer = filters.issuer === "All" ? true : c.issuer === filters.issuer;
      const matchPrice = c.priceUsd <= filters.maxPrice;
      return matchSearch && matchType && matchRegion && matchIssuer && matchPrice;
    });

    switch (filters.sort) {
      case "price-asc":
        list = list.slice().sort((a, b) => a.priceUsd - b.priceUsd);
        break;
      case "price-desc":
        list = list.slice().sort((a, b) => b.priceUsd - a.priceUsd);
        break;
      case "newest":
        list = list.slice().sort((a, b) => b.vintage - a.vintage);
        break;
      default:
        list = list.slice().sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [filters]);

  const jsonLd = useMemo(() => {
    const items = filtered.slice(0, 8).map((c) => ({
      "@type": "Product",
      name: c.name,
      description: c.summary,
      brand: { "@type": "Brand", name: c.issuer },
      category: c.type,
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: c.priceUsd,
        availability: c.available > 0 ? "http://schema.org/InStock" : "http://schema.org/OutOfStock",
      },
    }));
    return JSON.stringify({ "@context": "http://schema.org", "@type": "OfferCatalog", itemListElement: items });
  }, [filtered]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Marketplace – KarbonLedger CETP</title>
        <meta name="description" content="Discover, buy, or retire environmental credits with impact summaries." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : '/marketplace'} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      </Helmet>
      <TopNav />
      <main className="flex-1">
        <header className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-semibold tracking-tight">Marketplace</h1>
          <p className="text-muted-foreground mt-1">Filters, pricing, and buyer portfolios for credits trading.</p>
        </header>

        <section className="container mx-auto px-4 grid gap-6 lg:grid-cols-3 pb-8">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Browse Credits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Filters value={filters} onChange={setFilters} regions={regions} issuers={issuers} />
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((c) => (
                    <CreditCard key={c.id} credit={c} onView={setActive} />
                  ))}
                  {filtered.length === 0 && (
                    <div className="text-sm text-muted-foreground">No credits match your filters.</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Buyer Tips</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>Review methodology and SDG alignment before purchasing.</p>
                <p>Prices reflect supply, demand, and verification rigor.</p>
                <p>Use filters to match your ESG goals and budgets.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <CreditDialog open={!!active} onOpenChange={(v) => !v && setActive(null)} credit={active} />
    </div>
  );
};

export default Marketplace;
