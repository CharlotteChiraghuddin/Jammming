
async function RedirectToAuthCodeFlow(clientId){

    //We are generating PKCE verifier and challenge data to verify that our request is authentic
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);
    //We have created a new object.
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    //This is the URL that Spotify will redirect the user back to after they've authorized the application.
    params.append("redirect_uri", "http://localhost:3000/callback");
    //These scopes allow us to access the user's profile data
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}
function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

export default RedirectToAuthCodeFlow;