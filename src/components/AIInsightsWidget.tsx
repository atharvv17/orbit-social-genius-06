
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, TrendingUp, Users, MessageSquare } from "lucide-react"

const insights = [
  {
    id: 1,
    type: "trend",
    title: "Industry Trending Topic",
    description: "AI automation is trending in your industry",
    action: "Generate post",
    icon: TrendingUp,
    gradient: "info-gradient",
  },
  {
    id: 2,
    type: "engagement",
    title: "Optimal Posting Time",
    description: "Posts at 2 PM get 45% more engagement",
    action: "Schedule for 2 PM",
    icon: MessageSquare,
    gradient: "success-gradient",
  },
  {
    id: 3,
    type: "competitor",
    title: "Competitor Insight",
    description: "Your competitor's video post got 2.3k views",
    action: "Analyze strategy",
    icon: Users,
    gradient: "warning-gradient",
  },
]

export function AIInsightsWidget() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          AI Insights
        </CardTitle>
        <Button size="sm" variant="outline">
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight) => (
          <div key={insight.id} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
            <div className={`w-10 h-10 ${insight.gradient} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <insight.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium">{insight.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
              <Button size="sm" variant="link" className="h-auto p-0 mt-2 text-primary">
                {insight.action} →
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
