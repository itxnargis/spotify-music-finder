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
      <main className="flex-grow container mx-auto px-4 sm:px-6 md:px-8">
        <section id="home" className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mt-4 sm:mt-8">
          <div className="p-4 sm:p-6 md:p-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-center flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6 text-primary-900 dark:text-primary-400">
              <MusicIcon className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-0 sm:mr-3" />
              <span>Spotify Music Finder</span>
            </h1>
            <p className="text-center text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-6 sm:mb-8">
              Have a song saved on your device and wondering if it's available on Spotify? With Spotify Music Finder, you can upload your audio file, analyze it, and discover its Spotify match effortlessly.
            </p>
            <div className="space-y-6 sm:space-y-8">
              <AudioUploader setAudioFile={setAudioFile} />
              {audioFile && (
                <AudioAnalyzer audioFile={audioFile} setAnalyzedSong={setAnalyzedSong} />
              )}
              {analyzedSong && <SpotifyPlayer songName={analyzedSong} />}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mt-4 sm:mt-8">
          <div className="p-4 sm:p-6 md:p-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-primary-900 dark:text-primary-400 flex items-center justify-center sm:justify-start">
              <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3" />
              How It Works
            </h2>
            <ol className="list-none space-y-3 sm:space-y-4 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <Upload className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 mt-1 flex-shrink-0 text-primary-500" />
                <span className="text-sm sm:text-base"><strong className="text-primary-900 dark:text-primary-400">Upload Your Audio File:</strong> Drag and drop your file or click the upload button to select an audio file from your device.</span>
              </li>
              <li className="flex items-start">
                <Search className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 mt-1 flex-shrink-0 text-primary-500" />
                <span className="text-sm sm:text-base"><strong className="text-primary-900 dark:text-primary-400">Analyze with One Click:</strong> Hit the "Analyze Audio" button, and let our advanced algorithm identify the song.</span>
              </li>
              <li className="flex items-start">
                <PlayCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 mt-1 flex-shrink-0 text-primary-500" />
                <span className="text-sm sm:text-base"><strong className="text-primary-900 dark:text-primary-400">Discover Matches:</strong> Instantly view the matching songs and explore more details.</span>
              </li>
            </ol>
          </div>
        </section>

        <section id="why-use" className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mt-4 sm:mt-8">
          <div className="p-4 sm:p-6 md:p-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-primary-900 dark:text-primary-400 text-center sm:text-left">Why Use Spotify Music Finder?</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-gray-700 dark:text-gray-300">
              <li className="flex items-center justify-center sm:justify-start">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span className="text-sm sm:text-base text-center sm:text-left">Instantly identify songs from your audio files</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span className="text-sm sm:text-base text-center sm:text-left">Discover detailed information about tracks</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span className="text-sm sm:text-base text-center sm:text-left">Find similar songs and expand your music library</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span className="text-sm sm:text-base text-center sm:text-left">Easy-to-use interface for quick results</span>
              </li>
              <li className="flex items-center justify-center sm:justify-start">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <span className="text-sm sm:text-base text-center sm:text-left">Explore artist information and related tracks</span>
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