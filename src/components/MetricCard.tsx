
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  change: string
  icon: LucideIcon
  gradient: string
}

export function MetricCard({ title, value, change, icon: Icon, gradient }: MetricCardProps) {
  const isPositive = change.startsWith('+')
  
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={`w-10 h-10 rounded-lg ${gradient} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {change} from last month
        </p>
      </CardContent>
    </Card>
  )
}
