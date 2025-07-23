"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Activity, Moon } from "lucide-react"

export function FitbitStats() {
  // 仮のFitbitデータ
  const fitbitData = {
    steps: 6543,
    stepsGoal: 10000,
    heartRate: 72,
    sleep: 7.2,
    sleepGoal: 8,
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fitbitデータ</CardTitle>
        <CardDescription>今日の活動と健康データ</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Activity className="h-5 w-5 text-indigo-500" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                歩数: {fitbitData.steps.toLocaleString()} / {fitbitData.stepsGoal.toLocaleString()}
              </p>
              <div className="h-2 w-full rounded-full bg-gray-100">
                <div
                  className="h-2 rounded-full bg-indigo-500"
                  style={{ width: `${Math.min(100, (fitbitData.steps / fitbitData.stepsGoal) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Heart className="h-5 w-5 text-red-500" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">心拍数: {fitbitData.heartRate} BPM</p>
              <p className="text-xs text-muted-foreground">安静時の平均値</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Moon className="h-5 w-5 text-blue-500" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                睡眠時間: {fitbitData.sleep} 時間 / {fitbitData.sleepGoal} 時間
              </p>
              <div className="h-2 w-full rounded-full bg-gray-100">
                <div
                  className="h-2 rounded-full bg-blue-500"
                  style={{ width: `${Math.min(100, (fitbitData.sleep / fitbitData.sleepGoal) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
