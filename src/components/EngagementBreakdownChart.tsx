
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Heart, MessageSquare, Repeat2, Eye } from "lucide-react"

const data = [
  { name: "Likes", value: 1847, color: "#10b981", icon: Heart },
  { name: "Comments", value: 523, color: "#f59e0b", icon: MessageSquare },
  { name: "Shares", value: 234, color: "#3b82f6", icon: Repeat2 },
  { name: "Views", value: 3456, color: "#8b5cf6", icon: Eye },
]

export function EngagementBreakdownChart() {
  const total = data.reduce((acc, item) => acc + item.value, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Engagement Breakdown</CardTitle>
        <p className="text-sm text-muted-foreground">
          Distribution of engagement types
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
                fontSize: '12px'
              }}
              formatter={(value, name) => [
                `${value} (${((value / total) * 100).toFixed(1)}%)`,
                name
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Legend with detailed stats */}
        <div className="space-y-3 mt-4">
          {data.map((item) => {
            const Icon = item.icon
            const percentage = ((item.value / total) * 100).toFixed(1)
            return (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <Icon className="w-4 h-4" style={{ color: item.color }} />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{item.value.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">{percentage}%</div>
                </div>
              </div>
            )
          })}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            💡 <strong>Tip:</strong> Comments indicate high engagement quality
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
