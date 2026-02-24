'use client'

import { SessionProvider } from 'next-auth/react'
import { SafeRender } from '@/components/ui/safe-render'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SafeRender>
      <SessionProvider>{children}</SessionProvider>
    </SafeRender>
  )
}
