"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    // ログイン処理をここに実装
    // 実際のAPIエンドポイントに接続する
    try {
      // 仮のログイン成功処理
      setTimeout(() => {
        document.cookie = "auth_token=dummy_token; path=/; max-age=86400"
        router.push("/dashboard")
      }, 1000)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "ログインに失敗しました",
        description: "メールアドレスまたはパスワードが正しくありません。",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">メールアドレス</Label>
        <Input id="email" type="email" placeholder="example@company.com" required />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">パスワード</Label>
          <Button variant="link" className="px-0 text-xs" type="button">
            パスワードを忘れた場合
          </Button>
        </div>
        <Input id="password" type="password" required />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "ログイン中..." : "ログイン"}
      </Button>
    </form>
  )
}
