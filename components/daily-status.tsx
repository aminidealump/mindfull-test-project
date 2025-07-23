"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Smile, Meh, Frown } from "lucide-react"
import { cn } from "@/lib/utils"

export function DailyStatus() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood)
  }

  const handleSubmit = () => {
    if (selectedMood) {
      // 気分データを送信する処理
      setIsSubmitted(true)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>今日の気分</CardTitle>
        <CardDescription>{isSubmitted ? "今日の気分を記録しました" : "今の気分を教えてください"}</CardDescription>
      </CardHeader>
      <CardContent>
        {!isSubmitted ? (
          <div className="flex justify-around">
            <Button
              variant="ghost"
              className={cn(
                "flex flex-col items-center p-4 rounded-full",
                selectedMood === "good" && "bg-green-100 text-green-600",
              )}
              onClick={() => handleMoodSelect("good")}
            >
              <Smile className="h-10 w-10 mb-2" />
              <span>良い</span>
            </Button>
            <Button
              variant="ghost"
              className={cn(
                "flex flex-col items-center p-4 rounded-full",
                selectedMood === "neutral" && "bg-amber-100 text-amber-600",
              )}
              onClick={() => handleMoodSelect("neutral")}
            >
              <Meh className="h-10 w-10 mb-2" />
              <span>普通</span>
            </Button>
            <Button
              variant="ghost"
              className={cn(
                "flex flex-col items-center p-4 rounded-full",
                selectedMood === "bad" && "bg-red-100 text-red-600",
              )}
              onClick={() => handleMoodSelect("bad")}
            >
              <Frown className="h-10 w-10 mb-2" />
              <span>悪い</span>
            </Button>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="flex justify-center mb-4">
              {selectedMood === "good" && <Smile className="h-12 w-12 text-green-500" />}
              {selectedMood === "neutral" && <Meh className="h-12 w-12 text-amber-500" />}
              {selectedMood === "bad" && <Frown className="h-12 w-12 text-red-500" />}
            </div>
            <p className="text-muted-foreground">
              {selectedMood === "good" && "素晴らしい一日をお過ごしください！"}
              {selectedMood === "neutral" && "リラックスする時間を作りましょう。"}
              {selectedMood === "bad" && "深呼吸をして、少し休憩しましょう。"}
            </p>
          </div>
        )}
      </CardContent>
      {!isSubmitted && (
        <CardFooter>
          <Button className="w-full" disabled={!selectedMood} onClick={handleSubmit}>
            記録する
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
