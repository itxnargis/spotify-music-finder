"use client"

import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { Loader2, Zap, Music, Brain, AudioWaveformIcon as Waveform } from 'lucide-react'

interface AudioAnalyzerProps {
  audioFile: File
  setAnalyzedSong: (song: { title: string; subtitle: string; meta: object }) => void
  onScanComplete: (success: boolean) => void
}

export default function AudioAnalyzer({ audioFile, setAnalyzedSong, onScanComplete }: AudioAnalyzerProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("")

  const analyzeAudio = async () => {
    setIsAnalyzing(true)
    setProgress(0)
    setCurrentStep("Preparing audio...")

    // Enhanced progress simulation with steps
    const steps = [
      { progress: 20, step: "Processing audio fingerprint..." },
      { progress: 40, step: "Analyzing frequency patterns..." },
      { progress: 60, step: "Matching with database..." },
      { progress: 80, step: "Identifying track..." },
      { progress: 95, step: "Finalizing results..." }
    ]

    let stepIndex = 0
    const progressInterval = setInterval(() => {
      if (stepIndex < steps.length) {
        setProgress(steps[stepIndex].progress)
        setCurrentStep(steps[stepIndex].step)
        stepIndex++
      } else {
        clearInterval(progressInterval)
      }
    }, 800)

    const formData = new FormData()
    formData.append("upload_file", audioFile)

    try {
      const response = await axios.post("https://shazam-api6.p.rapidapi.com/shazam/recognize/", formData, {
        headers: {
          "x-rapidapi-host": "shazam-api6.p.rapidapi.com",
          "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
        },
      })

      clearInterval(progressInterval)
      setProgress(100)
      setCurrentStep("Complete!")

      const result = response.data
      if (result.matches && result.matches.length > 0) {
        const track = result.track
        setAnalyzedSong({ title: track.title, subtitle: track.subtitle, meta: track })
        toast.success("🎵 Song identified successfully!")
        onScanComplete(true)
      } else {
        toast.error("Could not identify the song. Try a clearer audio file.")
        onScanComplete(false)
      }
    } catch (error) {
      clearInterval(progressInterval)
      if (axios.isAxiosError(error)) {
        console.error("Error analyzing audio:", error.response?.data || error.message)
        toast.error(error.response?.data?.message || "Analysis failed. Please try again.")
      } else {
        console.error("Unexpected error:", error)
        toast.error("An unexpected error occurred. Please try again.")
      }
      onScanComplete(false)
    } finally {
      setIsAnalyzing(false)
      setProgress(0)
      setCurrentStep("")
    }
  }

  return (
    <div className="space-y-6">
      <button
        onClick={analyzeAudio}
        disabled={isAnalyzing}
        className="group relative w-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-700 hover:via-pink-700 hover:to-cyan-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-4 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed overflow-hidden"
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shimmer"></div>
        
        <div className="relative flex items-center space-x-4">
          {isAnalyzing ? (
            <>
              <div className="relative">
                <Loader2 className="w-8 h-8 animate-spin" />
                <div className="absolute inset-0 w-8 h-8 border-2 border-white/20 rounded-full animate-pulse"></div>
              </div>
              <span className="text-xl">Analyzing Audio...</span>
            </>
          ) : (
            <>
              <div className="relative">
                <Zap className="w-8 h-8 group-hover:animate-bounce" />
                <Brain className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-pulse" />
              </div>
              <span className="text-xl">Analyze with AI</span>
            </>
          )}
        </div>
      </button>

      {isAnalyzing && (
        <div className="relative animate-in slide-in-from-bottom-4 duration-500">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-50 animate-pulse"></div>
          <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/30">
            <div className="flex items-center mb-6">
              <div className="relative mr-4">
                <Music className="w-8 h-8 text-purple-400 animate-pulse" />
                <Waveform className="absolute -top-1 -right-1 w-4 h-4 text-cyan-400 animate-bounce" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">AI Analysis in Progress</h3>
                <p className="text-purple-300 text-sm font-medium">{currentStep}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{progress}%</div>
                <div className="text-xs text-slate-400">Complete</div>
              </div>
            </div>
            
            {/* Enhanced progress bar */}
            <div className="relative w-full bg-slate-700 rounded-full h-3 mb-4 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 animate-pulse"></div>
              <div
                className="relative bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-shimmer"></div>
              </div>
            </div>
            
            {/* Processing indicators */}
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Processing audio fingerprint</span>
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200"></div>
              </span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  )
}
