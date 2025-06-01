"use client"

import { useState, useEffect } from "react"
import { Toaster } from "react-hot-toast"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { HelpCircle, Upload, Search, PlayCircle, TrendingUp } from 'lucide-react'
import ScanStats from "./components/ScanStats"
import FileShareHandler from "./components/FileShareHandler"
import TrendingTracks from "./components/TrendingTracks"
import MusicHeroSection from "./components/Home"
import { useAnalytics } from "./hooks/useAnalytics"

export default function App() {
  const [scanStats, setScanStats] = useState({ total: 0, successful: 0, failed: 0 })
  const [mounted, setMounted] = useState(false)
  const { trackPageView, trackEvent } = useAnalytics()

  useEffect(() => {
    setMounted(true)
    trackPageView("Home")
    const storedStats = localStorage.getItem("scanStats")
    if (storedStats) {
      setScanStats(JSON.parse(storedStats))
    }
  }, [])

  const handleScanComplete = (success: boolean) => {
    const newStats = {
      total: scanStats.total + 1,
      successful: success ? scanStats.successful + 1 : scanStats.successful,
      failed: !success ? scanStats.failed + 1 : scanStats.failed,
    }
    setScanStats(newStats)
    localStorage.setItem("scanStats", JSON.stringify(newStats))
    trackEvent(success ? "Successful Scan" : "Failed Scan")
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section with complete upload/analyze/play functionality */}
      <MusicHeroSection onScanComplete={handleScanComplete} />

      <main className="flex-grow bg-gradient-to-br from-slate-900 via-gray-900 to-black">
        <div className="container mx-auto px-6 py-20 space-y-20">
          
          {/* Trending Section */}
          <section className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <TrendingUp className="w-8 h-8 text-green-400" />
                <h2 className="text-3xl font-bold text-white">Trending Now</h2>
              </div>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">Discover what's popular on Spotify right now</p>
            </div>
            <TrendingTracks />
          </section>

          {/* Stats & Share Grid */}
          <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <ScanStats stats={scanStats} />
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <FileShareHandler />
            </div>
          </section>

          {/* How It Works */}
          <section id="how-it-works" className="max-w-5xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <HelpCircle className="w-8 h-8 text-blue-400" />
                  <h2 className="text-3xl font-bold text-white">How It Works</h2>
                </div>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  Three simple steps to discover your music on Spotify
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Upload,
                    title: "Upload",
                    description: "Select your audio file from your device",
                    color: "purple-400",
                  },
                  {
                    icon: Search,
                    title: "Analyze",
                    description: "AI identifies your song using audio fingerprinting",
                    color: "blue-400",
                  },
                  {
                    icon: PlayCircle,
                    title: "Discover",
                    description: "Find the track on Spotify and explore more",
                    color: "green-400",
                  },
                ].map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                      <step.icon className={`w-8 h-8 text-${step.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="max-w-6xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">Why Choose Our Platform?</h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  Advanced features designed for music discovery
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: "🎵", title: "Instant Recognition", desc: "99% accuracy with advanced AI technology" },
                  { icon: "🔥", title: "Trending Tracks", desc: "Real-time updates on what's hot on Spotify" },
                  { icon: "🎨", title: "Audio Visualization", desc: "Stunning real-time music visualizations" },
                  { icon: "🎯", title: "Smart Discovery", desc: "AI-powered music recommendations" },
                  { icon: "📊", title: "Track Statistics", desc: "Monitor your music discovery journey" },
                  { icon: "🚀", title: "Lightning Fast", desc: "Instant results with seamless experience" },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                  >
                    <div className="text-2xl mb-4">{feature.icon}</div>
                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "rgba(15, 23, 42, 0.9)",
            backdropFilter: "blur(16px)",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
            fontSize: "14px",
            padding: "12px 16px",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "white",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "white",
            },
          },
        }}
      />

      <Footer id="footer" />
    </div>
  )
}
