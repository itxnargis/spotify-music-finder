"use client"

import { useCallback, useState, useEffect, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import { 
  Music, 
  Upload,
  Search,
  CheckCircle,
  Clock,
} from 'lucide-react'
import toast from 'react-hot-toast'

interface AudioUploaderProps {
  setAudioFile: (file: File) => void
  audioFile?: File | null
  isAnalyzing?: boolean
  analyzedSong?: any
}

export default function AudioUploader({ 
  setAudioFile, 
  audioFile, 
  isAnalyzing = false, 
  analyzedSong 
}: AudioUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Mouse tracking for interactive background effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      if (file.type.startsWith('audio/')) {
        setAudioFile(file)
        toast.success(`🎵 ${file.name} uploaded successfully!`)
      } else {
        toast.error('Please upload a valid audio file (MP3, WAV, etc.)')
      }
    }
  }, [setAudioFile])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'audio/*': ['.mp3', '.wav', '.m4a', '.flac', '.ogg'] },
    multiple: false,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  })
  
  // const triggerFileSelect = () => {
  //   fileInputRef.current?.click()
  // }

  const getCurrentStatus = () => {
    if (isAnalyzing) return { text: "Analyzing your track...", color: "text-blue-500", icon: Clock }
    if (analyzedSong) return { text: "Found on Spotify!", color: "text-green-500", icon: CheckCircle }
    if (audioFile) return { text: "Ready to analyze", color: "text-purple-500", icon: Search }
    return { text: "Upload your audio file", color: "text-gray-400", icon: Upload }
  }

  const status = getCurrentStatus()
  const StatusIcon = status.icon

  return (
    <section className="relative">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file && file.type.startsWith('audio/')) {
            setAudioFile(file)
            toast.success(`🎵 ${file.name} uploaded successfully!`)
          } else if (file) {
            toast.error('Please upload a valid audio file (MP3, WAV, etc.)')
          }
        }}
        className="hidden"
      />

      {/* Animated background elements */}
        {/* Gradient orbs that follow mouse */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-full blur-3xl transition-all duration-1000"
          style={{
            left: `${20 + mousePosition.x * 0.01}%`,
            top: `${15 + mousePosition.y * 0.01}%`,
            transform: `scale(${1 + Math.sin(Date.now() * 0.001) * 0.1})`
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-br from-purple-500/8 to-blue-500/5 rounded-full blur-3xl transition-all duration-1000"
          style={{
            right: `${10 + mousePosition.x * -0.008}%`,
            bottom: `${25 + mousePosition.y * -0.008}%`,
          }}
        />

      {/* Floating music notes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-10"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 2) * 40}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${10 + Math.random() * 5}s`,
            }}
          >
            <Music className="w-4 h-4 text-green-400" />
          </div>
        ))}
      </div>

      {/* Main Content */}

          {/* Upload Section */}
          <div className="mb-16" {...getRootProps()}>
            <input {...getInputProps()} />
            
            <div className="relative inline-block group">
              {/* Glow effect */}
              <div className={`absolute -inset-4 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-full blur-sm transition-opacity duration-300 ${
                isDragActive || dragActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`} />

              {/* Main upload button */}
              <button
                type="button"
                className={`relative w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border-2 ${
                  isDragActive 
                    ? 'bg-gradient-to-r from-green-600 to-green-700 border-green-400/50 scale-110' 
                    : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border-green-400/30 hover:scale-105'
                }`}
              >
                {isAnalyzing ? (
                  <div className="w-8 h-8 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                ) : analyzedSong ? (
                  <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-white" />
                ) : audioFile ? (
                  <Search className="w-8 h-8 md:w-10 md:h-10 text-white" />
                ) : (
                  <Upload className="w-8 h-8 md:w-10 md:h-10 text-white" />
                )}
              </button>

              {/* Audio visualization */}
              {(audioFile || isAnalyzing) && (
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-green-500 rounded-full animate-bounce"
                      style={{
                        width: '3px',
                        height: `${8 + Math.random() * 12}px`,
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: `${1 + Math.random() * 0.5}s`
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Status display */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center justify-center gap-2">
                <StatusIcon className={`w-5 h-5 ${status.color}`} />
                <span className={`text-lg font-medium ${status.color}`}>
                  {status.text}
                </span>
              </div>

              {audioFile && (
                <div className="text-sm text-gray-400 truncate max-w-sm mx-auto">
                  {audioFile.name}
                </div>
              )}
            </div>
          </div>

          {/* Supported formats */}
          <div className="mb-16">
            <div className="flex flex-wrap justify-center gap-3">
              {['MP3', 'WAV', 'M4A', 'FLAC', 'OGG'].map((format) => (
                <span
                  key={format}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isDragActive 
                      ? 'bg-green-500/20 text-green-300 border border-green-400/30' 
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:border-green-400/30 hover:text-green-300'
                  }`}
                >
                  {format}
                </span>
              ))}
            </div>
          </div>

      {/* Custom animations */}
      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.1;
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
            opacity: 0.3;
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}