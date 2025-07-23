"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { MeditationIcon } from "@/components/icons/meditation-icon"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="flex items-center space-x-2">
      <Link href="/dashboard" className="flex items-center space-x-2">
        <MeditationIcon className="h-6 w-6 text-indigo-600" />
        <span className="font-bold text-lg hidden md:inline-block">マインドフルネス</span>
      </Link>
      <nav className="hidden md:flex items-center space-x-4 ml-6">
        <Link
          href="/dashboard"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/dashboard" ? "text-indigo-600" : "text-muted-foreground",
          )}
        >
          ホーム
        </Link>
        <Link
          href="/meditations"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/meditations" || pathname.startsWith("/meditations/")
              ? "text-indigo-600"
              : "text-muted-foreground",
          )}
        >
          瞑想プログラム
        </Link>
        <Link
          href="/profile"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/profile" ? "text-indigo-600" : "text-muted-foreground",
          )}
        >
          プロフィール
        </Link>
      </nav>
    </div>
  )
}
