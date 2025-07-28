// components/debug-config.tsx
"use client"

export function DebugConfig() {
  const config = {
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
    clientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded text-xs max-w-sm">
      <h4 className="font-bold mb-2">Debug - Environment Variables:</h4>
      <div>Region: {config.region || '❌ Missing'}</div>
      <div>User Pool ID: {config.userPoolId || '❌ Missing'}</div>
      <div>Client ID: {config.clientId || '❌ Missing'}</div>
    </div>
  )
}

// Add this to your welcome screen temporarily to debug
// import { DebugConfig } from "@/components/debug-config"
// Then add <DebugConfig /> at the bottom of your welcome screen