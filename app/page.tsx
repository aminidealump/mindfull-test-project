import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { WelcomeScreen } from "@/components/welcome-screen"

export default function Home() {
  const cookieStore = cookies()
  const isAuthenticated = cookieStore.has("auth_token")

  // 認証済みの場合はダッシュボードにリダイレクト
  if (isAuthenticated) {
    redirect("/dashboard")
  }

  return <WelcomeScreen />
}
