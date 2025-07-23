"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell } from "lucide-react"

interface NotificationBadgeProps {
  hasNotifications: boolean
}

export function NotificationBadge({ hasNotifications }: NotificationBadgeProps) {
  const [isOpen, setIsOpen] = useState(false)

  // 仮の通知データ
  const notifications = [
    {
      id: 1,
      title: "瞑想プログラムの時間です",
      description: "今日のマインドフルネスプログラムを始めましょう",
      time: "5分前",
      read: false,
    },
    {
      id: 2,
      title: "アンケートのお願い",
      description: "今日の気分はいかがですか？短いアンケートにご回答ください",
      time: "30分前",
      read: true,
    },
    {
      id: 3,
      title: "睡眠データの分析完了",
      description: "昨夜の睡眠データの分析が完了しました。確認してみましょう",
      time: "2時間前",
      read: true,
    },
  ]

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {hasNotifications && <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>通知</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length > 0 ? (
          <>
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="cursor-pointer">
                <div className="flex items-start space-x-2 py-1">
                  {!notification.read && <div className="mt-1.5 h-2 w-2 rounded-full bg-indigo-500 shrink-0" />}
                  <div className={cn("space-y-1", notification.read ? "pl-4" : "")}>
                    <p className="text-sm font-medium leading-none">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.description}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/notifications" className="w-full text-center text-xs cursor-pointer">
                すべての通知を見る
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <div className="py-4 text-center text-sm text-muted-foreground">通知はありません</div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
