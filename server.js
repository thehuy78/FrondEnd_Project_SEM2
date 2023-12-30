// import { Socket } from 'dgram';


const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on('connection', (socket) => {
    console.log('connection123');

    socket.on('sendChatToServer', (data) => {
        console.log(data);

        io.sockets.emit('sendChatToClient', (data));
    })

    socket.on('sendStatusToServer', (data) => {
        console.log(data);

        io.sockets.emit('sendStatusToClient', data);
    })
    socket.on('disconnect', (socket) => {
        console.log('Disconnect');
    })
})

server.listen(3000, () => {
    console.log('server is running');
})