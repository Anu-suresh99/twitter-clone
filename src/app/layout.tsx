import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SupabaseProvider from './tweet/supabase-provider'
import LeftSidebar from "@/components/left-sidebar";
import RightSection from "@/components/right-section";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>

        <div className="w-full h-full flex justify-center items -center relative" >
          <div className="xl:max-w-[70vm] w-full h-full flex relative ">
            <LeftSidebar />
            <SupabaseProvider>{children}</SupabaseProvider>
            <RightSection />
          </div>
        </div>
      </body>
    </html>
  )
}
