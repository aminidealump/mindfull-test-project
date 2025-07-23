import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { DailyStatus } from "@/components/daily-status"
import { MeditationRecommendation } from "@/components/meditation-recommendation"
import { FitbitStats } from "@/components/fitbit-stats"
import { WeeklyProgress } from "@/components/weekly-progress"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="ダッシュボード" text="今日の状態と推奨プログラムを確認しましょう" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DailyStatus />
        <MeditationRecommendation />
        <FitbitStats />
      </div>

      <div className="mt-6">
        <WeeklyProgress />
      </div>
    </DashboardShell>
  )
}
