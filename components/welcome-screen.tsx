"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "@/components/login-form"
import { SignupForm } from "@/components/signup-form"
import { MeditationIcon } from "@/components/icons/meditation-icon"

export function WelcomeScreen() {
  const [activeTab, setActiveTab] = useState("login")

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <MeditationIcon className="h-16 w-16 text-indigo-600" />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-indigo-900">マインドフルネス ヘルスケア</h1>
          <p className="mt-2 text-sm text-gray-600">
            Fitbitと連携して、マインドフルネス瞑想で心身の健康をサポートします
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-center text-2xl">はじめる</CardTitle>
            <CardDescription className="text-center">アカウントにログインまたは新規登録してください</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">ログイン</TabsTrigger>
                <TabsTrigger value="signup">新規登録</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm />
              </TabsContent>
              <TabsContent value="signup">
                <SignupForm />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-xs text-center text-gray-500">
              ログインすることで、
              <Link href="/terms" className="underline">
                利用規約
              </Link>
              および
              <Link href="/privacy" className="underline">
                プライバシーポリシー
              </Link>
              に同意したことになります。
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
