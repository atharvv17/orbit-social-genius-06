
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Edit, FileText } from "lucide-react"
import { Link } from "react-router-dom"

const scheduledPosts = [
  {
    id: 1,
    content: "Excited to share our latest insights on AI in recruitment...",
    scheduledTime: "Today, 2:00 PM",
    platform: "LinkedIn",
  },
  {
    id: 2,
    content: "Key takeaways from the industry conference...",
    scheduledTime: "Tomorrow, 9:00 AM",
    platform: "LinkedIn",
  },
  {
    id: 3,
    content: "Team collaboration best practices that actually work...",
    scheduledTime: "Dec 12, 3:00 PM",
    platform: "LinkedIn",
  },
]

export function ScheduledPostsWidget() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Scheduled Posts</CardTitle>
        <Button size="sm" className="linkedin-gradient text-white hover:opacity-90" asChild>
          <Link to="/schedule-post">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule New
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {scheduledPosts.map((post) => (
          <div key={post.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
            <div className="w-10 h-10 linkedin-gradient rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{post.content}</p>
              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {post.scheduledTime}
              </div>
            </div>
            <Button size="sm" variant="ghost" className="flex-shrink-0">
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
