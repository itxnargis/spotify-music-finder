"use client"

import { useState, useEffect } from "react"
import { Music, Menu, X, Search, Headphones, Zap, Home, Shield } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Enhanced navigation with better UX
  const navItems = [
    { href: "#home", label: "Home", icon: <Home className="w-4 h-4" />, description: "Back to homepage" },
    { href: "#how-it-works", label: "Discover", icon: <Search className="w-4 h-4" />, description: "Find new music" },
    { href: "#features", label: "Features", icon: <Headphones className="w-4 h-4" />, description: "Explore capabilities" },
    // { href: "#premium", label: "Premium", icon: <Star className="w-4 h-4" />, description: "Unlock full potential" },
    { href: "#footer", label: "Contact", icon: <Zap className="w-4 h-4" />, description: "Get in touch" },
  ]

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false)
    // Smooth scroll behavior
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      {/* SEO and Accessibility improvements */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          scrolled 
            ? 'bg-slate-900/95 backdrop-blur-3xl border-b border-white/20 shadow-2xl shadow-green-500/10' 
            : 'bg-transparent backdrop-blur-xl border-b border-white/10'
        } ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
        role="banner"
        aria-label="Main navigation"
      >
        
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/30 via-slate-900/50 to-emerald-900/30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex justify-between items-center py-4 lg:py-6">
            
            {/* Enhanced Logo with better branding */}
            <a 
              href="/" 
              className="flex items-center space-x-3 text-xl lg:text-2xl font-bold text-white group relative focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg p-2 -m-2"
              aria-label="Spotify Music Finder - Home"
              title="Go to homepage"
            >
              <div className="relative p-2 lg:p-3">
                {/* Multiple layered glows for premium feel */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 opacity-30 group-hover:opacity-60 transition-all duration-500 animate-pulse blur-sm"></div>
                <div className="absolute inset-1 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 opacity-20 group-hover:opacity-40 transition-all duration-500 blur-xs"></div>
                <div className="absolute inset-2 rounded-full bg-gradient-to-r from-green-300 to-emerald-300 opacity-10 group-hover:opacity-30 transition-all duration-500"></div>
                
                <Music className="w-6 h-6 lg:w-8 lg:h-8 text-green-400 group-hover:text-white transition-all duration-500 relative z-10 group-hover:scale-110 group-hover:rotate-12 drop-shadow-lg" />
                <Zap className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-400 absolute -top-1 -right-1 animate-bounce group-hover:text-yellow-300 group-hover:scale-125 transition-all duration-300" />
                
                {/* Enhanced floating particles */}
                <div className="absolute -inset-3 opacity-0 group-hover:opacity-100 transition-all duration-700">
                  <div className="absolute top-0 left-1/2 w-1 h-1 bg-green-400 rounded-full animate-ping delay-100 shadow-lg shadow-green-400/50"></div>
                  <div className="absolute bottom-0 right-0 w-1 h-1 bg-emerald-400 rounded-full animate-ping delay-300 shadow-lg shadow-emerald-400/50"></div>
                  <div className="absolute top-1/2 left-0 w-1 h-1 bg-green-300 rounded-full animate-ping delay-500 shadow-lg shadow-green-300/50"></div>
                  <div className="absolute top-1/4 right-1/4 w-0.5 h-0.5 bg-yellow-400 rounded-full animate-ping delay-700"></div>
                </div>
              </div>
              
              <div className="relative">
                <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent font-black tracking-tight group-hover:from-white group-hover:via-green-200 group-hover:to-emerald-200 transition-all duration-700 text-shadow">
                  <span className="hidden sm:inline">Spotify Music</span>
                  <span className="sm:hidden">Music</span>
                  <span className="block sm:inline sm:ml-2 text-lg lg:text-xl font-bold">Finder</span>
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 group-hover:w-full transition-all duration-700 rounded-full shadow-lg shadow-green-400/30"></div>
                
                {/* Subtle badge for premium feel */}
                <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                  <Shield className="w-3 h-3 text-green-400 animate-pulse" />
                </div>
              </div>
            </a>

            {/* Enhanced Desktop Navigation */}
            <nav className="hidden lg:flex space-x-2" role="navigation" aria-label="Main menu">
              {navItems.map((item, index) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="relative group px-5 py-3 rounded-2xl transition-all duration-400 hover:bg-white/10 hover:backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:bg-white/5"
                  style={{ 
                    animationDelay: `${index * 150}ms`,
                    transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)',
                    opacity: isLoaded ? 1 : 0,
                    transition: `all 0.6s ease-out ${index * 100}ms`
                  }}
                  title={item.description}
                  aria-label={`${item.label} - ${item.description}`}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/0 via-emerald-500/0 to-green-500/0 group-hover:from-green-500/20 group-hover:via-emerald-500/20 group-hover:to-green-500/20 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-green-500/20"></div>
                  
                  <div className="relative flex items-center space-x-3 text-slate-300 group-hover:text-white transition-all duration-400">
                    <span className="opacity-70 group-hover:opacity-100 transition-all duration-400 text-green-400 group-hover:text-white group-hover:scale-110 group-hover:rotate-12">
                      {item.icon}
                    </span>
                    <span className="font-semibold tracking-wide">{item.label}</span>
                  </div>
                  
                  {/* Enhanced hover effect */}
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 group-hover:w-4/5 group-hover:left-[10%] transition-all duration-500 rounded-full"></div>
                </button>
              ))}
            </nav>

            {/* Enhanced Mobile Menu Button */}
            <button
              className="lg:hidden relative p-3 text-white focus:outline-none group focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-transparent rounded-xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/30 to-emerald-500/30 opacity-0 group-hover:opacity-100 transition-all duration-400 group-hover:shadow-lg group-hover:shadow-green-500/20"></div>
              <div className="relative">
                {isMenuOpen ? (
                  <X className="w-6 h-6 transform transition-all duration-400 group-hover:rotate-90 group-hover:scale-110" />
                ) : (
                  <Menu className="w-6 h-6 transform transition-all duration-400 group-hover:rotate-180 group-hover:scale-110" />
                )}
              </div>
            </button>
          </div>

          {/* Enhanced Mobile Navigation */}
          <div 
            id="mobile-menu"
            className={`lg:hidden overflow-hidden transition-all duration-600 ease-out ${
              isMenuOpen ? 'max-h-[32rem] opacity-100 pb-6' : 'max-h-0 opacity-0'
            }`}
            aria-hidden={!isMenuOpen}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 via-slate-900/60 to-emerald-900/40 rounded-3xl backdrop-blur-2xl border border-white/20 shadow-2xl shadow-green-500/10"></div>
              
              <nav className="relative space-y-1 p-6" role="navigation" aria-label="Mobile menu">
                {navItems.map((item, index) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="w-full flex items-center justify-between py-4 px-6 text-slate-300 hover:text-white transition-all duration-400 rounded-2xl hover:bg-white/10 group focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:bg-white/5"
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      transform: isMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                      opacity: isMenuOpen ? 1 : 0,
                      transition: `all 0.5s ease-out ${index * 100}ms`
                    }}
                    aria-label={`${item.label} - ${item.description}`}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-green-400 group-hover:text-white transition-all duration-400 group-hover:scale-110 group-hover:rotate-12">
                        {item.icon}
                      </span>
                      <div className="text-left">
                        <span className="font-semibold block">{item.label}</span>
                        <span className="text-xs text-slate-400 group-hover:text-slate-300">{item.description}</span>
                      </div>
                    </div>
                    
                    <div className="w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 group-hover:w-8 transition-all duration-500 rounded-full"></div>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Enhanced bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/60 to-transparent"></div>
        <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent blur-sm"></div>
      </header>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}