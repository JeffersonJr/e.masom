'use client'

import { useEffect, useState } from 'react'

interface HydrationGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function HydrationGuard({ children, fallback = null }: HydrationGuardProps) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (!isHydrated) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

interface NoSSRWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function NoSSRWrapper({ children, fallback = null }: NoSSRWrapperProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
