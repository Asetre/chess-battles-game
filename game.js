module.exports = function (io) {
    io.on('connection', (socket) => {
        //eslint-disable-next-line
      console.log(`Socket: ${socket.id}`)

        socket.on('join room', (gameID) => {
            socket.join(gameID)
        })

        socket.on('piece move', (data) => {
            let { opponentSocketID } = data
            socket.to(opponentSocketID).emit('opponent piece move', data)
        })
    })
}