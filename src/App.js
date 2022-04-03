import './App.css';
import data from './components/data-manager/data';
import Header from './components/header';
import ImageSong from './components/image';
import Paragraph from './components/paragraph';
// import axios from "axios"
import React from "react"
import Login from "./auth/login/Login"

function App() {
  // const getData = data.map(value => {
  //   //I don't get how to use auth token actually
  //   return (
  //     <div>
  //       <ImageSong key={value.id} url={value.album.images[0].url} />
  //       <Header key={value.id} text={value.album.name} />
  //       <Paragraph key={value.id} band={value.album.artists[0].name} title={value.name}/>
  //     </div>
  //   )
  // })
  const [query, setQuery] = React.useState("")
  const [dataSpotify, setDataSpotify] = React.useState([])
  const [token, setToken]=React.useState("")

  // React.useEffect(() => {

  //   axios.get("")
  //     .then(response => console.log(response.data))
  // }, [])
  function handleInput(event) {
    setQuery(event.target.value)
  }

  // function requestUserAuthorization(){
  //   const client_id=process.env.REACT_APP_SPOTIFY_CLIENT_ID
  //   const redirect_uri="https://localhost:3000"
  //   const scope="playlist-modify-private"
  //   const url=`https://accounts.spotify.com/authorize?response_type=token&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}`
  // }
  return (
    <div className="App" >
      {/* {getData} */}
      {/* <button onClick={requestUserAuthorization}>Login</button> */}
      <Login/>
      {/* <form>
        <input type="text" onChange={handleInput} />
        <button>Select</button>
      </form> */}
    </div>
  );
}

export default App;
