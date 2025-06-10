
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Mon", engagement: 24 },
  { name: "Tue", engagement: 38 },
  { name: "Wed", engagement: 45 },
  { name: "Thu", engagement: 32 },
  { name: "Fri", engagement: 58 },
  { name: "Sat", engagement: 22 },
  { name: "Sun", engagement: 35 },
]

export function EngagementChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Weekly Engagement</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="engagement" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
