"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn, getCurrentUser, fetchAuthSession, resetPassword } from 'aws-amplify/auth'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const router = useRouter()
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {
      // Cognito sign in with new API
      const { isSignedIn } = await signIn({
        username: formData.email,
        password: formData.password
      })
      
      if (isSignedIn) {
        // Get the current user and session
        const user = await getCurrentUser()
        const session = await fetchAuthSession()
        
        // Store token for API calls
        const token = session.tokens?.idToken?.toString()
        if (token) {
          localStorage.setItem('auth_token', token)
        }
        
        // Store user info
        localStorage.setItem('user_info', JSON.stringify({
          email: user.signInDetails?.loginId,
          userId: user.userId,
          username: user.username
        }))

        toast({
          title: "ログインしました",
          description: "ダッシュボードに移動します。",
        })

        // Redirect to dashboard
        router.push("/dashboard")
      }
      
    } catch (error) {
      console.error('Login error:', error)
      
      let errorMessage = "ログインに失敗しました。"
      
      if (error.name === 'UserNotConfirmedException') {
        errorMessage = "メールアドレスの確認が必要です。"
      } else if (error.name === 'NotAuthorizedException') {
        errorMessage = "メールアドレスまたはパスワードが正しくありません。"
      } else if (error.name === 'UserNotFoundException') {
        errorMessage = "ユーザーが見つかりません。"
      } else if (error.name === 'TooManyRequestsException') {
        errorMessage = "リクエストが多すぎます。しばらく待ってから再試行してください。"
      }

      toast({
        variant: "destructive",
        title: "ログインエラー",
        description: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!formData.email) {
      toast({
        variant: "destructive",
        title: "メールアドレスを入力してください",
        description: "パスワードリセットにはメールアドレスが必要です。",
      })
      return
    }

    try {
      await resetPassword({ username: formData.email })
      toast({
        title: "パスワードリセットメールを送信しました",
        description: "メールをご確認ください。",
      })
    } catch (error) {
      console.error('Forgot password error:', error)
      toast({
        variant: "destructive",
        title: "エラー",
        description: "パスワードリセットに失敗しました。",
      })
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">メールアドレス</Label>
        <Input 
          id="email" 
          name="email"
          type="email" 
          placeholder="example@company.com" 
          value={formData.email}
          onChange={handleInputChange}
          required 
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">パスワード</Label>
          <Button 
            variant="link" 
            className="px-0 text-xs" 
            type="button"
            onClick={handleForgotPassword}
          >
            パスワードを忘れた場合
          </Button>
        </div>
        <Input 
          id="password" 
          name="password"
          type="password" 
          value={formData.password}
          onChange={handleInputChange}
          required 
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "ログイン中..." : "ログイン"}
      </Button>
    </form>
  )
}