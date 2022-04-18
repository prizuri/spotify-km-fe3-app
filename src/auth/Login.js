import { useEffect, useState } from "react"
import axios from "axios"
import Form from "../components/Form/Form"
import Giphy from "../components/Giphy/Giphy"
import { handleLogin } from "./handleLogin"
import CreatePlaylistForm from "../components/Form/CreatePlaylist"
// import cors from "cors"

export default function Login() {
    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [tracks, setTracks] = useState([])
    const [isSelect, setIsSelect] = useState({})
    // const [uris, setUris] = useState("")
    let uri = ""
    const [playlistID, setPlaylistID] = useState("")
    const [playlistForm, setPlaylistForm] = useState({
        title: "", description: ""
    })
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
        await axios({
            method: "GET",
            url: "https://api.spotify.com/v1/search",
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
    async function handleCurrentUserID() {
        await axios({
            method: "GET",
            url: "https://api.spotify.com/v1/me",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setUserID(response.data.id)
        })
    }

    async function createPlaylist(event) {
        event.preventDefault()
        await axios({
            method: "post",
            url: `https://api.spotify.com/v1/users/${userID}/playlists`,
            data: {
                "name": playlistForm.title,
                "description": playlistForm.description,
                "public": false,
                "collaborative": false
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setPlaylistID(response.data.id)
            console.log(playlistID)
        })
    }
    async function handleAddItemPlaylist(trackUris) {
        await axios({
            method: "POST",
            url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
            params: {
                uris: uri,
                position: 0
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(setIsSelect({ ...isSelect, [trackUris]: true }))

    }

    function handlePlaylistForm(event) {
        setPlaylistForm(prevForm => {
            return {
                ...prevForm,
                [event.target.name]: event.target.value
            }
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
                        <button onClick={handleCurrentUserID}>Get Current User ID</button>
                        <CreatePlaylistForm submit={createPlaylist} value={e => e.target.value} onChange={handlePlaylistForm} />
                        <Form searchTrack={searchTrack} setSearchKey={e => setSearchKey(e.target.value)} />
                        {tracks.length !== 0 &&
                            tracks.map(track => {
                                return (
                                    <div key={track.uri}>
                                        <Giphy key={track.uri} url={track.album.images[0].url} name={track.name} album={track.album.artists[0].name} />
                                        {!isSelect[track.uri] ?
                                            <button onClick={() => {
                                                uri = track.uri
                                                handleAddItemPlaylist(uri)
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