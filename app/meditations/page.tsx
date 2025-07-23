import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { MeditationList } from "@/components/meditation-list"

export default function MeditationsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="瞑想プログラム" text="マインドフルネス瞑想プログラムの一覧" />

      <MeditationList />
    </DashboardShell>
  )
}
