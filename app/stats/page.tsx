import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { StatsOverview } from "@/components/stats-overview"
import { StatsCharts } from "@/components/stats-charts"

export default function StatsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="統計" text="あなたの健康データと瞑想の進捗" />

      <div className="space-y-6">
        <StatsOverview />
        <StatsCharts />
      </div>
    </DashboardShell>
  )
}
