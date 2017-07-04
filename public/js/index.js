var socket = io();
socket.on('connect', () => {
    console.log('connected to server');

    socket.emit('createMessage', {
        from: 'CLIENT--', text: ' hi everyone here '
    });
});

socket.on('disconnect', () => {
    console.log('disconnected from server...');
});

socket.on('welcomeUser', (message) => {
    console.log('you got a message::', message);


});

socket.on('newMessage', (message) => {
    console.log('you got a new message', message);
});

