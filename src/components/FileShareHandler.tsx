"use client"

import { useState } from "react"
import { Share2, Twitter, Facebook, Link, Copy, MessageCircle, Send } from 'lucide-react'

export default function FileShareHandler() {
  const [copiedLink, setCopiedLink] = useState(false)

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareText = "🎵 Discover your music with this AI-powered Spotify Music Finder! Upload any audio file and find it on Spotify instantly. ✨"

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Spotify Music Finder",
          text: shareText,
          url: shareUrl,
        })
      } catch (error) {
        handleCopyLink()
      }
    } else {
      handleCopyLink()
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    } catch (error) {
      console.error("Failed to copy")
    }
  }

  const handleSocialShare = (platform: 'twitter' | 'facebook' | 'whatsapp') => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`
    }
    window.open(urls[platform], "_blank")
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Share2 className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white">Share Music Finder</h3>
        <p className="text-gray-400">Help others discover their perfect soundtrack</p>
      </div>

      {/* Main Share Button */}
      <button
        onClick={handleNativeShare}
        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
      >
        <Send className="w-5 h-5" />
        Share Now
      </button>

      {/* Social Buttons */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { name: "Twitter", icon: Twitter, action: () => handleSocialShare('twitter') },
          { name: "Facebook", icon: Facebook, action: () => handleSocialShare('facebook') },
          { name: "WhatsApp", icon: MessageCircle, action: () => handleSocialShare('whatsapp') },
          { 
            name: copiedLink ? "Copied!" : "Copy Link", 
            icon: copiedLink ? Link : Copy, 
            action: handleCopyLink 
          }
        ].map((button, index) => (
          <button
            key={index}
            onClick={button.action}
            className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 border border-white/20"
          >
            <button.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{button.name}</span>
          </button>
        ))}
      </div>

      {/* Simple Footer */}
      <div className="text-center pt-4 border-t border-white/10">
        <p className="text-sm text-gray-400">AI-powered music recognition • Free tool</p>
      </div>
    </div>
  )
}