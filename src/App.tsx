import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import OperatorDashboard from "./pages/dashboards/OperatorDashboard";
import RegulatorDashboard from "./pages/dashboards/RegulatorDashboard";
import MRV from "./pages/MRV";
import Credits from "./pages/Credits";
import Marketplace from "./pages/Marketplace";
import Governance from "./pages/Governance";
import Funding from "./pages/Funding";
import Learning from "./pages/Learning";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard/operator" element={<OperatorDashboard />} />
            <Route path="/dashboard/regulator" element={<RegulatorDashboard />} />
            <Route path="/mrv" element={<MRV />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/governance" element={<Governance />} />
            <Route path="/funding" element={<Funding />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/profile" element={<Profile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
