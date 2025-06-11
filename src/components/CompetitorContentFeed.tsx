
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageSquare, Repeat2, Eye, TrendingUp, Clock } from "lucide-react"

const competitorPosts = [
  {
    id: 1,
    competitor: "Sarah Johnson",
    competitorAvatar: "/placeholder.svg",
    content: "Just launched our new AI-powered analytics platform! Excited to see how this transforms the way teams make data-driven decisions. What's your biggest challenge with analytics?",
    timestamp: "2 hours ago",
    likes: 347,
    comments: 52,
    shares: 23,
    views: 2834,
    isTopPerforming: true,
    engagement: 14.8
  },
  {
    id: 2,
    competitor: "Michael Chen",
    competitorAvatar: "/placeholder.svg",
    content: "Building in public: Here's what we learned from our first 1000 users. Thread 🧵",
    timestamp: "6 hours ago",
    likes: 189,
    comments: 34,
    shares: 12,
    views: 1567,
    isTopPerforming: false,
    engagement: 15.1
  },
  {
    id: 3,
    competitor: "Emma Davis",
    competitorAvatar: "/placeholder.svg",
    content: "The future of remote work isn't just about tools—it's about culture. Here's how we've built a thriving distributed team of 50+ people across 12 countries.",
    timestamp: "1 day ago",
    likes: 892,
    comments: 127,
    shares: 89,
    views: 5234,
    isTopPerforming: true,
    engagement: 21.2
  },
  {
    id: 4,
    competitor: "Sarah Johnson",
    competitorAvatar: "/placeholder.svg",
    content: "Quick tip: Your LinkedIn headline should tell people what you do, not just your job title. Which version sounds better to you?",
    timestamp: "2 days ago",
    likes: 234,
    comments: 67,
    shares: 18,
    views: 1987,
    isTopPerforming: false,
    engagement: 16.1
  }
]

export function CompetitorContentFeed() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Competitor Content Feed</h2>
          <p className="text-sm text-muted-foreground">Latest posts from your tracked competitors</p>
        </div>
        <Button variant="outline" size="sm">
          Refresh Feed
        </Button>
      </div>

      <div className="space-y-4">
        {competitorPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={post.competitorAvatar} />
                    <AvatarFallback>{post.competitor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{post.competitor}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {post.timestamp}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {post.isTopPerforming && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Top Performer
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs">
                    {post.engagement}% engagement
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed">{post.content}</p>
              
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Heart className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Repeat2 className="w-4 h-4" />
                    <span>{post.shares}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    <span>{post.views}</span>
                  </div>
                </div>
                
                <Button size="sm" variant="ghost" className="text-xs">
                  Analyze Post →
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
