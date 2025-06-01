"use client"

import { useState } from "react"
import { Play, Pause, ExternalLink, TrendingUp, Heart } from 'lucide-react'

export default function TrendingTracks() {
  const [playingTrack, setPlayingTrack] = useState<number | null>(null)

  // Mock trending tracks data
  const trendingTracks = [
    {
      id: 1,
      title: "Flowers",
      artist: "Miley Cyrus",
      album: "Endless Summer Vacation",
      image: "/placeholder.svg?height=80&width=80",
      trend: "+15%",
      plays: "2.1B",
    },
    {
      id: 2,
      title: "Anti-Hero",
      artist: "Taylor Swift",
      album: "Midnights",
      image: "/placeholder.svg?height=80&width=80",
      trend: "+8%",
      plays: "1.8B",
    },
    {
      id: 3,
      title: "As It Was",
      artist: "Harry Styles",
      album: "Harry's House",
      image: "/placeholder.svg?height=80&width=80",
      trend: "+12%",
      plays: "1.5B",
    },
    {
      id: 4,
      title: "Unholy",
      artist: "Sam Smith ft. Kim Petras",
      album: "Gloria",
      image: "/placeholder.svg?height=80&width=80",
      trend: "+22%",
      plays: "1.2B",
    },
  ]

  const togglePlay = (trackId: number) => {
    setPlayingTrack(playingTrack === trackId ? null : trackId)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trendingTracks.map((track, index) => (
          <div
            key={track.id}
            className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-green-500/30 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600/0 to-green-600/0 group-hover:from-green-600/20 group-hover:to-green-600/20 rounded-2xl blur transition-all duration-300"></div>

            <div className="relative flex items-center space-x-4">
              {/* Rank */}
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
              </div>

              {/* Album Art */}
              <div className="relative">
                <img
                  src={track.image || "/placeholder.svg"}
                  alt={track.album}
                  className="w-16 h-16 rounded-lg object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => togglePlay(track.id)}
                  className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                >
                  {playingTrack === track.id ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-0.5" />
                  )}
                </button>
              </div>

              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-bold text-white truncate group-hover:text-green-300 transition-colors">
                  {track.title}
                </h4>
                <p className="text-slate-400 truncate">{track.artist}</p>
                <div className="flex items-center space-x-3 mt-1">
                  <span className="text-xs text-slate-500">{track.plays} plays</span>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3 text-green-400" />
                    <span className="text-xs text-green-400 font-medium">{track.trend}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex-shrink-0">
                <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200">
                  <ExternalLink className="w-4 h-4 text-slate-400 hover:text-white" />
                </button>
              </div>
            </div>

            {/* Trending indicator */}
            <div className="absolute top-2 right-2">
              <Heart className="w-4 h-4 text-green-400 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
