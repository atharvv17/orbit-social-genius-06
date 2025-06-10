
import React from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThumbsUp, MessageCircle, Repeat2, Send, MoreHorizontal } from "lucide-react"

interface PostPreviewProps {
  content: string
}

export function PostPreview({ content }: PostPreviewProps) {
  return (
    <Card className="max-w-md">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-sm">John Doe</h3>
            <p className="text-xs text-muted-foreground">Founder at TechCorp • 1st</p>
            <p className="text-xs text-muted-foreground">Scheduled • 🌐</p>
          </div>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="text-sm whitespace-pre-wrap">
            {content || "Your post content will appear here..."}
          </div>
          
          {/* Engagement Bar */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-600">
                <ThumbsUp className="w-4 h-4 mr-1" />
                Like
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-600">
                <MessageCircle className="w-4 h-4 mr-1" />
                Comment
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-600">
                <Repeat2 className="w-4 h-4 mr-1" />
                Repost
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-600">
                <Send className="w-4 h-4 mr-1" />
                Send
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
