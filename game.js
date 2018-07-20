const axios = require('axios')
const {serverUrl} = require('./config')

function main(io) {
  io.on('connection', (socket) => {
    socket.on('join room', (gameID) => {
      socket.join(gameID)
    })

    socket.on('piece move', (data) => {
      io.to(data.gameID).emit('piece move', data)
    })

    socket.on('game over', (data) => {
      if(!data) return
      let url = `${serverUrl}/game/over`
      console.log('sending')
      axios.post(url, data)
    })

    socket.on('check opponent connection', (roomName) => {
      let room = io.sockets.adapter.rooms[roomName]
      if (io.sockets.adapter.sids[socket.id][roomName]) {
        if (room.length < 2) socket.emit('opponent connection status', false)
        else socket.emit('opponent connection status', true)
      }
    })
  })
}

module.exports = main