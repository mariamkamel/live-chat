const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { join, sendMessage, disconnect } = require('./src/event-handlers')

const  logger  =  require('./src/utils')

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {
  logger.info("new connection started")
  join(socket);
  sendMessage(socket);
  disconnect(socket)
});



server.listen(3000, () => {
  console.log('listening on *:3000');
});

// config 
// deploy