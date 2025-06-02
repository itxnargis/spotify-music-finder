"use client"

import { useState, useEffect, useRef } from "react"
import { Music, Upload, Search, PlayCircle, Volume2, Headphones, CheckCircle } from "lucide-react"
import AudioUploader from "./AudioUploader"
import AudioAnalyzer from "./AudioAnalyzer"
import SpotifyPlayer from "./SpotifyPlayer"

interface HomePageProps {
  onScanComplete: (success: boolean) => void
}

const HomePage = ({ onScanComplete }: HomePageProps) => {
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [analyzedSong, setAnalyzedSong] = useState<{ title: string; subtitle: string; meta: object } | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [shouldAutoAnalyze, setShouldAutoAnalyze] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Subtle mouse tracking for interactive effects
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

  // Handle file upload and trigger auto-analysis
  const handleFileUpload = (file: File) => {
    setAudioFile(file)
    setAnalyzedSong(null) // Reset previous results
    setShouldAutoAnalyze(true)
    setIsAnalyzing(true)
  }

  // Handle analysis completion
  const handleScanComplete = (success: boolean) => {
    setIsAnalyzing(false)
    setShouldAutoAnalyze(false)
    onScanComplete(success)

    // Scroll to results if successful
    if (success && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }, 500)
    }
  }

  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden py-16 px-6 lg:px-8"
    >
      {/* Subtle animated background elements */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-full blur-3xl"
          style={{
            left: `${20 + mousePosition.x * 0.01}%`,
            top: `${15 + mousePosition.y * 0.01}%`,
            transform: `scale(${1 + Math.sin(Date.now() * 0.001) * 0.1})`,
          }}
        />
        <div
          className="absolute w-80 h-80 bg-gradient-to-br from-purple-500/8 to-blue-500/5 rounded-full blur-3xl"
          style={{
            right: `${10 + mousePosition.x * -0.008}%`,
            bottom: `${25 + mousePosition.y * -0.008}%`,
          }}
        />
      </div>

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
      <div className="text-center max-w-4xl mx-auto py-20">
        {/* Clean, professional heading */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="text-white">Spotify</span>
            <br />
            <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
              Music Finder
            </span>
          </h1>
        </div>

        {/* Clear subtitle */}
        <div className="mb-12">
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
            Have a song saved on your device and wondering if it's available on Spotify? Upload your audio file and
            we'll automatically analyze it to find its Spotify match.
          </p>
        </div>

        {/* Updated functionality with auto-analysis */}
        <div className="space-y-6 sm:space-y-8">
          <AudioUploader
            setAudioFile={setAudioFile}
            audioFile={audioFile}
            isAnalyzing={isAnalyzing}
            analyzedSong={analyzedSong}
            onFileUpload={handleFileUpload}
          />

          {/* AudioAnalyzer - Shows when file is uploaded with auto-start */}
          {audioFile && shouldAutoAnalyze && (
            <AudioAnalyzer
              audioFile={audioFile}
              setAnalyzedSong={setAnalyzedSong}
              onScanComplete={handleScanComplete}
              autoStart={true}
            />
          )}

          {/* SpotifyPlayer - Shows when song is analyzed */}
          {analyzedSong && (
            <div ref={resultsRef} className="mt-12">
              <div className="text-center mb-6">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/50 rounded-full px-6 py-3 backdrop-blur-sm">
                  <CheckCircle className="w-5 h-5 text-green-400 animate-pulse" />
                  <span className="text-green-300 font-semibold text-lg">🎉 Song Found on Spotify!</span>
                </div>
              </div>
              <SpotifyPlayer songName={analyzedSong} />
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
        <button
          onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement | null)?.click()}
          className="group relative bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-10 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          <div className="relative flex items-center justify-center gap-3">
            <Volume2 className="w-6 h-6" />
            Upload Your Music
          </div>
        </button>

        <button className="group relative bg-white/10 hover:bg-white/20 text-white px-10 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-105 border border-white/20 hover:border-white/40 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          <div className="relative flex items-center justify-center gap-3">
            <Headphones className="w-6 h-6" />
            How It Works
          </div>
        </button>
      </div>

      {/* How it works steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
        {[
          {
            icon: Upload,
            title: "Upload & Auto-Scan",
            desc: "Drop your audio file and analysis starts automatically using AI fingerprinting",
            color: "from-blue-400 to-cyan-400",
            bgColor: "from-blue-500/20 to-cyan-500/20",
            borderColor: "border-blue-400/30",
          },
          {
            icon: Search,
            title: "AI Recognition",
            desc: "Advanced algorithms instantly match your track against millions of songs",
            color: "from-purple-400 to-pink-400",
            bgColor: "from-purple-500/20 to-pink-500/20",
            borderColor: "border-purple-400/30",
          },
          {
            icon: PlayCircle,
            title: "Spotify Connect",
            desc: "Get instant access to your discovered track on Spotify's platform",
            color: "from-green-400 to-emerald-400",
            bgColor: "from-green-500/20 to-emerald-500/20",
            borderColor: "border-green-400/30",
          },
        ].map((step, index) => (
          <div
            key={index}
            className={`group relative bg-gradient-to-br ${step.bgColor} backdrop-blur-xl rounded-2xl p-8 border ${step.borderColor} hover:border-opacity-60 transition-all duration-500 hover:scale-105 cursor-pointer`}
            style={{
              animationDelay: `${index * 200}ms`,
            }}
          >
            {/* Hover glow effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${step.bgColor} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10`}
            ></div>

            <div className="flex flex-col items-center text-center">
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
              >
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-gray-300 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Simple trust indicator */}
      <div className="pt-12 border-t border-white/10 max-w-4xl mx-auto text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-medium">AI-Powered</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
              <span className="text-blue-400 font-medium">Auto-Analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
              <span className="text-purple-400 font-medium">Privacy First</span>
            </div>
          </div>
          <p className="text-gray-400 text-sm max-w-2xl">
            Powered by cutting-edge audio recognition technology with 99.7% accuracy rate
          </p>
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

export default HomePage
