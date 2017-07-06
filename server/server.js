const http = require('http');
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const socketIO = require('socket.io');


const { isRealString } = require('./utils/validation')
const { Users } = require('./utils/users');

const PORT = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

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
        var user = users.removeUser(socket.id);

        if (user) {
            console.log('disconnect', user.name);

            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('name and room are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);// remove existing user, just to be safe
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));


        //socket.leave('the office fans');
        //io.emit -> io.to('the office fans').emit
        //socket.broadcast.emit -> socket.broadcast.to('the office fans').emit
        socket.emit('newMessage', generateMessage('Admin', 'welcome to chat app'));

        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));


        callback();
    });

    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));

        }

        callback('this is from server');
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('locationMessage', generateLocationMessage(user.name, coords.lat, coords.long));
        }
    });

});

server.listen(PORT, () => console.log(`server is up on port: ${PORT}`));


socketIO.apply()