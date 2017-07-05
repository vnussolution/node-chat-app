var socket = io();

function scrollToBottom() {

    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    console.log(`clientHeight : ${clientHeight} , scrollTop: ${scrollTop}, scrollHeight: ${scrollHeight}, newMessageHeight: ${newMessageHeight}, lastMessageHeight: ${lastMessageHeight}`)


    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight)
        messages.scrollTop(scrollHeight);



}

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
    var formatedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formatedTime
    });
    $('#messages').append(html);
    scrollToBottom();
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
    // var li = $('<li></li>');
    // var a = $('<a target="_blank"> My current location </a>')
    // var formatedTime = moment(message.createdAt).format('h:mm a');
    // li.text(`${message.from} : : ${formatedTime} : `);
    // a.attr('href', message.url);
    // li.append(a);
    // $('#messages').append(li);

    var formatedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-location-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formatedTime
    });
    $('#messages').append(html);
    scrollToBottom();
});