"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { NotificationBadge } from "@/components/notification-badge"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [hasNotifications, setHasNotifications] = useState(false)

  // 通知の有無を確認する処理
  useEffect(() => {
    // APIから通知情報を取得する処理
    // 仮の実装
    const checkNotifications = () => {
      setHasNotifications(Math.random() > 0.5)
    }

    checkNotifications()
    const interval = setInterval(checkNotifications, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <div className="flex items-center space-x-4">
            <NotificationBadge hasNotifications={hasNotifications} />
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">{children}</main>
      <MobileNav />
    </div>
  )
}
