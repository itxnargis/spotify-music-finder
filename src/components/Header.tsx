import { MusicIcon } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-purple-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-center items-center">
        <MusicIcon className="w-6 h-6 mr-2" />
        <h1 className="text-2xl font-bold">Audio Analyzer</h1>
      </div>
    </header>
  )
}

export default Header;