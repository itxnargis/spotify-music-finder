import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Footer from './components/Footer'
import { MusicIcon, HelpCircle, Upload, Search, PlayCircle } from 'lucide-react'
import AudioUploader from './components/AudioUploader'
import AudioAnalyzer from './components/AudioAnalyzer'
import SpotifyPlayer from './components/SpotifyPlayer'

interface AnalyzedSong {
  title: string
  subtitle: string
  meta: object
}

function App() {
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [analyzedSong, setAnalyzedSong] = useState<AnalyzedSong | null>(null)

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto">
        <section id="home" className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mt-8">
          <div className="p-6 md:p-8">
            <h1 className="text-4xl font-bold text-center flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
              <MusicIcon className="w-10 h-10 mr-3" />
              Spotify Music Finder
            </h1>
            <p className="text-center text-lg text-gray-700 dark:text-gray-300 mb-8">
              Have a song saved on your device and wondering if it’s available on Spotify? With Spotify Music Finder, you can upload your audio file, analyze it, and discover its Spotify match effortlessly.
            </p>
            <div className="space-y-8">
              <AudioUploader setAudioFile={setAudioFile} />
              {audioFile && (
                <AudioAnalyzer audioFile={audioFile} setAnalyzedSong={setAnalyzedSong} />
              )}
              {analyzedSong && <SpotifyPlayer songName={analyzedSong} />}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mt-8">
          <div className="p-6 md:p-8">
            <h2 className="text-3xl font-semibold mb-6 text-purple-600 dark:text-purple-400 flex items-center">
              <HelpCircle className="w-8 h-8 mr-3" />
              How It Works
            </h2>
            <ol className="list-none space-y-4 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <Upload className="w-6 h-6 mr-3 mt-1 flex-shrink-0 text-purple-500" />
                <span><strong className="text-purple-600 dark:text-purple-400">Upload Your Audio File:</strong> Drag and drop your file or click the upload button to select an audio file from your device.</span>
              </li>
              <li className="flex items-start">
                <Search className="w-6 h-6 mr-3 mt-1 flex-shrink-0 text-purple-500" />
                <span><strong className="text-purple-600 dark:text-purple-400">Analyze with One Click:</strong> Hit the "Analyze Audio" button, and let our advanced algorithm identify the song.</span>
              </li>
              <li className="flex items-start">
                <PlayCircle className="w-6 h-6 mr-3 mt-1 flex-shrink-0 text-purple-500" />
                <span><strong className="text-purple-600 dark:text-purple-400">Discover Matches:</strong> Instantly view the matching songs and explore more details.</span>
              </li>
            </ol>
          </div>
        </section>

        <section id="why-use" className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mt-8">
          <div className="p-6 md:p-8">
            <h2 className="text-3xl font-semibold mb-6 text-purple-600 dark:text-purple-400">Why Use Audio Analyzer?</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Instantly identify songs from your audio files
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Discover detailed information about tracks
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Find similar songs and expand your music library
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Easy-to-use interface for quick results
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Explore artist information and related tracks
              </li>
            </ul>
          </div>
        </section>
      </main>

      <Toaster position="bottom-center" />

      <Footer id="footer" />
    </div>
  )
}

export default App
