"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { FitbitIcon } from "@/components/icons/fitbit-icon"
import { Check, X } from "lucide-react"

export function FitbitConnection() {
  const [isConnected, setIsConnected] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // 仮のFitbitデータ
  const fitbitData = {
    lastSync: "2023-04-21 15:30",
    dataTypes: ["アクティビティ", "心拍数", "睡眠", "エクササイズ", "ストレス"],
  }

  const handleConnect = async () => {
    setIsLoading(true)

    try {
      // Fitbit連携処理
      // OAuth認証フローを開始
      window.location.href = "/api/auth/fitbit"
    } catch (error) {
      toast({
        variant: "destructive",
        title: "連携に失敗しました",
        description: "Fitbitとの連携処理中にエラーが発生しました。",
      })
      setIsLoading(false)
    }
  }

  const handleDisconnect = async () => {
    setIsLoading(true)

    try {
      // Fitbit連携解除処理
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsConnected(false)
      toast({
        title: "連携を解除しました",
        description: "Fitbitとの連携を解除しました。",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "連携解除に失敗しました",
        description: "Fitbitとの連携解除中にエラーが発生しました。",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fitbit連携</CardTitle>
        <CardDescription>Fitbitデバイスとの連携を管理します</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <FitbitIcon className="h-12 w-12 text-[#00B0B9]" />
          <div>
            {isConnected ? (
              <div className="space-y-1">
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span className="font-medium">連携済み</span>
                </div>
                <p className="text-xs text-muted-foreground">最終同期: {fitbitData.lastSync}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {fitbitData.dataTypes.map((type, index) => (
                    <span key={index} className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex items-center">
                  <X className="h-4 w-4 text-red-500 mr-2" />
                  <span className="font-medium">未連携</span>
                </div>
                <p className="text-xs text-muted-foreground">Fitbitと連携して健康データを取得しましょう</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {isConnected ? (
          <Button variant="outline" onClick={handleDisconnect} disabled={isLoading}>
            {isLoading ? "処理中..." : "連携を解除"}
          </Button>
        ) : (
          <Button onClick={handleConnect} disabled={isLoading}>
            {isLoading ? "処理中..." : "Fitbitと連携する"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
