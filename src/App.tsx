import React, { useState } from 'react';
import AudioUploader from './components/AudioUploader';
import AudioAnalyzer from './components/AudioAnalyzer';
import SpotifyPlayer from './components/SpotifyPlayer';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import { MusicIcon } from 'lucide-react'

interface AnalyzedSong {
  title: string
  subtitle: string
  meta: object
}

export default function App() {
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [analyzedSong, setAnalyzedSong] = useState<AnalyzedSong | null>(null)

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-center flex items-center justify-center mb-4">
              <MusicIcon className="w-6 h-6 mr-2" />
              Audio Analyzer
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
              Upload an audio file to analyze and find matching songs on Spotify
            </p>
            <div className="space-y-6">
              <AudioUploader setAudioFile={setAudioFile} />
              {audioFile && (
                <AudioAnalyzer audioFile={audioFile} setAnalyzedSong={setAnalyzedSong} />
              )}
              {analyzedSong && <SpotifyPlayer songName={analyzedSong} />}
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">How it works?</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400">
              <li>Upload an MP3 file using the file input or drag-and-drop area.</li>
              <li>Click the "Analyze Audio" button and wait for the analysis to complete.</li>
              <li>View the results and listen to the matched song on Spotify.</li>
            </ol>
          </div>
        </div>
      </main>
      <Toaster position="bottom-center" />
    </div>
  )
}