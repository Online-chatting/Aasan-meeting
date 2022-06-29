
import './App.css';

import io from 'socket.io-client';
import React, { useState,useEffect } from 'react';
function App() {
  const [socketio, setSocketio] = useState(null);
  const [name, setName] = useState('');
  async function connect() {
    if(socketio) return;
    const socket = io('http://localhost:8000');
    setSocketio(socket);
    console.log(name);
    socket.emit('new-user-joined', name);
    sendBroadcastMessage(socket);
  }
  function sendVideo(){
    const video = document.getElementById('local-video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const data = canvas.toDataURL('image/png');
    socketio.emit('send-video', data);
  }
  
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
 async function sendBroadcastMessage(socket){
   socket.on('user', (name) => {
     console.log(name); });
    }
    // console.log(socketio);
  return (
    <div className="App">
      <canvas id="canvas" width="640" height="480"></canvas>
      <video autoPlay muted id="local-video">
      </video>
      <input type="text" onChange={e => setName(e.target.value)} />
      <button id='join' onClick={connect}>JOIN NOW</button>
    </div>
  );
}

export default App;
