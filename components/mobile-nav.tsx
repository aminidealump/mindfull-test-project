"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Headphones, BarChart2, User } from "lucide-react"

export function MobileNav() {
  const pathname = usePathname()

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background z-40">
      <div className="grid grid-cols-4 h-16">
        <Link
          href="/dashboard"
          className={cn(
            "flex flex-col items-center justify-center",
            pathname === "/dashboard" ? "text-indigo-600" : "text-muted-foreground",
          )}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">ホーム</span>
        </Link>
        <Link
          href="/meditations"
          className={cn(
            "flex flex-col items-center justify-center",
            pathname === "/meditations" || pathname.startsWith("/meditations/")
              ? "text-indigo-600"
              : "text-muted-foreground",
          )}
        >
          <Headphones className="h-5 w-5" />
          <span className="text-xs mt-1">瞑想</span>
        </Link>
        <Link
          href="/stats"
          className={cn(
            "flex flex-col items-center justify-center",
            pathname === "/stats" ? "text-indigo-600" : "text-muted-foreground",
          )}
        >
          <BarChart2 className="h-5 w-5" />
          <span className="text-xs mt-1">統計</span>
        </Link>
        <Link
          href="/profile"
          className={cn(
            "flex flex-col items-center justify-center",
            pathname === "/profile" ? "text-indigo-600" : "text-muted-foreground",
          )}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">設定</span>
        </Link>
      </div>
    </div>
  )
}
