// app/layout.tsx
import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AmplifyProvider } from "@/components/amplify-provider"

const inter = Inter({ subsets: ["latin"] })

import { Amplify } from 'aws-amplify';
import awsExports from './../lib/amplify';

Amplify.configure(awsExports);


export const metadata = {
  title: "マインドフルネス ヘルスケア",
  description: "Fitbitと連携したマインドフルネス瞑想プログラム",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AmplifyProvider>
            {children}
          </AmplifyProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}