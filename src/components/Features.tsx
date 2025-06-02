import { Zap, TrendingUp, Eye, Target, BarChart3, Rocket } from 'lucide-react'

const FeaturesSection = () => {
  const features = [
    { 
      icon: Zap, 
      title: "Instant Recognition", 
      desc: "Advanced AI technology delivers 99% accuracy in seconds",
      color: "text-yellow-400"
    },
    { 
      icon: TrendingUp, 
      title: "Trending Tracks", 
      desc: "Real-time updates on what's hot and popular on Spotify",
      color: "text-red-400"
    },
    { 
      icon: Eye, 
      title: "Audio Visualization", 
      desc: "Stunning real-time music visualizations and waveforms",
      color: "text-blue-400"
    },
    { 
      icon: Target, 
      title: "Smart Discovery", 
      desc: "AI-powered recommendations tailored to your taste",
      color: "text-green-400"
    },
    { 
      icon: BarChart3, 
      title: "Track Statistics", 
      desc: "Monitor and analyze your music discovery journey",
      color: "text-purple-400"
    },
    { 
      icon: Rocket, 
      title: "Lightning Fast", 
      desc: "Instant results with seamless, optimized performance",
      color: "text-indigo-400"
    }
  ]

  return (
    <section id="why-use" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            <span className="text-white">Why Choose Our</span>
            <br />
            <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
              Platform?
            </span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Advanced features designed for seamless music discovery and recognition
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/8 group"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                
                {/* Text */}
                <h3 className="text-lg font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 pt-12 border-t border-white/10">
          <p className="text-gray-400 text-lg mb-6">
            Ready to discover your music on Spotify?
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105"
          >
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
