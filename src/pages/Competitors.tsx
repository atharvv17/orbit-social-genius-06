
import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CompetitorAnalysisWidget } from "@/components/CompetitorAnalysisWidget"
import { CompetitorContentFeed } from "@/components/CompetitorContentFeed"
import { CompetitorBenchmarkChart } from "@/components/CompetitorBenchmarkChart"
import { CompetitorInsightsPanel } from "@/components/CompetitorInsightsPanel"
import { PlusCircle, Search, Filter, TrendingUp, Users, BarChart3 } from "lucide-react"

interface CompetitorsProps {
  isLinkedInConnected: boolean
}

export default function Competitors({ isLinkedInConnected }: CompetitorsProps) {
  const [newCompetitorUrl, setNewCompetitorUrl] = useState("")
  const [timeFilter, setTimeFilter] = useState("30d")

  const handleAddCompetitor = () => {
    // Add competitor logic here
    console.log("Adding competitor:", newCompetitorUrl)
    setNewCompetitorUrl("")
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar isLinkedInConnected={isLinkedInConnected} />
        <main className="flex-1 p-6 bg-muted/20">
          <div className="flex items-center gap-4 mb-6">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-3xl font-bold tracking-tight">Competitor Analysis</h1>
              <p className="text-muted-foreground">
                Analyze competitor strategies and discover content opportunities
              </p>
            </div>
          </div>

          {/* Add Competitor Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5" />
                Add New Competitor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter LinkedIn profile URL or company name..."
                  value={newCompetitorUrl}
                  onChange={(e) => setNewCompetitorUrl(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleAddCompetitor}>
                  <Search className="w-4 h-4 mr-2" />
                  Add Competitor
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 3 months</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Content Feed
              </TabsTrigger>
              <TabsTrigger value="benchmark" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Benchmark
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                AI Insights
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <CompetitorAnalysisWidget />
            </TabsContent>

            <TabsContent value="content" className="space-y-6">
              <CompetitorContentFeed />
            </TabsContent>

            <TabsContent value="benchmark" className="space-y-6">
              <CompetitorBenchmarkChart />
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <CompetitorInsightsPanel />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </SidebarProvider>
  )
}
