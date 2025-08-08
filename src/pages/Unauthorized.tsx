import { Helmet } from "react-helmet-async";
import TopNav from "@/components/layout/TopNav";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>403 Unauthorized – KarbonLedger CETP</title>
        <meta name="description" content="You do not have access to this page." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : '/unauthorized'} />
      </Helmet>
      <TopNav />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-2">403 – Unauthorized</h1>
          <p className="text-muted-foreground mb-6">Your role does not permit access to this resource.</p>
          <div className="flex items-center justify-center gap-3">
            <Link to="/">
              <Button variant="outline">Go Home</Button>
            </Link>
            <Link to="/login">
              <Button variant="hero">Switch Role</Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Unauthorized;
