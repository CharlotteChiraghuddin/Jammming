import React, { useState, useEffect } from "react";
import { getTopTracks } from "../spotifyService"; // Correct import

const TopTracks = ({ artistId, market }) => { // Destructure props

  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topTracks = await getTopTracks(artistId, market);
        setTracks(topTracks);
      } catch (error) {
        console.error("Error fetching top tracks", error);
      }
    };

    if (artistId) {
      fetchData();
    }
  }, [artistId, market]);

  return (
    <div>
      <h1>Top Tracks</h1>
      <ul>
        {tracks.map((track) => (
          <li key={track.id}>{track.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopTracks;
