import React, {useState,useEffect} from "react";
import RedirectToAuthCodeFlow from "./RedirectToAuthCodeFlow";
import GetAccessToken from "./GetAccessToken";
import FetchProfile from "./FetchProfile";
import PopulateUI from "./PopulateUi";
import { Container, Button } from 'react-bootstrap'

const CLIENT_SECRET = "abeabc05a98245e684ff5bb8f9e81ebe";

async function UsersProfile() {

    //To prevent the user from being stuck in a redirect loop when they authenticate, we need to chack if the callback contains
    //a code parameter
    /*async function fetchAccessToken() {
        var authParameters = {
          method: 'POST',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          },
          body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }
        const result = await fetch('https://accounts.spotify.com/api/token', authParameters);
        const data = await result.json();
        console.log('This is the access token BTW:' + data.access_token);
        return data.access_token; // Return the access token directly
      }*/

    const clientId = "6961fe134cd64321ab2de3c427d3160d"; // Replace with your client ID
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
if (!code) {
    RedirectToAuthCodeFlow(clientId);
} else {
        try{
            const accessToken = await GetAccessToken(code);
            console.log(accessToken);
            const profile = await FetchProfile(accessToken)
            //PopulateUI(profile)

        }catch(error){
            if(error.error_description === 'Authorization code expired') {
                RedirectToAuthCodeFlow(clientId);
            } else{
                console.error('Error fetching access token:',error);
            }
        }
        //const profile = await FetchProfile(accessToken);
        //PopulateUI(profile);
}
    // TODO: Redirect to Spotify authorization page
    // TODO: Get access token for code
    // TODO: Call Web API
    // TODO: Update UI with profile data
    
    return(
    <div>
        <h1>Display your Spotify profile data</h1>

        <section id="profile">
            <h2>Logged in as <span id="displayName"></span></h2>
            <span id="avatar"></span>
            <ul>
                <li>User ID: <span id="id"></span></li>
                <li>Email: <span id="email"></span></li>
                <li>Spotify URI: <a id="uri" href="#"></a></li>
                <li>Link: <a id="url" href="#"></a></li>
                <li>Profile Image: <span id="imgUrl"></span></li>
            </ul>
        </section>
    </div>
    )
}

export default UsersProfile;