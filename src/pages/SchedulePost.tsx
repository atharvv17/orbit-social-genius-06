
import React, { useState } from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Calendar, List, Filter, Search } from "lucide-react"
import { PostEditor } from "@/components/PostEditor"
import { PostCalendarView } from "@/components/PostCalendarView"
import { PostListView } from "@/components/PostListView"
import { Input } from "@/components/ui/input"

interface SchedulePostProps {
  isLinkedInConnected: boolean;
}

const SchedulePost = ({ isLinkedInConnected }: SchedulePostProps) => {
  const [showEditor, setShowEditor] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeView, setActiveView] = useState("calendar")

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar isLinkedInConnected={isLinkedInConnected} />
        
        <main className="flex-1 overflow-auto">
          {/* Header */}
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger />
              <div className="flex-1">
                <h1 className="text-2xl font-bold">Schedule Posts</h1>
                <p className="text-sm text-muted-foreground">Create, schedule, and manage your LinkedIn content</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button 
                  size="sm" 
                  className="linkedin-gradient text-white hover:opacity-90"
                  onClick={() => setShowEditor(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Post
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="p-6">
            {showEditor ? (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Create New Post</CardTitle>
                </CardHeader>
                <CardContent>
                  <PostEditor onClose={() => setShowEditor(false)} />
                </CardContent>
              </Card>
            ) : null}

            {/* View Toggle */}
            <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
              <TabsList className="grid w-fit grid-cols-2">
                <TabsTrigger value="calendar" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Calendar View
                </TabsTrigger>
                <TabsTrigger value="list" className="flex items-center gap-2">
                  <List className="w-4 h-4" />
                  List View
                </TabsTrigger>
              </TabsList>

              <TabsContent value="calendar">
                <PostCalendarView searchQuery={searchQuery} />
              </TabsContent>

              <TabsContent value="list">
                <PostListView searchQuery={searchQuery} />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default SchedulePost
