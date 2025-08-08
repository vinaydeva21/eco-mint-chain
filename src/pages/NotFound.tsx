import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Page Not Found – KarbonLedger CETP</title>
        <meta name="description" content="The page you were looking for could not be found." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : '/404'} />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-4">Oops! Page not found</p>
          <a href="/" className="text-primary underline-offset-4 hover:underline">
            Return to Home
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
