import React, { useState, useEffect } from 'react'
import axios from 'axios'

interface Artist {
  name: string | undefined
}

interface Track {
  id: string
  name: string | undefined
  artists: Artist[] | undefined
}

interface SpotifyPlayerProps {
  songName: { title: string; subtitle: string; meta: object }
}

export function SpotifyPlayer({ songName }: SpotifyPlayerProps) {
  const [trackId, setTrackId] = useState<string | null>(null)

  const getSpotifyToken = async () => {
    try {
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        new URLSearchParams({
          grant_type: 'client_credentials',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${btoa(
              `${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}`
            )}`,
          },
        }
      )
      return response.data.access_token
    } catch (error) {
      console.error('Error fetching Spotify token:', error)
      return null
    }
  }

  useEffect(() => {
    const searchSpotify = async () => {
      const token = await getSpotifyToken()
      if (!token) return

      try {
        const response = await axios.get('https://api.spotify.com/v1/search', {
          params: { q: `${songName.title} ${songName.subtitle}`, type: 'track', limit: 5 },
          headers: { Authorization: `Bearer ${token}` },
        })

        const tracks: Track[] = response.data.tracks.items

        if (tracks.length === 0) {
          console.error('No tracks found.')
          return
        }

        const matchedTrack = tracks.find(track => {
          const trackName = track.name?.toLowerCase()
          const artistNames = track.artists?.map(artist => artist.name?.toLowerCase()).filter(Boolean) || []

          if (!trackName || artistNames.length === 0) {
            return false
          }

          return (
            trackName === songName.title.toLowerCase() &&
            artistNames.some(artistName => artistName === songName.subtitle.toLowerCase())
          )
        })

        if (matchedTrack) {
          setTrackId(matchedTrack.id)
        } else {
          setTrackId(tracks[0].id)
          console.log('No exact match found. Using the first search result.')
        }
      } catch (error) {
        console.error('Error searching Spotify:', error)
      }
    }

    searchSpotify()
  }, [songName])

  if (!trackId) {
    return (
      <div className="mt-4 text-center text-gray-600 dark:text-gray-400">
        Searching for song on Spotify...
      </div>
    )
  }

  return (
    <div className="mt-4">
      <iframe
        src={`https://open.spotify.com/embed/track/${trackId}`}
        width="100%"
        height="80"
        frameBorder="0"
        allow="encrypted-media"
        className="rounded-lg"
      ></iframe>
    </div>
  )
}

export default SpotifyPlayer;