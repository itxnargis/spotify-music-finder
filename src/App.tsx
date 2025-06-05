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

// SEO and performance constants
const SITE_CONFIG = {
  title: "Spotify Music Finder - AI-Powered Audio Recognition Tool",
  description: "Upload any audio file and instantly find it on Spotify. Our AI-powered music recognition technology identifies songs with 99.7% accuracy. Free, fast, and secure.",
  url: "https://your-domain.com", // Replace with your actual domain
  image: "https://your-domain.com/og-image.jpg", // Replace with your actual OG image
  siteName: "Spotify Music Finder",
  twitterHandle: "@yourhandle" // Replace with your Twitter handle
}

// JSON-LD Schema for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": SITE_CONFIG.siteName,
  "description": SITE_CONFIG.description,
  "url": SITE_CONFIG.url,
  "applicationCategory": "MusicApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "AI-powered audio recognition",
    "Spotify integration",
    "Multiple audio format support",
    "Real-time analysis",
    "Privacy-focused processing"
  ],
  "screenshot": SITE_CONFIG.image,
  "author": {
    "@type": "Organization",
    "name": SITE_CONFIG.siteName
  }
}

export default function App() {
  const [scanStats, setScanStats] = useState({ total: 0, successful: 0, failed: 0 })
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { trackPageView, trackEvent } = useAnalytics()

  useEffect(() => {
    setMounted(true)
    trackPageView("Home")
    
    // Use in-memory storage instead of localStorage for better performance
    const storedStats = sessionStorage.getItem("scanStats")
    if (storedStats) {
      try {
        setScanStats(JSON.parse(storedStats))
      } catch (error) {
        console.warn('Failed to parse stored scan stats:', error)
      }
    }
  }, [])

  // Optimized mouse tracking with throttling
  useEffect(() => {
    let rafId: number
    
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId)
      
      rafId = requestAnimationFrame(() => {
        setMousePosition({ 
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100
        })
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const handleScanComplete = (success: boolean) => {
    const newStats = {
      total: scanStats.total + 1,
      successful: success ? scanStats.successful + 1 : scanStats.successful,
      failed: !success ? scanStats.failed + 1 : scanStats.failed,
    }
    setScanStats(newStats)
    
    try {
      sessionStorage.setItem("scanStats", JSON.stringify(newStats))
    } catch (error) {
      console.warn('Failed to store scan stats:', error)
    }
    
    trackEvent(success ? "Successful Scan" : "Failed Scan")
  }

  // Loading screen with better accessibility
  if (!mounted) {
    return (
      <div 
        className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center"
        aria-label="Loading application"
        role="status"
      >
        <div className="relative" aria-hidden="true">
          <div className="w-16 h-16 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-green-400/40 rounded-full animate-spin animation-delay-150"></div>
        </div>
        <span className="sr-only">Loading Spotify Music Finder...</span>
      </div>
    )
  }

  return (
    <>
      {/* SEO Meta Tags */}
        {/* Primary Meta Tags */}
        <title>{SITE_CONFIG.title}</title>
        <meta name="description" content={SITE_CONFIG.description} />
        <meta name="keywords" content="spotify, music finder, audio recognition, song identification, AI music, spotify search, audio analysis, music discovery" />
        <meta name="author" content={SITE_CONFIG.siteName} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={SITE_CONFIG.url} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_CONFIG.url} />
        <meta property="og:title" content={SITE_CONFIG.title} />
        <meta property="og:description" content={SITE_CONFIG.description} />
        <meta property="og:image" content={SITE_CONFIG.image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content={SITE_CONFIG.siteName} />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={SITE_CONFIG.url} />
        <meta name="twitter:title" content={SITE_CONFIG.title} />
        <meta name="twitter:description" content={SITE_CONFIG.description} />
        <meta name="twitter:image" content={SITE_CONFIG.image} />
        <meta name="twitter:site" content={SITE_CONFIG.twitterHandle} />
        <meta name="twitter:creator" content={SITE_CONFIG.twitterHandle} />
        
        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#10b981" />
        <meta name="msapplication-TileColor" content="#10b981" />
        <meta name="application-name" content={SITE_CONFIG.siteName} />
        <meta name="apple-mobile-web-app-title" content={SITE_CONFIG.siteName} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        {/* Performance Hints */}
        <link rel="preconnect" href="https://api.spotify.com" />
        <link rel="preconnect" href="https://open.spotify.com" />
        <link rel="dns-prefetch" href="https://api.spotify.com" />
        <link rel="dns-prefetch" href="https://open.spotify.com" />

      <div className="flex flex-col min-h-screen">
        <Header />

        {/* Hero Section with better semantic HTML */}
        <HomePage onScanComplete={handleScanComplete} />

        {/* Main Content with improved accessibility */}
        <main 
          className="flex-grow bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden"
          role="main"
          aria-label="Main content"
        >
          {/* Optimized background elements */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div 
              className="absolute w-96 h-96 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-full blur-3xl will-change-transform"
              style={{
                left: `${60 + mousePosition.x * 0.01}%`,
                top: `${70 + mousePosition.y * 0.01}%`,
                transform: 'translate3d(0, 0, 0)' // Force GPU acceleration
              }}
            />
            <div 
              className="absolute w-80 h-80 bg-gradient-to-br from-green-500/5 to-teal-500/5 rounded-full blur-3xl will-change-transform"
              style={{
                left: `${10 + mousePosition.x * -0.005}%`,
                top: `${40 + mousePosition.y * -0.005}%`,
                transform: 'translate3d(0, 0, 0)' // Force GPU acceleration
              }}
            />
          </div>

          <div className="relative container mx-auto px-6 py-20 space-y-32">
            
            {/* Trending Section with better semantics */}
            <section 
              className="max-w-6xl mx-auto"
              aria-labelledby="trending-heading"
            >
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10 mb-6">
                  <TrendingUp className="w-5 h-5 text-green-400" aria-hidden="true" />
                  <span className="text-sm font-medium text-gray-300">What's Hot</span>
                </div>
                <h2 id="trending-heading" className="text-4xl md:text-5xl font-bold text-white mb-6">
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

            {/* Stats & Share Section with improved accessibility */}
            <section 
              className="max-w-6xl mx-auto"
              aria-labelledby="activity-heading"
            >
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10 mb-6">
                  <BarChart3 className="w-5 h-5 text-purple-400" aria-hidden="true" />
                  <span className="text-sm font-medium text-gray-300">Your Activity</span>
                </div>
                <h2 id="activity-heading" className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Track Your Progress
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  View your scan statistics and share your audio files with ease
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <article className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center" aria-hidden="true">
                      <BarChart3 className="w-5 h-5 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Scan Statistics</h3>
                  </div>
                  <ScanStats stats={scanStats} />
                </article>
                
                <article className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center" aria-hidden="true">
                      <Share2 className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Share Files</h3>
                  </div>
                  <FileShareHandler />
                </article>
              </div>
            </section>

            {/* How It Works Section with better semantics */}
            <section 
              id="how-it-works" 
              className="max-w-6xl mx-auto"
              aria-labelledby="how-it-works-heading"
            >
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10 mb-6">
                  <HelpCircle className="w-5 h-5 text-blue-400" aria-hidden="true" />
                  <span className="text-sm font-medium text-gray-300">How It Works</span>
                </div>
                <h2 id="how-it-works-heading" className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Simple & Powerful
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Three simple steps to discover your music on Spotify
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
                <div className="grid md:grid-cols-3 gap-12" role="list">
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
                    <div key={index} className="text-center group" role="listitem">
                      <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-${step.bgColor} border border-white/10 flex items-center justify-center group-hover:scale-110 transition-all duration-300`} aria-hidden="true">
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
            <section 
              id="features" 
              className="max-w-6xl mx-auto"
              aria-labelledby="features-heading"
            >
              <FeaturesSection />
            </section>
          </div>
        </main>

        {/* Optimized Toaster */}
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
            duration: 4000,
            ariaProps: {
              role: 'status',
              'aria-live': 'polite',
            },
          }}
        />

        <Footer id="footer" />

        {/* Optimized animations with better performance */}
        <style>{`
          .animation-delay-150 {
            animation-delay: 150ms;
          }
          
          /* Performance optimizations */
          .will-change-transform {
            will-change: transform;
          }
          
          /* Reduce motion for accessibility */
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}</style>
      </div>
    </>
  )
}