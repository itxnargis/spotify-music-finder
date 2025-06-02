import { useState, useEffect } from 'react'
import { Github, Twitter, Linkedin, Mail, Heart, ExternalLink, Music, Headphones, Speaker } from 'lucide-react'

interface FooterProps {
  id?: string
}

export default function Footer({ id }: FooterProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Subtle mouse tracking for interactive effects
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

  const socialLinks = [
    { 
      icon: Github, 
      href: "https://github.com/itxnargis", 
      label: "GitHub", 
      color: "hover:bg-gray-600/20",
      iconColor: "text-gray-400 group-hover:text-white"
    },
    { 
      icon: Twitter, 
      href: "https://x.com/81283nargis?s=09", 
      label: "Twitter", 
      color: "hover:bg-blue-500/20",
      iconColor: "text-blue-400 group-hover:text-blue-300"
    },
    { 
      icon: Linkedin, 
      href: "https://www.linkedin.com/in/nargis-khatun-4008ab2a9/", 
      label: "LinkedIn", 
      color: "hover:bg-blue-600/20",
      iconColor: "text-blue-500 group-hover:text-blue-400"
    },
    { 
      icon: Mail, 
      href: "mailto:itxnargiskhatun@gmail.com", 
      label: "Email", 
      color: "hover:bg-green-500/20",
      iconColor: "text-green-400 group-hover:text-green-300"
    }
  ]

  return (
    <footer id={id} className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-br from-purple-500/8 to-pink-600/4 rounded-full blur-3xl"
          style={{
            left: `${5 + mousePosition.x * 0.006}%`,
            top: `${10 + mousePosition.y * 0.006}%`,
            transform: `scale(${1 + Math.sin(Date.now() * 0.0006) * 0.1})`
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-br from-green-500/6 to-blue-500/4 rounded-full blur-3xl"
          style={{
            right: `${10 + mousePosition.x * -0.004}%`,
            bottom: `${15 + mousePosition.y * -0.004}%`,
          }}
        />
      </div>

      {/* Floating music elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-5"
            style={{
              left: `${10 + i * 20}%`,
              top: `${20 + (i % 2) * 30}%`,
              animationDelay: `${i * 2.5}s`,
              animationDuration: `${15 + Math.random() * 8}s`,
            }}
          >
            {i % 3 === 0 ? (
              <Music className="w-4 h-4 text-white/10" />
            ) : i % 3 === 1 ? (
              <Headphones className="w-4 h-4 text-white/10" />
            ) : (
              <Speaker className="w-4 h-4 text-white/10" />
            )}
          </div>
        ))}
      </div>

      {/* Border top with gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      <div className="relative container mx-auto px-6 py-20">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          
          {/* Brand Section */}
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-green-400/20 rounded-xl blur animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-3xl font-bold">
                  <span className="text-white">Spotify</span>
                  <br />
                  <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
                    Music Finder
                  </span>
                </h3>
              </div>
            </div>
            
            <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
              Discover your music universe with AI-powered recognition technology. Upload any audio file and instantly find it on Spotify.
            </p>
            
            <div className="flex items-center space-x-3 text-gray-400">
              <Heart className="w-5 h-5 text-red-400 animate-pulse" />
              <span className="text-lg">Made with passion for music lovers worldwide</span>
            </div>
          </div>

          {/* Contact & Social Section */}
          <div className="space-y-10">
            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-white mb-6">Get In Touch</h4>
              <div className="space-y-4">
                <a
                  href="mailto:itxnargiskhatun@gmail.com"
                  className="flex items-center text-gray-300 hover:text-white transition-all duration-300 text-lg group hover:translate-x-2"
                >
                  <Mail className="w-5 h-5 mr-4 text-green-400 group-hover:text-green-300 transition-colors duration-300" />
                  itxnargiskhatun@gmail.com
                </a>
                <a
                  href="https://nargis-khatun.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-white transition-all duration-300 text-lg group hover:translate-x-2"
                >
                  <ExternalLink className="w-5 h-5 mr-4 text-green-400 group-hover:text-green-300 transition-colors duration-300" />
                  View Portfolio
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-6">
              <h4 className="text-2xl font-bold text-white">Connect With Me</h4>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative p-4 rounded-2xl bg-white/5 backdrop-blur-sm ${social.color} border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-110 hover:bg-white/10`}
                    aria-label={social.label}
                  >
                    <social.icon className={`w-6 h-6 ${social.iconColor} transition-colors duration-300`} />
                    
                    {/* Hover glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-600/0 via-green-400/20 to-green-600/0 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      {social.label}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <div className="flex items-center text-gray-400 text-lg">
              <span>Developed with</span>
              <Heart className="w-5 h-5 mx-3 text-red-400 animate-pulse" />
              <span>by</span>
              <a 
                href="https://nargis-khatun.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-2 text-green-400 hover:text-green-300 transition-colors duration-300 font-semibold hover:underline"
              >
                Nargis
              </a>
            </div>
            <p className="text-gray-500 text-lg">
              &copy; 2024 Spotify Music Finder. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.05;
          }
          50% { 
            transform: translateY(-25px) rotate(180deg); 
            opacity: 0.1;
          }
        }
        
        .animate-float {
          animation: float 12s ease-in-out infinite;
        }
      `}</style>
    </footer>
  )
}