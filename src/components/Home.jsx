"use client"

import React, { useState, useEffect } from 'react'
import { Music, Upload, Search, PlayCircle, Volume2, Headphones, CheckCircle, Clock } from 'lucide-react'
import AudioUploader from "./AudioUploader"
import AudioAnalyzer from "./AudioAnalyzer"
import SpotifyPlayer from "./SpotifyPlayer"


const MusicHeroSection = ({ onScanComplete }) => {
  const [audioFile, setAudioFile] = useState(null)
  const [analyzedSong, setAnalyzedSong] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Subtle mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const getCurrentStatus = () => {
    if (analyzedSong) return { text: "Found on Spotify!", color: "text-green-500", icon: CheckCircle }
    if (audioFile) return { text: "Ready to analyze", color: "text-purple-500", icon: Search }
    return { text: "Upload your audio file", color: "text-gray-400", icon: Upload }
  }

  const status = getCurrentStatus()
  const StatusIcon = status.icon

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden py-10">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-full blur-3xl"
          style={{
            left: `${20 + mousePosition.x * 0.01}%`,
            top: `${15 + mousePosition.y * 0.01}%`,
            transform: `scale(${1 + Math.sin(Date.now() * 0.001) * 0.1})`
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
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Have a song saved on your device and wondering if it's available on Spotify? 
              Upload your audio file, analyze it, and discover its Spotify match effortlessly.
            </p>
          </div>

          {/* EXACT WORKING FUNCTIONALITY FROM ORIGINAL APP.JSX */}
              <div className="space-y-6 sm:space-y-8">
                <AudioUploader setAudioFile={setAudioFile} />
                
                {/* AudioAnalyzer - Shows when file is uploaded, EXACT same as original */}
                {audioFile && (
                  <AudioAnalyzer 
                    audioFile={audioFile} 
                    setAnalyzedSong={setAnalyzedSong} 
                    onScanComplete={onScanComplete} 
                  />
                )}
                
                {/* SpotifyPlayer - Shows when song is analyzed, EXACT same as original */}
                {analyzedSong && <SpotifyPlayer songName={analyzedSong} />}
              </div>
           
          </div>

          {/* Status display */}
          {/* <div className="mb-8 space-y-3">
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
          </div> */}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button 
              onClick={() => document.querySelector('input[type="file"]')?.click()}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <Volume2 className="w-5 h-5" />
              Upload Audio File
            </button>
            
            <button 
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 border border-white/20 flex items-center justify-center gap-2"
            >
              <Headphones className="w-5 h-5" />
              How It Works
            </button>
          </div>

          {/* How it works steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            {[
              { 
                icon: Upload, 
                title: "1. Upload", 
                desc: "Select your audio file from your device",
                color: "text-blue-400"
              },
              { 
                icon: Search, 
                title: "2. Analyze", 
                desc: "Our AI analyzes your audio and identifies the track",
                color: "text-purple-400"
              },
              { 
                icon: PlayCircle, 
                title: "3. Discover", 
                desc: "Get the Spotify link if the song is available",
                color: "text-green-400"
              }
            ].map((step, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <step.icon className={`w-6 h-6 ${step.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Simple trust indicator */}
          <div className="pt-8 border-t border-white/10">
            <p className="text-gray-400 text-sm">
              Powered by advanced audio recognition technology
            </p>
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

export default MusicHeroSection
