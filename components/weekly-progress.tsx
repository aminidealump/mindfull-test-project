"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function WeeklyProgress() {
  // 仮の週間データ
  const weeklyData = {
    meditation: [
      { day: "月", minutes: 5 },
      { day: "火", minutes: 8 },
      { day: "水", minutes: 0 },
      { day: "木", minutes: 10 },
      { day: "金", minutes: 5 },
      { day: "土", minutes: 0 },
      { day: "日", minutes: 0 },
    ],
    mood: [
      { day: "月", value: 3 },
      { day: "火", value: 4 },
      { day: "水", value: 3 },
      { day: "木", value: 5 },
      { day: "金", value: 4 },
      { day: "土", value: 3 },
      { day: "日", value: 3 },
    ],
    sleep: [
      { day: "月", hours: 6.5 },
      { day: "火", hours: 7.2 },
      { day: "水", hours: 6.8 },
      { day: "木", hours: 7.5 },
      { day: "金", hours: 6.2 },
      { day: "土", hours: 8.1 },
      { day: "日", hours: 7.8 },
    ],
  }

  const maxMeditationMinutes = Math.max(...weeklyData.meditation.map((d) => d.minutes), 10)
  const maxSleepHours = Math.max(...weeklyData.sleep.map((d) => d.hours), 8)

  return (
    <Card>
      <CardHeader>
        <CardTitle>週間の進捗</CardTitle>
        <CardDescription>この1週間の活動と健康データ</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="meditation">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="meditation">瞑想</TabsTrigger>
            <TabsTrigger value="mood">気分</TabsTrigger>
            <TabsTrigger value="sleep">睡眠</TabsTrigger>
          </TabsList>

          <TabsContent value="meditation" className="pt-4">
            <div className="flex h-40 items-end space-x-2">
              {weeklyData.meditation.map((data, i) => (
                <div key={i} className="flex flex-1 flex-col items-center">
                  <div className="flex-1 w-full flex items-end justify-center">
                    <div
                      className="w-full max-w-12 bg-indigo-500 rounded-t"
                      style={{
                        height: `${data.minutes ? (data.minutes / maxMeditationMinutes) * 100 : 0}%`,
                        opacity: data.minutes ? 1 : 0.3,
                      }}
                    />
                  </div>
                  <span className="mt-2 text-xs">{data.day}</span>
                  <span className="text-xs text-muted-foreground">{data.minutes}分</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mood" className="pt-4">
            <div className="flex h-40 items-end space-x-2">
              {weeklyData.mood.map((data, i) => (
                <div key={i} className="flex flex-1 flex-col items-center">
                  <div className="flex-1 w-full flex items-end justify-center">
                    <div
                      className="w-full max-w-12 rounded-t"
                      style={{
                        height: `${(data.value / 5) * 100}%`,
                        backgroundColor: data.value >= 4 ? "#22c55e" : data.value >= 3 ? "#eab308" : "#ef4444",
                      }}
                    />
                  </div>
                  <span className="mt-2 text-xs">{data.day}</span>
                  <span className="text-xs text-muted-foreground">{data.value}/5</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sleep" className="pt-4">
            <div className="flex h-40 items-end space-x-2">
              {weeklyData.sleep.map((data, i) => (
                <div key={i} className="flex flex-1 flex-col items-center">
                  <div className="flex-1 w-full flex items-end justify-center">
                    <div
                      className="w-full max-w-12 bg-blue-500 rounded-t"
                      style={{ height: `${(data.hours / maxSleepHours) * 100}%` }}
                    />
                  </div>
                  <span className="mt-2 text-xs">{data.day}</span>
                  <span className="text-xs text-muted-foreground">{data.hours}時間</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
