"use client"

import { useState, useEffect } from 'react'
import { Music, Target, TrendingUp } from 'lucide-react'

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
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Music className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Your Stats</h3>
        <p className="text-gray-400">Upload your first audio file to see your recognition statistics</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-white mb-2">Recognition Stats</h3>
        <p className="text-gray-400 text-sm">Your music discovery performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            icon: Music,
            label: "Total Scans",
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
            label: "Success Rate",
            value: `${successRate}%`,
            color: "text-purple-400"
          }
        ].map((stat, index) => (
          <div key={index} className="text-center">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-xl font-bold text-white mb-1">
              {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
            </p>
            <p className="text-xs text-gray-400">{stat.label}</p>
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
    </div>
  )
}
