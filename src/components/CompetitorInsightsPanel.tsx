
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Lightbulb, Target, TrendingUp, AlertCircle, ChevronRight } from "lucide-react"

const insights = [
  {
    type: "opportunity",
    title: "Content Gap Identified",
    description: "Your competitors rarely post about industry trends. This is an opportunity to establish thought leadership.",
    impact: "High",
    action: "Create trend analysis posts",
    icon: Target,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    type: "strategy",
    title: "Optimal Posting Time",
    description: "Top performers post between 9-11 AM on Tuesday-Thursday for maximum engagement.",
    impact: "Medium",
    action: "Adjust posting schedule",
    icon: TrendingUp,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    type: "content",
    title: "Question-Based Posts Win",
    description: "Posts ending with questions get 67% more comments across all tracked competitors.",
    impact: "High",
    action: "Add questions to posts",
    icon: Lightbulb,
    color: "text-amber-600",
    bgColor: "bg-amber-50"
  },
  {
    type: "warning",
    title: "Declining Engagement Trend",
    description: "Sarah Johnson's engagement dropped 23% this month - avoid similar content patterns.",
    impact: "Medium",
    action: "Review content strategy",
    icon: AlertCircle,
    color: "text-red-600",
    bgColor: "bg-red-50"
  }
]

const contentThemes = [
  { theme: "Thought Leadership", percentage: 35, trend: "+5%" },
  { theme: "Product Updates", percentage: 25, trend: "-2%" },
  { theme: "Industry News", percentage: 20, trend: "+8%" },
  { theme: "Personal Stories", percentage: 15, trend: "+12%" },
  { theme: "Behind the Scenes", percentage: 5, trend: "0%" }
]

export function CompetitorInsightsPanel() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            AI-Powered Insights
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Actionable recommendations based on competitor analysis
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon
            return (
              <div key={index} className={`p-4 rounded-lg border ${insight.bgColor}`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${insight.color}`} />
                    <h4 className="font-medium">{insight.title}</h4>
                  </div>
                  <Badge variant={insight.impact === "High" ? "default" : "secondary"} className="text-xs">
                    {insight.impact} Impact
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                <Button size="sm" variant="outline" className="text-xs">
                  {insight.action}
                  <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            )
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content Strategy Breakdown</CardTitle>
          <p className="text-sm text-muted-foreground">
            What your competitors are posting about
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {contentThemes.map((theme, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{theme.theme}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{theme.percentage}%</span>
                    <span className={`text-xs ${theme.trend.startsWith('+') ? 'text-green-600' : theme.trend.startsWith('-') ? 'text-red-600' : 'text-gray-600'}`}>
                      {theme.trend}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${theme.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Opportunities & Gaps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-800">🎯 Content Gap</h4>
            <p className="text-sm text-green-700">No competitors are posting about AI automation - big opportunity!</p>
          </div>
          
          <div className="p-3 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800">📈 Timing Opportunity</h4>
            <p className="text-sm text-blue-700">Weekend posts have 45% less competition but 20% more visibility</p>
          </div>
          
          <div className="p-3 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-800">🔍 Format Gap</h4>
            <p className="text-sm text-purple-700">Only 15% of competitor posts use polls - consider adding more interactive content</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
