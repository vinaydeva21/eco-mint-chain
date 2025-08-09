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
import { AuthProvider } from "./contexts/AuthContext";
import RequireAuth from "./components/auth/RequireAuth";
import RequireRole from "./components/auth/RequireRole";
import Unauthorized from "./pages/Unauthorized";
import Web3Providers from "./web3/providers/Web3Providers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Web3Providers>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              <Route
                path="/dashboard/operator"
                element={
                  <RequireAuth>
                    <RequireRole roles={["Operator"]}>
                      <OperatorDashboard />
                    </RequireRole>
                  </RequireAuth>
                }
              />

              <Route
                path="/dashboard/regulator"
                element={
                  <RequireAuth>
                    <RequireRole roles={["Regulator"]}>
                      <RegulatorDashboard />
                    </RequireRole>
                  </RequireAuth>
                }
              />

              <Route
                path="/mrv"
                element={
                  <RequireAuth>
                    <RequireRole roles={["Regulator", "Verifier"]}>
                      <MRV />
                    </RequireRole>
                  </RequireAuth>
                }
              />

              <Route
                path="/credits"
                element={
                  <RequireAuth>
                    <RequireRole roles={["Regulator", "Verifier"]}>
                      <Credits />
                    </RequireRole>
                  </RequireAuth>
                }
              />

              <Route
                path="/marketplace"
                element={
                  <RequireAuth>
                    <RequireRole roles={["Buyer", "Investor"]}>
                      <Marketplace />
                    </RequireRole>
                  </RequireAuth>
                }
              />

              <Route
                path="/governance"
                element={
                  <RequireAuth>
                    <RequireRole roles={["DAO Member"]}>
                      <Governance />
                    </RequireRole>
                  </RequireAuth>
                }
              />

              <Route
                path="/funding"
                element={
                  <RequireAuth>
                    <RequireRole roles={["DAO Member", "Investor"]}>
                      <Funding />
                    </RequireRole>
                  </RequireAuth>
                }
              />

              <Route
                path="/learning"
                element={
                  <RequireAuth>
                    <RequireRole roles={["Operator", "Trainer"]}>
                      <Learning />
                    </RequireRole>
                  </RequireAuth>
                }
              />

              <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </Web3Providers>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
