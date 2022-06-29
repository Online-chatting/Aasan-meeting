const socketio = require('socket.io');
var cors = require('cors');
//uuid
// const uuid = require('uuid/v4');
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
console.log(`Listening on port ${port}`);
app.use(cors());
const users = {};
var server = require('http').createServer(app);
server.listen(port);
var io = socketio(server,{
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
io.on('connection', (socket) => {
    socket.on('connection', socket => {
        console.log('socket connected');
    });
    socket.on('new-user-joined', (name) => {
        console.log(name);
        users[socket.id] = name;
        socket.broadcast.emit('user', name);
    });
    
    socket.on('send-video', (data) => {
        socket.broadcast.emit('receive-video', data);
    });

    socket.on('send-chat-message', (message) => {
        socket.broadcast.emit('chat-message', { message, name: users[socket.id] });
    });
    
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-left', users[socket.id]);
        delete users[socket.id];
    });
})