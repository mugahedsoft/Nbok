import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { initDB } from "@/lib/db";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";

const Index = lazy(() => import("./pages/Index"));
const AddTransaction = lazy(() => import("./pages/AddTransaction"));
const DailyReport = lazy(() => import("./pages/DailyReport"));
const WeeklyReport = lazy(() => import("./pages/WeeklyReport"));
const MonthlyReport = lazy(() => import("./pages/MonthlyReport"));
const Transactions = lazy(() => import("./pages/Transactions"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize IndexedDB on app load
    initDB().catch(console.error);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <PWAInstallPrompt />
        <BrowserRouter>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/add-transaction" element={<AddTransaction />} />
              <Route path="/daily-report" element={<DailyReport />} />
              <Route path="/weekly-report" element={<WeeklyReport />} />
              <Route path="/monthly-report" element={<MonthlyReport />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
