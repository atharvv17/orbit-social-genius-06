import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { MetricCard } from "@/components/MetricCard"
import { ScheduledPostsWidget } from "@/components/ScheduledPostsWidget"
import { AIInsightsWidget } from "@/components/AIInsightsWidget"
import { EngagementChart } from "@/components/EngagementChart"
import { CompetitorAnalysisWidget } from "@/components/CompetitorAnalysisWidget"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { useState } from "react"
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  Calendar,
  Zap,
  Target,
  Plus,
  Bell,
  Linkedin
} from "lucide-react"

interface IndexProps {
  isLinkedInConnected: boolean;
  setIsLinkedInConnected: (connected: boolean) => void;
}

const Index = ({ isLinkedInConnected, setIsLinkedInConnected }: IndexProps) => {
  const handleConnectLinkedIn = () => {
    // Simulate LinkedIn connection process
    // In a real app, this would trigger OAuth flow
    setIsLinkedInConnected(true)
  }

  if (!isLinkedInConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#0077B5] rounded-full flex items-center justify-center">
              <Linkedin className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Connect Your LinkedIn</CardTitle>
            <p className="text-muted-foreground">
              Connect your LinkedIn account to start managing your posts and analyzing engagement.
            </p>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleConnectLinkedIn}
              className="w-full h-12 text-white font-semibold"
              style={{ backgroundColor: '#0077B5' }}
            >
              <Linkedin className="w-5 h-5 mr-3" />
              Connect LinkedIn
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-4">
              We'll redirect you to LinkedIn to authorize access to your account.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar isLinkedInConnected={isLinkedInConnected} />
        
        <main className="flex-1 overflow-auto">
          {/* Header */}
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger />
              <div className="flex-1">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back! Here's what's happening with your LinkedIn presence.</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </Button>
                <Button size="sm" className="linkedin-gradient text-white hover:opacity-90" asChild>
                  <Link to="/schedule-post">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Post
                  </Link>
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="p-6 space-y-6">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Engagement"
                value="2,847"
                change="+12.3%"
                icon={BarChart3}
                gradient="linkedin-gradient"
              />
              <MetricCard
                title="Profile Views"
                value="1,234"
                change="+8.1%"
                icon={Users}
                gradient="success-gradient"
              />
              <MetricCard
                title="Post Interactions"
                value="456"
                change="+15.7%"
                icon={MessageSquare}
                gradient="info-gradient"
              />
              <MetricCard
                title="Scheduled Posts"
                value="12"
                change="+3"
                icon={Calendar}
                gradient="warning-gradient"
              />
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                <ScheduledPostsWidget />
                <EngagementChart />
                
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button className="h-auto p-4 flex flex-col items-center gap-2 linkedin-gradient text-white hover:opacity-90" asChild>
                        <Link to="/schedule-post">
                          <Zap className="w-6 h-6" />
                          <span className="text-sm font-medium">AI Post Generator</span>
                          <span className="text-xs opacity-90">Create engaging content instantly</span>
                        </Link>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                        <Target className="w-6 h-6" />
                        <span className="text-sm font-medium">Analyze Competitors</span>
                        <span className="text-xs text-muted-foreground">Discover what works for others</span>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
                        <Link to="/schedule-post">
                          <Calendar className="w-6 h-6" />
                          <span className="text-sm font-medium">Schedule Posts</span>
                          <span className="text-xs text-muted-foreground">Plan your content calendar</span>
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <AIInsightsWidget />
                <CompetitorAnalysisWidget />
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
