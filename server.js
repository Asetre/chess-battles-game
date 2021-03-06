const express = require('express')
const app = express()
const Server = require('http').Server(app)
const io = require('socket.io')(Server)
const port = 8080

//Game sockets
require('./game')(io)

var serv = null

app.get('/', (req, res) => {
  res.status(200).send('online')
})

function startServer() {
  serv = Server.listen(port, () => {
    //eslint-disable-next-line
        console.log(`Game Socket Server listening on port: ${port}`)
  })
}

//eslint-disable-next-line
function closeServer() {
  serv.close()
}

if(require.main === module) {
  startServer()
}