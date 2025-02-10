import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Row, Card, Col} from 'react-bootstrap';
import {useState,useEffect} from 'react'; 

const CLIENT_ID = "6961fe134cd64321ab2de3c427d3160d";
const CLIENT_SECRET = "abeabc05a98245e684ff5bb8f9e81ebe";
function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums]= useState([]);
  const [tracks, setTracks]= useState({});
  const [playlist, setPlaylist] = useState([]);
  const [spotifyID, setSpotifyID] = useState([]);
  function changeBackground(e){
    e.target.style.backgroundColor = 'grey';
    
  }
  function mouseLeaveHandler(e){
    e.target.style.backgroundColor = '#212529';
  }
  
  useEffect(() => {
    //API Acess Token
    var authParameters = {
      method:'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token',authParameters).then(result => result.json()).then(data=> setAccessToken(data.access_token))
  }, [])

  //Search
  async function search() {
    console.log("Search for " + searchInput);
    //GET request using search to get the Artist ID
    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters).then(response=> response.json()).then(data=>{return data.artists.items[0].id});
    console.log("Artist id is" + artistID);
    //GET request with Artist ID grab all the albums from that artist
    var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/'+ artistID + '/albums' + '?include_groups=album&market=US&limit=50',searchParameters)
    .then(response=>response.json())
    .then(data=>{
      setAlbums(data.items)


  })
  //GET spotify ID
  var spotifyID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=track', searchParameters).then(response=> response.json()).then(data=>{
    console.log(data.tracks.items.length);
    var trackIds=[];
    for(let i = data.tracks.items.length-1; i >= 0 ; i--){
      trackIds.push(data.tracks.items[i].id);
    }
    return trackIds;
  });
  console.log('This is the spotify ID' + spotifyID);
  setSpotifyID(spotifyID);
  
  // Function to fetch track details and update state 
  async function fetchTrackDetails(id) { 
    const trackData = await fetch(`https://api.spotify.com/v1/tracks/${id}`, searchParameters) 
    .then(response => response.json()); 
    setTracks(prevTracks => ({ ...prevTracks, [id]: trackData
     // Use track ID as the key 
     })); } 
     spotifyID.forEach(fetchTrackDetails); }

  
  useEffect(()=>{
    console.log(tracks);
  },[tracks]); //logs tracks whenever it updates
  
  function AddToPlaylist(item = { spotifyID:''}){
    if (!item || !item.spotifyID) {
      console.error("Item or spotifyID is undefined");
      return(console.log(spotifyID))
  }
}
  return (
    <div className="App">
      <Container>
        <InputGroup className="mb-3" size="lg">
        <FormControl style = {{marginTop:'2rem',border:'2px solid black'}}
        placeholder="Search For Artist"
        type="input"
        onKeyDown={event => {
          if(event.key === "Enter"){
            search();
          }
        }}
        onChange={event => setSearchInput(event.target.value)}/>
        <Button style={{padding:'1rem', marginTop:'2rem',border:'2px solid black'}} onClick={search}>Search</Button>
        </InputGroup>
      </Container>
      <Container fluid>
        <Row className="g-3">
          {Object.keys(tracks).length > 0 ? 
          ( Object.values(tracks).map((track, i) => (
            <Col  className="mb-3" key={i} xs={12} sm={6} md={3} style={{display:'flex', justifyContent:'center'}}>
              <Card className="custom-card-width"  key={i} bg={'dark'} > 
                <Card.Img src={track.album.images[0].url} alt="Album Cover" /> 
                <Card.Body> 
                  <Card.Title style={{color:'white', font:'manrope'}}>{track.name}</Card.Title> 
                </Card.Body> 
                <Button className="addPlaylistButton" title="Add to Playlist" variant='light'onMouseOver={changeBackground} onMouseLeave={mouseLeaveHandler} onClick={AddToPlaylist}>+</Button>
              </Card> 
            </Col> )) ) : 
          ( <p></p> )}
        </Row>

      </Container>

    </div>
  )
  }
  

  //Function to add the track to a playlist


export default App;
