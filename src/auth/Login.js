import { useEffect, useState } from "react"
import axios from "axios"
import Form from "../components/Form/Form"
import Giphy from "../components/Giphy/Giphy"
import { handleLogin } from "./handleLogin"
import CreatePlaylistForm from "../components/Form/CreatePlaylist"

export default function Login() {
    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [tracks, setTracks] = useState([])
    const [isSelect, setIsSelect] = useState({})
    const [userID, setUserID] = useState("")

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
                'Content-Type': 'application/json',
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
    async function getCurrentUserID() {
        await axios.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setUserID(response.data.id)
            })
    }

    //ERROR 401 CODE
    async function createPlaylist(event) {
        event.preventDefault()
        await axios.post(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: {
                "name": "New Playldasadsasist",
                "description": "New playlist description",
                "public": false,
                "collaborative": false
            }
        })
            .then(response => {
                console.log(response)
            })


    }
    return (
        <div>
            {
                !(window.localStorage.getItem("token")) ?
                    <button onClick={handleLogin}>Login to Spotify</button>
                    : <button onClick={handleLogout}>Logout from Spotify</button>
            }
            {
                (window.localStorage.getItem("token")) ?
                    <div>
                        <button onClick={getCurrentUserID}>Get User ID</button>
                        <CreatePlaylistForm submit={createPlaylist} />
                        <Form searchTrack={searchTrack} setSearchKey={e => setSearchKey(e.target.value)} />
                        {tracks.length !== 0 &&
                            tracks.map(track => {
                                return (
                                    <div key={track.uri}>
                                        <Giphy key={track.uri} url={track.album.images[0].url} name={track.name} album={track.album.artists[0].name} />
                                        {!isSelect[track.uri] ?
                                            <button onClick={() => {
                                                setIsSelect({ ...isSelect, [track.uri]: true })
                                            }}>Select</button>
                                            : <button onClick={() => {
                                                setIsSelect({ ...isSelect, [track.uri]: false })
                                            }}>Deselect</button>
                                        }
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