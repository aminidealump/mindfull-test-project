"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Play, Clock } from "lucide-react"

export function MeditationList() {
  // 仮の瞑想プログラムデータ
  const meditationPrograms = [
    {
      id: 1,
      title: "朝の活力瞑想",
      category: "morning",
      duration: "5分",
      description: "一日を活力的に始めるための短い瞑想プログラムです。",
      completed: true,
    },
    {
      id: 2,
      title: "ストレス解消瞑想",
      category: "stress",
      duration: "8分",
      description: "仕事や日常のストレスを解消するための瞑想プログラムです。",
      completed: false,
    },
    {
      id: 3,
      title: "集中力向上瞑想",
      category: "focus",
      duration: "10分",
      description: "集中力を高め、生産性を向上させるための瞑想プログラムです。",
      completed: false,
    },
    {
      id: 4,
      title: "睡眠導入瞑想",
      category: "sleep",
      duration: "15分",
      description: "質の高い睡眠へと導くためのリラックス瞑想プログラムです。",
      completed: false,
    },
    {
      id: 5,
      title: "マインドフルネス基礎",
      category: "basic",
      duration: "7分",
      description: "マインドフルネスの基本を学ぶための入門プログラムです。",
      completed: true,
    },
    {
      id: 6,
      title: "感謝の瞑想",
      category: "gratitude",
      duration: "6分",
      description: "感謝の気持ちを育み、ポジティブな心を養うプログラムです。",
      completed: false,
    },
  ]

  return (
    <Tabs defaultValue="all">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="all">すべて</TabsTrigger>
        <TabsTrigger value="morning">朝</TabsTrigger>
        <TabsTrigger value="focus">集中</TabsTrigger>
        <TabsTrigger value="sleep">睡眠</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="mt-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {meditationPrograms.map((program) => (
            <MeditationCard key={program.id} program={program} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="morning" className="mt-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {meditationPrograms
            .filter((program) => program.category === "morning")
            .map((program) => (
              <MeditationCard key={program.id} program={program} />
            ))}
        </div>
      </TabsContent>

      <TabsContent value="focus" className="mt-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {meditationPrograms
            .filter((program) => program.category === "focus")
            .map((program) => (
              <MeditationCard key={program.id} program={program} />
            ))}
        </div>
      </TabsContent>

      <TabsContent value="sleep" className="mt-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {meditationPrograms
            .filter((program) => program.category === "sleep")
            .map((program) => (
              <MeditationCard key={program.id} program={program} />
            ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}

interface MeditationCardProps {
  program: {
    id: number
    title: string
    category: string
    duration: string
    description: string
    completed: boolean
  }
}

function MeditationCard({ program }: MeditationCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{program.title}</CardTitle>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            {program.duration}
          </div>
        </div>
        <CardDescription>{program.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm">
          {program.completed && (
            <div className="text-green-600 text-xs font-medium bg-green-100 px-2 py-0.5 rounded-full">完了済み</div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/meditations/${program.id}`}>
            <Play className="mr-2 h-4 w-4" /> 再生する
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
