import axios from "axios";

// Ensure environment variables are accessed correctly
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

const getToken = async () => {
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');

  const encodedCredentials = btoa(`${clientId}:${clientSecret}`);
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${encodedCredentials}`,
    'Cache-Control': 'no-cache'
  };

  try {
    const response = await axios.post(tokenUrl, params, { headers });
    console.log('Token Response:', response.data);
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting token:', error.response);
    if (error.response) {
      console.error('Response Data:', error.response.data);
      console.error('Response Status:', error.response.status);
      console.error('Response Headers:', error.response.headers);
    }
    throw error;
  }
};

export const getTopTracks = async (artistId, market = 'US') => {
  try {
    const accessToken = await getToken();
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=${market}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Cache-Control': 'no-cache'
        }
      }
    );
    console.log('Top Tracks Response:', response.data);
    return response.data.tracks;
  } catch (error) {
    console.error('Error getting top tracks:', error.response);
    throw error;
  }
};
