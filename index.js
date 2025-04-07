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

io.on('connection',(socket)=>{
    socket.on('send-name',(username)=>{
        io.emit('send-name',username);
    });

    socket.on('send-message',(message)=>{
        io.emit('send-message',message);
    });
})

server.listen(port);