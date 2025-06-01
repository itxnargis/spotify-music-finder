"use client"

import { useState, useEffect } from "react"
import { Music, Menu, X, Search, Headphones, Zap } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: "#home", label: "Home", icon: <Music className="w-4 h-4" /> },
    { href: "#how-it-works", label: "How It Works", icon: <Search className="w-4 h-4" /> },
    { href: "#why-use", label: "Features", icon: <Headphones className="w-4 h-4" /> },
    { href: "#footer", label: "Contact", icon: <Zap className="w-4 h-4" /> },
  ]

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-slate-900/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-green-500/5' 
          : 'bg-transparent backdrop-blur-sm border-b border-white/5'
      }`}>
        
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 via-slate-900/40 to-green-900/20"></div>
        
        <div className="relative container mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            
            {/* Logo */}
            <a href="/" className="flex items-center space-x-4 text-2xl font-bold text-white group relative">
              <div className="relative p-3">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-green-600 opacity-20 group-hover:opacity-40 transition-opacity duration-300 animate-pulse"></div>
                <div className="absolute inset-1 rounded-full bg-gradient-to-r from-green-600 to-green-500 opacity-10 group-hover:opacity-30 transition-opacity duration-300"></div>
                
                <Music className="w-8 h-8 text-green-400 group-hover:text-white transition-all duration-300 relative z-10 group-hover:scale-110 group-hover:rotate-12" />
                <Zap className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-bounce group-hover:text-yellow-300" />
                
                <div className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 left-1/2 w-1 h-1 bg-green-400 rounded-full animate-ping delay-100"></div>
                  <div className="absolute bottom-0 right-0 w-1 h-1 bg-green-400 rounded-full animate-ping delay-300"></div>
                  <div className="absolute top-1/2 left-0 w-1 h-1 bg-green-400 rounded-full animate-ping delay-500"></div>
                </div>
              </div>
              
              <div className="relative">
                <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent font-extrabold tracking-tight group-hover:from-white group-hover:to-green-200 transition-all duration-500">
                  Spotify Music Finder
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-green-600 group-hover:w-full transition-all duration-500 rounded-full"></div>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative group px-6 py-3 rounded-full transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/0 to-green-600/0 group-hover:from-green-500/20 group-hover:to-green-600/20 transition-all duration-300"></div>
                  
                  <div className="relative flex items-center space-x-2 text-slate-300 group-hover:text-white transition-colors duration-300">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-green-400">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-green-400 to-green-600 group-hover:w-3/4 group-hover:left-1/8 transition-all duration-300 rounded-full"></div>
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative p-3 text-white focus:outline-none group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/20 to-green-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                {isMenuOpen ? (
                  <X className="w-6 h-6 transform rotate-0 group-hover:rotate-90 transition-transform duration-300" />
                ) : (
                  <Menu className="w-6 h-6 transform rotate-0 group-hover:rotate-180 transition-transform duration-300" />
                )}
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isMenuOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
          }`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-slate-900/40 to-green-900/20 rounded-2xl backdrop-blur-xl border border-white/10"></div>
              
              <nav className="relative space-y-2 p-4">
                {navItems.map((item, index) => (
                  <a
                    key={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    href={item.href}
                    className="flex items-center space-x-3 py-4 px-6 text-slate-300 hover:text-white transition-all duration-300 rounded-xl hover:bg-white/10 group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="text-green-400 group-hover:text-white transition-colors duration-300">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.label}</span>
                    
                    <div className="ml-auto w-0 h-0.5 bg-gradient-to-r from-green-400 to-green-600 group-hover:w-6 transition-all duration-300 rounded-full"></div>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent"></div>
      </header>
    </>
  )
}
