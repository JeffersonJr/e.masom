'use client'

import { useEffect, useState } from 'react'

interface SafeRenderProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  suppressHydrationWarning?: boolean
}

export function SafeRender({ 
  children, 
  fallback = null, 
  suppressHydrationWarning = true 
}: SafeRenderProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Se não for cliente, renderiza o fallback
  if (!isClient) {
    return <>{fallback}</>
  }

  // Se for cliente, renderiza os filhos
  return <>{children}</>
}

interface ClientOnlyProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

interface ServerOnlyProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ServerOnly({ children, fallback = null }: ServerOnlyProps) {
  if (typeof window !== 'undefined') {
    return <>{fallback}</>
  }

  return <>{children}</>
}
