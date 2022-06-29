
import './App.css';
import io from 'socket.io-client';
import React, { useState,useEffect } from 'react';
function App() {
  const [socketio, setSocketio] = useState(null);
  async function connect() {
    if(socketio) return;
    const socket = io('http://localhost:8000');
    setSocketio(socket);
    socket.emit('new-user-joined', 'Anish');
    sendBroadcastMessage();
  }
  useEffect(() => {
    connect();
  }, [socketio]);
  
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
 async function sendBroadcastMessage(){
   socketio.on('user', (name) => {
     console.log(name); });
    }
    console.log(socketio);
  return (
    <div className="App">
      <video autoPlay muted id="local-video">
      </video>
      {/* <button onClick={sendName}>Click Me</button> */}
    </div>
  );
}

export default App;
