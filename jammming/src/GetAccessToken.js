//In this function, we load the verifier from local storage and using both
//the code returned from the callback and the verifier to perform a POST
//to the Spotify token API.The API uses these two values to verify out request and it returns an access token
/*async function GetAccessToken(clientId, code, CLIENT_SECRET) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:3000/callback");
    params.append("code_verifier", verifier);
    params.append("client_secret", CLIENT_SECRET);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { 
            'Content-Type': "application/x-www-form-urlencoded",
         },
        body: params
    });

    const response = await result.json();
    const accessToken = response.access_token;
    console.log(accessToken);
    return accessToken;
}

export default GetAccessToken;*/
async function GetAccessToken(code){
    const codeVerifier = localStorage.getItem('verifier');
    console.log(codeVerifier);
    console.log(`This is the authorization code:` + code);
const payload = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: '6961fe134cd64321ab2de3c427d3160d',
        redirect_uri: 'http://localhost:3000/callback',
        code_verifier: codeVerifier,
        code: code, 
    }),
}

const response = await fetch('https://accounts.spotify.com/api/token', payload);
console.log(response);
const data = await response.json();
console.log(data);
const accessToken = data.access_token;
console.log(accessToken);
};
export default GetAccessToken;

