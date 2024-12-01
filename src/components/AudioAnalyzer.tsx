import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface AudioAnalyzerProps {
  audioFile: File;
  setAnalyzedSong: (song: { title: string; artist: string }) => void;
}

const AudioAnalyzer: React.FC<AudioAnalyzerProps> = ({ audioFile, setAnalyzedSong }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeAudio = async () => {
    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append('upload_file', audioFile);

    try {
      const response = await axios.post('https://shazam-api6.p.rapidapi.com/shazam/recognize/', formData, {
        headers: {
          'x-rapidapi-host': 'shazam-api6.p.rapidapi.com',
          'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
        },
      });

      const result = response.data;
      if (result.matches && result.matches.length > 0) {
        const match = result.matches[0];
        setAnalyzedSong({ title: match.title, artist: match.artist });
        toast.success('Song analyzed successfully!');
      } else {
        toast.error('Could not identify the song.');
      }
    } catch (error) {
      setIsAnalyzing(false);
      if (axios.isAxiosError(error)) {
        console.error('Error analyzing audio:', error.response?.data || error.message);
        toast.error(error.response?.data?.message || 'Error analyzing audio. Please try again.');
      } else {
        console.error('Unexpected error:', error);
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={analyzeAudio}
        disabled={isAnalyzing}
        className="w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-purple-300"
      >
        {isAnalyzing ? 'Analyzing...' : 'Analyze Audio'}
      </button>
    </div>
  );
};

export default AudioAnalyzer;
