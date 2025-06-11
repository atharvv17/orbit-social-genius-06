
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Badge } from "@/components/ui/badge"

const data = [
  { 
    post: "Post 1", 
    engagement: 145, 
    likes: 89, 
    comments: 34, 
    shares: 22,
    type: "image",
    title: "5 LinkedIn tips that changed my career"
  },
  { 
    post: "Post 2", 
    engagement: 123, 
    likes: 78, 
    comments: 28, 
    shares: 17,
    type: "text",
    title: "The future of remote work is here"
  },
  { 
    post: "Post 3", 
    engagement: 98, 
    likes: 65, 
    comments: 22, 
    shares: 11,
    type: "video",
    title: "Behind the scenes of our product launch"
  },
  { 
    post: "Post 4", 
    engagement: 87, 
    likes: 56, 
    comments: 19, 
    shares: 12,
    type: "article",
    title: "How to build a personal brand on LinkedIn"
  },
  { 
    post: "Post 5", 
    engagement: 76, 
    likes: 48, 
    comments: 18, 
    shares: 10,
    type: "image",
    title: "Office setup tour - productivity edition"
  },
]

export function PostPerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Post Performance Comparison</CardTitle>
        <p className="text-sm text-muted-foreground">
          Your top 5 posts by total engagement
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="post" 
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
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload
                  return (
                    <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                      <p className="font-medium mb-2">{data.title}</p>
                      <div className="space-y-1">
                        <p className="text-sm">Total Engagement: <span className="font-semibold">{data.engagement}</span></p>
                        <p className="text-sm">Likes: <span className="font-semibold">{data.likes}</span></p>
                        <p className="text-sm">Comments: <span className="font-semibold">{data.comments}</span></p>
                        <p className="text-sm">Shares: <span className="font-semibold">{data.shares}</span></p>
                      </div>
                      <Badge variant="secondary" className="mt-2 text-xs">
                        {data.type}
                      </Badge>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar 
              dataKey="engagement" 
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">
            💡 <strong>Insight:</strong> Image posts perform 23% better than text-only posts
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
