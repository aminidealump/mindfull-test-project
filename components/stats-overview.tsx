import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Heart, Moon, Brain } from "lucide-react"

export function StatsOverview() {
  // 仮の統計データ
  const stats = {
    totalMeditationMinutes: 120,
    totalMeditationSessions: 15,
    averageHeartRate: 68,
    averageSleepHours: 7.2,
    stressLevel: "低",
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">瞑想時間</CardTitle>
          <Brain className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalMeditationMinutes}分</div>
          <p className="text-xs text-muted-foreground">{stats.totalMeditationSessions}セッション</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">平均心拍数</CardTitle>
          <Heart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.averageHeartRate} BPM</div>
          <p className="text-xs text-muted-foreground">安静時の平均値</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">平均睡眠時間</CardTitle>
          <Moon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.averageSleepHours}時間</div>
          <p className="text-xs text-muted-foreground">過去7日間の平均</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">ストレスレベル</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.stressLevel}</div>
          <p className="text-xs text-muted-foreground">過去7日間の平均</p>
        </CardContent>
      </Card>
    </div>
  )
}
