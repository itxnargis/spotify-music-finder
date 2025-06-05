"use client"

import { useState, useEffect } from "react"
import { ExternalLink, Play, Pause, Heart, Share2, Clock, Users, Calendar } from 'lucide-react'

interface Artist {
  name: string | undefined
}

interface Track {
  id: string
  name: string | undefined
  artists: Artist[] | undefined
  album: {
    name: string
    images: { url: string }[]
    release_date: string
  }
  preview_url: string | null
  external_urls: {
    spotify: string
  }
  popularity: number
  duration_ms: number
}

interface SpotifyPlayerProps {
  songName: { title: string; subtitle: string; meta: object }
  onPlayStateChange?: (isPlaying: boolean) => void
}

export default function SpotifyPlayer({ songName, onPlayStateChange }: SpotifyPlayerProps) {
  const [track, setTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)

  const getSpotifyToken = async () => {
    try {
      const response = await fetch(
        "https://accounts.spotify.com/api/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(
              `${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}`,
            )}`,
          },
          body: new URLSearchParams({
            grant_type: "client_credentials",
          }),
        }
      )
      const data = await response.json()
      return data.access_token
    } catch (error) {
      console.error("Error fetching Spotify token:", error)
      return null
    }
  }

  useEffect(() => {
    const searchSpotify = async () => {
      setLoading(true)
      const token = await getSpotifyToken()
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(`${songName.title} ${songName.subtitle}`)}&type=track&limit=5`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        const data = await response.json()
        const tracks: Track[] = data.tracks.items

        if (tracks.length === 0) {
          console.error("No tracks found on Spotify")
          setLoading(false)
          return
        }

        const matchedTrack = tracks.find((track) => {
          const trackName = track.name?.toLowerCase()
          const artistNames = track.artists?.map((artist) => artist.name?.toLowerCase()).filter(Boolean) || []

          if (!trackName || artistNames.length === 0) {
            return false
          }

          return (
            trackName === songName.title.toLowerCase() &&
            artistNames.some((artistName) => artistName === songName.subtitle.toLowerCase())
          )
        })

        setTrack(matchedTrack || tracks[0])
      } catch (error) {
        console.error("Error searching Spotify:", error)
      } finally {
        setLoading(false)
      }
    }

    searchSpotify()
  }, [songName])

  const togglePlayback = () => {
    if (!track?.preview_url) {
      console.error("No preview available for this track")
      return
    }

    if (audio) {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
        onPlayStateChange?.(false)
      } else {
        audio.play()
        setIsPlaying(true)
        onPlayStateChange?.(true)
      }
    } else {
      const newAudio = new Audio(track.preview_url)
      newAudio.play()
      newAudio.onended = () => {
        setIsPlaying(false)
        onPlayStateChange?.(false)
      }
      setAudio(newAudio)
      setIsPlaying(true)
      onPlayStateChange?.(true)
    }
  }

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleShare = async () => {
    if (navigator.share && track) {
      try {
        await navigator.share({
          title: track.name,
          text: `Check out "${track.name}" by ${track.artists?.map(a => a.name).join(', ')}`,
          url: track.external_urls.spotify,
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else if (track) {
      navigator.clipboard.writeText(track.external_urls.spotify)
      console.log('Spotify link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl p-8 border border-slate-600/30">
          <div className="flex items-center space-x-6">
            <div className="bg-slate-600/50 rounded-xl w-24 h-24"></div>
            <div className="flex-1 space-y-3">
              <div className="bg-slate-600/50 h-6 rounded w-3/4"></div>
              <div className="bg-slate-600/50 h-4 rounded w-1/2"></div>
              <div className="bg-slate-600/50 h-4 rounded w-2/3"></div>
            </div>
            <div className="space-y-2">
              <div className="bg-slate-600/50 w-12 h-12 rounded-full"></div>
              <div className="bg-slate-600/50 w-12 h-12 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!track) {
    return (
      <div className="text-center p-8">
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-600/30">
          <div className="text-6xl mb-4">🎵</div>
          <h3 className="text-xl font-semibold text-white mb-2">Track Not Found</h3>
          <p className="text-slate-400">We couldn't find this track on Spotify. Try uploading a different audio file.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto p-6">
      {/* Spotify Embed */}
      <div className="relative">
        <div className="relative bg-slate-900/50 rounded-2xl p-4">
          <iframe
            src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0`}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-xl"
          ></iframe>
        </div>
      </div>

      {/* Main Track Card */}
      <div className="relative group">
        <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl p-8 border border-green-500/20">
          <div className="flex items-center space-x-6">
            {/* Album Art */}
            <div className="relative group/image">
              <img
                src={track.album.images[0]?.url || "/placeholder.svg?height=96&width=96"}
                alt={track.album.name}
                className="w-24 h-24 rounded-xl object-cover shadow-2xl group-hover/image:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Play className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Track Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white text-lg truncate">
                {track.name}
              </h3>
              <p className="text-gray-300 truncate">
                {track.artists?.map((artist) => artist.name).join(", ")}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {track.preview_url && (
                <button
                  onClick={togglePlayback}
                  className="group/btn bg-green-500 hover:bg-green-600 text-white rounded-full p-4 transition-all duration-200 hover:scale-110 shadow-lg hover:shadow-green-500/25"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 ml-0.5" />
                  )}
                </button>
              )}

              <button
                onClick={() => setLiked(!liked)}
                className={`p-3 rounded-full transition-colors ${liked ? "text-red-500 hover:bg-red-500/10" : "text-gray-400 hover:text-red-400 hover:bg-gray-800/50"
                  }`}
              >
                <Heart className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-3 rounded-full text-gray-400 hover:text-blue-400 hover:bg-gray-800/50 transition-colors"
              >
                <Share2 className="w-6 h-6" />
              </button>

              <a
                href={track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full text-green-400 hover:text-green-300 hover:bg-gray-800/50 transition-colors"
              >
                <ExternalLink className="w-6 h-6" />
              </a>
            </div>
          </div>
          {/* Track Stats */}
          <div className="flex items-center gap-6 mt-8 border-t border-gray-700 pt-4">
            <div className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-gray-100">
              <Clock className="w-4 h-4" />
              <span>{formatDuration(track.duration_ms)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-gray-100">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>{track.popularity}% popularity</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-gray-100">
              <Calendar className="w-4 h-4" />
              <span>{new Date(track.album.release_date).getFullYear()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}