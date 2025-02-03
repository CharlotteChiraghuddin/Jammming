import dotenv from 'dotenv';

dotenv.config();

console.log('Test Client ID:', process.env.REACT_APP_SPOTIFY_CLIENT_ID);
console.log('Test Client Secret:', process.env.REACT_APP_SPOTIFY_CLIENT_SECRET);
