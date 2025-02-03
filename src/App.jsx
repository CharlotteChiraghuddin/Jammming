import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { Button, Container, Form, FormControl, InputGroup } from 'react-bootstrap';

const CLIENT_ID = "";
const CLIENT_SECRET = "";


function App() {  
  const [accessToken, setaccessToken] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect( () => {
  var authParameters = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
  }

  fetch('https://accounts.spotify.com/api/token', authParameters)
  .then(results => results.json())
  .then(data => setaccessToken(data.access_token))
  }, [])



async function search() {
  console.log("Access Token"+ accessToken);

  //First Get the Artist ID

  var searchParameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':'Bearer ' + accessToken
    }

  }
  var artistId = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
  .then(response => response.json())
  .then(data => {return data.artist.items[0].id})

  console.log("Artist Id = " + artistId);

  //Next we can get the Albumns of that artist
  var albums = await fetch('https://api.spotify.com/v1/artists/'+ artistId +'/albums' + 'include_groups=album&limit=20', searchParameters)
  .then(response => response.json())

}



  return (
    <div className="App">
     <Container>
<InputGroup className="mb-3" size='lg'>
  <FormControl
  placeholder="Search For Artist"
  type='input'
  onChange={event => setSearchInput(event.target.value)}></FormControl>
  <Button onClick={() => search()}>
    Search
  </Button>
</InputGroup>
     </Container>
    </div>
  );
}

export default App;
