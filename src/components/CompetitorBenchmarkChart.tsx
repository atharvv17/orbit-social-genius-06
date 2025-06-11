
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts"
import { TrendingUp, Users, Heart } from "lucide-react"

const benchmarkData = [
  {
    metric: "Avg. Likes",
    you: 145,
    sarah: 312,
    michael: 189,
    emma: 267
  },
  {
    metric: "Avg. Comments",
    you: 23,
    sarah: 45,
    michael: 31,
    emma: 89
  },
  {
    metric: "Avg. Shares",
    you: 8,
    sarah: 19,
    michael: 12,
    emma: 34
  },
  {
    metric: "Posts/Week",
    you: 3,
    sarah: 5,
    michael: 4,
    emma: 7
  },
  {
    metric: "Engagement Rate",
    you: 4.2,
    sarah: 6.8,
    michael: 5.1,
    emma: 8.9
  }
]

const chartConfig = {
  you: {
    label: "You",
    color: "#3b82f6"
  },
  sarah: {
    label: "Sarah Johnson",
    color: "#10b981"
  },
  michael: {
    label: "Michael Chen",
    color: "#f59e0b"
  },
  emma: {
    label: "Emma Davis",
    color: "#8b5cf6"
  }
}

export function CompetitorBenchmarkChart() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-xs text-muted-foreground">Your Position</p>
                <p className="text-lg font-semibold">#3 of 4</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-xs text-muted-foreground">Top Performer</p>
                <p className="text-lg font-semibold">Emma Davis</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-600" />
              <div>
                <p className="text-xs text-muted-foreground">Improvement Gap</p>
                <p className="text-lg font-semibold">+112%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Benchmark</CardTitle>
          <p className="text-sm text-muted-foreground">
            Compare your metrics with tracked competitors
          </p>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <BarChart data={benchmarkData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="metric" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="you" fill="var(--color-you)" radius={4} />
              <Bar dataKey="sarah" fill="var(--color-sarah)" radius={4} />
              <Bar dataKey="michael" fill="var(--color-michael)" radius={4} />
              <Bar dataKey="emma" fill="var(--color-emma)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
            <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Emma Davis leads in engagement rate</p>
              <p className="text-xs text-muted-foreground">Her posts with questions get 3x more comments than average</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
            <Users className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium">You're posting less frequently</p>
              <p className="text-xs text-muted-foreground">Consider increasing to 5-7 posts per week to match top performers</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
            <Heart className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Opportunity in visual content</p>
              <p className="text-xs text-muted-foreground">Competitors using images/videos get 40% more engagement</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
