
import React from "react"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { 
  Heart, 
  MessageCircle, 
  Repeat2, 
  Eye, 
  Calendar,
  Edit,
  Copy,
  Trash2,
  BarChart3,
  Wand2,
  History
} from "lucide-react"

interface PostDetailDrawerProps {
  post: any
  isOpen: boolean
  onClose: () => void
}

export function PostDetailDrawer({ post, isOpen, onClose }: PostDetailDrawerProps) {
  if (!post) return null

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: "secondary",
      scheduled: "default", 
      published: "default", // Changed from "success" to "default"
      "ai-suggestion": "outline"
    } as const

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {status === "ai-suggestion" ? "AI Suggestion" : status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <DrawerTitle>Post Details</DrawerTitle>
              <DrawerDescription>
                {post.type === "image" ? "🖼️" : post.type === "video" ? "🎥" : "📄"} 
                {" "}{new Date(post.date).toLocaleDateString()}
              </DrawerDescription>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge(post.status)}
              {post.campaign && (
                <Badge variant="outline">{post.campaign}</Badge>
              )}
            </div>
          </div>
        </DrawerHeader>

        <div className="px-4 pb-4 space-y-6 overflow-y-auto">
          {/* Content */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Content</h3>
              <Textarea
                value={post.content}
                readOnly
                className="min-h-[120px] resize-none"
              />
            </div>

            {/* Tags */}
            <div>
              <h3 className="font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          {/* Engagement Analytics */}
          {post.status === "published" && (
            <>
              <div className="space-y-4">
                <h3 className="font-semibold">Engagement Analytics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <Heart className="w-5 h-5 mx-auto mb-1 text-red-500" />
                    <div className="text-2xl font-bold">{post.engagement.likes}</div>
                    <div className="text-xs text-muted-foreground">Likes</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <MessageCircle className="w-5 h-5 mx-auto mb-1 text-blue-500" />
                    <div className="text-2xl font-bold">{post.engagement.comments}</div>
                    <div className="text-xs text-muted-foreground">Comments</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <Repeat2 className="w-5 h-5 mx-auto mb-1 text-green-500" />
                    <div className="text-2xl font-bold">{post.engagement.shares}</div>
                    <div className="text-xs text-muted-foreground">Shares</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <Eye className="w-5 h-5 mx-auto mb-1 text-purple-500" />
                    <div className="text-2xl font-bold">{post.engagement.views}</div>
                    <div className="text-xs text-muted-foreground">Views</div>
                  </div>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* AI Suggestions */}
          <div className="space-y-4">
            <h3 className="font-semibold">AI Suggestions</h3>
            <div className="space-y-3 p-4 bg-purple-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Wand2 className="w-5 h-5 text-purple-600 mt-1" />
                <div>
                  <p className="font-medium text-purple-900">Optimize for Better Engagement</p>
                  <p className="text-sm text-purple-700">
                    Consider adding a question at the end to encourage comments. 
                    Posts with questions get 35% more engagement.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Wand2 className="w-5 h-5 text-purple-600 mt-1" />
                <div>
                  <p className="font-medium text-purple-900">Repurpose This Content</p>
                  <p className="text-sm text-purple-700">
                    This post performed well. Create a follow-up post or turn it into a thread.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="space-y-4">
            <h3 className="font-semibold">Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit Post
              </Button>
              <Button variant="outline">
                <Copy className="w-4 h-4 mr-2" />
                Duplicate
              </Button>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Reschedule
              </Button>
              <Button variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
              <Button variant="outline">
                <Wand2 className="w-4 h-4 mr-2" />
                AI Repurpose
              </Button>
              <Button variant="outline">
                <History className="w-4 h-4 mr-2" />
                Version History
              </Button>
            </div>
            
            <Button variant="destructive" className="w-full">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Post
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
