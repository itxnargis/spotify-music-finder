"use client"

import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX, Activity } from 'lucide-react'

interface AudioVisualizerProps {
  audioFile: File
  isPlaying: boolean
}

export default function AudioVisualizer({ audioFile, isPlaying }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<AudioBufferSourceNode | null>(null)
  const animationRef = useRef<number | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)

  useEffect(() => {
    const initializeAudio = async () => {
      if (!audioFile || !canvasRef.current) return

      try {
        const arrayBuffer = await audioFile.arrayBuffer()
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

        const analyser = audioContext.createAnalyser()
        analyser.fftSize = 512
        analyser.smoothingTimeConstant = 0.85

        audioContextRef.current = audioContext
        analyserRef.current = analyser
        setIsInitialized(true)

        startVisualization()
      } catch (error) {
        console.error("Error initializing audio:", error)
      }
    }

    initializeAudio()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [audioFile])

  const startVisualization = () => {
    if (!canvasRef.current || !analyserRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const analyser = analyserRef.current
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const draw = () => {
      if (!ctx || !analyser) return

      analyser.getByteFrequencyData(dataArray)

      // Calculate average audio level
      const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength
      setAudioLevel(average)

      // Clear canvas with fade effect
      ctx.fillStyle = "rgba(15, 23, 42, 0.15)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const barWidth = (canvas.width / bufferLength) * 2.5
      let x = 0

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height * 0.9
        
        // Create dynamic gradient based on frequency - using green theme
        const hue = 120 + (i / bufferLength) * 40 // Green hues
        const saturation = 70 + (dataArray[i] / 255) * 30
        const lightness = 50 + (dataArray[i] / 255) * 30
        
        const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height)
        gradient.addColorStop(0, `hsla(${hue}, ${saturation}%, ${lightness}%, 0.9)`)
        gradient.addColorStop(0.5, `hsla(${hue}, ${saturation}%, ${lightness - 10}%, 0.7)`)
        gradient.addColorStop(1, `hsla(${hue}, ${saturation}%, ${lightness - 20}%, 0.5)`)

        ctx.fillStyle = gradient
        
        // Draw main bar
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight)

        // Add glow effect for higher frequencies
        if (dataArray[i] > 100) {
          ctx.shadowColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`
          ctx.shadowBlur = 15
          ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight)
          ctx.shadowBlur = 0
        }

        // Add reflection effect
        const reflectionGradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height + barHeight * 0.3)
        reflectionGradient.addColorStop(0, `hsla(${hue}, ${saturation}%, ${lightness}%, 0.3)`)
        reflectionGradient.addColorStop(1, `hsla(${hue}, ${saturation}%, ${lightness}%, 0)`)
        
        ctx.fillStyle = reflectionGradient
        ctx.fillRect(x, canvas.height, barWidth - 1, barHeight * 0.3)

        x += barWidth + 1
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()
  }

  // Generate static visualization when not playing
  useEffect(() => {
    if (!isInitialized || isPlaying) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    // Create animated static waveform
    const animate = () => {
      ctx.fillStyle = "rgba(15, 23, 42, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const barWidth = canvas.width / 128
      const time = Date.now() * 0.001

      for (let i = 0; i < 128; i++) {
        const barHeight = (Math.sin(i * 0.1 + time) * 0.5 + 0.5) * canvas.height * 0.6 + 20
        const hue = 120 + (i / 128) * 40 // Green hues
        
        const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height)
        gradient.addColorStop(0, `hsla(${hue}, 60%, 50%, 0.6)`)
        gradient.addColorStop(1, `hsla(${hue}, 60%, 30%, 0.3)`)

        ctx.fillStyle = gradient
        ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth - 1, barHeight)
      }

      if (!isPlaying) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [isInitialized, isPlaying])

  return (
    <div className="relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl blur opacity-30 animate-pulse"></div>
      <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className={`w-4 h-4 rounded-full transition-all duration-300 ${
                isPlaying ? 'bg-green-400 animate-pulse' : 'bg-slate-500'
              }`}></div>
              {isPlaying && (
                <div className="absolute inset-0 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
              )}
            </div>
            <h3 className="text-xl font-bold text-white">Audio Visualization</h3>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {audioLevel > 50 ? (
                <Volume2 className="w-5 h-5 text-green-400" />
              ) : (
                <VolumeX className="w-5 h-5 text-slate-400" />
              )}
              <div className="w-16 bg-slate-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-150"
                  style={{ width: `${(audioLevel / 255) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <Activity className={`w-5 h-5 transition-colors duration-300 ${
              isPlaying ? 'text-green-400 animate-pulse' : 'text-slate-400'
            }`} />
          </div>
        </div>
        
        <div className="relative rounded-xl overflow-hidden bg-slate-900/50 border border-slate-700/50">
          <canvas 
            ref={canvasRef} 
            width={800} 
            height={200} 
            className="w-full h-40 block"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-slate-900/20 pointer-events-none"></div>
        </div>
        
        <div className="flex justify-between items-center mt-4 text-sm">
          <p className={`transition-colors duration-300 ${
            isPlaying ? 'text-green-300' : 'text-slate-400'
          }`}>
            {isPlaying ? "🎵 Playing audio..." : "🎧 Ready to analyze"}
          </p>
          
          <div className="flex items-center space-x-2 text-slate-500">
            <span>Frequency Analysis</span>
            <div className="flex space-x-1">
              <div className="w-1 h-3 bg-green-400 rounded animate-pulse"></div>
              <div className="w-1 h-4 bg-green-500 rounded animate-pulse delay-100"></div>
              <div className="w-1 h-2 bg-green-600 rounded animate-pulse delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
