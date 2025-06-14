
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { LoginForm } from "@/components/LoginForm";
import Index from "./pages/Index";
import SchedulePost from "./pages/SchedulePost";
import Analytics from "./pages/Analytics";
import Competitors from "./pages/Competitors";
import ContentLibrary from "./pages/ContentLibrary";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <Routes>
      <Route 
        path="/" 
        element={<Index isLinkedInConnected={user.linkedin_connected} />} 
      />
      <Route 
        path="/schedule-post" 
        element={<SchedulePost isLinkedInConnected={user.linkedin_connected} />}
      />
      <Route 
        path="/analytics" 
        element={<Analytics isLinkedInConnected={user.linkedin_connected} />}
      />
      <Route 
        path="/competitors" 
        element={<Competitors isLinkedInConnected={user.linkedin_connected} />}
      />
      <Route 
        path="/content-library" 
        element={<ContentLibrary isLinkedInConnected={user.linkedin_connected} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
