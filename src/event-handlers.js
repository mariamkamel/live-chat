const logger = require('./utils/logger')
const configs = require('./utils/configs')

let users = new Map()

const join = (socket) => {
    socket.on(configs.join, (name) => {
        if(users.size === configs.roomCapacity) {
            logger.error('cannot join room room,  capacity is full ')
            return;
        }

        socket.join(configs.room)
        users.set(socket.id, name)
        
        logger.info(`${name} joined the room`)
      })    
}

const sendMessage = (socket) => {
    socket.on(configs.sendMessage, (msg) => {
        if(!users.has(socket.id)) {
        logger.error('cannot send, only users in the room can send messsages')
        return;
    }

    logger.info(`${users.get(socket.id)} sent a new message`)
    socket.to(configs.room).emit(configs.receiveMessage,  msg );
})
}

const disconnect = (socket) => {
    socket.on(configs.disconnect, () => {
        logger.info(`${users.get(socket.id)} is disconnected`)
        users.delete(socket.id)
    })
}

module.exports = {
    join,
    sendMessage,
    disconnect
}