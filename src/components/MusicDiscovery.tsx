"use client"

import { useState } from "react"
import { Compass, Music, Users, Heart, ExternalLink } from 'lucide-react'

interface MusicDiscoveryProps {
  analyzedSong: { title: string; subtitle: string; meta: object } | null
}

export default function MusicDiscovery({ analyzedSong }: MusicDiscoveryProps) {
  const [activeTab, setActiveTab] = useState("similar")

  // Mock data for similar tracks and artists
  const similarTracks = [
    {
      id: 1,
      title: "Similar Track 1",
      artist: "Artist Name",
      image: "/placeholder.svg?height=60&width=60",
      match: "95%",
    },
    {
      id: 2,
      title: "Similar Track 2",
      artist: "Artist Name",
      image: "/placeholder.svg?height=60&width=60",
      match: "89%",
    },
    {
      id: 3,
      title: "Similar Track 3",
      artist: "Artist Name",
      image: "/placeholder.svg?height=60&width=60",
      match: "84%",
    },
  ]

  const relatedArtists = [
    {
      id: 1,
      name: "Related Artist 1",
      genre: "Pop",
      image: "/placeholder.svg?height=80&width=80",
      followers: "2.1M",
    },
    {
      id: 2,
      name: "Related Artist 2",
      genre: "Alternative",
      image: "/placeholder.svg?height=80&width=80",
      followers: "1.5M",
    },
  ]

  if (!analyzedSong) {
    return (
      <div className="text-center py-16">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10">
          <Compass className="w-16 h-16 mx-auto mb-6 text-slate-400" />
          <h3 className="text-2xl font-bold text-white mb-4">Music Discovery</h3>
          <p className="text-slate-400 max-w-md mx-auto">
            Upload and analyze a song to discover similar tracks, related artists, and personalized recommendations
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <Compass className="w-10 h-10 mr-4 text-green-400" />
          <h2 className="text-4xl font-bold text-white">Music Discovery</h2>
        </div>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Explore music similar to "{analyzedSong.title}" and discover new favorites
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-2 border border-white/10">
          <div className="flex space-x-2">
            {[
              { id: "similar", label: "Similar Tracks", icon: Music },
              { id: "artists", label: "Related Artists", icon: Users },
              { id: "recommended", label: "For You", icon: Heart },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
        {activeTab === "similar" && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Similar Tracks</h3>
            <div className="grid gap-4">
              {similarTracks.map((track) => (
                <div
                  key={track.id}
                  className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                >
                  <img
                    src={track.image || "/placeholder.svg"}
                    alt={track.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-white font-semibold group-hover:text-green-300 transition-colors">
                      {track.title}
                    </h4>
                    <p className="text-slate-400 text-sm">{track.artist}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-400 text-sm font-medium">{track.match} match</span>
                    <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                      <ExternalLink className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "artists" && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Related Artists</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedArtists.map((artist) => (
                <div
                  key={artist.id}
                  className="flex items-center space-x-4 p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                >
                  <img
                    src={artist.image || "/placeholder.svg"}
                    alt={artist.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-lg group-hover:text-green-300 transition-colors">
                      {artist.name}
                    </h4>
                    <p className="text-slate-400">{artist.genre}</p>
                    <p className="text-slate-500 text-sm">{artist.followers} followers</p>
                  </div>
                  <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                    <ExternalLink className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "recommended" && (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 mx-auto mb-6 text-green-400" />
            <h3 className="text-2xl font-bold text-white mb-4">Personalized Recommendations</h3>
            <p className="text-slate-400 max-w-md mx-auto">
              Based on your music taste and listening history, we'll curate perfect recommendations just for you.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
