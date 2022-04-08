import { useEffect, useState } from "react"
import axios from "axios"
import Form from "../components/Form/Form"
import Giphy from "../components/Giphy/Giphy"

export default function Login() {
    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [tracks, setTracks] = useState([])
    const [isSelect, setIsSelect] = useState(false)

    //redirect auth to spotify
    function handleLogin() {
        const BASE_URL = process.env.REACT_APP_SPOTIFY_BASE_URL
        const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
        const REDIRECT_URL_AFTER_LOGIN = process.env.REACT_APP_SPOTIFY_REDIRECT_URL_AFTER_LOGIN
        const SCOPE = process.env.REACT_APP_SPOTIFY_SCOPE
        const TOKEN = "token"
        const SHOW_DIALOG = true
        window.location = `${BASE_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPE}&response_type=${TOKEN}&show_dialog=${SHOW_DIALOG}`
    }

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")
        if (!token && hash) {
            token = hash.substring(1).split("&").find(element => element.startsWith("access_token")).split("=")[1]
            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }
        setToken(token)
    }, [])

    function handleLogout() {
        setToken("")
        window.localStorage.removeItem("token")
    }

    async function searchTrack(event) {
        event.preventDefault()
        await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchKey,
                type: "track"
            }
        })
            .then(response => {
                setTracks(response.data.tracks.items)
            })
            .catch(setTracks([]))
    }

    function handleSelect() {
        if (!isSelect) {
            setIsSelect(true)

        } else {
            setIsSelect(false)
        }
    }

    return (
        <div>
            {
                !token ?
                    <button onClick={handleLogin}>Login to Spotify</button>
                    : <button onClick={handleLogout}>Logout from Spotify</button>
            }
            {
                token ?
                    <div>
                        <Form searchTrack={searchTrack} setSearchKey={e => setSearchKey(e.target.value)} />
                        {tracks.length !== 0 &&
                            tracks.map(track => {
                                return (
                                    <div key={track.uri}>
                                        <Giphy key={track.uri} url={track.album.images[0].url} name={track.name} album={track.album.artists[0].name} />
                                        {isSelect? <button onClick={handleSelect}>Deselect</button>:<button onClick={handleSelect}>Select</button>}
                                    </div>

                                )
                            })
                        }
                    </div>
                    : <h2>Please Login</h2>
            }
        </div>
    )
}