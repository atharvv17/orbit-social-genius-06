
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

interface ContentFiltersProps {
  filters: {
    dateRange: string
    engagement: string
    postType: string
    campaign: string
  }
  onFiltersChange: (filters: any) => void
  onClose: () => void
}

export function ContentFilters({ filters, onFiltersChange, onClose }: ContentFiltersProps) {
  const updateFilter = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const clearFilters = () => {
    onFiltersChange({
      dateRange: "all",
      engagement: "all", 
      postType: "all",
      campaign: ""
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg">Filters</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Date Range */}
          <div className="space-y-2">
            <Label htmlFor="dateRange">Date Range</Label>
            <Select value={filters.dateRange} onValueChange={(value) => updateFilter("dateRange", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Engagement Level */}
          <div className="space-y-2">
            <Label htmlFor="engagement">Engagement Level</Label>
            <Select value={filters.engagement} onValueChange={(value) => updateFilter("engagement", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Posts</SelectItem>
                <SelectItem value="high">High Engagement (100+ interactions)</SelectItem>
                <SelectItem value="medium">Medium Engagement (20-99 interactions)</SelectItem>
                <SelectItem value="low">Low Engagement (0-19 interactions)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Post Type */}
          <div className="space-y-2">
            <Label htmlFor="postType">Post Type</Label>
            <Select value={filters.postType} onValueChange={(value) => updateFilter("postType", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="text">Text Only</SelectItem>
                <SelectItem value="image">With Image</SelectItem>
                <SelectItem value="video">With Video</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Campaign */}
          <div className="space-y-2">
            <Label htmlFor="campaign">Campaign</Label>
            <Input
              id="campaign"
              placeholder="Enter campaign name..."
              value={filters.campaign}
              onChange={(e) => updateFilter("campaign", e.target.value)}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-4 border-t">
          <Button variant="outline" onClick={clearFilters}>
            Clear All Filters
          </Button>
          <Button onClick={onClose}>
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
