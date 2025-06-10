
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  CalendarIcon, 
  Clock, 
  Zap, 
  Image, 
  Link, 
  Eye, 
  Save, 
  Send,
  X,
  Sparkles
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { PostPreview } from "@/components/PostPreview"
import { toast } from "@/hooks/use-toast"

interface PostEditorProps {
  onClose: () => void
}

export function PostEditor({ onClose }: PostEditorProps) {
  const [content, setContent] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const [postType, setPostType] = useState("text")

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your post has been saved as a draft.",
    })
  }

  const handleSchedulePost = () => {
    if (!content || !selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Post Scheduled",
      description: `Your post has been scheduled for ${format(selectedDate, "PPP")} at ${selectedTime}.`,
    })
    onClose()
  }

  const generateAIContent = () => {
    // Simulate AI content generation
    setContent("🚀 Excited to share insights from today's industry conference! Key takeaways:\n\n• The future of AI in business is here\n• Remote work strategies that actually work\n• Building resilient teams in uncertain times\n\nWhat trends are you seeing in your industry? Let's discuss! 👇\n\n#Leadership #AI #RemoteWork #BusinessStrategy")
    
    toast({
      title: "AI Content Generated",
      description: "Content has been generated based on your posting history and trends.",
    })
  }

  return (
    <div className="space-y-6">
      {/* AI Generation Bar */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="font-medium text-blue-900">AI Post Generator</h3>
                <p className="text-sm text-blue-700">Generate engaging content based on trends and your posting history</p>
              </div>
            </div>
            <Button onClick={generateAIContent} variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
              <Zap className="w-4 h-4 mr-2" />
              Generate Content
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor Section */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="content">Post Content</Label>
            <Textarea
              id="content"
              placeholder="What would you like to share with your network?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px] mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {content.length}/3000 characters
            </p>
          </div>

          {/* Media & Links */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Image className="w-4 h-4 mr-2" />
              Add Image
            </Button>
            <Button variant="outline" size="sm">
              <Link className="w-4 h-4 mr-2" />
              Add Link
            </Button>
          </div>

          {/* Scheduling */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Time</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00">9:00 AM (Recommended)</SelectItem>
                  <SelectItem value="12:00">12:00 PM</SelectItem>
                  <SelectItem value="15:00">3:00 PM (Peak Engagement)</SelectItem>
                  <SelectItem value="18:00">6:00 PM</SelectItem>
                  <SelectItem value="21:00">9:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Optimal Time Suggestion */}
          {selectedDate && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 text-green-800">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Optimal posting time: 3:00 PM (based on your audience activity)
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Preview Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Preview</Label>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
            >
              <Eye className="w-4 h-4 mr-2" />
              {showPreview ? "Hide" : "Show"} Preview
            </Button>
          </div>
          
          {showPreview && <PostPreview content={content} />}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t">
        <Button variant="outline" onClick={onClose}>
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
        
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleSaveDraft}>
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={handleSchedulePost} className="linkedin-gradient text-white hover:opacity-90">
            <Send className="w-4 h-4 mr-2" />
            Schedule Post
          </Button>
        </div>
      </div>
    </div>
  )
}
