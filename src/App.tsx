
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import SchedulePost from "./pages/SchedulePost";
import Analytics from "./pages/Analytics";
import Competitors from "./pages/Competitors";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isLinkedInConnected, setIsLinkedInConnected] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <Index 
                  isLinkedInConnected={isLinkedInConnected} 
                  setIsLinkedInConnected={setIsLinkedInConnected} 
                />
              } 
            />
            <Route 
              path="/schedule-post" 
              element={
                isLinkedInConnected ? (
                  <SchedulePost isLinkedInConnected={isLinkedInConnected} />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            <Route 
              path="/analytics" 
              element={
                isLinkedInConnected ? (
                  <Analytics isLinkedInConnected={isLinkedInConnected} />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
