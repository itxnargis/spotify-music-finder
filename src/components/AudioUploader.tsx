"use client"

import { useCallback, useState, useEffect, useRef } from "react"
import { useDropzone } from "react-dropzone"
import { Music, Upload, Search, CheckCircle, Clock, FileAudio } from "lucide-react"
import toast from "react-hot-toast"

interface AudioUploaderProps {
  setAudioFile: (file: File) => void
  audioFile?: File | null
  isAnalyzing?: boolean
  analyzedSong?: any
  onFileUpload?: (file: File) => void // New prop for auto-trigger
}

export default function AudioUploader({
  setAudioFile,
  audioFile,
  isAnalyzing = false,
  analyzedSong,
  onFileUpload,
}: AudioUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Mouse tracking for interactive background effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleFileUpload = (file: File) => {
    if (file.type.startsWith("audio/")) {
      setAudioFile(file)
      toast.success(`🎵 ${file.name} uploaded successfully!`)
      // Auto-trigger analysis
      if (onFileUpload) {
        onFileUpload(file)
      }
    } else {
      toast.error("Please upload a valid audio file (MP3, WAV, etc.)")
    }
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        handleFileUpload(acceptedFiles[0])
      }
    },
    [setAudioFile, onFileUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "audio/*": [".mp3", ".wav", ".m4a", ".flac", ".ogg"] },
    multiple: false,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  })

  const getCurrentStatus = () => {
    if (isAnalyzing) return { text: "Analyzing your track...", color: "text-blue-500", icon: Clock }
    if (analyzedSong) return { text: "✅ Song Found! Check results below", color: "text-green-500", icon: CheckCircle }
    if (audioFile) return { text: "Analysis starting...", color: "text-purple-500", icon: Search }
    return { text: "Upload your audio file", color: "text-gray-100", icon: Upload }
  }

  const status = getCurrentStatus()
  const StatusIcon = status.icon

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <section className="relative">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            handleFileUpload(file)
          }
        }}
        className="hidden"
      />

      {/* Only show animated background and upload UI if no song has been analyzed */}
      {!analyzedSong && (
        <>
          {/* Animated background elements */}
          <div
            className="absolute w-96 h-96 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-full blur-3xl transition-all duration-1000"
            style={{
              left: `${20 + mousePosition.x * 0.01}%`,
              top: `${15 + mousePosition.y * 0.01}%`,
              transform: `scale(${1 + Math.sin(Date.now() * 0.001) * 0.1})`,
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

          {/* Upload Section */}
          <div className="mb-16" {...getRootProps()}>
            <input {...getInputProps()} />

            <div className="relative inline-block group">
              {/* Glow effect */}
              <div
                className={`absolute -inset-4 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-full blur-sm transition-opacity duration-300 ${
                  isDragActive || dragActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              />

              {/* Main upload button */}
              <button
                type="button"
                className={`relative w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border-2 ${
                  isDragActive
                    ? "bg-gradient-to-r from-green-600 to-green-700 border-green-400/50 scale-110"
                    : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border-green-400/30 hover:scale-105"
                }`}
              >
                {isAnalyzing ? (
                  <div className="w-8 h-8 border-3 border-white/30 border-t-white rounded-full animate-spin" />
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
                        width: "3px",
                        height: `${8 + Math.random() * 12}px`,
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: `${1 + Math.random() * 0.5}s`,
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
                <span className={`text-lg font-medium ${status.color}`}>{status.text}</span>
              </div>
            </div>
          </div>

          {/* Enhanced File Display - only show during upload/analysis */}
          {audioFile && !analyzedSong && (
            <div className="mb-8 animate-in slide-in-from-bottom-4 duration-500">
              <div className="relative max-w-md mx-auto">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl blur opacity-50 animate-pulse"></div>
                <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-green-500/30">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                        <FileAudio className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-lg mb-1 truncate">Uploaded Track</h3>
                      <p className="text-green-300 font-medium mb-2 truncate" title={audioFile.name}>
                        {audioFile.name}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>{formatFileSize(audioFile.size)}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>{audioFile.type.split("/")[1].toUpperCase()}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress indicator for analysis */}
                  {isAnalyzing && (
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <div className="flex items-center space-x-2 text-sm text-blue-300">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <span>AI is analyzing your track...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Supported formats - only show when no song found */}
          <div className="mb-16">
            <div className="flex flex-wrap justify-center gap-3">
              {["MP3", "WAV", "M4A", "FLAC", "OGG"].map((format) => (
                <span
                  key={format}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isDragActive
                      ? "bg-green-500/20 text-green-300 border border-green-400/30"
                      : "bg-white/5 text-gray-400 border border-white/10 hover:border-green-400/30 hover:text-green-300"
                  }`}
                >
                  {format}
                </span>
              ))}
            </div>
          </div>
        </>
      )}

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
