"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export function NotificationSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // 仮の通知設定
  const [notificationSettings, setNotificationSettings] = useState({
    morningReminder: true,
    eveningReminder: true,
    weekendReminder: false,
    completionNotification: true,
    fitbitSync: true,
  })

  const handleToggle = (setting: string) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting as keyof typeof notificationSettings],
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    // 通知設定更新処理
    try {
      // 仮の更新処理
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // PWA通知許可リクエスト
      if ("Notification" in window) {
        const permission = await Notification.requestPermission()
        if (permission === "granted") {
          toast({
            title: "通知が許可されました",
            description: "設定した時間に通知が届きます。",
          })
        }
      }

      toast({
        title: "通知設定を更新しました",
        description: "変更が保存されました。",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "エラーが発生しました",
        description: "通知設定の更新に失敗しました。",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>通知設定</CardTitle>
        <CardDescription>アプリからの通知設定を管理します</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="morning-reminder">朝の通知</Label>
              <p className="text-xs text-muted-foreground">起床後10分に通知を受け取る</p>
            </div>
            <Switch
              id="morning-reminder"
              checked={notificationSettings.morningReminder}
              onCheckedChange={() => handleToggle("morningReminder")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="evening-reminder">夕方の通知</Label>
              <p className="text-xs text-muted-foreground">勤務後に通知を受け取る</p>
            </div>
            <Switch
              id="evening-reminder"
              checked={notificationSettings.eveningReminder}
              onCheckedChange={() => handleToggle("eveningReminder")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="weekend-reminder">週末の通知</Label>
              <p className="text-xs text-muted-foreground">週末に通知を受け取る</p>
            </div>
            <Switch
              id="weekend-reminder"
              checked={notificationSettings.weekendReminder}
              onCheckedChange={() => handleToggle("weekendReminder")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="completion-notification">完了通知</Label>
              <p className="text-xs text-muted-foreground">瞑想プログラム完了時に通知を受け取る</p>
            </div>
            <Switch
              id="completion-notification"
              checked={notificationSettings.completionNotification}
              onCheckedChange={() => handleToggle("completionNotification")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="fitbit-sync">Fitbit同期通知</Label>
              <p className="text-xs text-muted-foreground">Fitbitデータ同期時に通知を受け取る</p>
            </div>
            <Switch
              id="fitbit-sync"
              checked={notificationSettings.fitbitSync}
              onCheckedChange={() => handleToggle("fitbitSync")}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "更新中..." : "設定を保存"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
