import './App.css';
import data from './components/data-manager/data';
import Header from './components/header';
import ImageSong from './components/image';
import Paragraph from './components/paragraph';

function App() {
  const getData = data.map(value => {
    //I don't get how to use auth token actually
    return (
      <div>
        <ImageSong key={value.id} url={value.album.images[0].url} />
        <Header key={value.id} text={value.album.name} />
        <Paragraph key={value.id} band={value.album.artists[0].name} title={value.name}/>
      </div>


    )
  })
  return (
    <div className="App" >
      {getData}
      <button>Select</button>
    </div>
  );
}

export default App;
