"use client"

import { Github, Twitter, Linkedin, Mail, Heart, ExternalLink, Music } from 'lucide-react'

interface FooterProps {
  id?: string
}

export default function Footer({ id }: FooterProps) {
  return (
    <footer id={id} className="relative bg-slate-900/50 backdrop-blur-xl border-t border-white/10 mt-20">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-slate-900/20 to-pink-900/10"></div>
      
      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Music className="w-8 h-8 text-purple-400" />
                <div className="absolute inset-0 bg-purple-400/20 rounded-full blur animate-pulse"></div>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Spotify Music Finder
              </h3>
            </div>
            <p className="text-slate-300 leading-relaxed max-w-md">
              Discover your music universe with AI-powered recognition technology. Upload any audio file and instantly find it on Spotify, explore trending tracks, and discover new artists.
            </p>
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <Heart className="w-4 h-4 text-red-400" />
              <span>Made with passion for music lovers worldwide</span>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-purple-400" />
              Get In Touch
            </h3>
            <div className="space-y-4">
              <a
                href="mailto:itxnargiskhatun@gmail.com"
                className="flex items-center text-slate-300 hover:text-white transition-colors duration-200 group"
              >
                <Mail className="w-4 h-4 mr-3 text-purple-400 group-hover:text-purple-300" />
                itxnargiskhatun@gmail.com
              </a>
              <a
                href="https://itxnargis.github.io/personal-portfolio/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-slate-300 hover:text-white transition-colors duration-200 group"
              >
                <ExternalLink className="w-4 h-4 mr-3 text-purple-400 group-hover:text-purple-300" />
                View Portfolio
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Github, href: "https://github.com/itxnargis", label: "GitHub", color: "hover:bg-slate-700" },
                { icon: Twitter, href: "https://x.com/81283nargis?s=09", label: "Twitter", color: "hover:bg-blue-600" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/nargis-khatun-4008ab2a9/", label: "LinkedIn", color: "hover:bg-blue-700" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative p-3 rounded-xl bg-white/5 ${social.color} border border-white/10 hover:border-white/20 transition-all duration-200 transform hover:scale-110`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors duration-200" />
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-200"></div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center text-slate-400">
              <span>Developed with</span>
              <Heart className="w-4 h-4 mx-2 text-red-400 animate-pulse" />
              <span>by</span>
              <a 
                href="https://itxnargis.github.io/personal-portfolio/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-1 text-purple-400 hover:text-purple-300 transition-colors duration-200 font-medium"
              >
                Nargis
              </a>
            </div>
            <p className="text-slate-500 text-sm">
              &copy; 2024 Spotify Music Finder. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
