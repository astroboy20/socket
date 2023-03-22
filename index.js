const express = require('express')
const app =express()
const http = require('http')
const server = http.createServer(app)

//socket.io server
const {Server} = require('socket.io')
const io = new Server(server)

// to connect to the index.html file
app.get('/',(req,res)=>{
    // res.send('<h1>Hello world</h1>')
    res.sendFile(__dirname + '/index.html')
})

//connection
// io.on('connection',(socket)=>{
//     console.log('a user connected')
//     //when a user disconets
//     socket.on('disconnect',()=>{
//         console.log('user discconected')
//     })
// })
// due to user input
io.on('connection',(socket)=>{
    socket.on('chat message', (msg)=>{
        console.log('message' + msg)
    })
})

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' })

io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
  });

server.listen(3000,()=>{
    console.log('listening on *:3000')
})