import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      REACT_APP_SPOTIFY_CLIENT_ID: JSON.stringify(process.env.REACT_APP_SPOTIFY_CLIENT_ID),
      REACT_APP_SPOTIFY_CLIENT_SECRET: JSON.stringify(process.env.REACT_APP_SPOTIFY_CLIENT_SECRET)
    }
  }
});
