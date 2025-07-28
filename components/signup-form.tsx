"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signUp, confirmSignUp, resendSignUpCode, signIn, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [formData, setFormData] = useState({
    name: 'alamin',
    email: '',
    password: '',
    confirmationCode: '',
    consentAgreed: false
  })
  const router = useRouter()
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    if (!formData.consentAgreed) {
      toast({
        variant: "destructive",
        title: "同意が必要です",
        description: "研究参加への同意が必要です。",
      })
      setIsLoading(false)
      return
    }

    try {
      // Split name into first and last name
      const nameParts = formData.name.trim().split(' ')
      const lastName = nameParts[0] || ''
      const firstName = nameParts.slice(1).join(' ') || nameParts[0] || ''

      // Sign up with Cognito using new API
      const { isSignUpComplete, userId } = await signUp({
        username: formData.email,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email,
            given_name: firstName,
            family_name: lastName,
            'custom:consent_agreed': 'true',
            'custom:consent_date': new Date().toISOString(),
            'custom:meditation_group': Math.random() < 0.5 ? 'intervention' : 'control'
          }
        }
      })

      toast({
        title: "アカウントを作成しました",
        description: "確認コードをメールで送信しました。",
      })

      setShowConfirmation(true)
      
    } catch (error) {
      console.error('Signup error:', error)
      
      let errorMessage = "登録に失敗しました。"
      
      if (error.name === 'UsernameExistsException') {
        errorMessage = "このメールアドレスは既に登録されています。"
      } else if (error.name === 'InvalidPasswordException') {
        errorMessage = "パスワードが要件を満たしていません。"
      } else if (error.name === 'InvalidParameterException') {
        errorMessage = "入力内容に問題があります。"
      }

      toast({
        variant: "destructive",
        title: "登録エラー",
        description: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function confirmSignUpHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {
      // Confirm sign up
      const { isSignUpComplete } = await confirmSignUp({
        username: formData.email,
        confirmationCode: formData.confirmationCode
      })

      if (isSignUpComplete) {
        // Automatically sign in after confirmation
        const { isSignedIn } = await signIn({
          username: formData.email,
          password: formData.password
        })

        if (isSignedIn) {
          // Get the current user and session
          const user = await getCurrentUser()
          const session = await fetchAuthSession()
          
          // Store token and user info
          const token = session.tokens?.idToken?.toString()
          if (token) {
            localStorage.setItem('auth_token', token)
          }
          
          localStorage.setItem('user_info', JSON.stringify({
            email: user.signInDetails?.loginId,
            userId: user.userId,
            username: user.username
          }))

          toast({
            title: "アカウントが確認されました",
            description: "オンボーディングを開始します。",
          })

          router.push("/onboarding")
        }
      }
      
    } catch (error) {
      console.error('Confirmation error:', error)
      
      let errorMessage = "確認に失敗しました。"
      
      if (error.name === 'CodeMismatchException') {
        errorMessage = "確認コードが正しくありません。"
      } else if (error.name === 'ExpiredCodeException') {
        errorMessage = "確認コードの有効期限が切れています。"
      }

      toast({
        variant: "destructive",
        title: "確認エラー",
        description: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const resendConfirmationCode = async () => {
    try {
      await resendSignUpCode({
        username: formData.email
      })
      toast({
        title: "確認コードを再送信しました",
        description: "メールをご確認ください。",
      })
    } catch (error) {
      console.error('Resend error:', error)
      toast({
        variant: "destructive",
        title: "エラー",
        description: "確認コードの再送信に失敗しました。",
      })
    }
  }

  if (showConfirmation) {
    return (
      <form onSubmit={confirmSignUpHandler} className="space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-medium">メール確認</h3>
          <p className="text-sm text-gray-600">
            {formData.email} に送信された確認コードを入力してください
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmationCode">確認コード</Label>
          <Input 
            id="confirmationCode" 
            name="confirmationCode"
            placeholder="123456" 
            value={formData.confirmationCode}
            onChange={handleInputChange}
            required 
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "確認中..." : "アカウントを確認"}
        </Button>
        <Button 
          type="button" 
          variant="link" 
          className="w-full text-sm"
          onClick={resendConfirmationCode}
        >
          確認コードを再送信
        </Button>
      </form>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">お名前</Label>
        <Input 
          id="name" 
          name="name"
          placeholder="山田 太郎" 
          value={formData.name}
          onChange={handleInputChange}
          required 
        />
      </div>
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
        <Label htmlFor="password">パスワード</Label>
        <Input 
          id="password" 
          name="password"
          type="password" 
          placeholder="8文字以上、大文字・小文字・数字を含む"
          value={formData.password}
          onChange={handleInputChange}
          required 
        />
        <p className="text-xs text-gray-500">
          パスワードは8文字以上で、大文字・小文字・数字を含めてください
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="consent"
          name="consentAgreed"
          checked={formData.consentAgreed}
          onCheckedChange={(checked) => 
            setFormData(prev => ({...prev, consentAgreed: checked}))
          }
        />
        <Label htmlFor="consent" className="text-sm">
          マインドフルネス研究への参加に同意します
        </Label>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading || !formData.consentAgreed}>
        {isLoading ? "登録中..." : "アカウント作成"}
      </Button>
    </form>
  )
}