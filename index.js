const express = require('express')
const { Server } = require('socket.io')
require('dotenv').config()
const app = express()
const http = require('http')
const server = http.createServer(app)
const port = process.env.PORT

const io = new Server(server)


app.get('/', (req, res) => {
    // res.send('<h1>Hello world.</h1>')
    res.sendFile(__dirname + '/index.html')
})

// io.on('connection', (socket) =>{
//     console.log('A user connected')
//     socket.on('disconnect', () => {
//         console.log('User disconnected')
//     })
// })

// io.on('connection', (socket) => {
//   socket.broadcast.emit('hi');
// });

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        const user = msg.user
        const message = msg.message
        const sended = msg.send

        io.emit('chat message', msg)
        // console.log('message: ' + msg);
        console.log(user)
    });
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets




server.listen(port, () => {
    console.log('Your application es runing in the port ' + port)
    console.log('http://localhost:'+4000)
})