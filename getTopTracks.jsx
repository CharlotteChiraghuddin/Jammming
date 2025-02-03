import getToken from './spotifyService';

const getTopTracks = async (artistId) => {
  const accessToken = await getToken();

  const response = await axios.get(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data.tracks;
};

export default getTopTracks;
