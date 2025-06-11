
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Lightbulb, TrendingUp, Clock, Target, ArrowRight } from "lucide-react"

const insights = [
  {
    type: "performance",
    title: "Peak Engagement Time",
    description: "Your posts get 40% more engagement when posted between 9-11 AM on weekdays",
    impact: "high",
    icon: Clock,
    action: "Schedule next post at 10 AM"
  },
  {
    type: "content",
    title: "Question Posts Win",
    description: "Posts with questions get 65% more comments than statements",
    impact: "high", 
    icon: Target,
    action: "Add questions to posts"
  },
  {
    type: "trending",
    title: "Hashtag Performance",
    description: "#productivity and #remotework are your top performing hashtags",
    impact: "medium",
    icon: TrendingUp,
    action: "Use in next 3 posts"
  },
  {
    type: "optimization",
    title: "Video Opportunity",
    description: "Video posts in your niche get 3x more engagement than images",
    impact: "high",
    icon: Lightbulb,
    action: "Create video content"
  }
]

export function AIInsightsPanel() {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high": return "bg-red-100 text-red-800 border-red-200"
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low": return "bg-green-100 text-green-800 border-green-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          <CardTitle className="text-lg font-semibold">AI Insights</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Personalized recommendations to boost your performance
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon
          return (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <h4 className="text-sm font-semibold">{insight.title}</h4>
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getImpactColor(insight.impact)}`}
                >
                  {insight.impact} impact
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground">
                {insight.description}
              </p>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-xs h-8"
              >
                {insight.action}
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          )
        })}
        
        <div className="pt-4 border-t">
          <Button variant="ghost" size="sm" className="w-full text-xs">
            <Lightbulb className="w-3 h-3 mr-2" />
            Get More Insights
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
