var socket = io();
socket.on('connect', () => {
    console.log('connected to server');

    //socket.emit('createMessage', { from: 'CLIENT--', text: ' hi everyone here ' });
});

socket.on('disconnect', () => {
    console.log('disconnected from server...');
});

socket.on('welcome', (message) => {
    var li = $('<li></li>');
    li.text(`${message.from} : ${message.text}`);
    $('#messages').append(li);
});

socket.on('newMessage', (message) => {
    console.log('you got a new message', message);

    var li = $('<li></li>');
    li.text(`${message.from} : ${message.text}`);
    $('#messages').append(li);
});

socket.on('newUserJoined', (message) => {
    var li = $('<li></li>');
    li.text(`${message.from} : ${message.text}`);
    $('#messages').append(li);
});


$('#message-form').on('submit', (e) => {
    e.preventDefault();

    socket.emit('createMessage', { from: 'Uer', text: $('#inputMessage').val() }, (data) => {
        console.log('got it::', data);
    });
});