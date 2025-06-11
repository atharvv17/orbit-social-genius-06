
import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Trash2, 
  Calendar, 
  Tag, 
  Download, 
  Copy,
  X
} from "lucide-react"

interface BulkActionsBarProps {
  selectedCount: number
  onBulkAction: (action: string) => void
  onDeselectAll: () => void
}

export function BulkActionsBar({ selectedCount, onBulkAction, onDeselectAll }: BulkActionsBarProps) {
  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="default" className="bg-blue-600">
              {selectedCount} selected
            </Badge>
            <span className="text-sm text-muted-foreground">
              Choose an action to apply to selected posts
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Bulk Actions */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction("schedule")}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction("tag")}
            >
              <Tag className="w-4 h-4 mr-2" />
              Add Tags
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction("duplicate")}
            >
              <Copy className="w-4 h-4 mr-2" />
              Duplicate
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction("export")}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction("delete")}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>

            {/* Close */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onDeselectAll}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
