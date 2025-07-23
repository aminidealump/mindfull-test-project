"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function StatsCharts() {
  const [timeRange, setTimeRange] = useState("week")

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>詳細データ</CardTitle>
            <CardDescription>健康データと瞑想の詳細な統計</CardDescription>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="期間を選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">過去7日間</SelectItem>
              <SelectItem value="month">過去30日間</SelectItem>
              <SelectItem value="quarter">過去3ヶ月</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="meditation">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="meditation">瞑想</TabsTrigger>
            <TabsTrigger value="sleep">睡眠</TabsTrigger>
            <TabsTrigger value="heart">心拍数</TabsTrigger>
            <TabsTrigger value="stress">ストレス</TabsTrigger>
          </TabsList>

          <TabsContent value="meditation" className="pt-4">
            <div className="h-[300px] flex items-end space-x-2">
              {/* 仮のチャートデータ表示 */}
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                瞑想時間のチャートがここに表示されます
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sleep" className="pt-4">
            <div className="h-[300px] flex items-end space-x-2">
              {/* 仮のチャートデータ表示 */}
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                睡眠データのチャートがここに表示されます
              </div>
            </div>
          </TabsContent>

          <TabsContent value="heart" className="pt-4">
            <div className="h-[300px] flex items-end space-x-2">
              {/* 仮のチャートデータ表示 */}
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                心拍数データのチャートがここに表示されます
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stress" className="pt-4">
            <div className="h-[300px] flex items-end space-x-2">
              {/* 仮のチャートデータ表示 */}
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                ストレスレベルのチャートがここに表示されます
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
