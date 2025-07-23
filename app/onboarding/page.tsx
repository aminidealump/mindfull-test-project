"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { FitbitIcon } from "@/components/icons/fitbit-icon"
import { ArrowRight, Check } from "lucide-react"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [consentChecked, setConsentChecked] = useState(false)
  const router = useRouter()

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      router.push("/dashboard")
    }
  }

  const connectFitbit = () => {
    // Fitbit連携処理をここに実装
    // OAuth認証フローを開始
    window.location.href = "/api/auth/fitbit"
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white p-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    i < step ? "bg-green-500" : i === step ? "bg-indigo-600" : "bg-gray-200"
                  } text-white font-medium`}
                >
                  {i < step ? <Check className="h-5 w-5" /> : i}
                </div>
                <span className="text-xs mt-2 text-gray-600">{i === 1 ? "同意" : i === 2 ? "Fitbit連携" : "完了"}</span>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200"></div>
            <div
              className="absolute top-0 left-0 h-1 bg-indigo-600 transition-all duration-300"
              style={{ width: `${(step - 1) * 50}%` }}
            ></div>
          </div>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>研究参加への同意</CardTitle>
              <CardDescription>
                このアプリはマインドフルネス瞑想の効果を検証する研究の一環として提供されています。
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md bg-gray-50 p-4 text-sm">
                <p className="mb-4">本研究では、以下のデータを収集・分析します：</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Fitbitから取得するアクティビティ、心拍数、睡眠、エクササイズ、ストレスデータ</li>
                  <li>アプリ内で回答いただくアンケートの回答</li>
                  <li>マインドフルネス瞑想プログラムの利用状況</li>
                </ul>
                <p className="mt-4">
                  収集したデータは研究目的にのみ使用され、個人を特定できる形で公開されることはありません。
                </p>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="consent"
                  checked={consentChecked}
                  onCheckedChange={(checked) => setConsentChecked(checked as boolean)}
                />
                <Label htmlFor="consent" className="text-sm">
                  上記内容を理解し、研究への参加に同意します。いつでも参加を取りやめることができます。
                </Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleNext} disabled={!consentChecked} className="w-full">
                同意して次へ <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Fitbitと連携する</CardTitle>
              <CardDescription>あなたのFitbitデータを連携して、より正確な健康状態の分析を行います。</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <FitbitIcon className="h-16 w-16 text-[#00B0B9]" />
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">連携することで、以下のデータにアクセスします：</p>
                <ul className="text-sm text-left space-y-2">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" /> アクティビティデータ
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" /> 心拍数データ
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" /> 睡眠データ
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" /> エクササイズデータ
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" /> ストレスデータ
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button onClick={connectFitbit} className="w-full">
                Fitbitと連携する
              </Button>
              <Button variant="outline" onClick={handleNext} className="w-full">
                後で連携する
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>セットアップ完了</CardTitle>
              <CardDescription>おめでとうございます！マインドフルネス ヘルスケアの準備が整いました。</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="rounded-full bg-green-100 p-3">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  これからマインドフルネス瞑想プログラムを通じて、あなたの心身の健康をサポートします。
                  通知設定を有効にすると、最適なタイミングでプログラムをお知らせします。
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleNext} className="w-full">
                ダッシュボードへ
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}
