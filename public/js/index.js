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
    var messageTextbox = $('#inputMessage');
    socket.emit('createMessage', { from: 'Uer', text: messageTextbox.val() }, (data) => {
        messageTextbox.val('');
    });
});

var locationButton = $('#send-location');
locationButton.on('click', () => {
    if (!navigator.geolocation) return alert('geolocation not supported by your browser');

    locationButton.attr('disabled', 'disabled').text('sending location...');

    navigator.geolocation.getCurrentPosition((pos) => {
        socket.emit('createLocationMessage', { lat: pos.coords.latitude, long: pos.coords.longitude });
        locationButton.removeAttr('disabled', 'disabled').text('send location');

    }, (error) => {
        locationButton.removeAttr('disabled', 'disabled').text('send location');
        alert('unable to fetch location');
    });

});

socket.on('locationMessage', (message) => {
    var li = $('<li></li>');
    var a = $('<a target="_blank"> My current location </a>')
    li.text(`${message.from} : `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
});