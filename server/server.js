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

const { generateMessage, generateLocationMessage } = require('./utils/message');

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

    socket.emit('welcome', generateMessage('Admin', 'welcome to chat app'));

    socket.broadcast.emit('newUserJoined', generateMessage('Admin', `new user has joined chat app`));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage :', message);
        //io.emit  method sends to all listeners
        //io.emit('newMessage', generateMessage(message.from, messsage.text));

        // this method only broadcasts to others not sender
        socket.emit('newMessage', generateMessage(message.from, message.text));
        callback('this is from server');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('locationMessage', generateLocationMessage('Admin', coords.lat, coords.long));
    });

});

server.listen(PORT, () => console.log(`server is up on port: ${PORT}`));