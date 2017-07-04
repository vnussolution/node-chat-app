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

    socket.on('createMessage', (message) => {
        console.log('createMessage :', message);
        io.emit('newMessage', { from: message.from, text: message.text, createdAt: new Date.getTime() });
    });

    // socket.emit('newMessage', { from: 'SERVER', text: 'Welcome to Node.js server', createdAt: new Date().toString() });
});

server.listen(PORT, () => console.log(`server is up on port: ${PORT}`));