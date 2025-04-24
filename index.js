const express = require('express');
const app = express();

const {Server} = require('socket.io')
const http = require('http')
const server = http.createServer(app);
const io = new Server(server);
const port = 4000;
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
})

io.on('connection',(socket)=>{   //what this line does is that it listens for a connection event from the client and when the client connects, it executes the callback function.
    socket.on('send-name',(username)=>{ //this line listens for the send-name event from the client and when it receives the event, it executes the callback function.
        io.emit('send-name',username); //this line emits the send-name event to all connected clients with the username as data.
    });

    socket.on('send-message',(message)=>{
        io.emit('send-message',message);
    });
})

server.listen(port);