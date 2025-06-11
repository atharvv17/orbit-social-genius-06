
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Heart, MessageSquare, Repeat2, TrendingUp, TrendingDown, ExternalLink } from "lucide-react"

const topPosts = [
  {
    id: 1,
    title: "5 LinkedIn tips that transformed my career in 30 days",
    type: "image",
    date: "2024-01-15",
    likes: 1247,
    comments: 89,
    shares: 156,
    views: 12450,
    engagement: 1492,
    trend: "up",
    trendValue: "+23%"
  },
  {
    id: 2,
    title: "The future of remote work: What I learned managing a distributed team",
    type: "text",
    date: "2024-01-12",
    likes: 892,
    comments: 134,
    shares: 78,
    views: 8934,
    engagement: 1104,
    trend: "up",
    trendValue: "+15%"
  },
  {
    id: 3,
    title: "Behind the scenes: Our product launch strategy revealed",
    type: "video",
    date: "2024-01-10",
    likes: 756,
    comments: 67,
    shares: 89,
    views: 9876,
    engagement: 912,
    trend: "down",
    trendValue: "-5%"
  },
  {
    id: 4,
    title: "How to build an authentic personal brand on LinkedIn",
    type: "article",
    date: "2024-01-08",
    likes: 634,
    comments: 45,
    shares: 67,
    views: 7823,
    engagement: 746,
    trend: "up",
    trendValue: "+8%"
  },
  {
    id: 5,
    title: "My home office setup tour - productivity edition",
    type: "image",
    date: "2024-01-05",
    likes: 523,
    comments: 34,
    shares: 23,
    views: 5234,
    engagement: 580,
    trend: "up",
    trendValue: "+12%"
  }
]

export function TopPostsTable() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "video": return "bg-purple-100 text-purple-800 border-purple-200"
      case "image": return "bg-blue-100 text-blue-800 border-blue-200"
      case "article": return "bg-green-100 text-green-800 border-green-200"
      case "text": return "bg-gray-100 text-gray-800 border-gray-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Top Performing Posts</CardTitle>
        <p className="text-sm text-muted-foreground">
          Your best content ranked by total engagement
        </p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Post</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-center">
                <Heart className="w-4 h-4 mx-auto" />
              </TableHead>
              <TableHead className="text-center">
                <MessageSquare className="w-4 h-4 mx-auto" />
              </TableHead>
              <TableHead className="text-center">
                <Repeat2 className="w-4 h-4 mx-auto" />
              </TableHead>
              <TableHead>Total Engagement</TableHead>
              <TableHead>Trend</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>
                  <div className="max-w-xs">
                    <p className="text-sm font-medium line-clamp-2">{post.title}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getTypeColor(post.type)}`}
                  >
                    {post.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(post.date).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-center text-sm">
                  {post.likes.toLocaleString()}
                </TableCell>
                <TableCell className="text-center text-sm">
                  {post.comments.toLocaleString()}
                </TableCell>
                <TableCell className="text-center text-sm">
                  {post.shares.toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="text-sm font-semibold">
                    {post.engagement.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {post.views.toLocaleString()} views
                  </div>
                </TableCell>
                <TableCell>
                  <div className={`flex items-center gap-1 text-xs ${
                    post.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {post.trend === 'up' ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {post.trendValue}
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
