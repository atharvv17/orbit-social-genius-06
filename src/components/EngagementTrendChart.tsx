
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"

const data = [
  { date: "Jan 1", engagement: 45, likes: 28, comments: 12, shares: 5 },
  { date: "Jan 8", engagement: 52, likes: 32, comments: 15, shares: 5 },
  { date: "Jan 15", engagement: 48, likes: 30, comments: 13, shares: 5 },
  { date: "Jan 22", engagement: 78, likes: 48, comments: 22, shares: 8 },
  { date: "Jan 29", engagement: 65, likes: 40, comments: 18, shares: 7 },
  { date: "Feb 5", engagement: 85, likes: 52, comments: 25, shares: 8 },
  { date: "Feb 12", engagement: 72, likes: 45, comments: 20, shares: 7 },
  { date: "Feb 19", engagement: 95, likes: 58, comments: 28, shares: 9 },
  { date: "Feb 26", engagement: 88, likes: 54, comments: 26, shares: 8 },
]

export function EngagementTrendChart() {
  const averageEngagement = data.reduce((acc, item) => acc + item.engagement, 0) / data.length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Engagement Trends</CardTitle>
          <div className="flex items-center gap-2 text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">+12.5% this period</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="date" 
              className="text-xs" 
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              className="text-xs" 
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
                fontSize: '12px'
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <ReferenceLine 
              y={averageEngagement} 
              stroke="hsl(var(--muted-foreground))" 
              strokeDasharray="5 5"
              label={{ value: "Average", position: "right" }}
            />
            <Line 
              type="monotone" 
              dataKey="engagement" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="likes" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={false}
              opacity={0.7}
            />
            <Line 
              type="monotone" 
              dataKey="comments" 
              stroke="#f59e0b" 
              strokeWidth={2}
              dot={false}
              opacity={0.7}
            />
            <Line 
              type="monotone" 
              dataKey="shares" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={false}
              opacity={0.7}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center gap-6 mt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span>Total Engagement</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Likes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Comments</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Shares</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
