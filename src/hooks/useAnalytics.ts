"use client"

import { useCallback } from "react"

export function useAnalytics() {
  const trackPageView = useCallback((page: string) => {
    // Mock analytics tracking
    console.log(`Page view: ${page}`)
  }, [])

  const trackEvent = useCallback((event: string, properties?: Record<string, any>) => {
    // Mock event tracking
    console.log(`Event: ${event}`, properties)
  }, [])

  return {
    trackPageView,
    trackEvent,
  }
}
