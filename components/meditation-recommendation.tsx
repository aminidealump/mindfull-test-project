"use client"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export function MeditationRecommendation() {
  const router = useRouter()

  // 仮の推奨プログラム
  const recommendedProgram = {
    id: 1,
    title: "朝の活力瞑想",
    duration: "5分",
    description: "一日を活力的に始めるための短い瞑想プログラムです。",
  }

  const startMeditation = () => {
    router.push(`/meditations/${recommendedProgram.id}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>今日のおすすめ</CardTitle>
        <CardDescription>あなたにおすすめの瞑想プログラム</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{recommendedProgram.title}</h3>
            <span className="text-xs text-muted-foreground">{recommendedProgram.duration}</span>
          </div>
          <p className="text-sm text-muted-foreground">{recommendedProgram.description}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={startMeditation}>
          <Play className="mr-2 h-4 w-4" /> 今すぐ始める
        </Button>
      </CardFooter>
    </Card>
  )
}
