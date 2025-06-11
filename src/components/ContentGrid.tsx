
import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Heart, 
  MessageCircle, 
  Repeat2, 
  Eye, 
  Calendar, 
  MoreHorizontal,
  Edit,
  Copy,
  Trash2,
  BarChart3
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Post {
  id: string
  content: string
  status: "draft" | "scheduled" | "published" | "ai-suggestion"
  date: string
  engagement: {
    likes: number
    comments: number
    shares: number
    views: number
  }
  tags: string[]
  type: "text" | "image" | "video"
  campaign?: string
}

interface ContentGridProps {
  filter: string
  searchQuery: string
  filters: any
  selectedPosts: string[]
  onPostSelect: (postId: string, selected: boolean) => void
  onSelectAll: (posts: Post[]) => void
  onPostClick: (post: Post) => void
}

// Mock data - replace with actual data
const mockPosts: Post[] = [
  {
    id: "1",
    content: "Just launched our new feature! Here's what makes it special and how it can help your business grow...",
    status: "published",
    date: "2024-01-15",
    engagement: { likes: 45, comments: 12, shares: 8, views: 234 },
    tags: ["product", "launch", "business"],
    type: "text",
    campaign: "Q1 Launch"
  },
  {
    id: "2",
    content: "5 lessons learned from building a startup in 2024. Thread 🧵",
    status: "published",
    date: "2024-01-14",
    engagement: { likes: 89, comments: 23, shares: 15, views: 456 },
    tags: ["startup", "lessons", "thread"],
    type: "text"
  },
  {
    id: "3",
    content: "Behind the scenes of our product development process...",
    status: "draft",
    date: "2024-01-16",
    engagement: { likes: 0, comments: 0, shares: 0, views: 0 },
    tags: ["development", "process"],
    type: "image"
  },
  {
    id: "4",
    content: "Exciting industry insights from the latest conference. What trends are you seeing?",
    status: "scheduled",
    date: "2024-01-18",
    engagement: { likes: 0, comments: 0, shares: 0, views: 0 },
    tags: ["insights", "conference", "trends"],
    type: "text"
  },
  {
    id: "5",
    content: "AI-generated: Share your thoughts on the future of remote work and its impact on company culture.",
    status: "ai-suggestion",
    date: "2024-01-17",
    engagement: { likes: 0, comments: 0, shares: 0, views: 0 },
    tags: ["remote work", "culture", "ai-generated"],
    type: "text"
  }
]

export function ContentGrid({ filter, searchQuery, filters, selectedPosts, onPostSelect, onSelectAll, onPostClick }: ContentGridProps) {
  // Filter posts based on current tab and search
  const filteredPosts = mockPosts.filter(post => {
    if (filter !== "all" && post.status !== filter) return false
    if (searchQuery && !post.content.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) return false
    return true
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: "secondary",
      scheduled: "default",
      published: "success",
      "ai-suggestion": "outline"
    } as const

    const colors = {
      draft: "text-gray-600",
      scheduled: "text-blue-600", 
      published: "text-green-600",
      "ai-suggestion": "text-purple-600"
    }

    return (
      <Badge variant={variants[status as keyof typeof variants]} className={colors[status as keyof typeof colors]}>
        {status === "ai-suggestion" ? "AI Suggestion" : status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image": return "🖼️"
      case "video": return "🎥"
      default: return "📄"
    }
  }

  return (
    <div className="space-y-4">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
            onCheckedChange={(checked) => {
              if (checked) {
                onSelectAll(filteredPosts)
              } else {
                // Clear all selections
                filteredPosts.forEach(post => onPostSelect(post.id, false))
              }
            }}
          />
          <span className="text-sm text-muted-foreground">
            {filteredPosts.length} posts
          </span>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedPosts.includes(post.id)}
                    onCheckedChange={(checked) => onPostSelect(post.id, !!checked)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="text-sm">{getTypeIcon(post.type)}</span>
                  {getStatusBadge(post.status)}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="w-4 h-4 mr-2" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Content Preview */}
              <div 
                className="mb-4"
                onClick={() => onPostClick(post)}
              >
                <p className="text-sm text-foreground line-clamp-3 mb-2">
                  {post.content}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{post.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Date and Campaign */}
                <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  {post.campaign && (
                    <>
                      <span>•</span>
                      <span>{post.campaign}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Engagement Stats */}
              {post.status === "published" && (
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      <span>{post.engagement.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>{post.engagement.comments}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Repeat2 className="w-3 h-3" />
                      <span>{post.engagement.shares}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{post.engagement.views}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
