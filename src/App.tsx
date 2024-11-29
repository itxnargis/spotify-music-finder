import React, { useState } from 'react';
import AudioUploader from './components/AudioUploader';
import AudioAnalyzer from './components/AudioAnalyzer';
import SpotifyPlayer from './components/SpotifyPlayer';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [analyzedSong, setAnalyzedSong] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Audio Analyzer</h1>
        <AudioUploader setAudioFile={setAudioFile} />
        {audioFile && (
          <AudioAnalyzer audioFile={audioFile} setAnalyzedSong={setAnalyzedSong} />
        )}
        {analyzedSong && <SpotifyPlayer songName={analyzedSong} />}
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default App;