import './App.css';
import data from "./data"

const imageEl = data.album.images[0].url
const titleEl = data.name
const artistEl = data.album.artists[0].name
function App() {
  return (
    <div className="App" >
      <img src={imageEl} className="App-logo" alt="bohemian album"/>
      <h1>{titleEl}</h1>
      <p>{artistEl}</p>
      <button>Select</button>
    </div>
  );
}

export default App;
