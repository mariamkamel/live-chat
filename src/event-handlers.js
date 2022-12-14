const logger = require('./utils')

let users = new Map()
const room = 'Room207'
const join = (socket) => {
    socket.on('join', (name) => {
        if(users.size === 4) {
            logger.error('cannot join room room,  capacity is full ')
            return;
        }

        socket.join(room)
        users.set(socket.id, name)

        logger.info(`${name} joined the room`)
      })    
}

const sendMessage = (socket) => {
    socket.on('send message', (msg) => {
        if(!users.has(socket.id)) {
        logger.error('cannot send, only users in the room can send messsages')
        return;
    }

    logger.info(`${users.get(socket.id)} sent a new message`)
    socket.broadcast.emit("received", msg);
})
}

const disconnect = (socket) => {
    socket.on('disconnect', () => {
        logger.info(`${users.get(socket.id)} is disconnected`)
        users.delete(socket.id)
    })
}

module.exports = {
    join,
    sendMessage,
    disconnect
}