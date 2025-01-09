import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'public',
      filename: 'sw.js',
      registerType: 'autoUpdate',
      injectManifest: {
        injectionPoint: undefined
      },
      workbox: {
        globPatterns: ['**/*.{js,ts,css,html,ico,png,svg,json}']
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Spotify Music Finder',
        short_name: 'Music Finder',
        description: 'Identify songs saved on your device by matching them to Spotify\'s vast music library.',
        theme_color: '#1DB954',
        icons: [
          {
            src: '/icons/spotify-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/spotify-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff'
      }
    })
  ]
})

