"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { ExternalLink, Play, Pause, Heart, Share2, Clock, Users } from 'lucide-react'

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
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({
          grant_type: "client_credentials",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(
              `${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}`,
            )}`,
          },
        },
      )
      return response.data.access_token
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
        const response = await axios.get("https://api.spotify.com/v1/search", {
          params: { q: `${songName.title} ${songName.subtitle}`, type: "track", limit: 5 },
          headers: { Authorization: `Bearer ${token}` },
        })

        const tracks: Track[] = response.data.tracks.items

        if (tracks.length === 0) {
          toast.error("No tracks found on Spotify")
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
        toast.error("Error searching Spotify")
      } finally {
        setLoading(false)
      }
    }

    searchSpotify()
  }, [songName])

  const togglePlayback = () => {
    if (!track?.preview_url) {
      toast.error("No preview available for this track")
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
      toast.success('Spotify link copied to clipboard!')
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
    <div className="space-y-6">
      {/* Main Track Card */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
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
            <div className="flex-1 space-y-2">
              <h3 className="text-2xl font-bold text-white group-hover:text-green-300 transition-colors duration-300">
                {track.name}
              </h3>
              <p className="text-green-300 text-lg font-medium">
                {track.artists?.map((artist) => artist.name).join(", ")}
              </p>
              <p className="text-slate-400">{track.album.name}</p>
              
              {/* Track Stats */}
              <div className="flex items-center space-x-4 text-sm text-slate-400">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatDuration(track.duration_ms)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{track.popularity}% popularity</span>
                </div>
                <div className="text-xs bg-slate-700/50 px-2 py-1 rounded">
                  {new Date(track.album.release_date).getFullYear()}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-3">
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
                className={`p-4 rounded-full transition-all duration-200 hover:scale-110 ${
                  liked 
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-red-500/25' 
                    : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                }`}
              >
                <Heart className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} />
              </button>
              
              <button
                onClick={handleShare}
                className="bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-full p-4 transition-all duration-200 hover:scale-110"
              >
                <Share2 className="w-6 h-6" />
              </button>
              
              <a
                href={track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 transition-all duration-200 hover:scale-110 shadow-lg hover:shadow-green-600/25"
              >
                <ExternalLink className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Spotify Embed */}
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur opacity-30"></div>
        <div className="relative bg-slate-900/50 rounded-2xl p-4 border border-green-500/20">
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
    </div>
  )
}
