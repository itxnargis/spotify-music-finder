"use client"

import { useState, useEffect } from 'react'
import { Music, TrendingUp, Target } from 'lucide-react'

interface ScanStatsProps {
  stats: {
    total: number
    successful: number
    failed: number
  }
}

export default function ScanStats({ stats }: ScanStatsProps) {
  const [animatedStats, setAnimatedStats] = useState({ total: 0, successful: 0, failed: 0 })
  
  const successRate = stats.total > 0 ? Math.round((stats.successful / stats.total) * 100) : 0

  // Animate numbers on mount
  useEffect(() => {
    const duration = 1500
    const steps = 30
    const stepDuration = duration / steps

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setAnimatedStats({
        total: Math.round(stats.total * progress),
        successful: Math.round(stats.successful * progress),
        failed: Math.round(stats.failed * progress)
      })

      if (currentStep >= steps) {
        clearInterval(interval)
        setAnimatedStats(stats)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [stats])

  if (stats.total === 0) {
    return null
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Music className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white">Discovery Stats</h3>
        <p className="text-gray-400">Your music recognition results</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            icon: Music,
            label: "Total",
            value: animatedStats.total,
            color: "text-blue-400"
          },
          {
            icon: Target,
            label: "Found",
            value: animatedStats.successful,
            color: "text-green-400"
          },
          {
            icon: TrendingUp,
            label: "Success",
            value: `${successRate}%`,
            color: "text-purple-400"
          }
        ].map((stat, index) => (
          <div key={index} className="text-center space-y-3">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
              </p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Recognition Rate</span>
          <span className="text-white font-medium">{successRate}%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${successRate}%` }}
          />
        </div>
      </div>

      {/* Simple Footer */}
      <div className="text-center pt-4 border-t border-white/10">
        <p className="text-sm text-gray-400">
          {successRate >= 90 ? "Excellent" : successRate >= 70 ? "Good" : "Learning"} recognition performance
        </p>
      </div>
    </div>
  )
}