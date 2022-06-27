import logo from './logo.svg';
import './App.css';

function App() {
  
navigator.getUserMedia(
  { video: true, audio: true },
  stream => {
    const localVideo = document.getElementById("local-video");
    console.log(localVideo);
    if (localVideo) {
      localVideo.srcObject = stream;
    }
  },
  error => {
    console.warn(error.message);
  }
 );
  return (
    <div className="App">
      <video autoPlay muted id="local-video">
      </video>
    </div>
  );
}

export default App;
