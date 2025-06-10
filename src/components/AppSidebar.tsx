
import { Calendar, BarChart3, Users, FileText, Settings, Zap, Target, Library } from "lucide-react"
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

const menuItems = [
  {
    title: "Dashboard",
    url: "#",
    icon: BarChart3,
  },
  {
    title: "Schedule Posts",
    url: "#",
    icon: Calendar,
  },
  {
    title: "AI Generator",
    url: "#",
    icon: Zap,
  },
  {
    title: "Competitor Analysis",
    url: "#",
    icon: Target,
  },
  {
    title: "Analytics",
    url: "#",
    icon: BarChart3,
  },
  {
    title: "Content Library",
    url: "#",
    icon: Library,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="border-r bg-sidebar">
      <SidebarHeader className="border-b p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 linkedin-gradient rounded-lg flex items-center justify-center">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">LinkedinAI</h2>
            <p className="text-xs text-muted-foreground">Social Media Manager</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className={`hover:bg-accent hover:text-accent-foreground transition-colors ${
                      index === 0 ? 'bg-accent text-accent-foreground' : ''
                    }`}
                  >
                    <a href={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Users className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <p className="font-medium text-foreground">John Doe</p>
            <p className="text-xs">Premium Plan</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
