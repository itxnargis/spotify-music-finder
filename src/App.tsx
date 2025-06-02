"use client"

import { useState, useEffect } from "react"
import { Toaster } from "react-hot-toast"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { HelpCircle, Upload, Search, PlayCircle, TrendingUp, BarChart3, Share2 } from 'lucide-react'
import ScanStats from "./components/ScanStats"
import FileShareHandler from "./components/FileShareHandler"
import TrendingTracks from "./components/TrendingTracks"
import { useAnalytics } from "./hooks/useAnalytics"
import HomePage from "./components/HomePage"
import FeaturesSection from "./components/Features"

export default function App() {
  const [scanStats, setScanStats] = useState({ total: 0, successful: 0, failed: 0 })
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { trackPageView, trackEvent } = useAnalytics()

  useEffect(() => {
    setMounted(true)
    trackPageView("Home")
    const storedStats = localStorage.getItem("scanStats")
    if (storedStats) {
      setScanStats(JSON.parse(storedStats))
    }
  }, [])

  // Mouse tracking for subtle animations
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
        <div className="relative">
          <div className="w-16 h-16 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-green-400/40 rounded-full animate-spin animation-delay-150"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <HomePage onScanComplete={handleScanComplete} />

      {/* Main Content */}
      <main className="flex-grow bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute w-96 h-96 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-full blur-3xl"
            style={{
              left: `${60 + mousePosition.x * 0.01}%`,
              top: `${70 + mousePosition.y * 0.01}%`,
            }}
          />
          <div 
            className="absolute w-80 h-80 bg-gradient-to-br from-green-500/5 to-teal-500/5 rounded-full blur-3xl"
            style={{
              left: `${10 + mousePosition.x * -0.005}%`,
              top: `${40 + mousePosition.y * -0.005}%`,
            }}
          />
        </div>

        <div className="relative container mx-auto px-6 py-20 space-y-32">
          
          {/* Trending Section */}
          <section className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10 mb-6">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium text-gray-300">What's Hot</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Trending Now
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Discover what's popular on Spotify right now
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <TrendingTracks />
            </div>
          </section>

          {/* Stats & Share Section */}
          <section className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10 mb-6">
                <BarChart3 className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium text-gray-300">Your Activity</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Track Your Progress
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                View your scan statistics and share your audio files with ease
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Scan Statistics</h3>
                </div>
                <ScanStats stats={scanStats} />
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Share2 className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">Share Files</h3>
                </div>
                <FileShareHandler />
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10 mb-6">
                <HelpCircle className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-medium text-gray-300">How It Works</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Simple & Powerful
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Three simple steps to discover your music on Spotify
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
              <div className="grid md:grid-cols-3 gap-12">
                {[
                  {
                    icon: Upload,
                    title: "Upload",
                    description: "Select your audio file from your device. We support all major audio formats.",
                    color: "purple-400",
                    bgColor: "purple-500/20",
                  },
                  {
                    icon: Search,
                    title: "Analyze",
                    description: "Our AI identifies your song using advanced audio fingerprinting technology.",
                    color: "blue-400",
                    bgColor: "blue-500/20",
                  },
                  {
                    icon: PlayCircle,
                    title: "Discover",
                    description: "Find the track on Spotify and explore similar music recommendations.",
                    color: "green-400",
                    bgColor: "green-500/20",
                  },
                ].map((step, index) => (
                  <div key={index} className="text-center group">
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-${step.bgColor} border border-white/10 flex items-center justify-center group-hover:scale-110 transition-all duration-300`}>
                      <step.icon className={`w-8 h-8 text-${step.color}`} />
                    </div>
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-sm font-medium text-gray-300 mb-3">
                        Step {index + 1}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="max-w-6xl mx-auto">
            <FeaturesSection />
          </section>
        </div>
      </main>

      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "rgba(15, 23, 42, 0.95)",
            backdropFilter: "blur(20px)",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "16px",
            fontSize: "14px",
            padding: "14px 18px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
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

      {/* Custom animations */}
      <style>{`
        .animation-delay-150 {
          animation-delay: 150ms;
        }
      `}</style>
    </div>
  )
}