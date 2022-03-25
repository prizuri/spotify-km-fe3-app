import './App.css';
import song from './components/data-manager';
import Header from './components/header';
import ImageSong from './components/image';
import Paragraph from './components/paragraph';

function App() {
  return (
    <div className="App" >
      <ImageSong url={song.image}/>
      <Header text={song.title}/>
      <Paragraph text={song.artist}/>
      <button>Select</button>
    </div>
  );
}

export default App;
