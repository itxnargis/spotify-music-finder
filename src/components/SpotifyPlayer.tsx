import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface SpotifyPlayerProps {
  songName: string;
}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ songName }) => {
  const [trackId, setTrackId] = useState<string | null>(null);

  // Function to get the Spotify access token
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
            )}`, // base64(Client ID:Client Secret)
          },
        }
      );
      return response.data.access_token;
    } catch (error) {
      console.error('Error fetching Spotify token:', error);
      return null;
    }
  };

  useEffect(() => {
    const searchSpotify = async () => {
      const token = await getSpotifyToken();
      if (!token) return;

      try {
        const response = await axios.get('https://api.spotify.com/v1/search', {
          params: { q: songName, type: 'track', limit: 1 },
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.tracks.items.length > 0) {
          setTrackId(response.data.tracks.items[0].id);
        }
      } catch (error) {
        console.error('Error searching Spotify:', error);
      }
    };

    searchSpotify();
  }, [songName]);

  if (!trackId) {
    return <p className="mt-4 text-center text-gray-600">Searching for song on Spotify...</p>;
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
  );
};

export default SpotifyPlayer;
