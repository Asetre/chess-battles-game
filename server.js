const express = require('express')
const app = express()
const Server = require('http').Server(app)
const io = require('socket.io')(Server)
const port = 8080

//Game sockets
require('./game')(io)

var serv

function startServer() {
   serv = Server.listen(port, () => {
    console.log(`Game Socket Server listening on port: ${port}`)
  })
}

function closeServer() {
  serv.close()
}

if(require.main === module) {
  startServer()
}