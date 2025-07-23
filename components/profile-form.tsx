"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // 仮のユーザーデータ
  const userData = {
    name: "山田 太郎",
    email: "yamada@example.com",
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    // プロフィール更新処理
    try {
      // 仮の更新処理
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "プロフィールを更新しました",
        description: "変更が保存されました。",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "エラーが発生しました",
        description: "プロフィールの更新に失敗しました。",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>プロフィール情報</CardTitle>
        <CardDescription>アカウント情報を更新します</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">お名前</Label>
            <Input id="name" defaultValue={userData.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input id="email" type="email" defaultValue={userData.email} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">新しいパスワード</Label>
            <Input id="password" type="password" />
            <p className="text-xs text-muted-foreground">パスワードを変更する場合のみ入力してください</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "更新中..." : "変更を保存"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
