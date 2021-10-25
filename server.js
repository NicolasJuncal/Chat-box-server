const Koa = require('koa') // middleware developed by express
const http = require('http')
const socket = require('socket.io')
const app = new Koa()
const httpServer = http.createServer(app.callback())
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
 socket.on('chat.message', data =>{
   console.log("Message", data)
   io.emit('chat.message', data)
 })
 socket.on('disconnect', () => {
  console.log("disconect")
})
})


httpServer.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(`listening to http://${SERVER_HOST}:${SERVER_PORT}`)
})