import { useState } from 'react'
import { MusicIcon, Menu, X } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-primary-700 text-white p-4 shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <a href="/" className="flex items-center space-x-2 text-2xl font-bold">
            <MusicIcon className="w-8 h-8" />
            <span>Spotify Music Finder</span>
          </a>

          <nav className="hidden md:flex space-x-4">
            <a href="#home" className="cursor-pointer hover:text-primary-200 transition-colors">Home</a>
            <a href="#how-it-works" className="cursor-pointer hover:text-primary-200 transition-colors">How It Works</a>
            <a href="#why-use" className="cursor-pointer hover:text-primary-200 transition-colors">Why use it?</a>
            <a href="#footer" className="cursor-pointer hover:text-primary-200 transition-colors">Contact</a>
          </nav>

          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            <a onClick={() => setIsMenuOpen(false)} href="#home" className="block py-2 cursor-pointer hover:text-primary-200 transition-colors">Home</a>
            <a onClick={() => setIsMenuOpen(false)} href="#how-it-works" className="block py-2 cursor-pointer hover:text-primary-200 transition-colors">How It Works</a>
            <a onClick={() => setIsMenuOpen(false)} href="#why-use" className="block py-2 cursor-pointer hover:text-primary-200 transition-colors">Why use it?</a>
            <a onClick={() => setIsMenuOpen(false)} href="#footer" className="block py-2 cursor-pointer hover:text-primary-200 transition-colors">Contact</a>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
