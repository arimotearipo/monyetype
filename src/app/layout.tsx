import type { Metadata } from "next"
import { IBM_Plex_Mono } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import ActionBar from "@/components/action-bar"

const ibm_plex_mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "500",
})

export const metadata: Metadata = {
  title: "Monyetype",
  description: "Typing test app",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body
        className={cn(
          ibm_plex_mono.className,
          "flex flex-col h-screen overflow-hidden",
        )}
      >
        <header className="grid grid-cols-3 p-2 bg-linear-to-b from-gray-300 to-white">
          <div></div>
          <span className="text-6xl text-center font-semibold tracking-wider">
            Monye<span className="text-orange-600">t</span>ype
            <span className="text-orange-600">.</span>
          </span>
          <ActionBar />
        </header>
        <main className="grow overflow-auto bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px]">
          {children}
        </main>
        <footer className="h-[5%] flex items-center justify-center bg-black">
          <span className="text-center text-sm text-white">
            © 2024 | Akmal Mohtar & Wan Nor Adzahari
          </span>
        </footer>
      </body>
    </html>
  )
}
