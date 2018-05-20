var express = require('express')
var bp = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use(express.static(__dirname))
app.use(bp.json())
app.use(bp.urlencoded({ extended: false }))

var msg = []

app.get('/msg', (request, respond) =>{
    respond.send(msg)
})
app.post('/msg', (request, respond) =>{
    console.log('Request Body:', request.body)
    msg.push(request.body)
    io.emit('IO Emit:', request.body)
    
    respond.sendStatus(200)
})

io.on('connection', (socket) => {
    console.log('usuario conectado')
})

var server = http.listen(3000, ()=>{
    console.log('Saliendo por el puerto', server.address().port)
})

