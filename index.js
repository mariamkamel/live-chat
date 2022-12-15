const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { join, sendMessage, disconnect } = require('./src/event-handlers')

const logger = require('./src/utils/logger')
const config = require('./src/utils/configs')

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

io.on(config.connection, (socket) => {
  logger.info("new connection started")
  join(socket);
  disconnect(socket)
});

server.listen(config.port, () => {
  logger.info('listening on *:3000');
});