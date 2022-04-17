//redirect auth to spotify
export function handleLogin() {
    const BASE_URL = process.env.REACT_APP_SPOTIFY_BASE_URL
    const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
    const REDIRECT_URL_AFTER_LOGIN = process.env.REACT_APP_SPOTIFY_REDIRECT_URL_AFTER_LOGIN
    const SCOPE = ["playlist-modify-private", "user-read-private"]
    const TOKEN = "token"
    const SHOW_DIALOG = true
    window.location = `${BASE_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPE}&response_type=${TOKEN}&show_dialog=${SHOW_DIALOG}`
}

