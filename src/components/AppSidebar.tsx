
import {
  Calendar,
  Home,
  BarChart3,
  Users,
  Settings,
  PlusCircle,
  Target,
  BookOpen,
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Schedule Post",
    url: "/schedule-post",
    icon: PlusCircle,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Competitors",
    url: "/competitors",
    icon: Target,
  },
  {
    title: "Content Library",
    url: "/content-library",
    icon: BookOpen,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

interface AppSidebarProps {
  isLinkedInConnected?: boolean
}

export function AppSidebar({ isLinkedInConnected = false }: AppSidebarProps) {
  const location = useLocation()

  const handleDisabledClick = (e: React.MouseEvent) => {
    if (!isLinkedInConnected) {
      e.preventDefault()
    }
  }

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 linkedin-gradient rounded-lg flex items-center justify-center">
            <Users className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg">LinkedIn Pro</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className={!isLinkedInConnected && item.url !== "/" ? "opacity-50 cursor-not-allowed" : ""}
                  >
                    <Link 
                      to={isLinkedInConnected || item.url === "/" ? item.url : "#"}
                      onClick={handleDisabledClick}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button 
          variant="outline" 
          size="sm" 
          className={`w-full ${!isLinkedInConnected ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={!isLinkedInConnected}
        >
          <Settings className="w-4 h-4 mr-2" />
          Account Settings
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
