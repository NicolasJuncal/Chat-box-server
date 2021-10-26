const express = require('express') // middleware developed by express
const http = require('http')
const socket = require('socket.io')
const app = new express()
const httpServer = http.createServer(app)
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials:true
  }
});
const SERVER_HOST = 'localhost'
const SERVER_PORT = 8080
io.on('connection', socket => {
  socket.on('chat.message', data => {
    console.log("Message", data)
    io.emit('chat.message', data)
  })
  socket.on('online.user', userName => {
    io.emit('online.user', userName)
  })
  

  socket.on('disconnect', () => {
    
  })
})


httpServer.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(`listening to http://${SERVER_HOST}:${SERVER_PORT}`)
})