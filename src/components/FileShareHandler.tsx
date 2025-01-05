import React from 'react'
import { Share2 } from 'lucide-react'

const FileShareHandler: React.FC = () => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Spotify Music Finder',
          text: 'Check out this awesome tool to find your music on Spotify!',
          url: window.location.href,
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      alert('Web Share API is not supported in your browser.')
    }
  }

  return (
    <button
      onClick={handleShare}
      className="flex items-center justify-center w-full bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
    >
      <Share2 className="w-5 h-5 mr-2" />
      Share This Tool
    </button>
  )
}

export default FileShareHandler

