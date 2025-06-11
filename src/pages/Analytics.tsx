
import React, { useState } from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { 
  Download, 
  Share2, 
  TrendingUp, 
  TrendingDown, 
  Filter,
  Calendar,
  BarChart3,
  Users,
  MessageSquare,
  Heart,
  Repeat2,
  Eye,
  Settings,
  Lightbulb
} from "lucide-react"
import { MetricCard } from "@/components/MetricCard"
import { EngagementTrendChart } from "@/components/EngagementTrendChart"
import { PostPerformanceChart } from "@/components/PostPerformanceChart"
import { EngagementBreakdownChart } from "@/components/EngagementBreakdownChart"
import { AIInsightsPanel } from "@/components/AIInsightsPanel"
import { TopPostsTable } from "@/components/TopPostsTable"

interface AnalyticsProps {
  isLinkedInConnected: boolean;
}

const Analytics = ({ isLinkedInConnected }: AnalyticsProps) => {
  const [dateRange, setDateRange] = useState("30")
  const [postType, setPostType] = useState("all")
  const [engagementType, setEngagementType] = useState("all")

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
                <h1 className="text-2xl font-bold">Analytics</h1>
                <p className="text-sm text-muted-foreground">Track your LinkedIn performance and discover insights</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Report
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Customize
                </Button>
              </div>
            </div>
          </header>

          {/* Filter Controls */}
          <div className="p-6 border-b bg-muted/20">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filters:</span>
              </div>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-32">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="365">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Select value={postType} onValueChange={setPostType}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Posts</SelectItem>
                  <SelectItem value="text">Text Posts</SelectItem>
                  <SelectItem value="image">Image Posts</SelectItem>
                  <SelectItem value="video">Video Posts</SelectItem>
                  <SelectItem value="article">Articles</SelectItem>
                </SelectContent>
              </Select>
              <Select value={engagementType} onValueChange={setEngagementType}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Engagement</SelectItem>
                  <SelectItem value="likes">Likes Only</SelectItem>
                  <SelectItem value="comments">Comments Only</SelectItem>
                  <SelectItem value="shares">Shares Only</SelectItem>
                </SelectContent>
              </Select>
              <Badge variant="secondary" className="ml-auto">
                {dateRange} days • {postType} • {engagementType}
              </Badge>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6 space-y-6">
            {/* Key Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Engagement"
                value="4,847"
                change="+23.1%"
                icon={BarChart3}
                gradient="linkedin-gradient"
              />
              <MetricCard
                title="Profile Views"
                value="2,134"
                change="+15.7%"
                icon={Eye}
                gradient="success-gradient"
              />
              <MetricCard
                title="Follower Growth"
                value="156"
                change="+8.4%"
                icon={Users}
                gradient="info-gradient"
              />
              <MetricCard
                title="Avg. Engagement Rate"
                value="5.8%"
                change="+2.1%"
                icon={TrendingUp}
                gradient="warning-gradient"
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Engagement Trend */}
              <div className="lg:col-span-2">
                <EngagementTrendChart />
              </div>
              
              {/* Engagement Breakdown */}
              <div>
                <EngagementBreakdownChart />
              </div>
            </div>

            {/* Post Performance and Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Post Performance */}
              <div className="lg:col-span-2">
                <PostPerformanceChart />
              </div>
              
              {/* AI Insights */}
              <div>
                <AIInsightsPanel />
              </div>
            </div>

            {/* Detailed Analytics */}
            <Tabs defaultValue="top-posts" className="space-y-6">
              <TabsList className="grid w-fit grid-cols-3">
                <TabsTrigger value="top-posts">Top Posts</TabsTrigger>
                <TabsTrigger value="audience">Audience</TabsTrigger>
                <TabsTrigger value="competitors">Competitors</TabsTrigger>
              </TabsList>

              <TabsContent value="top-posts">
                <TopPostsTable />
              </TabsContent>

              <TabsContent value="audience">
                <Card>
                  <CardHeader>
                    <CardTitle>Audience Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Audience analytics coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="competitors">
                <Card>
                  <CardHeader>
                    <CardTitle>Competitor Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Competitor insights coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Analytics
