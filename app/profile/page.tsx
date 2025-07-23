import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { ProfileForm } from "@/components/profile-form"
import { FitbitConnection } from "@/components/fitbit-connection"

export default function ProfilePage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="プロフィール設定" text="アカウント情報と設定を管理" />

      <div className="space-y-6">
        <ProfileForm />
        <FitbitConnection />
      </div>
    </DashboardShell>
  )
}
