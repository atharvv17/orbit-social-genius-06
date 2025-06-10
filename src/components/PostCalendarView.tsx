
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ChevronLeft, ChevronRight, Clock, Edit, MoreHorizontal } from "lucide-react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns"

interface PostCalendarViewProps {
  searchQuery: string
}

// Mock data for scheduled posts
const scheduledPosts = [
  {
    id: 1,
    content: "Excited to share our latest insights on AI in recruitment...",
    scheduledDate: new Date(2024, 11, 15, 14, 0),
    status: "scheduled",
    engagement: { expected: 245 }
  },
  {
    id: 2,
    content: "Key takeaways from the industry conference...",
    scheduledDate: new Date(2024, 11, 18, 9, 0),
    status: "scheduled",
    engagement: { expected: 180 }
  },
  {
    id: 3,
    content: "Team collaboration best practices...",
    scheduledDate: new Date(2024, 11, 20, 15, 0),
    status: "draft",
    engagement: { expected: 0 }
  },
]

export function PostCalendarView({ searchQuery }: PostCalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const getPostsForDay = (day: Date) => {
    return scheduledPosts.filter(post => 
      isSameDay(post.scheduledDate, day) &&
      (searchQuery === "" || post.content.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-blue-100 text-blue-800 border-blue-200"
      case "published": return "bg-green-100 text-green-800 border-green-200"
      case "draft": return "bg-gray-100 text-gray-800 border-gray-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {format(currentDate, "MMMM yyyy")}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Calendar Header */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
            <div key={day} className="text-center font-medium text-sm text-muted-foreground p-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map(day => {
            const postsForDay = getPostsForDay(day)
            const isToday = isSameDay(day, new Date())
            
            return (
              <div
                key={day.toISOString()}
                className={`min-h-[120px] p-2 border rounded-lg ${
                  isSameMonth(day, currentDate) 
                    ? "bg-background" 
                    : "bg-muted/50"
                } ${isToday ? "border-primary ring-2 ring-primary/20" : "border-border"}`}
              >
                <div className={`text-sm font-medium mb-2 ${
                  isToday ? "text-primary" : "text-foreground"
                }`}>
                  {format(day, "d")}
                </div>
                
                <div className="space-y-1">
                  {postsForDay.map(post => (
                    <div
                      key={post.id}
                      className="group relative bg-card border rounded p-2 text-xs hover:shadow-sm transition-shadow cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Badge variant="outline" className={getStatusColor(post.status)}>
                          {post.status}
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="opacity-0 group-hover:opacity-100 h-4 w-4 p-0"
                        >
                          <MoreHorizontal className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      <div className="text-xs text-muted-foreground truncate mb-1">
                        {post.content}
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {format(post.scheduledDate, "HH:mm")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-6 pt-4 border-t">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-blue-500"></div>
            <span className="text-sm text-muted-foreground">Scheduled</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-green-500"></div>
            <span className="text-sm text-muted-foreground">Published</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gray-500"></div>
            <span className="text-sm text-muted-foreground">Draft</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
