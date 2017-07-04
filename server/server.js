const http = require('http');
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const socketIO = require('socket.io');


const PORT = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} : ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) console.log('Failed to appendFile::', err);
    });
    next();

});

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected.....');
    });

    socket.emit('welcome', { from: 'Admin', text: 'welcome to chat app' });

    socket.broadcast.emit('newUserJoined', { from: 'Admin', text: `new user has joined chat app`, createdAt: new Date().getTime() });

    socket.on('createMessage', (message) => {
        console.log('createMessage :', message);
        //io.emit  method sends to all listeners
        //io.emit('newMessage', { from: message.from, text: message.text, createdAt: new Date().getTime() });
        socket.broadcast.emit('newMessage', // this method only broadcasts to others not sender
            { from: message.from, text: message.text, createdAt: new Date().getTime() }
        );

    });

    // socket.emit('newMessage', { from: 'SERVER', text: 'Welcome to Node.js server', createdAt: new Date().toString() });
});

server.listen(PORT, () => console.log(`server is up on port: ${PORT}`));