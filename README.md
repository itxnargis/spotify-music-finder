# Spotify Music Finder

Spotify Music Finder is a web application that allows you to upload an audio file, analyze it, and find its corresponding match on Spotify. It connects your local audio files with Spotify's vast music library, helping you discover tracks you might be looking for or explore new ones.

## Features

- Upload an audio file (e.g., MP3, WAV).
- Analyze the audio file to identify the song.
- View detailed information about the song and its artist.
- Discover similar songs and play them directly from Spotify.
- A simple and intuitive user interface.

## How It Works

1. **Upload Your Audio File**: Drag and drop or click to upload an audio file from your device.
2. **Analyze Audio**: After uploading, click "Analyze Audio" to process the file.
3. **Discover Matches**: Instantly view the matching song(s) and explore additional details like the artist and track information.

## Technologies Used

- **React**: The UI is built with React.js, utilizing hooks for state management and functional components.
- **Axios**: Used for making HTTP requests to external APIs for song recognition and Spotify search.
- **Shazam API**: Used to recognize audio and retrieve song information.
- **Spotify API**: Used to search for matching songs on Spotify and display them in an embedded player.
- **Tailwind CSS**: For responsive, utility-first styling.
- **Lucide Icons**: For various icons like upload, search, and music.

## Getting Started

### Prerequisites

- Node.js (>=14)
- NPM (>=6)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/spotify-music-finder.git
    ```

2. Navigate to the project directory:
    ```bash
    cd spotify-music-finder
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Set up environment variables:
    - Create a `.env` file in the root of your project.
    - Add the following environment variables (you will need to sign up for the Shazam API and Spotify API to get the keys):
      ```bash
      VITE_RAPID_API_KEY=your_rapid_api_key_for_shazam
      VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
      VITE_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
      ```

5. Run the development server:
    ```bash
    npm start
    ```

6. Open your browser and navigate to [http://localhost:5173](http://localhost:5173).

## Usage

1. On the homepage, you can upload an audio file using the **Upload Audio File** button or drag and drop the file into the provided area.
2. Once the file is uploaded, click **Analyze Audio** to process it.
3. The song information and an embedded Spotify player will be displayed if a match is found.
4. You can interact with the Spotify player to listen to the identified song directly on Spotify.

## Components

### `Header`
Displays the navigation bar with links to different sections of the page.

### `AudioUploader`
Allows the user to upload an audio file by dragging and dropping or by selecting it via a file input.

### `AudioAnalyzer`
Processes the uploaded audio file and sends it to the Shazam API to identify the song. Displays the song details and gives feedback to the user.

### `SpotifyPlayer`
Displays a Spotify-embedded player for the identified song.

### `Footer`
Shows contact information, links to social media profiles, and a brief description of the application.

## Contributing

If you'd like to contribute to this project, you can just fix the repository and submit a pull request. Contributions are welcome!

### Steps to contribute:
1. Fork the repo.
2. Clone your forked repo locally.
3. Make your changes.
4. Commit and push your changes.
5. Create a pull request to the main repository.

## Contact

- Created by [Nargis](https://github.com/itxnargis)
- Email: [Mail](mailto:itxnargiskhatun@gmail.com)
- Website: [Live demo](https://spotify-music-finder-eight.vercel.app/)
