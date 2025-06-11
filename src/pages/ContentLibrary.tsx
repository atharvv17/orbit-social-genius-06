
import React, { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ContentGrid } from "@/components/ContentGrid"
import { ContentFilters } from "@/components/ContentFilters"
import { PostDetailDrawer } from "@/components/PostDetailDrawer"
import { BulkActionsBar } from "@/components/BulkActionsBar"
import { Search, Plus, Filter } from "lucide-react"

interface ContentLibraryProps {
  isLinkedInConnected: boolean
}

export default function ContentLibrary({ isLinkedInConnected }: ContentLibraryProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPosts, setSelectedPosts] = useState<string[]>([])
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    dateRange: "all",
    engagement: "all",
    postType: "all",
    campaign: ""
  })

  const handlePostSelect = (postId: string, selected: boolean) => {
    if (selected) {
      setSelectedPosts([...selectedPosts, postId])
    } else {
      setSelectedPosts(selectedPosts.filter(id => id !== postId))
    }
  }

  const handleSelectAll = (posts: any[]) => {
    setSelectedPosts(posts.map(post => post.id))
  }

  const handleDeselectAll = () => {
    setSelectedPosts([])
  }

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on posts:`, selectedPosts)
    // Handle bulk actions
    setSelectedPosts([])
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar isLinkedInConnected={isLinkedInConnected} />
        <SidebarInset>
          <div className="flex-1 space-y-4 p-8 pt-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Content Library</h2>
                <p className="text-muted-foreground">
                  Manage all your LinkedIn content in one place
                </p>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create New Post
              </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts by keyword, date, or tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <ContentFilters 
                filters={filters} 
                onFiltersChange={setFilters}
                onClose={() => setShowFilters(false)}
              />
            )}

            {/* Bulk Actions */}
            {selectedPosts.length > 0 && (
              <BulkActionsBar
                selectedCount={selectedPosts.length}
                onBulkAction={handleBulkAction}
                onDeselectAll={handleDeselectAll}
              />
            )}

            {/* Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">
                  All Posts
                  <Badge variant="secondary" className="ml-2">324</Badge>
                </TabsTrigger>
                <TabsTrigger value="drafts">
                  Drafts
                  <Badge variant="secondary" className="ml-2">12</Badge>
                </TabsTrigger>
                <TabsTrigger value="scheduled">
                  Scheduled
                  <Badge variant="secondary" className="ml-2">8</Badge>
                </TabsTrigger>
                <TabsTrigger value="published">
                  Published
                  <Badge variant="secondary" className="ml-2">296</Badge>
                </TabsTrigger>
                <TabsTrigger value="ai-suggestions">
                  AI Suggestions
                  <Badge variant="secondary" className="ml-2">15</Badge>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <ContentGrid
                  filter="all"
                  searchQuery={searchQuery}
                  filters={filters}
                  selectedPosts={selectedPosts}
                  onPostSelect={handlePostSelect}
                  onSelectAll={handleSelectAll}
                  onPostClick={setSelectedPost}
                />
              </TabsContent>

              <TabsContent value="drafts" className="space-y-4">
                <ContentGrid
                  filter="drafts"
                  searchQuery={searchQuery}
                  filters={filters}
                  selectedPosts={selectedPosts}
                  onPostSelect={handlePostSelect}
                  onSelectAll={handleSelectAll}
                  onPostClick={setSelectedPost}
                />
              </TabsContent>

              <TabsContent value="scheduled" className="space-y-4">
                <ContentGrid
                  filter="scheduled"
                  searchQuery={searchQuery}
                  filters={filters}
                  selectedPosts={selectedPosts}
                  onPostSelect={handlePostSelect}
                  onSelectAll={handleSelectAll}
                  onPostClick={setSelectedPost}
                />
              </TabsContent>

              <TabsContent value="published" className="space-y-4">
                <ContentGrid
                  filter="published"
                  searchQuery={searchQuery}
                  filters={filters}
                  selectedPosts={selectedPosts}
                  onPostSelect={handlePostSelect}
                  onSelectAll={handleSelectAll}
                  onPostClick={setSelectedPost}
                />
              </TabsContent>

              <TabsContent value="ai-suggestions" className="space-y-4">
                <ContentGrid
                  filter="ai-suggestions"
                  searchQuery={searchQuery}
                  filters={filters}
                  selectedPosts={selectedPosts}
                  onPostSelect={handlePostSelect}
                  onSelectAll={handleSelectAll}
                  onPostClick={setSelectedPost}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Post Detail Drawer */}
          <PostDetailDrawer
            post={selectedPost}
            isOpen={!!selectedPost}
            onClose={() => setSelectedPost(null)}
          />
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
