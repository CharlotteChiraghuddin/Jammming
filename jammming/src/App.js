import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card, Col } from 'react-bootstrap';
import UsersProfile from './UsersProfile';

const CLIENT_ID = "6961fe134cd64321ab2de3c427d3160d";
const CLIENT_SECRET = "abeabc05a98245e684ff5bb8f9e81ebe";

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [tracks, setTracks] = useState({});
  const [spotifyID, setSpotifyID] = useState([]);
  const [songIDs, setSongIDs] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  function changeBackground(e) {
    e.target.style.backgroundColor = 'grey';
  }

  function mouseLeaveHandler(e) {
    e.target.style.backgroundColor = '#212529';
  }
  function TrackList() {
    console.log('TrackList function called');
    //const trackID = spotifyID[event.target.getAttribute("data-key")];
    //console.log('I have the track ID ' + trackID);
    //setSongIDs(prevTrack => [...prevTrack, trackID]);
    console.log('I have run once');
    setShowProfile(true); // This might cause re-rendering
};

// UseEffect remains unchanged
useEffect(() => {
    UsersProfile();
}, [showProfile]);

  async function fetchAccessToken() {
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    const result = await fetch('https://accounts.spotify.com/api/token', authParameters);
    const data = await result.json();
    return data.access_token; // Return the access token directly
  }
    
  async function search() {
    const token = await fetchAccessToken(); // Fetch new access token
    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
      .then(response => response.json())
      .then(data => data.artists.items[0].id);


    var spotifyID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=track', searchParameters)
      .then(response => response.json())
      .then(data => {
        return data.tracks.items.map(item => item.id);
      });
    setSpotifyID(spotifyID);

    async function fetchTrackDetails(id) {
      const trackData = await fetch(`https://api.spotify.com/v1/tracks/${id}`, searchParameters)
        .then(response => response.json());
      setTracks(prevTracks => ({ ...prevTracks, [id]: trackData }));
    }

    spotifyID.forEach(fetchTrackDetails);
  }




  return (
    <div className="App">
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            style={{ marginTop: '2rem', border: '2px solid black' }}
            placeholder="Search For Artist"
            type="input"
            onKeyDown={event => {
              if (event.key === "Enter") {
                search();
              }
            }}
            onChange={event => setSearchInput(event.target.value)} />
          <Button
            style={{ padding: '1rem', marginTop: '2rem', border: '2px solid black' }}
            onClick={search}>
            Search
          </Button>
        </InputGroup>
      </Container>
      <Container fluid>
        <Row className="g-3">
          {Object.keys(tracks).length > 0 ?
            Object.values(tracks).map((track, i) => (
              <Col className="mb-3" key={i} xs={12} sm={6} md={3} style={{ display: 'flex', justifyContent: 'center' }}>
                <Card className="custom-card-width" key={i} bg={'dark'}>
                  <Card.Img src={track.album.images[0].url} alt="Album Cover" />
                  <Card.Body>
                    <Card.Title style={{ color: 'white', font: 'manrope' }}>{track.name}</Card.Title>
                  </Card.Body>
                  <Button
                    data-key={i}
                    className="addPlaylistButton"
                    title="Add to Playlist"
                    variant='light'
                    onMouseOver={changeBackground}
                    onMouseLeave={mouseLeaveHandler}
                    onClick={TrackList}>+
                  </Button>
                </Card>
              </Col>
            )) : <p></p>}
        </Row>
      </Container>

    </div>
  )
}

export default App;