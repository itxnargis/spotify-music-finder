import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { CloudUploadIcon } from 'lucide-react'
import toast from 'react-hot-toast'

interface AudioUploaderProps {
  setAudioFile: (file: File) => void
}

export function AudioUploader({ setAudioFile }: AudioUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      if (file.type.startsWith('audio/')) {
        setAudioFile(file)
        toast.success('Audio file uploaded successfully!')
      } else {
        toast.error('Please upload a valid audio file.')
      }
    }
  }, [setAudioFile])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'audio/*': ['.mp3', '.wav'] },
    multiple: false,
  })

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-500'
      }`}
    >
      <input {...getInputProps()} />
      <CloudUploadIcon className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-white">
        {isDragActive
          ? 'Drop the audio file here'
          : 'Drag and drop an audio file, or click to select'}
      </p>
    </div>
  )
}

export default AudioUploader;
