const express = require('express');
const app = express()
const {Server: HttpServer} = require('http');
const {Server: IOServer} = require('socket.io');
const PORT = 8080

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer);

app.use(express.static('./public'));
app.get('/', (req, res) => {
    res.sendFile('index.html')
})

const historial = [{autor: "Blitzcrank", message: "Bienvenido al chat con el soporte, en qué puedo ayudarte?"}]

io.on('connection', (socket) =>{
    console.log("Usuario conectado")
    socket.emit('message', historial)
})





httpServer.listen(PORT, (req,res) =>{
    console.log("Servidor Levantado")
})