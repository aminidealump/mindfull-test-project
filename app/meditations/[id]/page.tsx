"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"

export default function MeditationPlayerPage({ params }: { params: { id: string } }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(80)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const router = useRouter()

  // 仮の瞑想プログラムデータ
  const meditationProgram = {
    id: Number.parseInt(params.id),
    title: "朝の活力瞑想",
    description:
      "一日を活力的に始めるための短い瞑想プログラムです。深呼吸と共に、新しい一日のエネルギーを感じましょう。",
    audioSrc: "/meditation-audio.mp3", // 実際のオーディオファイルへのパス
    duration: "5:00",
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100

      const updateTime = () => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime)
        }
      }

      const handleLoadedMetadata = () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration)
        }
      }

      const handleEnded = () => {
        setIsPlaying(false)
        setCurrentTime(0)
        if (audioRef.current) {
          audioRef.current.currentTime = 0
        }
      }

      audioRef.current.addEventListener("timeupdate", updateTime)
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata)
      audioRef.current.addEventListener("ended", handleEnded)

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("timeupdate", updateTime)
          audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata)
          audioRef.current.removeEventListener("ended", handleEnded)
        }
      }
    }
  }, [audioRef])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleVolumeChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100
      setVolume(value[0])
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const goBack = () => {
    router.back()
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-indigo-50 to-white">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-14 items-center">
          <Button variant="ghost" size="icon" onClick={goBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="ml-4">
            <h1 className="text-lg font-medium">{meditationProgram.title}</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <div className="flex justify-center">
            <div className="w-48 h-48 rounded-full bg-indigo-100 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full bg-indigo-200 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-indigo-300 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-indigo-400 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                      {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">{meditationProgram.title}</h2>
            <p className="text-sm text-muted-foreground">{meditationProgram.description}</p>
          </div>

          <Card>
            <CardContent className="p-4 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <Slider
                  value={[currentTime]}
                  max={duration || 100}
                  step={1}
                  onValueChange={handleTimeChange}
                  className="w-full"
                />
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <SkipBack className="h-5 w-5" />
                </Button>
                <Button variant="default" size="icon" className="rounded-full h-12 w-12" onClick={togglePlay}>
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <SkipForward className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <Slider value={[volume]} max={100} step={1} onValueChange={handleVolumeChange} className="w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <audio ref={audioRef} src={meditationProgram.audioSrc} preload="metadata" />
    </div>
  )
}
