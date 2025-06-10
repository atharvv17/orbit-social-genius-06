
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Target, TrendingUp } from "lucide-react"

const competitors = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Tech Leader",
    avatar: "/placeholder.svg",
    engagement: "2.3k",
    trend: "+15%",
    topPost: "AI trends reshaping the future of work...",
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Product Manager",
    avatar: "/placeholder.svg",
    engagement: "1.8k",
    trend: "+23%",
    topPost: "Building products that users actually love...",
  },
  {
    id: 3,
    name: "Emma Davis",
    title: "Marketing Director",
    avatar: "/placeholder.svg",
    engagement: "3.1k",
    trend: "+8%",
    topPost: "Content marketing strategies that convert...",
  },
]

export function CompetitorAnalysisWidget() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Competitor Analysis
        </CardTitle>
        <Button size="sm" variant="outline">
          Add Competitor
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {competitors.map((competitor) => (
          <div key={competitor.id} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
            <Avatar className="w-10 h-10">
              <AvatarImage src={competitor.avatar} />
              <AvatarFallback>{competitor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">{competitor.name}</h4>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  {competitor.trend}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{competitor.title}</p>
              <p className="text-xs text-muted-foreground mt-1 truncate">{competitor.topPost}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs font-medium">{competitor.engagement} avg. engagement</span>
                <Button size="sm" variant="link" className="h-auto p-0 text-primary text-xs">
                  Analyze →
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
