async function FetchProfile(token) {
    console.log(token);
    try {
        const response = await fetch("https://api.spotify.com/v1/me", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.log('Failed to get token:', error);
    }

    return null;
}

export default FetchProfile;
