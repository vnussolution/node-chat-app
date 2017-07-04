var socket = io();
socket.on('connect', () => {
    console.log('connected to server');

    //socket.emit('createMessage', { from: 'CLIENT--', text: ' hi everyone here ' });
});

socket.on('disconnect', () => {
    console.log('disconnected from server...');
});

socket.on('welcome', (message) => {
    console.log('welcome message ::', message);
});

socket.on('newMessage', (message) => {
    console.log('you got a new message', message);
});

socket.on('newUserJoined', (message) => {
    console.log('new user joined:::', message)
});