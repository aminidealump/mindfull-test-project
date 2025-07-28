// components/amplify-provider.tsx
"use client"

import { useEffect, useState } from 'react'

export function AmplifyProvider({ children }: { children: React.ReactNode }) {
  const [isConfigured, setIsConfigured] = useState(false)

  useEffect(() => {
    const configureAmplify = async () => {
      try {
        // Import and configure Amplify
        await import('../lib/amplify')
        setIsConfigured(true)
        console.log('Amplify configured successfully')
      } catch (error) {
        console.error('Failed to configure Amplify:', error)
        // Even if configuration fails, we should still render the app
        setIsConfigured(true)
      }
    }
    
    configureAmplify()
  }, [])

  // Show loading while configuring
  if (!isConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">設定を読み込み中...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}