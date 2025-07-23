"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    // 新規登録処理をここに実装
    // 実際のAPIエンドポイントに接続する
    try {
      // 仮の登録成功処理
      setTimeout(() => {
        document.cookie = "auth_token=dummy_token; path=/; max-age=86400"
        router.push("/onboarding")
      }, 1000)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "登録に失敗しました",
        description: "入力内容を確認して再度お試しください。",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">お名前</Label>
        <Input id="name" placeholder="山田 太郎" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">メールアドレス</Label>
        <Input id="email" type="email" placeholder="example@company.com" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">パスワード</Label>
        <Input id="password" type="password" required />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "登録中..." : "アカウント作成"}
      </Button>
    </form>
  )
}
