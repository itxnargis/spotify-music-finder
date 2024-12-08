import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

interface AudioAnalyzerProps {
  audioFile: File
  setAnalyzedSong: (song: { title: string; subtitle: string; meta: object }) => void
}

export function AudioAnalyzer({ audioFile, setAnalyzedSong }: AudioAnalyzerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeAudio = async () => {
    setIsAnalyzing(true)
    const formData = new FormData()
    formData.append('upload_file', audioFile)

    try {
      const response = await axios.post('https://shazam-api6.p.rapidapi.com/shazam/recognize/', formData, {
        headers: {
          'x-rapidapi-host': 'shazam-api6.p.rapidapi.com',
          'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
        },
      })

      const result = response.data
      if (result.matches && result.matches.length > 0) {
        // const match = result.matches[0]
        const track = result.track
        setAnalyzedSong({ title: track.title, subtitle: track.subtitle, meta: track })
        toast.success('Song analyzed successfully!')
      } else {
        toast.error('Could not identify the song.')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error analyzing audio:', error.response?.data || error.message)
        toast.error(error.response?.data?.message || 'Error analyzing audio. Please try again.')
      } else {
        console.error('Unexpected error:', error)
        toast.error('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <button
      onClick={analyzeAudio}
      disabled={isAnalyzing}
      className="w-full bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors disabled:bg-primary-300"
    >
      {isAnalyzing ? (
        <>
          <Loader2 className="inline-block mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        'Analyze Audio'
      )}
    </button>
  )
}
export default AudioAnalyzer;