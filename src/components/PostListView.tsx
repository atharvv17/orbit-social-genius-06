
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { 
  Edit, 
  Trash2, 
  Copy, 
  MoreHorizontal, 
  Calendar,
  Clock,
  BarChart3,
  CheckSquare,
  Square
} from "lucide-react"
import { format } from "date-fns"
import { toast } from "@/hooks/use-toast"

interface PostListViewProps {
  searchQuery: string
}

// Mock data for posts
const posts = [
  {
    id: 1,
    content: "Excited to share our latest insights on AI in recruitment and how it's transforming the industry...",
    scheduledDate: new Date(2024, 11, 15, 14, 0),
    status: "scheduled",
    engagement: { expected: 245, actual: 0 }
  },
  {
    id: 2,
    content: "Key takeaways from the industry conference that every founder should know...",
    scheduledDate: new Date(2024, 11, 18, 9, 0),
    status: "scheduled",
    engagement: { expected: 180, actual: 0 }
  },
  {
    id: 3,
    content: "Team collaboration best practices that actually work in remote environments...",
    scheduledDate: new Date(2024, 11, 10, 15, 0),
    status: "published",
    engagement: { expected: 200, actual: 287 }
  },
  {
    id: 4,
    content: "The future of work: insights from 100+ startup founders on building distributed teams...",
    scheduledDate: new Date(2024, 11, 20, 15, 0),
    status: "draft",
    engagement: { expected: 0, actual: 0 }
  },
]

export function PostListView({ searchQuery }: PostListViewProps) {
  const [selectedPosts, setSelectedPosts] = useState<number[]>([])
  const [sortBy, setSortBy] = useState<string>("date")

  const filteredPosts = posts.filter(post => 
    searchQuery === "" || post.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-blue-100 text-blue-800 border-blue-200"
      case "published": return "bg-green-100 text-green-800 border-green-200"
      case "draft": return "bg-gray-100 text-gray-800 border-gray-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleSelectPost = (postId: number) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  const handleSelectAll = () => {
    setSelectedPosts(
      selectedPosts.length === filteredPosts.length 
        ? []
        : filteredPosts.map(post => post.id)
    )
  }

  const handleBulkAction = (action: string) => {
    toast({
      title: `Bulk ${action}`,
      description: `${action} applied to ${selectedPosts.length} posts.`,
    })
    setSelectedPosts([])
  }

  const handlePostAction = (postId: number, action: string) => {
    toast({
      title: action,
      description: `Post ${action.toLowerCase()} successfully.`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            All Posts
          </CardTitle>
          
          {/* Bulk Actions */}
          {selectedPosts.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {selectedPosts.length} selected
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleBulkAction("Reschedule")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Reschedule
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleBulkAction("Delete")}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Scheduled Date</TableHead>
              <TableHead>Engagement</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.map((post) => (
              <TableRow key={post.id} className="hover:bg-muted/50">
                <TableCell>
                  <Checkbox
                    checked={selectedPosts.includes(post.id)}
                    onCheckedChange={() => handleSelectPost(post.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="max-w-md">
                    <p className="text-sm font-medium truncate">
                      {post.content}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {post.content.length} characters
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(post.status)}>
                    {post.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div>{format(post.scheduledDate, "MMM d, yyyy")}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {format(post.scheduledDate, "HH:mm")}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {post.status === "published" ? (
                      <div className="text-green-600 font-medium">
                        {post.engagement.actual} actual
                        <div className="text-xs text-muted-foreground">
                          vs {post.engagement.expected} expected
                        </div>
                      </div>
                    ) : post.status === "scheduled" ? (
                      <div className="text-blue-600">
                        ~{post.engagement.expected} expected
                      </div>
                    ) : (
                      <div className="text-muted-foreground">Draft</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handlePostAction(post.id, "Edit")}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handlePostAction(post.id, "Duplicate")}>
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handlePostAction(post.id, "Reschedule")}>
                        <Calendar className="w-4 h-4 mr-2" />
                        Reschedule
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handlePostAction(post.id, "Delete")}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredPosts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No posts found matching your search.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
